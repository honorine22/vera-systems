import { Cpu, GraduationCap, Megaphone, Shield, type Icon } from "@phosphor-icons/react";
import type { ServiceSlug } from "./slugs";

export type { ServiceSlug } from "./slugs";

export type ServiceMeta = {
  slug: ServiceSlug;
  icon: Icon;
  accent: string;
  image: string;
};

export const servicesMeta: ServiceMeta[] = [
  {
    slug: "vera-consulting",
    icon: Shield,
    accent: "#4A7BAF",
    image:
      "https://images.pexels.com/photos/8554067/pexels-photo-8554067.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "vera-data",
    icon: Cpu,
    accent: "#18A89D",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
  },
  {
    slug: "vera-academy",
    icon: GraduationCap,
    accent: "#1A3A5C",
    image:
      "https://images.pexels.com/photos/8761552/pexels-photo-8761552.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "vera-media",
    icon: Megaphone,
    accent: "#D99A3D",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=85",
  },
];

export function getServiceMeta(slug: string): ServiceMeta | undefined {
  return servicesMeta.find((service) => service.slug === slug);
}

export function getServiceIndex(slug: string): number {
  return servicesMeta.findIndex((service) => service.slug === slug);
}
