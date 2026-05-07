import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const company = body.company?.trim() || "";
    const service = body.service?.trim() || "";
    const message = body.message?.trim() || "";
    const phone = body.phone?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      phone,
      company,
      service,
      message,
      source: "vera-systems-website",
      submittedAt: new Date().toISOString(),
    };

    const backendUrl = process.env.CONTACT_BACKEND_URL;

    // Development fallback: lets the UI work before your backend endpoint is live.
    // When CONTACT_BACKEND_URL is added to .env.local, this route forwards the lead to your backend.
    if (!backendUrl) {
      console.log("Vera Systems contact lead", payload);
      return NextResponse.json({
        ok: true,
        mock: true,
        message: "Message received locally. Add CONTACT_BACKEND_URL to forward to your backend.",
      });
    }

    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_BACKEND_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_BACKEND_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      const detail = await backendResponse.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          message: "The backend could not save this message.",
          detail,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while sending the message.",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
