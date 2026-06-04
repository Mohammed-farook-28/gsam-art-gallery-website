import type { Metadata } from "next";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { LetterSection } from "./letter-section";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "We post it for you — G.Sam Art Gallery",
  description:
    "Send us your message. We will write a postcard and post it for you. The joy of receiving a letter, brought back.",
};

export default function LettersPage() {
  return (
    <>
      <div className="h-20" />

      {/* HEADLINE */}
      <section className="mx-auto max-w-341.5 px-6 md:px-10 pt-12 md:pt-20">
        <div className="text-ink/80">
          <MusicStaffScript size="sm">
            send us your message, we will write and
          </MusicStaffScript>
        </div>
        <DisplaySans as="h1" className="text-[clamp(3rem,12vw,11rem)] -mt-2">
          we post it for you.
        </DisplaySans>
      </section>

      <AirmailStripe className="mt-12" />

      {/* WHY THIS EXISTS + SAMPLE POSTCARD */}
      <AnimateIn>
      <section className="mx-auto max-w-300 px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
          <div className="flex flex-col items-center gap-2">
            <MusicStaffScript size="sm">Experience the joy of writing a letter</MusicStaffScript>
            <MusicStaffScript size="sm">for your loved one,</MusicStaffScript>
          </div>
          <p className="mt-6">
            Writing a letter, posting it and waiting for the person to receive it. We are
            building <strong className="font-semibold">a bridge for a meaningful conversation.</strong>{" "}
            The joy of the person receiving the letter is the value we are adding to the
            modern world.
          </p>
          <p className="mt-4">
            At Gsam art gallery,{" "}
            <strong className="font-semibold">every art has a story.</strong> The original
            arts done with patience have been translated into postcards for you.
          </p>
        </div>
      </section>
      </AnimateIn>

      {/* SAMPLE LETTER */}
      <AnimateIn>
      <section className="max-w-200 ml-auto pr-[50px] pl-6 md:pl-10 py-16">
        <p className="font-serif text-sm uppercase tracking-[0.18em] text-muted text-left">
          A letter we recently posted
        </p>
        <blockquote className="mt-6 text-base md:text-lg leading-relaxed text-ink/90 font-serif italic text-left">
          <p className="not-italic font-sans font-semibold">Zenitsu —</p>
          <p className="mt-3">
            Dearest son, Live the fullest, think everyone is you. Remember trust is like an
            ocean. Dad and mom are waiting eagerly for you with love in our hearts.
          </p>
          <p className="mt-3 not-italic font-script text-2xl">With love, Amma &amp; Appa.</p>
        </blockquote>
      </section>
      </AnimateIn>

      {/* THE FORM */}
      <AnimateIn>
        <LetterSection />
      </AnimateIn>
    </>
  );
}
