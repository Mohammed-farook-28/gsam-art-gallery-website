"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { PAPER_LABELS, SAMPLE_PRODUCTS } from "@/lib/products";
import { lineTotal, SHIPPING_INR } from "@/lib/cart";

export default function CartPage() {
  const { cart, ready, subtotal, updateQuantity, removeItem } = useCart();

  const cartSlugs = new Set(cart.map((i) => i.slug));
  const recommended = SAMPLE_PRODUCTS.filter((p) => !cartSlugs.has(p.slug));

  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-275 px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <DisplaySans as="h1" className="text-[clamp(3rem,10vw,8rem)]">Cart</DisplaySans>
        <p className="mt-3">
          <MusicStaffScript size="md">a parcel taking shape, one postcard at a time.</MusicStaffScript>
        </p>

        {!ready ? (
          <p className="mt-12 text-muted">Loading…</p>
        ) : cart.length === 0 ? (
          <div className="mt-16 border-t border-rule pt-16 text-center">
            <p className="font-script text-3xl md:text-4xl text-ink/85">Your cart is empty.</p>
            <Link
              href="/store"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              Browse the store →
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
            {/* LINE ITEMS */}
            <ul className="divide-y divide-rule border-y border-rule">
              {cart.map((item) => (
                <li
                  key={`${item.slug}__${item.paper}`}
                  className="py-6 flex gap-4 md:gap-6 items-start"
                >
                  <div className="relative shrink-0 w-24 md:w-32 aspect-3/4 bg-cream">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 128px, 96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/store/${item.slug}`}
                      className="font-script text-2xl md:text-3xl text-ink leading-tight hover:opacity-70"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">
                      Postcard · {PAPER_LABELS[item.paper]}
                    </p>
                    <p className="mt-2 text-sm">₹{item.price_inr} each</p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-ink/40">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.slug, item.paper, item.quantity - 1)}
                          className="w-9 h-9 text-base hover:bg-ink/5"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.slug, item.paper, item.quantity + 1)}
                          className="w-9 h-9 text-base hover:bg-ink/5"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.paper)}
                        className="text-xs uppercase tracking-[0.18em] text-muted hover:text-airmail-red underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 text-base font-semibold tabular-nums">
                    ₹{lineTotal(item)}
                  </p>
                </li>
              ))}
            </ul>

            {/* SUMMARY */}
            <aside className="bg-cream p-6 md:p-8 sticky top-28">
              <h2 className="text-xs uppercase tracking-[0.22em] font-semibold">Summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">₹{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping (within India, flat)</dt>
                  <dd className="tabular-nums">₹{SHIPPING_INR}</dd>
                </div>
              </dl>
              <div className="mt-6 pt-6 border-t border-ink/20 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="tabular-nums">₹{subtotal + SHIPPING_INR}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-8 block text-center bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:opacity-90"
              >
                Continue to checkout →
              </Link>
              <p className="mt-4 text-xs text-muted text-center">
                You&apos;ll choose payment method (UPI, card, or netbanking) on the next step.
              </p>
            </aside>
          </div>
        )}
      </section>

      {/* RECOMMENDED POSTCARDS */}
      {ready && recommended.length > 0 && (
        <>
          <AirmailStripe />
          <section className="mx-auto max-w-275 px-6 md:px-10 py-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
              You might also like
            </p>
            <MusicStaffScript size="md" className="mt-2 text-ink/80">
              add another story to your parcel
            </MusicStaffScript>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((p) => (
                <li key={p.slug}>
                  <Link href={`/store/${p.slug}`} className="group block">
                    <div className="relative aspect-3/4 overflow-hidden bg-cream border border-rule/30">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="font-script text-2xl text-ink/85 leading-tight">
                          {p.title}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                          {p.size} · Postcard
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold text-base tabular-nums">
                        ₹{p.price_inr}
                      </p>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] font-semibold border-b border-ink/40 pb-0.5 group-hover:border-ink transition-colors">
                      View postcard →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
