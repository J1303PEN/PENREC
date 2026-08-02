import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { getOwnProfile, requireUser } from "@/lib/auth";
import { getLibrary, getOrders, getWishlist } from "@/lib/account";

export const metadata = { title: "My Account | PENREC" };
export default async function AccountPage() {
  const { user } = await requireUser();
  const [profile, library, orders, wishlist] = await Promise.all([getOwnProfile(user.id), getLibrary(), getOrders(), getWishlist()]);
  const isTeam = ["staff", "admin", "super_admin"].includes(profile?.role || "");
  const name = profile?.display_name || user.user_metadata?.display_name || user.email?.split("@")[0];
  return <main id="content" className="account-page shell inside">
    <header className="account-hero"><div><p className="eyebrow">PENREC account</p><h1>Hello, {name}</h1><p>Your personal PENREC space for music, orders, saved releases and account settings.</p></div><form action={logout}><button className="button button--outline" type="submit">Sign out</button></form></header>
    <section className="account-summary" aria-label="Account summary"><article><strong>{library.length}</strong><span>Music items</span></article><article><strong>{orders.length}</strong><span>Orders</span></article><article><strong>{wishlist.length}</strong><span>Wishlist</span></article></section>
    <section className="account-grid">
      <Link className="account-card" href="/account/music"><span>01</span><h2>My Music</h2><p>Open your digital library and downloads.</p><b>{library.length} item{library.length === 1 ? "" : "s"} →</b></Link>
      <Link className="account-card" href="/account/orders"><span>02</span><h2>Orders</h2><p>View order history, totals and status.</p><b>{orders.length} order{orders.length === 1 ? "" : "s"} →</b></Link>
      <Link className="account-card" href="/account/wishlist"><span>03</span><h2>Wishlist</h2><p>Save PENREC releases and return to them later.</p><b>{wishlist.length} saved →</b></Link>
      <Link className="account-card" href="/account/profile"><span>04</span><h2>Profile</h2><p>Update your display name and see account details.</p><b>Manage profile →</b></Link>
      <Link className="account-card" href="/account/settings"><span>05</span><h2>Notifications</h2><p>Choose which PENREC updates you receive.</p><b>Manage preferences →</b></Link>
      <Link className="account-card" href="/forgot-password"><span>06</span><h2>Security</h2><p>Use the secure password recovery flow.</p><b>Reset password →</b></Link>
      {isTeam && <Link className="account-card account-card--gold" href="/admin"><span>07</span><h2>PENREC Studio</h2><p>Your account has team access.</p><b>Open admin dashboard →</b></Link>}
    </section>
  </main>;
}
