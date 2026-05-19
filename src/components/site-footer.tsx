import Link from "next/link";
import { AirmailStripe } from "@/components/airmail-stripe";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <AirmailStripe />
      <div className="mx-auto max-w-341.5 px-6 md:px-10 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-script-hero text-5xl leading-none">G.Sam</p>
          <p className="mt-2 uppercase tracking-[0.18em] text-xs text-paper/70">
            Art Gallery
          </p>
          <p className="mt-6 font-script text-2xl leading-tight text-paper/90">
            for a million dreams to stay alive.
          </p>
        </div>

        <nav className="flex flex-col gap-3 uppercase tracking-[0.18em] text-xs text-paper/80">
          <Link href="/about" className="hover:text-paper">About</Link>
          <Link href="/travel" className="hover:text-paper">Travel</Link>
          <Link href="/store" className="hover:text-paper">Store</Link>
          <Link href="/people" className="hover:text-paper">People</Link>
          <Link href="/letters" className="hover:text-paper">Send a letter</Link>
          <Link href="/career" className="hover:text-paper">Career</Link>
          <Link href="/contact" className="hover:text-paper">Get in touch</Link>
        </nav>

        <div className="text-sm text-paper/80">
          <p className="uppercase tracking-[0.18em] text-xs text-paper/60">Write to us</p>
          <a
            href="mailto:g.s.a.m.art.gallery25@gmail.com"
            className="mt-2 block underline-offset-4 hover:underline"
          >
            g.s.a.m.art.gallery25@gmail.com
          </a>
          <p className="mt-8 text-xs text-paper/50">
            © {new Date().getFullYear()} G.Sam Art Gallery. Every art has a story.
          </p>
        </div>
      </div>
    </footer>
  );
}
