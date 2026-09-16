import Link from "next/link";
import { logout } from "@/app/auth/actions";

const navItems = [
  ["overview", "Overview", "/account"],
  ["orders", "Orders", "/account/orders"],
  ["music", "My Music", "/account/music"],
  ["wishlist", "Wishlist", "/account/wishlist"],
  ["profile", "Profile", "/account/profile"],
  ["settings", "Account Settings", "/account/settings"],
] as const;

export function AccountDashboardShell({
  active,
  name,
  children,
}: {
  active: (typeof navItems)[number][0];
  name?: string | null;
  children: React.ReactNode;
}) {
  const initials = (name || "PENREC")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";

  return (
    <main id="content" className="account-hub">
      <section className="account-hub__hero">
        <div className="shell account-hub__hero-inner">
          <div>
            <p className="eyebrow">PENREC account</p>
            <h1>My Account</h1>
            <p>Your music. Your orders. Your PENREC.</p>
          </div>
          <div className="account-hub__identity" aria-label={name || "PENREC account"}>
            <span>{initials}</span>
            <small>{name || "PENREC member"}</small>
          </div>
        </div>
      </section>

      <div className="shell account-hub__layout">
        <aside className="account-hub__sidebar" aria-label="Account navigation">
          <nav>
            {navItems.map(([key, label, href]) => (
              <Link key={key} href={href} className={active === key ? "is-active" : undefined}>
                <span aria-hidden="true">{key === "overview" ? "⌂" : key === "orders" ? "□" : key === "music" ? "♫" : key === "wishlist" ? "♡" : key === "profile" ? "○" : "⚙"}</span>
                {label}
              </Link>
            ))}
          </nav>
          <form action={logout}>
            <button type="submit"><span aria-hidden="true">↪</span> Sign out</button>
          </form>
        </aside>
        <section className="account-hub__content">{children}</section>
      </div>
    </main>
  );
}
