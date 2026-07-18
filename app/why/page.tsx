import type { Metadata } from "next";
import WhyPageClient from "../../components/pages/WhyPageClient";

export const metadata: Metadata = {
  title: "Why Vera — Vera Systems",
  description: "Why food businesses in East Africa choose Vera Systems for compliance that works on the floor, not just on paper.",
};

export default function WhyPage() {
  return <WhyPageClient />;
}
