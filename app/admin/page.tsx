"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Download,
  Inbox,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { leadsToCsv, type Lead } from "../../lib/leads";

type LoadState = "checking" | "auth" | "loading" | "ready" | "error";
type AuthMode = "login" | "signup";
type AdminView = "overview" | "contacts";
type AdminUser = { email: string };

const C = {
  navy: "#123F66",
  navySoft: "#1D527D",
  blue: "#4A7BAF",
  sky: "#8FC2E8",
  ice: "#DDECF7",
  teal: "#18A89D",
  amber: "#D99A3D",
  green: "#2FA772",
  red: "#D95C59",
  slate: "#65758A",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function lastSevenDays(leads: Lead[]) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      label: date.toLocaleDateString("en", { weekday: "short" }),
      count: leads.filter((lead) => sameDay(new Date(lead.submittedAt), date)).length,
    };
  });
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [state, setState] = useState<LoadState>("checking");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  async function refreshLeads() {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", { cache: "no-store" });
      const data = (await response.json()) as {
        ok?: boolean;
        admin?: AdminUser;
        leads?: Lead[];
        message?: string;
      };

      if (response.status === 401 || response.status === 403) {
        setUser(null);
        setLeads([]);
        setState("auth");
        setMessage(data.message || "Log in with an allowed admin account.");
        return;
      }

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Could not load submissions.");
      }

      setUser(data.admin || user);
      setLeads(data.leads || []);
      setState("ready");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not load submissions.");
    }
  }

  async function checkSession() {
    setState("checking");

    try {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await response.json()) as {
        ok?: boolean;
        user?: AdminUser;
        message?: string;
      };

      if (!response.ok || data.ok === false || !data.user) {
        setState("auth");
        setMessage(data.message || "");
        return;
      }

      setUser(data.user);
      await refreshLeads();
    } catch (error) {
      setState("auth");
      setMessage(error instanceof Error ? error.message : "");
    }
  }

  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) return leads;

    return leads.filter((lead) =>
      [lead.name, lead.email, lead.phone, lead.message]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [leads, query]);

  const stats = useMemo(() => {
    const uniqueEmails = new Set(leads.map((lead) => lead.email).filter(Boolean));
    const withPhone = leads.filter((lead) => lead.phone).length;
    const today = leads.filter((lead) => sameDay(new Date(lead.submittedAt), new Date())).length;

    return [
      { label: "Total submissions", value: String(leads.length), icon: Inbox, accent: C.navy },
      { label: "New today", value: String(today), icon: TrendingUp, accent: C.teal },
      { label: "Unique emails", value: String(uniqueEmails.size), icon: Mail, accent: C.blue },
      { label: "With phone", value: String(withPhone), icon: Phone, accent: C.green },
    ];
  }, [leads]);

  const chartData = useMemo(() => lastSevenDays(leads), [leads]);
  const maxChartValue = Math.max(...chartData.map((item) => item.count), 1);
  const latestLead = leads[0];

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(
        authMode === "login" ? "/api/admin/session" : "/api/admin/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = (await response.json()) as {
        ok?: boolean;
        user?: AdminUser;
        message?: string;
      };

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || "Authentication failed.");
      }

      if (!result.user) {
        setState("auth");
        setMessage(result.message || "Confirm your account, then log in.");
        return;
      }

      setUser(result.user);
      form.reset();
      await refreshLeads();
    } catch (error) {
      setState("auth");
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setUser(null);
    setLeads([]);
    setState("auth");
    setMessage("You have been logged out.");
  }

  function exportCsv() {
    const csv = leadsToCsv(filteredLeads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `vera-contact-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleClear() {
    if (!window.confirm("Clear all Supabase contact submissions?")) {
      return;
    }

    const response = await fetch("/api/leads", { method: "DELETE" });

    if (!response.ok) {
      setMessage("Could not clear Supabase submissions.");
      setState("error");
      return;
    }

    setLeads([]);
    setState("ready");
  }

  if (state === "checking" || (state === "loading" && !user)) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#F6F9FC] px-6 text-[#123F66]">
        <div className="text-center">
          <Image
            src="/logos/vera-logo-blue-transparent.png"
            alt="Vera Systems"
            width={160}
            height={90}
            className="mx-auto h-auto w-36"
            priority
          />
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-[#65758A]">
            Opening secure dashboard
          </p>
        </div>
      </main>
    );
  }

  if (state === "auth" && !user) {
    return (
      <main className="min-h-screen bg-[#F6F9FC] text-[#123F66]">
        <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#65758A] transition hover:text-[#123F66]">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>

            <Image
              src="/logos/vera-logo-blue-transparent.png"
              alt="Vera Systems"
              width={210}
              height={120}
              className="mt-10 h-auto w-44"
              priority
            />

            <p className="mt-10 text-[10px] font-black uppercase tracking-[0.24em] text-[#18A89D]">
              Admin only
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight text-[#123F66] md:text-6xl">
              View data in one secure dashboard.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#65758A]">
              Sign in with a Supabase account whose email is allowed in the admin environment settings.
            </p>
          </div>

          <form
            onSubmit={handleAuth}
            className="rounded-[2rem] border border-[#DDECF7] bg-white p-6 shadow-[0_28px_80px_-50px_rgba(18,63,102,.45)]"
          >
            <div className="flex rounded-2xl bg-[#F0F6FB] p-1">
              {(["login", "signup"] as AuthMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setAuthMode(mode);
                    setMessage("");
                  }}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider transition ${
                    authMode === mode
                      ? "bg-[#123F66] text-white shadow-sm"
                      : "text-[#65758A] hover:text-[#123F66]"
                  }`}
                >
                  {mode === "login" ? "Login" : "Sign up"}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#65758A]">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-[#DDECF7] bg-[#F8FBFD] px-4 py-4 text-sm outline-none transition focus:border-[#4A7BAF] focus:bg-white"
                  placeholder="admin@verasystems.com"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#65758A]">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-2xl border border-[#DDECF7] bg-[#F8FBFD] px-4 py-4 text-sm outline-none transition focus:border-[#4A7BAF] focus:bg-white"
                  placeholder="Minimum 6 characters"
                />
              </label>
            </div>

            {message && (
              <p className="mt-5 rounded-2xl border border-[#DDECF7] bg-[#F8FBFD] px-4 py-3 text-sm leading-6 text-[#65758A]">
                {message}
              </p>
            )}

            <button className="primary-action mt-6 flex w-full items-center justify-center gap-2 px-5 py-4 text-sm" type="submit">
              {authMode === "login" ? <Lock className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {authMode === "login" ? "Login to dashboard" : "Create admin account"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F8FB] text-[#123F66]">
      <div className="grid min-h-screen lg:grid-cols-[292px_1fr]">
        <aside className="border-r border-[#DDECF7] bg-white px-5 py-6 shadow-[18px_0_60px_-52px_rgba(18,63,102,.5)] lg:sticky lg:top-0 lg:h-screen">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#65758A] transition hover:text-[#123F66]">
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </a>

          <Image
            src="/logos/vera-logo-blue-transparent.png"
            alt="Vera Systems"
            width={180}
            height={100}
            className="mt-8 h-auto w-40"
            priority
          />

          <div className="mt-8 rounded-3xl border border-[#DDECF7] bg-[#F8FBFD] p-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#123F66] text-sm font-black text-white">
              {user?.email?.slice(0, 1).toUpperCase() || "A"}
            </span>
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#18A89D]">
              Logged in admin
            </p>
            <p className="mt-1 break-words text-sm font-bold text-[#123F66]">
              {user?.email}
            </p>
          </div>

          <nav className="mt-6 grid gap-2">
            <SidebarButton
              active={activeView === "overview"}
              icon={LayoutDashboard}
              label="Dashboard"
              onClick={() => setActiveView("overview")}
            />
            <SidebarButton
              active={activeView === "contacts"}
              icon={Users}
              label="Contact data"
              badge={String(leads.length)}
              onClick={() => setActiveView("contacts")}
            />
          </nav>

          <div className="mt-6 border-t border-[#DDECF7] pt-5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-2xl border border-[#DDECF7] bg-white px-4 py-3 text-sm font-bold text-[#65758A] transition hover:-translate-y-0.5 hover:text-[#123F66]"
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <section className="min-w-0 px-5 py-6 md:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-[#DDECF7] pb-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#18A89D]">
                Supabase dashboard
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#123F66] md:text-5xl">
                {activeView === "overview" ? "Contact intelligence" : "Contact submissions"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#65758A]">
                {activeView === "overview"
                  ? "A calm overview of new leads, response signals, and recent website activity."
                  : "Search, review, export, and reply to people who submitted the contact form."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={refreshLeads}
                className="inline-flex items-center gap-2 rounded-xl border border-[#DDECF7] bg-white px-4 py-3 text-sm font-bold text-[#123F66] transition hover:-translate-y-0.5 hover:border-[#8FC2E8]"
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
              {activeView === "contacts" && (
                <>
                  <button
                    onClick={exportCsv}
                    disabled={filteredLeads.length === 0}
                    className="primary-action inline-flex items-center gap-2 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={leads.length === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#D95C59]/30 bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#B83F3B] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </button>
                </>
              )}
            </div>
          </header>

          {message && (
            <div className="mt-6 rounded-2xl border border-[#DDECF7] bg-white px-5 py-4 text-sm text-[#65758A] shadow-sm">
              {message}
            </div>
          )}

          {activeView === "overview" ? (
            <OverviewPanel
              stats={stats}
              chartData={chartData}
              maxChartValue={maxChartValue}
              latestLead={latestLead}
              state={state}
              goToContacts={() => setActiveView("contacts")}
            />
          ) : (
            <ContactsPanel
              filteredLeads={filteredLeads}
              query={query}
              setQuery={setQuery}
              state={state}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function SidebarButton({
  active,
  icon: Icon,
  label,
  badge,
  onClick,
}: {
  active: boolean;
  icon: typeof LayoutDashboard;
  label: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-[#123F66] text-white shadow-[0_18px_40px_-28px_rgba(18,63,102,.9)]"
          : "text-[#65758A] hover:bg-[#F0F6FB] hover:text-[#123F66]"
      }`}
    >
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {badge && (
        <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/16 text-white" : "bg-[#EAF4FA] text-[#123F66]"}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function OverviewPanel({
  stats,
  chartData,
  maxChartValue,
  latestLead,
  state,
  goToContacts,
}: {
  stats: Array<{ label: string; value: string; icon: typeof Inbox; accent: string }>;
  chartData: Array<{ label: string; count: number }>;
  maxChartValue: number;
  latestLead?: Lead;
  state: LoadState;
  goToContacts: () => void;
}) {
  return (
    <div className="pt-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-3xl border border-[#DDECF7] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#65758A]">
                  {stat.label}
                </p>
                <span className="grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ background: stat.accent }}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-5 font-display text-4xl font-semibold text-[#123F66]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-[#DDECF7] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#18A89D]">
                Last 7 days
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#123F66]">
                Submission trend
              </h2>
            </div>
            <BarChart3 className="h-5 w-5 text-[#4A7BAF]" />
          </div>
          <div className="mt-8 flex h-56 items-end gap-3">
            {chartData.map((item, index) => {
              const height = Math.max((item.count / maxChartValue) * 100, item.count ? 14 : 4);
              const color = [C.navy, C.blue, C.teal, C.green, C.sky, C.amber, C.navySoft][index % 7];

              return (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                  <div className="flex h-40 w-full items-end rounded-2xl bg-[#F0F6FB] p-1.5">
                    <div
                      className="w-full rounded-xl transition-all duration-500"
                      style={{ height: `${height}%`, background: color }}
                    />
                  </div>
                  <p className="text-xs font-bold text-[#65758A]">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-[#DDECF7] bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#18A89D]">
                Latest message
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[#123F66]">
                Most recent contact
              </h2>
            </div>
            <button
              type="button"
              onClick={goToContacts}
              className="rounded-xl bg-[#EAF4FA] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#123F66] transition hover:bg-[#DDECF7]"
            >
              View all
            </button>
          </div>
          {state === "loading" ? (
            <EmptyState title="Loading submissions..." body="Checking the Supabase inbox." />
          ) : latestLead ? (
            <div className="mt-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#123F66]">
                    {latestLead.name || "Unnamed lead"}
                  </h3>
                  <p className="mt-1 text-sm text-[#65758A]">{formatDate(latestLead.submittedAt)}</p>
                </div>
                <span className="rounded-full bg-[#EAF4FA] px-3 py-1.5 text-xs font-bold text-[#123F66]">
                  New
                </span>
              </div>
              <p className="mt-5 rounded-2xl bg-[#F8FBFD] p-4 text-sm leading-7 text-[#65758A]">
                {latestLead.message || "No message provided."}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a className="inline-flex items-center gap-2 rounded-2xl border border-[#DDECF7] px-4 py-3 text-sm font-bold text-[#123F66]" href={`mailto:${latestLead.email}`}>
                  <Mail className="h-4 w-4" />
                  {latestLead.email || "No email"}
                </a>
                <a className="inline-flex items-center gap-2 rounded-2xl border border-[#DDECF7] px-4 py-3 text-sm font-bold text-[#123F66]" href={latestLead.phone ? `tel:${latestLead.phone}` : undefined}>
                  <Phone className="h-4 w-4" />
                  {latestLead.phone || "No phone"}
                </a>
              </div>
            </div>
          ) : (
            <EmptyState title="No messages yet" body="New website contact submissions will appear here." />
          )}
        </div>
      </div>
    </div>
  );
}

function ContactsPanel({
  filteredLeads,
  query,
  setQuery,
  state,
}: {
  filteredLeads: Lead[];
  query: string;
  setQuery: (value: string) => void;
  state: LoadState;
}) {
  return (
    <div className="pt-6">
      <div className="overflow-hidden rounded-3xl border border-[#DDECF7] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#DDECF7] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#18A89D]">
              Contact data
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-[#123F66]">
              People who contacted Vera
            </h2>
          </div>

          <label className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65758A]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-[#DDECF7] bg-[#F8FBFD] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#4A7BAF] focus:bg-white"
              placeholder="Search name, email, phone, message"
            />
          </label>
        </div>

        {state === "loading" ? (
          <EmptyState title="Loading submissions..." body="Checking the Supabase inbox." />
        ) : filteredLeads.length === 0 ? (
          <EmptyState title="No matching submissions" body="Try a different search or submit the contact form." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="border-b border-[#DDECF7] bg-[#F8FBFD]">
                <tr>
                  {["Submitted", "Name", "Contact", "Message", "Action"].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#65758A]">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDECF7]">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="align-top transition hover:bg-[#F8FBFD]">
                    <td className="px-5 py-5 text-sm font-semibold text-[#123F66]">
                      {formatDate(lead.submittedAt)}
                    </td>
                    <td className="px-5 py-5">
                      <p className="font-bold text-[#123F66]">{lead.name || "Unnamed"}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#18A89D]">
                        Website lead
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm text-[#65758A]">
                      <p>{lead.email || "-"}</p>
                      <p className="mt-1">{lead.phone || "-"}</p>
                    </td>
                    <td className="max-w-md px-5 py-5 text-sm leading-7 text-[#65758A]">
                      <span className="line-clamp-3">{lead.message || "-"}</span>
                    </td>
                    <td className="px-5 py-5">
                      <a
                        className="inline-flex items-center gap-2 rounded-xl bg-[#123F66] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#1D527D]"
                        href={`mailto:${lead.email}`}
                      >
                        <MessageSquareText className="h-4 w-4" />
                        Reply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid min-h-60 place-items-center px-6 py-12 text-center">
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF4FA] text-[#123F66]">
          <Inbox className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-[#123F66]">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-[#65758A]">
          {body}
        </p>
      </div>
    </div>
  );
}
