import { getAccessToken, restRequest, restSelect } from "@/lib/penrec-auth";

export type CatalogueStatus = "draft" | "scheduled" | "published" | "archived";
export type ReleaseType = "album" | "ep" | "single" | "compilation" | "live" | "soundtrack";

export type ManagedArtist = {
  id: string; name: string; slug: string; biography: string | null; image: string | null;
  website: string | null; spotify: string | null; apple_music: string | null; instagram: string | null;
  status: CatalogueStatus; created_at: string; updated_at: string;
};
export type ManagedRelease = {
  id: string; artist_id: string; title: string; slug: string; release_type: ReleaseType;
  catalogue_number: string | null; release_date: string | null; description: string | null;
  artwork: string | null; price_pence: number; currency: string; status: CatalogueStatus;
  publish_at: string | null; created_at: string; updated_at: string;
  artist?: { name: string; slug: string } | null;
};
export type ManagedTrack = {
  id: string; release_id: string; track_number: number; title: string; duration: string | null;
  isrc: string | null; lyrics: string | null; credits: string | null; preview_audio: string | null;
  master_audio: string | null; created_at: string; updated_at: string;
};

async function token() { const value = await getAccessToken(); if (!value) throw new Error("Your session has expired."); return value; }
export async function getManagedArtists() { return restSelect<ManagedArtist[]>("penrec_artists", "select=*&order=name.asc", await token()); }
export async function getManagedArtist(id: string) { const rows = await restSelect<ManagedArtist[]>("penrec_artists", `select=*&id=eq.${encodeURIComponent(id)}&limit=1`, await token()); return rows[0] || null; }
export async function getManagedReleases() { return restSelect<ManagedRelease[]>("penrec_releases", "select=*,artist:penrec_artists(name,slug)&order=updated_at.desc", await token()); }
export async function getManagedRelease(id: string) { const rows = await restSelect<ManagedRelease[]>("penrec_releases", `select=*,artist:penrec_artists(name,slug)&id=eq.${encodeURIComponent(id)}&limit=1`, await token()); return rows[0] || null; }
export async function getReleaseTracks(releaseId: string) { return restSelect<ManagedTrack[]>("penrec_tracks", `select=*&release_id=eq.${encodeURIComponent(releaseId)}&order=track_number.asc`, await token()); }
export async function getManagedTrack(id: string) { const rows = await restSelect<ManagedTrack[]>("penrec_tracks", `select=*&id=eq.${encodeURIComponent(id)}&limit=1`, await token()); return rows[0] || null; }

export async function createManagedArtist(payload: Omit<ManagedArtist,"id"|"created_at"|"updated_at">) { return restRequest<ManagedArtist[]>("penrec_artists", {method:"POST",body:JSON.stringify({...payload,created_at:new Date().toISOString(),updated_at:new Date().toISOString()})}, await token()); }
export async function updateManagedArtist(id:string,payload:Partial<Omit<ManagedArtist,"id"|"created_at">>) { return restRequest<ManagedArtist[]>(`penrec_artists?id=eq.${encodeURIComponent(id)}`, {method:"PATCH",body:JSON.stringify({...payload,updated_at:new Date().toISOString()})}, await token()); }
export async function createManagedRelease(payload: Omit<ManagedRelease,"id"|"created_at"|"updated_at"|"artist">) { return restRequest<ManagedRelease[]>("penrec_releases", {method:"POST",body:JSON.stringify({...payload,created_at:new Date().toISOString(),updated_at:new Date().toISOString()})}, await token()); }
export async function updateManagedRelease(id:string,payload:Partial<Omit<ManagedRelease,"id"|"created_at"|"artist">>) { return restRequest<ManagedRelease[]>(`penrec_releases?id=eq.${encodeURIComponent(id)}`, {method:"PATCH",body:JSON.stringify({...payload,updated_at:new Date().toISOString()})}, await token()); }
export async function createManagedTrack(payload: Omit<ManagedTrack,"id"|"created_at"|"updated_at">) { return restRequest<ManagedTrack[]>("penrec_tracks", {method:"POST",body:JSON.stringify({...payload,created_at:new Date().toISOString(),updated_at:new Date().toISOString()})}, await token()); }
export async function updateManagedTrack(id:string,payload:Partial<Omit<ManagedTrack,"id"|"created_at">>) { return restRequest<ManagedTrack[]>(`penrec_tracks?id=eq.${encodeURIComponent(id)}`, {method:"PATCH",body:JSON.stringify({...payload,updated_at:new Date().toISOString()})}, await token()); }
export async function deleteManagedTrack(id:string) { return restRequest<ManagedTrack[]>(`penrec_tracks?id=eq.${encodeURIComponent(id)}`, {method:"DELETE"}, await token()); }

function publicConfig(){ const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(); const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(); if(!url||!key||url.includes("YOUR-PROJECT")||key.includes("YOUR_SUPABASE")) return null; return {url:url.replace(/\/$/,""),key}; }
export async function getPublicManagedReleases(): Promise<ManagedRelease[]> { const c=publicConfig(); if(!c) return [] as ManagedRelease[]; const response=await fetch(`${c.url}/rest/v1/penrec_releases?select=*,artist:penrec_artists(name,slug)&status=eq.published&order=release_date.desc.nullslast,updated_at.desc`,{headers:{apikey:c.key,Authorization:`Bearer ${c.key}`},cache:"no-store"}); if(!response.ok) return [] as ManagedRelease[]; return (await response.json()) as ManagedRelease[]; }
