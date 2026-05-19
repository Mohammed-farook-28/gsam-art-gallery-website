import Link from "next/link";
import { DisplaySerif } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { VideoBg } from "@/components/video-bg";

export const metadata = {
  title: "About — G.Sam Art Gallery",
  description:
    "Why we exist: to empower lives, to capture the beauty of life, for a million dreams to stay alive.",
};

export default function AboutPage() {
  return (
    <>
      {/* VIDEO HERO — full-screen nature video with G.Sam / ART GALLERY overlay */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-ink">
        <VideoBg
          src="/videos/hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          overlay
          overlayOpacity={0.25}
        />
        {/* Desktop: two-row layout — mirrors the homepage hero exactly */}
        <div className="absolute inset-0 hidden lg:flex flex-col justify-between px-[5%] pt-[10svh] pb-[8svh] pointer-events-none select-none">
          {/* Top row: G.Sam left | Nav links right */}
          <div className="flex items-start justify-between gap-6">
            <span
              className="font-script-hero text-paper leading-none"
              style={{ fontSize: "clamp(4.5rem, 13vw, 17rem)", textShadow: "rgba(0,0,0,0.3) 2px 2px 4px" }}
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
                <Link key={href} href={href} className="font-sans text-paper font-bold tracking-widest text-3xl hover:opacity-75">
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

        {/* Mobile fallback */}
        <div className="absolute inset-0 flex lg:hidden flex-col justify-between px-5 pt-[12svh] pb-[10svh] pointer-events-none select-none">
          <span
            className="font-script-hero text-paper leading-none"
            style={{ fontSize: "clamp(4rem, 18vw, 7rem)", textShadow: "rgba(0,0,0,0.3) 2px 2px 4px" }}
          >
            G.Sam
          </span>
          <span className="font-sans text-paper font-bold leading-none tracking-wide" style={{ fontSize: "clamp(1.8rem, 10vw, 4rem)" }}>
            ART&nbsp;&nbsp;GALLERY
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
      </section>

      {/* INTRO — same paragraph as on the Home page in Canva */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 pt-16 md:pt-24 grid gap-12 md:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <p className="text-3xl md:text-5xl leading-tight text-ink">
            Gsam art gallery is for every human,{" "}
            <span className="font-semibold">a place where emotions connects</span> and{" "}
            <span className="font-semibold">stories inspire you</span> in the form of art.
          </p>
          <p className="mt-8 text-base md:text-lg text-muted leading-relaxed max-w-prose">
            Gsam art gallery is one of the firsts. A unique space dedicated to embrace every
            soul, to create a permanent collection of their memories, to collect emotions, to
            create a way to connect with other humans, to capture the journey of life in this
            World. Gsam art gallery have found home for 200+ works of art.
          </p>
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

      {/* MEGA WHY? — stacked so descender of "y" never touches the script line */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-20 md:py-32">
        <div className="flex flex-col">
          <DisplaySerif as="h1" className="text-[clamp(8rem,22vw,22rem)] leading-none">
            Why?
          </DisplaySerif>
          <div className="mt-10 md:mt-14">
            <MusicStaffScript size="lg" className="text-ink">
              for a million dreams to stay alive.
            </MusicStaffScript>
          </div>
        </div>
      </section>

      {/* VISION + MISSION — two columns */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-24 grid gap-12 md:gap-16 md:grid-cols-2">
        <article>
          <DisplaySerif as="h2" className="text-6xl md:text-7xl">Our Vision</DisplaySerif>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/85">
            Encouraging people to stay in the present and introducing moments of slow living.
            We create a set of conversations from peoples hearts to tell the world. A million
            dreams to stay alive in the form of art. Breathing life into our old ways of
            <strong className="font-semibold"> writing letters to our loved ones.</strong>
          </p>
        </article>
        <article>
          <DisplaySerif as="h2" className="text-6xl md:text-7xl">Our Mission</DisplaySerif>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/85">
            To empower lives of every human, capture the beauty of life. To be human, to feel
            deeply, to experience life. To create a way for people to let out their emotions,
            creating empathy at a global scale.
          </p>
        </article>
      </section>

      <AirmailStripe />
    </>
  );
}
