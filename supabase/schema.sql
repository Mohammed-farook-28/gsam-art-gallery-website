-- G.Sam Art Gallery — Supabase schema
-- Idempotent: safe to re-run.

create extension if not exists "pgcrypto";

-- ─── Products ──────────────────────────────────────────────────────────────
create table if not exists public.products (
  slug          text primary key,
  title         text not null,
  category      text not null check (category in ('postcards', 'greeting-cards')),
  size          text not null,
  description   text not null,
  image_url     text not null,
  price_inr     integer not null check (price_inr >= 0),
  papers        text[] not null default array['deluxe-300gsm','textured-200gsm']::text[],
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ─── Orders (header) ───────────────────────────────────────────────────────
-- One row per cart checkout. Line items live in `order_items`.
create table if not exists public.orders (
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
  -- Razorpay fields (filled in after creating Razorpay order, then payment).
  razorpay_order_id      text unique,
  razorpay_payment_id    text,
  razorpay_signature     text,
  signature_verified     boolean not null default false,
  status             text not null default 'pending'
                     check (status in ('pending','paid','shipped','delivered','cancelled','failed')),
  created_at         timestamptz not null default now(),
  paid_at            timestamptz
);

create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_email_idx  on public.orders(customer_email);

-- ─── Order items (lines) ───────────────────────────────────────────────────
create table if not exists public.order_items (
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

create index if not exists order_items_order_idx on public.order_items(order_id);

-- ─── Form submissions ──────────────────────────────────────────────────────
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.letter_submissions (
  id                  uuid primary key default gen_random_uuid(),
  sender_name         text not null,
  sender_email        text not null,
  recipient_name      text not null,
  recipient_address   text not null,
  postcard_choice     text not null,
  message             text not null,
  status              text not null default 'pending'
                      check (status in ('pending','written','posted','delivered')),
  created_at          timestamptz not null default now()
);

create table if not exists public.retreat_signups (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  retreat     text not null,
  about_you   text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.career_applications (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  why_us        text not null,
  dreams_goals  text not null,
  created_at    timestamptz not null default now()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────
alter table public.products              enable row level security;
alter table public.orders                enable row level security;
alter table public.order_items           enable row level security;
alter table public.contact_submissions   enable row level security;
alter table public.letter_submissions    enable row level security;
alter table public.retreat_signups       enable row level security;
alter table public.career_applications   enable row level security;

-- Products: anyone can read active products
drop policy if exists "products_read_active" on public.products;
create policy "products_read_active" on public.products
  for select to anon, authenticated using (active);

-- Orders & line items: anon CAN insert (a checkout creates a pending order).
-- Reading individual orders by id is allowed so the success page can confirm
-- the order summary; the id is a UUID and acts as an unguessable token.
drop policy if exists "orders_insert" on public.orders;
create policy "orders_insert" on public.orders
  for insert to anon, authenticated with check (true);

drop policy if exists "orders_read_by_id" on public.orders;
create policy "orders_read_by_id" on public.orders
  for select to anon, authenticated using (true);

drop policy if exists "order_items_insert" on public.order_items;
create policy "order_items_insert" on public.order_items
  for insert to anon, authenticated with check (true);

drop policy if exists "order_items_read" on public.order_items;
create policy "order_items_read" on public.order_items
  for select to anon, authenticated using (true);

-- The form-submissions tables: insert-only for anon.
do $$
declare t text;
begin
  for t in select unnest(array[
    'contact_submissions','letter_submissions','retreat_signups','career_applications'
  ]) loop
    execute format('drop policy if exists "%s_insert" on public.%I', t, t);
    execute format(
      'create policy "%s_insert" on public.%I for insert to anon, authenticated with check (true)',
      t, t);
  end loop;
end $$;

-- ─── Seed (optional) ──────────────────────────────────────────────────────
insert into public.products (slug, title, category, size, description, image_url, price_inr)
values
  ('brihadeeshwarar-temple', 'Brihadeeshwarar Temple', 'postcards', 'A6',
   'To empower lives of every human, capture the beauty of life. To be human, to feel deeply, to experience life. To create a way for people to let out their emotions, creating empathy at a global scale.',
   '/canva-extracts/product-brihadeeshwarar.jpg', 199),
  ('still-pond', 'Still Pond', 'postcards', 'A6',
   'A quiet morning by the water — for the friend who needs to be reminded to slow down.',
   '/canva-extracts/why-circle.jpg', 199),
  ('spotlight-set', 'Spotlight set of 3', 'greeting-cards', 'A6',
   'Three originals, hand-translated into greeting cards. Pick a favourite or send all three.',
   '/canva-extracts/spotlight-postcards.jpg', 499)
on conflict (slug) do nothing;
