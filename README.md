# Vera Systems Next.js + Tailwind Website

A redesigned Vera Systems website using Next.js App Router, TailwindCSS, brand-aligned dark/light mode, sticky stacked scroll sections, animated dashboard UI, and a backend-ready contact form.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Supabase contact form integration

The frontend submits only to `/api/contact`. That server route validates the submission, reads server-side environment variables, and sends the data to Supabase through the REST API.

Create a `.env.local` file with:

```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=sb_secret_your_key_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
ADMIN_EMAILS=admin@verasystems.com
```

The service key is used only by server routes. Do not expose it in browser code and do not prefix it with `VITE_` or `NEXT_PUBLIC_`. `ADMIN_EMAILS` is a comma-separated allowlist for the dashboard.

In Supabase, create the contact table from the SQL editor:

```sql
create table contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default now()
);
```

The API route sends this payload to `/rest/v1/contact_submissions`:

`name`, `email`, `phone`, and `message`.

## Admin dashboard auth

The dashboard at `/admin` uses Supabase Auth for login/signup. A user can create an account, but `/api/leads` returns form data only when the logged-in email is listed in `ADMIN_EMAILS`.

In Supabase:

1. Go to Authentication and keep Email provider enabled.
2. Create or sign up the admin user with the same email listed in `ADMIN_EMAILS`.
3. Copy the project anon key into `SUPABASE_ANON_KEY`. The server can fall back to `SUPABASE_SERVICE_KEY`, but the anon key is cleaner for Supabase Auth calls.
4. Keep `SUPABASE_SERVICE_KEY` only in server/deployment environment variables.

After signup email confirmation, Supabase can redirect back to the site with a URL hash. The homepage reads that hash, confirms the session server-side, removes the hash from the URL, and shows an email-confirmed message with a dashboard link.

## Key files

- `app/page.tsx` — full landing page and dashboard sections
- `app/admin/page.tsx` — admin inbox for Supabase submissions
- `app/api/contact/route.ts` — validates and forwards contact form submissions to Supabase
- `app/api/admin/session/route.ts` — Supabase Auth login/logout/session endpoint
- `app/api/admin/signup/route.ts` — admin signup endpoint with email allowlist
- `app/api/admin/confirm/route.ts` — handles Supabase signup confirmation redirects
- `app/api/leads/route.ts` — admin API for reading and clearing Supabase submissions
- `lib/adminAuth.ts` — server-side admin session and email allowlist checks
- `app/layout.tsx` — font setup and metadata
- `app/globals.css` — reveal animation, grid background, chart animation, dark mode helpers
- `tailwind.config.ts` — Vera Systems colors and animation tokens
- `public/logos/` — logo assets copied from your uploaded files

## Sections included

- Navigation
- Hero
- About
- Stacked scroll experience
- Insights & Intelligence
- Service Pillars
- Platform Demo with dashboard tabs
- Why Vera Systems
- Client categories
- Contact form
- Footer
