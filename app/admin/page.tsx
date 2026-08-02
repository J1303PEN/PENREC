import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminOrders, getAdminProfiles } from "@/lib/admin";
import { artists } from "@/data/catalog";

export const metadata = { title: "Admin | PENREC Studio" };

export default async function AdminPage() {
  const { profile, role } = await requireAdmin();
  const [profiles, orders] = await Promise.all([getAdminProfiles(), getAdminOrders()]);
  const pending = orders.filter((order) => ["pending", "paid", "processing"].includes(order.status)).length;
  const trackCount = artists.reduce((total, artist) => total + artist.tracks.length, 0);

  const modules = [
    ["Catalogue", `${artists.length} artists · ${trackCount} tracks`, "/admin/catalogue"],
    ["Media", "Artwork, photography and audio inventory", "/admin/media"],
    ["Products", "Music formats, merchandise and fulfilment routing", "/admin/products"],
    ["Studio Workspace", "Publishing, releases, journal and imports", "/studio"],
    ["Orders", `${pending} order${pending === 1 ? "" : "s"} need attention`, "/admin/orders"],
    ["Customers", `${profiles.length} registered account${profiles.length === 1 ? "" : "s"}`, "/admin/users"],
    ["Reports", "Operational overview and release reporting", "/admin/reports"],
  ];

  return <main id="content" className="admin-page shell inside">
    <header className="account-hero">
      <div><p className="eyebrow">PENREC Studio</p><h1>Control room</h1><p>Signed in as {profile?.display_name || "PENREC team"} · {role.replaceAll("_", " ")}</p></div>
      <Link className="button button--outline" href="/account">My account</Link>
    </header>
    <section className="admin-metrics admin-metrics--four">
      <article><strong>{artists.length}</strong><span>Artists</span></article>
      <article><strong>{trackCount}</strong><span>Tracks</span></article>
      <article><strong>{profiles.length}</strong><span>Accounts</span></article>
      <article><strong>{pending}</strong><span>Need attention</span></article>
    </section>
    <section className="admin-grid">
      {modules.map(([title, copy, href]) => <Link key={title} href={href}><span>Open module</span><h2>{title}</h2><p>{copy}</p></Link>)}
    </section>
  </main>;
}
