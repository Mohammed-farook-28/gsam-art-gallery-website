"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitRetreat, initialFormState } from "@/app/actions/submissions";
import { MusicStaffScript } from "@/components/music-staff-script";

export function RetreatSignupForm() {
  const [state, formAction] = useActionState(submitRetreat, initialFormState);

  if (state.ok) {
    return (
      <MusicStaffScript size="sm" className="text-ink">
        สวัสดีครับ — we&apos;ll be in touch with retreat details.
      </MusicStaffScript>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Your name" htmlFor="retreat-name">
          <TextInput id="retreat-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="retreat-email">
          <TextInput id="retreat-email" name="email" type="email" required autoComplete="email" />
        </Field>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Phone (optional)" htmlFor="retreat-phone">
          <TextInput id="retreat-phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Retreat" htmlFor="retreat-which">
          <select
            id="retreat-which"
            name="retreat"
            required
            defaultValue="thailand-2026"
            className="w-full bg-transparent border-b border-rule focus:border-ink py-3 px-0 text-base focus:outline-none"
          >
            <option value="thailand-2026">Thailand — 7 days</option>
            <option value="future-other">Notify me about future retreats</option>
          </select>
        </Field>
      </div>
      <Field
        label="A little about you"
        htmlFor="retreat-about"
        hint="What kind of art do you make? What are you hoping to find?"
      >
        <TextArea id="retreat-about" name="about_you" required rows={6} />
      </Field>
      {state.message && !state.ok && <p className="text-sm text-airmail-red">{state.message}</p>}
      <SubmitButton>Reserve my seat</SubmitButton>
    </form>
  );
}
