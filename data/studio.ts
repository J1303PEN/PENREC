export type BulletinStatus = "draft" | "scheduled" | "published";
export type ReleaseStatus = "draft" | "published" | "archived";
export type HomepageSection = "artists" | "statement" | "releases" | "news" | "player";
export type MediaKind = "image" | "audio" | "document";

export type Bulletin = {
  id: string; headline: string; summary: string; body: string; image: string; category: string;
  relatedArtist?: string; relatedRelease?: string; publishDate: string; publishTime?: string;
  status: BulletinStatus; createdAt: string; updatedAt: string;
};

export type MediaItem = {
  id: string; name: string; url: string; kind: MediaKind; size?: number; tags: string[];
  folder: string; createdAt: string; updatedAt: string;
};
export type ManagedTrack = { id: string; title: string; duration: string; audio?: string; fileName?: string };
export type ManagedRelease = {
  id: string; artistSlug: string; artistName: string; title: string; catalogue: string; year: string;
  genre: string; description: string; cover: string; status: ReleaseStatus; tracks: ManagedTrack[];
  createdAt: string; updatedAt: string;
};
export type HomepageConfig = {
  heroMode: "custom" | "release"; heroImage: string; heroEyebrow: string; heroHeadline: string;
  heroEmphasis: string; heroStrapline: string; heroButtonText: string; heroButtonHref: string;
  featuredArtist: string; featuredRelease: string; sections: HomepageSection[];
  hiddenSections: HomepageSection[]; updatedAt: string;
};
export type Announcement = { enabled: boolean; label: string; message: string; href: string; scope: "homepage" | "sitewide"; updatedAt: string };

export const BULLETINS_KEY = "penrec-studio-bulletins-v1";
export const MEDIA_KEY = "penrec-studio-media-v2";
export const RELEASES_KEY = "penrec-studio-releases-v1";
export const HOMEPAGE_KEY = "penrec-studio-homepage-v1";
export const ANNOUNCEMENT_KEY = "penrec-studio-announcement-v1";

export const defaultHomepage: HomepageConfig = {
  heroMode: "release", heroImage: "/images/covers/midnight-avenue-the-night-is-ours.jpg",
  heroEyebrow: "PENREC Music Group", heroHeadline: "Music without", heroEmphasis: "boundaries.",
  heroStrapline: "Discover. Experience. Remember.", heroButtonText: "Discover music", heroButtonHref: "#releases",
  featuredArtist: "midnight-avenue", featuredRelease: "midnight-avenue",
  sections: ["artists", "statement", "releases", "news", "player"], hiddenSections: [],
  updatedAt: "2026-07-25T12:00:00.000Z",
};
export const defaultAnnouncement: Announcement = { enabled: false, label: "New", message: "", href: "", scope: "homepage", updatedAt: "2026-07-25T12:00:00.000Z" };
export const starterBulletins: Bulletin[] = [{
  id: "welcome-to-penrec", headline: "Welcome to PENREC Music Group",
  summary: "A new independent home for distinctive artists, complete albums and music without boundaries.",
  body: "PENREC Music Group brings distinctive artists together under one creative home. Explore the catalogue, discover each artist's world and listen continuously through the PENREC player.",
  image: "/images/covers/midnight-avenue-the-night-is-ours.jpg", category: "Label News",
  publishDate: "2026-07-25", publishTime: "12:00", status: "published",
  createdAt: "2026-07-25T12:00:00.000Z", updatedAt: "2026-07-25T12:00:00.000Z",
}];
export function bulletinPublishDate(item: Bulletin) { return new Date(`${item.publishDate}T${item.publishTime || "00:00"}:00`); }
export function isBulletinLive(item: Bulletin, now = new Date()) { return item.status === "published" || (item.status === "scheduled" && bulletinPublishDate(item).getTime() <= now.getTime()); }
export function readStored<T>(key: string, fallback: T): T { if (typeof window === "undefined") return fallback; try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
export function writeStored<T>(key: string, value: T) { window.localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new CustomEvent("penrec-studio-update", { detail: { key } })); }
