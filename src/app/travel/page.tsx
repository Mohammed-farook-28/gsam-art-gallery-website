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
      {/* HERO — mountains + Travel + Art Experience */}
      <section className="relative w-full h-[80svh] min-h-[520px] overflow-hidden bg-ink">
        <Image
          src="/canva-extracts/travel-mountains-hero.jpg"
          alt="Karst mountains over still water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
          <span className="font-script text-3xl md:text-5xl text-paper">Travel + Art.</span>
          <DisplaySans as="h1" className="text-paper text-[clamp(5rem,16vw,15rem)] -mt-2 md:-mt-6">
            Experience
          </DisplaySans>
        </div>
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

      {/* UPCOMING — Thailand */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10">
        <DisplaySans as="h2" className="text-[clamp(2.5rem,7vw,5.5rem)]">
          Upcoming International experience
        </DisplaySans>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-ink">
          <Image
            src="/canva-extracts/thailand-sunset.jpg"
            alt="Thailand mountains at sunset"
            fill
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-between gap-8 p-6 md:p-12">
            <span
              className="font-thai-display text-[clamp(3.5rem,11vw,9rem)] leading-none text-paper"
              lang="th"
            >
              ไทยแลนด์
            </span>
            <div className="text-paper max-w-sm text-right">
              <p className="uppercase tracking-[0.2em] text-xs md:text-sm font-semibold">
                City · Village · Mountain
              </p>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-paper/90">
                Throughout the retreat, artists will explore the beauty of Thailand&apos;s
                cities, villages, mountains, and natural spaces. Each day introduces a new
                creative activity designed to awaken observation, imagination, and sensory
                awareness — live sketching, memory drawing, movement studies, natural pigment
                painting, mixed-media exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAWADEE KHAP */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 grid gap-12 md:grid-cols-[1.3fr_1fr] items-center">
        <div>
          <p className="font-thai-display text-[clamp(3rem,8vw,7rem)] leading-none text-ink">
            สวัสดีครับ
          </p>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/85 max-w-prose">
            The Thailand Art Retreat is a seven-day immersive journey designed for artists
            who wish to slow down, reconnect with themselves, and rediscover their creativity.
            Organized by Gsam Art Gallery in collaboration with Ula Experience, this retreat
            brings together artists from different backgrounds to explore art through travel,
            culture, and meaningful human experiences.
          </p>
          <a
            href="#sign-up"
            className="mt-10 inline-block text-base font-semibold underline underline-offset-8 decoration-1 hover:opacity-70"
          >
            Explore the experience →
          </a>
        </div>
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src="/canva-extracts/sawadee-khap.jpg"
            alt="A small temple"
            fill
            sizes="(min-width: 768px) 36vw, 80vw"
            className="rounded-full object-cover"
          />
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
