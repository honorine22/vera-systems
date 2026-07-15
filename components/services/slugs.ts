// Server-safe slug list — deliberately has NO import from @phosphor-icons/react.
// meta.ts imports icon components at module scope, which crashes when pulled into
// the RSC/server bundle (React.createContext is not available in that context for
// the icon package's internal IconContext setup). Server Components (like
// app/services/[slug]/page.tsx for generateStaticParams/generateMetadata) should
// import from here instead of from meta.ts.
//
// Order here MUST match the order of `services.items` in components/home/translations.ts
// (index 0 = Vera Consulting, 1 = Vera Data, 2 = Vera Academy, 3 = Vera Media).
export type ServiceSlug = "vera-consulting" | "vera-data" | "vera-academy" | "vera-media";

export const serviceSlugs: ServiceSlug[] = [
  "vera-consulting",
  "vera-data",
  "vera-academy",
  "vera-media",
];
