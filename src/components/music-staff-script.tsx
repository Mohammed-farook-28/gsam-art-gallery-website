import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Script text laid over a 5-line music staff, matching the recurring
 * motif in the Canva design (e.g. "for a million dreams to stay alive").
 */
export function MusicStaffScript({
  children,
  className,
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeMap = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-5xl",
    lg: "text-5xl md:text-7xl",
    xl: "text-6xl md:text-8xl",
  } as const;

  return (
    <span
      className={cn(
        "relative inline-block font-script italic leading-[1.05] text-ink whitespace-nowrap",
        sizeMap[size],
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}
