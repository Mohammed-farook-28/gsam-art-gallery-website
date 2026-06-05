"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitVolunteer, initialFormState } from "@/app/actions/submissions";

export function VolunteerForm() {
  const [state, formAction] = useActionState(submitVolunteer, initialFormState);

  if (state.ok) {
    return (
      <p className="font-script text-3xl md:text-4xl text-ink leading-tight">
        Thank you. We read every word.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Field label="Your name" htmlFor="volunteer-name">
          <TextInput id="volunteer-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="volunteer-email">
          <TextInput id="volunteer-email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Age" htmlFor="volunteer-age">
          <TextInput id="volunteer-age" name="age" type="number" min="13" max="120" />
        </Field>
      </div>
      <Field label="Why us?" htmlFor="volunteer-why">
        <TextArea id="volunteer-why" name="why_us" required rows={2} />
      </Field>
      <Field label="Your skills & interests" htmlFor="volunteer-skills">
        <TextArea id="volunteer-skills" name="skills" required rows={2} />
      </Field>
      {state.message && !state.ok && (
        <p className="text-sm text-airmail-red">{state.message}</p>
      )}
      <SubmitButton>Apply</SubmitButton>
    </form>
  );
}
