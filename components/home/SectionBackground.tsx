"use client";

import { motion } from "motion/react";

export type BackgroundVariant = "collage" | "diagonal" | "topo" | "dots";

const driftSlow = {
  animate: { x: [0, 18, -6, 0], y: [0, -14, 10, 0] },
  transition: { duration: 22, repeat: Infinity, ease: "easeInOut" as const },
};

const driftSlower = {
  animate: { x: [0, -16, 8, 0], y: [0, 12, -10, 0] },
  transition: { duration: 27, repeat: Infinity, ease: "easeInOut" as const },
};

const pulse = {
  animate: { opacity: [0.35, 0.9, 0.35] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
};

function Collage({ colors }: { colors: [string, string, string] }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-16 -top-24 h-96 w-96 rounded-full blur-2xl"
        style={{ background: colors[0], opacity: 0.42 }}
        {...driftSlow}
      />
      <motion.div
        className="absolute -right-10 bottom-0 h-80 w-80 rounded-full blur-2xl"
        style={{ background: colors[1], opacity: 0.38 }}
        {...driftSlower}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full blur-2xl"
        style={{ background: colors[2], opacity: 0.3 }}
        {...driftSlow}
      />
    </div>
  );
}

function Diagonal({ colors }: { colors: [string, string, string] }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br"
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors[0]}38 0%, ${colors[1]}28 50%, ${colors[2]}38 100%)`,
        backgroundSize: "200% 200%",
      }}
      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Topo({ colors }: { colors: [string, string, string] }) {
  const paths = [
    { d: "M-40,60 Q120,10 220,70 T520,50", color: colors[0] },
    { d: "M-40,140 Q140,90 220,150 T520,120", color: colors[1] },
    { d: "M-40,220 Q150,170 240,225 T520,195", color: colors[2] },
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 480 280"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          fill="none"
          stroke={p.color}
          strokeWidth="1.75"
          strokeOpacity="0.55"
          pathLength={1}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function Dots({ colors }: { colors: [string, string, string] }) {
  const accents = [
    { cx: 60, cy: 30, color: colors[0] },
    { cx: 140, cy: 70, color: colors[1] },
    { cx: 260, cy: 40, color: colors[2] },
    { cx: 340, cy: 90, color: colors[0] },
    { cx: 200, cy: 130, color: colors[1] },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 dark:hidden" />
      <div className="absolute inset-0 hidden dot-grid-white opacity-30 dark:block" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {accents.map((a, i) => (
          <motion.circle
            key={i}
            cx={a.cx}
            cy={a.cy}
            r="4"
            fill={a.color}
            {...pulse}
            transition={{ ...pulse.transition, delay: i * 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function SectionBackground({
  variant,
  colors,
}: {
  variant: BackgroundVariant;
  colors: [string, string, string];
}) {
  if (variant === "collage") return <Collage colors={colors} />;
  if (variant === "diagonal") return <Diagonal colors={colors} />;
  if (variant === "topo") return <Topo colors={colors} />;
  return <Dots colors={colors} />;
}
