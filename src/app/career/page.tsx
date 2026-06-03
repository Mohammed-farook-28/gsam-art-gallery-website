import type { Metadata } from "next";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { CareerForm } from "./career-form";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Career — G.Sam Art Gallery",
  description:
    "Join us to be the change. Requirement: being human. Tell us why you chose us, your dreams and goals.",
};

export default function CareerPage() {
  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-341.5 px-6 md:px-10 pt-12 md:pt-20">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <DisplaySans as="h1" className="text-[clamp(4rem,16vw,14rem)]">
            Career
          </DisplaySans>
          <span className="pb-6 md:pb-10">
            <MusicStaffScript size="md">Join us to be the change</MusicStaffScript>
          </span>
        </div>
      </section>

      <AnimateIn>
        <section className="mx-auto max-w-341.5 px-6 md:px-10 py-16 md:py-24">
          <p className="text-lg md:text-xl leading-relaxed text-ink/90 max-w-2xl">
            <strong className="font-semibold">Requirement: being human.</strong> We are curious
            to know why you chose us, your dreams and goals.
          </p>
          <div className="mt-10 max-w-2xl">
            <CareerForm />
          </div>
        </section>
      </AnimateIn>
    </>
  );
}
