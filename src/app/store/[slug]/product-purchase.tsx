"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/cn";
import type { Paper, Product } from "@/lib/products";
import { PAPER_LABELS } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [paper, setPaper] = useState<Paper>(product.papers[0]);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      title: product.title,
      image: product.image,
      price_inr: product.price_inr,
      quantity: qty,
      paper,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem({
      slug: product.slug,
      title: product.title,
      image: product.image,
      price_inr: product.price_inr,
      quantity: qty,
      paper,
    });
    router.push("/checkout");
  }

  return (
    <div className="space-y-8">
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

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 border border-ink text-ink bg-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold transition-colors hover:bg-ink hover:text-paper"
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold transition-opacity hover:opacity-90"
        >
          Buy now →
        </button>
        <Link href="/cart" className="text-xs uppercase tracking-[0.22em] text-muted hover:text-ink underline-offset-4 hover:underline">
          View cart
        </Link>
      </div>
    </div>
  );
}
