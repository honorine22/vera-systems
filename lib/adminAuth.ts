export const ADMIN_COOKIE = "vera_admin_access_token";

type SupabaseUserResponse = {
  id?: string;
  email?: string;
};

export type AdminSession =
  | { ok: true; email: string; id: string }
  | { ok: false; message: string; status: number };

export function getSupabaseAuthConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !anonKey) {
    return null;
  }

  return { supabaseUrl, anonKey };
}

export function getAllowedAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;

  return getAllowedAdminEmails().includes(email.toLowerCase());
}

export function getCookieValue(request: Request, name: string) {
  const cookie = request.headers.get("cookie") || "";
  const cookies = cookie.split(";").map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export async function requireAdminSession(request: Request): Promise<AdminSession> {
  const config = getSupabaseAuthConfig();

  if (!config) {
    return {
      ok: false,
      message:
        "Admin auth is not configured. Add SUPABASE_ANON_KEY or SUPABASE_SERVICE_KEY, plus ADMIN_EMAILS, on the server.",
      status: 500,
    };
  }

  if (getAllowedAdminEmails().length === 0) {
    return {
      ok: false,
      message: "No admin email is configured. Add ADMIN_EMAILS on the server.",
      status: 500,
    };
  }

  const accessToken = getCookieValue(request, ADMIN_COOKIE);

  if (!accessToken) {
    return {
      ok: false,
      message: "Please log in to view the admin dashboard.",
      status: 401,
    };
  }

  const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Your admin session has expired. Please log in again.",
      status: 401,
    };
  }

  const user = (await response.json()) as SupabaseUserResponse;

  if (!isAdminEmail(user.email)) {
    return {
      ok: false,
      message: "This account is not allowed to access the admin dashboard.",
      status: 403,
    };
  }

  return {
    ok: true,
    email: user.email || "",
    id: user.id || "",
  };
}
