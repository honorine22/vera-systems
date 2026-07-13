import type { Metadata } from "next";
import ContactPageClient from "../../components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Vera Systems",
  description: "Book a consultation with Vera Systems for HACCP, ISO 22000, digital monitoring, training, or communications support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
