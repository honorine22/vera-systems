"use client";

import { motion } from "motion/react";
import { Compass, Stack, Target, Users } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";
import SectionBackground from "../SectionBackground";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
};

const narrativeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const narrativeCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const founderImages = [
  "/images/founder-norbert-rafiki.jpeg",
  "/images/founder-corneille-niyobyiringiro.jpeg",
];

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">

      <h2 className="font-display text-4xl font-medium tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
        {title}
      </h2>

      {body && (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[hsl(var(--muted-foreground))] md:text-base">
          {body}
        </p>
      )}
    </div>
  );
}

function NarrativeSection({ copy }: { copy: SiteCopy }) {
  const items = [
    { icon: Target, label: copy.about.whyLabel, body: copy.about.why, accent: C.blue },
    { icon: Compass, label: copy.about.howLabel, body: copy.about.how, accent: C.blue },
    { icon: Stack, label: copy.about.whatLabel, body: copy.about.what, accent: C.blueDeep },
  ];

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={narrativeContainerVariants}
    >
      <div className="grid items-start gap-5 sm:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={narrativeCardVariants}
              className={`vera-card-surface hover-card group relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/90 p-5 shadow-soft backdrop-blur dark:border-white/10 ${index % 2 === 1 ? "md:mt-8" : ""}`}
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-25"
                style={{ background: item.accent }}
              />

              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] bg-white dark:bg-[hsl(var(--background))]"
                style={{ borderColor: item.accent, color: item.accent }}
              >
                <Icon className="h-5 w-5" weight="fill" />
              </div>

              <p className="relative mt-5 font-mono text-xs font-bold" style={{ color: item.accent }}>
                0{index + 1}
              </p>

              <h3 className="relative mt-2 font-display text-lg font-extrabold text-[hsl(var(--navy-950))] dark:text-white sm:text-xl">
                {item.label}
              </h3>

              <details className="group/details relative mt-3">
                <p className="line-clamp-6 text-sm leading-7 text-[hsl(var(--muted-foreground))] group-open/details:line-clamp-none">
                  {item.body}
                </p>
                <summary className="mt-3 cursor-pointer list-none text-xs font-extrabold text-[#4A7BAF] marker:hidden after:content-['Read_more'] group-open/details:after:content-['Show_less']" />
              </details>

              <div
                className="relative mt-5 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                style={{ background: item.accent }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function AboutSection({ copy }: { copy: SiteCopy }) {
  return (
    <section
      id="about"
      className="vera-section-surface vera-page-gradient relative -mt-20 overflow-hidden bg-[hsl(var(--muted))]/40"
    >
      <div id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-10 pt-24 lg:h-[100svh] lg:pb-8 lg:pt-20">
        <img
          src="https://images.pexels.com/photos/18712504/pexels-photo-18712504.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[#061225]/62" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(6,18,37,.78)_0%,rgba(6,18,37,.58)_48%,rgba(6,18,37,.38)_100%)]" />
        <div className="mx-auto w-full px-6 text-center" data-reveal>
          <h1 className="mx-auto text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.72)] md:text-6xl">
            {copy.about.title}
          </h1>
          <p className="mx-auto mt-6 max-w-4xl text-base font-medium leading-8 text-white drop-shadow-[0_3px_18px_rgba(0,0,0,.8)] md:text-lg">
            {copy.about.body}
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-6 md:pb-20">
        <NarrativeSection copy={copy} />

        <div className="mt-14" data-reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[hsl(var(--teal))]">
                {copy.about.foundersEyebrow}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-3xl">
                {copy.about.foundersTitle}
              </h3>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[hsl(var(--blue-700))] text-[hsl(var(--blue-700))] dark:border-white/40 dark:text-white sm:flex">
              <Users className="h-5 w-5" weight="fill" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {copy.about.team.map((member, index) => (
              <article
                key={member.name}
                className="hover-card group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/92 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-5"
              >
                <div
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-10 blur-3xl"
                  style={{ background: [C.blue, C.teal][index] ?? C.blueDeep }}
                />
                <div className="relative grid gap-5 sm:grid-cols-[148px_1fr]">
                  <div className="relative h-48 overflow-hidden rounded-3xl border border-white/80 bg-[hsl(var(--blue-100))] shadow-md dark:border-white/10 sm:h-full">
                    <img
                      src={founderImages[index] ?? founderImages[0]}
                      alt={member.name}
                      className="h-full min-h-[190px] w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(var(--navy-950))]/36 to-transparent" />
                    <div
                      className="absolute bottom-3 left-3 rounded-xl px-2.5 py-1 text-xs font-bold text-white shadow-soft"
                      style={{ background: [C.blueDeep, C.teal][index] ?? C.blue }}
                    >
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-center">
                    <h4 className="font-display text-lg font-bold text-[hsl(var(--navy-950))] dark:text-white">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-sm font-semibold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
                      {member.role}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[hsl(var(--teal))]">
                      {member.credential}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
