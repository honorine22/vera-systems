"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";
import { servicesMeta } from "../../services/meta";
import SectionBackground from "../SectionBackground";

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl text-center" data-reveal>
      <p className="type-eyebrow inline-flex items-center gap-2.5 text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-45" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-45" />
      </p>

      <h2 className="type-section-title mt-4 text-[hsl(var(--navy-950))] dark:text-white">
        {title}
      </h2>

      {body ? (
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))] md:text-base">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function ServicesSection({ copy }: { copy: SiteCopy }) {
  return (
    <section
      id="services"
      className="vera-section-surface relative w-full max-w-full overflow-x-clip bg-white py-20 md:py-28"
    >
      <SectionBackground variant="dots" colors={["#4A7BAF", "#18A89D", "#1A3A5C"]} />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesMeta.map((meta, index) => {
            const item = copy.services.items[index];
            if (!item) return null;

            const Icon = meta.icon;

            return (
              <Link
                key={meta.slug}
                href={`/services/${meta.slug}`}
                data-reveal
                className="vera-card-surface group flex flex-col overflow-hidden rounded-[1.5rem] border border-[hsl(var(--border))] bg-white shadow-[0_22px_56px_-42px_rgba(26,58,92,.46)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_66px_-42px_rgba(26,58,92,.54)] dark:border-white/10"
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={meta.image}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 20%, ${meta.accent}77 100%)`,
                    }}
                  />
                  <div
                    className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-white"
                    style={{ backgroundColor: meta.accent }}
                  >
                    <Icon className="h-4 w-4" weight="duotone" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.18em]"
                    style={{ color: meta.accent }}
                  >
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white">
                    {item.title}
                  </h3>

                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold transition group-hover:gap-2.5"
                    style={{ color: meta.accent }}
                  >
                    {copy.actions.learnMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
