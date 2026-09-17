import { createHash, createHmac } from "node:crypto";

import { r2Config } from "@/lib/r2";

function sha256(value: string | Buffer) {
  return createHash("sha256").update(value).digest("hex");
}

function hmac(key: Buffer | string, value: string) {
  return createHmac("sha256", key).update(value).digest();
}

export async function uploadPrivateR2Object(
  key: string,
  body: Buffer,
  contentType: string
) {
  const config = r2Config();

  const url = new URL(
    `${config.endpoint}/${config.bucket}/${key
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`
  );

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const date = amzDate.slice(0, 8);
  const payloadHash = sha256(body);

  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${url.host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders =
    "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest =
    `PUT\n${url.pathname}\n\n${canonicalHeaders}\n` +
    `${signedHeaders}\n${payloadHash}`;

  const scope = `${date}/auto/s3/aws4_request`;

  const stringToSign =
    `AWS4-HMAC-SHA256\n${amzDate}\n${scope}\n` +
    sha256(canonicalRequest);

  const kDate = hmac(`AWS4${config.secretAccessKey}`, date);
  const kRegion = hmac(kDate, "auto");
  const kService = hmac(kRegion, "s3");
  const kSigning = hmac(kService, "aws4_request");

  const signature = createHmac("sha256", kSigning)
    .update(stringToSign)
    .digest("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${scope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      authorization,
    },
    body: new Uint8Array(body),
  });

  if (!response.ok) {
    throw new Error(
      `R2 upload failed ${response.status}: ${await response.text()}`
    );
  }

  return {
    key,
    contentType,
    size: body.length,
  };
}
