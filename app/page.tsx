"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight, PlayCircle, Sparkles, TrendingUp, Shield, Zap, BarChart3,
  Clock, CheckCircle2, AlertTriangle, Activity, Mail, Phone, MapPin, Menu, X,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip,
} from "recharts";

/* ============================================================================
 * Vera Systems — single-page marketing site (Next.js + Tailwind + Recharts)
 * Drop into app/page.tsx. Pair with the included globals.css + tailwind config.
 * ========================================================================== */

type DemoTab = "ccp" | "deviations" | "suppliers" | "reports";

const BLUE = { deep: "#1e3a5f", mid: "#4a7baf", light: "#7fb3e8", pale: "#c8dcf0" };
const GREEN = "#22c55e";

/* ---------- Data ---------- */

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
    body: "Manual CCP logging often creates a time gap between breach, detection, and corrective action — risk that looks compliant on paper but late in practice.",
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
  { title: "Precision food safety", body: "Recommendations are tied to HACCP control points, ISO clauses, audit evidence, or operating data — not generic consulting frameworks." },
  { title: "Real-time risk visibility", body: "Dashboards replace scattered paper logs so the team can see CCP status, deviation alerts, and corrective action progress from any device." },
  { title: "Compliance-to-data mapping", body: "Every audit finding becomes a measurable system output, making compliance easier to verify and management decisions easier to defend." },
  { title: "Built for East African operations", body: "Designed around local supply-chain realities, food-business constraints, and the pace of kitchens, factories, hotels, and processors." },
];

const stackCards = [
  { eyebrow: "01 / Diagnose", title: "Map the real operating risk", body: "We start on the kitchen or factory floor: CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.", metric: "72h", label: "first-risk snapshot" },
  { eyebrow: "02 / Systemize", title: "Turn compliance into workflow", body: "Your procedures become practical checklists, live controls, escalation paths, and evidence trails that your team can use every day.", metric: "4×", label: "faster evidence retrieval" },
  { eyebrow: "03 / Monitor", title: "Visualize performance in real time", body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators before issues turn into incidents.", metric: "Live", label: "CCP intelligence" },
  { eyebrow: "04 / Improve", title: "Use data to reduce repeat failures", body: "Management receives trends, corrective-action loops, supplier patterns, and practical recommendations tied directly to operational outcomes.", metric: "ISO", label: "audit-ready reporting" },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "ccp", label: "Live CCP" },
  { id: "deviations", label: "Deviations" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

/* Recharts datasets */
const ccpTrend = [
  { m: "W1", v: 88, p: 90 }, { m: "W2", v: 92, p: 91 }, { m: "W3", v: 90, p: 92 },
  { m: "W4", v: 95, p: 93 }, { m: "W5", v: 96, p: 94 }, { m: "W6", v: 97, p: 95 }, { m: "W7", v: 98, p: 96 },
];
const segmentData = [
  { name: "Processors", v: 86 }, { name: "Restaurants", v: 64 },
  { name: "Hotels", v: 47 }, { name: "Cold chain", v: 72 },
];

/* ---------- Helpers ---------- */

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
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
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
    u(); window.addEventListener("scroll", u, { passive: true }); window.addEventListener("resize", u);
    return () => { window.removeEventListener("scroll", u); window.removeEventListener("resize", u); };
  }, []);
  return p;
}

/* ---------- Atoms ---------- */

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--navy-950))] text-white shadow-md">
        <span className="text-base font-black tracking-tight">V</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-white" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-extrabold tracking-tight text-[hsl(var(--navy-950))] dark:text-white">Vera Systems</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--blue-700))]">Precision food safety</p>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, body, light = false, centered = false }:
  { eyebrow: string; title: string; body?: string; light?: boolean; centered?: boolean }) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")} data-reveal>
      <p className={cn("inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em]",
        light ? "text-[hsl(var(--blue-300))]" : "text-[hsl(var(--blue-700))]")}>
        <span className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2 className={cn("mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl",
        light ? "text-white" : "text-[hsl(var(--navy-950))] dark:text-white")}>
        {title}
      </h2>
      {body && (
        <p className={cn("mt-5 max-w-2xl text-base leading-relaxed md:text-lg",
          light ? "text-[hsl(var(--blue-100))]/80" : "text-[hsl(var(--muted-foreground))]",
          centered && "mx-auto")}>
          {body}
        </p>
      )}
    </div>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const u = () => setScrolled(window.scrollY > 24);
    u(); window.addEventListener("scroll", u, { passive: true });
    return () => window.removeEventListener("scroll", u);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
      <div className={cn(
        "mx-4 flex items-center justify-between gap-4 rounded-full border px-5 py-3 transition-all duration-500",
        scrolled
          ? "border-[hsl(var(--border))] bg-white/85 shadow-vera backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}>
        <button onClick={() => scrollToId("hero")} className="-ml-1" aria-label="Vera Systems home">
          <Logo />
        </button>
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((i) => (
            <button key={i.href} onClick={() => scrollToId(i.href)}
              className="story-link text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--navy-900))]/70 transition hover:text-[hsl(var(--navy-950))]">
              {i.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => scrollToId("contact")}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[hsl(var(--navy-950))] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-900/20 transition hover:bg-[hsl(var(--blue-700))]">
            Book Demo <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setOpen(v => !v)} aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--border))] bg-white/70 lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className={cn(
        "mx-4 mt-2 origin-top overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
        open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(i => (
            <button key={i.href} onClick={() => { setOpen(false); scrollToId(i.href); }}
              className="rounded-xl px-3 py-3 text-left text-sm font-semibold text-[hsl(var(--navy-950))] hover:bg-[hsl(var(--blue-100))]/50">
              {i.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-28">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--blue-100))] bg-white/70 px-4 py-1.5 text-xs font-medium text-[hsl(var(--blue-700))] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              New · Vera Intelligence v4 is live
              <span className="mx-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue-500))] animate-pulse-dot" />
            </div>

            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-[hsl(var(--navy-950))] md:text-6xl lg:text-7xl">
              From compliance to{" "}
              <span className="text-gradient-blue">real-time</span> intelligence.
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              Vera unifies HACCP, ISO 22000 and live CCP monitoring into one calm interface — so food
              operations act on truth, not noise. Built for teams that move with conviction.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollToId("contact")}
                className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--navy-950))] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition hover:bg-[hsl(var(--blue-700))]">
                Book consultation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => scrollToId("platform")}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/80 px-6 py-3.5 text-sm font-medium text-[hsl(var(--navy-900))] backdrop-blur transition hover:border-[hsl(var(--blue-400))] hover:text-[hsl(var(--blue-700))]">
                <PlayCircle className="h-4 w-4" />
                Explore the platform
              </button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                { k: "98.7%", l: "audit readiness" },
                { k: "3.4×", l: "faster response" },
                { k: "240+", l: "controls monitored" },
              ].map((s) => (
                <div key={s.l} className="group rounded-2xl border border-[hsl(var(--border))] bg-white/70 px-4 py-3 backdrop-blur transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-400))] hover:shadow-md">
                  <div className="text-xl font-semibold text-[hsl(var(--navy-950))]">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] gradient-blue-soft opacity-60 blur-2xl" />
              <div className="relative glass-card rounded-3xl p-5 float-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">CCP compliance · YTD</div>
                    <div className="mt-1 text-3xl font-semibold text-[hsl(var(--navy-950))]">96.4%</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--blue-100))]/60 px-2.5 py-1 text-xs font-medium text-[hsl(var(--blue-700))]">
                    <TrendingUp className="h-3 w-3" /> +18.4%
                  </span>
                </div>
                <div className="mt-4 h-48">
                  <ResponsiveContainer>
                    <AreaChart data={ccpTrend} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor={BLUE.mid} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={BLUE.mid} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#e6eef7" vertical={false} />
                      <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#6b7c93", fontSize: 11 }} />
                      <YAxis hide />
                      <Tooltip cursor={{ stroke: BLUE.light, strokeDasharray: 4 }}
                        contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px -10px rgba(20,40,80,.2)" }} />
                      <Area type="monotone" dataKey="v" stroke={BLUE.deep} strokeWidth={2.5} fill="url(#g1)" />
                      <Area type="monotone" dataKey="p" stroke={BLUE.light} strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: "12", l: "CCPs OK", t: "success" as const },
                    { v: "1", l: "Watch", t: "warning" as const },
                    { v: "0", l: "Critical", t: "danger" as const },
                  ].map(s => (
                    <div key={s.l} className="rounded-xl border border-[hsl(var(--border))] bg-white/70 p-3 text-center">
                      <p className={cn("text-xl font-semibold",
                        s.t === "success" ? "text-success" : s.t === "warning" ? "text-warning" : "text-danger")}>{s.v}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -left-6 top-12 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur float-soft">
                <p className="text-[10px] uppercase tracking-[0.2em] text-success">Alert resolved</p>
                <p className="text-[hsl(var(--navy-950))]">Cold room 02 stabilized</p>
              </div>
              <div className="absolute -right-4 -bottom-4 hidden md:block rounded-2xl border border-[hsl(var(--border))] bg-white/90 px-4 py-3 text-xs font-semibold shadow-md backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-700))]">Audit ready</p>
                <p className="text-[hsl(var(--navy-950))]">ISO 22000 — 96%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Clients marquee ---------- */

function ClientTypes() {
  const clients = useMemo(
    () => ["Processors", "Restaurants", "Exporters", "Manufacturers", "Hotels", "Catering firms", "Cloud kitchens", "Cold chain"],
    []
  );
  const doubled = [...clients, ...clients];
  return (
    <section className="border-y border-[hsl(var(--border))] bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-700))]">
          Trusted by food businesses across Rwanda &amp; East Africa
        </p>
        <div className="marquee-track mt-8 overflow-hidden">
          <div className="marquee">
            {doubled.map((c, i) => (
              <div key={`${c}-${i}`} className="flex flex-none items-center gap-3 text-[hsl(var(--navy-900))]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue-500))]" />
                <span className="text-base font-extrabold tracking-tight">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[hsl(var(--muted))]/40 py-28">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85"
              alt="Food safety lab" className="h-full w-full object-cover transition duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Established</p>
              <p className="text-2xl font-semibold text-[hsl(var(--navy-950))]">Kigali · Rwanda</p>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="About Vera"
            title="A food-safety company with engineering DNA"
            body="We sit at the intersection of HACCP science and operational data. Our work helps food businesses shift from end-of-shift reviews to real-time control, with audit-ready evidence on demand."
          />
          <div className="mt-10 rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-6 backdrop-blur" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Mission</p>
            <p className="mt-3 text-lg italic leading-relaxed text-[hsl(var(--navy-950))] text-balance">
              "To elevate food safety across Rwanda and East Africa through scientific rigor and data-driven systems that improve compliance, efficiency, and trust."
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoPill title="Scientific rigor" body="Standards-based methods, validated controls, and verifiable records." />
            <InfoPill title="Operational fit" body="Procedures designed for the realities of kitchens, factories, and cold chains." />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card hover-lift rounded-2xl p-5" data-reveal>
      <p className="text-sm font-extrabold text-[hsl(var(--navy-950))]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
    </div>
  );
}

/* ---------- Services ---------- */

function Services() {
  return (
    <section id="services" className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Services"
          title="Two disciplines. One operating system for food safety."
          body="Choose what your operation needs today — and scale into the rest as you grow."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((s, idx) => (
            <article key={s.title} data-reveal
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera transition hover:-translate-y-1 hover:shadow-glow hover:border-[hsl(var(--blue-400))]",
                `reveal-delay-${idx + 1}`
              )}>
              <div className="relative aspect-[16/8] overflow-hidden">
                <img src={s.image} alt="" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/80 via-[hsl(var(--navy-950))]/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--navy-950))] backdrop-blur">{s.label}</span>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-semibold text-[hsl(var(--navy-950))] text-balance">{s.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[hsl(var(--blue-700))]">{s.impact}</p>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{s.body}</p>
                <ul className="mt-6 space-y-2">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[hsl(var(--navy-900))]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-success" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- StackExperience (How it works) ---------- */

function StackExperience() {
  return (
    <section className="relative bg-[hsl(var(--muted))]/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="A four-step path to data-driven food safety"
          body="From the first kitchen walkthrough to a live operations dashboard — designed to fit how your team already works."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {stackCards.map((c, i) => (
            <article key={c.eyebrow} data-reveal
              className={cn("glass-card hover-lift group relative overflow-hidden rounded-3xl p-7", `reveal-delay-${(i % 4) + 1}`)}>
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[hsl(var(--blue-400))]/10 blur-3xl transition group-hover:bg-[hsl(var(--blue-400))]/25" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">{c.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold text-[hsl(var(--navy-950))]">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{c.body}</p>
                </div>
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-white/70 px-5 py-4 text-center">
                  <p className="text-2xl font-semibold text-[hsl(var(--navy-950))]">{c.metric}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--blue-700))]">{c.label}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Platform Demo ---------- */

function PlatformDemo() {
  return (
    <section id="platform" className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-28 text-white">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="aurora opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeader light eyebrow="The Platform" title="One workspace. Every signal that matters." />
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur" data-reveal>
            <p className="text-base italic leading-relaxed text-[hsl(var(--blue-100))]/90">
              "Not a report, but a control center. Every deviation logged, every supplier scored, every CCP visible — in real time."
            </p>
            <button onClick={() => scrollToId("contact")}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10">
              Request live demo <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Static feature row + dynamic tabs */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="glass-card hover-lift rounded-2xl p-6 lg:col-span-2 !text-[hsl(var(--navy-950))]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Segment performance</h3>
              <BarChart3 className="h-4 w-4 text-[hsl(var(--blue-500))]" />
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer>
                <BarChart data={segmentData}>
                  <defs>
                    <linearGradient id="bg1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={BLUE.mid} />
                      <stop offset="100%" stopColor={BLUE.light} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e6eef7" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#6b7c93", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7c93", fontSize: 12 }} />
                  <Tooltip cursor={{ fill: BLUE.pale, opacity: 0.4 }} contentStyle={{ borderRadius: 12, border: "none" }} />
                  <Bar dataKey="v" fill="url(#bg1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { i: Shield, t: "ISO 22000 ready", d: "Audit-grade evidence by default." },
              { i: Zap, t: "Realtime sync", d: "Sub-second across sites." },
              { i: Clock, t: "5-min setup", d: "From signup to first insight." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass-card hover-lift flex items-start gap-4 rounded-2xl p-5 !text-[hsl(var(--navy-950))]">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-blue text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
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
      <div className="flex gap-2 overflow-x-auto no-scrollbar" data-reveal>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] transition",
              active === t.id
                ? "bg-[hsl(var(--blue-100))] text-[hsl(var(--navy-950))] shadow-glow"
                : "text-[hsl(var(--blue-100))]/60 hover:bg-white/10 hover:text-white"
            )}>
            {t.label}
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

function CCPDashboard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-success">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Live system
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Critical Control Point Dashboard</h3>
          <p className="text-xs text-[hsl(var(--blue-100))]/60">Auto-refreshing · updated 14 seconds ago</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <HealthStat value="12" label="Within range" tone="success" />
          <HealthStat value="1" label="Watch" tone="warning" />
          <HealthStat value="0" label="Critical" tone="danger" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CCPCard name="Cold Storage 01" value="3.8" unit="°C" range="0–5°C" status="Within range" tone="success" />
        <CCPCard name="Pasteurization Line" value="74.2" unit="°C" range="≥72°C" status="Within range" tone="success" />
        <CCPCard name="Receiving Dock" value="9.4" unit="°C" range="0–7°C" status="Watch" tone="warning" />
      </div>
      <div className="mt-6"><ExecutiveChart /></div>
    </div>
  );
}

type Tone = "success" | "warning" | "danger";

function HealthStat({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const color = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
      <p className={cn("text-2xl font-semibold", color)}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{label}</p>
    </div>
  );
}

function CCPCard({ name, value, unit, range, status, tone }:
  { name: string; value: string; unit: string; range: string; status: string; tone: Tone }) {
  const ring = tone === "success" ? "border-success/30" : tone === "warning" ? "border-warning/40" : "border-danger/40";
  const txt = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  const bar = tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger";
  const w = tone === "success" ? "78%" : tone === "warning" ? "42%" : "18%";
  return (
    <div className={cn("rounded-2xl border bg-white/[0.04] p-5 transition hover:-translate-y-1", ring)}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/70">{name}</p>
        <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse-dot",
          tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger")} />
      </div>
      <p className="mt-3 text-3xl font-semibold">{value}<span className="ml-1 text-base text-[hsl(var(--blue-100))]/50">{unit}</span></p>
      <p className="text-[11px] text-[hsl(var(--blue-100))]/60">Range {range}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={cn("h-full rounded-full", bar)} style={{ width: w }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <span className={txt}>{status}</span>
        <span className="text-[hsl(var(--blue-100))]/50">2 min ago</span>
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
  const tone = (t: Tone) => t === "danger" ? "border-danger/40 text-danger"
    : t === "warning" ? "border-warning/40 text-warning"
      : "border-success/40 text-success";
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em]">Deviation response trend</p>
        <p className="text-xs text-[hsl(var(--blue-100))]/60">Open issues by severity and response speed.</p>
        <div className="mt-6"><ExecutiveChart /></div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <HealthStat value="68%" label="Faster response" tone="success" />
          <HealthStat value="03" label="Open" tone="warning" />
          <HealthStat value="01" label="Critical" tone="danger" />
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em]">Alert timeline</p>
        <ul className="mt-5 space-y-4">
          {items.map(([t, title, body, time, badge]) => (
            <li key={title} className={cn("flex gap-4 rounded-2xl border bg-white/[0.03] p-4", tone(t))}>
              <span className={cn("mt-1.5 inline-block h-2 w-2 rounded-full",
                t === "danger" ? "bg-danger" : t === "warning" ? "bg-warning" : "bg-success")} />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-white">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--blue-100))]/70">{body}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{time}</p>
                <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", tone(t))}>{badge}</p>
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
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em]">Supplier risk index</p>
        <p className="text-xs text-[hsl(var(--blue-100))]/60">Weighted score: receiving temperature, document completeness, rejection rate, corrective-action closure.</p>
        <div className="mt-6"><ExecutiveChart /></div>
      </div>
      <div className="grid gap-3">
        {suppliers.map(([name, cat, score, tier]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-extrabold text-white">{name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{cat}</p>
              </div>
              <p className={cn("text-3xl font-semibold",
                score >= 90 ? "text-success" : score >= 80 ? "text-[hsl(var(--blue-300))]" : "text-warning")}>{score}</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className={cn("h-full rounded-full",
                score >= 90 ? "bg-success" : score >= 80 ? "bg-[hsl(var(--blue-300))]" : "bg-warning")} style={{ width: `${score}%` }} />
            </div>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{tier}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsDashboard() {
  const reports: Array<[string, string, string]> = [
    ["PDF", "HACCP Audit Report", "Full CCP audit log with corrective actions, sign-offs, and compliance ratings."],
    ["DASH", "Monthly CCP Summary", "Trend analysis across control points, deviation frequency, and response times."],
    ["LOG", "Real-Time Hygiene Log", "Timestamped sanitation records replacing paper logs and manual sign-offs."],
    ["ISO", "ISO 22000 Gap Analysis", "Clause-by-clause readiness report with remediation priorities."],
    ["REP", "Supplier Scorecard", "Quarterly supplier performance and corrective-action status."],
    ["API", "Custom Dashboard Export", "Structured data export for management reporting or ERP connection."],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map(([badge, title, body]) => (
        <article key={title} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-white/30">
          <span className="inline-flex rounded-full border border-[hsl(var(--blue-100))]/30 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[hsl(var(--blue-100))]">{badge}</span>
          <p className="mt-4 text-base font-extrabold text-white text-balance">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--blue-100))]/70">{body}</p>
          <button onClick={() => scrollToId("contact")}
            className="story-link mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/80">
            View artifact <ArrowRight className="h-3 w-3" />
          </button>
        </article>
      ))}
    </div>
  );
}

function ExecutiveChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-100))]/60">Last 30 days</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-success">+18% in-range</p>
      </div>
      <div className="mt-3 h-36">
        <ResponsiveContainer>
          <AreaChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="execG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.4} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(200,220,240,.1)" strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#9bb1cf", fontSize: 11 }} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", background: "#0b1a2e", color: "white" }} />
            <Area type="monotone" dataKey="v" stroke={GREEN} strokeWidth={2.4} fill="url(#execG)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------- Insights (magazine layout) ---------- */

function Insights() {
  const [feature, ...rows] = insights;
  return (
    <section id="insights" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <SectionHeader eyebrow="Insights" title="Thinking from the field." body="Operational intelligence from real food businesses navigating compliance and growth." />
          <a href="#" className="hidden text-sm font-medium text-[hsl(var(--blue-700))] hover:underline md:inline">All articles →</a>
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
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/90 via-[hsl(var(--navy-950))]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-8 transition-transform duration-500 group-hover:translate-y-0">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{item.tag}</span>
          <h3 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">{item.title}</h3>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/80">
            <span>{item.read}</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="inline-flex items-center gap-1 text-[hsl(var(--blue-300))]">
              Read story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </span>
          </div>
        </div>
        <div className="absolute left-0 top-0 h-full w-1 bg-[hsl(var(--blue-400))] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" />
      </div>
    </a>
  );
}

function InsightRow({ item }: { item: typeof insights[number] }) {
  return (
    <a href="#" data-reveal className="group relative flex items-stretch gap-5 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white p-3 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] hover:shadow-[0_25px_50px_-20px_rgba(30,58,95,0.35)]">
      <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-[hsl(var(--navy-950))]/0 transition-colors duration-500 group-hover:bg-[hsl(var(--navy-950))]/30" />
      </div>
      <div className="flex flex-1 flex-col justify-center pr-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--blue-700))]">{item.tag}</span>
        <h4 className="mt-1 text-balance text-base font-semibold leading-snug text-[hsl(var(--navy-950))] transition-colors group-hover:text-[hsl(var(--blue-700))]">
          {item.title}
        </h4>
        <span className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{item.read}</span>
      </div>
      <ArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-2 text-[hsl(var(--blue-500))] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
    </a>
  );
}

/* ---------- Why Vera ---------- */

function WhyVera() {
  return (
    <section id="why" className="relative bg-[hsl(var(--muted))]/40 py-28">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Vera"
          title="Built around how food businesses actually run"
          body="Four principles that shape every engagement, every dashboard, and every recommendation we deliver."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((c, i) => (
            <article key={c.title} data-reveal
              className={cn("glass-card hover-lift group relative overflow-hidden rounded-3xl p-6", `reveal-delay-${(i % 4) + 1}`)}>
              <p className="text-[11px] font-bold tracking-[0.22em] text-[hsl(var(--blue-700))]">0{i + 1}</p>
              <h3 className="mt-3 text-base font-extrabold text-[hsl(var(--navy-950))] text-balance">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{c.body}</p>
              <div className="mt-6 h-1 w-10 rounded-full bg-[hsl(var(--blue-400))]/40 transition-all group-hover:w-16 group-hover:bg-[hsl(var(--blue-500))]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-28 text-white">
      <div className="aurora opacity-50" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center" data-reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-100))]/70">Get in touch</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            Start with clarity. Move to control.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--blue-100))]/80">
            Book a consultation and find out how Vera Systems can transform your compliance operations with real-time intelligence.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-100))]/60">Talk to us</p>
            <h3 className="mt-3 text-2xl font-semibold">Ready to elevate your food safety?</h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--blue-100))]/70">
              Tell us about your operation and we'll come back with a tailored plan within two business days.
            </p>
            <div className="mt-8 space-y-3">
              <ContactLine icon={<Mail className="h-4 w-4" />} text="hello@verasystems.rw" />
              <ContactLine icon={<Phone className="h-4 w-4" />} text="+250 788 000 000" />
              <ContactLine icon={<MapPin className="h-4 w-4" />} text="Kigali, Rwanda" />
              <ContactLine icon={<Clock className="h-4 w-4" />} text="Mon–Fri · 08:00–18:00 CAT" />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:-translate-y-0.5 hover:border-white/30">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--blue-100))]/10 text-[hsl(var(--blue-100))]">{icon}</span>
      <span className="text-sm font-semibold text-[hsl(var(--blue-100))]/90">{text}</span>
    </div>
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
    <form onSubmit={handleSubmit} data-reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Company name" required />
        <Field label="Work email" name="email" placeholder="you@company.rw" type="email" required />
        <Field label="Phone" name="phone" placeholder="+250 …" type="tel" />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">Service interest</label>
          <select name="interest" className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-4 text-sm text-white outline-none transition focus:border-[hsl(var(--blue-300))]">
            <option value="consultancy">Food Safety Consultancy</option>
            <option value="platform">Digital Intelligence Platform</option>
            <option value="demo">Platform Demo Request</option>
            <option value="both">Both Services</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">Message</label>
          <textarea name="message" rows={4} placeholder="Tell us about your operation, scale, and current pain points."
            className="w-full resize-none rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[hsl(var(--blue-100))]/30 focus:border-[hsl(var(--blue-300))]" />
        </div>
      </div>
      <button type="submit" disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-[hsl(var(--blue-100))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--navy-950))] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
      {message && (
        <p className={cn("mt-4 rounded-2xl border px-4 py-3 text-sm",
          status === "success" ? "border-success/30 bg-success/10 text-success" : "border-danger/30 bg-danger/10 text-danger")}>
          {message}
        </p>
      )}
    </form>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }:
  { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[hsl(var(--blue-100))]/30 focus:border-[hsl(var(--blue-300))] focus:bg-white/[0.10]" />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[hsl(var(--navy-950))] py-10 text-[hsl(var(--blue-100))]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center lg:flex-row lg:text-left">
        <Logo compact />
        <p className="text-xs text-[hsl(var(--blue-100))]/50">Precision food safety. Powered by data. — Kigali, Rwanda © 2026</p>
        <div className="flex gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-100))]/60">
          <a href="#" className="story-link">Privacy</a>
          <a href="#" className="story-link">Terms</a>
          <a href="#" className="story-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  const progress = useScrollProgress();
  useRevealOnScroll();

  return (
    <main className="relative bg-white text-[hsl(var(--foreground))]">
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full bg-gradient-to-r from-[hsl(var(--blue-400))] via-[hsl(var(--blue-300))] to-success transition-[width] duration-150"
          style={{ width: `${progress}%` }} />
      </div>

      <Navbar />
      <Hero />
      <ClientTypes />
      <About />
      <Services />
      <StackExperience />
      <PlatformDemo />
      <Insights />
      <WhyVera />
      <Contact />
      <Footer />
    </main>
  );
}
