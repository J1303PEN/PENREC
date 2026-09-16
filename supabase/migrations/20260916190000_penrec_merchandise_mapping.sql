-- PENREC merchandise supplier mapping
-- Separates customer download files from physical print artwork and preserves exact provider variants/costs.

begin;

alter table public.commerce_products
  add column if not exists provider_variant_id text,
  add column if not exists artwork_file text,
  add column if not exists supplier_cost_pence integer,
  add column if not exists provider_metadata jsonb not null default '{}'::jsonb;

alter table public.order_items
  add column if not exists provider_variant_id text,
  add column if not exists artwork_file text,
  add column if not exists supplier_cost_pence integer,
  add column if not exists provider_metadata jsonb not null default '{}'::jsonb;

alter table public.commerce_products
  drop constraint if exists commerce_products_supplier_cost_nonnegative;
alter table public.commerce_products
  add constraint commerce_products_supplier_cost_nonnegative
  check (supplier_cost_pence is null or supplier_cost_pence >= 0);

alter table public.order_items
  drop constraint if exists order_items_supplier_cost_nonnegative;
alter table public.order_items
  add constraint order_items_supplier_cost_nonnegative
  check (supplier_cost_pence is null or supplier_cost_pence >= 0);

comment on column public.commerce_products.provider_product_id is 'Provider parent product/catalog UID.';
comment on column public.commerce_products.provider_variant_id is 'Exact provider size/colour/variant identifier used for fulfilment.';
comment on column public.commerce_products.artwork_file is 'Physical print artwork URL/reference. Never use digital_file for print fulfilment.';
comment on column public.commerce_products.digital_file is 'Private customer digital-download package reference only.';
comment on column public.commerce_products.supplier_cost_pence is 'Latest supplier base product cost snapshot in pence, excluding variable shipping/tax unless explicitly documented.';
comment on column public.commerce_products.provider_metadata is 'Provider-specific non-secret mapping metadata such as print placement and catalogue attributes.';

commit;
