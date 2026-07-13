"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, LogIn, Menu, Moon, Sun, X } from "lucide-react";
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [overHero, setOverHero] = useState(false);

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
    if (!isHome) {
      setOverHero(false);
      return;
    }

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
  }, [isHome]);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
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
                  <ChevronDown
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
                            className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg"
                            style={{ backgroundColor: `${meta.accent}18`, color: meta.accent }}
                          >
                            <Icon className="h-4 w-4" />
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

                    <Link
                      href="/services"
                      className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[hsl(var(--blue-700))] transition hover:bg-[hsl(var(--muted))]/70 dark:text-[hsl(var(--blue-300))] dark:hover:bg-white/5"
                    >
                      All services
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
            className="grid h-11 w-11 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 text-[hsl(var(--muted-foreground))] transition hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--navy-950))] dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/contact"
            className="primary-action hidden items-center gap-2 px-5 py-3 text-sm sm:inline-flex"
          >
            {copy.actions.bookDemo}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href="/admin"
            className="hidden items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white/80 px-4 py-3 text-sm font-bold text-[hsl(var(--navy-950))] transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-400))] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:inline-flex"
          >
            <LogIn className="h-3.5 w-3.5" />
            Dashboard
          </a>

          <button
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 transition hover:bg-[hsl(var(--muted))] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4 dark:text-white" />
            ) : (
              <Menu className="h-4 w-4 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-4 origin-top overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white/95 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-[hsl(var(--background))]/95 lg:hidden",
          open ? "mt-2 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) =>
            item.key === "services" ? (
              <div key={item.href}>
                <button
                  onClick={() => setMobileServicesOpen((value) => !value)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
                    isActivePath(item.href)
                      ? "bg-[hsl(var(--blue-100))]/60 text-[hsl(var(--blue-700))] dark:bg-white/8 dark:text-[hsl(var(--blue-300))]"
                      : "text-[hsl(var(--navy-950))] hover:bg-[hsl(var(--muted))]/60 dark:text-white dark:hover:bg-white/5"
                  )}
                >
                  {homeLabel(item.key)}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileServicesOpen && "rotate-180"
                    )}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="ml-2 mt-1 flex flex-col gap-1 border-l border-[hsl(var(--border))] pl-3 dark:border-white/10">
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
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                    >
                      All services
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={`/${item.href}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
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
            className="mt-2 flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-[hsl(var(--navy-950))]"
          >
            <LogIn className="h-4 w-4" />
            Dashboard login
          </a>
        </nav>
      </div>
    </header>
  );
}
