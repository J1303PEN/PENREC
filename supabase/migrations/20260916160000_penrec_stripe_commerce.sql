-- PENREC Stripe Commerce
-- Extends the existing PENREC order system for Stripe Checkout,
-- guest purchases, order lines, fulfilment and digital entitlements.

begin;

-- Existing orders must also support guest checkout.
alter table public.orders
  alter column user_id drop not null;

alter table public.orders
  add column if not exists customer_email text,
  add column if not exists stripe_checkout_session_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists stripe_customer_id text,
  add column if not exists payment_status text not null default 'unpaid',
  add column if not exists fulfilment_status text not null default 'unfulfilled',
  add column if not exists shipping_name text,
  add column if not exists shipping_address jsonb,
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists orders_stripe_checkout_session_uidx
  on public.orders (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create index if not exists orders_stripe_payment_intent_idx
  on public.orders (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

create index if not exists orders_customer_email_idx
  on public.orders (lower(customer_email))
  where customer_email is not null;

-- Snapshot each purchased product so historic orders remain accurate
-- even if the catalogue product changes later.
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.commerce_products(id) on delete set null,
  title text not null,
  artist_slug text,
  product_type text not null,
  format text,
  provider text not null default 'penrec',
  provider_product_id text,
  sku text,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_pence integer not null check (unit_price_pence >= 0),
  total_pence integer not null check (total_pence >= 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx
  on public.order_items(order_id);

-- Digital purchases receive an entitlement rather than a public file URL.
create table if not exists public.digital_entitlements (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  order_item_id uuid not null references public.order_items(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  customer_email text,
  release_id uuid references public.penrec_releases(id) on delete set null,
  digital_file text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(order_item_id)
);

create index if not exists digital_entitlements_user_idx
  on public.digital_entitlements(user_id)
  where user_id is not null;

create index if not exists digital_entitlements_email_idx
  on public.digital_entitlements(lower(customer_email))
  where customer_email is not null;

-- Stripe webhook idempotency: the same Stripe event must never be processed twice.
create table if not exists public.stripe_events (
  id text primary key,
  event_type text not null,
  processed_at timestamptz not null default now()
);

alter table public.order_items enable row level security;
alter table public.digital_entitlements enable row level security;
alter table public.stripe_events enable row level security;

grant select on public.order_items to authenticated;
grant select on public.digital_entitlements to authenticated;

-- Signed-in customers can read only items belonging to their own orders.
drop policy if exists "Own order items select" on public.order_items;
create policy "Own order items select" on public.order_items
for select using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

drop policy if exists "Staff order items select" on public.order_items;
create policy "Staff order items select" on public.order_items
for select using (public.is_penrec_staff());

-- Account holders can read their own digital purchases.
drop policy if exists "Own digital entitlements select" on public.digital_entitlements;
create policy "Own digital entitlements select" on public.digital_entitlements
for select using (user_id = auth.uid());

drop policy if exists "Staff digital entitlements select" on public.digital_entitlements;
create policy "Staff digital entitlements select" on public.digital_entitlements
for select using (public.is_penrec_staff());

-- stripe_events intentionally has no customer-facing policy.
-- Server-side Stripe processing will use privileged database access.

commit;
