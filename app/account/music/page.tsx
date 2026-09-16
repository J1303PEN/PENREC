import Image from "next/image";
import Link from "next/link";
import { AccountDashboardShell } from "@/components/account-dashboard-shell";
import { getOwnProfile, requireUser } from "@/lib/auth";
import { getDigitalLibrary } from "@/lib/account";

export const metadata = { title: "My Music | PENREC" };

export default async function Page() {
  const { user } = await requireUser();
  const [profile, items] = await Promise.all([getOwnProfile(user.id), getDigitalLibrary()]);
  const name = profile?.display_name || user.user_metadata?.display_name || user.email?.split("@")[0];

  return (
    <AccountDashboardShell active="music" name={name}>
      <header className="account-hub__section-head">
        <div>
          <p className="eyebrow">Your collection</p>
          <h2>My Music</h2>
          <p>Your purchased PENREC music will be ready to download here.</p>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="account-hub__library-empty">
          <div className="account-hub__empty-mark" aria-hidden="true">♫</div>
          <p className="eyebrow">Digital library</p>
          <h3>Your collection starts here.</h3>
          <p>
            There are no digital releases in this account yet. PENREC digital editions will appear here automatically once the masters are prepared and a qualifying purchase is attached to your account.
          </p>
          <div className="account-hub__empty-actions">
            <Link className="button button--gold" href="/store">Visit the store</Link>
            <Link className="button button--outline" href="/account/orders">View orders</Link>
          </div>
        </section>
      ) : (
        <section className="account-hub__library-grid">
          {items.map((item) => (
            <article key={item.id}>
              <div className="account-hub__cover">
                {item.release?.artwork ? (
                  <Image src={item.release.artwork} alt="" fill sizes="(max-width: 760px) 50vw, 260px" />
                ) : (
                  <div className="account-hub__cover-fallback">PENREC</div>
                )}
              </div>
              <div className="account-hub__release-copy">
                <span>Digital release</span>
                <h3>{item.release?.title || "PENREC digital edition"}</h3>
                {item.release?.slug && <p>{item.release.slug}</p>}
                <Link className="button button--outline" href={`/api/account/download/${item.id}`}>Download</Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </AccountDashboardShell>
  );
}
