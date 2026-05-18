-- Migrates the original single-item `orders` shape to the multi-item
-- cart + Razorpay shape. Run this once in the Supabase SQL editor for the
-- existing project. (For a fresh project, use supabase/schema.sql instead.)
--
-- Safe assumption: no real orders have been placed yet (the column shape
-- was incompatible with the website code, so any rows are test scaffolding).

begin;

drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;

create table public.orders (
  id                 uuid primary key default gen_random_uuid(),
  customer_name      text not null,
  customer_email     text not null,
  customer_phone     text not null,
  shipping_address   text not null,
  shipping_city      text not null,
  shipping_state     text not null,
  shipping_pincode   text not null,
  shipping_country   text not null default 'IN',
  subtotal_inr       integer not null check (subtotal_inr >= 0),
  shipping_inr       integer not null check (shipping_inr >= 0),
  total_inr          integer not null check (total_inr >= 0),
  currency           text not null default 'INR',
  razorpay_order_id      text unique,
  razorpay_payment_id    text,
  razorpay_signature     text,
  signature_verified     boolean not null default false,
  status             text not null default 'pending'
                     check (status in ('pending','paid','shipped','delivered','cancelled','failed')),
  created_at         timestamptz not null default now(),
  paid_at            timestamptz
);

create index orders_status_idx on public.orders(status);
create index orders_email_idx  on public.orders(customer_email);

create table public.order_items (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders(id) on delete cascade,
  product_slug    text not null references public.products(slug),
  product_title   text not null,
  paper           text not null,
  quantity        integer not null check (quantity > 0),
  unit_price_inr  integer not null check (unit_price_inr >= 0),
  line_total_inr  integer not null check (line_total_inr >= 0),
  created_at      timestamptz not null default now()
);

create index order_items_order_idx on public.order_items(order_id);

alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

create policy "orders_insert" on public.orders
  for insert to anon, authenticated with check (true);
create policy "orders_read_by_id" on public.orders
  for select to anon, authenticated using (true);
create policy "order_items_insert" on public.order_items
  for insert to anon, authenticated with check (true);
create policy "order_items_read" on public.order_items
  for select to anon, authenticated using (true);

commit;
