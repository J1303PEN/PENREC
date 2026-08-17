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
const additionalReleases: Partial<Record<string, ReleaseData[]>> = {
  "fifth-and-main": [
    {
      album: "Christmas",
      cover: "/images/covers/fifth-and-main-christmas.jpg",
      year: "2026",
      catalogue: "PNR022",
      preview: "https://audio.penrec.co.uk/01_christmas_starts_tonight.mp3",
      tracks: [
        { title: "Christmas Starts Tonight", duration: "5:08", audio: "https://audio.penrec.co.uk/01_christmas_starts_tonight.mp3" },
        { title: "Stay Till New Year", duration: "4:18", audio: "https://audio.penrec.co.uk/02_stay_till_new_year.mp3" },
        { title: "Same Time Next Year", duration: "5:02", audio: "https://audio.penrec.co.uk/03_same_time_next_year.mp3" },
        { title: "Can't Wait", duration: "4:29", audio: "https://audio.penrec.co.uk/04-cant_wait.mp3" },
        { title: "I Still Think of You", duration: "5:25", audio: "https://audio.penrec.co.uk/05_i_still_think_of_you.mp3" },
        { title: "Wide Awake", duration: "4:01", audio: "https://audio.penrec.co.uk/06_wide_awake.mp3" },
        { title: "One More Thing", duration: "3:33", audio: "https://audio.penrec.co.uk/07_one_more_thing.mp3" },
        { title: "Before the Day Begins", duration: "4:51", audio: "https://audio.penrec.co.uk/08_before-the_day_begins.mp3" },
        { title: "No Reason to Go", duration: "3:41", audio: "https://audio.penrec.co.uk/09_no_reason_to_go.mp3" },
        { title: "A Lifetime of Winters", duration: "5:45", audio: "https://audio.penrec.co.uk/10_a_lifetime_of_winters.mp3" },
        { title: "Take the Long Way", duration: "4:19", audio: "https://audio.penrec.co.uk/11_take_the_long_way.mp3" },
        { title: "Just Like You Did", duration: "5:03", audio: "https://audio.penrec.co.uk/12_just_like_you_did.mp3" },
        { title: "First One With You", duration: "4:22", audio: "https://audio.penrec.co.uk/13_first_one_with_you.mp3" },
        { title: "All I'll Remember", duration: "4:49", audio: "https://audio.penrec.co.uk/14_all_ill_remember.mp3" },
      ],
    },
  ],
};

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
