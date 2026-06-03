"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CartIcon } from "@/components/cart-icon";

const NAV_ITEMS = [
  { href: "/#about", label: "About" },
  { href: "/travel", label: "Travel" },
  { href: "/store", label: "Store" },
  { href: "/people", label: "People" },
  { href: "/letters", label: "Letters" },
];

const CONNECT_ITEMS = [
  { href: "/contact", label: "Talk to Us" },
  { href: "/career", label: "Career" },
  { href: "/volunteering", label: "Volunteering" },
];

const DARK_HERO_ROUTES = new Set(["/", "/travel"]);

export function SiteHeader() {
  const pathname = usePathname();
  const overDarkHero = DARK_HERO_ROUTES.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [mobileConnectOpen, setMobileConnectOpen] = useState(false);
  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const threshold = pathname === "/" ? window.innerHeight * 0.8 : 60;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (connectRef.current && !connectRef.current.contains(e.target as Node)) {
        setConnectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const lightTreatment = overDarkHero && !scrolled;
  const hidden = pathname === "/" && !scrolled;
  const connectActive = CONNECT_ITEMS.some((item) => pathname === item.href);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        hidden
          ? "opacity-0 -translate-y-full pointer-events-none"
          : lightTreatment
          ? "bg-linear-to-b from-black/40 via-black/15 to-transparent text-paper"
          : "bg-paper/90 backdrop-blur-md border-b border-rule text-ink",
      )}
    >
      <div className="mx-auto max-w-341.5 px-6 md:px-10 h-20 flex items-center justify-between gap-4 md:gap-x-12 lg:gap-x-20">
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

            {/* Connect dropdown */}
            <div
              ref={connectRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setConnectOpen((v) => !v)}
                className={cn(
                  "relative py-1 hover:opacity-70 transition-opacity whitespace-nowrap flex items-center gap-1 uppercase tracking-[0.16em] text-[0.74rem] font-semibold",
                  connectActive &&
                    "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-current",
                )}
              >
                Get in Touch
                <svg
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    connectOpen && "rotate-180",
                  )}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {connectOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[168px] bg-paper border border-rule shadow-sm z-50">
                  {CONNECT_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setConnectOpen(false)}
                      className={cn(
                        "block px-5 py-3 text-ink hover:bg-ink/5 transition-colors whitespace-nowrap tracking-[0.16em] text-[0.74rem] font-semibold uppercase",
                        pathname === item.href && "opacity-50 pointer-events-none",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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

            {/* Connect expandable section */}
            <div>
              <button
                type="button"
                onClick={() => setMobileConnectOpen((v) => !v)}
                className="flex items-center gap-1.5 py-1 hover:opacity-70 w-full text-left"
              >
                Get in Touch
                <svg
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    mobileConnectOpen && "rotate-180",
                  )}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {mobileConnectOpen && (
                <div className="mt-2 ml-4 flex flex-col gap-3 border-l border-rule pl-4">
                  {CONNECT_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        setMobileConnectOpen(false);
                      }}
                      className="py-0.5 hover:opacity-70 normal-case tracking-wide text-xs"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
    </motion.header>
  );
}

