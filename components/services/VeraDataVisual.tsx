"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import { Pulse, Radio } from "@phosphor-icons/react";

const C = {
  navy: "#1A3A5C",
  blue: "#4A7BAF",
  teal: "#18A89D",
  mint: "#8ADFD4",
  sky: "#8FC2E8",
  ice: "#DDECF7",
  amber: "#D99A3D",
};

const deviationMix = [
  { name: "Temperature", value: 38, color: C.blue },
  { name: "Hygiene", value: 27, color: C.teal },
  { name: "Documentation", value: 21, color: C.sky },
  { name: "Supplier", value: 14, color: C.amber },
];

const trend = [
  { t: "W1", v: 62 },
  { t: "W2", v: 68 },
  { t: "W3", v: 71 },
  { t: "W4", v: 75 },
  { t: "W5", v: 81 },
  { t: "W6", v: 86 },
  { t: "W7", v: 92 },
];

export default function VeraDataVisual() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[hsl(var(--border))] bg-gradient-to-br from-white via-white to-[hsl(var(--blue-100))]/40 p-5 shadow-[0_28px_70px_-32px_rgba(15,23,42,.55)] dark:border-white/10 dark:from-[hsl(var(--card))] dark:via-[hsl(var(--card))] dark:to-[hsl(var(--muted))]/20 sm:p-6"
      role="img"
      aria-label="Illustrative preview of the Vera Data live monitoring console, showing a deviation-type breakdown, daily records synced, and a response-time trend."
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[hsl(var(--blue-100))]/60 blur-3xl dark:bg-[hsl(var(--teal))]/10" />

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            Live monitoring
          </p>
          <p className="mt-1 font-display text-lg font-bold text-[hsl(var(--navy-950))] dark:text-white">
            CCP data console
          </p>
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: C.teal }}
        >
          <Radio className="h-3 w-3" weight="bold" />
          Live
        </span>
      </div>

      <div className="relative mt-5 grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            Deviation mix
          </p>

          <div className="mt-1 h-[130px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviationMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="90%"
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {deviationMix.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-1">
            {deviationMix.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-[10px] font-semibold text-[hsl(var(--muted-foreground))]"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Records synced
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
              1,248
              <span className="ml-1 text-xs font-bold text-[hsl(var(--muted-foreground))]">
                /day
              </span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: C.teal }}>
              <Pulse className="h-3 w-3" weight="bold" />
              Across 6 sites
            </p>
          </div>

          <div className="flex-1 rounded-2xl border border-[hsl(var(--border))] bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
              Response time trend
            </p>
            <div className="mt-1 h-[64px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="veraDataTrend" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.45} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={C.blue}
                    strokeWidth={2}
                    fill="url(#veraDataTrend)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--navy-950))] px-4 py-3 text-white dark:border-white/10">
        <span className="text-xs font-bold">Next surveillance audit</span>
        <span className="text-xs font-bold" style={{ color: C.mint }}>
          14 days
        </span>
      </div>
    </div>
  );
}
