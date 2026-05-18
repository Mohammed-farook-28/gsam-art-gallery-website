import Image from "next/image";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { RetreatSignupForm } from "./retreat-signup-form";

export const metadata = {
  title: "Travel + Art Experience — G.Sam Art Gallery",
  description:
    "An immersive seven-day art retreat in Thailand. City. Village. Mountain. Reconnect with your creativity.",
};

export default function TravelPage() {
  return (
    <>
      {/* HERO — mountains photo with the "Travel + Art / Experience" headline
          baked into the Canva design. Header is hidden until scroll. */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-ink">
        <Image
          src="/canva-extracts/travel-mountains-hero.jpg"
          alt="Travel + Art Experience — karst mountains over still water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
        {/* sr-only h1 so the page still has a clean heading hierarchy */}
        <h1 className="sr-only">Travel + Art Experience</h1>
      </section>

      {/* BLURB */}
      <section className="mx-auto max-w-[900px] px-6 md:px-10 py-12 md:py-16">
        <p className="text-base md:text-lg leading-relaxed text-ink/85">
          We have developed an international travel + art experience where artists travel,
          experience a new culture, and create work through{" "}
          <strong className="font-semibold">guided creative exercises</strong>. The goal is to
          help artists reconnect with their creativity.
        </p>
      </section>

      {/* UPCOMING — Thailand. The image has "Upcoming International experience" +
          "ไทยแลนด์" + "City Village Mountain" baked in (design intent), so the
          page only contributes the descriptive paragraph below. */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10">
        <h2 className="sr-only">Upcoming International experience — Thailand</h2>
        <div className="relative aspect-[2732/1300] w-full overflow-hidden bg-ink">
          <Image
            src="/canva-extracts/thailand-sunset.jpg"
            alt="Upcoming International experience — Thailand. City, village, mountain."
            fill
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="object-cover"
          />
        </div>
        <p className="mt-8 max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
          Throughout the retreat, artists will explore the beauty of Thailand&apos;s cities,
          villages, mountains, and natural spaces. Each day introduces a new creative
          activity designed to awaken observation, imagination, and sensory awareness —{" "}
          <strong className="font-semibold">
            live sketching, memory drawing, movement studies, natural pigment painting,
            mixed-media exploration.
          </strong>{" "}
          These practices encourage artists to experiment freely and discover new ways of
          expressing themselves.
        </p>
      </section>

      {/* SAWADEE KHAP — Thai painted greeting + temple circle, baked into image. */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-16 md:py-24">
        <div className="relative aspect-[2732/1100] w-full overflow-hidden">
          <Image
            src="/canva-extracts/sawadee-khap.jpg"
            alt="Sawadee khap — a Thai greeting, with a temple under a waterfall"
            fill
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr] items-start max-w-[1200px] mx-auto">
          <p className="text-base md:text-lg leading-relaxed text-ink/85 max-w-prose">
            The Thailand Art Retreat is a seven-day immersive journey designed for artists
            who wish to slow down, reconnect with themselves, and rediscover their creativity.
            Organized by Gsam Art Gallery in collaboration with Ula Experience, this retreat
            brings together artists from different backgrounds to explore art through travel,
            culture, and meaningful human experiences.
          </p>
          <a
            href="#sign-up"
            className="md:justify-self-end self-start inline-block text-base font-semibold underline underline-offset-8 decoration-1 hover:opacity-70"
          >
            Explore the experience →
          </a>
        </div>
      </section>

      <AirmailStripe />

      {/* SIGN-UP FORM */}
      <section id="sign-up" className="mx-auto max-w-[800px] px-6 md:px-10 py-20 md:py-28">
        <DisplaySans as="h2" className="text-5xl md:text-6xl">
          Reserve a seat.
        </DisplaySans>
        <p className="mt-3 font-script text-2xl md:text-3xl text-ink/80">
          Tell us a little about you and we&apos;ll be in touch.
        </p>
        <div className="mt-10">
          <RetreatSignupForm />
        </div>
      </section>
    </>
  );
}
