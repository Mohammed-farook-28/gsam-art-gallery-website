import Image from "next/image";
import Link from "next/link";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";

export default function HomePage() {
  return (
    <>
      {/* HERO — full-bleed forest photo with G.Sam + ART GALLERY (text baked into image
          for now; replace public/canva-extracts/hero-forest.jpg with a clean photo
          later and the overlay below will activate properly). */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-ink">
        <Image
          src="/canva-extracts/hero-forest.jpg"
          alt="G.Sam Art Gallery — a still forest pond"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle scrim so the bottom edge fades into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
        <a
          href="#intro"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/90 text-xs uppercase tracking-[0.3em] hover:text-paper"
        >
          ↓ Scroll
        </a>
      </section>

      {/* INTRO — punchy paragraph + circular Why? photo */}
      <section
        id="intro"
        className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32 grid gap-12 md:grid-cols-[1.4fr_1fr] items-center"
      >
        <div className="font-sans">
          <p className="text-2xl md:text-4xl leading-snug text-ink">
            Gsam art gallery is for every human,{" "}
            <span className="font-semibold">a place where emotions connects</span> and{" "}
            <span className="font-semibold">stories inspire you</span> in the form of art.
          </p>
          <p className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-prose">
            Gsam art gallery is one of the firsts. A unique space dedicated to embrace every
            soul, to create a permanent collection of their memories, to collect emotions, to
            create a way to connect with other humans, to capture the journey of life in this
            World. Gsam art gallery have found home for 200+ works of art.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border-b border-ink pb-1 hover:opacity-70"
          >
            Read our why →
          </Link>
        </div>

        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src="/canva-extracts/why-circle.jpg"
            alt="Reflections in still water"
            fill
            sizes="(min-width: 768px) 36vw, 80vw"
            className="rounded-full object-cover grayscale"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <MusicStaffScript size="xl" className="text-paper drop-shadow">Why?</MusicStaffScript>
          </span>
        </div>
      </section>

      {/* TEASERS — 4 doors into the gallery */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-12 md:py-20">
        <h2 className="sr-only">Browse the gallery</h2>
        <ul className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Teaser
            href="/store"
            kicker="Store"
            title="Postcards"
            tagline="Every art has a story."
            image="/canva-extracts/store-stream-postcards.jpg"
          />
          <Teaser
            href="/people"
            kicker="People"
            title="People's Store"
            tagline="We share their stories. We share Our profits."
            image="/canva-extracts/peoples-store.jpg"
          />
          <Teaser
            href="/travel"
            kicker="Travel + Art"
            title="Thailand"
            tagline="City · Village · Mountain."
            image="/canva-extracts/travel-mountains-hero.jpg"
          />
          <Teaser
            href="/letters"
            kicker="A service"
            title="We post it for you"
            tagline="Send your message; we will write & post it."
            image="/canva-extracts/we-post-it-for-you.jpg"
          />
        </ul>
      </section>

      {/* CATEGORY STRIP — black bar mirroring the design */}
      <AirmailStripe className="mt-12" />
      <nav className="bg-ink text-paper">
        <ul className="mx-auto max-w-[1366px] px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-10 gap-y-3 uppercase tracking-[0.18em] text-xs">
          <li><Link href="/store?category=postcards" className="hover:opacity-70">Postcards</Link></li>
          <li><Link href="/store?category=greeting-cards" className="hover:opacity-70">Greeting cards</Link></li>
          <li><Link href="/people" className="hover:opacity-70">People</Link></li>
          <li><Link href="/store" className="hover:opacity-70">Buy</Link></li>
          <li><Link href="/letters" className="hover:opacity-70">Sell</Link></li>
        </ul>
      </nav>

      {/* TEMPLE / ART GALLERY closer */}
      <section className="relative bg-ink text-paper overflow-hidden">
        <div className="relative w-full h-[80svh] min-h-[520px]">
          <Image
            src="/canva-extracts/temple-art-gallery.jpg"
            alt="Brihadeeshwarar temple — pen and ink"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-90"
          />
        </div>
      </section>
    </>
  );
}

function Teaser({
  href,
  kicker,
  title,
  tagline,
  image,
}: {
  href: string;
  kicker: string;
  title: string;
  tagline: string;
  image: string;
}) {
  return (
    <li>
      <Link href={href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-muted">{kicker}</p>
        <p className="mt-1 font-sans font-black text-3xl leading-tight">{title}</p>
        <p className="mt-1 font-script text-xl leading-tight text-ink/70">{tagline}</p>
      </Link>
    </li>
  );
}
