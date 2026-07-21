import type { Metadata } from "next";
import PlatformPageClient from "../../components/pages/PlatformPageClient";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Live CCP monitoring, deviation tracking, supplier scorecards, and compliance reporting in one workspace.",
  alternates: { canonical: "/platform" },
  openGraph: { url: "/platform", title: "Food Safety Monitoring Platform | Vera Systems", description: "Live CCP monitoring, deviation tracking, supplier scorecards, and compliance reporting in one workspace." },
};

export default function PlatformPage() {
  return <PlatformPageClient />;
}
