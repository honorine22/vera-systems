"use client";

import { ArrowRight } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";

const insights = [
  {
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=900&q=85",
  },
  {
    image:
      "https://images.pexels.com/photos/8488032/pexels-photo-8488032.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    image:
      "https://images.pexels.com/photos/8944957/pexels-photo-8944957.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

type InsightItem = (typeof insights)[number] & SiteCopy["insights"]["items"][number];

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
    <div className="max-w-4xl" data-reveal>

      <h6 className="mt-5 text-balance font-display text-2xl font-medium tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-4xl">
        {title}
      </h6>

      {body && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export default function InsightsSection({ copy }: { copy: SiteCopy }) {
  const insightItems = copy.insights.items.map((item, index) => ({
    ...insights[index],
    ...item,
  }));

  return (
    <section
      id="insights"
      className="vera-section-surface relative overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={copy.insights.eyebrow}
            title={copy.insights.title}
            // body={copy.insights.body}
          />
          <a
            href="#"
            className="primary-action inline-flex w-fit items-center gap-2 px-5 py-3 text-sm"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {insightItems.map((item, index) => (
            <InsightCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard({ item, index }: { item: InsightItem; index: number }) {
  const stagger = index % 2 === 1 ? "lg:mt-10" : "";

  return (
     <a
      href="#"
      className={`group relative flex w-full flex-col transition duration-300 hover:-translate-y-1 ${stagger}`}
    >
      <div className="relative h-48 w-full overflow-hidden rounded-[1.4rem] bg-[hsl(var(--muted))] sm:h-52">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182A]/48 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-1 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--blue-100))] px-2.5 py-1 text-[11px] font-bold text-[hsl(var(--blue-700))] dark:bg-white/10 dark:text-[hsl(var(--blue-300))]">
            {item.tag}
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>

        <h3 className="text-balance font-display text-lg font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          {item.body}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-bold text-[hsl(var(--muted-foreground))]">
          <span>{item.read}</span>
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--muted-foreground))]/40" />
          <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--blue-100))] px-2.5 py-1 text-[hsl(var(--blue-700))] dark:bg-white/10 dark:text-[hsl(var(--blue-300))]">
            Read story
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}
