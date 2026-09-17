import "server-only";

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error("Server-side Supabase access is not configured.");
  }

  return { url, key };
}

export async function adminRest<T>(
  table: string,
  query = "",
  init: RequestInit = {}
): Promise<T> {
  const { url, key } = config();
  const suffix = query ? `?${query}` : "";

  const response = await fetch(`${url}/rest/v1/${table}${suffix}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error_description ||
      data?.hint ||
      `Privileged database request failed (${response.status}).`;

    throw new Error(message);
  }

  return data as T;
}
