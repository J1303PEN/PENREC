-- PENREC12 Customer Dashboard
create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  release_slug text not null,
  created_at timestamptz not null default now(),
  unique(user_id, release_slug)
);
create table if not exists public.library_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  release_slug text not null,
  format text not null default 'digital',
  acquired_at timestamptz not null default now(),
  unique(user_id, release_slug, format)
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  status text not null default 'pending',
  total_pence integer not null default 0 check (total_pence >= 0),
  currency text not null default 'GBP',
  created_at timestamptz not null default now()
);
create table if not exists public.account_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  release_alerts boolean not null default true,
  order_updates boolean not null default true,
  newsletter boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.wishlist_items enable row level security;
alter table public.library_items enable row level security;
alter table public.orders enable row level security;
alter table public.account_preferences enable row level security;
create policy "Own wishlist select" on public.wishlist_items for select using (auth.uid()=user_id);
create policy "Own wishlist insert" on public.wishlist_items for insert with check (auth.uid()=user_id);
create policy "Own wishlist delete" on public.wishlist_items for delete using (auth.uid()=user_id);
create policy "Own library select" on public.library_items for select using (auth.uid()=user_id);
create policy "Own orders select" on public.orders for select using (auth.uid()=user_id);
create policy "Own preferences select" on public.account_preferences for select using (auth.uid()=user_id);
create policy "Own preferences insert" on public.account_preferences for insert with check (auth.uid()=user_id);
create policy "Own preferences update" on public.account_preferences for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
