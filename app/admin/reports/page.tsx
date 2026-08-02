import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminOrders, getAdminProfiles } from "@/lib/admin";

export const metadata = { title: "Reports | PENREC Studio" };

export default async function ReportsPage() {
  await requireAdmin();
  const [profiles, orders] = await Promise.all([getAdminProfiles(), getAdminOrders()]);
  const revenue = orders.filter(o => !["cancelled","refunded"].includes(o.status)).reduce((sum,o)=>sum+o.total_pence,0);
  const completed = orders.filter(o=>o.status==="completed").length;
  return <main id="content" className="admin-page shell inside">
    <p className="eyebrow">PENREC Studio / Reports</p><h1>Operational snapshot</h1>
    <section className="admin-metrics">
      <article><strong>{profiles.length}</strong><span>Registered accounts</span></article>
      <article><strong>{orders.length}</strong><span>Total orders</span></article>
      <article><strong>{completed}</strong><span>Completed</span></article>
      <article><strong>{new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(revenue/100)}</strong><span>Recorded order value</span></article>
    </section>
    <p className="form-help"><Link href="/admin">← Back to control room</Link></p>
  </main>;
}
