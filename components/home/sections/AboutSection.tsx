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
      <p className="inline-flex items-center gap-2.5 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </p>

      <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
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
    { icon: Target, label: copy.about.whyLabel, body: copy.about.why, accent: C.teal },
    { icon: Compass, label: copy.about.howLabel, body: copy.about.how, accent: C.blue },
    { icon: Stack, label: copy.about.whatLabel, body: copy.about.what, accent: C.blueDeep },
  ];

  return (
    <motion.div
      className="relative mt-16 border-t border-[hsl(var(--border))] pt-14 dark:border-white/10 sm:mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={narrativeContainerVariants}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={narrativeCardVariants}
              className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white/90 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] bg-white dark:bg-[hsl(var(--background))]"
                style={{ borderColor: item.accent, color: item.accent }}
              >
                <Icon className="h-5 w-5" weight="fill" />
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-[hsl(var(--navy-950))] dark:text-white sm:text-2xl">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[hsl(var(--muted-foreground))] sm:text-base">
                {item.body}
              </p>
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
      className="vera-section-surface relative overflow-hidden bg-[hsl(var(--muted))]/40 py-24 md:py-28"
    >
      <div className="absolute inset-0 dot-grid opacity-35 dark:opacity-20" />
      <SectionBackground variant="collage" colors={[C.blue, C.teal, C.blueDeep]} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div data-reveal="left">
            <div className="hover-card relative aspect-[4/4.7] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera dark:border-white/10">
              <img
                src="https://images.pexels.com/photos/18712504/pexels-photo-18712504.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt={copy.about.title}
                className="h-full w-full object-cover transition duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/72 via-[hsl(var(--navy-950))]/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))]/88">
                <p className="text-xs font-bold text-[hsl(var(--teal))]">
                  {copy.about.established}
                </p>
                <p className="font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                  {copy.about.location}
                </p>
              </div>
            </div>
          </div>

          <div data-reveal="right">
            <SectionHeader
              eyebrow={copy.about.eyebrow}
              title={copy.about.title}
              body={copy.about.body}
            />

          </div>
        </div>

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
