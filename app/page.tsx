"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import {
  ArrowRight, PlayCircle, Sparkles, TrendingUp, Shield, Zap, BarChart3,
  Clock, CheckCircle2, AlertTriangle, Activity, Mail, Phone, MapPin, Menu, X,
  ChevronRight, Star, Award, Users, Globe, Sun, Moon, Database, Cpu, Eye,
  LineChart as LineChartIcon, TrendingDown, RefreshCw,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
  ComposedChart,
} from "recharts";

type DemoTab = "ccp" | "deviations" | "suppliers" | "reports";
type Tone = "success" | "warning" | "danger";

/* ── Brand tokens ── */
const C = {
  navy: "#0d1f3c",
  blue: "#2563eb",
  blueMid: "#3b82f6",
  blueLt: "#93c5fd",
  teal: "#0d9488",
  tealLt: "#5eead4",
  violet: "#7c3aed",
  violetLt: "#c4b5fd",
  amber: "#f59e0b",
  amberLt: "#fde68a",
  green: "#10b981",
  greenLt: "#6ee7b7",
  red: "#ef4444",
  slate: "#64748b",
};

/* ── Data ── */
const navItems = [
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Platform", href: "platform" },
  { label: "Why Vera", href: "why" },
  { label: "Insights", href: "insights" },
  { label: "Contact", href: "contact" },
];

const services = [
  {
    label: "Food Safety Consultancy",
    title: "Certification-grade compliance systems",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
    impact: "Eliminate compliance gaps that expose your operation to audit failure, regulatory risk, and preventable downtime.",
    body: "HACCP design, ISO 22000 gap analysis, facility audits, verification schedules, staff training, and corrective action planning built to hold under external scrutiny.",
    bullets: [
      "HACCP system design and implementation",
      "ISO 22000 certification readiness",
      "On-site kitchen and facility audits",
      "Food handler training and verification tools",
    ],
    stat: { value: "98%", label: "Audit pass rate" },
    accent: C.blue,
    icon: Shield,
  },
  {
    label: "Digital Intelligence & Software",
    title: "Real-time HACCP visibility",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    impact: "Replace paper logs with live dashboards, automated alerts, audit trails, and supplier scorecards your team can act on immediately.",
    body: "A practical data layer for CCP monitoring, hygiene tracking, deviation alerts, supplier performance, and compliance reporting across food operations.",
    bullets: [
      "Live CCP monitoring dashboards",
      "Automated deviation notifications",
      "Digital hygiene logs and sign-offs",
      "Supplier performance analytics",
    ],
    stat: { value: "3.4×", label: "Faster response" },
    accent: C.teal,
    icon: Cpu,
  },
];

const insights = [
  {
    tag: "Case Insight",
    title: "How a Kigali processor cut deviation response time by 68%",
    body: "Automated CCP alerts reduced corrective-action delays by replacing end-of-shift paper log reviews with live deviation notifications.",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=85",
  },
  {
    tag: "Data Trend",
    title: "Supplier non-compliance patterns from 140+ audit checks",
    body: "Certificate lapses, receiving temperature failures, and incomplete traceability records remain the most common upstream risk signals.",
    read: "5 min read",
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "Risk Analysis",
    title: "The hidden cost of paper-based HACCP in high-throughput operations",
    body: "Manual CCP logging creates a time gap between breach, detection, and corrective action — risk that looks compliant on paper but late in practice.",
    read: "7 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85",
  },
  {
    tag: "Field Notes",
    title: "Inside Vera: how we model forecast confidence",
    body: "A practical look at how we score CCP stability, supplier reliability, and deviation likelihood before they become incidents.",
    read: "6 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=85",
  },
];

const whyCards = [
  { title: "Precision food safety", body: "Recommendations are tied to HACCP control points, ISO clauses, audit evidence, or operating data — not generic consulting frameworks.", icon: Award, accent: C.blue },
  { title: "Real-time risk visibility", body: "Dashboards replace scattered paper logs so the team can see CCP status, deviation alerts, and corrective action progress from any device.", icon: Activity, accent: C.teal },
  { title: "Compliance-to-data mapping", body: "Every audit finding becomes a measurable system output, making compliance easier to verify and management decisions easier to defend.", icon: BarChart3, accent: C.violet },
  { title: "Built for East Africa", body: "Designed around local supply-chain realities, food-business constraints, and the pace of kitchens, factories, hotels, and processors.", icon: Globe, accent: C.amber },
];

const stackCards = [
  {
    eyebrow: "01", metric: "72h", label: "first-risk snapshot",
    title: "Map the real operating risk",
    body: "We start on the kitchen or factory floor: CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.",
    color: C.teal, colorLight: C.tealLt,
  },
  {
    eyebrow: "02", metric: "4×", label: "faster evidence retrieval",
    title: "Turn compliance into workflow",
    body: "Your procedures become practical checklists, live controls, escalation paths, and evidence trails that your team can use every day.",
    color: C.blue, colorLight: C.blueLt,
  },
  {
    eyebrow: "03", metric: "Live", label: "CCP intelligence",
    title: "Visualize performance in real time",
    body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators before issues turn into incidents.",
    color: C.violet, colorLight: C.violetLt,
  },
  {
    eyebrow: "04", metric: "ISO", label: "audit-ready reporting",
    title: "Use data to reduce repeat failures",
    body: "Management receives trends, corrective-action loops, supplier patterns, and practical recommendations tied directly to operational outcomes.",
    color: C.amber, colorLight: C.amberLt,
  },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "ccp", label: "Live CCP" },
  { id: "deviations", label: "Deviations" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

const testimonials = [
  { quote: "Vera cut our audit prep from three weeks to two days. The live dashboards changed how our entire team thinks about compliance.", name: "Jean-Pierre M.", role: "Operations Director, Kigali Dairy", initials: "JP", accent: C.blue },
  { quote: "We finally have a system that matches how our kitchen actually runs. Every deviation gets caught, logged, and closed — in real time.", name: "Amara N.", role: "Head Chef, Hotel Serena Rwanda", initials: "AN", accent: C.teal },
  { quote: "The supplier scorecards alone justified the investment. We dropped two chronic non-performers in the first quarter.", name: "David K.", role: "Quality Manager, Akagera Foods", initials: "DK", accent: C.violet },
];

/* ── Chart data ── */
const ccpTrend = [
  { m: "W1", v: 88, p: 90, d: 4 }, { m: "W2", v: 92, p: 91, d: 3 },
  { m: "W3", v: 90, p: 92, d: 5 }, { m: "W4", v: 95, p: 93, d: 2 },
  { m: "W5", v: 96, p: 94, d: 1 }, { m: "W6", v: 97, p: 95, d: 2 }, { m: "W7", v: 98, p: 96, d: 1 },
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

/* ── Helpers ── */
function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}
function scrollToId(id: string) {
  if (typeof document !== "undefined")
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const u = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => { window.removeEventListener("scroll", u); };
  }, []);
  return p;
}
function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("vera-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = useCallback(() => {
    const html = document.documentElement;
    html.classList.add("transitioning");
    setTimeout(() => html.classList.remove("transitioning"), 400);
    setDark(d => {
      const next = !d;
      html.classList.toggle("dark", next);
      localStorage.setItem("vera-theme", next ? "dark" : "light");
      return next;
    });
  }, []);
  return { dark, toggle };
}

/* ── Atoms ── */
function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--navy-950))] dark:bg-white/10 text-white shadow-lg">
        <span className="font-display text-base font-black tracking-tight">V</span>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))] ring-2 ring-white dark:ring-[hsl(var(--background))]" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold tracking-tight text-[hsl(var(--navy-950))] dark:text-white">Vera Systems</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">Precision food safety</p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, body, light = false, centered = false }:
  { eyebrow: string; title: string; body?: string; light?: boolean; centered?: boolean }) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")} data-reveal>
      <p className={cn("inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]",
        light ? "text-[hsl(var(--teal-light))]" : "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]")}>
        <span className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-60" />
      </p>
      <h2 className={cn("mt-5 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl",
        light ? "text-white" : "text-[hsl(var(--navy-950))] dark:text-white")}>
        {title}
      </h2>
      {body && (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
          light ? "text-white/70" : "text-[hsl(var(--muted-foreground))]",
          centered && "mx-auto")}>
          {body}
        </p>
      )}
    </div>
  );
}

/* ── Navbar ── */
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const u = () => setScrolled(window.scrollY > 32);
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => window.removeEventListener("scroll", u);
  }, []);

  useEffect(() => {
    const sections = navItems.map(i => document.getElementById(i.href)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting);
        if (vis.length) setActiveSection(vis[vis.length - 1].target.id);
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500 animate-nav")}>
      <div className={cn(
        "flex items-center mx-auto max-w-7xl px-6 justify-between gap-4 rounded-2xl border py-3 transition-all duration-500",
        scrolled
          ? "nav-scrolled border-[hsl(var(--border))]"
          : "border-transparent bg-transparent"
      )}>
        {/* Logo */}
        <button onClick={() => scrollToId("hero")} className="-ml-1 group" aria-label="Vera Systems home">
          <Logo />
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((i) => (
            <button key={i.href} onClick={() => scrollToId(i.href)}
              className={cn(
                "relative px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                activeSection === i.href
                  ? "text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))] bg-[hsl(var(--blue-100))]/60 dark:bg-[hsl(var(--blue-100))]/10"
                  : "text-[hsl(var(--navy-900))]/60 dark:text-white/60 hover:text-[hsl(var(--navy-950))] dark:hover:text-white hover:bg-[hsl(var(--muted))]/60 dark:hover:bg-white/5"
              )}>
              {i.label}
              {activeSection === i.href && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[hsl(var(--blue-500))]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button onClick={toggleDark} aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/70 dark:bg-white/5 text-[hsl(var(--muted-foreground))] dark:text-white/60 transition hover:bg-[hsl(var(--muted))] dark:hover:bg-white/10 hover:text-[hsl(var(--navy-950))] dark:hover:text-white">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button onClick={() => scrollToId("contact")}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-white/10 dark:border dark:border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-[hsl(var(--blue-700))] dark:hover:bg-white/15 active:scale-95">
            Book Demo <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button onClick={() => setOpen(v => !v)} aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-[hsl(var(--border))] bg-white/70 dark:bg-white/5 lg:hidden transition hover:bg-[hsl(var(--muted))] dark:hover:bg-white/10">
            {open ? <X className="h-4 w-4 dark:text-white" /> : <Menu className="h-4 w-4 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "mx-4 mt-2 origin-top overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white/96 dark:bg-[hsl(var(--background))]/96 backdrop-blur-xl transition-all duration-400 lg:hidden",
        open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
      )}>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map(i => (
            <button key={i.href} onClick={() => { setOpen(false); scrollToId(i.href); }}
              className={cn(
                "rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
                activeSection === i.href
                  ? "bg-[hsl(var(--blue-100))]/60 dark:bg-[hsl(var(--blue-100))]/10 text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]"
                  : "text-[hsl(var(--navy-950))] dark:text-white hover:bg-[hsl(var(--muted))]/60 dark:hover:bg-white/5"
              )}>
              {i.label}
            </button>
          ))}
          <div className="mt-1 border-t border-[hsl(var(--border))] pt-2">
            <button onClick={toggleDark}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white hover:bg-[hsl(var(--muted))]/60 flex items-center gap-3">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-28">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-fade-up">
            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-6xl lg:text-7xl">
              From compliance to{" "}
              <span className="text-gradient-blue">real-time</span> intelligence.
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              Vera unifies HACCP, ISO 22000 and live CCP monitoring into one calm interface — so food
              operations act on truth, not noise. Built for teams that move with conviction.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToId("contact")}
                className="group inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[hsl(var(--blue-700))] active:scale-95">
                Book consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => scrollToId("platform")}
                className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] dark:border-white/15 bg-white/80 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-[hsl(var(--navy-900))] dark:text-white backdrop-blur transition hover:border-[hsl(var(--blue-400))] hover:text-[hsl(var(--blue-700))] dark:hover:border-white/30 active:scale-95">
                <PlayCircle className="h-4 w-4" />
                Explore the platform
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: "98.7%", l: "audit readiness", color: C.blue },
                { k: "3.4×", l: "faster response", color: C.teal },
                { k: "240+", l: "controls monitored", color: C.violet },
              ].map((s) => (
                <div key={s.l} className="group rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 backdrop-blur transition hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] dark:hover:border-white/25 hover:shadow-md">
                  <div className="font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white"
                    style={{ color: s.color }}>{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] gradient-blue-soft dark:opacity-20 opacity-50 blur-2xl" />
              <div className="relative glass-card rounded-3xl p-5 float-soft dark:bg-[hsl(var(--card))]/80">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">CCP compliance · YTD</div>
                    <div className="mt-1 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">96.4%</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--success-light))]/80 dark:bg-[hsl(var(--success))]/20 px-2.5 py-1 text-xs font-semibold text-[hsl(var(--success))]">
                    <TrendingUp className="h-3 w-3" /> +18.4%
                  </span>
                </div>
                <div className="mt-4 h-48">
                  <ResponsiveContainer>
                    <ComposedChart data={ccpTrend} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.teal} stopOpacity={0.45} />
                          <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
                      <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis hide />
                      <Tooltip cursor={{ stroke: C.teal, strokeDasharray: 4, strokeWidth: 1 }}
                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px -10px rgba(20,40,80,.2)", fontFamily: "DM Sans, sans-serif" }} />
                      <Area type="monotone" dataKey="v" name="Actual" stroke={C.teal} strokeWidth={2.5} fill="url(#heroGrad)" />
                      <Line type="monotone" dataKey="p" name="Predicted" stroke={C.blue} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: "12", l: "CCPs OK", t: "success" as Tone },
                    { v: "1", l: "Watch", t: "warning" as Tone },
                    { v: "0", l: "Critical", t: "danger" as Tone },
                  ].map(s => (
                    <div key={s.l} className="rounded-xl border border-[hsl(var(--border))] dark:border-white/8 bg-white/70 dark:bg-white/5 p-3 text-center">
                      <p className={cn("font-display text-xl font-semibold",
                        s.t === "success" ? "text-[hsl(var(--success))]" : s.t === "warning" ? "text-[hsl(var(--warning))]" : "text-[hsl(var(--danger))]")}>{s.v}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-6 top-12 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 dark:bg-[hsl(var(--card))]/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur float-soft [animation-delay:1s]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--success))]">Alert resolved</p>
                <p className="text-[hsl(var(--navy-950))] dark:text-white">Cold room 02 stabilized</p>
              </div>
              <div className="absolute -right-4 -bottom-4 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 dark:bg-[hsl(var(--card))]/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">Audit ready</p>
                <p className="text-[hsl(var(--navy-950))] dark:text-white">ISO 22000 — 96%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Clients marquee ── */
function ClientTypes() {
  const clients = useMemo(() => ["Processors", "Restaurants", "Exporters", "Manufacturers", "Hotels", "Catering firms", "Cloud kitchens", "Cold chain"], []);
  const doubled = [...clients, ...clients];
  return (
    <section className="relative border-y border-[hsl(var(--border))] bg-white dark:bg-[hsl(var(--muted))]/30 py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
          Trusted by food businesses across Rwanda &amp; East Africa
        </p>
        <div className="marquee-track mt-8 overflow-hidden">
          <div className="marquee">
            {doubled.map((c, i) => (
              <div key={`${c}-${i}`} className="flex flex-none items-center gap-3 text-[hsl(var(--navy-900))]/45 dark:text-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--teal))]" />
                <span className="font-display text-base font-extrabold tracking-tight">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[hsl(var(--muted))]/40 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-35 dark:opacity-25" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/50 dark:bg-[hsl(var(--blue-700))]/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div data-reveal className="reveal-delay-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85"
              alt="Food safety lab" className="h-full w-full object-cover transition duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 dark:bg-[hsl(var(--card))]/92 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--teal))]">Established</p>
              <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Kigali · Rwanda</p>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="About Vera"
            title="A food-safety company with engineering DNA"
            body="We sit at the intersection of HACCP science and operational data. Our work helps food businesses shift from end-of-shift reviews to real-time control, with audit-ready evidence on demand."
          />
          <div className="mt-10 relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/70 dark:bg-white/5 p-6 backdrop-blur shadow-vera" data-reveal>
            <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[hsl(var(--teal))] via-[hsl(var(--blue-400))] to-transparent rounded-l-3xl" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--teal))]">Mission</p>
            <p className="mt-3 text-lg italic leading-relaxed text-[hsl(var(--navy-950))] dark:text-white text-balance">
              "To elevate food safety across Rwanda and East Africa through scientific rigor and data-driven systems that improve compliance, efficiency, and trust."
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoPill title="Scientific rigor" body="Standards-based methods, validated controls, and verifiable records." accent={C.blue} />
            <InfoPill title="Operational fit" body="Procedures designed for the realities of kitchens, factories, and cold chains." accent={C.teal} />
          </div>
          <div className="mt-6 flex items-center gap-8 rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white/50 dark:bg-white/4 px-6 py-4 backdrop-blur" data-reveal>
            {[{ k: "5+", l: "Years experience" }, { k: "140+", l: "Audits completed" }, { k: "60+", l: "Client operations" }].map((s, i) => (
              <div key={s.l} className="text-center flex-1">
                <p className="font-display text-2xl font-semibold" style={{ color: [C.blue, C.teal, C.violet][i] }}>{s.k}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <div className="glass-card hover-lift rounded-2xl p-5 dark:border-white/8" data-reveal>
      <div className="mb-2 h-0.5 w-8 rounded-full" style={{ background: accent }} />
      <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
    </div>
  );
}

/* ── Services — redesigned card layout ── */
function Services() {
  return (
    <section id="services" className="relative bg-white dark:bg-[hsl(var(--muted))]/20 py-28 overflow-hidden">
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/50 dark:bg-[hsl(var(--teal))]/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow="Services"
          title="Two disciplines. One operating system for food safety."
          body="Choose what your operation needs today — and scale into the rest as you grow."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <article key={s.title} data-reveal
                className={cn("group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] shadow-vera transition-all duration-500 hover:-translate-y-2 hover:shadow-glow", `reveal-delay-${idx + 1}`)}>

                {/* Color accent top bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${s.accent}, ${s.accent}88)` }} />

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                        style={{ background: s.accent }}>
                        <Icon className="h-3.5 w-3.5" />
                        {s.label}
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white text-balance">{s.title}</h3>
                    </div>
                    {/* Stat badge */}
                    <div className="flex-none rounded-2xl border px-4 py-3 text-center"
                      style={{ borderColor: `${s.accent}40`, background: `${s.accent}0d` }}>
                      <p className="font-display text-2xl font-bold" style={{ color: s.accent }}>{s.stat.value}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.stat.label}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-relaxed" style={{ color: s.accent }}>{s.impact}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{s.body}</p>

                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.bullets.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[hsl(var(--navy-900))] dark:text-white/80">
                        <span className="mt-0.5 flex-none h-4 w-4 rounded-full flex items-center justify-center"
                          style={{ background: `${s.accent}20` }}>
                          <CheckCircle2 className="h-3.5 w-3.5" style={{ color: s.accent }} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Divider + CTA */}
                  <div className="mt-6 pt-5 border-t border-[hsl(var(--border))] dark:border-white/8 flex items-center justify-between">
                    <button onClick={() => scrollToId("contact")}
                      className="group/btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition active:scale-95"
                      style={{ background: s.accent }}>
                      Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
                    </button>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full opacity-15 group-hover:opacity-30 transition-opacity">
                      <div className="absolute inset-0 rounded-full" style={{ background: s.accent }} />
                    </div>
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

/* ── Stack Experience ── */
function StackExperience() {
  const [activeStep, setActiveStep] = useState(0);
  const step = stackCards[activeStep];

  return (
    <section className="relative bg-[hsl(var(--navy-950))] py-28 overflow-hidden text-white">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="aurora opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          light
          eyebrow="How it works"
          title="A four-step path to data-driven food safety"
          body="From the first kitchen walkthrough to a live operations dashboard — designed to fit how your team already works."
        />

        {/* Step selector */}
        <div className="mt-14 flex flex-wrap gap-3" data-reveal>
          {stackCards.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)}
              className={cn(
                "rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 border",
                activeStep === i
                  ? "bg-white text-[hsl(var(--navy-950))] border-white shadow-lg"
                  : "border-white/15 text-white/55 hover:border-white/35 hover:text-white"
              )}>
              <span className="font-mono">{c.eyebrow}</span> / {c.title.split(" ").slice(0, 3).join(" ")}…
            </button>
          ))}
        </div>

        {/* Active step */}
        <div key={activeStep} className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_0.5fr] animate-fade-up">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="flex-none hidden sm:block">
                {/* Big colorful step number — new accent approach */}
                <span className="font-display text-7xl font-black leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.colorLight})`,
                    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                  }}>
                  {step.eyebrow}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: step.colorLight }}>Step {step.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">{step.body}</p>
              </div>
            </div>
            {/* Progress dots */}
            <div className="mt-8 flex gap-2">
              {stackCards.map((_, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeStep ? "2rem" : "0.75rem",
                    background: i === activeStep ? step.color : "rgba(255,255,255,.25)"
                  }} />
              ))}
            </div>
          </div>
          {/* Metric card */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 flex flex-col items-center justify-center text-center backdrop-blur-xl">
              <p className="font-display text-5xl font-black" style={{ color: step.color }}>{step.metric}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: step.colorLight }}>{step.label}</p>
            </div>
            <button onClick={() => setActiveStep((activeStep + 1) % stackCards.length)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white flex items-center justify-between backdrop-blur-xl">
              Next step <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* All steps grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackCards.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)} data-reveal
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                `reveal-delay-${(i % 4) + 1}`,
                activeStep === i
                  ? "border-white/25 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.05]"
              )}>
              {/* Colored top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-300"
                style={{ background: activeStep === i ? c.color : "transparent" }} />
              <span className="font-display text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${c.color}, ${c.colorLight})`,
                  WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                }}>
                {c.eyebrow}
              </span>
              <p className="mt-1 text-sm font-semibold text-white/80">{c.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Platform Demo ── */
function PlatformDemo() {
  return (
    <section id="platform" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/55 dark:bg-[hsl(var(--blue-700))]/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader eyebrow="The Platform" title="One workspace. Every signal that matters." />
          <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white/70 dark:bg-white/5 p-6 backdrop-blur max-w-sm" data-reveal>
            <p className="text-base italic leading-relaxed text-[hsl(var(--navy-950))]/80 dark:text-white/80">
              "Not a report, but a control center. Every deviation logged, every supplier scored, every CCP visible — in real time."
            </p>
            <button onClick={() => scrollToId("contact")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[hsl(var(--blue-700))] active:scale-95">
              Request live demo <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bar chart + radar side by side */}
          <div className="glass-card hover-lift rounded-3xl p-6 lg:col-span-2 dark:border-white/8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">Segment performance</h3>
                  <BarChart3 className="h-4 w-4" style={{ color: C.blue }} />
                </div>
                <div className="h-52">
                  <ResponsiveContainer>
                    <BarChart data={segmentData} barGap={4}>
                      <defs>
                        <linearGradient id="barActual" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.blue} />
                          <stop offset="100%" stopColor={C.teal} />
                        </linearGradient>
                        <linearGradient id="barTarget" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={C.violet} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={C.violet} stopOpacity={0.15} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                      <Tooltip cursor={{ fill: "rgba(30,58,95,.04)" }} contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                      <Bar dataKey="v" name="Score" fill="url(#barActual)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="b" name="Target" fill="url(#barTarget)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">Compliance radar</h3>
                  <Eye className="h-4 w-4" style={{ color: C.teal }} />
                </div>
                <div className="h-52">
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(30,58,95,.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Vera" dataKey="A" stroke={C.teal} fill={C.teal} fillOpacity={0.25} strokeWidth={2} />
                      <Radar name="Industry" dataKey="B" stroke={C.violet} fill={C.violet} fillOpacity={0.12} strokeWidth={1.5} strokeDasharray="4 4" />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                      <Legend iconSize={8} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans, sans-serif" }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Feature pills */}
          <div className="space-y-4">
            {[
              { i: Shield, t: "ISO 22000 ready", d: "Audit-grade evidence by default.", color: C.blue },
              { i: Zap, t: "Realtime sync", d: "Sub-second across sites.", color: C.teal },
              { i: Clock, t: "5-min setup", d: "From signup to first insight.", color: C.violet },
            ].map(({ i: Icon, t, d, color }) => (
              <div key={t} className="glass-card hover-lift flex items-start gap-4 rounded-2xl p-5 dark:border-white/8">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-xl text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--navy-950))] dark:text-white">{t}</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">{d}</div>
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
      <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-[hsl(var(--border))] dark:border-white/10 pb-0" data-reveal>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={cn(
              "relative whitespace-nowrap pb-4 px-5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 rounded-t-lg",
              active === t.id
                ? "text-[hsl(var(--navy-950))] dark:text-white bg-[hsl(var(--muted))]/40 dark:bg-white/5"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-900))] dark:hover:text-white/80"
            )}>
            {t.label}
            {active === t.id && (
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

function HealthStatCard({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const colors = {
    success: { text: "text-[hsl(var(--success))]", bg: "bg-[hsl(var(--success-light))]/60 dark:bg-[hsl(var(--success))]/15", border: "border-[hsl(var(--success))]/20" },
    warning: { text: "text-[hsl(var(--warning))]", bg: "bg-[hsl(var(--warning-light))]/60 dark:bg-[hsl(var(--warning))]/15", border: "border-[hsl(var(--warning))]/20" },
    danger: { text: "text-[hsl(var(--danger))]", bg: "bg-[hsl(var(--danger-light))]/60 dark:bg-[hsl(var(--danger))]/15", border: "border-[hsl(var(--danger))]/20" },
  }[tone];
  return (
    <div className={cn("rounded-2xl border px-4 py-3 text-center", colors.bg, colors.border)}>
      <p className={cn("font-display text-2xl font-semibold", colors.text)}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</p>
    </div>
  );
}

function CCPCard({ name, value, unit, range, status, tone }:
  { name: string; value: string; unit: string; range: string; status: string; tone: Tone }) {
  const accentColor = tone === "success" ? C.green : tone === "warning" ? C.amber : C.red;
  const w = tone === "success" ? "78%" : tone === "warning" ? "42%" : "18%";
  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      style={{ borderTopColor: accentColor, borderTopWidth: 2 }}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{name}</p>
        <span className="inline-block h-2.5 w-2.5 rounded-full animate-pulse-dot" style={{ background: accentColor }} />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
        {value}<span className="ml-1 text-base text-[hsl(var(--muted-foreground))]">{unit}</span>
      </p>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Range {range}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: w, background: accentColor }} />
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
    <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.green }}>
            <span className="inline-block h-2 w-2 rounded-full animate-pulse-dot" style={{ background: C.green }} /> Live system
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Critical Control Point Dashboard</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Auto-refreshing · updated 14 seconds ago</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <HealthStatCard value="12" label="Within range" tone="success" />
          <HealthStatCard value="1" label="Watch" tone="warning" />
          <HealthStatCard value="0" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CCPCard name="Cold Storage 01" value="3.8" unit="°C" range="0–5°C" status="Within range" tone="success" />
        <CCPCard name="Pasteurization" value="74.2" unit="°C" range="≥72°C" status="Within range" tone="success" />
        <CCPCard name="Receiving Dock" value="9.4" unit="°C" range="0–7°C" status="Watch" tone="warning" />
      </div>

      {/* Two charts side by side */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/30 dark:bg-white/3 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">30-day CCP trend</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.green }}>+18% in-range</p>
          </div>
          <div className="h-36">
            <ResponsiveContainer>
              <AreaChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ccpAreaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={C.teal} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(30,58,95,.06)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
                <Area type="monotone" dataKey="v" name="CCP Score" stroke={C.teal} strokeWidth={2.5} fill="url(#ccpAreaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie chart of CCP status */}
        <div className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/30 dark:bg-white/3 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">Status breakdown</p>
          <div className="h-36 flex items-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} cx="40%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
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
    ["danger", "Receiving Dock temperature breach", "Raw milk delivery registered above accepted receiving limit. Corrective action required.", "Now", "Critical"],
    ["warning", "Sanitation verification pending", "Line 2 supervisor sign-off is 18 minutes overdue.", "18m", "Watch"],
    ["success", "Cold room fluctuation resolved", "Automated alert closed after two stable readings within safe range.", "1h", "Resolved"],
  ];
  const toneColor = (t: Tone) => t === "danger" ? C.red : t === "warning" ? C.amber : C.green;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Deviation response trend</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Open issues by severity and response speed.</p>
        {/* Composed chart: area + bar */}
        <div className="mt-6 h-48">
          <ResponsiveContainer>
            <ComposedChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="devGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={C.blue} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={C.blue} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(30,58,95,.06)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Area type="monotone" dataKey="v" name="Score" stroke={C.blue} strokeWidth={2} fill="url(#devGrad)" />
              <Bar dataKey="d" name="Deviations" fill={C.red} radius={[4, 4, 0, 0]} opacity={0.75} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <HealthStatCard value="68%" label="Faster response" tone="success" />
          <HealthStatCard value="03" label="Open" tone="warning" />
          <HealthStatCard value="01" label="Critical" tone="danger" />
        </div>
      </div>

      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Alert timeline</p>
        <ul className="mt-5 space-y-4">
          {items.map(([t, title, body, time, badge]) => (
            <li key={title} className="flex gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5"
              style={{
                borderColor: `${toneColor(t)}28`,
                background: `${toneColor(t)}08`,
              }}>
              <span className="mt-1.5 inline-block h-2.5 w-2.5 flex-none rounded-full animate-pulse-dot" style={{ background: toneColor(t) }} />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
              </div>
              <div className="flex-none text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{time}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: toneColor(t) }}>{badge}</p>
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
  const scoreColor = (s: number) => s >= 90 ? C.green : s >= 80 ? C.blue : C.amber;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-[hsl(var(--navy-950))] dark:text-white">Supplier risk index</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Weighted score: receiving temperature, document completeness, rejection rate, corrective-action closure.</p>
        {/* Line chart for supplier trend */}
        <div className="mt-6 h-52">
          <ResponsiveContainer>
            <LineChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="supLine" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={C.green} />
                  <stop offset="100%" stopColor={C.teal} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(30,58,95,.07)" vertical={false} />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis domain={[80, 100]} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "DM Sans, sans-serif" }} />
              <Line type="monotone" dataKey="v" name="Avg Score" stroke="url(#supLine)" strokeWidth={2.5} dot={{ r: 3, fill: C.teal }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 content-start">
        {suppliers.map(([name, cat, score, tier]) => (
          <div key={name} className="rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md group"
            style={{ borderLeftColor: scoreColor(score), borderLeftWidth: 3 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white">{name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{cat}</p>
              </div>
              <p className="font-display text-3xl font-semibold" style={{ color: scoreColor(score) }}>{score}</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: scoreColor(score) }} />
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: scoreColor(score) }}>{tier}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsDashboard() {
  const reports: Array<[string, string, string, string]> = [
    ["PDF", "HACCP Audit Report", "Full CCP audit log with corrective actions, sign-offs, and compliance ratings.", C.blue],
    ["DASH", "Monthly CCP Summary", "Trend analysis across control points, deviation frequency, and response times.", C.teal],
    ["LOG", "Real-Time Hygiene Log", "Timestamped sanitation records replacing paper logs and manual sign-offs.", C.green],
    ["ISO", "ISO 22000 Gap Analysis", "Clause-by-clause readiness report with remediation priorities.", C.violet],
    ["REP", "Supplier Scorecard", "Quarterly supplier performance and corrective-action status.", C.amber],
    ["API", "Custom Dashboard Export", "Structured data export for management reporting or ERP connection.", C.red],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(([badge, title, body, color]) => (
        <article key={title} className="group rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-vera overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
          <span className="inline-flex rounded-lg px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-white"
            style={{ background: color }}>
            {badge}
          </span>
          <p className="mt-4 font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white text-balance">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
          <button onClick={() => scrollToId("contact")}
            className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] transition"
            style={{ color }}>
            View artifact <ArrowRight className="h-3 w-3" />
          </button>
        </article>
      ))}
    </div>
  );
}

/* ── Testimonials ── */
function Testimonials() {
  return (
    <section className="relative bg-white dark:bg-[hsl(var(--background))] py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow="Results in the field"
          title="What happens when food teams run on data"
          body="From Kigali processors to regional hotel chains — the same pattern emerges: visibility drives action."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} data-reveal className={cn("relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-7 shadow-vera transition hover:-translate-y-1 hover:shadow-glow", `reveal-delay-${i + 1}`)}>
              <div className="absolute -right-3 -top-3 font-display text-9xl font-black text-[hsl(var(--blue-100))] dark:text-white/5 leading-none select-none">"</div>
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5" style={{ fill: t.accent, color: t.accent }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-[hsl(var(--navy-900))] dark:text-white/85 italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}aa)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">{t.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.role}</p>
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

/* ── Insights ── */
function Insights() {
  const [feature, ...rows] = insights;
  return (
    <section id="insights" className="bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--muted))]/15 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <SectionHeader eyebrow="Insights" title="Thinking from the field." body="Operational intelligence from real food businesses navigating compliance and growth." />
          <a href="#" className="hidden text-sm font-semibold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))] hover:underline md:inline story-link">All articles →</a>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <InsightFeatured item={feature} />
          <div className="space-y-5 lg:col-span-5">
            {rows.map(it => <InsightRow key={it.title} item={it} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightFeatured({ item }: { item: typeof insights[number] }) {
  return (
    <a href="#" data-reveal className="group relative col-span-12 overflow-hidden rounded-3xl lg:col-span-7">
      <div className="relative h-[520px] w-full overflow-hidden rounded-3xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/92 via-[hsl(var(--navy-950))]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-8 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white backdrop-blur"
            style={{ background: `${C.teal}88`, border: `1px solid ${C.teal}66` }}>{item.tag}</span>
          <h3 className="mt-4 font-display text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">{item.title}</h3>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <span>{item.read}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="inline-flex items-center gap-1" style={{ color: C.tealLt }}>
              Read story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function InsightRow({ item }: { item: typeof insights[number] }) {
  return (
    <a href="#" data-reveal className="group relative flex items-stretch gap-5 overflow-hidden rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] dark:hover:border-white/20 hover:shadow-vera">
      <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="flex flex-1 flex-col justify-center pr-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: C.teal }}>{item.tag}</span>
        <h4 className="mt-1 text-balance text-base font-semibold leading-snug text-[hsl(var(--navy-950))] dark:text-white transition-colors group-hover:text-[hsl(var(--blue-700))] dark:group-hover:text-[hsl(var(--blue-300))]">{item.title}</h4>
        <span className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.read}</span>
      </div>
    </a>
  );
}

/* ── Why Vera ── */
function WhyVera() {
  return (
    <section id="why" className="relative bg-white dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow="Why Vera"
          title="Built around how food businesses actually run"
          body="Four principles that shape every engagement, every dashboard, and every recommendation we deliver."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <article key={c.title} data-reveal
                className={cn("glass-card hover-lift group relative overflow-hidden rounded-3xl p-6 dark:border-white/8", `reveal-delay-${(i % 4) + 1}`)}>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ background: c.accent }} />
                <div className="relative">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md"
                    style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] font-mono font-bold tracking-[0.22em]" style={{ color: c.accent }}>0{i + 1}</p>
                  <h3 className="mt-2 font-display text-base font-extrabold text-[hsl(var(--navy-950))] dark:text-white text-balance">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{c.body}</p>
                  <div className="mt-5 h-0.5 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ width: "2rem", background: c.accent }} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-20">
      <div className="aurora opacity-35" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative mx-auto max-w-5xl px-6 text-center" data-reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">Get started</p>
        <h2 className="mt-5 font-display text-4xl font-semibold text-white text-balance md:text-5xl">
          Ready to move from paper logs to live intelligence?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65">
          Join food operations across East Africa that have replaced end-of-shift reviews with real-time control.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => scrollToId("contact")}
            className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[hsl(var(--navy-950))] transition hover:bg-[hsl(var(--blue-100))] active:scale-95">
            Book a consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button onClick={() => scrollToId("platform")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95">
            <PlayCircle className="h-4 w-4" />
            See the platform
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 dark:bg-[hsl(var(--background))] py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/55 dark:bg-[hsl(var(--teal))]/6 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center" data-reveal>
          <SectionHeader
            centered
            eyebrow="Get in touch"
            title="Start with clarity. Move to control."
            body="Book a consultation and find out how Vera Systems can transform your compliance operations with real-time intelligence."
          />
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-8 shadow-vera" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.teal }}>Talk to us</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Ready to elevate your food safety?</h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Tell us about your operation and we'll come back with a tailored plan within two business days.
            </p>
            <div className="mt-6 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: `${C.green}18`, border: `1px solid ${C.green}30` }}>
              <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ background: C.green }} />
              <span className="text-xs font-semibold" style={{ color: C.green }}>Typically responds within 4 hours</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Mail className="h-4 w-4" />, text: "hello@verasystems.rw" },
                { icon: <Phone className="h-4 w-4" />, text: "+250 788 000 000" },
                { icon: <MapPin className="h-4 w-4" />, text: "Kigali, Rwanda" },
                { icon: <Clock className="h-4 w-4" />, text: "Mon–Fri · 08:00–18:00 CAT" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] dark:border-white/8 bg-[hsl(var(--muted))]/50 dark:bg-white/3 px-4 py-3 transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-300))] dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/6">
                  <span className="grid h-9 w-9 place-items-center rounded-full text-white"
                    style={{ background: `${C.blue}22`, color: C.blue }}>
                    {icon}
                  </span>
                  <span className="text-sm font-semibold text-[hsl(var(--navy-950))]/80 dark:text-white/80">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] dark:border-white/8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">Trusted by teams in</p>
              <div className="flex flex-wrap gap-2">
                {["Rwanda", "Uganda", "Kenya", "Tanzania"].map(c => (
                  <span key={c} className="rounded-full border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/50 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-[hsl(var(--navy-900))] dark:text-white/80">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading"); setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({ ok: res.ok }));
      if (!res.ok || result.ok === false) throw new Error(result.message || "Could not send message.");
      setStatus("success");
      setMessage("Message sent. Vera Systems will get back to you shortly.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send message. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} data-reveal className="rounded-3xl border border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--card))] p-8 shadow-vera">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.blue }}>Send a message</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">Tell us about your operation</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" placeholder="Your name" required />
        <FormField label="Company" name="company" placeholder="Company name" required />
        <FormField label="Work email" name="email" placeholder="you@company.rw" type="email" required />
        <FormField label="Phone" name="phone" placeholder="+250 …" type="tel" />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Service interest</label>
          <select name="interest" className="w-full rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8">
            <option value="consultancy">Food Safety Consultancy</option>
            <option value="platform">Digital Intelligence Platform</option>
            <option value="demo">Platform Demo Request</option>
            <option value="both">Both Services</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Message</label>
          <textarea name="message" rows={4} placeholder="Tell us about your operation, scale, and current pain points."
            className="w-full resize-none rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8" />
        </div>
      </div>
      <button type="submit" disabled={status === "loading"}
        className="mt-6 w-full rounded-xl bg-[hsl(var(--navy-950))] dark:bg-[hsl(var(--blue-500))] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[hsl(var(--blue-700))] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {message && (
        <p className={cn("mt-4 rounded-2xl border px-4 py-3 text-sm",
          status === "success" ? "border-[hsl(var(--success))]/30 bg-[hsl(var(--success-light))]/30 text-[hsl(var(--success))]" : "border-[hsl(var(--danger))]/30 bg-[hsl(var(--danger-light))]/30 text-[hsl(var(--danger))]")}>
          {message}
        </p>
      )}
    </form>
  );
}

function FormField({ label, name, placeholder, type = "text", required = false }:
  { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-[hsl(var(--border))] dark:border-white/10 bg-[hsl(var(--muted))]/30 dark:bg-white/5 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white dark:focus:bg-white/8" />
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] dark:border-white/8 bg-white dark:bg-[hsl(var(--muted))]/20 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Precision food safety for East Africa. HACCP science meets real-time operational intelligence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {[
              { heading: "Company", links: ["About", "Services", "Platform", "Why Vera"] },
              { heading: "Resources", links: ["Insights", "Case studies", "Documentation", "Pricing"] },
              { heading: "Legal", links: ["Privacy policy", "Terms of service", "Cookie policy"] },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: C.teal }}>{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="story-link text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))] dark:hover:text-white">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] dark:border-white/8 pt-6 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">© 2026 Vera Systems Ltd. · Kigali, Rwanda · All rights reserved.</p>
          <div className="flex gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">LinkedIn</a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))] dark:hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function Page() {
  const progress = useScrollProgress();
  const { dark, toggle } = useDarkMode();
  useRevealOnScroll();

  return (
    <main className="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
        <div className="h-full transition-[width] duration-150"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${C.teal}, ${C.blue}, ${C.violet})`,
          }} />
      </div>

      <Navbar dark={dark} toggleDark={toggle} />
      <Hero />
      <ClientTypes />
      <About />
      <Services />
      <StackExperience />
      <PlatformDemo />
      <Testimonials />
      <Insights />
      <WhyVera />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}