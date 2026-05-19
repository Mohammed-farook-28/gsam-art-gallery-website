"use client";

export default function ProductError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-225 px-6 md:px-10 pt-32 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
        Something went wrong
      </p>
      <p className="mt-4 text-base text-ink/80">
        We couldn&apos;t load this product. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
