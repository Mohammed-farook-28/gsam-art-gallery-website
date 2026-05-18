import { CheckoutClient } from "./checkout-client";

export const metadata = {
  title: "Checkout — G.Sam Art Gallery",
  description: "Complete your order — UPI, cards, netbanking via Razorpay.",
};

export default function CheckoutPage() {
  return (
    <>
      <div className="h-20" />
      <CheckoutClient
        razorpayConfigured={Boolean(
          process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
        )}
      />
    </>
  );
}
