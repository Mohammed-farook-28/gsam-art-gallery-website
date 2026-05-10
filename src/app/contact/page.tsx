import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { ContactForm } from "./contact-form";

export const metadata = {
  title: "Get in touch — G.Sam Art Gallery",
  description: "Write to us. Every email is read.",
};

export default function ContactPage() {
  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-[900px] px-6 md:px-10 pt-12 md:pt-20 pb-24">
        <DisplaySans as="h1" className="text-[clamp(3rem,10vw,8rem)]">
          Get in touch
        </DisplaySans>
        <p className="mt-4">
          <MusicStaffScript size="md">we&apos;d love to hear from you.</MusicStaffScript>
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-rule pt-8 text-sm text-muted">
          <p className="uppercase tracking-[0.18em] text-xs">Or write to us at</p>
          <a
            href="mailto:g.s.a.m.art.gallery25@gmail.com"
            className="mt-2 block text-base text-ink underline underline-offset-4 hover:opacity-70"
          >
            g.s.a.m.art.gallery25@gmail.com
          </a>
        </div>
      </section>
    </>
  );
}
