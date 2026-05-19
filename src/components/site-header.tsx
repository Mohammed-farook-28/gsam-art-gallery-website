"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { CartIcon } from "@/components/cart-icon";

const NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/travel", label: "Travel" },
  { href: "/store", label: "Store" },
  { href: "/people", label: "People" },
  { href: "/letters", label: "Letters" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Get in touch" },
];

// Routes that begin with a dark, full-bleed hero. While the user is at the
// top of these pages, the header rides over the photo with light text and a
// faint scrim. After scrolling past the hero, it switches to the standard
// solid white treatment.
const DARK_HERO_ROUTES = new Set(["/", "/travel"]);

export function SiteHeader() {
  const pathname = usePathname();
  const overDarkHero = DARK_HERO_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const threshold = pathname === "/" ? window.innerHeight * 0.8 : 60;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const lightTreatment = overDarkHero && !scrolled;
  // On homepage: hide until scrolled past the hero
  const hidden = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        hidden
          ? "opacity-0 -translate-y-full pointer-events-none"
          : lightTreatment
          ? "bg-linear-to-b from-black/40 via-black/15 to-transparent text-paper"
          : "bg-paper/90 backdrop-blur-md border-b border-rule text-ink",
      )}
    >
      <div className="mx-auto max-w-341.5 px-6 md:px-10 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="G.Sam Art Gallery — Home"
          className={cn(
            "font-script-hero leading-none transition-colors",
            lightTreatment ? "text-paper drop-shadow" : "text-ink",
          )}
          style={{ fontSize: "clamp(2rem, 3.6vw, 2.75rem)" }}
        >
          G.Sam
        </Link>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1">
          <CartIcon className={lightTreatment ? "text-paper" : "text-ink"} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex flex-col gap-1.25 p-2"
          >
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-7">
          <nav className="flex items-center gap-5 lg:gap-7 uppercase tracking-[0.16em] text-[0.74rem] font-semibold">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 hover:opacity-70 transition-opacity whitespace-nowrap",
                    active &&
                      "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-current",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <CartIcon className={lightTreatment ? "text-paper" : "text-ink"} />
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-paper border-t border-rule text-ink">
          <nav className="px-6 py-6 flex flex-col gap-4 uppercase tracking-[0.18em] text-sm font-semibold">
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
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="py-1 hover:opacity-70"
            >
              Cart
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
