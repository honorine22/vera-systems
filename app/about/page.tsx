import type { Metadata } from "next";
import AboutPageClient from "../../components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vera Systems is a food science, data science, and audit team building food safety systems on real-time data for East Africa.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Vera Systems", description: "Meet the food science, data, and audit team building practical food safety systems across Africa." },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
