"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/cn";

export function CartIcon({ className }: { className?: string }) {
  const { itemCount, ready } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={`Cart (${itemCount} items)`}
      className={cn(
        "relative inline-flex items-center justify-center w-9 h-9 -mr-2 hover:opacity-70 transition-opacity",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden
      >
        <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 7Z" />
        <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
      </svg>
      {ready && itemCount > 0 ? (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-airmail-red text-paper text-[10px] font-bold flex items-center justify-center tabular-nums"
          aria-hidden
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
