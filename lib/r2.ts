import "server-only";

function required(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

export function r2Config() {
  return {
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
    endpoint: required("R2_ENDPOINT").replace(/\/$/, ""),
    bucket: required("R2_BUCKET_NAME"),
    publicUrl: required("R2_PUBLIC_URL").replace(/\/$/, ""),
  };
}
