import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getSupabaseAuthConfig,
  isAdminEmail,
} from "../../../../lib/adminAuth";

type ConfirmPayload = {
  accessToken?: string;
  expiresIn?: number;
};

type SupabaseUserResponse = {
  id?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const config = getSupabaseAuthConfig();

    if (!config) {
      return NextResponse.json(
        {
          ok: false,
          confirmed: false,
          message:
            "Email confirmation is not configured. Add SUPABASE_ANON_KEY or SUPABASE_SERVICE_KEY on the server.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ConfirmPayload;
    const accessToken = body.accessToken || "";

    if (!accessToken) {
      return NextResponse.json(
        { ok: false, confirmed: false, message: "Missing confirmation token." },
        { status: 400 }
      );
    }

    const userResponse = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          confirmed: false,
          message: "This confirmation link is invalid or expired.",
        },
        { status: 401 }
      );
    }

    const user = (await userResponse.json()) as SupabaseUserResponse;

    if (!isAdminEmail(user.email)) {
      return NextResponse.json(
        {
          ok: false,
          confirmed: true,
          message:
            "Email confirmed, but this account is not allowed to access the admin dashboard.",
        },
        { status: 403 }
      );
    }

    const response = NextResponse.json({
      ok: true,
      confirmed: true,
      message: "Email confirmed. Your dashboard access is ready.",
      user: { id: user.id, email: user.email },
    });

    response.cookies.set(ADMIN_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: body.expiresIn || 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin email confirmation failed.", error);

    return NextResponse.json(
      { ok: false, confirmed: false, message: "Could not confirm this email." },
      { status: 500 }
    );
  }
}
