"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type DemoTab = "overview" | "ccp" | "suppliers" | "reports";
type Tone = "success" | "warning" | "danger" | "info";

const navItems = [
  { label: "About", href: "about" },
  { label: "Services", href: "services" },
  { label: "Platform", href: "platform" },
  { label: "Why Vera", href: "why" },
  { label: "Contact", href: "contact" },
];

const services = [
  {
    label: "Food Safety Consultancy",
    title: "Certification-ready compliance",
    eyebrow: "HACCP · ISO 22000 · Audits",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
    body:
      "Expert advisory, auditing, staff training, corrective-action planning, and implementation support for teams that need defensible food safety systems.",
    bullets: ["HACCP system design", "ISO 22000 readiness", "Facility audits", "Training & verification"],
  },
  {
    label: "Digital Intelligence & Software",
    title: "Real-time operational visibility",
    eyebrow: "Dashboards · Alerts · Evidence",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    body:
      "Live CCP monitoring, hygiene tracking, supplier scorecards, deviation workflows, and compliance reports that turn safety data into daily decisions.",
    bullets: ["Live CCP dashboards", "Deviation alerts", "Digital hygiene logs", "Supplier analytics"],
  },
];

const processCards = [
  {
    step: "01",
    title: "Diagnose",
    body: "Map the real risk on the floor: CCPs, hygiene routines, supplier gaps, documentation quality, and audit exposure.",
    metric: "72h",
    label: "first risk view",
  },
  {
    step: "02",
    title: "Systemize",
    body: "Turn SOPs, checklists, training records, and corrective actions into usable workflows that teams can follow daily.",
    metric: "4x",
    label: "faster evidence retrieval",
  },
  {
    step: "03",
    title: "Monitor",
    body: "Track CCP status, deviations, supplier scorecards, hygiene logs, and readiness signals in one control center.",
    metric: "Live",
    label: "operational dashboard",
  },
  {
    step: "04",
    title: "Improve",
    body: "Use trend reports and management reviews to reduce repeat deviations and improve compliance performance over time.",
    metric: "ISO",
    label: "audit-ready reports",
  },
];

const insightCards = [
  {
    tag: "Risk Signal",
    title: "When paper logs look compliant but action comes late",
    body: "Manual HACCP records often hide the time gap between breach, detection, escalation, and corrective action.",
  },
  {
    tag: "Supplier Data",
    title: "Supplier risk needs more than certificates",
    body: "Receiving temperature, rejection patterns, traceability gaps, and corrective-action closure reveal the real supplier picture.",
  },
  {
    tag: "Operations",
    title: "Dashboards create accountability across shifts",
    body: "The best system is not just beautiful. It gives operators, supervisors, and managers the same evidence at the same time.",
  },
];

const whyCards = [
  {
    title: "Scientific rigor",
    body: "Recommendations are tied to CCPs, ISO clauses, audit evidence, and operating data — not generic consulting templates.",
  },
  {
    title: "Real-time control",
    body: "Live dashboards make risk visible before it becomes an incident, audit failure, or customer trust problem.",
  },
  {
    title: "Designed for local operations",
    body: "Built around the reality of kitchens, processors, hotels, caterers, cold-chain teams, and East African supply chains.",
  },
  {
    title: "Evidence-first reporting",
    body: "Every finding, control, deviation, and action becomes trackable evidence your team can defend confidently.",
  },
];

const tabs: Array<{ id: DemoTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "ccp", label: "CCP Monitor" },
  { id: "suppliers", label: "Suppliers" },
  { id: "reports", label: "Reports" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useRevealOnScroll() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -70px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function Logo({ theme = "light", compact = false }: { theme?: Theme; compact?: boolean }) {
  return (
    <img
      src={theme === "dark" ? "/logos/vera-logo-light.png" : "/logos/vera-logo-dark.png"}
      alt="Vera Systems logo"
      className={cn("object-contain", compact ? "h-10 w-32" : "h-16 w-52")}
    />
  );
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-slate-200 bg-white text-vera-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/10 dark:text-vera-light"
      aria-label="Toggle dark mode"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-vera-light/40 to-transparent transition duration-700 group-hover:translate-x-full" />
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function Navbar({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-vera-navy/10 bg-white/[0.82] shadow-[0_12px_40px_rgba(15,37,64,.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0B1117]/[0.82]"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => scrollToId("hero")} className="-ml-2 flex items-center">
          <Logo theme={theme} compact />
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToId(item.href)}
              className="text-[11px] font-black uppercase tracking-[0.22em] text-vera-navy/[0.62] transition hover:text-vera-mid dark:text-vera-light/60 dark:hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="hidden rounded-full bg-vera-navy px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(26,58,92,.18)] transition hover:-translate-y-0.5 hover:bg-vera-deep dark:bg-vera-light dark:text-[#0B1117] dark:hover:bg-white sm:inline-flex"
          >
            Book Demo
          </button>
        </div>
      </div>
    </header>
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
          "mb-4 text-[11px] font-black uppercase tracking-[0.28em]",
          light ? "text-vera-light/75" : "text-vera-mid"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-balance text-3xl font-black uppercase leading-[1.05] tracking-[0.035em] sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-vera-navy dark:text-white"
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-sm leading-8 sm:text-base",
            centered && "mx-auto",
            light ? "text-vera-light/[0.72]" : "text-vera-navy/[0.68] dark:text-slate-300"
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function VeraSystemsPage() {
  const [theme, setThemeState] = useState<Theme>("light");
  const progress = useScrollProgress();
  useRevealOnScroll();

  useEffect(() => {
    const stored = window.localStorage.getItem("vera-theme") as Theme | null;
    const initial = stored || "light";
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem("vera-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F6FAFD] text-vera-navy transition-colors duration-500 dark:bg-[#0B1117] dark:text-vera-ice">
      <div
        className="fixed left-0 top-0 z-[70] h-1 bg-gradient-to-r from-vera-navy via-vera-mid to-vera-light transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <ProcessStack />
      <Services />
      <Insights />
      <PlatformDemo />
      <WhyVera />
      <ClientTypes />
      <Contact />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F8FCFF_0%,#E8F2FA_44%,#FFFFFF_100%)] dark:bg-[linear-gradient(135deg,#0B1117_0%,#121A22_46%,#0D1621_100%)]" />
      <div className="absolute inset-0 grid-paper opacity-70 dark:opacity-30" />
      <div className="absolute left-[-12%] top-16 h-[36rem] w-[36rem] rounded-full bg-vera-light/55 blur-3xl dark:bg-vera-mid/[0.12]" />
      <div className="absolute bottom-[-16%] right-[-12%] h-[38rem] w-[38rem] rounded-full bg-white blur-3xl dark:bg-[#263241]/60" />
      <div className="absolute right-[8%] top-32 hidden h-[28rem] w-[28rem] rounded-full border border-vera-mid/10 lg:block dark:border-white/5" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[.96fr_1.04fr] lg:px-8 lg:py-28">
        <div className="reveal" data-reveal>
          <div className="mb-8 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-vera-navy/10 bg-white/[0.08]0 px-4 py-2.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-vera-navy text-white dark:bg-vera-light dark:text-[#0B1117]">
              <span className="h-2 w-2 rounded-full bg-current" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-vera-navy/70 dark:text-vera-light/70">East Africa</span>
            <span className="text-vera-navy/20 dark:text-white/20">•</span>
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-vera-mid dark:text-vera-light/80">B2B Food Safety</span>
          </div>

          <h1 className="text-balance text-[3.1rem] font-black uppercase leading-[0.92] tracking-[-0.035em] text-vera-navy sm:text-6xl lg:text-7xl xl:text-8xl dark:text-white">
            Compliance that feels <span className="text-vera-mid dark:text-vera-light">alive.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-vera-navy/70 sm:text-lg dark:text-slate-300">
            Vera Systems combines food safety consultancy and digital intelligence to help high-risk food operations monitor CCPs, close deviations, and prove audit readiness in real time.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-full bg-vera-navy px-7 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-white shadow-[0_20px_50px_rgba(26,58,92,.22)] transition hover:-translate-y-1 hover:bg-vera-deep dark:bg-vera-light dark:text-[#0B1117] dark:hover:bg-white"
            >
              Book Consultation
            </button>
            <button
              type="button"
              onClick={() => scrollToId("platform")}
              className="rounded-full border border-vera-navy/15 bg-white/75 px-7 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-vera-navy shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-vera-mid hover:bg-white dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
            >
              Explore Platform
            </button>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["ISO", "22000 Ready"],
              ["HACCP", "System Design"],
              ["Live", "CCP Alerts"],
              ["B2B", "Advisory"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[1.4rem] border border-vera-navy/10 bg-white/[0.08]0 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
                <div className="text-xl font-black text-vera-navy dark:text-white">{value}</div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-vera-mid dark:text-vera-light/55">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-2xl" data-reveal>
          <div className="absolute -inset-5 rounded-[3rem] bg-vera-light/70 blur-3xl dark:bg-vera-mid/[0.12]" />
          <div className="relative overflow-hidden rounded-[2.4rem] border border-vera-navy/10 bg-white/[0.85] p-4 shadow-[0_30px_90px_rgba(15,37,64,.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#151D25]/[0.88] dark:shadow-[0_30px_90px_rgba(0,0,0,.35)]">
            <div className="rounded-[1.9rem] border border-vera-navy/10 bg-[#F7FBFE] p-5 dark:border-white/10 dark:bg-[#0E151D]">
              <div className="flex items-center justify-between gap-4 border-b border-vera-navy/10 pb-5 dark:border-white/10">
                <Logo theme="light" />
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Live
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <HeroMetric label="CCP Health" value="97%" tone="success" />
                <HeroMetric label="Open Deviations" value="03" tone="warning" />
                <div className="md:col-span-2">
                  <RiskTrendCard />
                </div>
                <HeroGauge title="Audit Readiness" value={86} />
                <HeroGauge title="Supplier Score" value={92} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMetric({ label, value, tone }: { label: string; value: string; tone: Tone }) {
  return (
    <div className="rounded-[1.5rem] border border-vera-navy/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-vera-navy/[0.48] dark:text-vera-light/50">{label}</p>
        <StatusDot tone={tone} />
      </div>
      <p className="mt-4 text-4xl font-black tracking-[-0.04em] text-vera-navy dark:text-white">{value}</p>
    </div>
  );
}

function HeroGauge({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-vera-navy/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-vera-navy/[0.48] dark:text-vera-light/50">{title}</p>
          <p className="mt-3 text-3xl font-black text-vera-navy dark:text-white">{value}%</p>
        </div>
        <MiniGauge value={value} />
      </div>
    </div>
  );
}

function RiskTrendCard() {
  return (
    <div className="rounded-[1.5rem] border border-vera-navy/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.045]">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-vera-navy/[0.48] dark:text-vera-light/50">Risk Trend</p>
        <span className="text-xs font-black text-emerald-600 dark:text-emerald-300">↓ 24%</span>
      </div>
      <LineChart compact />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-white dark:bg-[#0B1117]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F6FAFD] to-transparent dark:from-[#0B1117]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div className="reveal relative" data-reveal>
          <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-vera-light/70 blur-2xl dark:bg-vera-mid/20" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-vera-navy/10 bg-[#F3F9FE] p-3 shadow-[0_24px_70px_rgba(15,37,64,.12)] dark:border-white/10 dark:bg-white/[0.045]">
            <img
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85"
              alt="Technology and quality control workflow"
              className="h-[32rem] w-full rounded-[1.7rem] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center" data-reveal>
          <SectionHeader
            eyebrow="About Vera Systems"
            title="Food science meets operational intelligence"
            body="Vera Systems is a Rwanda-based B2B consultancy and technology firm at the intersection of food science and data intelligence. The brand bridges the physical reality of commercial kitchens and factory floors with high-level business data."
          />

          <div className="mt-8 rounded-[2rem] border border-vera-navy/10 bg-vera-navy p-7 text-white shadow-[0_24px_60px_rgba(26,58,92,.20)] dark:border-white/10 dark:bg-[#141D26]">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-vera-light/70">Mission</p>
            <p className="mt-4 text-lg font-semibold leading-9 text-vera-light sm:text-xl">
              “To elevate food safety across Rwanda and East Africa through scientific rigor and data-driven systems that improve compliance, efficiency, and trust.”
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MiniInfo title="Consultancy" body="HACCP, ISO 22000, audits, training, and implementation." icon="✓" />
            <MiniInfo title="Software" body="Real-time CCP monitoring, hygiene tracking, and reporting." icon="↗" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniInfo({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="rounded-[1.5rem] border border-vera-navy/10 bg-[#F7FBFE] p-5 dark:border-white/10 dark:bg-white/[0.045]">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-vera-navy text-white dark:bg-vera-light dark:text-[#0B1117]">{icon}</div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-vera-navy dark:text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-vera-navy/[0.62] dark:text-slate-300">{body}</p>
    </div>
  );
}

function ProcessStack() {
  return (
    <section className="relative bg-[#F6FAFD] py-24 sm:py-32 dark:bg-[#111820]">
      <div className="absolute inset-0 grid-paper opacity-60 dark:opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Scroll experience"
          title="A layered system, not a static report"
          body="The sections below use sticky stacking, lighter surfaces, and clear hierarchy so the page feels modern while staying readable."
          centered
        />

        <div className="mt-16 space-y-8">
          {processCards.map((card, index) => (
            <article
              key={card.title}
              data-reveal
              className="reveal sticky overflow-hidden rounded-[2rem] border border-vera-navy/10 bg-white/[0.92] p-6 shadow-[0_24px_70px_rgba(15,37,64,.13)] backdrop-blur-xl dark:border-white/10 dark:bg-[#151E27]/95 sm:p-8 lg:p-10"
              style={{ top: `${96 + index * 18}px`, zIndex: 10 + index }}
            >
              <div className="absolute right-[-4rem] top-[-4rem] h-56 w-56 rounded-full bg-vera-light/55 blur-3xl dark:bg-vera-mid/[0.12]" />
              <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_300px]">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.26em] text-vera-mid">{card.step} / {card.title}</p>
                  <h3 className="mt-5 text-3xl font-black uppercase tracking-[0.02em] text-vera-navy sm:text-4xl dark:text-white">{card.title}</h3>
                  <p className="mt-5 max-w-3xl text-sm leading-8 text-vera-navy/[0.66] sm:text-base dark:text-slate-300">{card.body}</p>
                </div>
                <div className="rounded-[1.6rem] border border-vera-navy/10 bg-[#F4FAFE] p-6 text-center dark:border-white/10 dark:bg-white/[0.045]">
                  <div className="text-5xl font-black text-vera-navy dark:text-vera-light">{card.metric}</div>
                  <div className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-vera-mid dark:text-vera-light/55">{card.label}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 sm:py-32 dark:bg-[#0B1117]">
      <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-vera-light/60 blur-3xl dark:bg-vera-mid/10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Service Pillars"
          title="Clear services, stronger conversion paths"
          body="The offer is separated into two practical paths: consultancy for food safety readiness and software for continuous monitoring."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              className={cn(
                "reveal group overflow-hidden rounded-[2.25rem] border border-vera-navy/10 bg-[#F8FCFF] shadow-[0_24px_70px_rgba(15,37,64,.10)] transition duration-500 hover:-translate-y-2 dark:border-white/10 dark:bg-[#151E27]",
                `reveal-delay-${index + 1}`
              )}
            >
              <div className="relative h-72 overflow-hidden">
                <img src={service.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-vera-navy/[0.86] via-vera-navy/[0.22] to-transparent dark:from-[#0B1117]" />
                <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/[0.85] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-vera-navy backdrop-blur-md">
                  {service.label}
                </span>
              </div>
              <div className="p-7 sm:p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-vera-mid">{service.eyebrow}</p>
                <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-[0.03em] text-vera-navy dark:text-white">{service.title}</h3>
                <p className="mt-5 text-sm leading-8 text-vera-navy/[0.66] dark:text-slate-300">{service.body}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm font-bold text-vera-navy/[0.76] dark:text-vera-light/[0.78]">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-vera-navy text-xs text-white dark:bg-vera-light dark:text-[#0B1117]">✓</span>
                      {bullet}
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

function Insights() {
  return (
    <section className="relative overflow-hidden bg-[#F6FAFD] py-24 sm:py-32 dark:bg-[#111820]">
      <div className="absolute inset-0 grid-paper opacity-60 dark:opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <SectionHeader
            eyebrow="Insights & Intelligence"
            title="Make every risk signal easier to act on"
            body="These cards are lighter, sharper, and easier to scan. They avoid the heavy all-blue feel while keeping Vera’s clinical brand tone."
          />
          <div className="reveal rounded-[2rem] border border-vera-navy/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.045]" data-reveal>
            <p className="text-lg font-semibold leading-8 text-vera-navy/75 dark:text-slate-300">
              “Compliance becomes more valuable when it is visible, measured, and connected to real operational behavior.”
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {insightCards.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={cn(
                "reveal rounded-[2rem] border border-vera-navy/10 bg-white p-7 shadow-[0_18px_50px_rgba(15,37,64,.08)] transition duration-500 hover:-translate-y-2 hover:border-vera-mid/40 dark:border-white/10 dark:bg-[#151E27]",
                `reveal-delay-${index + 1}`
              )}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full bg-vera-ice px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-vera-mid dark:bg-white/10 dark:text-vera-light">{item.tag}</span>
                <span className="text-2xl text-vera-mid/35">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-black leading-tight text-vera-navy dark:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-8 text-vera-navy/[0.62] dark:text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("overview");

  return (
    <section id="platform" className="relative overflow-hidden bg-[#101820] py-24 text-white sm:py-32 dark:bg-[#080D12]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,220,240,.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(74,123,175,.20),transparent_34%)]" />
      <div className="absolute inset-0 grid-paper opacity-25" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <SectionHeader
            eyebrow="Interactive Platform"
            title="A control center, not a spreadsheet"
            body="The dashboard uses a more balanced dark interface: charcoal surfaces, ice-blue highlights, green status signals, and enough contrast to make every chart readable."
            light
          />
          <div data-reveal className="reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <p className="text-lg font-semibold leading-8 text-slate-200">
              Live CCP readings, supplier risk, audit artifacts, and deviation workflows in one premium operational dashboard.
            </p>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="mt-5 rounded-full bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#101820] transition hover:-translate-y-1"
            >
              Request live demo →
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.05] p-3 shadow-[0_30px_90px_rgba(0,0,0,.28)] backdrop-blur-2xl" data-reveal>
          <div className="flex gap-2 overflow-x-auto rounded-[1.7rem] bg-[#0A1016]/80 p-2 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] transition",
                  activeTab === tab.id
                    ? "bg-vera-light text-[#101820] shadow-[0_16px_40px_rgba(200,220,240,.16)]"
                    : "text-vera-light/60 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-3 sm:p-5 lg:p-7">
            {activeTab === "overview" && <OverviewDashboard />}
            {activeTab === "ccp" && <CCPDashboard />}
            {activeTab === "suppliers" && <SupplierDashboard />}
            {activeTab === "reports" && <ReportsDashboard />}
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewDashboard() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <DashboardPanel className="lg:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <StatusDot tone="success" />
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-300">System live</p>
            </div>
            <h3 className="mt-3 text-2xl font-black text-white">Compliance Readiness Trend</h3>
            <p className="mt-1 text-sm text-slate-400">Food safety evidence across sites · updated 14 seconds ago</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-vera-light">March 2026</div>
        </div>
        <LineChart />
      </DashboardPanel>

      <div className="grid gap-4 lg:col-span-4">
        <DataCard label="CCP Health" value="97%" trend="+5.1%" tone="success" />
        <DataCard label="Open Deviations" value="03" trend="-24%" tone="warning" />
        <DataCard label="Audit Readiness" value="86%" trend="+12%" tone="info" />
      </div>

      <DashboardPanel className="lg:col-span-4">
        <h3 className="text-xl font-black text-white">Readiness score</h3>
        <div className="mt-7 flex justify-center">
          <DonutChart value={86} label="Ready" />
        </div>
      </DashboardPanel>
      <DashboardPanel className="lg:col-span-4">
        <h3 className="text-xl font-black text-white">Deviation pattern</h3>
        <StackedBars />
      </DashboardPanel>
      <DashboardPanel className="lg:col-span-4">
        <h3 className="text-xl font-black text-white">Receiving heatmap</h3>
        <HeatMap />
      </DashboardPanel>
    </div>
  );
}

function CCPDashboard() {
  const rows = [
    ["Cold Room A", "3.8°C", "0–5°C", "Stable", "success"],
    ["Cook Step", "72°C", ">70°C", "Stable", "success"],
    ["Chill Down", "9.2°C", "≤8°C", "Watch", "warning"],
    ["Dispatch", "6.1°C", "≤5°C", "Action", "danger"],
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
      <DashboardPanel>
        <h3 className="text-2xl font-black text-white">Critical control points</h3>
        <p className="mt-2 text-sm text-slate-400">Real-time limits, readings, and escalation status.</p>
        <div className="mt-6 grid gap-3">
          {rows.map(([name, value, range, status, tone]) => (
            <div key={name} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-white">{name}</p>
                  <p className="mt-1 text-xs text-slate-400">Target range: {range}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-black text-vera-light">{value}</p>
                  <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]", badgeClass(tone))}>{status}</span>
                </div>
              </div>
              <Sparkline tone={tone} />
            </div>
          ))}
        </div>
      </DashboardPanel>
      <DashboardPanel>
        <h3 className="text-2xl font-black text-white">Deviation timeline</h3>
        <Timeline />
      </DashboardPanel>
    </div>
  );
}

function SupplierDashboard() {
  const suppliers = [
    ["Kivu Dairy Co.", "Dairy", 94, "Preferred"],
    ["Akagera Produce", "Fresh produce", 88, "Approved"],
    ["Virunga Cold Chain", "Logistics", 76, "Review"],
    ["Nyungwe Grains", "Dry goods", 91, "Preferred"],
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <DashboardPanel>
        <h3 className="text-2xl font-black text-white">Supplier risk index</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">Weighted by receiving temperature, document completeness, rejection rate, and corrective-action closure.</p>
        <div className="mt-8 flex justify-center">
          <DonutChart value={89} label="Overall" />
        </div>
        <HeatMap />
      </DashboardPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {suppliers.map(([name, category, score, tier]) => (
          <DashboardPanel key={name} className="transition hover:-translate-y-1 hover:border-vera-light/25">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-black text-white">{name}</h4>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-vera-light/55">{category}</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-vera-light/25 text-xl font-black text-vera-light">{score}</div>
            </div>
            <div className="mt-6 space-y-3">
              <Progress label="Docs" value={score - 4} />
              <Progress label="Receiving" value={score - 8} />
              <Progress label="Traceability" value={score - 2} />
            </div>
            <div className="mt-5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-vera-light/75">{tier}</div>
          </DashboardPanel>
        ))}
      </div>
    </div>
  );
}

function ReportsDashboard() {
  const reports = [
    ["PDF", "HACCP Audit Report", "Full CCP audit log with corrective actions, sign-offs, and compliance ratings."],
    ["DASH", "Monthly CCP Summary", "Trend analysis across control points, deviation frequency, and response times."],
    ["LOG", "Real-Time Hygiene Log", "Timestamped sanitation records replacing paper logs and manual sign-off books."],
    ["ISO", "ISO 22000 Gap Analysis", "Clause-by-clause readiness report with remediation priorities."],
    ["REP", "Supplier Scorecard", "Quarterly supplier performance and corrective-action status."],
    ["API", "Custom Dashboard Export", "Structured data export for management reporting or ERP connection."],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports.map(([badge, title, body]) => (
        <DashboardPanel key={title} className="group transition hover:-translate-y-1 hover:border-vera-light/25">
          <span className="rounded-full bg-vera-light/[0.12] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-vera-light">{badge}</span>
          <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
          <button type="button" className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-vera-light/65 transition group-hover:text-white">
            View artifact →
          </button>
        </DashboardPanel>
      ))}
    </div>
  );
}

function WhyVera() {
  return (
    <section id="why" className="relative overflow-hidden bg-white py-24 sm:py-32 dark:bg-[#0B1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(200,220,240,.58),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_10%,rgba(74,123,175,.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Vera Systems"
          title="Precision, control, and trust in one system"
          body="The revised design uses more white space, clearer contrast, softer backgrounds, and modern card motion so the brand feels premium without becoming too dark."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {whyCards.map((card, index) => (
            <div
              key={card.title}
              data-reveal
              className={cn(
                "reveal rounded-[2rem] border border-vera-navy/10 bg-[#F8FCFF] p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,37,64,.10)] dark:border-white/10 dark:bg-[#151E27]",
                `reveal-delay-${index + 1}`
              )}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-vera-mid">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-black uppercase tracking-[0.04em] text-vera-navy dark:text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-8 text-vera-navy/[0.62] dark:text-slate-300">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientTypes() {
  const clients = ["Processors", "Restaurants", "Exporters", "Manufacturers", "Hotels", "Catering firms", "Cloud kitchens", "Cold chain"];
  return (
    <section className="border-y border-vera-navy/10 bg-[#F6FAFD] py-12 dark:border-white/10 dark:bg-[#111820]">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-vera-mid">Built for food businesses across Rwanda & East Africa</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {clients.map((client) => (
            <span key={client} className="rounded-full border border-vera-navy/10 bg-white px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-vera-navy shadow-sm dark:border-white/10 dark:bg-white/[0.055] dark:text-vera-light">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-vera-navy py-24 text-white sm:py-32 dark:bg-[#080D12]">
      <div className="absolute inset-0 grid-paper opacity-25" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-vera-mid/[0.22] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 border-b border-white/10 pb-10 text-center" data-reveal>
          <p className="text-2xl font-semibold text-vera-light sm:text-3xl">Start with clarity. <span className="font-black text-white">Move to control.</span></p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div data-reveal>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-vera-light/65">Get in touch</p>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-[0.04em] sm:text-5xl">Ready to elevate your food safety?</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-vera-light/[0.72]">
              Book a consultation and find out how Vera Systems can transform compliance operations with real-time intelligence.
            </p>
            <div className="mt-9 space-y-4">
              <ContactLine icon="✉" text="info@verasystems.rw" />
              <ContactLine icon="☎" text="+250 788 000 000" />
              <ContactLine icon="⌖" text="Kigali Innovation City, Rwanda" />
              <ContactLine icon="◎" text="verasystems.rw" />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-4 text-vera-light/[0.82]">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-vera-light/15 bg-white/[0.08] text-lg">{icon}</span>
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Could not send message.");
      setStatus("success");
      setMessage(result.mock ? "Message captured locally. Add CONTACT_BACKEND_URL to forward it to your backend." : "Message sent. Vera Systems will get back to you shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not send message. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/[0.12] bg-white/[0.07] p-5 shadow-2xl backdrop-blur-2xl sm:p-8" data-reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Your name" required />
        <Field label="Company" name="company" placeholder="Your food business" />
        <Field label="Email" name="email" type="email" placeholder="you@company.rw" required />
        <Field label="Phone" name="phone" placeholder="+250 ..." />
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-vera-light/65">Service interest</label>
          <select
            name="service"
            className="w-full rounded-2xl border border-white/[0.12] bg-white/10 px-4 py-4 text-sm text-white outline-none transition focus:border-vera-light/60"
            defaultValue="Both Services"
          >
            <option className="bg-vera-deep">Food Safety Consultancy</option>
            <option className="bg-vera-deep">Digital Intelligence Platform</option>
            <option className="bg-vera-deep">Platform Demo Request</option>
            <option className="bg-vera-deep">Both Services</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-vera-light/65">Message</label>
          <textarea
            name="message"
            required
            placeholder="Tell us about your operation and compliance goals..."
            className="min-h-36 w-full resize-none rounded-2xl border border-white/[0.12] bg-white/10 px-4 py-4 text-sm text-white outline-none transition placeholder:text-vera-light/35 focus:border-vera-light/60"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-vera-light px-6 py-4 text-[12px] font-black uppercase tracking-[0.18em] text-vera-navy transition hover:-translate-y-1 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p className={cn("mt-4 rounded-2xl border px-4 py-3 text-sm", status === "success" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-red-400/30 bg-red-400/10 text-red-200")}>{message}</p>
      ) : null}
    </form>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-vera-light/65">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/[0.12] bg-white/10 px-4 py-4 text-sm text-white outline-none transition placeholder:text-vera-light/35 focus:border-vera-light/60"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080D12] py-8 text-vera-light">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left">
        <Logo theme="dark" compact />
        <p className="text-xs text-vera-light/45">Precision Food Safety. Powered by Data. — Kigali, Rwanda © 2026</p>
      </div>
    </footer>
  );
}

function DashboardPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[1.6rem] border border-white/10 bg-[#121A22]/[0.88] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]", className)}>{children}</div>;
}

function DataCard({ label, value, trend, tone }: { label: string; value: string; trend: string; tone: Tone }) {
  return (
    <DashboardPanel>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">{label}</p>
        <StatusDot tone={tone} />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-4xl font-black tracking-[-0.04em] text-white">{value}</p>
        <p className={cn("text-sm font-black", toneText(tone))}>{trend}</p>
      </div>
    </DashboardPanel>
  );
}

function StatusDot({ tone }: { tone: Tone }) {
  return <span className={cn("h-2.5 w-2.5 rounded-full animate-pulseSoft", toneBg(tone))} />;
}

function toneBg(tone: Tone) {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "warning") return "bg-amber-400";
  if (tone === "danger") return "bg-red-500";
  return "bg-vera-light";
}

function toneText(tone: Tone) {
  if (tone === "success") return "text-emerald-300";
  if (tone === "warning") return "text-amber-300";
  if (tone === "danger") return "text-red-300";
  return "text-vera-light";
}

function badgeClass(tone: Tone) {
  if (tone === "success") return "bg-emerald-400/10 text-emerald-300 border border-emerald-300/20";
  if (tone === "warning") return "bg-amber-400/10 text-amber-300 border border-amber-300/20";
  if (tone === "danger") return "bg-red-400/10 text-red-300 border border-red-300/20";
  return "bg-vera-light/10 text-vera-light border border-vera-light/20";
}

function LineChart({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 760 300" className={cn("w-full overflow-visible", compact ? "mt-4 h-48" : "mt-8 h-72 rounded-[1.4rem] bg-white/[0.03] p-4")}>
      <defs>
        <linearGradient id="lineMain" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#C8DCF0" />
          <stop offset="55%" stopColor="#4A7BAF" />
          <stop offset="100%" stopColor="#2ECC71" />
        </linearGradient>
        <linearGradient id="areaMain" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C8DCF0" stopOpacity=".22" />
          <stop offset="100%" stopColor="#C8DCF0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="30" x2="730" y1={50 + i * 46} y2={50 + i * 46} stroke="rgba(200,220,240,.12)" />
      ))}
      <path d="M30 228 C82 210 108 144 156 162 C210 184 232 78 286 92 C344 108 366 190 420 142 C470 98 500 58 552 74 C615 94 642 42 702 58 C722 62 732 55 740 50 L740 280 L30 280 Z" fill="url(#areaMain)" />
      <path d="M30 228 C82 210 108 144 156 162 C210 184 232 78 286 92 C344 108 366 190 420 142 C470 98 500 58 552 74 C615 94 642 42 702 58 C722 62 732 55 740 50" fill="none" stroke="url(#lineMain)" strokeWidth="5" strokeLinecap="round" className="chart-line" />
      {[
        [156, 162],
        [286, 92],
        [420, 142],
        [552, 74],
        [702, 58],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#C8DCF0" stroke="#101820" strokeWidth="3" />
      ))}
    </svg>
  );
}

function MiniGauge({ value }: { value: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(74,123,175,.16)" strokeWidth="8" />
      <circle cx="40" cy="40" r={radius} fill="none" stroke="#4A7BAF" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
    </svg>
  );
}

function DonutChart({ value, label }: { value: number; label: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative h-44 w-44">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(200,220,240,.12)" strokeWidth="18" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#C8DCF0" strokeWidth="18" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-black text-white">{value}%</div>
        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-vera-light/55">{label}</div>
      </div>
    </div>
  );
}

function Sparkline({ tone }: { tone: Tone }) {
  const stroke = tone === "success" ? "#34D399" : tone === "warning" ? "#FBBF24" : tone === "danger" ? "#F87171" : "#C8DCF0";
  return (
    <svg viewBox="0 0 220 62" className="mt-4 h-14 w-full overflow-visible">
      <path d="M0 40 C20 32 26 45 42 38 C66 28 74 20 98 30 C118 39 130 53 150 42 C176 28 190 21 220 16" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="12" strokeLinecap="round" />
      <path d="M0 40 C20 32 26 45 42 38 C66 28 74 20 98 30 C118 39 130 53 150 42 C176 28 190 21 220 16" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" className="chart-line" />
    </svg>
  );
}

function StackedBars() {
  const bars = [58, 72, 44, 88, 63, 96, 70, 52, 82, 66, 90, 74];
  return (
    <div className="mt-6 flex h-60 items-end gap-3 rounded-[1.4rem] bg-white/[0.03] p-5">
      {bars.map((height, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative w-full overflow-hidden rounded-t-full bg-white/[0.07]" style={{ height: `${height}%` }}>
            <div className="absolute bottom-0 left-0 right-0 rounded-t-full bg-gradient-to-t from-vera-mid to-vera-light" style={{ height: `${Math.max(32, height - 18)}%` }} />
            {height > 84 ? <div className="absolute left-0 right-0 top-0 h-2 bg-amber-300" /> : null}
          </div>
          <span className="text-[9px] text-vera-light/25">{index + 1}</span>
        </div>
      ))}
    </div>
  );
}

function HeatMap() {
  const values = [1, 2, 3, 2, 1, 1, 3, 4, 2, 1, 2, 2, 1, 4, 3, 2, 1, 1, 2, 3, 1, 2, 4, 3, 2, 1, 1, 2];
  const colors = ["bg-emerald-400/45", "bg-vera-mid/55", "bg-amber-300/70", "bg-red-400/75"];
  return (
    <div className="mt-7">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-vera-light/45">Receiving risk heatmap</p>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {values.map((value, index) => (
          <span key={index} className={cn("h-6 rounded-md", colors[value - 1])} />
        ))}
      </div>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[86px_1fr_42px] items-center gap-3">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
        <span className="block h-full rounded-full bg-vera-light" style={{ width: `${value}%` }} />
      </span>
      <span className="text-right text-xs font-black text-vera-light">{value}%</span>
    </div>
  );
}

function Timeline() {
  const items = [
    ["danger", "Dispatch temperature breach", "Batch VS-248 exceeded dispatch cold limit. Corrective action assigned.", "8 min ago"],
    ["warning", "Chill-down delay", "Cooling curve slower than expected for cooked item group B.", "24 min ago"],
    ["success", "Sanitation check closed", "Supervisor verified hygiene checklist and uploaded photo evidence.", "1 hr ago"],
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-l border-white/10 pl-5">
      {items.map(([tone, title, body, time]) => (
        <div key={title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <span className={cn("absolute -left-[26px] top-5 h-3 w-3 rounded-full ring-4 ring-[#121A22]", toneBg(tone))} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-white">{title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-400">{body}</p>
            </div>
            <span className="shrink-0 text-xs text-slate-500">{time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}
