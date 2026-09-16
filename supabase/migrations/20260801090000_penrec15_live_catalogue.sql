-- PENREC15 — Live Catalogue Editor
begin;
create table if not exists public.catalogue_overrides (
  slug text primary key,
  name text,
  album text,
  descriptor text,
  location text,
  bio jsonb,
  quote text,
  year text,
  catalogue text,
  cover text,
  hero text,
  profile text,
  hero_position text,
  profile_position text,
  preview text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.catalogue_overrides enable row level security;
grant select on public.catalogue_overrides to anon, authenticated;
grant insert, update, delete on public.catalogue_overrides to authenticated;
drop policy if exists "Public published catalogue select" on public.catalogue_overrides;
create policy "Public published catalogue select" on public.catalogue_overrides for select using (published = true or public.is_penrec_staff());
drop policy if exists "Staff catalogue insert" on public.catalogue_overrides;
create policy "Staff catalogue insert" on public.catalogue_overrides for insert with check (public.is_penrec_staff());
drop policy if exists "Staff catalogue update" on public.catalogue_overrides;
create policy "Staff catalogue update" on public.catalogue_overrides for update using (public.is_penrec_staff()) with check (public.is_penrec_staff());
drop policy if exists "Staff catalogue delete" on public.catalogue_overrides;
create policy "Staff catalogue delete" on public.catalogue_overrides for delete using (public.is_penrec_staff());
commit;
