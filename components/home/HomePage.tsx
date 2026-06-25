"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Eye,
  Globe,
  LogIn,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  PlayCircle,
  Shield,
  Star,
  Sun,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";
import {
  getLocalizedCopy,
  languageOptions,
  navItems,
  type Language,
  type NavKey,
  type SiteCopy,
} from "./translations";
import AboutSection from "./sections/AboutSection";
import InsightsSection from "./sections/InsightsSection";
import ServicesSection from "./sections/ServicesSection";
import WhyVeraSection from "./sections/WhyVeraSection";
import StackExperience from "./sections/HowItWorks";

type DemoTab = "ccp" | "deviations" | "suppliers" | "reports";
type Tone = "success" | "warning" | "danger";
type ConfirmationState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "warning"; message: string }
  | { status: "error"; message: string };

const C = {
  navy: "#123F66",
  navySoft: "#1D527D",
  blue: "#4A7BAF",
  blueDeep: "#1A3A5C",
  sky: "#8FC2E8",
  ice: "#DDECF7",
  teal: "#18A89D",
  mint: "#8ADFD4",
  amber: "#D99A3D",
  green: "#2FA772",
  violet: "#7467D9",
  red: "#D95C59",
  slate: "#65758A",
};

const services = [
  {
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "98%", label: "Audit readiness" },
    accent: C.blue,
    icon: Shield,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "3.4×", label: "Faster response" },
    accent: C.teal,
    icon: Cpu,
  },
];

const stackCards = [
  {
    eyebrow: "01",
    metric: "72h",
    color: C.teal,
    colorLight: C.mint,
  },
  {
    eyebrow: "02",
    metric: "4×",
    color: C.blue,
    colorLight: C.sky,
  },
  {
    eyebrow: "03",
    metric: "Live",
    color: C.blueDeep,
    colorLight: C.ice,
  },
  {
    eyebrow: "04",
    metric: "ISO",
    color: C.amber,
    colorLight: "#FAD896",
  },
];

const insights = [
  {
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=900&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
  },
];

const whyCards = [
  { icon: Award, accent: C.blue },
  { icon: Activity, accent: C.teal },
  { icon: BarChart3, accent: C.blueDeep },
  { icon: Globe, accent: C.amber },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "ccp", label: "Live CCP" },
  { id: "deviations", label: "Deviations" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

const ccpTrend = [
  { m: "W1", v: 88, p: 90, d: 4 },
  { m: "W2", v: 92, p: 91, d: 3 },
  { m: "W3", v: 90, p: 92, d: 5 },
  { m: "W4", v: 95, p: 93, d: 2 },
  { m: "W5", v: 96, p: 94, d: 1 },
  { m: "W6", v: 97, p: 95, d: 2 },
  { m: "W7", v: 98, p: 96, d: 1 },
];

const segmentData = [
  { name: "Processors", v: 86, b: 90 },
  { name: "Restaurants", v: 64, b: 75 },
  { name: "Hotels", v: 47, b: 70 },
  { name: "Cold chain", v: 72, b: 85 },
];

const radarData = [
  { subject: "HACCP", A: 95, B: 68 },
  { subject: "ISO 22000", A: 88, B: 55 },
  { subject: "Supplier", A: 82, B: 60 },
  { subject: "Hygiene", A: 91, B: 72 },
  { subject: "Traceability", A: 78, B: 50 },
  { subject: "Deviations", A: 93, B: 64 },
];

const pieData = [
  { name: "Within range", value: 12, color: C.green },
  { name: "Watch", value: 1, color: C.amber },
  { name: "Resolved", value: 8, color: C.teal },
  { name: "Pending", value: 2, color: C.violet },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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

function useScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setP(height > 0 ? (window.scrollY / height) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return p;
}

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

function Logo({
  compact = false,
  subtitle = "Precision food safety",
}: {
  compact?: boolean;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-[1rem] bg-[hsl(var(--navy-950))] text-white shadow-[0_14px_30px_-14px_rgba(7,24,42,.75)] dark:bg-white/10">
        <span className="font-display text-base font-black tracking-tight">V</span>
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[hsl(var(--success))] ring-2 ring-white dark:ring-[hsl(var(--background))]" />
      </div>

      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold tracking-tight text-[hsl(var(--navy-950))] dark:text-white">
            Vera Systems
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  light = false,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={cn("", centered && "mx-auto text-center")} data-reveal>
      <p
        className={cn(
          "inline-flex items-center gap-2.5 text-sm font-bold",
          light
            ? "text-white/55"
            : "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
        )}
      >
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-50" />
      </p>

      <h2
        className={cn(
          "mt-5 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl",
          light ? "text-white" : "text-[hsl(var(--navy-950))] dark:text-white"
        )}
      >
        {title}
      </h2>

      {body && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
            light ? "text-white/65" : "text-[hsl(var(--muted-foreground))]",
            centered && "mx-auto"
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function Navbar({
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveSection(visible[visible.length - 1].target.id);
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 animate-nav",
        scrolled
          ? "border-[hsl(var(--border))] border-b bg-white/90 shadow-[0_18px_45px_-35px_rgba(15,23,42,.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#061225]/95"
          : "bg-white/82 backdrop-blur-xl dark:bg-[#061225]/95"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <button
          onClick={() => scrollToId("hero")}
          className="-ml-1 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--blue-400))]"
          aria-label="Vera Systems home"
        >
          {/* <Logo subtitle={copy.logoSubtitle} /> */}
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
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToId(item.href)}
              className={cn(
                "relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-200",
                activeSection === item.href
                  ? "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                  : "text-[hsl(var(--navy-900))]/55 hover:bg-white/60 hover:text-[hsl(var(--navy-950))] dark:text-white/55 dark:hover:bg-white/7 dark:hover:text-white"
              )}
            >
              {copy.nav[item.key]}
              {activeSection === item.href && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-[hsl(var(--blue-500))]" />
              )}
            </button>
          ))}
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

          <button
            onClick={() => scrollToId("contact")}
            className="primary-action hidden items-center gap-2 px-5 py-3 text-sm sm:inline-flex"
          >
            {copy.actions.bookDemo}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

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
            className="grid h-10 w-10 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/80 transition hover:bg-[hsl(var(--muted))] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 lg:hidden"
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
          open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                setOpen(false);
                scrollToId(item.href);
              }}
              className={cn(
                "rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
                activeSection === item.href
                  ? "bg-[hsl(var(--blue-100))]/60 text-[hsl(var(--blue-700))] dark:bg-white/8 dark:text-[hsl(var(--blue-300))]"
                  : "text-[hsl(var(--navy-950))] hover:bg-[hsl(var(--muted))]/60 dark:text-white dark:hover:bg-white/5"
              )}
            >
              {copy.nav[item.key]}
            </button>
          ))}
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

function Hero({ copy }: { copy: SiteCopy }) {
  const heroStats = copy.hero.stats.map((stat, index) => ({
    ...stat,
    color: ["#4A7BAF", "#18A89D", "#1A3A5C"][index],
    tint: [
      "rgba(232, 242, 250, .94)",
      "rgba(232, 249, 247, .94)",
      "rgba(247, 250, 253, .94)",
    ][index],
  }));

  const titleWords = copy.hero.titleStart.trim().split(/\s+/);
  const titleLineOne = titleWords.slice(0, 2).join(" ");
  const titleLineTwo = titleWords.slice(2).join(" ");

  return (
    <section
      id="hero"
      className="relative isolate w-full max-w-full overflow-x-clip bg-[hsl(var(--background))] pb-16 pt-28 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-80" />

      <div className="pointer-events-none absolute right-[-11rem] top-[-9rem] -z-10 h-[42rem] w-[42rem] rounded-full bg-[#DDECF7]/70 blur-3xl dark:bg-[#4A7BAF]/10" />

      <div className="pointer-events-none absolute bottom-[-15rem] left-[28%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[#E8F2FA]/60 blur-3xl dark:bg-[#18A89D]/5" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.1fr)_minmax(430px,.9fr)] xl:gap-12">
          <div data-reveal="left">
            <h1
              className="!normal-case max-w-[700px] font-display text-6xl font-bold leading-[0.96] tracking-[-0.07em] text-[#1A3A5C] dark:text-white"
              style={{ textTransform: "none" }}
            >
              <span className="block">{titleLineOne}</span>

              <span className="block">
                {titleLineTwo}{" "}
                <span className="hero-title-highlight">
                  {copy.hero.highlight}
                </span>
                {copy.hero.titleEnd}
              </span>
            </h1>

            <p className="mt-8 max-w-[700px] leading-[1.6] tracking-[-0.025em] text-[#5D7190] dark:text-white/70">
              {copy.hero.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="primary-action group inline-flex items-center gap-2.5 px-5 py-3.5 text-sm"
              >
                {copy.actions.bookConsultation}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToId("platform")}
                className="hero-secondary-btn group inline-flex items-center gap-2.5 px-5 py-3.5 text-sm"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E8F2FA] text-[#1A3A5C] ring-1 ring-[#C8DCF0] transition group-hover:bg-[#1A3A5C] group-hover:text-white">
                  <PlayCircle className="h-3.5 w-3.5" />
                </span>

                {copy.actions.explorePlatform}
              </button>
            </div>

            <div className="mt-10 grid max-w-[790px] gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.l}
                  className="hero-stat-card min-h-[125px] rounded-[1.35rem] border p-5"
                  style={{
                    borderColor: `${stat.color}36`,
                    background: `linear-gradient(135deg, ${stat.tint}, rgba(255,255,255,.72))`,
                  }}
                >
                  <p
                    className="font-display text-[clamp(1.9rem,2.5vw,2.55rem)] font-semibold leading-none tracking-[-0.05em]"
                    style={{ color: stat.color }}
                  >
                    {stat.k}
                  </p>

                  <p className="mt-3 text-sm font-semibold leading-[1.35] text-[#5D7190] dark:text-white/65">
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mx-auto w-full max-w-[540px] xl:ml-auto"
            data-reveal="right"
          >
            <div className="group/visual relative">
              <div className="absolute -inset-7 rounded-[2rem] bg-[radial-gradient(circle_at_35%_20%,rgba(200,220,240,.8),transparent_52%),radial-gradient(circle_at_78%_75%,rgba(74,123,175,.22),transparent_58%)] blur-2xl" />

              <div className="hero-chart-card relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/78 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))]/80 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#5D7190] dark:text-white/55">
                      CCP compliance · YTD
                    </p>

                    <p className="mt-1 font-display text-4xl font-semibold tracking-[-0.05em] text-[#1A3A5C] dark:text-white">
                      96.4%
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1A3A5C] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                    <TrendingUp className="h-3 w-3" />
                    +18.4%
                  </span>
                </div>

                <div className="mt-5 h-[230px] sm:h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={ccpTrend}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="heroComplianceArea"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#4A7BAF"
                            stopOpacity={0.42}
                          />
                          <stop
                            offset="100%"
                            stopColor="#C8DCF0"
                            stopOpacity={0.04}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="rgba(26,58,92,.08)"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#65758A", fontSize: 11 }}
                      />

                      <YAxis hide />

                      <Tooltip
                        cursor={{
                          stroke: "#4A7BAF",
                          strokeDasharray: "4 4",
                          strokeWidth: 1,
                        }}
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid rgba(200,220,240,.85)",
                          boxShadow:
                            "0 18px 42px -24px rgba(26,58,92,.35)",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="v"
                        name="Actual"
                        stroke="#1A3A5C"
                        strokeWidth={2.5}
                        fill="url(#heroComplianceArea)"
                      />

                      <Line
                        type="monotone"
                        dataKey="p"
                        name="Target"
                        stroke="#4A7BAF"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { value: "12", label: "CCPs OK", color: "#2FA772" },
                    { value: "1", label: "Watch", color: "#D99A3D" },
                    { value: "0", label: "Critical", color: "#D95C59" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="hero-metric-card rounded-xl border border-[#C8DCF0]/75 bg-white/70 px-2 py-3 text-center dark:border-white/10 dark:bg-white/5"
                    >
                      <p
                        className="font-display text-2xl font-semibold"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-[#5D7190] dark:text-white/55">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-chip-card absolute -bottom-4 -right-4 hidden rounded-2xl border border-[#8FC2E8] bg-white/90 px-4 py-3 text-xs shadow-[0_18px_35px_-22px_rgba(26,58,92,.35)] backdrop-blur md:block dark:border-white/10 dark:bg-[hsl(var(--card))]/90">
                <p className="font-bold text-[#18A89D]">Audit ready</p>
                <p className="mt-0.5 font-semibold text-[#1A3A5C] dark:text-white">
                  ISO 22000 — 96%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientTypes({ copy }: { copy: SiteCopy }) {
  const clients = copy.clients.items;

  return (
    <section className="relative overflow-hidden border-y border-[hsl(var(--border))] bg-white/80 py-12 md:py-14 dark:bg-[hsl(var(--muted))]/25">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
          {copy.clients.eyebrow}
        </p>

        <div className="client-types-mask mt-8 overflow-hidden">
          <div className="client-types-motion flex w-max items-center">
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                aria-hidden={groupIndex === 1}
                className="flex shrink-0 items-center gap-10 pr-10 lg:gap-16 lg:pr-16"
              >
                {clients.map((client) => (
                  <div
                    key={`${groupIndex}-${client}`}
                    className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[hsl(var(--navy-900))]/45 dark:text-white/40"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--teal))]" />

                    <span className="font-display text-base font-extrabold tracking-tight md:text-lg">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ copy }: { copy: SiteCopy }) {
  const serviceItems = copy.services.items.map((item, index) => ({
    ...services[index],
    ...item,
    stat: { ...services[index].stat, label: item.statLabel },
  }));

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-28 dark:bg-[hsl(var(--muted))]/20"
    >
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/45 blur-3xl dark:bg-[hsl(var(--teal))]/6" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={cn(
                  "hover-card group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]",
                  `reveal-delay-${index + 1}`
                )}
              >
                <div
                  className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl transition group-hover:opacity-20"
                  style={{ background: service.accent }}
                />

                <div className="relative p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                        style={{ background: service.accent }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {service.label}
                      </div>
                      <h3 className="mt-4 text-balance font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className="flex-none rounded-2xl border px-4 py-3 text-center"
                      style={{
                        borderColor: `${service.accent}35`,
                        background: `${service.accent}0d`,
                      }}
                    >
                      <p className="font-display text-2xl font-bold" style={{ color: service.accent }}>
                        {service.stat.value}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        {service.stat.label}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed" style={{ color: service.accent }}>
                    {service.impact}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-[hsl(var(--navy-900))] dark:text-white/80"
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

                  <div className="mt-6 flex items-center justify-between border-t border-[hsl(var(--border))] pt-5 dark:border-white/10">
                    <button
                      onClick={() => scrollToId("contact")}
                      className="primary-action group/btn inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-wider"
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

function PlatformDemo({ copy }: { copy: SiteCopy }) {
  return (
    <section
      id="platform"
      className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-28 dark:bg-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-[hsl(var(--blue-100))]/55 blur-3xl dark:bg-[hsl(var(--blue-700))]/8" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow={copy.platform.eyebrow} title={copy.platform.title} />

        </div>

        <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div
            className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white/75 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-5"
            data-reveal
          >
            <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(420px,1fr)_340px]">
              {/* Segment performance chart intentionally removed so the platform preview focuses on the compliance radar. */}
              <div className="flex min-w-0 flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                    Compliance radar
                  </h3>
                  <Eye className="h-4 w-4" style={{ color: C.teal }} />
                </div>

                <div className="min-h-[340px] flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={radarData}
                      cx="50%"
                      cy="50%"
                      outerRadius="76%"
                      margin={{ top: 20, right: 28, bottom: 22, left: 28 }}
                    >
                      <PolarGrid stroke="rgba(26,58,92,.10)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#65758A", fontSize: 11, fontWeight: 700 }}
                        tickLine={false}
                      />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Vera"
                        dataKey="A"
                        stroke={C.blueDeep}
                        fill={C.blue}
                        fillOpacity={0.25}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Industry"
                        dataKey="B"
                        stroke={C.teal}
                        fill={C.teal}
                        fillOpacity={0.12}
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid rgba(200,220,240,.75)",
                          boxShadow: "0 18px 46px -26px rgba(26,58,92,.35)",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                {[
                  {
                    icon: Shield,
                    title: "ISO 22000 ready",
                    description: "Audit-grade evidence by default.",
                    color: C.blue,
                  },
                  {
                    icon: Zap,
                    title: "Record sync",
                    description: "Updates across active sites.",
                    color: C.teal,
                  },
                  {
                    icon: Clock,
                    title: "Guided setup",
                    description: "Start with your first records.",
                    color: C.blueDeep,
                  },
                ].map(({ icon: Icon, title, description, color }) => (
                  <div
                    key={title}
                    className="hover-card flex items-start gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white/82 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <div
                      className="grid h-10 w-10 flex-none place-items-center rounded-xl text-white shadow-md"
                      style={{ background: color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                        {title}
                      </div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]">
                        {description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid">
            <div
              className="hover-card flex h-full flex-col justify-between rounded-3xl border border-[hsl(var(--border))] bg-white/78 p-7 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
              data-reveal="right"
            >
              <div>
                <div className="mb-5 h-40 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/45 dark:border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85"
                    alt={copy.platform.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-base italic leading-relaxed text-[hsl(var(--navy-950))]/80 dark:text-white/80">
                  {copy.platform.quote}
                </p>
              </div>
              <button
                onClick={() => scrollToId("contact")}
                className="primary-action mt-7 inline-flex w-fit items-center gap-2 px-5 py-2.5 text-sm"
              >
                {copy.actions.requestDemo}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <DemoTabs />
      </div>
    </section>
  );
}

function DemoTabs() {
  const [active, setActive] = useState<DemoTab>("ccp");

  return (
    <div className="mt-14">
      <div
        className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[hsl(var(--border))] dark:border-white/10"
        data-reveal
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative whitespace-nowrap rounded-t-lg px-5 pb-4 text-sm font-bold transition-all duration-200",
              active === tab.id
                ? "bg-[hsl(var(--muted))]/50 text-[hsl(var(--navy-950))] dark:bg-white/5 dark:text-white"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-900))] dark:hover:text-white/80"
            )}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[hsl(var(--teal))]" />
            )}
          </button>
        ))}
      </div>

      <div key={active} className="mt-6 animate-fade-up">
        {active === "ccp" && <CCPDashboard />}
        {active === "deviations" && <DeviationDashboard />}
        {active === "suppliers" && <SupplierDashboard />}
        {active === "reports" && <ReportsDashboard />}
      </div>
    </div>
  );
}

function HealthStatCard({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: Tone;
}) {
  const colors = {
    success: {
      text: "text-[hsl(var(--success))]",
      bg: "bg-[hsl(var(--success-light))]/60 dark:bg-[hsl(var(--success))]/15",
      border: "border-[hsl(var(--success))]/20",
    },
    warning: {
      text: "text-[hsl(var(--warning))]",
      bg: "bg-[hsl(var(--warning-light))]/60 dark:bg-[hsl(var(--warning))]/15",
      border: "border-[hsl(var(--warning))]/20",
    },
    danger: {
      text: "text-[hsl(var(--danger))]",
      bg: "bg-[hsl(var(--danger-light))]/60 dark:bg-[hsl(var(--danger))]/15",
      border: "border-[hsl(var(--danger))]/20",
    },
  }[tone];

  return (
    <div className={cn("rounded-2xl border px-4 py-3 text-center", colors.bg, colors.border)}>
      <p className={cn("font-display text-2xl font-semibold", colors.text)}>{value}</p>
      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">
        {label}
      </p>
    </div>
  );
}

function CCPCard({
  name,
  value,
  unit,
  range,
  status,
  tone,
}: {
  name: string;
  value: string;
  unit: string;
  range: string;
  status: string;
  tone: Tone;
}) {
  const accentColor =
    tone === "success" ? C.green : tone === "warning" ? C.amber : C.red;
  const width = tone === "success" ? "78%" : tone === "warning" ? "42%" : "18%";

  return (
    <div
      className="hover-card rounded-2xl border border-[hsl(var(--border))] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[hsl(var(--card))]"
      style={{ borderTopColor: accentColor, borderTopWidth: 2 }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
          {name}
        </p>
        <span
          className="inline-block h-2.5 w-2.5 rounded-full animate-pulse-dot"
          style={{ background: accentColor }}
        />
      </div>

      <p className="mt-3 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
        {value}
        <span className="ml-1 text-base text-[hsl(var(--muted-foreground))]">
          {unit}
        </span>
      </p>

      <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Range {range}</p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width, background: accentColor }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <span style={{ color: accentColor }}>{status}</span>
        <span className="text-[hsl(var(--muted-foreground))]">2 min ago</span>
      </div>
    </div>
  );
}

function CCPDashboard() {
  return (
    <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em]"
            style={{ color: C.green }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse-dot"
              style={{ background: C.green }}
            />
            Live system
          </p>

          <h3 className="mt-2 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
            Critical Control Point Dashboard
          </h3>

          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Auto-refreshing · updated 14 seconds ago
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <HealthStatCard value="12" label="Within range" tone="success" />
          <HealthStatCard value="1" label="Watch" tone="warning" />
          <HealthStatCard value="0" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CCPCard
          name="Cold Storage 01"
          value="3.8"
          unit="°C"
          range="0–5°C"
          status="Within range"
          tone="success"
        />
        <CCPCard
          name="Pasteurization"
          value="74.2"
          unit="°C"
          range="≥72°C"
          status="Within range"
          tone="success"
        />
        <CCPCard
          name="Receiving Dock"
          value="9.4"
          unit="°C"
          range="0–7°C"
          status="Watch"
          tone="warning"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
              30-day CCP trend
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.green }}>
              +18% in-range
            </p>
          </div>

          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ccpAreaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={C.blue} stopOpacity={0.34} />
                    <stop offset="62%" stopColor={C.teal} stopOpacity={0.14} />
                    <stop offset="100%" stopColor={C.ice} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(26,58,92,.06)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 14, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                <Area
                  type="monotone"
                  dataKey="v"
                  name="CCP Score"
                  stroke={C.blueDeep}
                  strokeWidth={2.5}
                  fill="url(#ccpAreaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            Status breakdown
          </p>

          <div className="flex h-36 items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="40%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 14, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeviationDashboard() {
  const items: Array<[Tone, string, string, string, string]> = [
    [
      "danger",
      "Receiving Dock temperature breach",
      "Raw milk delivery registered above accepted receiving limit. Corrective action required.",
      "Now",
      "Critical",
    ],
    [
      "warning",
      "Sanitation verification pending",
      "Line 2 supervisor sign-off is 18 minutes overdue.",
      "18m",
      "Watch",
    ],
    [
      "success",
      "Cold room fluctuation resolved",
      "Automated alert closed after two stable readings within safe range.",
      "1h",
      "Resolved",
    ],
  ];

  const toneColor = (tone: Tone) =>
    tone === "danger" ? C.red : tone === "warning" ? C.amber : C.green;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">
          Deviation response trend
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Open issues by severity and response speed.
        </p>

        <div className="mt-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="devGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.violet} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={C.sky} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(26,58,92,.06)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 14, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Area type="monotone" dataKey="v" name="Score" stroke={C.blue} strokeWidth={2} fill="url(#devGrad)" />
              <Bar dataKey="d" name="Deviations" fill={C.amber} radius={[4, 4, 0, 0]} opacity={0.78} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <HealthStatCard value="68%" label="Faster response" tone="success" />
          <HealthStatCard value="03" label="Open" tone="warning" />
          <HealthStatCard value="01" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">
          Alert timeline
        </p>

        <ul className="mt-5 space-y-4">
          {items.map(([tone, title, body, time, badge]) => (
            <li
              key={title}
              className="flex gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5"
              style={{
                borderColor: `${toneColor(tone)}28`,
                background: `${toneColor(tone)}08`,
              }}
            >
              <span
                className="mt-1.5 inline-block h-2.5 w-2.5 flex-none rounded-full animate-pulse-dot"
                style={{ background: toneColor(tone) }}
              />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {body}
                </p>
              </div>
              <div className="flex-none text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                  {time}
                </p>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color: toneColor(tone) }}
                >
                  {badge}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SupplierDashboard() {
  const suppliers: Array<[string, string, number, string]> = [
    ["Kivu Dairy Co.", "Dairy", 94, "Preferred"],
    ["Akagera Produce", "Fresh produce", 88, "Approved"],
    ["Virunga Cold Chain", "Logistics", 76, "Review"],
    ["Nyungwe Grains", "Dry goods", 91, "Preferred"],
  ];

  const scoreColor = (score: number) =>
    score >= 90 ? C.green : score >= 80 ? C.blue : C.amber;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">
          Supplier risk index
        </p>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
          Weighted score: receiving temperature, document completeness, rejection rate,
          corrective-action closure.
        </p>

        <div className="mt-6 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="supLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={C.blueDeep} />
                  <stop offset="48%" stopColor={C.teal} />
                  <stop offset="100%" stopColor={C.green} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(26,58,92,.07)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 14, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Line
                type="monotone"
                dataKey="v"
                name="Avg Score"
                stroke="url(#supLine)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: C.teal }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid content-start gap-3">
        {suppliers.map(([name, category, score, tier]) => (
          <div
            key={name}
            className="hover-card rounded-2xl border border-[hsl(var(--border))] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[hsl(var(--card))]"
            style={{ borderLeftColor: scoreColor(score), borderLeftWidth: 3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
                  {name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                  {category}
                </p>
              </div>
              <p className="font-display text-3xl font-semibold" style={{ color: scoreColor(score) }}>
                {score}
              </p>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${score}%`, background: scoreColor(score) }}
              />
            </div>

            <p
              className="mt-2 text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: scoreColor(score) }}
            >
              {tier}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsDashboard() {
  const reports: Array<[string, string, string, string]> = [
    [
      "PDF",
      "HACCP Audit Report",
      "Full CCP audit log with corrective actions, sign-offs, and compliance ratings.",
      C.blue,
    ],
    [
      "DASH",
      "Monthly CCP Summary",
      "Trend analysis across control points, deviation frequency, and response times.",
      C.teal,
    ],
    [
      "LOG",
      "Real-Time Hygiene Log",
      "Timestamped sanitation records replacing paper logs and manual sign-offs.",
      C.green,
    ],
    [
      "ISO",
      "ISO 22000 Gap Analysis",
      "Clause-by-clause readiness report with remediation priorities.",
      C.blueDeep,
    ],
    [
      "REP",
      "Supplier Scorecard",
      "Quarterly supplier performance and corrective-action status.",
      C.amber,
    ],
    [
      "API",
      "Custom Dashboard Export",
      "Structured data export for management reporting or ERP connection.",
      C.violet,
    ],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(([badge, title, body, color]) => (
        <article
          key={title}
          className="hover-card group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm dark:bg-[hsl(var(--card))]"
        >
          <span
            className="inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-white"
            style={{ background: color }}
          >
            {badge}
          </span>
          <p className="mt-4 text-balance font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {body}
          </p>
          <button
            onClick={() => scrollToId("contact")}
            className="mt-5 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] transition"
            style={{ color }}
          >
            View artifact
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </button>
        </article>
      ))}
    </div>
  );
}

function Testimonials({ copy }: { copy: SiteCopy }) {
  const outcomeItems = copy.outcomes.items.map((item, index) => ({
    ...item,
    accent: [C.blue, C.teal, C.blueDeep][index],
  }));

  return (
    <section className="relative overflow-hidden bg-white py-28 dark:bg-[hsl(var(--background))]">
      <div className="absolute inset-0 dot-grid opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.outcomes.eyebrow}
          title={copy.outcomes.title}
          body={copy.outcomes.body}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {outcomeItems.map((item, index) => (
            <div
              key={item.name}
              data-reveal
              className={cn(
                "hover-card relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white p-7 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]",
                `reveal-delay-${index + 1}`
              )}
            >
              <div className="absolute -right-3 -top-3 select-none font-display text-9xl font-black leading-none text-[hsl(var(--blue-100))] dark:text-white/5">
                "
              </div>

              <div className="relative">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-3.5 w-3.5"
                      style={{ fill: item.accent, color: item.accent }}
                    />
                  ))}
                </div>

                <p className="text-base italic leading-relaxed text-[hsl(var(--navy-900))] dark:text-white/85">
                  {item.quote}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full text-xs font-black text-white"
                    style={{
                      background: `linear-gradient(135deg, ${item.accent}, ${item.accent}aa)`,
                    }}
                  >
                    {item.initials}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights({ copy }: { copy: SiteCopy }) {
  const insightItems = copy.insights.items.map((item, index) => ({
    ...insights[index],
    ...item,
  }));

  const [feature, ...rows] = insightItems;

  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-[#F4F8FB] py-28 dark:bg-[#07131F]"
    >
      <div className="absolute inset-0 dot-grid opacity-25 dark:opacity-10" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={copy.insights.eyebrow}
            title={copy.insights.title}
            body={copy.insights.body}
          />
          <a
            href="#"
            className="primary-action inline-flex w-fit items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider"
          >
            All articles
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-12 lg:auto-rows-fr">
          <InsightFeatured item={feature} />
          <div className="grid gap-6 lg:col-span-6">
            {rows.map((item) => (
              <InsightRow key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightFeatured({
  item,
}: {
  item: (typeof insights)[number] & SiteCopy["insights"]["items"][number];
}) {
  return (
    <a
      href="#"
      className="hover-card group relative col-span-12 flex flex-col overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] bg-white p-3 shadow-vera dark:border-white/10 dark:bg-white/[0.04] lg:col-span-6"
    >
      <div className="relative h-72 w-full overflow-hidden rounded-[1.55rem] md:h-80">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07182A]/48 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-[hsl(var(--teal))]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em]" style={{ color: C.teal }}>
            {item.tag}
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>

        <h3 className="text-balance font-display text-3xl font-semibold leading-tight text-[hsl(var(--navy-950))] dark:text-white md:text-[2.55rem]">
          {item.title}
        </h3>

        <p className="mt-4 max-w-2xl text-base leading-8 text-[hsl(var(--muted-foreground))]">
          {item.body}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-sm font-bold text-[hsl(var(--muted-foreground))]">
          <span>{item.read}</span>
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--muted-foreground))]/40" />
          <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--blue-100))] px-3 py-1.5 text-[hsl(var(--blue-700))] dark:bg-white/10 dark:text-[hsl(var(--blue-300))]">
            Read story
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}

function InsightRow({
  item,
}: {
  item: (typeof insights)[number] & SiteCopy["insights"]["items"][number];
}) {
  return (
    <a
      href="#"
      className="hover-card group relative grid gap-4 overflow-hidden rounded-[1.6rem] border border-[hsl(var(--border))] bg-white p-4 shadow-soft transition dark:border-white/10 dark:bg-white/[0.045] md:grid-cols-[180px_1fr]"
    >
      <div className="relative h-44 overflow-hidden rounded-[1.15rem] md:h-full">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pr-1">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="rounded-full bg-[hsl(var(--teal))]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
            style={{ color: C.teal }}
          >
            {item.tag}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[hsl(var(--blue-700))] transition group-hover:translate-x-1 dark:text-[hsl(var(--blue-300))]" />
        </div>
        <h4 className="text-balance text-xl font-semibold leading-tight text-[hsl(var(--navy-950))] transition-colors group-hover:text-[hsl(var(--blue-700))] dark:text-white dark:group-hover:text-[hsl(var(--blue-300))]">
          {item.title}
        </h4>
        <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          {item.body}
        </p>
        <span className="mt-4 text-xs font-bold text-[hsl(var(--muted-foreground))]">
          {item.read}
        </span>
      </div>
    </a>
  );
}

function WhyVera({ copy }: { copy: SiteCopy }) {
  const whyItems = copy.why.cards.map((item, index) => ({
    ...whyCards[index],
    ...item,
  }));

  return (
    <section
      id="why"
      className="relative bg-white py-28 dark:bg-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 dot-grid opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.why.eyebrow}
          title={copy.why.title}
          body={copy.why.body}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                data-reveal
                className={cn(
                  "hover-card group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/78 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5",
                  `reveal-delay-${(index % 4) + 1}`
                )}
              >
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                  style={{ background: card.accent }}
                />

                <div className="relative">
                  <div
                    className="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent}, ${card.accent}cc)`,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <p
                    className="font-mono text-[11px] font-bold tracking-[0.22em]"
                    style={{ color: card.accent }}
                  >
                    0{index + 1}
                  </p>

                  <h3 className="mt-2 text-balance font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {card.body}
                  </p>

                  <div
                    className="mt-5 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ width: "2rem", background: card.accent }}
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

function CTABanner({ copy }: { copy: SiteCopy }) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-20 text-white dark:bg-[#061225]">
      <div className="brand-aurora opacity-35 dark:opacity-15" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative mx-auto max-w-5xl px-6 text-center" data-reveal>
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/50">
          {copy.cta.eyebrow}
        </p>
        <h2 className="mt-5 text-balance font-display text-4xl font-semibold text-white md:text-5xl">
          {copy.cta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65">
          {copy.cta.body}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToId("contact")}
            className="primary-action group inline-flex items-center gap-2 px-7 py-3.5 text-sm"
          >
            {copy.actions.bookConsultation}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={() => scrollToId("platform")}
            className="hero-secondary-btn inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition active:scale-95"
          >
            <PlayCircle className="h-4 w-4" />
            {copy.actions.explorePlatform}
          </button>
        </div>
      </div>
    </section>
  );
}

function Contact({ copy }: { copy: SiteCopy }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-28 dark:bg-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/55 blur-3xl dark:bg-[hsl(var(--teal))]/6" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow={copy.contact.eyebrow}
          title={copy.contact.title}
          body={copy.contact.body}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div
            className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]"
            data-reveal="left"
          >
            <p
              className="text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: C.teal }}
            >
              {copy.contact.talk}
            </p>

            <h3 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
              {copy.contact.cardTitle}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {copy.contact.cardBody}
            </p>

            <div
              className="mb-4 mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: `${C.green}18`, border: `1px solid ${C.green}30` }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse-dot"
                style={{ background: C.green }}
              />
              <span className="text-xs font-semibold" style={{ color: C.green }}>
                {copy.contact.response}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { icon: <Mail className="h-4 w-4" />, text: "hello@verasystems.rw" },
                { icon: <Phone className="h-4 w-4" />, text: "+250 788 000 000" },
                { icon: <MapPin className="h-4 w-4" />, text: "Kigali, Rwanda" },
                { icon: <Clock className="h-4 w-4" />, text: "Mon–Fri · 08:00–18:00 CAT" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-4 py-3 transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-300))] hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06]"
                >
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full"
                    style={{ background: `${C.blue}18`, color: C.blue }}
                  >
                    {icon}
                  </span>
                  <span className="text-sm font-semibold text-[hsl(var(--navy-950))]/80 dark:text-white/80">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[hsl(var(--border))] pt-6 dark:border-white/10">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                {copy.contact.trusted}
              </p>

              <div className="flex flex-wrap gap-2">
                {["Rwanda", "Uganda", "Kenya", "Tanzania"].map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-3 py-1 text-[11px] font-semibold text-[hsl(var(--navy-900))] dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ContactForm copy={copy} />
        </div>
      </div>
    </section>
  );
}

function ContactForm({ copy }: { copy: SiteCopy }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response
        .json()
        .catch(() => ({ success: response.ok }));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Could not send message.");
      }

      setStatus("success");
      setMessage(result.message || copy.contact.success);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : copy.contact.error
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-reveal="right"
      className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]"
    >
      <p
        className="text-[10px] font-black uppercase tracking-[0.22em]"
        style={{ color: C.blue }}
      >
        {copy.contact.formEyebrow}
      </p>

      <h3 className="mt-2 font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
        {copy.contact.formTitle}
      </h3>


      {message && (
        <p
          className={cn(
            "mt-4 rounded-2xl border px-4 py-3 text-sm",
            status === "success"
              ? "border-[hsl(var(--success))]/30 bg-[hsl(var(--success-light))]/30 text-[hsl(var(--success))]"
              : "border-[hsl(var(--danger))]/30 bg-[hsl(var(--danger-light))]/30 text-[hsl(var(--danger))]"
          )}
        >
          {message}
        </p>
      )}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField
          label={copy.contact.fields.name}
          name="name"
          placeholder={copy.contact.placeholders.name}
          required
        />
        <FormField
          label={copy.contact.fields.company}
          name="company"
          placeholder={copy.contact.placeholders.company}
        />
        <FormField
          label={copy.contact.fields.email}
          name="email"
          placeholder={copy.contact.placeholders.email}
          type="email"
          required
        />
        <FormField
          label={copy.contact.fields.phone}
          name="phone"
          placeholder={copy.contact.placeholders.phone}
          type="tel"
        />

        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            {copy.contact.fields.interest}
          </label>
          <select
            name="subject"
            className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--blue-400))] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/[0.08]"
          >
            {copy.contact.interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            {copy.contact.fields.message}
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder={copy.contact.placeholders.message}
            className="w-full resize-none rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/[0.08]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="primary-action mt-6 w-full px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? copy.actions.sending : copy.actions.sendMessage}
      </button>
    </form>
  );
}

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/[0.08]"
      />
    </div>
  );
}

function Footer({ copy }: { copy: SiteCopy }) {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-white py-12 dark:border-white/10 dark:bg-[hsl(var(--muted))]/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-xs">
            {/* <Logo subtitle={copy.logoSubtitle} /> */}
            <Image
              src="/logos/vera-logo-blue-transparent.png"
              alt="Vera Systems"
              width={150}
              height={90}
              className="h-auto w-32 dark:hidden"
            />
            <Image
              src="/logos/vera-logo-light-transparent.png"
              alt="Vera Systems"
              width={150}
              height={90}
              className="hidden h-auto w-32 dark:block"
            />
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {copy.footer.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {copy.footer.columns.map((column) => (
              <div key={column.heading}>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: C.teal }}
                >
                  {column.heading}
                </p>

                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="story-link text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))] dark:hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-6 dark:border-white/10 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {copy.footer.copyright}
          </p>

          <div className="flex gap-4 text-[11px] font-black uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            <a href="/admin" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
              Admin inbox
            </a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EmailConfirmationNotice() {
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (!accessToken || type !== "signup") {
      return;
    }

    const expiresIn = Number(params.get("expires_in") || "3600");
    window.history.replaceState(null, document.title, window.location.pathname);
    setConfirmation({
      status: "loading",
      message: "Confirming your email and preparing dashboard access...",
    });

    void fetch("/api/admin/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, expiresIn }),
    })
      .then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          confirmed?: boolean;
          message?: string;
        };

        if (response.ok && result.ok) {
          setConfirmation({
            status: "success",
            message: result.message || "Email confirmed. Your dashboard access is ready.",
          });
          return;
        }

        setConfirmation({
          status: result.confirmed ? "warning" : "error",
          message:
            result.message ||
            "Email confirmation could not be completed. Please request a new link.",
        });
      })
      .catch(() => {
        setConfirmation({
          status: "error",
          message: "Email confirmation could not be completed. Please try again.",
        });
      });
  }, []);

  if (confirmation.status === "idle") return null;

  const isSuccess = confirmation.status === "success";
  const isWarning = confirmation.status === "warning";

  return (
    <div className="fixed inset-x-0 top-24 z-[80] mx-auto max-w-xl px-4">
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-5 shadow-[0_28px_80px_-42px_rgba(18,63,102,.55)] dark:border-white/10 dark:bg-[#07131F]">
        <div className="flex gap-4">
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white",
              isSuccess ? "bg-[#18A89D]" : isWarning ? "bg-[#D99A3D]" : "bg-[#D95C59]"
            )}
          >
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--teal))]">
              {isSuccess ? "Email confirmed" : isWarning ? "Email confirmed" : "Confirmation issue"}
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
              {isSuccess ? "Your account is ready." : "We checked the confirmation link."}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              {confirmation.message}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/admin" className="primary-action inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider">
                Go to dashboard
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setConfirmation({ status: "idle", message: "" })}
                className="rounded-xl border border-[hsl(var(--border))] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))] dark:border-white/10 dark:hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  useRevealOnScroll();

  return (
    <main className="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
     <EmailConfirmationNotice />

      <Navbar
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />
      <Hero copy={copy} />
      <ClientTypes copy={copy} />
      <AboutSection copy={copy} />
      <ServicesSection copy={copy} />
      <StackExperience copy={copy} />
      <PlatformDemo copy={copy} />
      <Testimonials copy={copy} />
      <InsightsSection copy={copy} />
      <WhyVeraSection copy={copy} />
      <CTABanner copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </main>
  );
}
