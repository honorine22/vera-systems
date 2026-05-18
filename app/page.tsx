"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Eye,
  Globe,
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

type DemoTab = "ccp" | "deviations" | "suppliers" | "reports";
type Tone = "success" | "warning" | "danger";

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

type Language = "en";
type NavKey = "about" | "services" | "platform" | "why" | "insights" | "contact";

const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "about", href: "about" },
  { key: "services", href: "services" },
  { key: "platform", href: "platform" },
  { key: "why", href: "why" },
  { key: "insights", href: "insights" },
  { key: "contact", href: "contact" },
];

const languageOptions: Array<{ code: Language; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
];

const siteCopy = {
  en: {
    languageLabel: "Language",
    logoSubtitle: "Precision food safety",
    nav: {
      about: "About",
      services: "Services",
      platform: "Platform",
      why: "Why Vera",
      insights: "Insights",
      contact: "Contact",
    },
    actions: {
      bookDemo: "Book demo",
      bookConsultation: "Book consultation",
      explorePlatform: "Explore platform",
      learnMore: "Learn more",
      requestDemo: "Request live demo",
      nextStep: "Next step",
      sendMessage: "Send message",
      sending: "Sending…",
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    hero: {
      titleStart: "From inspection records to",
      highlight: "daily control",
      titleEnd: ".",
      body: "Vera brings HACCP, ISO 22000, supplier checks, temperature logs, and corrective actions into one workspace built for food teams in East Africa.",
      stats: [
        { k: "98.7%", l: "records complete" },
        { k: "3.4×", l: "faster follow-up" },
        { k: "240+", l: "controls tracked" },
      ],
    },
    clients: {
      eyebrow: "Trusted by food businesses across Rwanda & East Africa",
      items: [
        "Processors",
        "Restaurants",
        "Exporters",
        "Manufacturers",
        "Hotels",
        "Catering firms",
        "Cloud kitchens",
        "Cold chain",
      ],
    },
    about: {
      eyebrow: "About Vera",
      title: "Food safety systems built for daily operations",
      body: "We combine food-safety practice with clear digital records. The result is a working system your team can use every day, not only when an audit is close.",
      established: "Based in",
      location: "Kigali · Rwanda",
      missionLabel: "Mission",
      mission:
        "To help food businesses in Rwanda and East Africa keep safer operations through practical standards, better records, and faster corrective action.",
      pills: [
        {
          title: "Standards-led",
          body: "HACCP and ISO 22000 methods connected to records your team can verify.",
        },
        {
          title: "Operational fit",
          body: "Workflows shaped around kitchens, factories, warehouses, and cold-chain routines.",
        },
      ],
      stats: [
        { k: "5+", l: "Years experience" },
        { k: "140+", l: "Checks completed" },
        { k: "60+", l: "Operations supported" },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Consultancy and software working as one system.",
      body: "Start with the support your operation needs now, then add more structure as the business grows.",
      items: [
        {
          label: "Food Safety Consultancy",
          title: "Compliance systems that can be used on site",
          impact:
            "Close the gaps that create audit pressure, product risk, and avoidable rework.",
          body: "HACCP design, ISO 22000 gap analysis, facility checks, verification schedules, staff training, and corrective action planning.",
          bullets: [
            "HACCP system design and implementation",
            "ISO 22000 readiness checks",
            "Kitchen and facility inspections",
            "Food-handler training and verification tools",
          ],
          statLabel: "audit readiness",
        },
        {
          label: "Digital Records & Software",
          title: "Live records for daily food-safety control",
          impact:
            "Replace scattered paper logs with dashboards, alerts, audit trails, and supplier scorecards.",
          body: "A practical records layer for CCP monitoring, hygiene checks, deviation follow-up, supplier performance, and compliance reporting.",
          bullets: [
            "CCP monitoring dashboards",
            "Deviation notifications",
            "Digital hygiene logs and sign-offs",
            "Supplier performance tracking",
          ],
          statLabel: "faster follow-up",
        },
      ],
    },
    stack: {
      eyebrow: "How it works",
      title: "A practical route to stronger food safety",
      body: "From the first site walkthrough to working records and routine reporting, each step is clear and usable.",
      nextStep: "Next step",
      cards: [
        {
          title: "Map the real operating risk",
          body: "We review CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.",
          label: "first risk snapshot",
        },
        {
          title: "Turn compliance into workflow",
          body: "Procedures become checklists, controls, escalation paths, and evidence trails that fit day-to-day work.",
          label: "faster evidence retrieval",
        },
        {
          title: "Track performance in real time",
          body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators.",
          label: "CCP tracking",
        },
        {
          title: "Use data to reduce repeat failures",
          body: "Management sees trends, corrective-action loops, supplier patterns, and practical recommendations.",
          label: "audit-ready reporting",
        },
      ],
    },
    platform: {
      eyebrow: "The Platform",
      title: "One workspace for the records that matter.",
      quote:
        "A control desk for food-safety work: deviations logged, suppliers scored, CCPs visible, and reports ready when needed.",
    },
    outcomes: {
      eyebrow: "Client priorities",
      title: "What better records make easier.",
      body: "The focus is simple: less chasing, fewer missing logs, clearer accountability, and stronger audit preparation.",
      items: [
        {
          quote:
            "Audit preparation becomes faster because documents, checks, and sign-offs are already organized.",
          name: "Audit readiness",
          role: "Evidence in one place",
          initials: "AR",
        },
        {
          quote:
            "Supervisors can see which deviations still need action instead of waiting for end-of-day reviews.",
          name: "Team follow-up",
          role: "Clear ownership",
          initials: "TF",
        },
        {
          quote:
            "Supplier reviews become easier when receiving checks, documents, and corrective actions are tracked together.",
          name: "Supplier control",
          role: "Better purchasing decisions",
          initials: "SC",
        },
      ],
    },
    insights: {
      eyebrow: "Insights",
      title: "Notes from food operations.",
      body: "Practical observations from compliance work, supplier checks, CCP monitoring, and daily food-safety routines.",
      items: [
        {
          tag: "Case note",
          title: "How a processor reduced deviation follow-up delays",
          body: "Live alerts helped the team act before end-of-shift paper reviews.",
          read: "6 min read",
        },
        {
          tag: "Data note",
          title: "Supplier records that often create audit gaps",
          body: "Certificate lapses, receiving temperatures, and traceability records need steady review.",
          read: "5 min read",
        },
        {
          tag: "Operations",
          title: "Why paper HACCP logs slow down response",
          body: "Manual logging creates a gap between the issue, the review, and the corrective action.",
          read: "7 min read",
        },
        {
          tag: "Field note",
          title: "How to read CCP stability before problems grow",
          body: "A practical look at the signals that show whether controls are holding during the week.",
          read: "6 min read",
        },
      ],
    },
    why: {
      eyebrow: "Why Vera",
      title: "Built around how food businesses actually work.",
      body: "Vera keeps the focus on usable controls, clear records, and evidence that helps managers act quickly.",
      cards: [
        {
          title: "Standards-based work",
          body: "Recommendations connect to HACCP control points, ISO clauses, audit evidence, or operating data.",
        },
        {
          title: "Live risk visibility",
          body: "Teams can see CCP status, deviation alerts, and corrective action progress from one workspace.",
        },
        {
          title: "Compliance mapped to data",
          body: "Findings become measurable outputs that are easier to verify and report.",
        },
        {
          title: "Made for East Africa",
          body: "Designed around local supply-chain realities, team capacity, and the pace of food operations.",
        },
      ],
    },
    cta: {
      eyebrow: "Get started",
      title: "Ready to replace paper logs with live records?",
      body: "Move from late reviews to clearer daily control across CCPs, hygiene checks, suppliers, and reports.",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Start with clarity. Move to control.",
      body: "Book a consultation and see how Vera can improve compliance work, records, and follow-up.",
      talk: "Talk to us",
      cardTitle: "Ready to improve your food-safety system?",
      cardBody:
        "Tell us about your operation and we will come back with a practical plan within two business days.",
      response: "Typically responds within 4 hours",
      trusted: "Trusted by teams in",
      formEyebrow: "Send a message",
      formTitle: "Tell us about your operation",
      fields: {
        name: "Full name",
        company: "Company",
        email: "Work email",
        phone: "Phone",
        interest: "Service interest",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        company: "Company name",
        email: "you@company.rw",
        phone: "+250 …",
        message: "Tell us about your operation, scale, and current pain points.",
      },
      interests: [
        "Food Safety Consultancy",
        "Digital Records Platform",
        "Platform Demo Request",
        "Both Services",
      ],
      success: "Message sent. Vera Systems will get back to you shortly.",
      error: "Could not send message. Please try again.",
    },
    footer: {
      summary:
        "Precision food safety for East Africa. Practical standards, clean records, and stronger daily control.",
      columns: [
        { heading: "Company", links: ["About", "Services", "Platform", "Why Vera"] },
        { heading: "Resources", links: ["Insights", "Case studies", "Documentation", "Pricing"] },
        { heading: "Legal", links: ["Privacy policy", "Terms of service", "Cookie policy"] },
      ],
      copyright:
        "© 2026 Vera Systems Ltd. · Kigali, Rwanda · All rights reserved.",
    },
  },
} as const;

type SiteCopy = (typeof siteCopy)["en"];

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
    if (stored && stored in siteCopy) {
      setLanguage(stored);
    }
  }, [setLanguage]);

  return { language, setLanguage, copy: siteCopy[language] };
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
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")} data-reveal>
      <p
        className={cn(
          "inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.24em]",
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
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 animate-nav",
        scrolled
          ? "border-[hsl(var(--border))] bg-white/90 shadow-[0_18px_45px_-35px_rgba(15,23,42,.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#061225]/95"
          : "border-[hsl(var(--border))]/60 bg-white/82 backdrop-blur-xl dark:border-white/10 dark:bg-[#061225]/95"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <button
          onClick={() => scrollToId("hero")}
          className="-ml-1 rounded-2xl outline-none transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--blue-400))]"
          aria-label="Vera Systems home"
        >
          {/* <Logo subtitle={copy.logoSubtitle} /> */}
            <Image src={"/logos/vera-logo-blue-transparent.png"} alt="Vera System Logo" width={75} height={75} />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToId(item.href)}
              className={cn(
                "relative rounded-xl px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-200",
                activeSection === item.href
                  ? "bg-[hsl(var(--blue-100))]/70 text-[hsl(var(--blue-700))] dark:bg-white/8 dark:text-[hsl(var(--blue-300))]"
                  : "text-[hsl(var(--navy-900))]/55 hover:bg-white/60 hover:text-[hsl(var(--navy-950))] dark:text-white/55 dark:hover:bg-white/7 dark:hover:text-white"
              )}
            >
              {copy.nav[item.key]}
              {activeSection === item.href && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[hsl(var(--blue-500))]" />
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
              className="h-10 appearance-none rounded-xl border border-[hsl(var(--border))] bg-white/80 px-3 pr-8 text-[11px] font-black uppercase tracking-[0.18em] text-[hsl(var(--navy-950))] outline-none transition hover:bg-[hsl(var(--muted))] focus:border-[hsl(var(--blue-400))] dark:border-white/10 dark:bg-white/5 dark:text-white"
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
            className="primary-action hidden items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider sm:inline-flex"
          >
            {copy.actions.bookDemo}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

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
        </nav>
      </div>
    </header>
  );
}

function Hero({ copy }: { copy: SiteCopy }) {
  const heroStats = copy.hero.stats.map((stat, index) => ({
    ...stat,
    color: ["#4A7BAF", "#149A90", "#1A3A5C"][index],
    tint: [
      "rgba(200, 220, 240, .34)",
      "rgba(20, 154, 144, .10)",
      "rgba(232, 242, 250, .62)",
    ][index],
  }));

  return (
    <section id="hero" className="relative isolate overflow-hidden pb-24 pt-32 md:pb-28">
      <div className="brand-aurora opacity-80" />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E8F2FA]/70 blur-3xl dark:bg-[#4A7BAF]/10" />
      <div className="absolute right-0 top-28 -z-10 h-96 w-96 translate-x-1/3 rounded-full bg-[#C8DCF0]/45 blur-3xl dark:bg-[#C8DCF0]/5" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal="left">
            <h1 className="mt-6 max-w-2xl text-balance font-display text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-[#1A3A5C] dark:text-white md:text-6xl lg:text-7xl">
              {copy.hero.titleStart}{" "}
              <span className="hero-title-highlight">{copy.hero.highlight}</span>
              {copy.hero.titleEnd}
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[hsl(var(--muted-foreground))] dark:text-white/68">
              {copy.hero.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToId("contact")}
                className="primary-action group relative inline-flex items-center gap-2 overflow-hidden px-6 py-3.5 text-sm"
              >
                <span className="relative z-10">{copy.actions.bookConsultation}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToId("platform")}
                className="hero-secondary-btn group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4A7BAF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[hsl(var(--background))]"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#E8F2FA] text-[#1A3A5C] transition duration-300 group-hover:bg-white group-hover:text-[#4A7BAF] dark:bg-white/10 dark:text-white">
                  <PlayCircle className="h-3.5 w-3.5" />
                </span>
                {copy.actions.explorePlatform}
              </button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.l}
                  className="hero-stat-card group rounded-2xl border px-5 py-4 backdrop-blur"
                  style={{
                    borderColor: `${stat.color}2E`,
                    background: `linear-gradient(135deg, ${stat.tint}, rgba(255,255,255,.78))`,
                  }}
                >
                  <div
                    className="font-display text-2xl font-semibold transition-transform duration-300 group-hover:-translate-y-0.5"
                    style={{ color: stat.color }}
                  >
                    {stat.k}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))] dark:text-white/55">
                    {stat.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal="right">
            <div className="group/visual relative">
              <div className="absolute -inset-8 rounded-[2.25rem] bg-[radial-gradient(circle_at_40%_30%,rgba(200,220,240,.65),transparent_52%),radial-gradient(circle_at_78%_72%,rgba(74,123,175,.22),transparent_58%)] blur-2xl transition duration-700 group-hover/visual:scale-105 group-hover/visual:opacity-90 dark:bg-[radial-gradient(circle_at_40%_30%,rgba(74,123,175,.20),transparent_52%),radial-gradient(circle_at_78%_72%,rgba(200,220,240,.08),transparent_58%)]" />

              <div className="hero-chart-card relative float-soft overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-5 shadow-vera backdrop-blur-xl transition duration-500 dark:border-white/10 dark:bg-[hsl(var(--card))]/75">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))] dark:text-white/55">
                      CCP compliance · YTD
                    </div>
                    <div className="mt-1 font-display text-3xl font-semibold text-[#1A3A5C] dark:text-white">
                      96.4%
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F2FA] px-3 py-1 text-xs font-bold text-[#1A3A5C] ring-1 ring-[#C8DCF0] transition duration-300 group-hover/visual:bg-[#1A3A5C] group-hover/visual:text-white dark:bg-white/10 dark:text-white dark:ring-white/10">
                    <TrendingUp className="h-3 w-3" />
                    +18.4%
                  </span>
                </div>

                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={ccpTrend}
                      margin={{ top: 6, right: 6, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#4A7BAF" stopOpacity={0.36} />
                          <stop offset="100%" stopColor="#C8DCF0" stopOpacity={0.04} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(26,58,92,.08)" vertical={false} />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                      />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ stroke: "#4A7BAF", strokeDasharray: 4, strokeWidth: 1 }}
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid rgba(200,220,240,.8)",
                          boxShadow: "0 18px 46px -22px rgba(26,58,92,.35)",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        name="Actual"
                        stroke="#1A3A5C"
                        strokeWidth={2.5}
                        fill="url(#heroGrad)"
                      />
                      <Line
                        type="monotone"
                        dataKey="p"
                        name="Target"
                        stroke="#4A7BAF"
                        strokeWidth={1.6}
                        strokeDasharray="4 4"
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: "12", l: "CCPs OK", t: "success" as Tone },
                    { v: "1", l: "Watch", t: "warning" as Tone },
                    { v: "0", l: "Critical", t: "danger" as Tone },
                  ].map((stat) => (
                    <div
                      key={stat.l}
                      className="hero-metric-card rounded-xl border border-[#C8DCF0]/75 bg-white/76 p-3 text-center transition duration-300 dark:border-white/10 dark:bg-white/5"
                    >
                      <p
                        className={cn(
                          "font-display text-xl font-semibold",
                          stat.t === "success" && "text-[hsl(var(--success))]",
                          stat.t === "warning" && "text-[hsl(var(--warning))]",
                          stat.t === "danger" && "text-[hsl(var(--danger))]"
                        )}
                      >
                        {stat.v}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))] dark:text-white/50">
                        {stat.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-chip-card absolute -bottom-4 -right-4 hidden rounded-2xl border border-[#C8DCF0] bg-white/92 px-4 py-3 text-xs font-semibold shadow-soft backdrop-blur md:block dark:border-white/10 dark:bg-[hsl(var(--card))]/90">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#149A90]">
                  Audit ready
                </p>
                <p className="text-[#1A3A5C] dark:text-white">
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
  const clients = useMemo(() => [...copy.clients.items], [copy.clients.items]);
  const doubled = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden border-y border-[hsl(var(--border))] bg-white/80 py-14 dark:bg-[hsl(var(--muted))]/25">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.28em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
          {copy.clients.eyebrow}
        </p>

        <div className="marquee-track mt-8 overflow-hidden">
          <div className="marquee">
            {doubled.map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="flex flex-none items-center gap-3 text-[hsl(var(--navy-900))]/45 dark:text-white/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--teal))]" />
                <span className="font-display text-base font-extrabold tracking-tight">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function About({ copy }: { copy: SiteCopy }) { return ( <section id="about" className="relative overflow-hidden bg-[hsl(var(--muted))]/40 py-28 dark:bg-[hsl(var(--background))]" > <div className="absolute inset-0 dot-grid opacity-35 dark:opacity-20" /> <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/3 rounded-full bg-[hsl(var(--blue-100))]/50 blur-3xl dark:bg-[hsl(var(--blue-700))]/8" /> <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"> <div data-reveal="left"> <div className="hover-card relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera dark:border-white/10"> <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85" alt={copy.about.title} className="h-full w-full object-cover transition duration-1000 hover:scale-105" /> <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/68 via-transparent to-transparent" /> <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/88 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))]/88"> <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--teal))]"> {copy.about.established} </p> <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white"> {copy.about.location} </p> </div> </div> </div> <div data-reveal="right"> <SectionHeader eyebrow={copy.about.eyebrow} title={copy.about.title} body={copy.about.body} /> <div className="mt-10 relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/72 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"> <div className="absolute inset-y-0 left-0 w-1 rounded-l-3xl bg-gradient-to-b from-[hsl(var(--teal))] via-[hsl(var(--blue-400))] to-transparent" /> <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--teal))]"> {copy.about.missionLabel} </p> <p className="mt-3 text-balance text-lg italic leading-relaxed text-[hsl(var(--navy-950))] dark:text-white"> {copy.about.mission} </p> </div> <div className="mt-6 grid gap-4 sm:grid-cols-2"> {copy.about.pills.map((pill, index) => ( <InfoPill key={pill.title} title={pill.title} body={pill.body} accent={[C.blue, C.teal][index]} /> ))} </div> <div className="mt-6 grid gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white/60 px-6 py-5 backdrop-blur dark:border-white/10 dark:bg-white/[0.045] sm:grid-cols-3"> {copy.about.stats.map((stat, index) => ( <div key={stat.l} className={cn( "text-center", index !== 0 && "sm:border-l sm:border-[hsl(var(--border))] sm:dark:border-white/10" )} > <p className="font-display text-3xl font-semibold tracking-tight" style={{ color: [C.blue, C.teal, C.blueDeep][index] }} > {stat.k} </p> <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]"> {stat.l} </p> </div> ))} </div> </div> </div> </section> ); }

function InfoPill({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="hover-card rounded-2xl border border-[hsl(var(--border))] bg-white/70 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 h-0.5 w-8 rounded-full" style={{ background: accent }} />
      <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
        {body}
      </p>
    </div>
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
                data-reveal
                className={cn(
                  "hover-card group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))]",
                  `reveal-delay-${index + 1}`
                )}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: service.accent }}
                />
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

                  <p className="mt-4 text-sm font-semibold leading-relaxed" style={{ color: service.accent }}>
                    {service.impact}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {service.body}
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

function StackExperience({ copy }: { copy: SiteCopy }) {
  const [activeStep, setActiveStep] = useState(0);

  const stepItems = copy.stack.cards.map((item, index) => ({
    ...stackCards[index],
    ...item,
  }));

  const step = stepItems[activeStep];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-28 text-white dark:bg-[#061225]">
      <div className="absolute inset-0 grid-bg opacity-15 dark:opacity-10" />
      <div className="brand-aurora opacity-30 dark:opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          light
          eyebrow={copy.stack.eyebrow}
          title={copy.stack.title}
          body={copy.stack.body}
        />

        <div className="mt-14 flex flex-wrap gap-3" data-reveal>
          {stepItems.map((card, index) => (
            <button
              key={card.eyebrow}
              onClick={() => setActiveStep(index)}
              className={cn(
                "rounded-xl border px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] transition-all duration-300",
                activeStep === index
                  ? "border-white bg-white text-[#07182A] shadow-lg"
                  : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"
              )}
            >
              <span className="font-mono">{card.eyebrow}</span> /{" "}
              {card.title.split(" ").slice(0, 3).join(" ")}…
            </button>
          ))}
        </div>

        <div key={activeStep} className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.5fr]">
          <div className="hover-card rounded-3xl border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="hidden flex-none sm:block">
                <span
                  className="font-display text-7xl font-black leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.colorLight})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {step.eyebrow}
                </span>
              </div>

              <div className="flex-1">
                <p
                  className="text-[11px] font-black uppercase tracking-[0.22em]"
                  style={{ color: step.colorLight }}
                >
                  Step {step.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {step.body}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              {stepItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeStep ? "2rem" : "0.75rem",
                    background:
                      index === activeStep ? step.color : "rgba(255,255,255,.24)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="hover-card flex flex-1 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-center backdrop-blur-xl">
              <p className="font-display text-5xl font-black" style={{ color: step.color }}>
                {step.metric}
              </p>
              <p
                className="mt-2 text-[11px] font-black uppercase tracking-[0.18em]"
                style={{ color: step.colorLight }}
              >
                {step.label}
              </p>
            </div>

            <button
              onClick={() => setActiveStep((activeStep + 1) % stepItems.length)}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4 text-sm font-semibold text-white/70 backdrop-blur-xl transition hover:border-white/30 hover:text-white"
            >
              {copy.stack.nextStep}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stepItems.map((card, index) => (
            <button
              key={card.eyebrow}
              onClick={() => setActiveStep(index)}
              data-reveal
              className={cn(
                "hover-card group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                `reveal-delay-${(index % 4) + 1}`,
                activeStep === index
                  ? "border-white/25 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              )}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl transition-all duration-300"
                style={{ background: activeStep === index ? card.color : "transparent" }}
              />
              <span
                className="font-display text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${card.color}, ${card.colorLight})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {card.eyebrow}
              </span>
              <p className="mt-1 text-sm font-semibold text-white/80">{card.title}</p>
            </button>
          ))}
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

          <div
            className="hover-card max-w-sm rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5"
            data-reveal="right"
          >
            <p className="text-base italic leading-relaxed text-[hsl(var(--navy-950))]/80 dark:text-white/80">
              {copy.platform.quote}
            </p>
            <button
              onClick={() => scrollToId("contact")}
              className="primary-action mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              {copy.actions.requestDemo}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div
            className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white/75 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 lg:col-span-2"
            data-reveal
          >
            <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                    Segment performance
                  </h3>
                  <BarChart3 className="h-4 w-4" style={{ color: C.blue }} />
                </div>

                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={segmentData} barGap={4}>
                      <defs>
                        <linearGradient id="barActual" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.blueDeep} />
                          <stop offset="100%" stopColor={C.blue} />
                        </linearGradient>
                        <linearGradient id="barTarget" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.mint} stopOpacity={0.72} />
                          <stop offset="100%" stopColor={C.ice} stopOpacity={0.38} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(26,58,92,.07)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "#64748b", fontSize: 11 }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(74,123,175,.06)" }}
                        contentStyle={{
                          borderRadius: 14,
                          border: "1px solid rgba(200,220,240,.75)",
                          boxShadow: "0 18px 46px -26px rgba(26,58,92,.35)",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      />
                      <Bar dataKey="v" name="Score" fill="url(#barActual)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="b" name="Target" fill="url(#barTarget)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                    Compliance radar
                  </h3>
                  <Eye className="h-4 w-4" style={{ color: C.teal }} />
                </div>

                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(26,58,92,.10)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#64748b", fontSize: 10 }}
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
                          border: "none",
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      />
                      <Legend
                        iconSize={8}
                        wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
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
                className="hover-card flex items-start gap-4 rounded-2xl border border-[hsl(var(--border))] bg-white/75 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
                data-reveal
              >
                <div
                  className="grid h-10 w-10 flex-none place-items-center rounded-xl text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
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
              "relative whitespace-nowrap rounded-t-lg px-5 pb-4 text-[11px] font-black uppercase tracking-[0.16em] transition-all duration-200",
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
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
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
      className="bg-[hsl(var(--muted))]/30 py-28 dark:bg-[hsl(var(--muted))]/15"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-8">
          <SectionHeader
            eyebrow={copy.insights.eyebrow}
            title={copy.insights.title}
            body={copy.insights.body}
          />
          <a
            href="#"
            className="story-link hidden text-sm font-semibold text-[hsl(var(--blue-700))] hover:underline dark:text-[hsl(var(--blue-300))] md:inline"
          >
            All articles →
          </a>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <InsightFeatured item={feature} />
          <div className="space-y-5 lg:col-span-5">
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
      data-reveal="left"
      className="group relative col-span-12 overflow-hidden rounded-3xl lg:col-span-7"
    >
      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/92 via-[hsl(var(--navy-950))]/28 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-8 transition-transform duration-500 group-hover:translate-y-0">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur"
            style={{ background: `${C.teal}88`, border: `1px solid ${C.teal}66` }}
          >
            {item.tag}
          </span>

          <h3 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
            {item.title}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/72">
            {item.body}
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <span>{item.read}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="inline-flex items-center gap-1" style={{ color: C.mint }}>
              Read story
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
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
      data-reveal="right"
      className="hover-card group relative flex items-stretch gap-5 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[hsl(var(--card))]"
    >
      <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center pr-4">
        <span
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: C.teal }}
        >
          {item.tag}
        </span>
        <h4 className="mt-1 text-balance text-base font-semibold leading-snug text-[hsl(var(--navy-950))] transition-colors group-hover:text-[hsl(var(--blue-700))] dark:text-white dark:group-hover:text-[hsl(var(--blue-300))]">
          {item.title}
        </h4>
        <span className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
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
            <Image src={"/logos/vera-logo-blue-transparent.png"} alt="Vera System Logo" width={75} height={75} />
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

export default function Page() {
  const progress = useScrollProgress();
  const { dark, toggle } = useDarkMode();
  const { language, setLanguage, copy } = useLanguage();

  useRevealOnScroll();

  return (
    <main className="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
        <div
          className="h-full transition-[width] duration-150"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${C.teal}, ${C.blue}, ${C.sky})`,
          }}
        />
      </div>

      <Navbar
        dark={dark}
        toggleDark={toggle}
        language={language}
        onLanguageChange={setLanguage}
        copy={copy}
      />
      <Hero copy={copy} />
      <ClientTypes copy={copy} />
      <About copy={copy} />
      <Services copy={copy} />
      <StackExperience copy={copy} />
      <PlatformDemo copy={copy} />
      <Testimonials copy={copy} />
      <Insights copy={copy} />
      <WhyVera copy={copy} />
      <CTABanner copy={copy} />
      <Contact copy={copy} />
      <Footer copy={copy} />
    </main>
  );
}
