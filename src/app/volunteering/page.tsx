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
    /*
      Single viewport — no separate header section.
      mt-20 offsets the fixed navbar (h-20 = 80px).
      min-h-[calc(100vh-5rem)] fills exactly the remaining screen height.
      Three columns: [heading + form] | [video + arc] | [description]
    */
    <AnimateIn>
      <section className="mt-20 min-h-[calc(100vh-5rem)] mx-auto max-w-341.5 px-6 md:px-10 py-10 grid gap-8 md:gap-4 md:grid-cols-[1fr_26rem_1fr] md:items-start">

        {/* ── LEFT: heading + form — anchored to top-left ───────── */}
        <div className="order-3 md:order-1 pt-2 md:pt-6">
          <DisplaySans as="h1" className="text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            Volunteering
          </DisplaySans>
          <span className="block mt-1 mb-6">
            <MusicStaffScript size="sm">Give back to the community</MusicStaffScript>
          </span>
          <VolunteerForm />
        </div>

        {/* ── CENTRE: video + arc text ─────────────────────────── */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-96 h-[30rem]">

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 text-ink"
              viewBox="0 0 384 480"
              aria-hidden="true"
            >
              <defs>
                <path id="vol-arc" d="M -14,288 A 206,206 0 0,1 398,288" />
              </defs>
              <text
                fill="currentColor"
                fontSize="26"
                style={{ fontFamily: "var(--font-script-hero), cursive" }}
              >
                <textPath href="#vol-arc" startOffset="50%" textAnchor="middle">
                  Success is a team sport
                </textPath>
              </text>
            </svg>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 overflow-hidden rounded-full shadow-lg">
              <VideoBg
                src="/videos/career-ocean.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                overlay
                overlayOpacity={0.15}
              />
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className="font-script-hero text-white text-5xl drop-shadow-xl mt-10">
                  G.Sam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: description — text curves around the circle edge ── */}
        {/*
          pt-24 (96px) = circle top offset from row top (480px container − 384px circle).
          The left-float + shape-outside replicates the circle's right arc
          so the text wraps naturally around it.
          circle(192px at 0px 50%): centre at left-edge of float, mid-height →
          matches actual circle centre at y=288 from row top.
        */}
        <div className="order-2 md:order-3 md:pt-24">
          <div
            aria-hidden="true"
            style={{
              float: "left",
              width: "72px",
              height: "384px",
              shapeOutside: "circle(72px at 0px 50%)",
              pointerEvents: "none",
            }}
          />
          <p className="text-lg md:text-xl leading-relaxed text-ink/90">
            <strong className="font-semibold">Requirement: being human.</strong>{" "}
            Share your skills, time, and passion with our community. We would
            love to know who you are and what drives you.
          </p>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            Volunteers work across events, community outreach, digital content,
            and on-ground coordination. No prior experience required — just
            genuine passion.
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
        </div>

      </section>
    </AnimateIn>
  );
}
