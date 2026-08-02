"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { saveCatalogueOverride } from "@/lib/catalogue-live";

const text = (formData: FormData, name: string) => String(formData.get(name) || "").trim();
export async function saveCatalogueEntry(formData: FormData) {
  await requireAdmin();
  const slug = text(formData, "slug");
  if (!slug) redirect("/admin/catalogue?error=Missing+artist+slug");
  try {
    await saveCatalogueOverride(slug, {
      name: text(formData,"name") || null,
      album: text(formData,"album") || null,
      descriptor: text(formData,"descriptor") || null,
      location: text(formData,"location") || null,
      bio: text(formData,"bio").split(/\n\s*\n/).map(v=>v.trim()).filter(Boolean),
      quote: text(formData,"quote") || null,
      year: text(formData,"year") || null,
      catalogue: text(formData,"catalogue") || null,
      cover: text(formData,"cover") || null,
      hero: text(formData,"hero") || null,
      profile: text(formData,"profile") || null,
      hero_position: text(formData,"hero_position") || null,
      profile_position: text(formData,"profile_position") || null,
      preview: text(formData,"preview") || null,
      published: formData.get("published") === "on",
    });
  } catch (error) {
    redirect(`/admin/catalogue/${slug}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to save catalogue entry.")}`);
  }
  revalidatePath(`/admin/catalogue/${slug}`);
  revalidatePath(`/artists/${slug}`);
  revalidatePath(`/releases/${slug}`);
  redirect(`/admin/catalogue/${slug}?saved=1`);
}
