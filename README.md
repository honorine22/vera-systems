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
```

The service key is used only by the server route. Do not expose it in browser code and do not prefix it with `VITE_` or `NEXT_PUBLIC_`.

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

## Key files

- `app/page.tsx` — full landing page and dashboard sections
- `app/admin/page.tsx` — admin inbox for Supabase submissions
- `app/api/contact/route.ts` — validates and forwards contact form submissions to Supabase
- `app/api/leads/route.ts` — admin API for reading and clearing Supabase submissions
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
