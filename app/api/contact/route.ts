import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
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
    const phone = body.phone?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Contact database is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_KEY on the server.",
        },
        { status: 500 }
      );
    }

    const supabasePayload = {
      name,
      email,
      phone,
      message,
    };

    const backendResponse = await fetch(
      `${supabaseUrl}/rest/v1/contact_submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(supabasePayload),
        cache: "no-store",
      }
    );

    if (!backendResponse.ok) {
      const detail = await backendResponse.text().catch(() => "");
      console.error("Supabase contact submission failed.", detail);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit contact form.",
          detail,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully.",
    });
  } catch (error) {
    console.error("Contact form submission error.", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
