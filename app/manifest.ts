import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#061225",
    icons: [{ src: "/logos/vera-logo-blue-transparent.png", sizes: "any", type: "image/png" }],
  };
}
