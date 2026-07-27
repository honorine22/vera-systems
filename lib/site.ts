export const siteConfig = {
  name: "Vera Systems",
  legalName: "Vera Systems",
  alternateNames: ["Vera Systems Rwanda", "Vera Food Safety Systems"],
  shortName: "Vera",
  // Keep the public canonical origin deterministic. A stale deployment
  // environment variable previously caused every SEO URL to point at the
  // unrelated/invalid verasystems.com domain.
  url: "https://verasystems.rw",
  title: "Vera Systems Rwanda | Food Safety, HACCP & ISO 22000",
  description:
    "Vera Systems is a Kigali-based food safety company providing HACCP and ISO 22000 consultancy, training, audits, and real-time compliance technology across Rwanda and Africa.",
  locale: "en_RW",
  email: "info@verasystems.rw",
  telephone: "+250789657355",
  location: "Kigali, Rwanda",
  linkedIn: "https://www.linkedin.com/company/vera-systems/",
  keywords: [
    "Vera Systems Rwanda",
    "Vera Systems Kigali",
    "food safety Rwanda",
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
