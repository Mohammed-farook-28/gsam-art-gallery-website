"use server";

import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

const initial: FormState = { ok: false, message: "" };
export const initialFormState = initial;

async function insert(table: string, row: Record<string, unknown>): Promise<FormState> {
  if (!isSupabaseConfigured()) {
    // Dev-mode fallback so the form is testable before Supabase is wired up.
    console.log(`[submission → ${table}]`, row);
    return { ok: true, message: "Thanks — we received your message." };
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(row);
  if (error) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }
  return { ok: true, message: "Thanks — we received your message." };
}

// ---------- CONTACT ----------
const contactSchema = z.object({
  name: z.string().min(1, "Please tell us your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(5, "A short message helps us reply."),
});

export async function submitContact(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }
  return insert("contact_submissions", parsed.data);
}

// ---------- LETTERS ("we post it for you") ----------
const VALID_POSTCARD_CHOICES = [
  "brihadeeshwarar-temple",
  "still-pond",
  "open-letter",
  "we-pick",
] as const;

const letterSchema = z.object({
  sender_name: z.string().min(1),
  sender_email: z.string().email(),
  recipient_name: z.string().min(1),
  recipient_address: z.string().min(10, "We need a complete postal address."),
  message: z.string().min(1, "Please write a message."),
  postcard_choice: z.enum(VALID_POSTCARD_CHOICES, { error: "Please choose a valid postcard." }),
});

export async function submitLetter(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = letterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }
  return insert("letter_submissions", parsed.data);
}

// ---------- RETREAT SIGN-UP ----------
const retreatSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  retreat: z.string().min(1),
  about_you: z.string().min(1, "Tell us a little about yourself."),
});

export async function submitRetreat(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = retreatSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }
  return insert("retreat_signups", parsed.data);
}

// ---------- CAREER APPLICATION ----------
const careerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  why_us: z.string().min(1, "Tell us why you chose us."),
  dreams_goals: z.string().min(1, "Share your dreams and goals."),
});

export async function submitCareer(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = careerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields.", errors: parsed.error.flatten().fieldErrors };
  }
  return insert("career_applications", parsed.data);
}

// Orders are now created via the cart → /checkout flow.
// See `app/actions/checkout.ts` for createPaymentSession +
// verifyAndCompletePayment, which handle the multi-item order + Razorpay flow.
