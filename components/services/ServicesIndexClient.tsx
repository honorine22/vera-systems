"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  getLocalizedCopy,
  languageOptions,
  type Language,
} from "../home/translations";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import { servicesMeta } from "./meta";

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vera-theme");
    const isDark = stored === "dark";

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

export default function ServicesIndexClient() {
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  return (
    <main className="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <SiteHeader
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />

      <section className="pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
            {copy.services.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
            {copy.services.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
            {copy.services.body}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {servicesMeta.map((service, index) => {
              const item = copy.services.items[index];
              const Icon = service.icon;

              if (!item) return null;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-[1.65rem] border border-[hsl(var(--border))] bg-white shadow-[0_22px_56px_-42px_rgba(26,58,92,.46)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_66px_-42px_rgba(26,58,92,.54)] dark:border-white/10 dark:bg-[hsl(var(--card))]"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, transparent 30%, ${service.accent}66 100%)`,
                      }}
                    />
                    <div
                      className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-bold text-white"
                      style={{ backgroundColor: service.accent }}
                    >
                      <Icon className="h-3.5 w-3.5" weight="duotone" />
                      {item.label}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-lg font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white">
                      {item.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {item.impact.replace(/\s+/g, " ").trim()}
                    </p>

                    <span
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition group-hover:gap-3"
                      style={{ color: service.accent }}
                    >
                      {copy.actions.learnMore}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
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
