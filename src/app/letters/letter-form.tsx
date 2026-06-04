"use client";

import { useActionState } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitLetter, initialFormState } from "@/app/actions/submissions";

const POSTCARDS = [
  { value: "brihadeeshwarar-temple", label: "Brihadeeshwarar Temple" },
  { value: "still-pond", label: "Still Pond" },
  { value: "open-letter", label: "Open Letter" },
  { value: "we-pick", label: "Surprise me — you pick" },
];

export function LetterForm({ onSenderNameChange }: { onSenderNameChange?: (name: string) => void }) {
  const [state, formAction] = useActionState(submitLetter, initialFormState);

  if (state.ok) {
    return (
      <p className="font-script text-3xl md:text-4xl text-ink leading-tight">
        Beautiful — your letter is queued. We&apos;ll write it out by hand and post it.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-10">
      <Field label="Choose a postcard" htmlFor="letter-postcard" hint={state.errors?.postcard_choice?.[0]}>
        <select
          id="letter-postcard"
          name="postcard_choice"
          required
          defaultValue={POSTCARDS[0].value}
          className="w-full bg-transparent border-b border-rule focus:border-ink py-3 px-0 text-base focus:outline-none"
        >
          {POSTCARDS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </Field>

      <fieldset className="space-y-8">
        <legend className="text-[0.7rem] uppercase tracking-[0.22em] text-muted font-semibold">
          From
        </legend>
        <div className="grid gap-8 md:grid-cols-2">
          <Field label="Your name" htmlFor="letter-sender-name" hint={state.errors?.sender_name?.[0]}>
            <TextInput
              id="letter-sender-name"
              name="sender_name"
              required
              autoComplete="name"
              onChange={onSenderNameChange ? (e) => onSenderNameChange(e.target.value) : undefined}
            />
          </Field>
          <Field label="Your email" htmlFor="letter-sender-email" hint={state.errors?.sender_email?.[0]}>
            <TextInput id="letter-sender-email" name="sender_email" type="email" required autoComplete="email" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-8">
        <legend className="text-[0.7rem] uppercase tracking-[0.22em] text-muted font-semibold">
          To
        </legend>
        <Field label="Recipient name" htmlFor="letter-recipient-name" hint={state.errors?.recipient_name?.[0]}>
          <TextInput id="letter-recipient-name" name="recipient_name" required />
        </Field>
        <Field label="Recipient address" htmlFor="letter-recipient-address" hint={state.errors?.recipient_address?.[0] ?? "Full postal address — house, street, city, postcode, country"}>
          <TextArea id="letter-recipient-address" name="recipient_address" required rows={4} />
        </Field>
      </fieldset>

      <Field label="Your message" htmlFor="letter-message" hint={state.errors?.message?.[0] ?? "We'll hand-write it onto the postcard."}>
        <TextArea id="letter-message" name="message" required rows={8} />
      </Field>

      {state.message && !state.ok && <p className="text-sm text-airmail-red">{state.message}</p>}
      <SubmitButton>Send now</SubmitButton>
    </form>
  );
}
