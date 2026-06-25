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
      left: direction * Math.max(360, rail.clientWidth * 0.78),
      behavior: "smooth",
    });
  }

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
      className="relative isolate overflow-x-clip bg-[#F7FBFE] py-16 dark:bg-[#09213D] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <header className="flex flex-col justify-between gap-6 border-b border-[#D7E3EE] pb-7 dark:border-white/10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4A7BAF] dark:text-[#9BC5EA]">
              {journey.eyebrow ?? "How it works"}
            </p>

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#6F8297] dark:text-white/55">
              {journey.journeyLabel ??
                "Vera Systems client journey — from first inquiry to continuous live compliance"}
            </p>

            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#173657] dark:text-white sm:text-4xl">
              {journey.title ?? "Your journey with Vera"}
            </h2>

            {journey.body ? (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6A8096] dark:text-white/72 sm:text-base">
                {journey.body}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous journey steps"
              onClick={() => scrollRail(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D5E1EC] bg-white text-[#4A7BAF] shadow-sm transition hover:-translate-x-0.5 hover:border-[#9BC5EA] hover:bg-[#F7FBFE] dark:border-white/15 dark:bg-white/5 dark:text-[#BFE0FA] dark:hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next journey steps"
              onClick={() => scrollRail(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D5E1EC] bg-white text-[#4A7BAF] shadow-sm transition hover:translate-x-0.5 hover:border-[#9BC5EA] hover:bg-[#F7FBFE] dark:border-white/15 dark:bg-white/5 dark:text-[#BFE0FA] dark:hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div
          ref={railRef}
          className="mt-9 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-5 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={`${step.number}-${step.title}`}
                className="relative grid w-[min(84vw,350px)] flex-none grid-rows-[228px_44px_362px] sm:w-[350px]"
              >
                <ProcessPreview index={step.index} />

                <div className="relative">
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[#C8DAEB] dark:bg-[#6B9DC8]/45" />
                  <span className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-[#C8DAEB] dark:bg-[#6B9DC8]/45" />
                </div>

                <JourneyCard
                  step={step}
                  expanded={Boolean(expandedSteps[step.number])}
                  onToggle={() => toggleStep(step.number)}
                  stepLabel={journey.stepLabel ?? "Step"}
                  readMoreLabel={journey.readMoreLabel ?? "Read more"}
                  showLessLabel={journey.showLessLabel ?? "Show less"}
                />

                {index < steps.length - 1 ? (
                  <span className="pointer-events-none absolute left-full top-[248px] z-10 flex w-5 items-center">
                    <span className="h-px flex-1 bg-[#C8DAEB] dark:bg-[#6B9DC8]/45" />
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 bg-[#F7FBFE] text-[#4A7BAF] dark:bg-[#09213D] dark:text-[#9BC5EA]" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-[#D7E3EE] pt-6 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-6 text-[#6A8096] dark:text-white/70">
            {journey.cta ??
              "Start with a free scoping call. We respond with a practical plan within 48 hours."}
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

function BrowserDots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-3 w-3 rounded-full bg-[#B6D4EE] dark:bg-[#7FA9CF]" />
      <span className="h-3 w-3 rounded-full bg-[#B6D4EE] dark:bg-[#7FA9CF]" />
      <span className="h-3 w-3 rounded-full bg-[#B6D4EE] dark:bg-[#7FA9CF]" />
    </div>
  );
}

function ProcessPreview({ index }: { index: number }) {
  const heading = previewTitles[index] ?? "PROCESS STEP";

  return (
    <div className="overflow-hidden rounded-[1.45rem] border border-[#D6E2ED] bg-white p-5 shadow-[0_18px_42px_-32px_rgba(23,54,87,.18)] dark:border-white/10 dark:bg-[#113252] dark:shadow-none">
      <BrowserDots />

      <p className="mt-5 text-[11px] font-black uppercase tracking-[0.15em] text-[#6287AD] dark:text-[#CFE5F8]">
        {heading}
      </p>

      {index === 0 ? <NewEnquiry /> : null}
      {index === 1 ? <GapAnalysis /> : null}
      {index === 2 ? <Roadmap /> : null}
      {index === 3 ? <TrainingChecklist /> : null}
      {index === 4 ? <LiveDashboard /> : null}
      {index === 5 ? <PreAudit /> : null}
      {index === 6 ? <Certification /> : null}
      {index === 7 ? <MonthlyReview /> : null}
    </div>
  );
}

function LoadingRow({
  width,
  className = "",
}: {
  width: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block h-2.5 rounded-full bg-[#DEE6EE] dark:bg-white/22",
        width,
        className
      )}
    />
  );
}

function NewEnquiry() {
  return (
    <div className="mt-5 space-y-3">
      {[
        ["Operation", "Food manufacturer", "w-[78%]"],
        ["Standard", "ISO 22000", "w-[62%]"],
        ["Records", "Paper-based", "w-[54%]"],
      ].map(([label, value, width]) => (
        <div
          key={label}
          className="rounded-lg border border-[#D6E2ED] bg-[#FAFCFE] px-3 py-2.5 dark:border-white/10 dark:bg-[#0D2945]"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#8899A8] dark:text-white/65">
            <span>{label}:</span>
            <span className="text-[#73879C] dark:text-white/72">{value}</span>
          </div>
          <LoadingRow width={width} className="mt-2" />
        </div>
      ))}

      <div className="flex items-center justify-between pt-0.5 text-[10px] text-[#8A98A8] dark:text-white/62">
        <span>Response within</span>
        <span className="font-bold text-[#6E8398] dark:text-white/78">
          48 hours
        </span>
      </div>
    </div>
  );
}

function GapAnalysis() {
  const items = [
    ["HACCP", "not documented", "w-[94%]"],
    ["CCP monitoring", "partial", "w-[82%]"],
    ["Supplier records", "missing", "w-[79%]"],
    ["Temperature logs", "in place", "w-[61%]"],
    ["Internal audit", "none", "w-[68%]"],
  ];

  return (
    <div className="mt-5 space-y-3">
      {items.map(([label, value, width]) => (
        <div key={label}>
          <div className="mb-1.5 text-[10px] text-[#8293A3] dark:text-white/68">
            <span className="font-medium">{label}</span>
            <span className="mx-1">—</span>
            <span>{value}</span>
          </div>
          <LoadingRow width={width} />
        </div>
      ))}
    </div>
  );
}

function Roadmap() {
  const lines = [
    ["CCP design", "w-full"],
    ["PRP framework", "w-[78%]"],
    ["Documentation", "w-[42%]"],
    ["SOP deployment", "w-[58%]"],
  ];

  return (
    <div className="mt-5 space-y-3">
      {lines.map(([label, width]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A4B8CC] dark:bg-white/48" />
          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-[10px] text-[#8495A6] dark:text-white/65">
              <span>{label}</span>
            </div>
            <span className="block h-2.5 rounded-full bg-[#E3EAF1] dark:bg-white/14">
              <span
                className={cn(
                  "block h-full rounded-full bg-[#AFC2D5] dark:bg-[#CFE5F8]/65",
                  width
                )}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainingChecklist() {
  const items = [
    "CCP monitoring",
    "Corrective actions",
    "Hygiene & PRP",
    "Record-keeping",
    "Supplier receiving",
  ];

  return (
    <div className="mt-5 space-y-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2.5 text-[10px] text-[#8192A3] dark:text-white/68"
        >
          <span className="grid h-4 w-4 place-items-center rounded-full border border-[#BCCCDC] text-[9px] font-bold text-[#90A5B8] dark:border-white/20 dark:text-white/65">
            ✓
          </span>
          <div className="flex-1">
            <div>{item}</div>
            <LoadingRow width="w-[72%]" className="mt-1.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LiveDashboard() {
  return (
    <div className="mt-5">
      <div className="space-y-3 text-[10px]">
        {[
          ["Cold Storage", "3.8°C"],
          ["Pasteurization", "74.2°C"],
          ["Receiving Dock", "9.4°C"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="text-[#8596A7] dark:text-white/66">{label}</div>
              <LoadingRow width="w-[70%]" className="mt-1.5" />
            </div>
            <span className="rounded-full bg-[#EEF3F8] px-2.5 py-1 text-[9px] font-bold text-[#7B8FA2] dark:bg-white/12 dark:text-white/78">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div className="flex h-9 items-end gap-1">
          {[5, 8, 6, 10, 12, 9].map((height, index) => (
            <span
              key={index}
              className={cn(
                "w-3 rounded-t-sm bg-[#C7D3DF] dark:bg-white/30",
                height === 5
                  ? "h-4"
                  : height === 6
                    ? "h-5"
                    : height === 8
                      ? "h-6"
                      : height === 9
                        ? "h-7"
                        : height === 10
                          ? "h-8"
                          : "h-9"
              )}
            />
          ))}
        </div>

        <span className="text-xs font-bold text-[#7D90A5] dark:text-white/78">
          96.4%
        </span>
      </div>
    </div>
  );
}

function PreAudit() {
  const items = [
    "CCP docs — complete",
    "PRP records — verified",
    "Supplier list — update needed",
    "Corrective actions — closed",
  ];

  return (
    <div className="mt-5 space-y-3">
      {items.map((item, index) => (
        <div key={item}>
          <div className="text-[10px] text-[#8696A7] dark:text-white/68">
            {item}
          </div>
          <LoadingRow
            width={index === 0 ? "w-[72%]" : index === 1 ? "w-[66%]" : index === 2 ? "w-[82%]" : "w-[61%]"}
            className="mt-1.5"
          />
        </div>
      ))}

      <p className="pt-1 text-[10px] font-bold text-[#778CA0] dark:text-white/78">
        1 minor · 0 major · Ready
      </p>
    </div>
  );
}

function Certification() {
  return (
    <div className="mt-5 grid h-[122px] place-items-center rounded-xl border border-[#D5E1EC] bg-[#FAFCFE] text-center dark:border-white/10 dark:bg-[#0D2945]">
      <div className="w-[76%]">
        <p className="font-display text-base font-black text-[#173657] dark:text-white">
          ISO 22000 : 2018
        </p>

        <p className="mt-1 text-[10px] text-[#8A99A8] dark:text-white/66">
          Food Safety Management
        </p>

        <LoadingRow width="w-full" className="mx-auto mt-3" />
        <LoadingRow width="w-3/5" className="mx-auto mt-2" />

        <span className="mt-3 inline-flex rounded-full bg-[#EDF3F8] px-3 py-1 text-[9px] font-bold text-[#7A8EA3] dark:bg-white/12 dark:text-white/78">
          Certified
        </span>
      </div>
    </div>
  );
}

function MonthlyReview() {
  const lines = [
    ["CCP compliance", "98.1%", "w-[96%]"],
    ["Supplier score", "84/100", "w-[84%]"],
    ["Open deviations", "2 closed", "w-[34%]"],
  ];

  return (
    <div className="mt-5 space-y-4">
      {lines.map(([label, value, width]) => (
        <div key={label}>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#8394A4] dark:text-white/66">{label}</span>
            <span className="font-bold text-[#6C8196] dark:text-white/8૦">
              {value}
            </span>
          </div>

          <span className="mt-1.5 block h-2.5 rounded-full bg-[#E3EAF1] dark:bg-white/14">
            <span
              className={cn(
                "block h-full rounded-full bg-[#BACBDB] dark:bg-[#CFE5F8]/65",
                width
              )}
            />
          </span>
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
  handoffLabel?: string;
  readMoreLabel: string;
  showLessLabel: string;
}) {
  const hasMoreContent = step.body.length > 180 || step.features.length > 2;
  const visibleFeatures = expanded ? step.features : step.features.slice(0, 2);

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-[#D7E3EE] bg-white p-5 shadow-[0_18px_42px_-32px_rgba(23,54,87,.18)] transition duration-300 hover:-translate-y-0.5 hover:border-[#A8D2EE] hover:shadow-[0_22px_48px_-32px_rgba(74,123,175,.22)] dark:border-white/10 dark:bg-[#113252] dark:shadow-none dark:hover:border-[#8FC2E8]/40 dark:hover:bg-[#153A5F]">
      <span className="pointer-events-none absolute right-4 top-2 font-display text-[5.55rem] font-black leading-none tracking-[-0.1em] text-[#DDE9F4] dark:text-[#8CB8DD]/18">
        {step.number}
      </span>

      <div className="relative">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#4A7BAF] dark:text-[#9BC5EA]">
          {step.phase}
        </p>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#73879B] dark:text-white/55">
          {stepLabel} {step.number}
        </p>

        {step.advantage ? (
          <span className="mt-3 inline-flex rounded-full bg-[#EAF4FD] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-[#4A7BAF] dark:bg-[#214B73] dark:text-[#BFE0FA]">
            {step.advantage}
          </span>
        ) : null}

        <h3 className="mt-6 font-display text-[1.35rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[#173657] dark:text-white">
          {step.title}
        </h3>
      </div>

      <div className="relative mt-4 flex-1">
        <p
          className={cn(
            "text-sm leading-7 dark:text-white/78",
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
            className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#4A7BAF] transition hover:text-[#173657] dark:text-[#BFE0FA] dark:hover:text-white"
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
                className="rounded-full border border-[#D8E5EF] bg-[#F2F8FD] px-2.5 py-1 text-[10px] font-bold text-[#4A7BAF] dark:border-white/10 dark:bg-[#1D466C] dark:text-[#C7E3F9]"
              >
                {feature}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}