import type { Metadata } from "next";
import ServicesIndexClient from "../../components/services/ServicesIndexClient";

export const metadata: Metadata = {
  title: "Services — Vera Systems",
  description:
    "Vera Consulting, Vera Data, Vera Academy, and Vera Media — food safety consultancy, digital monitoring, training, and communications for East Africa.",
};

export default function ServicesIndexPage() {
  return <ServicesIndexClient />;
}
