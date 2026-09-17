-- PENREC merchandise product fields
-- Align commerce_products with the merchandise/fulfilment model used by PENREC Studio.
begin;

alter table public.commerce_products
  add column if not exists provider_variant_id text,
  add column if not exists artwork_file text,
  add column if not exists supplier_cost_pence integer check (supplier_cost_pence is null or supplier_cost_pence >= 0),
  add column if not exists provider_metadata jsonb not null default '{}'::jsonb;

create index if not exists commerce_products_provider_variant_idx
  on public.commerce_products(provider, provider_variant_id)
  where provider_variant_id is not null;

commit;
