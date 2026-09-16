import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function copyPackageArtwork(
  source: string,
  packageDirectory: string,
  catalogue: string
) {
  const extension = path.extname(source).toLowerCase() || ".jpg";
  const destination = path.join(
    packageDirectory,
    `${catalogue}_cover${extension}`
  );

  await fs.copyFile(source, destination);
  return destination;
}

export async function createDigitalZip(
  packageDirectory: string,
  outputDirectory: string,
  catalogue: string
) {
  await fs.mkdir(outputDirectory, { recursive: true });

  const zipPath = path.join(
    outputDirectory,
    `${catalogue}_digital.zip`
  );

  await execFileAsync("ditto", [
    "-c",
    "-k",
    "--sequesterRsrc",
    "--keepParent",
    packageDirectory,
    zipPath,
  ]);

  return zipPath;
}
