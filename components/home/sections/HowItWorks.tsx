"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";

type JourneyCard = {
  title: string;
  body: string;
  handoff?: string;
  label?: string;
  advantage?: string;
  features?: string[];
};

type JourneyCopy = {
  eyebrow?: string;
  title?: string;
  body?: string;
  journeyLabel?: string;
  progressLabel?: string;
  stepLabel?: string;
  handoffLabel?: string;
  readMoreLabel?: string;
  showLessLabel?: string;
  cta?: string;
  ctaAction?: string;
  cards?: JourneyCard[];
};

type JourneyStep = JourneyCard & {
  index: number;
  number: string;
  phase: string;
  handoff: string;
  features: string[];
};

const phases = ["PLAN", "PLAN", "PLAN", "DO", "DO", "CHECK", "ACT", "ACT"];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export default function StackExperience({ copy }: { copy: SiteCopy }) {
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(
    {}
  );
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const journey = copy.stack as unknown as JourneyCopy;

  const steps = useMemo<JourneyStep[]>(
    () =>
      (journey.cards ?? []).map((item, index) => ({
        ...item,
        index,
        number: String(index + 1).padStart(2, "0"),
        phase: phases[index] ?? "STEP",
        handoff: item.handoff ?? item.label ?? "",
        features: item.features ?? [],
      })),
    [journey.cards]
  );

  // A thin line runs the height of the timeline and fills in as the list
  // scrolls through the middle of the viewport — a quiet, continuous "how
  // far through the journey am I" signal instead of relying on scroll
  // position alone. Plain window scroll listener, read-only (no preventDefault,
  // no scroll manipulation) so it can't interfere with native scrolling.
  useEffect(() => {
    let raf = 0;

    function measure() {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.5;
      const raw = (anchor - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function toggleStep(stepNumber: string) {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  }

  if (!steps.length) return null;

  return (
    <section
      id="how-it-works"
      className="relative isolate overflow-x-clip bg-[#F7FBFE] py-20 dark:bg-[#09213D] sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-3xl border-b border-[#D7E3EE] pb-7 dark:border-white/10">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4A7BAF] dark:text-[#9BC5EA]">
            {journey.eyebrow ?? "How it works"}
          </p>

          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#6F8297] dark:text-white/55">
            {journey.journeyLabel ??
              "Vera Systems client journey — from first inquiry to continuous live compliance"}
          </p>

          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[#173657] dark:text-white sm:text-6xl">
            {journey.title ?? "Your journey with Vera"}
          </h2>

          {journey.body ? (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6A8096] dark:text-white/72 sm:text-base">
              {journey.body}
            </p>
          ) : null}
        </header>

        <div ref={trackRef} className="relative mt-12 max-w-2xl">
          <div
            aria-hidden="true"
            className="absolute left-4 top-1 bottom-1 w-px bg-[#D7E3EE] dark:bg-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute left-4 top-1 w-px bg-gradient-to-b from-[#4A7BAF] via-[#18A89D] to-[#8ADFD4]"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="space-y-9 sm:space-y-10">
            {steps.map((step) => (
              <StepRow
                key={`${step.number}-${step.title}`}
                step={step}
                expanded={Boolean(expandedSteps[step.number])}
                onToggle={() => toggleStep(step.number)}
                readMoreLabel={journey.readMoreLabel ?? "Read more"}
                showLessLabel={journey.showLessLabel ?? "Show less"}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#D7E3EE] pt-6 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-[#6A8096] dark:text-white/70">
            {journey.cta ??
              "Start with a GAP Analysis call. We respond with a practical plan within 48 hours."}
          </p>

          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#173657] transition hover:text-[#4A7BAF] dark:text-white dark:hover:text-[#9BC5EA]"
          >
            {journey.ctaAction ?? copy.actions.bookConsultation}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  expanded,
  onToggle,
  readMoreLabel,
  showLessLabel,
}: {
  step: JourneyStep;
  expanded: boolean;
  onToggle: () => void;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const hasMoreContent = step.body.length > 130;

  return (
    <div data-reveal className="relative flex gap-5 sm:gap-6">
      <div className="relative z-10 grid h-8 w-8 flex-none place-items-center rounded-full border-2 border-[#D7E3EE] bg-[#F7FBFE] text-[11px] font-black text-[#4A7BAF] dark:border-white/15 dark:bg-[#09213D] dark:text-[#9BC5EA]">
        {step.number}
      </div>

      <div className="flex-1 pb-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#4A7BAF] dark:text-[#9BC5EA]">
            {step.phase}
          </span>

          {step.advantage ? (
            <span className="inline-flex rounded-full bg-[#EAF4FD] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#4A7BAF] dark:bg-[#214B73] dark:text-[#BFE0FA]">
              {step.advantage}
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold leading-[1.15] tracking-[-0.02em] text-[#173657] dark:text-white sm:text-xl">
          {step.title}
        </h3>

        <p
          className={cn(
            "mt-2 max-w-xl text-sm leading-6 text-[#5F7690] dark:text-white/72",
            !expanded && hasMoreContent && "line-clamp-2"
          )}
        >
          {step.body}
        </p>

        {hasMoreContent ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-[#4A7BAF] transition hover:text-[#173657] dark:text-[#BFE0FA] dark:hover:text-white"
          >
            {expanded ? showLessLabel : readMoreLabel}
            <CaretDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}