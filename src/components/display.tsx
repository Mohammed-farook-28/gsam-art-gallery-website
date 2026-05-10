import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

/** Heavy-black sans display headline (Store, Spotlight, Career, etc.). */
export function DisplaySans({
  children,
  as: As = "h2",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <As
      className={cn(
        "font-sans font-black tracking-tight leading-[0.95] text-ink",
        className,
      )}
    >
      {children}
    </As>
  );
}

/** Heavy serif display headline ("Why?", "Our Vision", "Our Mission"). */
export function DisplaySerif({
  children,
  as: As = "h2",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <As
      className={cn(
        "font-serif tracking-tight leading-[0.95] text-ink",
        className,
      )}
      style={{ fontVariationSettings: "'wght' 900, 'opsz' 144" }}
    >
      {children}
    </As>
  );
}
