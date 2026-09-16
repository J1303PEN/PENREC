import Image from "next/image";
import Link from "next/link";
import { AccountSection } from "@/components/account-section";
import { requireUser } from "@/lib/auth";
import { getDigitalLibrary } from "@/lib/account";

export const metadata = { title: "My Music | PENREC" };

export default async function Page() {
  await requireUser();
  const items = await getDigitalLibrary();

  return (
    <AccountSection
      eyebrow="Your collection"
      title="My Music"
      intro="Digital releases connected to your PENREC account are ready to download here."
    >
      {items.length === 0 ? (
        <div className="account-empty">
          <h2>Your library is ready</h2>
          <p>
            You have no active digital purchases yet. Browse the current catalogue and discover your next release.
          </p>
          <Link className="button" href="/store">
            Visit the store
          </Link>
        </div>
      ) : (
        <div className="account-list">
          {items.map((item) => (
            <article key={item.id}>
              {item.release?.artwork && (
                <Image
                  src={item.release.artwork}
                  alt=""
                  width={110}
                  height={110}
                />
              )}
              <div>
                <span>Digital download</span>
                <h2>{item.release?.title || item.digital_file}</h2>
                {item.release?.slug && <p>{item.release.slug}</p>}
                <Link className="button" href={`/api/account/download/${item.id}`}>
                  Download release
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </AccountSection>
  );
}
