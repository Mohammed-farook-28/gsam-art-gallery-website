import Link from "next/link";
import { AirmailStripe } from "@/components/airmail-stripe";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      <AirmailStripe />
      {/* Large watermark G.Sam submerged at the bottom */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 font-script-hero leading-none text-paper select-none w-full text-center"
        style={{ fontSize: "clamp(6rem, 48vw, 42rem)", opacity: 0.1, transform: "translate(-50%, 52%)", letterSpacing: "-0.02em" }}
      >
        G.Sam
      </p>
      <div className="relative z-10 mx-auto max-w-341.5 px-6 md:px-10 py-12 md:py-16 grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1.4fr]">
        <div className="min-w-0 sm:col-span-2 md:col-span-1">
          <p className="font-script-hero text-5xl leading-none">G.Sam</p>
          <p className="mt-2 uppercase tracking-[0.18em] text-xs text-paper/70">
            Art Gallery
          </p>
          <p className="mt-6 font-script text-xl md:text-2xl leading-tight text-paper/90">
            for a million dreams to stay alive.
          </p>
        </div>

        <nav className="flex flex-col gap-3 uppercase tracking-[0.18em] text-xs text-paper/80">
          <Link href="/#about" className="hover:text-paper">About</Link>
          <Link href="/travel" className="hover:text-paper">Travel</Link>
          <Link href="/store" className="hover:text-paper">Store</Link>
          <Link href="/people" className="hover:text-paper">People</Link>
          <Link href="/letters" className="hover:text-paper">Letters</Link>
          <Link href="/contact" className="hover:text-paper">Talk to Us</Link>
          <Link href="/career" className="hover:text-paper">Career</Link>
          <Link href="/volunteering" className="hover:text-paper">Volunteering</Link>
        </nav>

        <div className="text-sm text-paper/80">
          <p className="uppercase tracking-[0.18em] text-xs text-paper/60">Write to us</p>
          <a
            href="mailto:people@gsamartgallery.com"
            className="mt-2 block underline-offset-4 hover:underline"
          >
            people@gsamartgallery.com
          </a>
          <p className="mt-8 text-xs text-paper/50">
            © {new Date().getFullYear()} G.Sam Art Gallery. Every art has a story.
          </p>
          <p className="mt-3 text-xs text-paper/30">
            Website built by{" "}
            <a
              href="https://thebotcompany.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-paper/60 transition-colors"
            >
              The Bot Company Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>

  );
}
