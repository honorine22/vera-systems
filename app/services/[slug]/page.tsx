import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteCopy } from "../../../components/home/translations";
import { serviceSlugs, type ServiceSlug } from "../../../components/services/slugs";
import ServicePageClient from "../../../components/services/ServicePageClient";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const index = serviceSlugs.findIndex((s) => s === slug);
  const item = siteCopy.en.services.items[index];

  if (!item) return {};

  return {
    title: item.label,
    description: item.impact.replace(/\s+/g, " ").trim().slice(0, 155),
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      url: `/services/${slug}`,
      title: `${item.label} | Vera Systems`,
      description: item.impact.replace(/\s+/g, " ").trim().slice(0, 155),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = serviceSlugs.findIndex((s) => s === slug);

  if (index === -1) notFound();

  return <ServicePageClient slug={slug as ServiceSlug} />;
}
