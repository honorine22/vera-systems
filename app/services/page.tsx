import type { Metadata } from "next";
import ServicesIndexClient from "../../components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vera Consulting, Vera Data, Vera Academy, and Vera Media — food safety consultancy, digital monitoring, training, and communications for East Africa.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Food Safety Services | Vera Systems", description: "Consulting, digital monitoring, training, and communications for safer food operations." },
};

export default function ServicesIndexPage() {
  return <ServicesIndexClient />;
}
