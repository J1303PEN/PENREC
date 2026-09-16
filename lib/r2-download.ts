import "server-only";

import { createHash, createHmac } from "node:crypto";
import { r2Config } from "@/lib/r2";

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function encode(value: string) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

export function createR2DownloadUrl(key: string, filename: string, expiresIn = 300) {
  if (!key || key.startsWith("/") || key.includes("..")) {
    throw new Error("Invalid R2 object key.");
  }

  const config = r2Config();
  const endpoint = new URL(config.endpoint);
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const date = amzDate.slice(0, 8);
  const scope = `${date}/auto/s3/aws4_request`;
  const credential = `${config.accessKeyId}/${scope}`;
  const canonicalUri = `/${config.bucket}/${key.split("/").map(encode).join("/")}`;
  const disposition = `attachment; filename="${filename.replace(/["\\\r\n]/g, "_")}"`;

  const query: Record<string, string> = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": credential,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expiresIn),
    "X-Amz-SignedHeaders": "host",
    "response-content-disposition": disposition,
  };

  const canonicalQuery = Object.entries(query)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => `${encode(name)}=${encode(value)}`)
    .join("&");

  const canonicalHeaders = `host:${endpoint.host}\n`;
  const canonicalRequest =
    `GET\n${canonicalUri}\n${canonicalQuery}\n${canonicalHeaders}\nhost\nUNSIGNED-PAYLOAD`;
  const stringToSign =
    `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n${sha256(canonicalRequest)}`;

  const kDate = hmac(`AWS4${config.secretAccessKey}`, date);
  const kRegion = hmac(kDate, "auto");
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning)
    .update(stringToSign)
    .digest("hex");

  return `${endpoint.origin}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}
