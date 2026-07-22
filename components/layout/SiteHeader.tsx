"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, CaretDown, SignIn, List, Moon, Sun, X } from "@phosphor-icons/react";
import {
  languageOptions,
  navItems,
  type Language,
  type NavKey,
  type SiteCopy,
} from "../home/translations";
import { servicesMeta } from "../services/meta";

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SiteHeader({
  dark,
  toggleDark,
  language,
  onLanguageChange,
  copy,
}: {
  dark: boolean;
  toggleDark: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  copy: SiteCopy;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [overHero, setOverHero] = useState(
    pathname === "/" ||
      pathname === "/about" ||
      pathname === "/services" ||
      pathname.startsWith("/services/")
  );

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  // The homepage hero has a dark video background, so the header needs to run
  // transparent + light-on-dark while it's still overlapping the hero, then
  // flip to the normal opaque/light-header treatment once scrolled past it.
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-81px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const lightOnDark = overHero;

  function goHome() {
    if (isHome) {
      scrollToId("hero");
    } else {
      router.push("/");
    }
  }

  function isActivePath(href: string) {
    const path = `/${href}`;
    return href === "services" ? pathname.startsWith("/services") : pathname === path;
  }

  const homeLabel = (key: NavKey) => copy.nav[key];

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 animate-nav",
        lightOnDark
          ? "bg-transparent"
          : scrolled
          ? "border-[hsl(var(--border))] border-b bg-white/90 shadow-[0_18px_45px_-35px_rgba(15,23,42,.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#061225]/95"
          : "bg-white/82 backdrop-blur-xl dark:bg-[#061225]/95"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-6 py-2.5 sm:gap-4">
        <button
          onClick={goHome}
          className="-ml-1 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--blue-400))]"
          aria-label="Vera Systems home"
        >
          {lightOnDark ? (
            <Image
              src="/logos/vera-logo-light-transparent.png"
              alt="Vera Systems"
              width={92}
              height={58}
              className="h-auto w-20"
              priority
            />
          ) : (
            <>
              <Image
                src="/logos/vera-logo-blue-transparent.png"
                alt="Vera Systems"
                width={92}
                height={58}
                className="h-auto w-20 dark:hidden"
                priority
              />
              <Image
                src="/logos/vera-logo-light-transparent.png"
                alt="Vera Systems"
                width={92}
                height={58}
                className="hidden h-auto w-20 dark:block"
                priority
              />
            </>
          )}
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.key === "services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesHover(true)}
                onMouseLeave={() => setServicesHover(false)}
              >
                <Link
                  href="/services"
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                    lightOnDark
                      ? isActivePath(item.href)
                        ? "text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                      : isActivePath(item.href)
                      ? "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                      : "text-[hsl(var(--navy-900))]/55 hover:bg-white/60 hover:text-[hsl(var(--navy-950))] dark:text-white/55 dark:hover:bg-white/7 dark:hover:text-white"
                  )}
                >
                  {homeLabel(item.key)}
                  <CaretDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      servicesHover && "rotate-180"
                    )}
                  />
                  {isActivePath(item.href) && (
                    <span
                      className={cn(
                        "absolute bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full",
                        lightOnDark ? "bg-[#8ADFD4]" : "bg-[hsl(var(--blue-500))]"
                      )}
                    />
                  )}
                </Link>

                <div
                  className={cn(
                    "absolute left-1/2 top-full z-[60] w-[19rem] -translate-x-1/2 pt-3 transition-all duration-200",
                    servicesHover
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white shadow-[0_28px_70px_-32px_rgba(15,23,42,.55)] dark:border-white/10 dark:bg-[#0A1B2E]">
                    <Link
                      href="/services"
                      className="mb-1 flex items-center justify-between border-b border-[hsl(var(--border))] px-3 py-3 text-sm font-bold text-[hsl(var(--blue-700))] transition hover:bg-[hsl(var(--muted))]/70 dark:border-white/10 dark:text-[hsl(var(--blue-300))] dark:hover:bg-white/5"
                    >
                      All services
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {copy.services.items.map((service, index) => {
                      const meta = servicesMeta[index];
                      if (!meta) return null;
                      const Icon = meta.icon;

                      return (
                        <Link
                          key={meta.slug}
                          href={`/services/${meta.slug}`}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[hsl(var(--muted))]/70 dark:hover:bg-white/5"
                        >
                          <span
                            className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-full border-[1.5px]"
                            style={{ borderColor: meta.accent, color: meta.accent }}
                          >
                            <Icon className="h-4 w-4" weight="fill" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">
                              {service.label}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-[hsl(var(--muted-foreground))]">
                              {service.title}
                            </span>
                          </span>
                        </Link>
                      );
                    })}

                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={`/${item.href}`}
                className={cn(
                  "relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                  lightOnDark
                    ? isActivePath(item.href)
                      ? "text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                    : isActivePath(item.href)
                    ? "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                    : "text-[hsl(var(--navy-900))]/55 hover:bg-white/60 hover:text-[hsl(var(--navy-950))] dark:text-white/55 dark:hover:bg-white/7 dark:hover:text-white"
                )}
              >
                {homeLabel(item.key)}
                {isActivePath(item.href) && (
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full",
                      lightOnDark ? "bg-[#8ADFD4]" : "bg-[hsl(var(--blue-500))]"
                    )}
                  />
                )}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <label className="relative hidden sm:block" aria-label={copy.languageLabel}>
            <span className="sr-only">{copy.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as Language)}
              className="h-10 appearance-none rounded-xl border border-[hsl(var(--border))] bg-white/80 px-3 pr-8 text-xs font-bold text-[hsl(var(--navy-950))] outline-none transition hover:bg-[hsl(var(--muted))] focus:border-[hsl(var(--blue-400))] dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.short}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[hsl(var(--muted-foreground))]">
              ▾
            </span>
          </label>

          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--navy-950))] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/contact"
            className="primary-action hidden items-center gap-2 px-4 py-2.5 text-sm sm:inline-flex"
          >
            {copy.actions.bookDemo}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="/admin"
            className="hidden items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white/80 px-4 py-3 text-sm font-bold text-[hsl(var(--navy-950))] transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-400))] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:inline-flex"
          >
            <SignIn className="h-3.5 w-3.5" />
            Dashboard
          </a>

          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 transition hover:bg-[hsl(var(--muted))] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4 dark:text-white" />
            ) : (
              <List className="h-4 w-4 dark:text-white" />
            )}
          </button>
        </div>
      </div>

    </header>

      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-0 z-[51] bg-[#061225]/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        id="mobile-navigation"
        aria-hidden={!open}
        className={cn(
          "fixed bottom-0 right-0 top-0 z-[52] flex w-[min(88vw,24rem)] flex-col border-l border-[#D7E3EE] bg-white shadow-[-28px_0_80px_-42px_rgba(6,18,37,.7)] transition-transform duration-500 ease-out dark:border-white/10 dark:bg-[#061225] lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-[#D7E3EE] px-5 py-4 dark:border-white/10">
          <Image
            src="/logos/vera-logo-blue-transparent.png"
            alt="Vera Systems"
            width={92}
            height={58}
            className="h-auto w-20 dark:hidden"
          />
          <Image
            src="/logos/vera-logo-light-transparent.png"
            alt="Vera Systems"
            width={92}
            height={58}
            className="hidden h-auto w-20 dark:block"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#D7E3EE] text-[#173657] transition hover:bg-[#EEF6FC] dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
          {navItems.map((item) =>
            item.key === "services" ? (
              <div key={item.href}>
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition",
                    isActivePath(item.href)
                      ? "bg-[hsl(var(--blue-100))]/60 text-[hsl(var(--blue-700))] dark:bg-white/8 dark:text-[hsl(var(--blue-300))]"
                      : "text-[hsl(var(--navy-950))] hover:bg-[hsl(var(--muted))]/60 dark:text-white dark:hover:bg-white/5"
                  )}
                >
                  {homeLabel(item.key)}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                  <div className="ml-4 mt-2 flex flex-col gap-1 border-l border-[#D7E3EE] pl-3 dark:border-white/10">
                    {copy.services.items.map((service, index) => {
                      const meta = servicesMeta[index];
                      if (!meta) return null;

                      return (
                        <Link
                          key={meta.slug}
                          href={`/services/${meta.slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-[hsl(var(--navy-900))]/80 transition hover:bg-[hsl(var(--muted))]/60 dark:text-white/75 dark:hover:bg-white/5"
                        >
                          {service.label}
                        </Link>
                      );
                    })}
                  </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={`/${item.href}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-left text-base font-semibold transition",
                  isActivePath(item.href)
                    ? "bg-[hsl(var(--blue-100))]/60 text-[hsl(var(--blue-700))] dark:bg-white/8 dark:text-[hsl(var(--blue-300))]"
                    : "text-[hsl(var(--navy-950))] hover:bg-[hsl(var(--muted))]/60 dark:text-white dark:hover:bg-white/5"
                )}
              >
                {homeLabel(item.key)}
              </Link>
            )
          )}
          <a
            href="/admin"
            className="mt-3 flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-[hsl(var(--navy-950))]"
          >
            <SignIn className="h-4 w-4" />
            Dashboard login
          </a>
        </nav>

        <div className="border-t border-[#D7E3EE] p-4 dark:border-white/10">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="primary-action flex w-full items-center justify-center gap-2 px-5 py-3 text-sm"
          >
            {copy.actions.bookDemo}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}
