"use client";

import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

const fieldBase =
  "w-full bg-transparent border-b border-rule focus:border-ink py-3 px-0 text-base placeholder:text-muted/70 focus:outline-none transition-colors";

export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block", className)}>
      <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-muted font-semibold">
        {label}
      </span>
      <span className="block mt-2">{children}</span>
      {hint ? <span className="block mt-1 text-xs text-muted/80">{hint}</span> : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={5}
      {...props}
      className={cn(fieldBase, "resize-y", props.className)}
    />
  );
}

export function SubmitButton({
  children = "Send",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold transition-opacity hover:opacity-90 disabled:opacity-50",
        className,
      )}
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
