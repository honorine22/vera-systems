import { ArrowRight, CheckCircle2, Cpu, GraduationCap, Microscope, Shield } from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
  amber: "#F0A22E",
};

const services = [
  {
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "98%", label: "Audit readiness" },
    accent: C.blue,
    icon: Shield,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "3.4×", label: "Faster response" },
    accent: C.teal,
    icon: Cpu,
  },
  {
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "100%", label: "Team competence" },
    accent: C.blueDeep,
    icon: GraduationCap,
  },
  {
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df7b?auto=format&fit=crop&w=1200&q=85",
    stat: { value: "Lab", label: "Technical evidence" },
    accent: C.amber,
    icon: Microscope,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
    <div className="mx-auto max-w-3xl text-center" data-reveal>
      <p className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.24em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-8 bg-current opacity-50" />
      </p>

      <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
        {title}
      </h2>

      {body && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

export default function ServicesSection({ copy }: { copy: SiteCopy }) {
  const serviceItems = copy.services.items.map((item, index) => ({
    ...services[index % services.length],
    ...item,
    stat: { ...services[index % services.length].stat, label: item.statLabel },
  }));

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-28 dark:bg-[hsl(var(--muted))]/20"
    >
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/2 translate-y-1/4 rounded-full bg-[hsl(var(--blue-100))]/45 blur-3xl dark:bg-[hsl(var(--teal))]/6" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={copy.services.eyebrow}
          title={copy.services.title}
          body={copy.services.body}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={`hover-card group relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera dark:border-white/10 dark:bg-[hsl(var(--card))] reveal-delay-${index + 1}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: service.accent }}
                />
                <div
                  className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-10 blur-3xl transition group-hover:opacity-20"
                  style={{ background: service.accent }}
                />

                <div className="relative p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white"
                        style={{ background: service.accent }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {service.label}
                      </div>
                      <h3 className="mt-4 text-balance font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                        {service.title}
                      </h3>
                    </div>

                    <div
                      className="flex-none rounded-2xl border px-4 py-3 text-center"
                      style={{
                        borderColor: `${service.accent}35`,
                        background: `${service.accent}0d`,
                      }}
                    >
                      <p className="font-display text-2xl font-bold" style={{ color: service.accent }}>
                        {service.stat.value}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        {service.stat.label}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-semibold leading-relaxed" style={{ color: service.accent }}>
                    {service.impact}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {service.body}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-[hsl(var(--navy-900))] dark:text-white/80"
                      >
                        <span
                          className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full"
                          style={{ background: `${service.accent}18` }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" style={{ color: service.accent }} />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-[hsl(var(--border))] pt-5 dark:border-white/10">
                    <button
                      onClick={() => scrollToId("contact")}
                      className="primary-action group/btn inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-wider"
                    >
                      {copy.actions.learnMore}
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5" />
                    </button>

                    <div
                      className="h-8 w-8 rounded-full opacity-15 transition group-hover:scale-125 group-hover:opacity-25"
                      style={{ background: service.accent }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
