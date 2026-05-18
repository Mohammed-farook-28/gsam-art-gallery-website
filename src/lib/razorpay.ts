import "server-only";
import Razorpay from "razorpay";
import crypto from "node:crypto";

export function isRazorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

let _client: Razorpay | null = null;

export function razorpayClient(): Razorpay {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay not configured: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET");
  }
  if (_client) return _client;
  _client = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  return _client;
}

/**
 * Verifies a Razorpay payment signature using HMAC-SHA256.
 * Razorpay signs `order_id|payment_id` with the key secret.
 */
export function verifyRazorpaySignature(input: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): boolean {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`)
    .digest("hex");
  // Constant-time compare to avoid timing attacks.
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(input.razorpay_signature, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
