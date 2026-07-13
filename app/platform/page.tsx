import type { Metadata } from "next";
import PlatformPageClient from "../../components/pages/PlatformPageClient";

export const metadata: Metadata = {
  title: "Platform — Vera Systems",
  description:
    "Live CCP monitoring, deviation tracking, supplier scorecards, and compliance reporting in one workspace.",
};

export default function PlatformPage() {
  return <PlatformPageClient />;
}
