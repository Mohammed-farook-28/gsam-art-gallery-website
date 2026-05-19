"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitContact, initialFormState } from "@/app/actions/submissions";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialFormState);

  if (state.ok) {
    return (
      <p className="font-script text-3xl md:text-4xl text-ink leading-tight">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name" hint={state.errors?.name?.[0]}>
          <TextInput id="contact-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="contact-email" hint={state.errors?.email?.[0]}>
          <TextInput id="contact-email" name="email" type="email" required autoComplete="email" />
        </Field>
      </div>
      <Field label="Message" htmlFor="contact-message" hint={state.errors?.message?.[0]}>
        <TextArea id="contact-message" name="message" required rows={6} />
      </Field>
      {state.message && !state.ok && <p className="text-sm text-airmail-red">{state.message}</p>}
      <SubmitButton>Send</SubmitButton>
    </form>
  );
}
