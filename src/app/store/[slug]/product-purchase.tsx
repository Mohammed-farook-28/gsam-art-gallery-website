"use client";

import { useActionState, useState } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitOrder, initialFormState } from "@/app/actions/submissions";
import { cn } from "@/lib/cn";
import type { Paper, Product } from "@/lib/products";
import { PAPER_LABELS } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const [state, formAction] = useActionState(submitOrder, initialFormState);
  const [qty, setQty] = useState(1);
  const [paper, setPaper] = useState<Paper>(product.papers[0]);
  const [showCheckout, setShowCheckout] = useState(false);

  if (state.ok) {
    return (
      <p className="font-script text-3xl md:text-4xl text-ink leading-tight">
        Order received. We&apos;ll be in touch with payment + shipping details.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="product_slug" value={product.slug} />
      <input type="hidden" name="product_title" value={product.title} />
      <input type="hidden" name="paper" value={paper} />
      <input type="hidden" name="quantity" value={qty} />

      {/* QUANTITY + PAPER */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-ink/40">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 text-lg hover:bg-ink/5"
          >
            −
          </button>
          <span className="w-12 text-center text-base tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="w-10 h-10 text-lg hover:bg-ink/5"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.papers.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPaper(p)}
              className={cn(
                "px-4 py-3 text-xs uppercase tracking-[0.18em] border transition-colors",
                paper === p
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/40 text-ink hover:bg-ink/5",
              )}
            >
              {PAPER_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {!showCheckout ? (
        <button
          type="button"
          onClick={() => setShowCheckout(true)}
          className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold hover:opacity-90"
        >
          Buy now →
        </button>
      ) : (
        <div className="space-y-8 border-t border-rule pt-8">
          <p className="text-sm text-muted">
            Payment is processed manually for now — we&apos;ll email you a payment link after
            confirming stock & shipping.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <Field label="Your name" htmlFor="order-name">
              <TextInput id="order-name" name="customer_name" required autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="order-email">
              <TextInput id="order-email" name="customer_email" type="email" required autoComplete="email" />
            </Field>
          </div>
          <Field label="Shipping address" htmlFor="order-address" hint="Street, city, postcode, country">
            <TextArea id="order-address" name="shipping_address" required rows={4} />
          </Field>
          {state.message && !state.ok && <p className="text-sm text-airmail-red">{state.message}</p>}
          <SubmitButton>Place order</SubmitButton>
        </div>
      )}
    </form>
  );
}
