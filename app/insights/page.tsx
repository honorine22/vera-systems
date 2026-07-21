import type { Metadata } from "next";
import InsightsPageClient from "../../components/pages/InsightsPageClient";

export const metadata: Metadata = {
  title: "Insights & Articles",
  description: "Scientific papers, technical articles, and case studies from food-safety practice — deviations, supplier records, CCP stability, and paper-log pitfalls.",
  alternates: { canonical: "/insights" },
  openGraph: { url: "/insights", title: "Food Safety Insights & Articles | Vera Systems", description: "Technical articles and case studies drawn from real food-safety operations." },
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
