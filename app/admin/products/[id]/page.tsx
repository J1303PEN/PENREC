import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "@/components/product-form";
import { getAdminProduct } from "@/lib/commerce";
import { getManagedReleases } from "@/lib/catalogue-manager";
import { updateCommerceProduct } from "@/app/admin/products/actions";

export default async function EditProductPage({ params, searchParams }: { params: Promise<{id:string}>; searchParams: Promise<{saved?:string;error?:string}> }) {
  await requireAdmin();
  const [{ id }, state, releases] = await Promise.all([params, searchParams, getManagedReleases().catch(() => [])]);
  const product = await getAdminProduct(id);
  if (!product) notFound();
  return <main id="content" className="admin-page shell inside catalogue-editor">
    <header className="account-hero"><div><p className="eyebrow">PENREC17.2 / Product Publishing</p><h1>{product.title}</h1><p>Update identity, release connection, availability, stock and fulfilment routing.</p></div><Link className="button button--outline" href="/admin/products">Back to products</Link></header>
    {state.saved && <p className="form-alert form-alert--success">Product saved.</p>}
    {state.error && <p className="form-alert form-alert--error">{state.error}</p>}
    <ProductForm product={product} releases={releases} action={updateCommerceProduct}/>
  </main>;
}
