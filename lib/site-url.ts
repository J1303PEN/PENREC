export function publicOrigin(headerList: Headers) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured && !configured.includes("localhost")) return configured.replace(/\/$/, "");

  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  if (host) {
    const protocol = headerList.get("x-forwarded-proto") || "https";
    return `${protocol}://${host}`;
  }

  return "https://www.penrec.co.uk";
}
