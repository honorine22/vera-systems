"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  teal: "#18A89D",
};

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
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
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
    <div className="max-w-3xl" data-reveal>
      <p className="inline-flex items-center gap-2.5 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-50" />
      </p>

      <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
        {title}
      </h2>

      {body && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export default function InsightsSection({ copy }: { copy: SiteCopy }) {
  const railRef = useRef<HTMLDivElement>(null);
  const insightItems = copy.insights.items.map((item, index) => ({
    ...insights[index],
    ...item,
  }));

  function scrollInsights(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.72, 640),
      behavior: "smooth",
    });
  }

  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-[#F4F8FB] py-28 dark:bg-[#07131F]"
    >
      <div className="absolute inset-0 dot-grid opacity-25 dark:opacity-10" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={copy.insights.eyebrow}
            title={copy.insights.title}
            body={copy.insights.body}
          />
          <a
            href="#"
            className="primary-action inline-flex w-fit items-center gap-2 px-5 py-3 text-sm"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="relative -mx-6 mt-10">
          <button
            type="button"
            onClick={() => scrollInsights(-1)}
            aria-label="Previous article"
            className="absolute left-8 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/92 text-[hsl(var(--blue-700))] shadow-soft backdrop-blur transition hover:-translate-x-0.5 hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/85 dark:text-white md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollInsights(1)}
            aria-label="Next article"
            className="absolute right-8 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/92 text-[hsl(var(--blue-700))] shadow-soft backdrop-blur transition hover:translate-x-0.5 hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/85 dark:text-white md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={railRef}
            className="no-scrollbar rail-fade flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-8 pt-4 [scroll-padding-inline:1.5rem]"
          >
            {insightItems.map((item) => (
              <InsightCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ item }: { item: InsightItem }) {
  return (
    <a
      href="#"
      className="hover-card group relative flex h-[540px] w-[min(82vw,430px)] flex-none snap-start flex-col overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-white p-3 shadow-vera dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="relative h-52 w-full overflow-hidden rounded-[1.55rem]">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182A]/48 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--teal))]/10 px-3 py-1.5 text-xs font-bold" style={{ color: C.teal }}>
            {item.tag}
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>

        <h3 className="text-balance font-display text-2xl font-semibold leading-tight text-[hsl(var(--navy-950))] dark:text-white">
          {item.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          {item.body}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-sm font-bold text-[hsl(var(--muted-foreground))]">
          <span>{item.read}</span>
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--muted-foreground))]/40" />
          <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--blue-100))] px-3 py-1.5 text-[hsl(var(--blue-700))] dark:bg-white/10 dark:text-[hsl(var(--blue-300))]">
            Read story
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}
