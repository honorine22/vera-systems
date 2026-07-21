import type { Metadata } from "next";
import WhyPageClient from "../../components/pages/WhyPageClient";

export const metadata: Metadata = {
  title: "Why Vera",
  description: "Why food businesses in East Africa choose Vera Systems for compliance that works on the floor, not just on paper.",
  alternates: { canonical: "/why" },
  openGraph: { url: "/why", title: "Why Vera Systems", description: "Standards-based food safety built for daily operations, live risk visibility, and measurable compliance." },
};

export default function WhyPage() {
  return <WhyPageClient />;
}
