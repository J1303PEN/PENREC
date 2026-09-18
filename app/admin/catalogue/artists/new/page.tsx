import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ArtistForm } from "@/components/catalogue17/artist-form";
import { saveArtist } from "@/app/admin/catalogue/manager-actions";

export default async function NewArtist(){
  await requireAdmin();
  return <main className="studio-new catalogue-editor">
    <header className="studio-new__hero">
      <div>
        <p className="studio-new__eyebrow">PENREC Studio · Catalogue</p>
        <h1>New artist</h1>
        <p>Add the artist once here and keep their catalogue identity together.</p>
      </div>
      <Link className="button button--outline" href="/admin/catalogue">Back to catalogue</Link>
    </header>
    <ArtistForm action={saveArtist}/>
  </main>;
}
