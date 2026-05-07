"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight, PlayCircle, Sparkles, TrendingUp, Shield, Zap, BarChart3,
  Clock, CheckCircle2, AlertTriangle, Activity, Mail, Phone, MapPin, Menu, X,
  ChevronRight, Star, Award, Users, Globe,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip,
} from "recharts";

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
    stat: { value: "98%", label: "Audit pass rate" },
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
  { title: "Precision food safety", body: "Recommendations are tied to HACCP control points, ISO clauses, audit evidence, or operating data — not generic consulting frameworks.", icon: Award },
  { title: "Real-time risk visibility", body: "Dashboards replace scattered paper logs so the team can see CCP status, deviation alerts, and corrective action progress from any device.", icon: Activity },
  { title: "Compliance-to-data mapping", body: "Every audit finding becomes a measurable system output, making compliance easier to verify and management decisions easier to defend.", icon: BarChart3 },
  { title: "Built for East African operations", body: "Designed around local supply-chain realities, food-business constraints, and the pace of kitchens, factories, hotels, and processors.", icon: Globe },
];

const stackCards = [
  { eyebrow: "01", title: "Map the real operating risk", body: "We start on the kitchen or factory floor: CCPs, hygiene behavior, supplier risk, documentation gaps, staff routines, and audit pressure points.", metric: "72h", label: "first-risk snapshot", accent: "from-blue-400/20 to-blue-600/5" },
  { eyebrow: "02", title: "Turn compliance into workflow", body: "Your procedures become practical checklists, live controls, escalation paths, and evidence trails that your team can use every day.", metric: "4×", label: "faster evidence retrieval", accent: "from-emerald-400/20 to-emerald-600/5" },
  { eyebrow: "03", title: "Visualize performance in real time", body: "Dashboards show CCP status, deviations, supplier scores, hygiene logs, and readiness indicators before issues turn into incidents.", metric: "Live", label: "CCP intelligence", accent: "from-violet-400/20 to-violet-600/5" },
  { eyebrow: "04", title: "Use data to reduce repeat failures", body: "Management receives trends, corrective-action loops, supplier patterns, and practical recommendations tied directly to operational outcomes.", metric: "ISO", label: "audit-ready reporting", accent: "from-amber-400/20 to-amber-600/5" },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "ccp", label: "Live CCP" },
  { id: "deviations", label: "Deviations" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

const ccpTrend = [
  { m: "W1", v: 88, p: 90 }, { m: "W2", v: 92, p: 91 }, { m: "W3", v: 90, p: 92 },
  { m: "W4", v: 95, p: 93 }, { m: "W5", v: 96, p: 94 }, { m: "W6", v: 97, p: 95 }, { m: "W7", v: 98, p: 96 },
];
const segmentData = [
  { name: "Processors", v: 86 }, { name: "Restaurants", v: 64 },
  { name: "Hotels", v: 47 }, { name: "Cold chain", v: 72 },
];

const testimonials = [
  { quote: "Vera cut our audit prep from three weeks to two days. The live dashboards changed how our entire team thinks about compliance.", name: "Jean-Pierre M.", role: "Operations Director, Kigali Dairy", initials: "JP" },
  { quote: "We finally have a system that matches how our kitchen actually runs. Every deviation gets caught, logged, and closed — in real time.", name: "Amara N.", role: "Head Chef, Hotel Serena Rwanda", initials: "AN" },
  { quote: "The supplier scorecards alone justified the investment. We dropped two chronic non-performers in the first quarter.", name: "David K.", role: "Quality Manager, Akagera Foods", initials: "DK" },
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
    u(); window.addEventListener("scroll", u, { passive: true }); window.addEventListener("resize", u);
    return () => { window.removeEventListener("scroll", u); window.removeEventListener("resize", u); };
  }, []);
  return p;
}

/* ---------- Atoms ---------- */

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-[hsl(var(--navy-950))] text-white shadow-md">
        <span className="font-display text-base font-black tracking-tight">V</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-white" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold tracking-tight text-[hsl(var(--navy-950))] dark:text-white">Vera Systems</p>
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
      <p className={cn("inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]",
        light ? "text-[hsl(var(--blue-300))]" : "text-[hsl(var(--blue-700))]")}>
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
          ? "border-[hsl(var(--border))] bg-white/88 shadow-vera backdrop-blur-xl"
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
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--blue-100))] bg-white/70 px-4 py-1.5 text-xs font-medium text-[hsl(var(--blue-700))] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              New · Vera Intelligence v4 is live
              <span className="mx-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue-500))] animate-pulse-dot" />
            </div>

            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-[hsl(var(--navy-950))] md:text-6xl lg:text-7xl">
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
                  <div className="font-display text-xl font-semibold text-[hsl(var(--navy-950))]">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-up [animation-delay:120ms]">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] gradient-blue-soft opacity-60 blur-2xl" />
              <div className="relative glass-card rounded-3xl p-5 float-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">CCP compliance · YTD</div>
                    <div className="mt-1 font-display text-3xl font-semibold text-[hsl(var(--navy-950))]">96.4%</div>
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
                      <p className={cn("font-display text-xl font-semibold",
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
    <section className="relative border-y border-[hsl(var(--border))] bg-white py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-700))]">
          Trusted by food businesses across Rwanda &amp; East Africa
        </p>
        <div className="marquee-track mt-8 overflow-hidden">
          <div className="marquee">
            {doubled.map((c, i) => (
              <div key={`${c}-${i}`} className="flex flex-none items-center gap-3 text-[hsl(var(--navy-900))]/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--blue-500))]" />
                <span className="font-display text-base font-extrabold tracking-tight">{c}</span>
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
      {/* Accent blob */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div data-reveal className="reveal-delay-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85"
              alt="Food safety lab" className="h-full w-full object-cover transition duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Established</p>
              <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))]">Kigali · Rwanda</p>
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="About Vera"
            title="A food-safety company with engineering DNA"
            body="We sit at the intersection of HACCP science and operational data. Our work helps food businesses shift from end-of-shift reviews to real-time control, with audit-ready evidence on demand."
          />
          {/* Mission card — elevated with subtle left accent */}
          <div className="mt-10 relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-6 backdrop-blur shadow-vera" data-reveal>
            <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-[hsl(var(--blue-400))] via-[hsl(var(--blue-300))] to-transparent rounded-l-3xl" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Mission</p>
            <p className="mt-3 text-lg italic leading-relaxed text-[hsl(var(--navy-950))] text-balance">
              "To elevate food safety across Rwanda and East Africa through scientific rigor and data-driven systems that improve compliance, efficiency, and trust."
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoPill title="Scientific rigor" body="Standards-based methods, validated controls, and verifiable records." />
            <InfoPill title="Operational fit" body="Procedures designed for the realities of kitchens, factories, and cold chains." />
          </div>

          {/* Quick stats row */}
          <div className="mt-6 flex items-center gap-8 rounded-2xl border border-[hsl(var(--border))] bg-white/50 px-6 py-4 backdrop-blur" data-reveal>
            {[
              { k: "5+", l: "Years experience" },
              { k: "140+", l: "Audits completed" },
              { k: "60+", l: "Client operations" },
            ].map(s => (
              <div key={s.l} className="text-center flex-1">
                <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))]">{s.k}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card hover-lift rounded-2xl p-5" data-reveal>
      <div className="mb-2 h-0.5 w-8 rounded-full bg-[hsl(var(--blue-400))]" />
      <p className="text-sm font-extrabold text-[hsl(var(--navy-950))]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
    </div>
  );
}

/* ---------- Services ---------- */

function Services() {
  return (
    <section id="services" className="relative bg-white py-28 overflow-hidden">
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow="Services"
          title="Two disciplines. One operating system for food safety."
          body="Choose what your operation needs today — and scale into the rest as you grow."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((s, idx) => (
            <article key={s.title} data-reveal
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera transition-all duration-500 hover:-translate-y-2 hover:shadow-glow hover:border-[hsl(var(--blue-400))]",
                `reveal-delay-${idx + 1}`
              )}>
              <div className="relative aspect-[16/8] overflow-hidden">
                <img src={s.image} alt="" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/80 via-[hsl(var(--navy-950))]/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--navy-950))] backdrop-blur">{s.label}</span>
                {/* Stat badge on image */}
                <div className="absolute right-5 bottom-5 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur border border-white/20">
                  <p className="font-display text-2xl font-bold text-white">{s.stat.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/70">{s.stat.label}</p>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))] text-balance">{s.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-[hsl(var(--blue-700))]">{s.impact}</p>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{s.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[hsl(var(--navy-900))]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-success" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToId("contact")}
                  className="mt-7 group/btn inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--navy-950))] transition hover:border-[hsl(var(--blue-400))] hover:text-[hsl(var(--blue-700))]">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- StackExperience (How it works) — completely redesigned ---------- */

function StackExperience() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section className="relative bg-[hsl(var(--navy-950))] py-28 overflow-hidden text-white">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="aurora opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          light
          eyebrow="How it works"
          title="A four-step path to data-driven food safety"
          body="From the first kitchen walkthrough to a live operations dashboard — designed to fit how your team already works."
        />

        {/* Step selector — horizontal tabs */}
        <div className="mt-14 flex flex-wrap gap-2" data-reveal>
          {stackCards.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                activeStep === i
                  ? "bg-white text-[hsl(var(--navy-950))] shadow-glow"
                  : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
              )}>
              {c.eyebrow} / {c.title.split(" ").slice(0, 3).join(" ")}…
            </button>
          ))}
        </div>

        {/* Active step display */}
        <div key={activeStep} className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr] animate-fade-up" data-reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="flex items-start gap-6">
              <div className="flex-none">
                <span className="font-display text-6xl font-bold text-white/10">{stackCards[activeStep].eyebrow}</span>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-300))]">Step {stackCards[activeStep].eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{stackCards[activeStep].title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[hsl(var(--blue-100))]/75">{stackCards[activeStep].body}</p>
              </div>
            </div>
            {/* Progress dots */}
            <div className="mt-8 flex gap-2">
              {stackCards.map((_, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={cn("h-1.5 rounded-full transition-all duration-300",
                    i === activeStep ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50")} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 flex flex-col items-center justify-center text-center backdrop-blur-xl">
              <p className="font-display text-5xl font-bold text-white">{stackCards[activeStep].metric}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--blue-300))]">{stackCards[activeStep].label}</p>
            </div>
            <button onClick={() => setActiveStep((activeStep + 1) % stackCards.length)}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white flex items-center justify-between backdrop-blur-xl">
              Next step <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* All steps condensed grid below */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackCards.map((c, i) => (
            <button key={c.eyebrow} onClick={() => setActiveStep(i)} data-reveal
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300",
                `reveal-delay-${(i % 4) + 1}`,
                activeStep === i
                  ? "border-white/30 bg-white/[0.08]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              )}>
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[hsl(var(--blue-400))]/10 blur-2xl" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-300))]">{c.eyebrow}</p>
              <p className="mt-2 text-sm font-semibold text-white">{c.title}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Platform Demo ---------- */

function PlatformDemo() {
  return (
    <section id="platform" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader eyebrow="The Platform" title="One workspace. Every signal that matters." />
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-6 backdrop-blur max-w-sm" data-reveal>
            <p className="text-base italic leading-relaxed text-[hsl(var(--navy-950))]/80">
              "Not a report, but a control center. Every deviation logged, every supplier scored, every CCP visible — in real time."
            </p>
            <button onClick={() => scrollToId("contact")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--navy-950))] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[hsl(var(--blue-700))]">
              Request live demo <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card hover-lift rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[hsl(var(--navy-950))]">Segment performance</h3>
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
          <div className="space-y-4">
            {[
              { i: Shield, t: "ISO 22000 ready", d: "Audit-grade evidence by default." },
              { i: Zap, t: "Realtime sync", d: "Sub-second across sites." },
              { i: Clock, t: "5-min setup", d: "From signup to first insight." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass-card hover-lift flex items-start gap-4 rounded-2xl p-5">
                <div className="grid h-10 w-10 flex-none place-items-center rounded-xl gradient-blue text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-[hsl(var(--navy-950))]">{t}</div>
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
      <div className="flex gap-2 overflow-x-auto no-scrollbar border-b border-[hsl(var(--border))] pb-0" data-reveal>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={cn(
              "relative whitespace-nowrap pb-4 px-5 text-[11px] font-bold uppercase tracking-[0.16em] transition",
              active === t.id
                ? "text-[hsl(var(--navy-950))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--navy-900))]"
            )}>
            {t.label}
            {active === t.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[hsl(var(--blue-500))]" />
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

function CCPDashboard() {
  return (
    <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-success">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse-dot" /> Live system
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[hsl(var(--navy-950))]">Critical Control Point Dashboard</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Auto-refreshing · updated 14 seconds ago</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <LightHealthStat value="12" label="Within range" tone="success" />
          <LightHealthStat value="1" label="Watch" tone="warning" />
          <LightHealthStat value="0" label="Critical" tone="danger" />
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <CCPCard name="Cold Storage 01" value="3.8" unit="°C" range="0–5°C" status="Within range" tone="success" />
        <CCPCard name="Pasteurization Line" value="74.2" unit="°C" range="≥72°C" status="Within range" tone="success" />
        <CCPCard name="Receiving Dock" value="9.4" unit="°C" range="0–7°C" status="Watch" tone="warning" />
      </div>
      <div className="mt-6"><LightExecutiveChart /></div>
    </div>
  );
}

type Tone = "success" | "warning" | "danger";

function LightHealthStat({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const color = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  const bg = tone === "success" ? "bg-success/8" : tone === "warning" ? "bg-warning/8" : "bg-danger/8";
  return (
    <div className={cn("rounded-2xl px-4 py-3 text-center border", bg,
      tone === "success" ? "border-success/20" : tone === "warning" ? "border-warning/20" : "border-danger/20")}>
      <p className={cn("font-display text-2xl font-semibold", color)}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</p>
    </div>
  );
}

function HealthStat({ value, label, tone }: { value: string; label: string; tone: Tone }) {
  const color = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
      <p className={cn("font-display text-2xl font-semibold", color)}>{value}</p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--blue-100))]/60">{label}</p>
    </div>
  );
}

function CCPCard({ name, value, unit, range, status, tone }:
  { name: string; value: string; unit: string; range: string; status: string; tone: Tone }) {
  const ring = tone === "success" ? "border-success/25" : tone === "warning" ? "border-warning/35" : "border-danger/35";
  const txt = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger";
  const bar = tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger";
  const w = tone === "success" ? "78%" : tone === "warning" ? "42%" : "18%";
  return (
    <div className={cn("rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md", ring)}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{name}</p>
        <span className={cn("inline-block h-2 w-2 rounded-full animate-pulse-dot",
          tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger")} />
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-[hsl(var(--navy-950))]">{value}<span className="ml-1 text-base text-[hsl(var(--muted-foreground))]">{unit}</span></p>
      <p className="text-[11px] text-[hsl(var(--muted-foreground))]">Range {range}</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
        <div className={cn("h-full rounded-full", bar)} style={{ width: w }} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
        <span className={txt}>{status}</span>
        <span className="text-[hsl(var(--muted-foreground))]">2 min ago</span>
      </div>
    </div>
  );
}

function LightExecutiveChart() {
  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Last 30 days</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-success">+18% in-range</p>
      </div>
      <div className="mt-3 h-36">
        <ResponsiveContainer>
          <AreaChart data={ccpTrend} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="lightExecG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.3} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(30,58,95,.08)" strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#6b7c93", fontSize: 11 }} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
            <Area type="monotone" dataKey="v" stroke={GREEN} strokeWidth={2.4} fill="url(#lightExecG)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
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

function DeviationDashboard() {
  const items: Array<[Tone, string, string, string, string]> = [
    ["danger", "Receiving Dock temperature breach", "Raw milk delivery registered above accepted receiving limit. Corrective action required.", "Now", "Critical"],
    ["warning", "Sanitation verification pending", "Line 2 supervisor sign-off is 18 minutes overdue.", "18m", "Watch"],
    ["success", "Cold room fluctuation resolved", "Automated alert closed after two stable readings within safe range.", "1h", "Resolved"],
  ];
  const toneClass = (t: Tone) => t === "danger" ? "border-danger/25 bg-danger/4"
    : t === "warning" ? "border-warning/25 bg-warning/4"
      : "border-success/25 bg-success/4";
  const textColor = (t: Tone) => t === "danger" ? "text-danger" : t === "warning" ? "text-warning" : "text-success";
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-[hsl(var(--navy-950))]">Deviation response trend</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Open issues by severity and response speed.</p>
        <div className="mt-6"><LightExecutiveChart /></div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <LightHealthStat value="68%" label="Faster response" tone="success" />
          <LightHealthStat value="03" label="Open" tone="warning" />
          <LightHealthStat value="01" label="Critical" tone="danger" />
        </div>
      </div>
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-[hsl(var(--navy-950))]">Alert timeline</p>
        <ul className="mt-5 space-y-4">
          {items.map(([t, title, body, time, badge]) => (
            <li key={title} className={cn("flex gap-4 rounded-2xl border p-4", toneClass(t))}>
              <span className={cn("mt-1.5 inline-block h-2 w-2 flex-none rounded-full",
                t === "danger" ? "bg-danger" : t === "warning" ? "bg-warning" : "bg-success")} />
              <div className="flex-1">
                <p className="text-sm font-extrabold text-[hsl(var(--navy-950))]">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
              </div>
              <div className="flex-none text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{time}</p>
                <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", textColor(t))}>{badge}</p>
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
      <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-vera">
        <p className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-[hsl(var(--navy-950))]">Supplier risk index</p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">Weighted score: receiving temperature, document completeness, rejection rate, corrective-action closure.</p>
        <div className="mt-6"><LightExecutiveChart /></div>
      </div>
      <div className="grid gap-3">
        {suppliers.map(([name, cat, score, tier]) => (
          <div key={name} className="rounded-2xl border border-[hsl(var(--border))] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-[hsl(var(--blue-300))]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-extrabold text-[hsl(var(--navy-950))]">{name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{cat}</p>
              </div>
              <p className={cn("font-display text-3xl font-semibold",
                score >= 90 ? "text-success" : score >= 80 ? "text-[hsl(var(--blue-500))]" : "text-warning")}>{score}</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
              <div className={cn("h-full rounded-full transition-all duration-1000",
                score >= 90 ? "bg-success" : score >= 80 ? "bg-[hsl(var(--blue-400))]" : "bg-warning")} style={{ width: `${score}%` }} />
            </div>
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{tier}</p>
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
        <article key={title} className="group rounded-3xl border border-[hsl(var(--border))] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[hsl(var(--blue-300))] hover:shadow-vera">
          <span className="inline-flex rounded-full border border-[hsl(var(--blue-300))] bg-[hsl(var(--blue-100))]/50 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[hsl(var(--blue-700))]">{badge}</span>
          <p className="mt-4 font-display text-base font-extrabold text-[hsl(var(--navy-950))] text-balance">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{body}</p>
          <button onClick={() => scrollToId("contact")}
            className="story-link mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--blue-700))]">
            View artifact <ArrowRight className="h-3 w-3" />
          </button>
        </article>
      ))}
    </div>
  );
}

/* ---------- Testimonials — new section ---------- */

function Testimonials() {
  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-25" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          centered
          eyebrow="Results in the field"
          title="What happens when food teams run on data"
          body="From Kigali processors to regional hotel chains — the same pattern emerges: visibility drives action."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} data-reveal className={cn(
              "relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white p-7 shadow-vera transition hover:-translate-y-1 hover:shadow-glow hover:border-[hsl(var(--blue-300))]",
              `reveal-delay-${i + 1}`
            )}>
              {/* Quote mark decoration */}
              <div className="absolute -right-3 -top-3 font-display text-9xl font-black text-[hsl(var(--blue-100))] leading-none select-none">"</div>
              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[hsl(var(--blue-400))] text-[hsl(var(--blue-400))]" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-[hsl(var(--navy-900))] italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full gradient-blue text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[hsl(var(--navy-950))]">{t.name}</p>
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

/* ---------- Insights (magazine layout) ---------- */

function Insights() {
  const [feature, ...rows] = insights;
  return (
    <section id="insights" className="bg-[hsl(var(--muted))]/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <SectionHeader eyebrow="Insights" title="Thinking from the field." body="Operational intelligence from real food businesses navigating compliance and growth." />
          <a href="#" className="hidden text-sm font-semibold text-[hsl(var(--blue-700))] hover:underline md:inline story-link">All articles →</a>
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
          <h3 className="mt-4 font-display text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">{item.title}</h3>
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
    <a href="#" data-reveal className="group relative flex items-stretch gap-5 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--blue-400))] hover:shadow-vera">
      <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
        <img src={item.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-[hsl(var(--navy-950))]/0 transition-colors duration-500 group-hover:bg-[hsl(var(--navy-950))]/20" />
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
    <section id="why" className="relative bg-white py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
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
                className={cn("glass-card hover-lift group relative overflow-hidden rounded-3xl p-6", `reveal-delay-${(i % 4) + 1}`)}>
                {/* Subtle corner glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[hsl(var(--blue-400))]/10 blur-3xl transition group-hover:bg-[hsl(var(--blue-400))]/25" />
                <div className="relative">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl gradient-blue text-white shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] font-bold tracking-[0.22em] text-[hsl(var(--blue-700))]">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-base font-extrabold text-[hsl(var(--navy-950))] text-balance">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{c.body}</p>
                  <div className="mt-5 h-0.5 w-8 rounded-full bg-[hsl(var(--blue-400))]/40 transition-all group-hover:w-full group-hover:bg-[hsl(var(--blue-400))]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA Banner — new section ---------- */

function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-950))] py-20">
      <div className="aurora opacity-40" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="relative mx-auto max-w-5xl px-6 text-center" data-reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--blue-100))]/60">Get started</p>
        <h2 className="mt-5 font-display text-4xl font-semibold text-white text-balance md:text-5xl">
          Ready to move from paper logs to live intelligence?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--blue-100))]/75">
          Join food operations across East Africa that have replaced end-of-shift reviews with real-time control.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => scrollToId("contact")}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[hsl(var(--navy-950))] transition hover:bg-[hsl(var(--blue-100))]">
            Book a consultation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
          <button onClick={() => scrollToId("platform")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
            <PlayCircle className="h-4 w-4" />
            See the platform
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--muted))]/30 py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/60 blur-3xl" />
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
          {/* Contact info card */}
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-vera" data-reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Talk to us</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))]">Ready to elevate your food safety?</h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Tell us about your operation and we'll come back with a tailored plan within two business days.
            </p>

            {/* Response time badge */}
            <div className="mt-6 mb-4 inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
              <span className="text-xs font-semibold text-success">Typically responds within 4 hours</span>
            </div>

            <div className="space-y-3">
              <ContactLine icon={<Mail className="h-4 w-4" />} text="hello@verasystems.rw" />
              <ContactLine icon={<Phone className="h-4 w-4" />} text="+250 788 000 000" />
              <ContactLine icon={<MapPin className="h-4 w-4" />} text="Kigali, Rwanda" />
              <ContactLine icon={<Clock className="h-4 w-4" />} text="Mon–Fri · 08:00–18:00 CAT" />
            </div>

            {/* Trust indicators */}
            <div className="mt-6 pt-6 border-t border-[hsl(var(--border))]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-3">Trusted by teams in</p>
              <div className="flex flex-wrap gap-2">
                {["Rwanda", "Uganda", "Kenya", "Tanzania"].map(c => (
                  <span key={c} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-3 py-1 text-[11px] font-semibold text-[hsl(var(--navy-900))]">{c}</span>
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

function ContactLine({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-4 py-3 transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-300))] hover:bg-white">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--blue-100))]/70 text-[hsl(var(--blue-700))]">{icon}</span>
      <span className="text-sm font-semibold text-[hsl(var(--navy-950))]/80">{text}</span>
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
    <form onSubmit={handleSubmit} data-reveal className="rounded-3xl border border-[hsl(var(--border))] bg-white p-8 shadow-vera">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">Send a message</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-[hsl(var(--navy-950))]">Tell us about your operation</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <LightField label="Full name" name="name" placeholder="Your name" required />
        <LightField label="Company" name="company" placeholder="Company name" required />
        <LightField label="Work email" name="email" placeholder="you@company.rw" type="email" required />
        <LightField label="Phone" name="phone" placeholder="+250 …" type="tel" />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Service interest</label>
          <select name="interest" className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--blue-400))] focus:bg-white">
            <option value="consultancy">Food Safety Consultancy</option>
            <option value="platform">Digital Intelligence Platform</option>
            <option value="demo">Platform Demo Request</option>
            <option value="both">Both Services</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Message</label>
          <textarea name="message" rows={4} placeholder="Tell us about your operation, scale, and current pain points."
            className="w-full resize-none rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white" />
        </div>
      </div>
      <button type="submit" disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-[hsl(var(--navy-950))] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[hsl(var(--blue-700))] disabled:cursor-not-allowed disabled:opacity-60">
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

function LightField({ label, name, placeholder, type = "text", required = false }:
  { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm text-[hsl(var(--foreground))] outline-none transition placeholder:text-[hsl(var(--muted-foreground))]/50 focus:border-[hsl(var(--blue-400))] focus:bg-white" />
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-white py-12">
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
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--blue-700))]">{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="story-link text-sm text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--navy-950))]">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-6 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">© 2026 Vera Systems Ltd. · Kigali, Rwanda · All rights reserved.</p>
          <div className="flex gap-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))]">LinkedIn</a>
            <a href="#" className="story-link hover:text-[hsl(var(--navy-950))]">Twitter</a>
          </div>
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
      {/* Scroll progress */}
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
      <Testimonials />
      <Insights />
      <WhyVera />
      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}