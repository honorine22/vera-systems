"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Cpu, GraduationCap, Microscope, Shield } from "lucide-react";
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
  const [activePage, setActivePage] = useState(0);
  const [paused, setPaused] = useState(false);

  const serviceItems = copy.services.items.map((item, index) => ({
    ...services[index % services.length],
    ...item,
  }));
  const pages = Array.from({ length: Math.ceil(serviceItems.length / 2) }, (_, index) =>
    serviceItems.slice(index * 2, index * 2 + 2)
  );

  useEffect(() => {
    if (paused || pages.length < 2) return;

    const timer = window.setInterval(() => {
      setActivePage((page) => (page + 1) % pages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [paused, pages.length]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 dark:bg-[hsl(var(--muted))]/20"
    >
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/45 blur-3xl dark:bg-[hsl(var(--teal))]/6" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />

        <div
          className="flow-fade-soft -mx-6 mt-6 overflow-hidden px-6 py-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ transform: `translateX(-${activePage * 100}%)` }}
          >
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="grid w-full flex-none gap-6 md:grid-cols-2">
                {page.map((service) => {
                  const Icon = service.icon;

                  return (
                    <article
                      key={service.title}
                      className="hover-card group relative flex min-h-[410px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]"
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ background: service.accent }}
                      />
                      <div
                        className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl transition group-hover:opacity-20"
                        style={{ background: service.accent }}
                      />

                      <div className="relative flex h-full flex-1 flex-col p-5">
                        <div>
                          <div
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-white"
                            style={{ background: service.accent }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {service.label}
                          </div>
                          <h3 className="mt-3 text-balance font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                            {service.title}
                          </h3>
                        </div>

                        <div className="flex-1">
                          <p className="mt-4 text-[13px] font-semibold leading-6" style={{ color: service.accent }}>
                            {service.impact}
                          </p>
                          <p className="mt-2 text-[13px] leading-6 text-[hsl(var(--muted-foreground))]">
                            {service.body}
                          </p>

                          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                            {service.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2.5 text-[13px] leading-5 text-[hsl(var(--navy-900))] dark:text-white/80"
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

                        <div className="mt-5 flex items-center justify-between border-t border-[hsl(var(--border))] pt-4 dark:border-white/10">
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
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActivePage(index)}
              aria-label={`Show service group ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                activePage === index
                  ? "w-8 bg-[hsl(var(--blue-700))]"
                  : "w-2 bg-[hsl(var(--border))] hover:bg-[hsl(var(--blue-300))]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
