import { NextResponse } from "next/server";
import { getAccessToken, restSelect } from "@/lib/penrec-auth";
import { createR2DownloadUrl } from "@/lib/r2-download";

type Entitlement = {
  id: string;
  digital_file: string;
};

export const runtime = "nodejs";

function filenameFor(key: string) {
  const base = key.split("/").pop() || "PENREC-download.zip";
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getAccessToken();

  if (!token) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Download not found." }, { status: 404 });
  }

  const rows = await restSelect<Entitlement[]>(
    "digital_entitlements",
    `select=id,digital_file&id=eq.${encodeURIComponent(id)}&status=eq.active&limit=1`,
    token
  );

  const entitlement = rows[0];

  if (!entitlement) {
    return NextResponse.json({ error: "Download not found or no longer available." }, { status: 404 });
  }

  const url = createR2DownloadUrl(
    entitlement.digital_file,
    filenameFor(entitlement.digital_file)
  );

  return NextResponse.redirect(url, 303);
}
