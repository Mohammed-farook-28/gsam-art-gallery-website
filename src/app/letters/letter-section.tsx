"use client";

import { useState } from "react";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { LetterForm } from "./letter-form";
import { PostcardPreview } from "./postcard-preview";

export function LetterSection() {
  const [senderName, setSenderName] = useState("");

  return (
    <section className="w-full pl-6 md:pl-10 pr-4 md:pr-6 py-20 md:py-28 grid md:grid-cols-[1fr_3.5fr] gap-10 items-start">
      <div>
        <DisplaySans as="h2" className="text-5xl md:text-6xl">
          Write your letter.
        </DisplaySans>
        <div className="mt-3 text-ink/80">
          <MusicStaffScript size="sm" className="text-lg md:text-xl">
            We&apos;ll handle the postcard, the stamp, and the mailbox.
          </MusicStaffScript>
        </div>
        <div className="mt-12">
          <LetterForm onSenderNameChange={setSenderName} />
        </div>
      </div>
      <div className="w-full sticky top-24">
        <PostcardPreview senderName={senderName} />
      </div>
    </section>
  );
}
