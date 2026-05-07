# Vera Systems Next.js + Tailwind Website

A redesigned Vera Systems website using Next.js App Router, TailwindCSS, brand-aligned dark/light mode, sticky stacked scroll sections, animated dashboard UI, and a backend-ready contact form.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Contact form backend integration

The frontend submits to `/api/contact`. That API route validates the form and forwards it to your backend when you add this to `.env.local`:

```bash
CONTACT_BACKEND_URL=https://your-backend.com/api/contact
CONTACT_BACKEND_TOKEN=optional-token
```

If `CONTACT_BACKEND_URL` is empty, the route returns success locally and logs the payload so you can test the UI before the backend is ready.

## Key files

- `app/page.tsx` — full landing page and dashboard sections
- `app/api/contact/route.ts` — backend proxy for contact form
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
