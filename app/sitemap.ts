import type { MetadataRoute } from "next";
import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";

const base = "https://penrec.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const roster = [...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker];
  const staticPages = ["", "/artists", "/releases", "/about", "/catalogue"].map(path => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const artistPages = roster.flatMap(a => [
    { url: `${base}/artists/${a.slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/releases/${a.slug}`, changeFrequency: "weekly" as const, priority: 0.7 },
  ]);
  return [...staticPages, ...artistPages];
}
