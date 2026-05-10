-- G.Sam Art Gallery — Supabase schema
-- Run this in the Supabase SQL editor for a fresh project, or copy into a migration.

-- Helpful default
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

-- ─── Orders (single-item buy from /store/[slug]) ───────────────────────────
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  product_slug      text not null references public.products(slug),
  product_title     text not null,
  paper             text not null,
  quantity          integer not null check (quantity > 0),
  customer_name     text not null,
  customer_email    text not null,
  shipping_address  text not null,
  status            text not null default 'pending'
                    check (status in ('pending','paid','shipped','delivered','cancelled')),
  created_at        timestamptz not null default now()
);

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
-- Anonymous visitors can READ active products (catalog) and INSERT into the
-- form-submission tables. Read access for orders/submissions is owner-only;
-- in this admin-by-Supabase-Studio model we keep the service role for review.

alter table public.products              enable row level security;
alter table public.orders                enable row level security;
alter table public.contact_submissions   enable row level security;
alter table public.letter_submissions    enable row level security;
alter table public.retreat_signups       enable row level security;
alter table public.career_applications   enable row level security;

-- Products: everyone can read active products
drop policy if exists "products_read_active" on public.products;
create policy "products_read_active" on public.products
  for select to anon, authenticated using (active);

-- Submissions: anyone can insert; nobody can read with anon key
do $$
declare t text;
begin
  for t in select unnest(array[
    'orders','contact_submissions','letter_submissions','retreat_signups','career_applications'
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
