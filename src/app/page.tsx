import Image from "next/image";
import Link from "next/link";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";

export default function HomePage() {
  return (
    <>
      {/* HERO — full-bleed video with text overlays recreated from Canva reference */}
      <section className="relative w-full h-svh min-h-150 overflow-hidden bg-ink">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* subtle dark scrim for text legibility */}
        <div className="absolute inset-0 bg-ink/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-paper/25" />

        {/* Hero text overlay — two-row flex layout, equal padding on both sides */}
        <div className="absolute inset-0 hidden lg:flex flex-col justify-between px-[5%] pt-[10svh] pb-[8svh] pointer-events-none select-none">

          {/* Top row: G.Sam left | Nav links right */}
          <div className="flex items-start justify-between gap-6">
            <span
              className="font-script-hero text-paper leading-none"
              style={{
                fontSize: "clamp(4.5rem, 13vw, 17rem)",
                textShadow: "rgba(0,0,0,0.3) 2px 2px 4px",
              }}
            >
              G.Sam
            </span>

            <nav className="flex flex-col items-end pointer-events-auto" style={{ gap: "1rem", paddingTop: "1rem" }}>
              {[
                { href: "/about",  label: "ABOUT"  },
                { href: "/travel", label: "TRAVEL" },
                { href: "/store",  label: "STORE"  },
                { href: "/people", label: "PEOPLE" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-paper font-bold tracking-widest text-3xl hover:opacity-75"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom row: ART GALLERY left | Get in touch right */}
          <div className="flex items-end justify-between gap-6">
            <span
              className="font-sans text-paper font-bold leading-none tracking-wide"
              style={{ fontSize: "clamp(2rem, 7vw, 9rem)" }}
            >
              ART&nbsp;&nbsp;GALLERY
            </span>

            <Link
              href="/contact"
              className="font-sans text-paper font-bold uppercase tracking-wide hover:opacity-75 pointer-events-auto whitespace-nowrap"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 4.5rem)" }}
            >
              Get in touch
            </Link>
          </div>

        </div>

        {/* Mobile: G.Sam + ART GALLERY stacked, no nav (handled by burger menu) */}
        <div className="absolute inset-0 flex lg:hidden flex-col justify-between px-5 pt-[12svh] pb-[10svh] pointer-events-none select-none">
          <span
            className="font-script-hero text-paper leading-none"
            style={{ fontSize: "clamp(4rem, 18vw, 7rem)", textShadow: "rgba(0,0,0,0.3) 2px 2px 4px" }}
          >
            G.Sam
          </span>
          <span
            className="font-sans text-paper font-bold leading-none tracking-wide"
            style={{ fontSize: "clamp(1.8rem, 10vw, 4rem)" }}
          >
            ART&nbsp;&nbsp;GALLERY
          </span>
        </div>

        {/* scroll hint */}
        <a
          href="#intro"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/80 text-[0.7rem] uppercase tracking-[0.3em] hover:text-paper"
        >
          ↓ Scroll
        </a>
      </section>

      {/* INTRO — punchy paragraph + circular Why? photo */}
      <section
        id="intro"
        className="mx-auto max-w-300 px-6 md:px-10 py-24 md:py-32 grid gap-12 md:grid-cols-[1.4fr_1fr] items-center"
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

        <div className="relative aspect-square w-full max-w-md mx-auto rounded-full overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover grayscale"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/why-circle.mp4" type="video/mp4" />
          </video>
          <span className="absolute inset-0 flex items-center justify-center">
            <MusicStaffScript size="xl" className="text-paper drop-shadow">Why?</MusicStaffScript>
          </span>
        </div>
      </section>

      {/* TEASERS — 4 doors into the gallery */}
      <section className="mx-auto max-w-341.5 px-6 md:px-10 py-12 md:py-20">
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
            image="/canva-extracts/krishnamoorthy-portrait.jpg"
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
            image="/canva-extracts/post-postcard-sun.jpg"
          />
        </ul>
      </section>

      {/* CATEGORY STRIP — black bar mirroring the design */}
      <AirmailStripe className="mt-12" />
      <nav className="bg-ink text-paper">
        <ul className="mx-auto max-w-341.5 px-6 md:px-10 py-5 flex flex-wrap items-center gap-x-10 gap-y-3 uppercase tracking-[0.18em] text-xs">
          <li><Link href="/store?category=postcards" className="hover:opacity-70">Postcards</Link></li>
          <li><Link href="/store?category=greeting-cards" className="hover:opacity-70">Greeting cards</Link></li>
          <li><Link href="/people" className="hover:opacity-70">People</Link></li>
          <li><Link href="/store" className="hover:opacity-70">Buy</Link></li>
          <li><Link href="/letters" className="hover:opacity-70">Sell</Link></li>
        </ul>
      </nav>

      {/* TEMPLE / ART GALLERY closer */}
      <section className="bg-ink text-paper">
        <Image
          src="/canva-extracts/345.png"
          alt="Brihadeeshwarar temple — pen and ink"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto opacity-90"
        />
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
        <div className="relative aspect-4/5 overflow-hidden bg-cream">
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
