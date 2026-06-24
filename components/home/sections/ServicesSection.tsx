"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  GraduationCap,
  Microscope,
  Shield,
  X,
  type LucideIcon,
} from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
  amber: "#F0A22E",
};

type ServiceVisual = {
  accent: string;
  icon: LucideIcon;
};

type ServiceItem = SiteCopy["services"]["items"][number] &
  ServiceVisual & {
    index: number;
  };

const serviceVisuals: ServiceVisual[] = [
  { accent: C.blue, icon: Shield },
  { accent: C.teal, icon: Cpu },
  { accent: C.blueDeep, icon: GraduationCap },
  { accent: C.amber, icon: Microscope },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
    <div className="mx-auto max-w-3xl text-center" data-reveal>
      <p className="type-eyebrow inline-flex items-center gap-2.5 text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-45" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-45" />
      </p>

      <h2 className="type-section-title mt-4 text-[hsl(var(--navy-950))] dark:text-white">
        {title}
      </h2>

      {body ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[hsl(var(--muted-foreground))] md:text-base">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function ServicesSection({ copy }: { copy: SiteCopy }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null
  );

  const serviceItems: ServiceItem[] = copy.services.items.map(
    (item, index) => ({
      ...item,
      ...serviceVisuals[index % serviceVisuals.length],
      index,
    })
  );

  const activeService =
    activeServiceIndex === null ? null : serviceItems[activeServiceIndex];

  function scrollServices(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const firstCard = rail.querySelector<HTMLElement>("[data-service-card]");
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.gap || "20");

    const amount = firstCard
      ? firstCard.offsetWidth + gap
      : rail.clientWidth * 0.75;

    rail.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (activeServiceIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveServiceIndex(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeServiceIndex]);

  return (
    <section
      id="services"
      className="relative w-full max-w-full overflow-x-clip bg-white py-16 dark:bg-[hsl(var(--muted))]/20 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />
      </div>

      <div className="relative mt-9 w-full max-w-full overflow-x-clip">
        <button
          type="button"
          onClick={() => scrollServices(-1)}
          aria-label="Previous service"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/95 text-[hsl(var(--blue-700))] shadow-[0_14px_32px_-18px_rgba(26,58,92,.4)] backdrop-blur transition hover:-translate-x-1 hover:border-[hsl(var(--blue-300))] hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/95 dark:text-white md:flex lg:left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => scrollServices(1)}
          aria-label="Next service"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white/95 text-[hsl(var(--blue-700))] shadow-[0_14px_32px_-18px_rgba(26,58,92,.4)] backdrop-blur transition hover:translate-x-1 hover:border-[hsl(var(--blue-300))] hover:bg-white dark:border-white/10 dark:bg-[hsl(var(--card))]/95 dark:text-white md:flex lg:right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overscroll-x-contain px-5 pb-8 pt-2 [scroll-padding-inline:1.25rem] sm:px-6 sm:[scroll-padding-inline:1.5rem] lg:gap-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:[scroll-padding-inline:max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {serviceItems.map((service) => {
            const Icon = service.icon;
            const visibleBullets = service.bullets.slice(0, 4);
            const hiddenBulletCount = Math.max(
              service.bullets.length - visibleBullets.length,
              0
            );

            const hasMoreContent =
              service.impact.length > 155 || service.bullets.length > 4;

            return (
              <article
                key={service.title}
                data-service-card
                className="group relative flex h-[470px] w-[84vw] flex-none snap-start snap-always flex-col overflow-hidden rounded-[1.55rem] border border-[hsl(var(--border))] bg-white p-5 shadow-[0_22px_56px_-42px_rgba(26,58,92,.46)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_66px_-42px_rgba(26,58,92,.54)] dark:border-white/10 dark:bg-[hsl(var(--card))] sm:w-[365px] lg:w-[380px]"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: service.accent }}
                />

                <div className="flex items-start justify-between gap-3">
                  <div
                    className="inline-flex max-w-[calc(100%-2.5rem)] items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: service.accent }}
                  >
                    <Icon className="h-3.5 w-3.5 flex-none" />
                    <span className="truncate">{service.label}</span>
                  </div>

                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: `${service.accent}A8` }}
                  >
                    {String(service.index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 line-clamp-2 text-xl font-semibold leading-[1.2] tracking-[-0.03em] text-[hsl(var(--navy-950))] dark:text-white">
                  {service.title}
                </h3>

                <p
                  className="mt-4 line-clamp-4 text-sm font-medium leading-6"
                  style={{ color: service.accent }}
                >
                  {service.impact}
                </p>

                <ul className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-2">
                  {visibleBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex min-w-0 items-start gap-2.5 text-sm leading-5 text-[hsl(var(--navy-900))] dark:text-white/85"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                        style={{ backgroundColor: `${service.accent}18` }}
                      >
                        <Check
                          className="h-3.5 w-3.5"
                          style={{ color: service.accent }}
                        />
                      </span>

                      <span className="line-clamp-2">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {hasMoreContent ? (
                  <button
                    type="button"
                    onClick={() => setActiveServiceIndex(service.index)}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-bold transition hover:opacity-70"
                    style={{ color: service.accent }}
                  >
                    Read more
                    {hiddenBulletCount > 0
                      ? ` · ${hiddenBulletCount} more`
                      : ""}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : null}

                <div className="mt-auto flex items-center justify-between border-t border-[hsl(var(--border))] pt-4 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveServiceIndex(service.index)}
                    className="group/button inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--navy-950))] transition hover:opacity-70 dark:text-white"
                  >
                    {copy.actions.learnMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </button>

                  <span
                    className="h-8 w-8 rounded-full opacity-20 transition duration-300 group-hover:scale-110 group-hover:opacity-30"
                    style={{ backgroundColor: service.accent }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {activeService ? (
        <ServiceDetailsModal
          service={activeService}
          onClose={() => setActiveServiceIndex(null)}
        />
      ) : null}
    </section>
  );
}

function ServiceDetailsModal({
  service,
  onClose,
}: {
  service: ServiceItem;
  onClose: () => void;
}) {
  const Icon = service.icon;

  function handleContact() {
    onClose();

    window.setTimeout(() => {
      scrollToId("contact");
    }, 150);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close service details"
        className="absolute inset-0 bg-[#07182A]/65 backdrop-blur-sm"
      />

      <div className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[780px] overflow-y-auto rounded-[1.5rem] border border-white/25 bg-white p-5 shadow-[0_34px_90px_-36px_rgba(7,24,42,.8)] dark:border-white/10 dark:bg-[#071B31] sm:max-h-[calc(100dvh-2.5rem)] sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-white text-[hsl(var(--navy-950))] transition hover:bg-[hsl(var(--muted))] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold text-white"
            style={{ backgroundColor: service.accent }}
          >
            <Icon className="h-3.5 w-3.5" />
            {service.label}
          </div>

          <h3
            id="service-modal-title"
            className="mt-4 max-w-[620px] text-2xl font-semibold leading-[1.14] tracking-[-0.035em] text-[hsl(var(--navy-950))] dark:text-white sm:text-3xl"
          >
            {service.title}
          </h3>

          <p
            className="mt-4 max-w-[660px] text-sm font-medium leading-7"
            style={{ color: service.accent }}
          >
            {service.impact}
          </p>
        </div>

        <section className="mt-7 border-t border-[hsl(var(--border))] pt-5 dark:border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="text-[10px] font-black uppercase tracking-[0.17em]"
                style={{ color: service.accent }}
              >
                Full scope
              </p>

              <h4 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-[hsl(var(--navy-950))] dark:text-white">
                Included capabilities
              </h4>
            </div>

            <span
              className="grid h-9 w-9 place-items-center rounded-xl"
              style={{
                color: service.accent,
                backgroundColor: `${service.accent}16`,
              }}
            >
              <Icon className="h-4 w-4" />
            </span>
          </div>

          <ul className="mt-4 space-y-2.5">
            {service.bullets.map((bullet, index) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3.5 text-sm leading-5 text-[hsl(var(--navy-900))] dark:border-white/10 dark:bg-white/[0.035] dark:text-white/85"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ backgroundColor: `${service.accent}18` }}
                >
                  <Check
                    className="h-3.5 w-3.5"
                    style={{ color: service.accent }}
                  />
                </span>

                <span>
                  <span
                    className="mr-2 font-mono text-[10px] font-bold"
                    style={{ color: service.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-5 dark:border-white/10">
          <button
            type="button"
            onClick={handleContact}
            className="primary-action inline-flex items-center gap-2 px-4 py-3 text-sm"
          >
            Discuss this service
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[hsl(var(--blue-700))] transition hover:text-[hsl(var(--navy-950))] dark:hover:text-white"
          >
            Back to services
          </button>
        </div>
      </div>
    </div>
  );
}