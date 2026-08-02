import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "@/components/product-form";
import { createCommerceProduct } from "@/app/admin/products/actions";
import { getManagedReleases } from "@/lib/catalogue-manager";

export default async function NewProductPage({ searchParams }: { searchParams: Promise<{error?:string}> }) {
  await requireAdmin();
  const [state, releases] = await Promise.all([searchParams, getManagedReleases().catch(() => [])]);
  return <main id="content" className="admin-page shell inside catalogue-editor">
    <header className="account-hero"><div><p className="eyebrow">PENREC17.2 / Product Publishing</p><h1>New product</h1><p>Create a store-ready product, connect it to a Studio release and route fulfilment to the right partner.</p></div><Link className="button button--outline" href="/admin/products">Back to products</Link></header>
    {state.error && <p className="form-alert form-alert--error">{state.error}</p>}
    <ProductForm releases={releases} action={createCommerceProduct}/>
  </main>;
}
