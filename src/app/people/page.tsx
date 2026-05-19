import Image from "next/image";
import Link from "next/link";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";

export const metadata = {
  title: "People — G.Sam Art Gallery",
  description:
    "Everyone is an artist. We share their stories. We share our profits. Their dreams become postcards.",
};

const STORIES = [
  {
    name: "Mr. Krishnamoorthy",
    quote:
      "I wanted to be like a banyan tree for my family, but life…",
    body:
      "Be the small light at the end of the tunnel to help a soul find its way. For their kids&apos; school fee, to buy their favourite meal, for their mother&apos;s operation, to buy a birthday cake, to save money to go home, and a million other dreams.",
  },
] as const;

export default function PeoplePage() {
  return (
    <>
      <div className="h-20" />

      {/* HEADLINE */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 pt-12 md:pt-20">
        <DisplaySans as="h1" className="text-[clamp(2.5rem,8vw,7rem)]">
          everyone is an artist,
        </DisplaySans>
        <p className="mt-3 text-base md:text-lg text-muted">
          We have been fooled by the world to think that we are not artists.
        </p>
      </section>

      {/* 3-IMAGE STRIP */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 mt-10">
        <div className="relative w-full">
          <Image
            src="/canva-extracts/Screenshot 2026-05-19 130049.png"
            alt="Stadium screens, sunset audience, and a community sketch session"
            width={0}
            height={0}
            sizes="(min-width: 1024px) 1366px, 100vw"
            className="w-full h-auto"
          />
        </div>
        <p className="mt-4 text-right text-sm md:text-base font-script text-ink/70">
          what&apos;s your story?
        </p>
      </section>

      {/* TELL THE WORLD → POSTCARDS */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-20 md:py-28">
        <p className="text-sm md:text-base font-script text-ink/80">tell the world…</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-6 gap-y-3">
          <DisplaySans className="text-[clamp(3.5rem,11vw,9.5rem)]">your story</DisplaySans>
          <span className="pb-4">
            <MusicStaffScript size="md">we design it into</MusicStaffScript>
          </span>
          <DisplaySans className="text-[clamp(3.5rem,11vw,9.5rem)]">postcards</DisplaySans>
        </div>
      </section>

      <AirmailStripe />

      {/* PROFIT-SHARING MESSAGE + POSTCARD MOCKUP */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] items-center">
          <div className="max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
            <p>
              At Gsam Art Gallery, <strong className="font-semibold">we share our profits</strong>{" "}
              with people. Your story have value. We collect your dreams, your emotions. We share
              it with the world through postcards.
            </p>
            <Link
              href="/letters"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border-b border-ink pb-1 hover:opacity-70"
            >
              Send us your story →
            </Link>
          </div>
          <div className="w-full">
            <Image
              src="/canva-extracts/Copy of Postcard set - 01.png"
              alt="Hand-drawn postcard front and back"
              width={0}
              height={0}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* PEOPLE'S STORE STORIES */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 pb-24">
        <p className="font-script text-2xl md:text-3xl text-ink/80">People&apos;s</p>
        <DisplaySans as="h2" className="text-[clamp(2.5rem,8vw,7rem)] -mt-1">
          Store
        </DisplaySans>
        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.4fr] items-start">
          <div className="relative aspect-[3/4] w-full max-w-md">
            <Image
              src="/canva-extracts/Screenshot 2026-05-19 125014.png"
              alt="Mr. Krishnamoorthy portrait"
              fill
              sizes="(min-width: 768px) 36vw, 80vw"
              className="object-contain"
            />
          </div>
          <ul className="space-y-12">
            {STORIES.map((s) => (
              <li key={s.name}>
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-muted">
                  {s.name}
                </p>
                <p className="mt-3 font-script text-2xl md:text-3xl text-ink/85 leading-snug">
                  {s.quote}
                </p>
                <p
                  className="mt-4 text-base leading-relaxed text-ink/85"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </li>
            ))}
            <li className="border-t border-rule pt-6 text-base md:text-lg leading-relaxed">
              We share <strong className="font-semibold">their stories to you</strong>, We share
              <strong className="font-semibold"> Our profits with them.</strong>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
