import type { Metadata } from "next";
import ContactPageClient from "../../components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation with Vera Systems for HACCP, ISO 22000, digital monitoring, training, or communications support.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Vera Systems", description: "Talk with our team about HACCP, ISO 22000, monitoring, training, or communications support." },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
