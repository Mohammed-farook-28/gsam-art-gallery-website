import Image from "next/image";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { CareerForm } from "./career-form";

export const metadata = {
  title: "Career — G.Sam Art Gallery",
  description:
    "Join us to be the change. Requirement: being human. Tell us why you chose us, your dreams and goals.",
};

export default function CareerPage() {
  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-[1366px] px-6 md:px-10 pt-12 md:pt-20">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <DisplaySans as="h1" className="text-[clamp(4rem,16vw,14rem)]">
            Career
          </DisplaySans>
          <span className="pb-6 md:pb-10">
            <MusicStaffScript size="md">Join us to be the change</MusicStaffScript>
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-16 md:py-24 grid gap-16 md:grid-cols-[1fr_1.2fr] items-center">
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <Image
            src="/canva-extracts/career-mandala.jpg"
            alt="A blue mandala of small fish surrounding G.Sam"
            fill
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-lg md:text-xl leading-relaxed text-ink/90">
            <strong className="font-semibold">Requirement: being human.</strong> We are curious
            to know why you chose us, your dreams and goals.
          </p>
          <p className="mt-4 text-sm text-muted">
            Or write to us at{" "}
            <a
              href="mailto:g.s.a.m.art.gallery25@gmail.com"
              className="underline underline-offset-4 hover:opacity-70"
            >
              g.s.a.m.art.gallery25@gmail.com
            </a>
            .
          </p>
          <div className="mt-10">
            <CareerForm />
          </div>
        </div>
      </section>
    </>
  );
}
