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

export default function ServicesIndexClient() {
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  return (
    <main className="vera-public relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <SiteHeader
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />

      <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-14 pt-24 lg:h-[100svh]">
        <Image
          src={servicesMeta[0].image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[#061225]/70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061225]/90 via-[#061225]/75 to-[#061225]/50" />
        <div className="mx-auto w-full max-w-7xl px-6 text-center">
          <h1 className="mx-auto max-w-4xl text-balance font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {copy.services.title}
          </h1>
          <p className="mx-auto mt-5 text-base leading-8 text-white/80 drop-shadow-[0_2px_14px_rgba(0,0,0,.5)] md:text-lg">
            {copy.services.body}
          </p>
        </div>
      </section>

      <section className="vera-surface-ice py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Explore Vera Systems</h2>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 items-start gap-5 pb-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesMeta.map((service, index) => {
              const item = copy.services.items[index];
              const Icon = service.icon;

              if (!item) return null;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`vera-card-surface group relative flex w-full flex-col overflow-hidden rounded-[1.45rem] border border-[hsl(var(--border))] bg-white shadow-[0_22px_56px_-42px_rgba(26,58,92,.46)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_66px_-42px_rgba(26,58,92,.54)] dark:border-white/10 ${index % 2 === 1 ? "lg:mt-8" : ""}`}
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                      background: "linear-gradient(180deg, transparent 30%, rgba(26,58,92,.72) 100%)",
                      }}
                    />
                    <div
                      className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] font-bold text-white"
                      style={{ backgroundColor: "#4A7BAF" }}
                    >
                      <Icon className="h-3.5 w-3.5" weight="duotone" />
                      {item.label}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-base font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white">
                      {item.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {item.impact.replace(/\s+/g, " ").trim()}
                    </p>

                    <span
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition group-hover:gap-3"
                      style={{ color: "#4A7BAF" }}
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
