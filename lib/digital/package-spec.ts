import type { Artist, Track } from "@/data/catalog";

export type DigitalTrackSpec = {
  number: number;
  title: string;
  duration: string;
};

export type DigitalPackageSpec = {
  catalogue: string;
  artist: string;
  slug: string;
  album: string;
  year: string;
  cover: string;
  tracks: DigitalTrackSpec[];
};

export function buildDigitalPackageSpec(artist: Artist): DigitalPackageSpec {
  return {
    catalogue: artist.catalogue,
    artist: artist.name,
    slug: artist.slug,
    album: artist.album,
    year: artist.year,
    cover: artist.cover,
    tracks: artist.tracks.map((track: Track, index) => ({
      number: index + 1,
      title: track.title,
      duration: track.duration,
    })),
  };
}
