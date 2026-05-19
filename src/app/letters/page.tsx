import Image from "next/image";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { LetterForm } from "./letter-form";

export const metadata = {
  title: "We post it for you — G.Sam Art Gallery",
  description:
    "Send us your message. We will write a postcard and post it for you. The joy of receiving a letter, brought back.",
};

export default function LettersPage() {
  return (
    <>
      <div className="h-20" />

      {/* HEADLINE */}
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 pt-12 md:pt-20">
        <p className="font-script text-2xl md:text-3xl text-ink/80">
          send us your message, we will write and
        </p>
        <DisplaySans as="h1" className="text-[clamp(3rem,12vw,11rem)] -mt-2">
          we post it for you.
        </DisplaySans>
      </section>

      <AirmailStripe className="mt-12" />

      {/* WHY THIS EXISTS + SAMPLE POSTCARD */}
      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 md:py-24 grid gap-12 md:grid-cols-[1fr_1fr] items-center">
        <div className="max-w-prose text-base md:text-lg leading-relaxed text-ink/85">
          <p className="font-script text-2xl md:text-3xl text-ink/80">
            Experience the joy of writing a letter for your loved one,
          </p>
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
        <div className="w-full">
          <Image
            src="/canva-extracts/postcard-set-01.jpg"
            alt="Postcard set design"
            width={0}
            height={0}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* SAMPLE LETTER */}
      <section className="mx-auto max-w-[800px] px-6 md:px-10 py-16">
        <p className="font-serif text-sm uppercase tracking-[0.18em] text-muted">
          A letter we recently posted
        </p>
        <blockquote className="mt-6 border-l-2 border-airmail-red pl-6 text-base md:text-lg leading-relaxed text-ink/90 font-serif italic">
          <p className="not-italic font-sans font-semibold">Zenitsu —</p>
          <p className="mt-3">
            Dearest son, Live the fullest, think everyone is you. Remember trust is like an
            ocean. Dad and mom are waiting eagerly for you with love in our hearts.
          </p>
          <p className="mt-3 not-italic font-script text-2xl">With love, Amma &amp; Appa.</p>
        </blockquote>
      </section>

      <AirmailStripe />

      {/* THE FORM */}
      <section className="mx-auto max-w-[900px] px-6 md:px-10 py-20 md:py-28">
        <DisplaySans as="h2" className="text-5xl md:text-6xl">
          Write your letter.
        </DisplaySans>
        <p className="mt-3 font-script text-2xl md:text-3xl text-ink/80">
          We&apos;ll handle the postcard, the stamp, and the mailbox.
        </p>
        <div className="mt-12">
          <LetterForm />
        </div>
      </section>
    </>
  );
}
