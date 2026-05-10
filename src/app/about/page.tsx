import Image from "next/image";
import { DisplaySerif } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";

export const metadata = {
  title: "About — G.Sam Art Gallery",
  description:
    "Why we exist: to empower lives, to capture the beauty of life, for a million dreams to stay alive.",
};

export default function AboutPage() {
  return (
    <>
      <div className="h-20" /> {/* spacer for fixed header */}

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

      {/* MEGA WHY? — full-width, with script tagline running through */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-20 md:py-32">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <DisplaySerif as="h1" className="text-[clamp(8rem,22vw,22rem)]">
            Why?
          </DisplaySerif>
          <span className="pb-6 md:pb-10">
            <MusicStaffScript size="lg" className="text-ink">
              for a million dreams to stay alive.
            </MusicStaffScript>
          </span>
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
