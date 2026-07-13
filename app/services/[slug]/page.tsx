import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteCopy } from "../../../components/home/translations";
import { servicesMeta, type ServiceSlug } from "../../../components/services/meta";
import ServicePageClient from "../../../components/services/ServicePageClient";

export function generateStaticParams() {
  return servicesMeta.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const index = servicesMeta.findIndex((service) => service.slug === slug);
  const item = siteCopy.en.services.items[index];

  if (!item) return {};

  return {
    title: `${item.label} — Vera Systems`,
    description: item.impact.replace(/\s+/g, " ").trim().slice(0, 155),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = servicesMeta.findIndex((service) => service.slug === slug);

  if (index === -1) notFound();

  return <ServicePageClient slug={slug as ServiceSlug} />;
}
