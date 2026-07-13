import type { Metadata } from "next";
import AboutPageClient from "../../components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About — Vera Systems",
  description:
    "Vera Systems is a food science, data science, and audit team building food safety systems on real-time data for East Africa.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
