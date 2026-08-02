import { cookies } from "next/headers";

const ACCESS_COOKIE = "penrec_access_token";
const REFRESH_COOKIE = "penrec_refresh_token";

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key || url.includes("YOUR-PROJECT") || key.includes("YOUR_SUPABASE")) {
    throw new Error("Supabase is not configured. Check .env.local and restart PENREC11.");
  }
  return { url: url.replace(/\/$/, ""), key };
}

export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: { display_name?: string };
};

type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user: AuthUser;
};

type SupabaseError = {
  message?: string;
  msg?: string;
  error?: string;
  error_description?: string;
  code?: string;
};

function errorMessage(data: SupabaseError, fallback: string) {
  return data.message || data.error_description || data.msg || data.error || fallback;
}

async function request(path: string, init: RequestInit = {}) {
  const { url, key } = config();
  try {
    return await fetch(`${url}${path}`, {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Network request failed";
    throw new Error(`Could not reach Supabase: ${detail}. Check the Project URL in .env.local.`);
  }
}

export async function setSession(session: AuthSession) {
  const store = await cookies();
  const secure = process.env.NODE_ENV === "production";
  store.set(ACCESS_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: session.expires_in || 3600,
  });
  store.set(REFRESH_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function signIn(email: string, password: string) {
  const response = await request("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json().catch(() => ({}))) as AuthSession & SupabaseError;
  if (!response.ok) throw new Error(errorMessage(data, "Unable to sign in."));
  await setSession(data);
  return data;
}

export async function signUp(email: string, password: string, displayName: string, redirectTo: string) {
  const path = `/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`;
  const response = await request(path, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      data: { display_name: displayName },
    }),
  });
  const data = (await response.json().catch(() => ({}))) as Partial<AuthSession> & SupabaseError;
  if (!response.ok) throw new Error(errorMessage(data, "Unable to create account."));
  if (data.access_token && data.refresh_token && data.user) {
    await setSession(data as AuthSession);
  }
  return data;
}

export async function sendRecovery(email: string, redirectTo: string) {
  const path = `/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`;
  const response = await request(path, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = (await response.json().catch(() => ({}))) as SupabaseError;
  if (!response.ok) throw new Error(errorMessage(data, "Unable to send reset email."));
}

export async function updatePasswordWithToken(accessToken: string, password: string) {
  const response = await request("/auth/v1/user", {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ password }),
  });
  const data = (await response.json().catch(() => ({}))) as SupabaseError;
  if (!response.ok) throw new Error(errorMessage(data, "Unable to update password."));
  return data;
}

async function refreshSession(refreshToken: string) {
  const response = await request("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const data = (await response.json().catch(() => ({}))) as AuthSession;
  if (!response.ok) return null;
  await setSession(data);
  return data;
}

export async function getUser(): Promise<AuthUser | null> {
  const store = await cookies();
  let access = store.get(ACCESS_COOKIE)?.value;
  const refresh = store.get(REFRESH_COOKIE)?.value;
  if (!access) return null;

  let response = await request("/auth/v1/user", {
    headers: { Authorization: `Bearer ${access}` },
  });

  if (!response.ok && refresh) {
    const session = await refreshSession(refresh);
    if (!session) return null;
    access = session.access_token;
    response = await request("/auth/v1/user", {
      headers: { Authorization: `Bearer ${access}` },
    });
  }

  if (!response.ok) return null;
  return response.json();
}

export async function restSelect<T>(table: string, query: string, accessToken: string): Promise<T> {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Database request failed (${response.status}).`);
  return response.json();
}

export async function restRequest<T>(table: string, init: RequestInit, accessToken: string): Promise<T> {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${table}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.message || data?.error_description || data?.hint || `Database request failed (${response.status}).`;
    throw new Error(message);
  }
  return data as T;
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value || null;
}
