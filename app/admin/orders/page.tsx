import Link from "next/link";
import { changeOrderStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { getAdminOrders } from "@/lib/admin";

export const metadata = { title: "Orders | PENREC Studio" };
const statuses = ["pending", "paid", "processing", "shipped", "completed", "cancelled", "refunded"];

export default async function OrdersPage() {
  await requireAdmin();
  const orders = await getAdminOrders();
  return <main id="content" className="admin-page shell inside">
    <p className="eyebrow">PENREC Studio / Orders</p><h1>Order operations</h1>
    <p className="admin-intro">Review customer orders and move them through fulfilment.</p>
    {orders.length === 0 ? <section className="account-empty"><h2>No orders yet</h2><p>Orders will appear here once PENREC commerce begins taking payments.</p></section> :
    <div className="user-table" role="table" aria-label="PENREC orders">
      <div className="user-table__row user-table__head" role="row"><span>Order</span><span>Status</span><span>Total</span></div>
      {orders.map((order) => <div className="user-table__row" role="row" key={order.id}>
        <span><strong>{order.order_number}</strong><small>{new Date(order.created_at).toLocaleDateString("en-GB")}</small></span>
        <span><form action={changeOrderStatus}><input type="hidden" name="id" value={order.id}/><select name="status" defaultValue={order.status}>{statuses.map(s=><option key={s}>{s}</option>)}</select><button className="text-button" type="submit">Update</button></form></span>
        <span>{new Intl.NumberFormat("en-GB",{style:"currency",currency:order.currency}).format(order.total_pence/100)}</span>
      </div>)}
    </div>}
    <p className="form-help"><Link href="/admin">← Back to control room</Link></p>
  </main>;
}
