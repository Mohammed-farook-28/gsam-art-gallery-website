import type { Metadata } from "next";
import { DisplaySans } from "@/components/display";
import { ContactForm } from "./contact-form";
import { AnimateIn } from "@/components/animate-in";
import { TurtleMascot } from "@/components/turtle-mascot";

export const metadata: Metadata = {
  title: "Talk to Us — G.Sam Art Gallery",
  description: "Write to us. Every email is read.",
};

export default function ContactPage() {
  return (
    <>
      <div className="h-20" />
      <div className="mx-auto max-w-341.5 px-6 md:px-10 pt-12 md:pt-20">
        <DisplaySans as="h1" className="text-[clamp(3rem,10vw,8rem)]">
          Talk to Us
        </DisplaySans>
      </div>

      <AnimateIn>
        <section className="mx-auto max-w-341.5 px-6 md:px-10 pb-24">
          <div className="mt-12 flex flex-col md:flex-row gap-16 md:gap-24 items-start">

            {/* Left: form */}
            <div className="flex-1 min-w-0">
              <div className="max-w-2xl">
                <ContactForm />
              </div>
              <div className="mt-16 border-t border-rule pt-8 text-sm text-muted max-w-2xl">
                <p className="uppercase tracking-[0.18em] text-xs">Or write to us at</p>
                <a
                  href="mailto:people@gsamartgallery.com"
                  className="mt-2 block text-base text-ink underline underline-offset-4 hover:opacity-70"
                >
                  people@gsamartgallery.com
                </a>
              </div>
            </div>

            {/* Right: turtle mascot */}
            <div className="hidden md:flex flex-shrink-0 items-start -mt-24">
              <TurtleMascot />
            </div>

          </div>
        </section>
      </AnimateIn>
    </>
  );
}
