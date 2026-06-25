"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const previewTitles = [
  "NEW ENQUIRY",
  "GAP ANALYSIS",
  "ROADMAP",
  "TRAINING CHECKLIST",
  "LIVE CCP DASHBOARD",
  "PRE-AUDIT FINDINGS",
  "CERTIFICATION",
  "MONTHLY REVIEW",
];

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
  const railRef = useRef<HTMLDivElement>(null);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(
    {}
  );

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

  function scrollRail(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(360, rail.clientWidth * 0.76),
      behavior: "smooth",
    });
  }

  function toggleStep(stepNumber: string) {
    setExpandedSteps((current) => ({
      ...current,
      [stepNumber]: !current[stepNumber],
    }));
  }

  if (!steps.length) return null;

  return (
    <section
      id="how-it-works"
      className="relative isolate scroll-mt-24 overflow-x-clip bg-[#F7FBFE] py-16 dark:bg-[#1A3A5C] sm:py-20"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="flex flex-col justify-between gap-7 border-b border-black/10 pb-7 dark:border-white/10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#3D5A75] dark:text-white/70">
              {journey.eyebrow ?? "How it works"}
            </p>

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7A88] dark:text-white/45">
              {journey.journeyLabel ??
                "Vera Systems client journey — from first inquiry to continuous live compliance"}
            </p>

            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#182532] dark:text-white sm:text-4xl">
              {journey.title ?? "Your journey with Vera"}
            </h2>

            {journey.body ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5F7284] dark:text-white/70 sm:text-base">
                {journey.body}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous journey steps"
              onClick={() => scrollRail(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-[#182532] shadow-sm transition hover:-translate-x-0.5 dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next journey steps"
              onClick={() => scrollRail(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-[#182532] shadow-sm transition hover:translate-x-0.5 dark:border-white/15 dark:bg-white/10 dark:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          ref={railRef}
          className="mt-9 overflow-x-auto overscroll-x-contain scroll-smooth pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-start gap-5 pr-6 sm:gap-6">
            {steps.map((step, index) => (
              <div
                key={`${step.number}-${step.title}`}
                className="relative flex w-[82vw] max-w-[340px] flex-none flex-col sm:w-[340px]"
              >
                <ProcessPreview index={step.index} />

                <div className="relative h-[52px]">
                  <span className="absolute left-1/2 top-0 h-[20px] w-px -translate-x-1/2 bg-black/10 dark:bg-white/15" />
                  <span className="absolute bottom-0 left-1/2 h-[20px] w-px -translate-x-1/2 bg-black/10 dark:bg-white/15" />
                </div>

                <JourneyCard
                  step={step}
                  expanded={Boolean(expandedSteps[step.number])}
                  onToggle={() => toggleStep(step.number)}
                  stepLabel={journey.stepLabel ?? "Step"}
                  handoffLabel={journey.handoffLabel ?? "What happens next"}
                  readMoreLabel={journey.readMoreLabel ?? "Read more"}
                  showLessLabel={journey.showLessLabel ?? "Show less"}
                />

                {index < steps.length - 1 ? (
                  <span className="pointer-events-none absolute left-full top-[230px] z-20 flex w-5 items-center">
                    <span className="h-px flex-1 bg-black/10 dark:bg-white/15" />
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 bg-[#F7FBFE] text-[#6C7A88] dark:bg-[#1A3A5C] dark:text-white/55" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-[#5F7284] dark:text-white/65">
            {journey.cta ??
              "Start with a free scoping call. We respond with a practical plan within 48 hours."}
          </p>

          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#182532] px-4 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-[#1A3A5C]"
          >
            {journey.ctaAction ?? copy.actions.bookConsultation}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BrowserDots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-3 w-3 rounded-full bg-black/12 dark:bg-white/18" />
      <span className="h-3 w-3 rounded-full bg-black/12 dark:bg-white/18" />
      <span className="h-3 w-3 rounded-full bg-black/12 dark:bg-white/18" />
    </div>
  );
}

function ProcessPreview({ index }: { index: number }) {
  const heading = previewTitles[index] ?? "PROCESS STEP";

  return (
    <div className="h-[205px] overflow-hidden rounded-[1.45rem] border border-black/10 bg-white p-5 shadow-[0_12px_35px_-25px_rgba(0,0,0,.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <BrowserDots />

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.15em] text-black/35 dark:text-white/35">
        {heading}
      </p>

      {index === 0 && <NewEnquiryPreview />}
      {index === 1 && <GapAnalysisPreview />}
      {index === 2 && <RoadmapPreview />}
      {index === 3 && <TrainingPreview />}
      {index === 4 && <DashboardPreview />}
      {index === 5 && <AuditPreview />}
      {index === 6 && <CertificationPreview />}
      {index === 7 && <ReviewPreview />}
    </div>
  );
}

function SkeletonBar({
  width,
  dark = false,
}: {
  width: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "block h-2 rounded-full",
        dark
          ? "bg-[linear-gradient(90deg,rgba(255,255,255,.11),rgba(255,255,255,.2),rgba(255,255,255,.11))]"
          : "bg-[linear-gradient(90deg,rgba(15,23,42,.08),rgba(15,23,42,.16),rgba(15,23,42,.08))]",
        width
      )}
    />
  );
}

function NewEnquiryPreview() {
  return (
    <div className="mt-5 space-y-3">
      <div className="rounded-lg border border-black/8 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <SkeletonBar width="w-4/5" />
      </div>
      <div className="rounded-lg border border-black/8 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <SkeletonBar width="w-3/4" />
      </div>
      <div className="rounded-lg border border-black/8 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
        <SkeletonBar width="w-2/3" />
      </div>
    </div>
  );
}

function GapAnalysisPreview() {
  return (
    <div className="mt-5 space-y-3">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div key={item} className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-black/18 dark:bg-white/18" />
          <SkeletonBar
            width={["w-full", "w-[88%]", "w-[83%]", "w-[63%]", "w-[70%]"][index]}
          />
        </div>
      ))}
    </div>
  );
}

function RoadmapPreview() {
  return (
    <div className="mt-5 space-y-3">
      {["w-full", "w-[82%]", "w-[44%]", "w-[60%]"].map((width, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-black/18 dark:bg-white/18" />
          <div className="h-2 flex-1 rounded-full bg-black/6 dark:bg-white/8">
            <span
              className={cn(
                "block h-full rounded-full bg-[linear-gradient(90deg,rgba(17,24,39,.32),rgba(17,24,39,.18))] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.34),rgba(255,255,255,.16))]",
                width
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainingPreview() {
  return (
    <div className="mt-5 space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <span className="grid h-4 w-4 place-items-center rounded-full border border-black/14 text-[9px] font-black text-black/30 dark:border-white/18 dark:text-white/30">
            ✓
          </span>
          <SkeletonBar width="w-[80%]" />
        </div>
      ))}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="mt-5">
      <div className="space-y-2.5">
        {[1, 2, 3].map((row, index) => (
          <div key={row} className="flex items-center justify-between gap-2">
            <SkeletonBar width="w-1/2" />
            <span className="rounded-full bg-black/8 px-3 py-1 text-[9px] font-black text-black/35 dark:bg-white/10 dark:text-white/35">
              {index === 0 ? "3.8°C" : index === 1 ? "74.2°C" : "9.4°C"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div className="flex h-8 items-end gap-1">
          {[3, 5, 4, 7, 8, 6].map((height, index) => (
            <span
              key={index}
              className={cn(
                "w-3 rounded-t-sm bg-black/18 dark:bg-white/18",
                height === 3 && "h-3",
                height === 4 && "h-4",
                height === 5 && "h-5",
                height === 6 && "h-6",
                height === 7 && "h-7",
                height === 8 && "h-8"
              )}
            />
          ))}
        </div>

        <span className="text-xs font-black text-black/35 dark:text-white/35">
          96.4%
        </span>
      </div>
    </div>
  );
}

function AuditPreview() {
  return (
    <div className="mt-5 space-y-3">
      {[1, 2, 3, 4].map((item, index) => (
        <SkeletonBar
          key={item}
          width={["w-[58%]", "w-[52%]", "w-[66%]", "w-[60%]"][index]}
        />
      ))}
      <div className="pt-2">
        <SkeletonBar width="w-[48%]" />
      </div>
    </div>
  );
}

function CertificationPreview() {
  return (
    <div className="mt-5 grid h-[115px] place-items-center rounded-xl border border-black/8 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]">
      <div className="w-[72%] space-y-3">
        <SkeletonBar width="w-[72%]" />
        <SkeletonBar width="w-[54%]" />
        <div className="flex justify-center pt-1">
          <span className="h-8 w-28 rounded-full bg-[linear-gradient(90deg,rgba(15,23,42,.10),rgba(15,23,42,.18),rgba(15,23,42,.10))] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.08),rgba(255,255,255,.16),rgba(255,255,255,.08))]" />
        </div>
      </div>
    </div>
  );
}

function ReviewPreview() {
  return (
    <div className="mt-5 space-y-4">
      {[
        ["w-[96%]", "w-10"],
        ["w-[84%]", "w-12"],
        ["w-[35%]", "w-14"],
      ].map(([lineWidth, tagWidth], index) => (
        <div key={index}>
          <div className="mb-1.5 flex items-center justify-between">
            <SkeletonBar width="w-2/5" />
            <span
              className={cn(
                "block h-3 rounded-full bg-black/10 dark:bg-white/10",
                tagWidth
              )}
            />
          </div>

          <div className="h-3 rounded-full bg-black/6 dark:bg-white/8">
            <span
              className={cn(
                "block h-full rounded-full bg-[linear-gradient(90deg,rgba(17,24,39,.32),rgba(17,24,39,.18))] dark:bg-[linear-gradient(90deg,rgba(255,255,255,.34),rgba(255,255,255,.16))]",
                lineWidth
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function JourneyCard({
  step,
  expanded,
  onToggle,
  stepLabel,
  handoffLabel,
  readMoreLabel,
  showLessLabel,
}: {
  step: JourneyStep;
  expanded: boolean;
  onToggle: () => void;
  stepLabel: string;
  handoffLabel: string;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const hasMoreContent = step.body.length > 175 || step.features.length > 2;
  const visibleFeatures = expanded ? step.features : step.features.slice(0, 2);

  return (
    <article className="relative flex h-[380px] flex-col overflow-hidden rounded-[1.45rem] border border-black/10 bg-white p-5 shadow-[0_16px_42px_-28px_rgba(0,0,0,.12)] transition duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <span className="pointer-events-none absolute right-4 top-2 font-display text-[5.45rem] font-black leading-none tracking-[-0.1em] text-black/[0.05] dark:text-white/[0.08]">
        {step.number}
      </span>

      <div className="relative">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#516D87] dark:text-white/70">
          {step.phase}
        </p>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A8794] dark:text-white/45">
          {stepLabel} {step.number}
        </p>

        {step.advantage ? (
          <span className="mt-3 inline-flex rounded-full bg-black/[0.04] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-[#5B6977] dark:bg-white/10 dark:text-white/70">
            {step.advantage}
          </span>
        ) : null}

        <h3 className="mt-3 max-w-[78%] font-display text-[1.32rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#182532] dark:text-white">
          {step.title}
        </h3>
      </div>

      <div className="relative mt-4 flex-1">
        <p
          className={cn(
            "text-sm leading-7 text-[#65798D] dark:text-white/72",
            !expanded && hasMoreContent && "line-clamp-4"
          )}
        >
          {step.body}
        </p>

        {hasMoreContent ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-[#4D647A] transition hover:text-[#182532] dark:text-white/80 dark:hover:text-white"
          >
            {expanded ? showLessLabel : readMoreLabel}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        ) : null}

        {visibleFeatures.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleFeatures.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-black/8 bg-black/[0.03] px-2.5 py-1 text-[10px] font-bold text-[#5B6977] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70"
              >
                {feature}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative mt-4 border-t border-black/10 pt-3 dark:border-white/12">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#7A8794] dark:text-white/45">
          {handoffLabel}
        </p>

        <p className="mt-1 text-xs font-bold leading-5 text-[#182532] dark:text-white">
          {step.handoff}
        </p>
      </div>
    </article>
  );
}