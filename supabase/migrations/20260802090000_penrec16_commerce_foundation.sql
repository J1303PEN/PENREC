-- PENREC16 — Commerce foundation
begin;

create table if not exists public.commerce_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  artist_slug text,
  product_type text not null default 'music',
  format text,
  description text,
  image text,
  price_pence integer not null default 0 check (price_pence >= 0),
  currency text not null default 'GBP',
  provider text not null default 'penrec',
  provider_product_id text,
  shipping_note text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.commerce_products enable row level security;

drop policy if exists "Published products are public" on public.commerce_products;
create policy "Published products are public" on public.commerce_products
for select using (status = 'published' or public.is_penrec_staff());

drop policy if exists "Staff create products" on public.commerce_products;
create policy "Staff create products" on public.commerce_products
for insert with check (public.is_penrec_staff());

drop policy if exists "Staff update products" on public.commerce_products;
create policy "Staff update products" on public.commerce_products
for update using (public.is_penrec_staff()) with check (public.is_penrec_staff());

drop policy if exists "Staff delete products" on public.commerce_products;
create policy "Staff delete products" on public.commerce_products
for delete using (public.is_penrec_staff());

grant select on public.commerce_products to anon, authenticated;
grant insert, update, delete on public.commerce_products to authenticated;

commit;
