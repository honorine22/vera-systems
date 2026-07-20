"use client";

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
      <h2 className="type-section-title text-[hsl(var(--navy-950))] dark:text-white">
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
      className="vera-section-surface relative w-full max-w-full overflow-x-clip bg-white py-16 md:py-20"
    >
      <SectionBackground variant="dots" colors={["#4A7BAF", "#6FA7D8", "#1A3A5C"]} />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          {servicesMeta.map((meta, index) => {
            const item = copy.services.items[index];
            if (!item) return null;

            const Icon = meta.icon;

            return (
              <Link
                key={meta.slug}
                href={`/services/${meta.slug}`}
                data-reveal
                className={`vera-card-surface hover-card group relative flex min-h-[250px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10 ${index % 2 === 1 ? "md:mt-8" : ""}`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#4A7BAF] opacity-10 blur-3xl transition-opacity group-hover:opacity-25" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border-[1.5px] border-[#4A7BAF] text-[#4A7BAF]">
                    <Icon className="h-5 w-5" weight="fill" />
                  </div>

                  <p className="font-mono text-xs font-bold text-[#4A7BAF]">
                    0{index + 1}
                  </p>

                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#4A7BAF]">
                    {item.label}
                  </p>

                  <h3 className="mt-2 text-balance font-display text-lg font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {item.impact.replace(/\s+/g, " ").trim()}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#4A7BAF] transition group-hover:gap-2.5">
                    {copy.actions.learnMore}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>

                  <div className="mt-5 h-1 w-12 rounded-full bg-[#4A7BAF] transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
