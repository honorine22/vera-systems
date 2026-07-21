"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  getLocalizedCopy,
  languageOptions,
  type Language,
  type SiteCopy,
} from "../home/translations";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppButton from "./WhatsAppButton";

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

export default function StandalonePageShell({
  children,
}: {
  children: (copy: SiteCopy) => ReactNode;
}) {
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  useRevealOnScroll();

  return (
    <main className="vera-public relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <SiteHeader
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />
      <div className="pt-20">{children(copy)}</div>
      <SiteFooter copy={copy} />
      <WhatsAppButton />
    </main>
  );
}
