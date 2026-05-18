import { NextResponse } from "next/server";
import type { Lead } from "../../../lib/leads";

type SupabaseContact = {
  id: number | string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  created_at: string | null;
};

function isAuthorized(request: Request) {
  const passcode = process.env.ADMIN_PASSCODE;

  if (!passcode) return true;

  const provided = request.headers.get("x-admin-passcode");
  return provided === passcode;
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return { supabaseUrl, serviceKey };
}

function supabaseHeaders(serviceKey: string) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };
}

function toLead(row: SupabaseContact): Lead {
  return {
    id: String(row.id),
    name: row.name || "",
    company: "",
    email: row.email || "",
    phone: row.phone || "",
    interest: "",
    message: row.message || "",
    source: "Supabase",
    submittedAt: row.created_at || new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin passcode." },
      { status: 401 }
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_KEY on the server.",
      },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/contact_submissions?select=id,name,email,phone,message,created_at&order=created_at.desc`,
    {
      headers: supabaseHeaders(config.serviceKey),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Supabase leads fetch failed.", detail);

    return NextResponse.json(
      { ok: false, message: "Could not load Supabase submissions." },
      { status: response.status }
    );
  }

  const rows = (await response.json()) as SupabaseContact[];
  return NextResponse.json({ ok: true, leads: rows.map(toLead) });
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin passcode." },
      { status: 401 }
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_KEY on the server.",
      },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/contact_submissions?id=not.is.null`,
    {
      method: "DELETE",
      headers: {
        ...supabaseHeaders(config.serviceKey),
        Prefer: "return=minimal",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Supabase leads clear failed.", detail);

    return NextResponse.json(
      { ok: false, message: "Could not clear Supabase submissions." },
      { status: response.status }
    );
  }

  return NextResponse.json({ ok: true });
}
