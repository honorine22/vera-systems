import type { MetadataRoute } from "next";
import { serviceSlugs } from "../components/services/slugs";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Update this when public page content changes. An honest last-modified date
  // is more useful to crawlers than resetting it on every deployment.
  const lastModified = new Date("2026-09-28");
  const pages = ["", "/about", "/services", "/platform", "/why", "/insights", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = pages.map((path, index) => ({
    url: absoluteUrl(path || "/"),
    lastModified,
    changeFrequency: path === "/insights" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/services" ? 0.9 : 0.8,
  }));
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries];
}
