export const siteConfig = {
  name: "Vera Systems",
  shortName: "Vera",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://verasystems.com").replace(/\/$/, ""),
  title: "Vera Systems — Precision Food Safety, Powered by Data",
  description:
    "Food safety consultancy, training, communication, and real-time digital intelligence for HACCP, ISO 22000, CCP monitoring, and audit readiness across Africa.",
  locale: "en_RW",
  email: "info@verasystems.com",
  location: "Kigali, Rwanda",
  keywords: [
    "food safety consultancy",
    "HACCP Rwanda",
    "ISO 22000 Africa",
    "CCP monitoring",
    "food safety audit",
    "food safety training",
    "compliance software",
    "Vera Systems",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
