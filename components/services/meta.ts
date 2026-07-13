import { Cpu, GraduationCap, Megaphone, Shield, type LucideIcon } from "lucide-react";

// Order here MUST match the order of `services.items` in components/home/translations.ts
// (index 0 = Vera Consulting, 1 = Vera Data, 2 = Vera Academy, 3 = Vera Media).
export type ServiceSlug = "vera-consulting" | "vera-data" | "vera-academy" | "vera-media";

export type ServiceMeta = {
  slug: ServiceSlug;
  icon: LucideIcon;
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
