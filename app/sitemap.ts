import type { MetadataRoute } from "next";
import { serviceSlugs } from "../components/services/slugs";
import { absoluteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/platform", "/why", "/insights", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = pages.map((path, index) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: path === "/insights" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/services" ? 0.9 : 0.8,
  }));
  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries];
}
