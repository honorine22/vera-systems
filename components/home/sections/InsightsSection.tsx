import { ArrowRight } from "lucide-react";
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
  const insightItems = copy.insights.items.map((item, index) => ({
    ...insights[index],
    ...item,
  }));

  const [feature, ...rows] = insightItems;

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

        <div className="flow-fade -mx-6 mt-10 overflow-hidden px-6 py-4">
          <div className="no-scrollbar relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
            <InsightFeatured item={feature} />
            {rows.map((item) => (
              <InsightRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightFeatured({ item }: { item: InsightItem }) {
  return (
    <a
      href="#"
      className="hover-card group relative flex w-[86vw] max-w-[520px] flex-none snap-start flex-col overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-white p-3 shadow-vera dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="relative h-56 w-full overflow-hidden rounded-[1.55rem]">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182A]/48 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--teal))]/10 px-3 py-1.5 text-xs font-bold" style={{ color: C.teal }}>
            {item.tag}
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>

        <h3 className="text-balance font-display text-2xl font-semibold leading-tight text-[hsl(var(--navy-950))] dark:text-white">
          {item.title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))]">
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

function InsightRow({ item }: { item: InsightItem }) {
  return (
    <a
      href="#"
      className="hover-card group relative flex w-[82vw] max-w-[390px] flex-none snap-start flex-col overflow-hidden rounded-[1.6rem] border border-[hsl(var(--border))] bg-white p-4 shadow-soft transition dark:border-white/10 dark:bg-white/[0.045]"
    >
      <div className="relative h-44 overflow-hidden rounded-[1.15rem]">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-1">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="rounded-full bg-[hsl(var(--teal))]/10 px-3 py-1 text-xs font-bold"
            style={{ color: C.teal }}
          >
            {item.tag}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>
        <h4 className="text-balance text-xl font-semibold leading-tight text-[hsl(var(--navy-950))] transition-colors group-hover:text-[hsl(var(--blue-700))] dark:text-white dark:group-hover:text-[hsl(var(--blue-300))]">
          {item.title}
        </h4>
        <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          {item.body}
        </p>
        <span className="mt-4 text-xs font-bold text-[hsl(var(--muted-foreground))]">
          {item.read}
        </span>
      </div>
    </a>
  );
}
