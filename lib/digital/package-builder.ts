import fs from "node:fs/promises";
import path from "node:path";

import type { DigitalManifest } from "@/lib/digital/manifest";
import { matchMasters } from "@/lib/digital/master-matcher";

export type DigitalPackageBuildResult = {
  catalogue: string;
  outputDirectory: string;
  packageDirectory: string;
  complete: boolean;
  files: string[];
  missing: string[];
};

export async function prepareDigitalPackage(
  manifest: DigitalManifest,
  masterRoot: string,
  outputRoot: string
): Promise<DigitalPackageBuildResult> {
  const report = await matchMasters(manifest, masterRoot);

  const packageDirectory = path.join(
    outputRoot,
    `${manifest.catalogue}_${manifest.slug}`
  );

  await fs.mkdir(packageDirectory, { recursive: true });

  const missing = report.missing.map(
    (track) => `${String(track.trackNumber).padStart(2, "0")}_${track.title}`
  );

  if (!report.complete) {
    return {
      catalogue: manifest.catalogue,
      outputDirectory: outputRoot,
      packageDirectory,
      complete: false,
      files: [],
      missing,
    };
  }

  const files: string[] = [];

  for (const track of report.tracks) {
    if (!track.sourcePath) continue;

    const outputName = manifest.expectedFilenames[track.trackNumber - 1];
    const destination = path.join(packageDirectory, outputName);

    await fs.copyFile(track.sourcePath, destination);
    files.push(destination);
  }

  const artworkDestination = path.join(
    packageDirectory,
    `${manifest.catalogue}_cover.jpg`
  );

  return {
    catalogue: manifest.catalogue,
    outputDirectory: outputRoot,
    packageDirectory,
    complete: true,
    files,
    missing: [],
  };
}
