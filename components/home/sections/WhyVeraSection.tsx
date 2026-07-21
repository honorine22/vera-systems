"use client";

import { Medal, Pulse, ChartBar, Globe } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";
import SectionBackground from "../SectionBackground";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
};

const whyCards = [
  { icon: Medal, accent: C.blue },
  { icon: Pulse, accent: "#6FA7D8" },
  { icon: ChartBar, accent: C.blueDeep },
  { icon: Globe, accent: C.blueDeep },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
      <h2 className="text-balance font-display text-4xl font-medium tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-6xl">
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
      className="vera-section-surface vera-surface-ice relative overflow-hidden py-14 md:py-16"
    >
      <SectionBackground variant="collage" colors={[C.blue, C.teal, C.blueDeep]} />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          body={copy.why.body}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4 md:items-start">
          {whyItems.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className={cn(
                  "vera-card-surface hover-card group relative flex min-h-[250px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10",
                  index % 2 === 1 && "md:mt-8"
                )}
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                  style={{ background: card.accent }}
                />

                <div className="relative flex h-full flex-col">
                  <div
                    className="mb-5 grid h-12 w-12 place-items-center rounded-full border-[1.5px]"
                    style={{ borderColor: card.accent, color: card.accent }}
                  >
                    <Icon className="h-5 w-5" weight="fill" />
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
