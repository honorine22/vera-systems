import { Activity, Award, BarChart3, Globe } from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
  amber: "#F0A22E",
};

const whyCards = [
  { icon: Award, accent: C.blue },
  { icon: Activity, accent: C.teal },
  { icon: BarChart3, accent: C.blueDeep },
  { icon: Globe, accent: C.amber },
];

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
    <div className="mx-auto max-w-3xl text-center">
      <p className="inline-flex items-center gap-2.5 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-50" />
      </p>

      <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
        {title}
      </h2>

      {body && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export default function WhyVeraSection({ copy }: { copy: SiteCopy }) {
  const whyItems = copy.why.cards.map((item, index) => ({
    ...whyCards[index],
    ...item,
  }));

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-white py-28 dark:bg-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--blue-100))]/50 blur-3xl dark:bg-[hsl(var(--blue-700))]/10" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[hsl(var(--teal))]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          body={copy.why.body}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="hover-card group relative flex min-h-[270px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/90 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: card.accent }}
                />
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                  style={{ background: card.accent }}
                />

                <div className="relative flex h-full flex-col">
                  <div
                    className="mb-5 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-md"
                    style={{ background: card.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <p
                    className="font-mono text-xs font-bold"
                    style={{ color: card.accent }}
                  >
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-balance font-display text-lg font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {card.body}
                  </p>

                  <div
                    className="mt-6 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: card.accent }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
