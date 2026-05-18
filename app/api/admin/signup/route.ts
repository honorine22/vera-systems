import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getSupabaseAuthConfig,
  isAdminEmail,
} from "../../../../lib/adminAuth";

type SignupPayload = {
  email?: string;
  password?: string;
};

type SupabaseSignupResponse = {
  access_token?: string;
  expires_in?: number;
  user?: {
    id?: string;
    email?: string;
  };
  error_description?: string;
  msg?: string;
};

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

    const body = (await request.json()) as SignupPayload;
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!isAdminEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Only emails listed in ADMIN_EMAILS can create admin access.",
        },
        { status: 403 }
      );
    }

    const authResponse = await fetch(`${config.supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: config.anonKey,
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const authData = (await authResponse.json().catch(() => ({}))) as SupabaseSignupResponse;

    if (!authResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            authData.error_description ||
            authData.msg ||
            "Could not create this admin account.",
        },
        { status: authResponse.status || 400 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      message: authData.access_token
        ? "Admin account created."
        : "Admin account created. Check your email to confirm the account, then log in.",
      user: authData.user
        ? { id: authData.user.id, email: authData.user.email }
        : undefined,
    });

    if (authData.access_token) {
      response.cookies.set(ADMIN_COOKIE, authData.access_token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: authData.expires_in || 60 * 60,
      });
    }

    return response;
  } catch (error) {
    console.error("Admin signup failed.", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong while creating the account." },
      { status: 500 }
    );
  }
}
