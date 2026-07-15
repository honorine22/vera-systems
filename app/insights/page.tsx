import type { Metadata } from "next";
import InsightsPageClient from "../../components/pages/InsightsPageClient";

export const metadata: Metadata = {
  title: "Articles — Vera Systems",
  description: "Scientific papers, technical articles, and case studies from food-safety practice — deviations, supplier records, CCP stability, and paper-log pitfalls.",
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
