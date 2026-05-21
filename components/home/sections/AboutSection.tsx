import { Database, ShieldCheck, Users } from "lucide-react";
import type { SiteCopy } from "../translations";

const C = {
  blue: "#4A7BAF",
  teal: "#18A89D",
  blueDeep: "#1A3A5C",
};

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
      <p className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.24em] text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
        <span className="h-px w-8 bg-current opacity-50" />
        {eyebrow}
      </p>

      <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight text-[hsl(var(--navy-950))] dark:text-white md:text-5xl">
        {title}
      </h2>

      {body && (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-[hsl(var(--muted-foreground))] md:text-lg">
          {body}
        </p>
      )}
    </div>
  );
}

function InfoPill({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="hover-card rounded-2xl border border-[hsl(var(--border))] bg-white/72 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: accent }}>
        {accent === C.teal ? <Database className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
      </div>
      <h3 className="font-display text-base font-bold text-[hsl(var(--navy-950))] dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
        {body}
      </p>
    </div>
  );
}

export default function AboutSection({ copy }: { copy: SiteCopy }) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[hsl(var(--muted))]/40 py-28 dark:bg-[hsl(var(--background))]"
    >
      <div className="absolute inset-0 dot-grid opacity-35 dark:opacity-20" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/3 rounded-full bg-[hsl(var(--blue-100))]/50 blur-3xl dark:bg-[hsl(var(--blue-700))]/8" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal="left">
            <div className="hover-card relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[hsl(var(--border))] shadow-vera dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1100&q=85"
                alt={copy.about.title}
                className="h-full w-full object-cover transition duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-950))]/72 via-[hsl(var(--navy-950))]/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))]/88">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--teal))]">
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

            <div className="mt-10 relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/78 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-y-0 left-0 w-1 rounded-l-3xl bg-gradient-to-b from-[hsl(var(--teal))] via-[hsl(var(--blue-400))] to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[hsl(var(--teal))]">
                {copy.about.missionLabel}
              </p>
              <p className="mt-3 text-balance text-lg italic leading-relaxed text-[hsl(var(--navy-950))] dark:text-white">
                {copy.about.mission}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {copy.about.pills.map((pill, index) => (
                <InfoPill
                  key={pill.title}
                  title={pill.title}
                  body={pill.body}
                  accent={[C.blue, C.teal][index] ?? C.blueDeep}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16" data-reveal>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[hsl(var(--teal))]">
                {copy.about.foundersEyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-3xl">
                {copy.about.foundersTitle}
              </h3>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--blue-100))] text-[hsl(var(--blue-700))] dark:bg-white/10 dark:text-white sm:flex">
              <Users className="h-5 w-5" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {copy.about.team.map((member, index) => (
              <article
                key={member.name}
                className="hover-card relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white/86 p-6 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-10 blur-3xl"
                  style={{ background: [C.blue, C.teal][index] ?? C.blueDeep }}
                />
                <div className="relative flex gap-5">
                  <div
                    className="grid h-20 w-20 flex-none place-items-center rounded-3xl text-xl font-black text-white shadow-md"
                    style={{ background: [C.blueDeep, C.teal][index] ?? C.blue }}
                    aria-label={`${member.name} headshot placeholder`}
                  >
                    {member.initials}
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-[hsl(var(--navy-950))] dark:text-white">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-sm font-bold text-[hsl(var(--blue-700))] dark:text-[hsl(var(--blue-300))]">
                      {member.role}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--teal))]">
                      {member.credential}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
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
