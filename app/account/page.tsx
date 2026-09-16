import Link from "next/link";
import { AccountDashboardShell } from "@/components/account-dashboard-shell";
import { getOwnProfile, requireUser } from "@/lib/auth";
import { getLibrary, getOrders, getWishlist } from "@/lib/account";

export const metadata = { title: "My Account | PENREC" };

export default async function AccountPage() {
  const { user } = await requireUser();
  const [profile, library, orders, wishlist] = await Promise.all([
    getOwnProfile(user.id),
    getLibrary(),
    getOrders(),
    getWishlist(),
  ]);
  const isTeam = ["staff", "admin", "super_admin"].includes(profile?.role || "");
  const name = profile?.display_name || user.user_metadata?.display_name || user.email?.split("@")[0];

  return (
    <AccountDashboardShell active="overview" name={name}>
      <header className="account-hub__section-head">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Welcome back{name ? `, ${name}` : ""}.</h2>
          <p>Everything connected to your PENREC account lives here.</p>
        </div>
      </header>

      <section className="account-hub__stats" aria-label="Account summary">
        <article><strong>{library.length}</strong><span>Music items</span></article>
        <article><strong>{orders.length}</strong><span>Orders</span></article>
        <article><strong>{wishlist.length}</strong><span>Wishlist</span></article>
      </section>

      <section className="account-hub__tiles">
        <Link href="/account/music"><span>My Music</span><h3>Your digital collection</h3><p>{library.length ? `${library.length} release${library.length === 1 ? "" : "s"} ready.` : "Digital releases will appear here once your first purchase is available."}</p><b>Open My Music →</b></Link>
        <Link href="/account/orders"><span>Orders</span><h3>Purchases and fulfilment</h3><p>See order totals, status and delivery progress in one place.</p><b>View orders →</b></Link>
        <Link href="/account/wishlist"><span>Wishlist</span><h3>Saved for later</h3><p>Keep releases and products close without adding them to your basket.</p><b>View wishlist →</b></Link>
        <Link href="/account/profile"><span>Profile</span><h3>Your account details</h3><p>Manage your display name and account information.</p><b>Manage profile →</b></Link>
        {isTeam && <Link className="account-hub__tile-gold" href="/admin"><span>PENREC Studio</span><h3>Team control room</h3><p>Your account has Studio access.</p><b>Open Studio →</b></Link>}
      </section>
    </AccountDashboardShell>
  );
}
