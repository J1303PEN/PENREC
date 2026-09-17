import fs from "node:fs/promises";
import path from "node:path";

export type AudioSourceType = "lossless" | "mp3" | "unsupported";

export type AudioSourceInspection = {
  sourcePath: string;
  type: AudioSourceType;
  shouldEncode: boolean;
  reason: string;
};

function extension(file: string) {
  return path.extname(file).toLowerCase();
}

export function classifyAudioSource(
  sourcePath: string
): AudioSourceInspection {
  const ext = extension(sourcePath);

  if ([".wav", ".aif", ".aiff", ".flac"].includes(ext)) {
    return {
      sourcePath,
      type: "lossless",
      shouldEncode: true,
      reason: "Lossless source can be encoded to the customer 320 kbps MP3.",
    };
  }

  if (ext === ".mp3") {
    return {
      sourcePath,
      type: "mp3",
      shouldEncode: false,
      reason:
        "Existing MP3 will be inspected for bitrate before any decision to re-encode.",
    };
  }

  return {
    sourcePath,
    type: "unsupported",
    shouldEncode: false,
    reason: "Unsupported audio format.",
  };
}

export async function inspectAudioSource(sourcePath: string) {
  const stat = await fs.stat(sourcePath);

  if (!stat.isFile()) {
    throw new Error(`Audio source is not a file: ${sourcePath}`);
  }

  return classifyAudioSource(sourcePath);
}
