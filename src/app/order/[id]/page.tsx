import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { DisplaySans } from "@/components/display";
import { MusicStaffScript } from "@/components/music-staff-script";
import { AirmailStripe } from "@/components/airmail-stripe";
import { PAPER_LABELS, type Paper } from "@/lib/products";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ manual?: string }>;

type OrderRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  subtotal_inr: number;
  shipping_inr: number;
  total_inr: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "failed";
  razorpay_payment_id: string | null;
  paid_at: string | null;
  created_at: string;
};

type OrderItemRow = {
  product_slug: string;
  product_title: string;
  paper: Paper;
  quantity: number;
  line_total_inr: number;
};

export const metadata: Metadata = { title: "Order received — G.Sam Art Gallery" };

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const { manual } = await searchParams;
  const isManual = manual === "1";

  if (!isSupabaseConfigured()) notFound();
  const supabase = await createClient();

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .select(
      "id,customer_name,customer_email,shipping_address,shipping_city,shipping_state,shipping_pincode,subtotal_inr,shipping_inr,total_inr,status,razorpay_payment_id,paid_at,created_at",
    )
    .eq("id", id)
    .maybeSingle<OrderRow>();
  if (orderErr || !order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("product_slug,product_title,paper,quantity,line_total_inr")
    .eq("order_id", id)
    .returns<OrderItemRow[]>();

  const isPaid = order.status === "paid";

  return (
    <>
      <div className="h-20" />
      <section className="mx-auto max-w-225 px-6 md:px-10 pt-12 md:pt-20 pb-12">
        <p className="text-xs uppercase tracking-[0.22em] text-muted font-semibold">
          Order #{order.id.slice(0, 8)}
        </p>
        <DisplaySans as="h1" className="mt-2 text-[clamp(3rem,9vw,7rem)]">
          {isPaid ? "Thank you." : isManual ? "Order received." : "Almost done."}
        </DisplaySans>
        <p className="mt-3">
          <MusicStaffScript size="md">
            {isPaid
              ? "your postcards are on their way."
              : "we'll email you payment details shortly."}
          </MusicStaffScript>
        </p>

        <p className="mt-10 text-base md:text-lg leading-relaxed text-ink/85 max-w-prose">
          {isPaid ? (
            <>
              We received your payment of <strong>₹{order.total_inr}</strong>. A confirmation has
              been sent to <strong>{order.customer_email}</strong>. Your postcards will be packed
              with care and shipped to {order.shipping_city}, {order.shipping_state}.
            </>
          ) : (
            <>
              We saved your order. {isManual ? "Razorpay isn't connected yet — " : ""}
              We&apos;ll email <strong>{order.customer_email}</strong> with payment instructions
              shortly.
            </>
          )}
        </p>

        {/* ITEMS */}
        <div className="mt-12 border-t border-rule pt-6">
          <h2 className="text-xs uppercase tracking-[0.22em] font-semibold">Items</h2>
          {!items && (
            <p className="mt-4 text-sm text-muted">
              Could not load item details. Contact support with your order number.
            </p>
          )}
          <ul className="mt-4 divide-y divide-rule">
            {(items ?? []).map((it, idx) => (
              <li key={idx} className="py-4 flex items-baseline gap-4 text-sm">
                <span className="font-script text-2xl text-ink/85 truncate flex-1">
                  {it.product_title}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-muted shrink-0">
                  {PAPER_LABELS[it.paper]} · ×{it.quantity}
                </span>
                <span className="tabular-nums shrink-0">₹{it.line_total_inr}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 pt-4 border-t border-rule space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">₹{order.subtotal_inr}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">₹{order.shipping_inr}</dd></div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-rule">
              <dt>Total</dt><dd className="tabular-nums">₹{order.total_inr}</dd>
            </div>
          </dl>
        </div>

        {/* SHIPPING */}
        <div className="mt-12 border-t border-rule pt-6">
          <h2 className="text-xs uppercase tracking-[0.22em] font-semibold">Shipping to</h2>
          <p className="mt-3 text-base whitespace-pre-line text-ink/85">
            {order.customer_name}
            {"\n"}
            {order.shipping_address}
            {"\n"}
            {order.shipping_city}, {order.shipping_state} {order.shipping_pincode}
          </p>
        </div>

        {order.razorpay_payment_id && (
          <p className="mt-8 text-xs text-muted">
            Payment ID · <span className="font-mono">{order.razorpay_payment_id}</span>
          </p>
        )}
      </section>

      <AirmailStripe />

      <section className="mx-auto max-w-225 px-6 md:px-10 py-16 text-center">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
        >
          Back to the store →
        </Link>
      </section>
    </>
  );
}
