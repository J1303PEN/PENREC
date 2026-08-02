-- PENREC13 Admin Operations — corrected, self-contained migration
-- Safe to run on PENREC11, PENREC12, or a fresh PENREC database.

begin;

-- 1. Create the role type when the earlier authentication migration was not run.
do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public' and t.typname = 'penrec_role'
  ) then
    create type public.penrec_role as enum ('customer', 'staff', 'admin', 'super_admin');
  end if;
end
$$;

-- 2. Create and complete the profiles table.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.penrec_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists role public.penrec_role not null default 'customer';
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- Create orders when PENREC12 has not previously been applied.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_number text not null unique,
  status text not null default 'pending',
  total_pence integer not null default 0 check (total_pence >= 0),
  currency text not null default 'GBP',
  created_at timestamptz not null default now()
);

-- 3. Backfill a profile for every existing Supabase user.
insert into public.profiles (id, display_name)
select
  u.id,
  coalesce(u.raw_user_meta_data ->> 'display_name', split_part(u.email, '@', 1), 'PENREC user')
from auth.users u
on conflict (id) do nothing;

-- 4. Keep future auth users and profiles in sync.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1), 'PENREC user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.prevent_role_self_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() = old.id then
    new.role := old.role;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.prevent_role_self_change();

-- 5. Staff and administrator helpers. Security-definer avoids recursive RLS checks.
create or replace function public.is_penrec_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('staff', 'admin', 'super_admin')
  );
$$;

create or replace function public.is_penrec_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'super_admin')
  );
$$;

revoke all on function public.is_penrec_staff() from public;
revoke all on function public.is_penrec_admin() from public;
grant execute on function public.is_penrec_staff() to authenticated;
grant execute on function public.is_penrec_admin() to authenticated;

-- 6. Make the oldest existing PENREC account the initial super administrator,
-- but only when no staff/admin account exists yet.
do $$
begin
  if not exists (
    select 1 from public.profiles
    where role in ('staff', 'admin', 'super_admin')
  ) then
    update public.profiles
    set role = 'super_admin', updated_at = now()
    where id = (
      select id from public.profiles
      order by created_at asc, id asc
      limit 1
    );
  end if;
end
$$;

-- 7. RLS and Data API privileges.
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

grant select, update on public.profiles to authenticated;
grant select, update on public.orders to authenticated;

-- Profiles: own account access plus staff directory and admin role controls.
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "Users can update their own display name" on public.profiles;
create policy "Users can update their own display name" on public.profiles
for update using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Staff can read all profiles" on public.profiles;
drop policy if exists "Staff profiles select" on public.profiles;
create policy "Staff profiles select" on public.profiles
for select using (public.is_penrec_staff());

drop policy if exists "Admin profiles update" on public.profiles;
create policy "Admin profiles update" on public.profiles
for update using (public.is_penrec_admin())
with check (
  public.is_penrec_admin()
  and (
    role <> 'super_admin'
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  )
);

-- Orders: customers retain their own read policy from PENREC12; staff gain operations access.
drop policy if exists "Staff orders select" on public.orders;
create policy "Staff orders select" on public.orders
for select using (public.is_penrec_staff());

drop policy if exists "Staff orders update" on public.orders;
create policy "Staff orders update" on public.orders
for update using (public.is_penrec_staff())
with check (public.is_penrec_staff());

commit;
