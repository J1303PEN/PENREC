import Link from "next/link";
import { StudioManager } from "@/components/studio-manager";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "PENREC Studio" };

export default async function StudioPage() {
  const { profile, role } = await requireAdmin();
  return <main id="content" className="shell inside studio-page">
    <header className="studio-command-header">
      <div>
        <p className="eyebrow">PENREC16 / Studio workspace</p>
        <h1>Label operations</h1>
        <p>Signed in as {profile?.display_name || "PENREC team"} · {role.replaceAll("_", " ")}</p>
      </div>
      <nav aria-label="Studio shortcuts">
        <Link className="button button--outline" href="/admin">Control room</Link>
        <Link className="button button--outline" href="/admin/catalogue">Catalogue overview</Link>
        <Link className="button button--outline" href="/admin/media">Media overview</Link>
        <Link className="button button--outline" href="/admin/products">Commerce</Link>
      </nav>
    </header>
    <StudioManager />
  </main>;
}
