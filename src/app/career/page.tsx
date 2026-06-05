import type { Metadata } from "next";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AnimateIn } from "@/components/animate-in";
import { CareerInteractive } from "./career-interactive";

export const metadata: Metadata = {
  title: "Career — G.Sam Art Gallery",
  description:
    "Join us to be the change. Requirement: being human. Tell us why you chose us, your dreams and goals.",
};

export default function CareerPage() {
  return (
    <>
      <div className="h-20" />

      {/* ── HERO ── */}
      <section className="mx-auto max-w-341.5 px-6 md:px-10 pt-10 md:pt-16 pb-10">
        <DisplaySans as="h1" className="text-[clamp(4rem,10vw,9rem)] leading-none mb-4">
          Career
        </DisplaySans>
        <div className="text-ink/80 mb-6">
          <MusicStaffScript size="sm">Join us to be the change</MusicStaffScript>
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-ink/90 max-w-md">
          <strong className="font-semibold">Requirement: being human.</strong>{" "}
          We are curious to know why you chose us, your dreams and goals.
        </p>
      </section>

      {/* ── FORM ── navbar reveals here on scroll ── */}
      <AnimateIn>
        <section className="mx-auto max-w-341.5 px-6 md:px-10 pb-24 md:pb-32">
          <CareerInteractive />
        </section>
      </AnimateIn>
    </>
  );
}
