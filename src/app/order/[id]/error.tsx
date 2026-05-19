"use client";

import Link from "next/link";

export default function OrderError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-225 px-6 md:px-10 pt-32 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
        Something went wrong
      </p>
      <p className="mt-4 text-base text-ink/80">
        We couldn&apos;t load your order details. If you completed payment, your order was saved —
        check your email for confirmation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
        >
          Try again
        </button>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold px-8 py-4 opacity-60 hover:opacity-100"
        >
          Back to store
        </Link>
      </div>
    </div>
  );
}
