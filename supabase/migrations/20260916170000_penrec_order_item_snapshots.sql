-- PENREC immutable order-item fulfilment snapshot

begin;

alter table public.order_items
  add column if not exists release_id uuid
    references public.penrec_releases(id) on delete set null,
  add column if not exists digital_file text;

commit;
