"use client";

import { useActionState, useEffect } from "react";
import { Field, TextInput, TextArea, SubmitButton } from "@/components/form-fields";
import { submitCareer, initialFormState } from "@/app/actions/submissions";

interface CareerFormProps {
  onFieldFocus?: (field: string | null) => void;
  onSubmitted?: () => void;
}

export function CareerForm({ onFieldFocus, onSubmitted }: CareerFormProps = {}) {
  const [state, formAction] = useActionState(submitCareer, initialFormState);

  useEffect(() => {
    if (state.ok) onSubmitted?.();
  }, [state.ok, onSubmitted]);

  if (state.ok) {
    return (
      <p className="font-script text-3xl md:text-4xl text-ink leading-tight">
        Thank you. We read every word.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-8"
      onFocus={(e) => {
        const name = (e.target as unknown as HTMLInputElement).name;
        if (name) onFieldFocus?.(name);
      }}
      onBlur={() => onFieldFocus?.(null)}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Your name" htmlFor="career-name">
          <TextInput id="career-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="career-email">
          <TextInput id="career-email" name="email" type="email" required autoComplete="email" />
        </Field>
      </div>
      <Field label="Tell the story of your life in 3 lines?" htmlFor="career-why">
        <TextArea id="career-why" name="why_us" required rows={4} />
      </Field>
      <Field label="Your dreams & goals" htmlFor="career-dreams">
        <TextArea id="career-dreams" name="dreams_goals" required rows={5} />
      </Field>
      {state.message && !state.ok && <p className="text-sm text-airmail-red">{state.message}</p>}
      <SubmitButton>Apply</SubmitButton>
    </form>
  );
}
