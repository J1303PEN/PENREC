import { cache } from "react";
import { completeCatalogueArtists, completeCatalogueReleases } from "@/data/releases";
import { restRequest, restSelect } from "@/lib/penrec-auth";
import type { ManagedArtist, ManagedRelease } from "@/lib/catalogue-manager";

// Import new releases on the first authorised Studio visit after deployment.
// Existing rows belong to the editor: never overwrite them or restore removed tracks.
export const ensureCurrentCatalogue = cache(async (accessToken: string) => {
  const insert = <T>(table: string, conflict: string, rows: unknown[]) =>
    restRequest<T[]>(`${table}?on_conflict=${conflict}`, {
      method: "POST",
      headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
      body: JSON.stringify(rows),
    }, accessToken);
  let artists = await restSelect<ManagedArtist[]>("penrec_artists", "select=*", accessToken);
  const missingArtists = completeCatalogueArtists.filter(a => !artists.some(row => row.slug === a.slug));
  if (missingArtists.length) {
    await insert("penrec_artists", "slug", missingArtists.map(a => ({
      name: a.name, slug: a.slug, biography: a.bio.join("\n\n"),
      image: a.profile || a.hero || null, status: "published",
    })));
    artists = await restSelect<ManagedArtist[]>("penrec_artists", "select=*", accessToken);
  }
  const releases = await restSelect<ManagedRelease[]>("penrec_releases", "select=*", accessToken);
  for (const release of completeCatalogueReleases) {
    const slug = `${release.slug}-${release.catalogue.toLowerCase()}`;
    if (releases.some(row => row.slug === slug || row.catalogue_number?.toUpperCase() === release.catalogue.toUpperCase())) continue;
    const artist = artists.find(row => row.slug === release.slug);
    if (!artist) throw new Error(`Unable to import artist ${release.name}.`);
    const rows = await insert<ManagedRelease>("penrec_releases", "catalogue_number", [{
      artist_id: artist.id, slug, title: release.album,
      release_type: release.catalogue === "PNR033" ? "soundtrack" : "album",
      catalogue_number: release.catalogue, release_date: `${release.year}-01-01`,
      description: release.bio.join("\n\n"), artwork: release.cover,
      price_pence: 0, currency: "GBP", status: "published",
    }]);
    // Another request may already have imported it. Only its creator imports tracks.
    if (!rows.length) continue;
    try {
      await insert("penrec_tracks", "release_id,track_number", release.tracks.map((track, i) => ({
        release_id: rows[0].id, track_number: i + 1, title: track.title,
        duration: track.duration || null, preview_audio: track.audio || null,
      })));
    } catch (error) {
      // Roll back this newly created release so a later visit can retry a failed import.
      await restRequest(`penrec_releases?id=eq.${rows[0].id}`, { method: "DELETE" }, accessToken);
      throw error;
    }
  }
});
