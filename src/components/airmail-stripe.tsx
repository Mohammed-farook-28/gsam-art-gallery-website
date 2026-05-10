import { cn } from "@/lib/cn";

/**
 * Diagonal red/blue/white striped border, like an airmail envelope edge.
 * Repeats horizontally — drop in as a section divider.
 */
export function AirmailStripe({ className }: { className?: string }) {
  return (
    <div
      className={cn("airmail-stripe w-full", className)}
      role="presentation"
      aria-hidden="true"
    />
  );
}
