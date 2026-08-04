-- PENREC public contact form. Visitors may submit; only PENREC staff may read enquiries.
begin;

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  enquiry_type text not null check (enquiry_type in ('general','artist-music','press-media','partnership','licensing','website')),
  subject text not null check (char_length(subject) between 1 and 160),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new','in-progress','closed')),
  created_at timestamptz not null default now()
);

alter table public.contact_enquiries enable row level security;
grant insert on public.contact_enquiries to anon, authenticated;
grant select, update, delete on public.contact_enquiries to authenticated;

drop policy if exists "Anyone can submit a contact enquiry" on public.contact_enquiries;
create policy "Anyone can submit a contact enquiry"
  on public.contact_enquiries for insert
  to anon, authenticated
  with check (status = 'new');

drop policy if exists "PENREC staff manage contact enquiries" on public.contact_enquiries;
create policy "PENREC staff manage contact enquiries"
  on public.contact_enquiries for all
  to authenticated
  using (public.is_penrec_staff())
  with check (public.is_penrec_staff());

commit;
