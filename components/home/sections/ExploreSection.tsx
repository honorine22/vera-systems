"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, SquaresFour, Users } from "@phosphor-icons/react";
import type { SiteCopy } from "../translations";
import SectionBackground from "../SectionBackground";

const icons = [Users, SquaresFour, BookOpen, Briefcase];
const accents = ["#4A7BAF", "#6FA7D8", "#1A3A5C", "#4A7BAF"];

export default function ExploreSection({ copy }: { copy: SiteCopy }) {
  const items = [
    ...copy.explore.items,
    {
      label: copy.nav.services,
      body: "Explore Vera Consulting, Data, Academy, and Media in one connected service system.",
      href: "/services",
    },
  ];

  return (
    <section className="relative overflow-hidden py-14 dark:border-white/10 md:py-16">
      <SectionBackground variant="topo" colors={accents as [string, string, string]} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl" data-reveal>
          <h2 className="font-display text-3xl font-medium tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-4xl">
            {copy.explore.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index] ?? Users;
            const accent = accents[index] ?? "#4A7BAF";

            return (
              <Link
                key={item.label}
                href={item.href}
                data-reveal
                className="hover-card group flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-white p-5 shadow-[0_16px_40px_-32px_rgba(15,23,42,.4)] dark:border-white/10 dark:bg-[hsl(var(--card))]"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-full border-[1.5px]"
                  style={{ borderColor: accent, color: accent }}
                >
                  <Icon className="h-5 w-5" weight="fill" />
                </span>
                <p className="mt-4 text-sm font-bold text-[hsl(var(--navy-950))] dark:text-white">
                  {item.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">
                  {item.body}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition group-hover:gap-2.5"
                  style={{ color: accent }}
                >
                  {copy.actions.learnMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
