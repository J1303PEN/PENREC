import { getAccessToken, restRequest, restSelect } from "@/lib/penrec-auth";
import { getArtist, type Artist } from "@/data/catalog";

type CatalogueOverride = {
  slug: string;
  name: string | null;
  album: string | null;
  descriptor: string | null;
  location: string | null;
  bio: string[] | null;
  quote: string | null;
  year: string | null;
  catalogue: string | null;
  cover: string | null;
  hero: string | null;
  profile: string | null;
  hero_position: string | null;
  profile_position: string | null;
  preview: string | null;
  published: boolean;
  updated_at: string;
};

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key || url.includes("YOUR-PROJECT") || key.includes("YOUR_SUPABASE")) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function publicOverrides(slug: string) {
  const config = supabaseConfig();
  if (!config) return [] as CatalogueOverride[];
  const query = `select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`;
  const response = await fetch(`${config.url}/rest/v1/catalogue_overrides?${query}`, {
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
    cache: "no-store",
  });
  if (!response.ok) return [] as CatalogueOverride[];
  return response.json();
}

function merge(base: Artist, row?: CatalogueOverride | null): Artist {
  if (!row) return base;
  return {
    ...base,
    name: row.name || base.name,
    album: row.album || base.album,
    descriptor: row.descriptor || base.descriptor,
    location: row.location || base.location,
    bio: Array.isArray(row.bio) && row.bio.length ? row.bio : base.bio,
    quote: row.quote || base.quote,
    year: row.year || base.year,
    catalogue: row.catalogue || base.catalogue,
    cover: row.cover || base.cover,
    hero: row.hero || base.hero,
    profile: row.profile || base.profile,
    heroPosition: row.hero_position || base.heroPosition,
    profilePosition: row.profile_position || base.profilePosition,
    preview: row.preview || base.preview,
  };
}

export async function getResolvedArtist(slug: string) {
  const base = getArtist(slug);
  if (!base) return undefined;
  const rows = await publicOverrides(slug);
  return merge(base, rows[0]);
}

export async function getAdminCatalogueOverride(slug: string) {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired.");
  const rows = await restSelect<CatalogueOverride[]>(
    "catalogue_overrides",
    `select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    token,
  );
  return rows[0] || null;
}

export async function getAdminResolvedArtist(slug: string) {
  const base = getArtist(slug);
  if (!base) return undefined;
  return { artist: merge(base, await getAdminCatalogueOverride(slug)), override: await getAdminCatalogueOverride(slug) };
}

export async function saveCatalogueOverride(slug: string, payload: Omit<CatalogueOverride, "slug" | "updated_at">) {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired.");
  return restRequest<CatalogueOverride[]>(
    "catalogue_overrides?on_conflict=slug",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({ slug, ...payload, updated_at: new Date().toISOString() }),
    },
    token,
  );
}
