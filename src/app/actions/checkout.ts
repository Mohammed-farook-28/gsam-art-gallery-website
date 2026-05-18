"use server";

import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isRazorpayConfigured, razorpayClient, verifyRazorpaySignature } from "@/lib/razorpay";
import { SHIPPING_INR } from "@/lib/cart";

const cartItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  image: z.string().min(1),
  price_inr: z.number().int().nonnegative(),
  quantity: z.number().int().min(1).max(99),
  paper: z.enum(["deluxe-300gsm", "textured-200gsm"]),
});

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  address: z.string().min(8),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
});

export type CreatePaymentInput = {
  customer: z.infer<typeof customerSchema>;
  cart: z.infer<typeof cartItemSchema>[];
};

export type CreatePaymentResult =
  | {
      ok: true;
      mode: "razorpay";
      orderId: string;
      razorpay: { keyId: string; orderId: string; amount: number; currency: string };
    }
  | {
      ok: true;
      mode: "manual";
      orderId: string;
      message: string;
    }
  | {
      ok: false;
      message: string;
      errors?: Record<string, string[] | undefined>;
    };

export async function createPaymentSession(input: CreatePaymentInput): Promise<CreatePaymentResult> {
  const customer = customerSchema.safeParse(input.customer);
  if (!customer.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors: customer.error.flatten().fieldErrors,
    };
  }
  if (input.cart.length === 0) {
    return { ok: false, message: "Your cart is empty." };
  }
  const cart = z.array(cartItemSchema).safeParse(input.cart);
  if (!cart.success) {
    return { ok: false, message: "Cart items look malformed. Try refreshing." };
  }

  const subtotal = cart.data.reduce((sum, i) => sum + i.price_inr * i.quantity, 0);
  const total = subtotal + SHIPPING_INR;

  if (!isSupabaseConfigured()) {
    console.warn("[checkout] Supabase not configured — order not persisted.");
    return { ok: false, message: "Backend isn't configured yet. Please try again later." };
  }
  const supabase = await createClient();

  // 1. Insert the order header in 'pending' state.
  const { data: orderRow, error: orderErr } = await supabase
    .from("orders")
    .insert({
      customer_name: customer.data.name,
      customer_email: customer.data.email,
      customer_phone: customer.data.phone,
      shipping_address: customer.data.address,
      shipping_city: customer.data.city,
      shipping_state: customer.data.state,
      shipping_pincode: customer.data.pincode,
      shipping_country: "IN",
      subtotal_inr: subtotal,
      shipping_inr: SHIPPING_INR,
      total_inr: total,
      currency: "INR",
      status: "pending",
    })
    .select("id")
    .single();
  if (orderErr || !orderRow) {
    console.error("[checkout] order insert failed", orderErr);
    return { ok: false, message: "Couldn't create your order. Please try again." };
  }
  const orderId = orderRow.id as string;

  // 2. Insert line items.
  const items = cart.data.map((i) => ({
    order_id: orderId,
    product_slug: i.slug,
    product_title: i.title,
    paper: i.paper,
    quantity: i.quantity,
    unit_price_inr: i.price_inr,
    line_total_inr: i.price_inr * i.quantity,
  }));
  const { error: itemsErr } = await supabase.from("order_items").insert(items);
  if (itemsErr) {
    console.error("[checkout] order_items insert failed", itemsErr);
    return { ok: false, message: "Couldn't save your cart items. Please try again." };
  }

  // 3a. If Razorpay isn't configured, fall back to manual-payment mode.
  if (!isRazorpayConfigured()) {
    return {
      ok: true,
      mode: "manual",
      orderId,
      message:
        "We received your order. Razorpay isn't connected yet, so we'll email you payment instructions shortly.",
    };
  }

  // 3b. Create a Razorpay order tied to this DB order.
  try {
    const rp = razorpayClient();
    const rpOrder = await rp.orders.create({
      amount: total * 100, // paisa
      currency: "INR",
      receipt: orderId,
      notes: {
        gsam_order_id: orderId,
        customer_email: customer.data.email,
      },
    });

    await supabase
      .from("orders")
      .update({ razorpay_order_id: rpOrder.id })
      .eq("id", orderId);

    return {
      ok: true,
      mode: "razorpay",
      orderId,
      razorpay: {
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID!,
        orderId: rpOrder.id,
        amount: typeof rpOrder.amount === "string" ? parseInt(rpOrder.amount, 10) : rpOrder.amount,
        currency: rpOrder.currency,
      },
    };
  } catch (err) {
    console.error("[checkout] razorpay order create failed", err);
    return { ok: false, message: "Couldn't reach the payment provider. Please try again." };
  }
}

const verifyInputSchema = z.object({
  orderId: z.string().uuid(),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export type VerifyPaymentResult =
  | { ok: true; orderId: string }
  | { ok: false; message: string };

export async function verifyAndCompletePayment(
  input: z.infer<typeof verifyInputSchema>,
): Promise<VerifyPaymentResult> {
  const parsed = verifyInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid payment payload." };
  }
  const valid = verifyRazorpaySignature({
    razorpay_order_id: parsed.data.razorpay_order_id,
    razorpay_payment_id: parsed.data.razorpay_payment_id,
    razorpay_signature: parsed.data.razorpay_signature,
  });
  if (!valid) {
    // Mark order as failed for visibility.
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      await supabase.from("orders").update({ status: "failed" }).eq("id", parsed.data.orderId);
    }
    return { ok: false, message: "Payment signature verification failed." };
  }

  if (!isSupabaseConfigured()) return { ok: true, orderId: parsed.data.orderId };
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      razorpay_payment_id: parsed.data.razorpay_payment_id,
      razorpay_signature: parsed.data.razorpay_signature,
      signature_verified: true,
      paid_at: new Date().toISOString(),
    })
    .eq("id", parsed.data.orderId)
    .eq("razorpay_order_id", parsed.data.razorpay_order_id);
  if (error) {
    console.error("[checkout] mark paid failed", error);
    return { ok: false, message: "Couldn't finalise your order. Contact support with your payment ID." };
  }
  return { ok: true, orderId: parsed.data.orderId };
}
