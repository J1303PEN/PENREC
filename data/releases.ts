import type { Artist, Track } from "@/data/catalog";

export type ReleaseData = {
  album: string;
  cover: string;
  year: string;
  catalogue: string;
  preview: string;
  tracks: Track[];
};

// Additional releases are kept separately from the legacy artist record so the
// existing catalogue remains backwards compatible while artists gain a true
// discography. New second/third releases are added here.
const additionalReleases: Partial<Record<string, ReleaseData[]>> = {};

function legacyRelease(artist: Artist): ReleaseData {
  return {
    album: artist.album,
    cover: artist.cover,
    year: artist.year,
    catalogue: artist.slug === "nikos-andros" ? "PNR021" : artist.catalogue,
    preview: artist.preview,
    tracks: artist.tracks,
  };
}

export function getArtistReleases(artist: Artist): ReleaseData[] {
  return [legacyRelease(artist), ...(additionalReleases[artist.slug] ?? [])];
}

export function asReleaseArtist(artist: Artist, release: ReleaseData): Artist {
  return {
    ...artist,
    album: release.album,
    cover: release.cover,
    year: release.year,
    catalogue: release.catalogue,
    preview: release.preview,
    tracks: release.tracks,
  };
}

export function getReleaseArtist(artist: Artist, catalogue?: string): Artist {
  const releases = getArtistReleases(artist);
  const selected = catalogue
    ? releases.find((release) => release.catalogue.toLowerCase() === catalogue.toLowerCase())
    : releases[releases.length - 1];
  return asReleaseArtist(artist, selected ?? releases[releases.length - 1]);
}

export function getReleaseHref(artist: Artist, release: ReleaseData): string {
  const releases = getArtistReleases(artist);
  return releases.length === 1
    ? `/releases/${artist.slug}`
    : `/releases/${artist.slug}?release=${encodeURIComponent(release.catalogue)}`;
}

export type CatalogueRelease = Artist & { releaseHref: string };

export function getCatalogueReleaseArtists(artists: Artist[]): CatalogueRelease[] {
  return artists.flatMap((artist) =>
    getArtistReleases(artist).map((release) => ({
      ...asReleaseArtist(artist, release),
      releaseHref: getReleaseHref(artist, release),
    })),
  );
}
