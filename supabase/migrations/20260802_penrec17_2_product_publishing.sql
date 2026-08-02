-- PENREC17.2 — Product publishing fields
begin;

alter table public.commerce_products
  add column if not exists release_id uuid references public.penrec_releases(id) on delete set null,
  add column if not exists sku text,
  add column if not exists barcode text,
  add column if not exists stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  add column if not exists weight_grams integer check (weight_grams is null or weight_grams >= 0),
  add column if not exists digital_file text,
  add column if not exists preorder_at timestamptz,
  add column if not exists available_at timestamptz;

create index if not exists commerce_products_release_id_idx on public.commerce_products(release_id);
create unique index if not exists commerce_products_sku_unique on public.commerce_products(sku) where sku is not null;
create unique index if not exists commerce_products_barcode_unique on public.commerce_products(barcode) where barcode is not null;

commit;
