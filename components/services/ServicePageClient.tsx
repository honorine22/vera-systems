"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react";
import {
  getLocalizedCopy,
  languageOptions,
  type Language,
} from "../home/translations";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import { servicesMeta, type ServiceSlug } from "./meta";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vera-theme");
    const isDark = stored
      ? stored === "dark"
      : document.documentElement.classList.contains("dark");

    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    const html = document.documentElement;
    html.classList.add("transitioning");

    window.setTimeout(() => html.classList.remove("transitioning"), 400);

    setDark((current) => {
      const next = !current;
      html.classList.toggle("dark", next);
      localStorage.setItem("vera-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return { dark, toggle };
}

function useLanguage() {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    localStorage.setItem("vera-language", next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("vera-language") as Language | null;
    if (stored && languageOptions.some((option) => option.code === stored)) {
      setLanguage(stored);
    }
  }, [setLanguage]);

  return { language, setLanguage, copy: getLocalizedCopy(language) };
}

export default function ServicePageClient({ slug }: { slug: ServiceSlug }) {
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  useRevealOnScroll();

  const index = servicesMeta.findIndex((service) => service.slug === slug);
  const meta = servicesMeta[index];
  const item = copy.services.items[index];

  if (!meta || !item) return null;

  const Icon = meta.icon;
  const paragraphs = item.impact
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const otherServices = servicesMeta.filter((service) => service.slug !== slug);

  return (
    <main className="vera-public relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <SiteHeader
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />

      <section className="relative isolate min-h-[650px] overflow-hidden pb-14 pt-28 md:pb-16 md:pt-32">
        <Image
          src={meta.image}
          alt=""
          fill
          priority
          className={cn("-z-20 object-cover", slug === "vera-media" && "scale-105 opacity-55 blur-[1px]")}
          sizes="100vw"
        />
        <div className={cn("absolute inset-0 -z-10", slug === "vera-media" ? "bg-[#061225]/88" : "bg-[#07131F]/80")} />
        <div className={cn("absolute inset-0 -z-10", slug === "vera-media" ? "bg-[radial-gradient(circle_at_50%_42%,rgba(217,154,61,.10),transparent_42%)]" : "bg-gradient-to-r from-[#07131F]/95 via-[#07131F]/82 to-[#07131F]/50")} />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${meta.accent}, transparent 55%)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mt-6 max-w-6xl text-center">
            <div data-reveal>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-bold text-white"
                style={{ backgroundColor: meta.accent }}
              >
                <Icon className="h-3.5 w-3.5" weight="duotone" />
                {item.label}
              </div>

              <h1 className="mx-auto mt-5 max-w-6xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
                {item.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="primary-action inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  {copy.actions.bookConsultation}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div
                  className="inline-flex items-center gap-2 rounded-2xl border px-4 py-3"
                  style={{ borderColor: `${meta.accent}35`, background: `${meta.accent}0d` }}
                >
                  <Icon className="h-4 w-4" weight="duotone" style={{ color: meta.accent }} />
                  <p className="max-w-[11rem] text-xs font-bold uppercase tracking-wide leading-tight" style={{ color: meta.accent }}>
                    {item.statLabel}
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-7 max-w-6xl space-y-4 text-base leading-8 text-white/80 md:text-lg">
                {paragraphs.slice(0, 2).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(var(--border))] bg-white py-16 dark:border-white/10 dark:bg-[hsl(var(--muted))]/10 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p
            className="text-sm font-bold"
            style={{ color: meta.accent }}
          >
            What&rsquo;s included
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-3xl">
            Capabilities under {item.label}
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {item.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-[hsl(var(--border))] bg-white p-4 text-sm leading-6 text-[hsl(var(--navy-900))] shadow-[0_16px_40px_-32px_rgba(15,23,42,.5)] dark:border-white/10 dark:bg-[hsl(var(--card))] dark:text-white/85"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full"
                  style={{ backgroundColor: `${meta.accent}18` }}
                >
                  <Check className="h-3.5 w-3.5" weight="bold" style={{ color: meta.accent }} />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {item.roadmap && item.roadmap.length > 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 p-6 dark:border-white/15 dark:bg-white/5">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: meta.accent }}
              >
                On the roadmap
              </span>
              <ul className="mt-4 space-y-2">
                {item.roadmap.map((entry, i) => (
                  <li
                    key={i}
                    className="text-sm leading-6 text-[hsl(var(--muted-foreground))]"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]/80">
                In development, not yet part of the live {item.label} offering.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-[#D7E3EE] bg-white p-8 text-[#173657] shadow-[0_20px_55px_-34px_rgba(18,63,102,.38)] dark:border-white/10 dark:bg-[#0A1B2E] dark:text-white dark:shadow-[0_24px_60px_-34px_rgba(0,0,0,.75)] sm:flex-row sm:items-center md:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6A8096] dark:text-white/60">
                Ready to talk?
              </p>
              <h3 className="mt-2 text-balance font-display text-xl font-semibold text-[#173657] dark:text-white md:text-2xl">
                Discuss {item.label.toLowerCase()} with our team.
              </h3>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#8FC2E8] bg-[#4A7BAF] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5A8BC2]"
            >
              {copy.actions.sendMessage}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(var(--border))] py-16 dark:border-white/10 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
            Explore more
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-3xl">
            Other Vera Systems services
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {otherServices.map((service) => {
              const serviceIndex = servicesMeta.findIndex((s) => s.slug === service.slug);
              const serviceItem = copy.services.items[serviceIndex];
              const OtherIcon = service.icon;

              if (!serviceItem) return null;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,.5)] dark:border-white/10 dark:bg-[hsl(var(--card))]"
                >
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full border-[1.5px]"
                    style={{ borderColor: service.accent, color: service.accent }}
                  >
                    <OtherIcon className="h-4 w-4" weight="fill" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">
                    {serviceItem.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-[hsl(var(--muted-foreground))]">
                    {serviceItem.title}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition group-hover:gap-2.5"
                    style={{ color: service.accent }}
                  >
                    Learn more
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter copy={copy} />
    </main>
  );
}
