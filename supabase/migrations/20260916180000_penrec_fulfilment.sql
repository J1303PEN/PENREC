-- PENREC physical fulfilment records
-- Keeps provider order IDs/status separate from the customer-facing order status.

begin;

create table if not exists public.order_fulfilments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_order_id text,
  status text not null default 'pending',
  error_message text,
  submitted_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(order_id, provider)
);

create index if not exists order_fulfilments_order_idx
  on public.order_fulfilments(order_id);

alter table public.order_fulfilments enable row level security;

drop policy if exists "Staff order fulfilments select" on public.order_fulfilments;
create policy "Staff order fulfilments select" on public.order_fulfilments
for select using (public.is_penrec_staff());

grant select on public.order_fulfilments to authenticated;

commit;
