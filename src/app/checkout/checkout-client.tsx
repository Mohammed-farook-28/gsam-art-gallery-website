"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { DisplaySans } from "@/components/display";
import { Field, TextInput, TextArea } from "@/components/form-fields";
import { PAPER_LABELS } from "@/lib/products";
import { lineTotal, SHIPPING_INR } from "@/lib/cart";
import {
  createPaymentSession,
  verifyAndCompletePayment,
} from "@/app/actions/checkout";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  notes?: Record<string, string>;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: { ondismiss?: () => void };
};

type FormFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: FormFields = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export function CheckoutClient({ razorpayConfigured }: { razorpayConfigured: boolean }) {
  const { cart, ready, subtotal, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const total = subtotal + SHIPPING_INR;

  if (ready && cart.length === 0) {
    return (
      <section className="mx-auto max-w-225 px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <DisplaySans as="h1" className="text-[clamp(3rem,10vw,8rem)]">Checkout</DisplaySans>
        <p className="mt-8 font-script text-3xl text-ink/85">Your cart is empty.</p>
        <Link
          href="/store"
          className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
        >
          Browse the store →
        </Link>
      </section>
    );
  }

  function update<K extends keyof FormFields>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handlePay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setSubmitMessage(null);
    setErrors({});

    const result = await createPaymentSession({
      customer: form,
      cart,
    });

    if (!result.ok) {
      setSubmitMessage(result.message);
      if (result.errors) setErrors(result.errors);
      setPending(false);
      return;
    }

    if (result.mode === "manual") {
      clear();
      router.push(`/order/${result.orderId}?manual=1`);
      return;
    }

    // Razorpay path — open hosted checkout.
    if (typeof window === "undefined" || !window.Razorpay) {
      setSubmitMessage("Payment SDK didn't load. Please refresh and try again.");
      setPending(false);
      return;
    }

    const orderId = result.orderId;
    const rp = new window.Razorpay({
      key: result.razorpay.keyId,
      amount: result.razorpay.amount,
      currency: result.razorpay.currency,
      name: "G.Sam Art Gallery",
      description: cart.length === 1
        ? cart[0].title
        : `${cart.length} items · ${cart.reduce((s, i) => s + i.quantity, 0)} postcards`,
      order_id: result.razorpay.orderId,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: "#0a0a0a" },
      notes: { gsam_order_id: orderId },
      handler: async (response) => {
        const verify = await verifyAndCompletePayment({
          orderId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (!verify.ok) {
          setSubmitMessage(verify.message);
          setPending(false);
          return;
        }
        clear();
        router.push(`/order/${orderId}`);
      },
      modal: {
        ondismiss: () => setPending(false),
      },
    });
    rp.open();
  }

  return (
    <>
      {/* Razorpay Checkout SDK loads only when needed. */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="mx-auto max-w-300 px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <DisplaySans as="h1" className="text-[clamp(3rem,10vw,8rem)]">Checkout</DisplaySans>

        {!razorpayConfigured && (
          <p className="mt-6 max-w-prose text-sm text-airmail-red border border-airmail-red/30 bg-airmail-red/5 px-4 py-3">
            Razorpay isn&apos;t configured yet — your order will be saved as <em>pending</em> and we&apos;ll
            email payment instructions manually. Add <code>RAZORPAY_KEY_ID</code> and{" "}
            <code>RAZORPAY_KEY_SECRET</code> to enable instant card/UPI checkout.
          </p>
        )}

        <form onSubmit={handlePay} className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
          <div className="space-y-12">
            <fieldset className="space-y-8">
              <legend className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
                Contact
              </legend>
              <div className="grid gap-8 md:grid-cols-2">
                <Field label="Full name" htmlFor="ck-name" hint={errors.name?.[0]}>
                  <TextInput
                    id="ck-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email" htmlFor="ck-email" hint={errors.email?.[0]}>
                  <TextInput
                    id="ck-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    autoComplete="email"
                  />
                </Field>
              </div>
              <Field label="Phone" htmlFor="ck-phone" hint={errors.phone?.[0]}>
                <TextInput
                  id="ck-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                  autoComplete="tel"
                  placeholder="+91 …"
                />
              </Field>
            </fieldset>

            <fieldset className="space-y-8">
              <legend className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
                Shipping address (within India)
              </legend>
              <Field label="Street address" htmlFor="ck-address" hint={errors.address?.[0]}>
                <TextArea
                  id="ck-address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  required
                  autoComplete="street-address"
                />
              </Field>
              <div className="grid gap-8 md:grid-cols-3">
                <Field label="City" htmlFor="ck-city" hint={errors.city?.[0]}>
                  <TextInput
                    id="ck-city"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    required
                    autoComplete="address-level2"
                  />
                </Field>
                <Field label="State" htmlFor="ck-state" hint={errors.state?.[0]}>
                  <TextInput
                    id="ck-state"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    required
                    autoComplete="address-level1"
                  />
                </Field>
                <Field label="Pincode" htmlFor="ck-pincode" hint={errors.pincode?.[0]}>
                  <TextInput
                    id="ck-pincode"
                    value={form.pincode}
                    onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    inputMode="numeric"
                    pattern="\d{6}"
                    autoComplete="postal-code"
                    placeholder="6 digits"
                  />
                </Field>
              </div>
            </fieldset>

            {submitMessage && (
              <p className="text-sm text-airmail-red">{submitMessage}</p>
            )}
          </div>

          {/* SUMMARY */}
          <aside className="bg-cream p-6 md:p-8 sticky top-28">
            <h2 className="text-xs uppercase tracking-[0.22em] font-semibold">Your order</h2>
            <ul className="mt-6 space-y-4">
              {cart.map((item) => (
                <li
                  key={`${item.slug}__${item.paper}`}
                  className="flex gap-3 items-start text-sm"
                >
                  <div className="relative shrink-0 w-14 aspect-3/4 bg-paper">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold leading-tight truncate">{item.title}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      {PAPER_LABELS[item.paper]} · ×{item.quantity}
                    </p>
                  </div>
                  <p className="tabular-nums">₹{lineTotal(item)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 pt-6 border-t border-ink/20 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">₹{subtotal}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">₹{SHIPPING_INR}</dd></div>
            </dl>
            <div className="mt-4 pt-4 border-t border-ink/20 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">₹{total}</span>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="mt-8 w-full bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {pending
                ? "Processing…"
                : razorpayConfigured
                  ? `Pay ₹${total}`
                  : `Place order (pay later)`}
            </button>
            <p className="mt-3 text-[11px] text-muted text-center">
              {razorpayConfigured
                ? "Powered by Razorpay · UPI, cards, netbanking, wallets"
                : "We'll email you a payment link after order confirmation"}
            </p>
          </aside>
        </form>
      </section>
    </>
  );
}
