import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteCopy } from "../../../components/home/translations";
import { serviceSlugs, type ServiceSlug } from "../../../components/services/slugs";
import ServicePageClient from "../../../components/services/ServicePageClient";
import { absoluteUrl, siteConfig } from "../../../lib/site";

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

  const item = siteCopy.en.services.items[index];
  const url = absoluteUrl(`/services/${slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: item.label,
        description: item.impact.replace(/\s+/g, " ").trim(),
        url,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Rwanda" },
          { "@type": "Place", name: "East Africa" },
          { "@type": "Place", name: "Africa" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: absoluteUrl("/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.label,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ServicePageClient slug={slug as ServiceSlug} />
    </>
  );
}
