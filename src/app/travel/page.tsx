import { DisplaySans } from "@/components/display";
import { AirmailStripe } from "@/components/airmail-stripe";
import { RetreatSignupForm } from "./retreat-signup-form";
import { VideoBg } from "@/components/video-bg";

export const metadata = {
  title: "Travel + Art Experience — G.Sam Art Gallery",
  description:
    "An immersive seven-day art retreat in Thailand. City. Village. Mountain. Reconnect with your creativity.",
};

export default function TravelPage() {
  return (
    <>
      {/* HERO — cinematic video with "Travel + Art / Experience" overlay */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-ink">
        <VideoBg
          src="/videos/travel-hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          overlay
          overlayOpacity={0.15}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-10 md:px-16 pb-20 md:pb-28">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="font-sans font-black text-paper text-xl md:text-2xl tracking-wide drop-shadow">
              Travel + Art
            </span>
          </div>
          <h1 className="font-sans font-black text-paper text-[clamp(5rem,17vw,15rem)] leading-[0.9] uppercase drop-shadow-lg -ml-1">
            Experience
          </h1>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
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

      {/* UPCOMING — Thailand. Video with overlaid heading, Thai script, and description. */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10">
        <h2 className="font-sans font-black text-[clamp(2rem,5vw,4rem)] uppercase leading-tight mb-6">
          Upcoming International experience
        </h2>
        <div className="relative aspect-[2732/1300] w-full overflow-hidden bg-ink">
          <VideoBg
            src="/videos/thailand-landscape.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            overlay
            overlayOpacity={0.25}
          />
          {/* Thai text left */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 md:p-10">
            <p className="font-thai text-white/70 text-4xl md:text-6xl leading-none drop-shadow-lg">ว</p>
            <p className="font-thai-display text-white text-[clamp(3.5rem,9vw,8rem)] leading-none drop-shadow-lg">
              ไทยแลนด์
            </p>
          </div>
          {/* City · Village · Mountain + description right */}
          <div className="absolute inset-y-0 right-0 flex flex-col justify-center p-6 md:p-10 max-w-[360px] text-right">
            <p className="font-sans font-bold text-white text-xs md:text-sm tracking-[0.2em] drop-shadow">
              CITY · VILLAGE · MOUNTAIN
            </p>
            <p className="mt-3 text-white/90 text-xs md:text-sm leading-relaxed drop-shadow">
              Throughout the retreat, artists will explore the beauty of Thailand&apos;s cities,
              villages, mountains, and natural spaces. Each day introduces a new creative
              activity designed to awaken observation, imagination, and sensory awareness.
              Participants will engage in exercises such as{" "}
              <strong className="font-semibold">
                live sketching, memory drawing, movement studies, natural pigment painting,
                and mixed-media exploration.
              </strong>
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
          These practices encourage artists to experiment freely and discover new ways of
          expressing themselves.
        </p>
      </section>

      {/* SAWADEE KHAP — Thai greeting text + circular video of waterfall on right */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <h2 className="font-thai-display text-[clamp(3rem,9vw,8rem)] leading-tight text-ink">
              สวัสดี ครับ
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-ink/85 max-w-prose">
              The Thailand Art Retreat is a seven-day immersive journey designed for artists
              who wish to slow down, reconnect with themselves, and rediscover their creativity.
              Organized by Gsam Art Gallery in collaboration with Ula Experience, this retreat
              brings together artists from different backgrounds to explore art through travel,
              culture, and meaningful human experiences.
            </p>
            <a
              href="#sign-up"
              className="mt-8 inline-block text-base font-semibold underline underline-offset-8 decoration-1 hover:opacity-70"
            >
              Explore the experience →
            </a>
          </div>
          {/* Circular video — waterfall / nature loop */}
          <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-full bg-ink">
            <VideoBg
              src="/videos/hero-nature.mp4"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* ว ula overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-thai-display text-white/80 text-[clamp(4rem,12vw,7rem)] drop-shadow-xl leading-none">
                ว
              </span>
            </div>
          </div>
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
