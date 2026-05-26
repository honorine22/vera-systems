"use client";

import { useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  GraduationCap,
  Microscope,
  Shield,
} from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
  amber: "#F0A22E",
};

const services = [
  {
    accent: C.blue,
    icon: Shield,
  },
  {
    accent: C.teal,
    icon: Cpu,
  },
  {
    accent: C.blueDeep,
    icon: GraduationCap,
  },
  {
    accent: C.amber,
    icon: Microscope,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="mx-auto max-w-5xl text-center" data-reveal>
      <p className="inline-flex items-center gap-2.5 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-50" />
      </p>

      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-4xl">
        {title}
      </h2>

      {body && (
        <p className="mx-auto mt-4 max-w-5xl text-sm leading-7 text-[hsl(var(--muted-foreground))] md:text-base">
          {body}
        </p>
      )}
    </div>
  );
}

export default function ServicesSection({ copy }: { copy: SiteCopy }) {
  const railRef = useRef<HTMLDivElement>(null);
  const serviceItems = copy.services.items.map((item, index) => ({
    ...services[index % services.length],
    ...item,
  }));

  function scrollServices(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.72, 760),
      behavior: "smooth",
    });
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 dark:bg-[hsl(var(--muted))]/20"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />
      </div>

      <div className="relative mt-7">
        <button
          type="button"
          onClick={() => scrollServices(-1)}
          aria-label="Previous service"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/92 text-[hsl(var(--blue-700))] shadow-soft backdrop-blur transition hover:-translate-x-0.5 hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/85 dark:text-white md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollServices(1)}
          aria-label="Next service"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/92 text-[hsl(var(--blue-700))] shadow-soft backdrop-blur transition hover:translate-x-0.5 hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/85 dark:text-white md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={railRef}
          className="no-scrollbar rail-fade flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-8 pt-2 [scroll-padding-inline:1.5rem] lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:[scroll-padding-inline:max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {serviceItems.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="hover-card group relative flex min-h-[410px] w-[min(82vw,620px)] flex-none snap-start flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-transparent shadow-vera dark:border-white/10"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: service.accent }}
                />

                <div className="relative flex h-full flex-1 flex-col p-5 sm:p-6">
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-white"
                      style={{ background: service.accent }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {service.label}
                    </div>
                    <h3 className="mt-4 text-balance font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-2xl">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex-1">
                    <p className="mt-5 text-sm font-semibold leading-6" style={{ color: service.accent }}>
                      {service.impact}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                      {service.body}
                    </p>

                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-sm leading-5 text-[hsl(var(--navy-900))] dark:text-white/80"
                        >
                          <span
                            className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full"
                            style={{ background: `${service.accent}18` }}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" style={{ color: service.accent }} />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[hsl(var(--border))] pt-5 dark:border-white/10">
                    <button
                      onClick={() => scrollToId("contact")}
                      className="primary-action group/btn inline-flex items-center gap-2 px-4 py-2 text-xs"
                    >
                      {copy.actions.learnMore}
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
                    </button>

                    <div
                      className="h-8 w-8 rounded-full opacity-15 transition group-hover:scale-125 group-hover:opacity-25"
                      style={{ background: service.accent }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
