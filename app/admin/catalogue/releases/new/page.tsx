import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getManagedArtists } from "@/lib/catalogue-manager";
import { ReleaseForm } from "@/components/catalogue17/release-form";
import { saveRelease } from "@/app/admin/catalogue/manager-actions";

export default async function NewRelease(){
  await requireAdmin();
  const artists=await getManagedArtists();
  return <main className="studio-new catalogue-editor">
    <header className="studio-new__hero">
      <div>
        <p className="studio-new__eyebrow">PENREC Studio · Catalogue</p>
        <h1>New release</h1>
        <p>Add the release once here and keep its catalogue information, artwork and tracks together.</p>
      </div>
      <Link className="button button--outline" href="/admin/catalogue">Back to catalogue</Link>
    </header>
    <ReleaseForm artists={artists} action={saveRelease}/>
  </main>;
}
