import type { Metadata } from "next";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { VolunteerForm } from "./volunteer-form";
import { VideoBg } from "@/components/video-bg";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Volunteering — G.Sam Art Gallery",
  description:
    "Give back to the community. Share your skills, time, and passion with us.",
};

export default function VolunteeringPage() {
  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-341.5 px-6 md:px-10 pt-12 md:pt-20">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <DisplaySans as="h1" className="text-[clamp(4rem,16vw,14rem)]">
            Volunteering
          </DisplaySans>
          <span className="pb-6 md:pb-10">
            <MusicStaffScript size="md">Give back to the community</MusicStaffScript>
          </span>
        </div>
      </section>

      <AnimateIn>
        <section className="mx-auto max-w-300 px-6 md:px-10 py-16 md:py-24 grid gap-16 md:grid-cols-[1fr_1.2fr] items-center">
          <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-full bg-mandala">
            <VideoBg
              src="/videos/career-ocean.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              overlay
              overlayOpacity={0.15}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-script-hero text-white text-4xl md:text-5xl drop-shadow-xl">
                G.Sam
              </span>
            </div>
          </div>
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-ink/90">
              <strong className="font-semibold">Requirement: being human.</strong> Share your
              skills, time, and passion with our community. We would love to know who you are and
              what drives you.
            </p>
            <p className="mt-4 text-sm text-muted">
              Or write to us at{" "}
              <a
                href="mailto:people@gsamartgallery.com"
                className="underline underline-offset-4 hover:opacity-70"
              >
                people@gsamartgallery.com
              </a>
              .
            </p>
            <div className="mt-10">
              <VolunteerForm />
            </div>
          </div>
        </section>
      </AnimateIn>
    </>
  );
}
