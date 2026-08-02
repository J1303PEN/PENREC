import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getAdminCatalogueOverride } from "@/lib/catalogue-live";
import { getArtist } from "@/data/catalog";
import { saveCatalogueEntry } from "@/app/admin/catalogue/actions";

export default async function CatalogueEditPage({ params, searchParams }: { params: Promise<{slug:string}>; searchParams: Promise<{saved?:string;error?:string}> }) {
  await requireAdmin();
  const { slug } = await params;
  const base = getArtist(slug);
  if (!base) notFound();
  const row = await getAdminCatalogueOverride(slug);
  const state = await searchParams;
  const value = <K extends keyof typeof base>(key: K) => (row as Record<string, unknown> | null)?.[String(key).replace(/[A-Z]/g, m => `_${m.toLowerCase()}`)] ?? base[key];
  const bio = Array.isArray(row?.bio) ? row.bio.join("\n\n") : base.bio.join("\n\n");
  return <main id="content" className="admin-page shell inside catalogue-editor">
    <header className="account-hero"><div><p className="eyebrow">PENREC Studio / Catalogue editor</p><h1>{base.name}</h1><p>Changes are stored in Supabase. Publish them when they are ready to appear on the public artist and release pages.</p></div><Link className="button button--outline" href="/admin/catalogue">Back to catalogue</Link></header>
    {state.saved && <p className="form-alert form-alert--success">Catalogue entry saved.</p>}
    {state.error && <p className="form-alert form-alert--error">{state.error}</p>}
    <form action={saveCatalogueEntry} className="catalogue-editor__form">
      <input type="hidden" name="slug" value={slug}/>
      <section><h2>Identity</h2><div className="catalogue-editor__grid">
        <label>Artist name<input name="name" defaultValue={String(value("name"))}/></label>
        <label>Album title<input name="album" defaultValue={String(value("album"))}/></label>
        <label>Catalogue number<input name="catalogue" defaultValue={String(value("catalogue"))}/></label>
        <label>Release year<input name="year" defaultValue={String(value("year"))}/></label>
        <label>Location<input name="location" defaultValue={String(value("location"))}/></label>
        <label className="span-2">Descriptor<input name="descriptor" defaultValue={String(value("descriptor"))}/></label>
      </div></section>
      <section><h2>Story</h2><div className="catalogue-editor__grid">
        <label className="span-2">Biography paragraphs<textarea name="bio" rows={9} defaultValue={bio}/><small>Separate paragraphs with a blank line.</small></label>
        <label className="span-2">Artist quote<textarea name="quote" rows={3} defaultValue={String(value("quote"))}/></label>
      </div></section>
      <section><h2>Media paths</h2><div className="catalogue-editor__grid">
        <label>Cover image<input name="cover" defaultValue={String(value("cover"))}/></label>
        <label>Hero image<input name="hero" defaultValue={String(value("hero"))}/></label>
        <label>Profile image<input name="profile" defaultValue={String(value("profile"))}/></label>
        <label>Audio preview<input name="preview" defaultValue={String(value("preview"))}/></label>
        <label>Hero position<input name="hero_position" defaultValue={String(row?.hero_position || base.heroPosition || "50% 50%")}/></label>
        <label>Profile position<input name="profile_position" defaultValue={String(row?.profile_position || base.profilePosition || "50% 50%")}/></label>
      </div></section>
      <section className="catalogue-editor__publish"><label><input type="checkbox" name="published" defaultChecked={row?.published ?? false}/><span><strong>Publish override</strong><small>When enabled, these saved values replace the built-in catalogue details on the public website.</small></span></label></section>
      <div className="catalogue-editor__actions"><button className="button button--gold" type="submit">Save catalogue entry</button><Link className="button button--outline" href={`/artists/${slug}`}>Preview public artist</Link></div>
    </form>
  </main>;
}
