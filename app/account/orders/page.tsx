import Link from "next/link";
import { AccountSection } from "@/components/account-section";
import { requireUser } from "@/lib/auth";
import { getOrders } from "@/lib/account";
export const metadata = { title: "Orders | PENREC" };
export default async function Page(){await requireUser();const orders=await getOrders();return <AccountSection eyebrow="Purchase history" title="Orders" intro="Track PENREC orders and see a clear record of every purchase.">{orders.length===0?<div className="account-empty"><h2>No orders yet</h2><p>Your physical and digital orders will appear here once PENREC commerce opens.</p><Link className="button" href="/store">Visit the store</Link></div>:<div className="orders-table"><div className="orders-row orders-head"><span>Order</span><span>Date</span><span>Status</span><span>Total</span></div>{orders.map(o=><article className="orders-row" key={o.id}><strong>{o.order_number}</strong><span>{new Date(o.created_at).toLocaleDateString("en-GB")}</span><span className="order-status">{o.status}</span><span>{new Intl.NumberFormat("en-GB",{style:"currency",currency:o.currency}).format(o.total_pence/100)}</span></article>)}</div>}</AccountSection>}
