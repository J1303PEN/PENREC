import type { Artist } from "@/data/catalog";
import {
  buildDigitalPackageSpec,
  type DigitalPackageSpec,
} from "@/lib/digital/package-spec";

export type DigitalManifest = DigitalPackageSpec & {
  expectedTrackCount: number;
  expectedFilenames: string[];
};

function safeFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’"]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function buildDigitalManifest(artist: Artist): DigitalManifest {
  const spec = buildDigitalPackageSpec(artist);

  return {
    ...spec,
    expectedTrackCount: spec.tracks.length,
    expectedFilenames: spec.tracks.map(
      (track) =>
        `${String(track.number).padStart(2, "0")}_${safeFilename(track.title)}.mp3`
    ),
  };
}
