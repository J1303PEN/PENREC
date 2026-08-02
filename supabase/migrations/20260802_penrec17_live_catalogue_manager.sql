-- PENREC17 Live Catalogue Manager
-- Safe to run more than once. ISRC is deliberately optional.
create extension if not exists pgcrypto;

create table if not exists public.penrec_artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  biography text,
  image text,
  website text,
  spotify text,
  apple_music text,
  instagram text,
  status text not null default 'draft' check (status in ('draft','scheduled','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.penrec_releases (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.penrec_artists(id) on delete cascade,
  title text not null,
  slug text not null unique,
  release_type text not null default 'album' check (release_type in ('album','ep','single','compilation','live','soundtrack')),
  catalogue_number text unique,
  release_date date,
  description text,
  artwork text,
  price_pence integer not null default 0 check (price_pence >= 0),
  currency text not null default 'GBP',
  status text not null default 'draft' check (status in ('draft','scheduled','published','archived')),
  publish_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.penrec_tracks (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.penrec_releases(id) on delete cascade,
  track_number integer not null check (track_number > 0),
  title text not null,
  duration text,
  isrc text,
  lyrics text,
  credits text,
  preview_audio text,
  master_audio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(release_id, track_number)
);

create index if not exists penrec_releases_artist_idx on public.penrec_releases(artist_id);
create index if not exists penrec_tracks_release_idx on public.penrec_tracks(release_id, track_number);

create or replace function public.is_penrec_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('staff','admin','super_admin')
  );
$$;

alter table public.penrec_artists enable row level security;
alter table public.penrec_releases enable row level security;
alter table public.penrec_tracks enable row level security;

drop policy if exists "Public published artists" on public.penrec_artists;
create policy "Public published artists" on public.penrec_artists for select using (status = 'published' or public.is_penrec_staff());
drop policy if exists "Staff manage artists" on public.penrec_artists;
create policy "Staff manage artists" on public.penrec_artists for all using (public.is_penrec_staff()) with check (public.is_penrec_staff());

drop policy if exists "Public published releases" on public.penrec_releases;
create policy "Public published releases" on public.penrec_releases for select using (status = 'published' or public.is_penrec_staff());
drop policy if exists "Staff manage releases" on public.penrec_releases;
create policy "Staff manage releases" on public.penrec_releases for all using (public.is_penrec_staff()) with check (public.is_penrec_staff());

drop policy if exists "Public tracks of published releases" on public.penrec_tracks;
create policy "Public tracks of published releases" on public.penrec_tracks for select using (
  exists (select 1 from public.penrec_releases r where r.id = release_id and r.status = 'published') or public.is_penrec_staff()
);
drop policy if exists "Staff manage tracks" on public.penrec_tracks;
create policy "Staff manage tracks" on public.penrec_tracks for all using (public.is_penrec_staff()) with check (public.is_penrec_staff());

grant select on public.penrec_artists, public.penrec_releases, public.penrec_tracks to anon, authenticated;
grant insert, update, delete on public.penrec_artists, public.penrec_releases, public.penrec_tracks to authenticated;
