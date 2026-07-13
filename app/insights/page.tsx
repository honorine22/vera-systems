import type { Metadata } from "next";
import InsightsPageClient from "../../components/pages/InsightsPageClient";

export const metadata: Metadata = {
  title: "Insights — Vera Systems",
  description: "Notes from food operations — deviations, supplier records, CCP stability, and paper-log pitfalls.",
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
