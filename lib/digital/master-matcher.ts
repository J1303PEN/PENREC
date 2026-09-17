import fs from "node:fs/promises";
import path from "node:path";

import type { DigitalManifest } from "@/lib/digital/manifest";

export type MasterMatch = {
  trackNumber: number;
  title: string;
  expectedFilename: string;
  sourcePath: string | null;
  status: "found" | "missing";
};

export type MasterMatchReport = {
  catalogue: string;
  masterRoot: string;
  releaseDirectory: string;
  tracks: MasterMatch[];
  missing: MasterMatch[];
  complete: boolean;
};

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export async function matchMasters(
  manifest: DigitalManifest,
  masterRoot: string
): Promise<MasterMatchReport> {
  const releaseDirectory = path.join(masterRoot, manifest.catalogue);

  let files: string[] = [];

  try {
    files = await fs.readdir(releaseDirectory);
  } catch {
    return {
      catalogue: manifest.catalogue,
      masterRoot,
      releaseDirectory,
      tracks: manifest.tracks.map((track) => ({
        trackNumber: track.number,
        title: track.title,
        expectedFilename: manifest.expectedFilenames[track.number - 1],
        sourcePath: null,
        status: "missing",
      })),
      missing: manifest.tracks.map((track) => ({
        trackNumber: track.number,
        title: track.title,
        expectedFilename: manifest.expectedFilenames[track.number - 1],
        sourcePath: null,
        status: "missing",
      })),
      complete: false,
    };
  }

  const audioFiles = files.filter((file) =>
    /\.(wav|aiff?|flac|mp3)$/i.test(file)
  );

  const tracks = manifest.tracks.map((track) => {
    const expectedFilename = manifest.expectedFilenames[track.number - 1];

    const expectedNormalised = normalise(
      expectedFilename.replace(/\.[^.]+$/, "")
    );

    const match = audioFiles.find((file) => {
      const candidate = normalise(file.replace(/\.[^.]+$/, ""));
      return (
        candidate === expectedNormalised ||
        candidate.includes(
          normalise(`${track.number}_${track.title}`)
        )
      );
    });

    return {
      trackNumber: track.number,
      title: track.title,
      expectedFilename,
      sourcePath: match ? path.join(releaseDirectory, match) : null,
      status: match ? "found" : "missing",
    } satisfies MasterMatch;
  });

  const missing = tracks.filter((track) => track.status === "missing");

  return {
    catalogue: manifest.catalogue,
    masterRoot,
    releaseDirectory,
    tracks,
    missing,
    complete: missing.length === 0,
  };
}
