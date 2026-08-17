import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
};

const sha256 = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const hmac = (key: Buffer | string, value: string) => createHmac("sha256", key).update(value).digest();

async function putR2(key: string, body: Buffer, contentType: string) {
  const accessKey = required("R2_ACCESS_KEY_ID");
  const secretKey = required("R2_SECRET_ACCESS_KEY");
  const endpoint = required("R2_ENDPOINT").replace(/\/$/, "");
  const bucket = required("R2_BUCKET_NAME");
  const url = new URL(`${endpoint}/${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`);
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const date = amzDate.slice(0, 8);
  const payloadHash = sha256(body);
  const canonicalHeaders = `content-type:${contentType}\nhost:${url.host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = `PUT\n${url.pathname}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const scope = `${date}/auto/s3/aws4_request`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n${sha256(canonicalRequest)}`;
  const kDate = hmac(`AWS4${secretKey}`, date);
  const kRegion = hmac(kDate, "auto");
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning).update(stringToSign).digest("hex");
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const uploadBody = new Uint8Array(body);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      authorization,
    },
    body: uploadBody,
  });
  if (!res.ok) throw new Error(`R2 upload failed ${res.status}: ${await res.text()}`);
}

export async function POST(request: Request) {
  try {
    const expected = required("MIGRATION_SECRET");
    const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
    const expectedBuffer = Buffer.from(expected);
    const suppliedBuffer = Buffer.from(supplied);
    if (expectedBuffer.length !== suppliedBuffer.length || !timingSafeEqual(expectedBuffer, suppliedBuffer)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const listing = await fetch("https://api.github.com/repos/J1303PEN/PENREC/contents/public/audio?ref=main", {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "PENREC-R2-Migration" },
      cache: "no-store",
    });
    if (!listing.ok) throw new Error(`GitHub listing failed ${listing.status}`);
    const files = (await listing.json()) as Array<{ name: string; download_url: string | null; type: string; size: number }>;
    const audio = files.filter((f) => f.type === "file" && f.download_url && /\.(mp3|m4a|wav|ogg)$/i.test(f.name));

    const url = new URL(request.url);
    const namesParam = url.searchParams.get("names");
    let batch: typeof audio;
    let offset = 0;

    if (namesParam) {
      const names = namesParam.split(",").map((name) => name.trim()).filter(Boolean);
      if (names.length > 20) return NextResponse.json({ error: "Maximum 20 filenames per request" }, { status: 400 });
      const byName = new Map(audio.map((file) => [file.name, file]));
      const missing = names.filter((name) => !byName.has(name));
      if (missing.length) return NextResponse.json({ error: "Requested files not found", missing }, { status: 404 });
      batch = names.map((name) => byName.get(name)!);
    } else {
      const requested = Number(url.searchParams.get("limit") || "5");
      const limit = Math.max(1, Math.min(requested, 20));
      offset = Math.max(0, Number(url.searchParams.get("offset") || "0"));
      batch = audio.slice(offset, offset + limit);
    }

    const migrated: Array<{ name: string; size: number; publicUrl: string }> = [];
    for (const file of batch) {
      const source = await fetch(file.download_url!, { cache: "no-store" });
      if (!source.ok) throw new Error(`Download failed for ${file.name}: ${source.status}`);
      const body = Buffer.from(await source.arrayBuffer());
      await putR2(file.name, body, source.headers.get("content-type") || "audio/mpeg");
      migrated.push({
        name: file.name,
        size: body.length,
        publicUrl: `${required("R2_PUBLIC_URL").replace(/\/$/, "")}/${encodeURIComponent(file.name)}`,
      });
    }

    return NextResponse.json({
      total: audio.length,
      mode: namesParam ? "names" : "offset",
      offset: namesParam ? undefined : offset,
      migrated: migrated.length,
      nextOffset: namesParam ? undefined : offset + migrated.length,
      files: migrated,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Migration failed" }, { status: 500 });
  }
}
