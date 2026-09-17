import fs from "node:fs/promises";
import path from "node:path";

import type { DigitalManifest } from "@/lib/digital/manifest";

export type DigitalPackageAudit = {
  valid: boolean;
  expectedTracks: number;
  foundTracks: number;
  missingTracks: string[];
  unexpectedAudio: string[];
  artworkPresent: boolean;
  errors: string[];
};

export async function auditDigitalPackage(
  manifest: DigitalManifest,
  packageDirectory: string
): Promise<DigitalPackageAudit> {
  const errors: string[] = [];
  const expected = new Set(manifest.expectedFilenames);

  let files: string[] = [];

  try {
    files = await fs.readdir(packageDirectory);
  } catch {
    return {
      valid: false,
      expectedTracks: manifest.tracks.length,
      foundTracks: 0,
      missingTracks: manifest.expectedFilenames,
      unexpectedAudio: [],
      artworkPresent: false,
      errors: ["Package directory does not exist."],
    };
  }

  const audioFiles = files.filter((file) =>
    /\.mp3$/i.test(file)
  );

  const missingTracks = manifest.expectedFilenames.filter(
    (file) => !files.includes(file)
  );

  const unexpectedAudio = audioFiles.filter(
    (file) => !expected.has(file)
  );

  const artworkPresent = files.some((file) =>
    new RegExp(
      `^${manifest.catalogue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_cover\\.(jpg|jpeg|png)$`,
      "i"
    ).test(file)
  );

  if (missingTracks.length > 0) {
    errors.push(`Missing ${missingTracks.length} expected track(s).`);
  }

  if (unexpectedAudio.length > 0) {
    errors.push(
      `Found ${unexpectedAudio.length} unexpected audio file(s).`
    );
  }

  if (!artworkPresent) {
    errors.push("Release artwork is missing.");
  }

  if (audioFiles.length !== manifest.tracks.length) {
    errors.push(
      `Expected ${manifest.tracks.length} MP3 files but found ${audioFiles.length}.`
    );
  }

  return {
    valid: errors.length === 0,
    expectedTracks: manifest.tracks.length,
    foundTracks: audioFiles.length,
    missingTracks,
    unexpectedAudio,
    artworkPresent,
    errors,
  };
}
