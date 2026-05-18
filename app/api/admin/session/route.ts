import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getSupabaseAuthConfig,
  isAdminEmail,
  requireAdminSession,
} from "../../../../lib/adminAuth";

type LoginPayload = {
  email?: string;
  password?: string;
};

type SupabaseLoginResponse = {
  access_token?: string;
  expires_in?: number;
  user?: {
    id?: string;
    email?: string;
  };
  error_description?: string;
  msg?: string;
};

export async function GET(request: Request) {
  const session = await requireAdminSession(request);

  if (!session.ok) {
    return NextResponse.json(
      { ok: false, message: session.message },
      { status: session.status }
    );
  }

  return NextResponse.json({
    ok: true,
    user: { id: session.id, email: session.email },
  });
}

export async function POST(request: Request) {
  try {
    const config = getSupabaseAuthConfig();

    if (!config) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Admin auth is not configured. Add SUPABASE_ANON_KEY or SUPABASE_SERVICE_KEY, plus ADMIN_EMAILS, on the server.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as LoginPayload;
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const authResponse = await fetch(
      `${config.supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: config.anonKey,
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      }
    );

    const authData = (await authResponse.json().catch(() => ({}))) as SupabaseLoginResponse;

    if (!authResponse.ok || !authData.access_token || !authData.user?.email) {
      return NextResponse.json(
        {
          ok: false,
          message:
            authData.error_description ||
            authData.msg ||
            "Could not log in with those credentials.",
        },
        { status: authResponse.status || 401 }
      );
    }

    if (!isAdminEmail(authData.user.email)) {
      return NextResponse.json(
        {
          ok: false,
          message: "This account is not allowed to access the admin dashboard.",
        },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    });

    response.cookies.set(ADMIN_COOKIE, authData.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: authData.expires_in || 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed.", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong while logging in." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
