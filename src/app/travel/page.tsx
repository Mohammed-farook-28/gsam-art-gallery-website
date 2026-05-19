import Image from "next/image";
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
      {/* HERO — new video with paper-tear mask and reference text layout */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-paper">
        <VideoBg
          src="/videos/travel-experience.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          overlay
          overlayOpacity={0.08}
        />

        {/* "Travel + Art" — dark, upper-center */}
        <div className="absolute inset-x-0 top-[38%] flex justify-center px-[5%]">
          <span className="font-sans font-black text-ink text-2xl md:text-3xl tracking-wide drop-shadow-sm">
            Travel + Art
          </span>
        </div>

        {/* "Experience" — large white, lower-left */}
        <div className="absolute bottom-[18%] left-[5%]">
          <h1
            className="font-sans font-black text-paper leading-none"
            style={{ fontSize: "clamp(4rem, 15vw, 13rem)" }}
          >
            Experience
          </h1>
        </div>

        {/* Torn paper mask at bottom */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 160"
            className="w-full block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,160 L0,115 C25,98 55,130 85,112 C115,94 140,128 175,108
                 C210,88 240,122 275,100 C310,78 345,115 385,93
                 C425,71 455,108 498,85 C541,62 570,100 615,76
                 C660,52 695,92 740,68 C785,44 820,84 868,60
                 C916,36 950,76 998,52 C1046,28 1082,68 1130,44
                 C1178,20 1215,58 1262,34 C1309,10 1348,48 1395,24
                 L1440,10 L1440,160 Z"
              fill="white"
            />
          </svg>
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

      {/* UPCOMING — Thailand. Video with overlaid heading, Thai script, and description. */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10">
        <h2 className="font-sans font-black text-[clamp(2rem,5vw,4rem)] uppercase leading-tight mb-6">
          Upcoming International experience
        </h2>
        <div className="relative aspect-[2732/1300] w-full overflow-hidden bg-ink">
          <Image
            src="/canva-extracts/thailand-scene.jpg"
            alt="Thailand landscape"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* dark scrim for legibility */}
          <div className="absolute inset-0 bg-black/30" />

          {/* "Thailand" in Charm (AW-Siam-style English) — left */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 md:p-10">
            <p
              className="font-thai-display text-white leading-none drop-shadow-lg"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
            >
              Thailand
            </p>
          </div>

          {/* CITY · VILLAGE · MOUNTAIN + description in Futura/Jost — right */}
          <div className="absolute inset-y-0 right-0 flex flex-col justify-center p-6 md:p-10 max-w-[360px] text-right">
            <p className="font-futura font-bold text-white text-xs md:text-sm tracking-[0.2em] drop-shadow uppercase">
              CITY · VILLAGE · MOUNTAIN
            </p>
            <p className="font-futura mt-3 text-white/90 text-xs md:text-sm leading-relaxed drop-shadow">
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
          {/* Blob-shaped video — waterfall loop with logo overlay */}
          <div
            className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden bg-ink"
            style={{ borderRadius: "55% 45% 42% 58% / 58% 44% 56% 42%" }}
          >
            <VideoBg
              src="/videos/thailand-waterfall.mp4"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Logo image overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image
                src="/canva-extracts/Logo design.png"
                alt="G.Sam logo"
                width={340}
                height={340}
                className="object-contain drop-shadow-xl"
              />
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
