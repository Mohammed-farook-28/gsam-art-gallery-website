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
      <div className="mx-auto max-w-341.5 px-6 md:px-10 pt-6 md:pt-10">
        <DisplaySans as="h1" className="text-[clamp(2.5rem,7vw,5rem)]">
          Talk to Us
        </DisplaySans>
      </div>

      <AnimateIn>
        <section className="mx-auto max-w-341.5 px-6 md:px-10 pb-10">
          <div className="mt-6 flex flex-col md:flex-row gap-6 md:gap-16 items-start">

            {/* Left: form */}
            <div className="flex-1 min-w-0 w-full">
              <div className="max-w-2xl">
                <ContactForm />
              </div>
              <div className="mt-8 border-t border-rule pt-5 max-w-2xl">
                <p className="uppercase tracking-[0.18em] text-xs text-muted">Or write to us at</p>
                <a
                  href="mailto:people@gsamartgallery.com"
                  className="mt-1 block text-sm text-ink underline underline-offset-4 hover:opacity-70"
                >
                  people@gsamartgallery.com
                </a>
              </div>
            </div>

            {/* Turtle — below form on mobile, right side on desktop */}
            <div className="flex justify-center w-full md:hidden mt-4">
              <TurtleMascot size={300} />
            </div>
            <div className="hidden md:flex flex-shrink-0 items-start -mt-16">
              <TurtleMascot size={460} />
            </div>

          </div>
        </section>
      </AnimateIn>
    </>
  );
}
