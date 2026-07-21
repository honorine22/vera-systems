"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const C = {
  navy: "#1A3A5C",
  blue: "#4A7BAF",
  teal: "#18A89D",
  mint: "#8ADFD4",
  sky: "#8FC2E8",
  amber: "#D99A3D",
};

const categories = [
  { key: "temperature", label: "Temperature", color: C.blue },
  { key: "hygiene", label: "Hygiene", color: C.teal },
  { key: "documentation", label: "Documentation", color: C.sky },
  { key: "supplier", label: "Supplier", color: C.amber },
  { key: "pest", label: "Pest control", color: C.navy },
];

const data = [
  { m: "Jan", temperature: 14, hygiene: 10, documentation: 12, supplier: 7, pest: 4 },
  { m: "Feb", temperature: 13, hygiene: 9, documentation: 11, supplier: 6, pest: 4 },
  { m: "Mar", temperature: 12, hygiene: 9, documentation: 9, supplier: 6, pest: 3 },
  { m: "Apr", temperature: 11, hygiene: 8, documentation: 8, supplier: 5, pest: 3 },
  { m: "May", temperature: 10, hygiene: 7, documentation: 7, supplier: 5, pest: 3 },
  { m: "Jun", temperature: 9, hygiene: 6, documentation: 6, supplier: 4, pest: 2 },
  { m: "Jul", temperature: 8, hygiene: 6, documentation: 5, supplier: 4, pest: 2 },
  { m: "Aug", temperature: 7, hygiene: 5, documentation: 5, supplier: 3, pest: 2 },
  { m: "Sep", temperature: 6, hygiene: 5, documentation: 4, supplier: 3, pest: 1 },
  { m: "Oct", temperature: 6, hygiene: 4, documentation: 3, supplier: 2, pest: 1 },
  { m: "Nov", temperature: 5, hygiene: 4, documentation: 3, supplier: 2, pest: 1 },
  { m: "Dec", temperature: 4, hygiene: 3, documentation: 2, supplier: 2, pest: 1 },
];

export default function DeviationTrendVisual() {
  return (
    <div
      className="hover-card rounded-3xl border border-[hsl(var(--border))] bg-white/75 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-7"
      data-reveal
    >
      <p className="sr-only">
        Chart: monthly deviation counts by category from January to December.
        Every tracked category — temperature, hygiene, documentation, supplier,
        and pest control — trends down across the year, for a combined 71%
        reduction in open deviations by December compared to January.
      </p>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            12-month trend
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-[hsl(var(--navy-950))] dark:text-white sm:text-xl">
            Deviations by category, resolved over time
          </h3>
        </div>

        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: C.teal }}
        >
          −71% since Jan
        </span>
      </div>

      <div className="mt-6 h-[280px] w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              {categories.map((cat) => (
                <linearGradient key={cat.key} id={`devTrend-${cat.key}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={cat.color} stopOpacity={0.75} />
                  <stop offset="100%" stopColor={cat.color} stopOpacity={0.12} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid stroke="rgba(26,58,92,.08)" vertical={false} />

            <XAxis
              dataKey="m"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#65758A", fontSize: 11, fontWeight: 600 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#65758A", fontSize: 11 }}
              width={28}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 14,
                border: "1px solid rgba(200,220,240,.75)",
                boxShadow: "0 18px 46px -26px rgba(26,58,92,.35)",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 12,
              }}
            />

            {categories.map((cat) => (
              <Area
                key={cat.key}
                type="monotone"
                dataKey={cat.key}
                name={cat.label}
                stackId="1"
                stroke={cat.color}
                strokeWidth={1.5}
                fill={`url(#devTrend-${cat.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {categories.map((cat) => (
          <span
            key={cat.key}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--muted-foreground))]"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
