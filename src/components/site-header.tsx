"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/travel", label: "Travel" },
  { href: "/store", label: "Store" },
  { href: "/people", label: "People" },
  { href: "/contact", label: "Get in touch" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home, the nav lives inside the hero (transparent + white text)
  // until the user scrolls past the hero.
  const transparentNav = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        transparentNav ? "bg-transparent" : "bg-paper/85 backdrop-blur-md border-b border-rule"
      )}
    >
      <div className="mx-auto max-w-[1366px] px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          href="/"
          aria-label="G.Sam Art Gallery — Home"
          className={cn(
            "font-script-hero leading-none transition-colors",
            transparentNav ? "text-paper" : "text-ink"
          )}
          style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
        >
          G.Sam
        </Link>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden inline-flex flex-col gap-[5px] p-2",
            transparentNav ? "text-paper" : "text-ink"
          )}
        >
          <span className="block w-6 h-[2px] bg-current" />
          <span className="block w-6 h-[2px] bg-current" />
          <span className="block w-6 h-[2px] bg-current" />
        </button>

        <nav
          className={cn(
            "hidden md:flex items-center gap-8 uppercase tracking-[0.18em] text-[0.78rem] font-semibold",
            transparentNav ? "text-paper" : "text-ink"
          )}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 hover:opacity-70 transition-opacity",
                  active && "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-current"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open && (
        <div className="md:hidden bg-paper border-t border-rule">
          <nav className="px-6 py-6 flex flex-col gap-4 uppercase tracking-[0.18em] text-sm font-semibold text-ink">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1 hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
