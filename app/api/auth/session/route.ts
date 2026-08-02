import { NextResponse } from "next/server";
import { getUser } from "@/lib/penrec-auth";

export async function GET() {
  const user = await getUser();
  return NextResponse.json({ authenticated: Boolean(user) });
}
