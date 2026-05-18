"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, Inbox, Lock, RefreshCw, Trash2 } from "lucide-react";
import { leadsToCsv, type Lead } from "../../lib/leads";

type LoadState = "idle" | "loading" | "ready" | "error" | "locked";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [passcode, setPasscode] = useState("");
  const [state, setState] = useState<LoadState>("idle");
  const [message, setMessage] = useState("");

  async function refreshLeads(nextPasscode = passcode) {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        headers: nextPasscode ? { "x-admin-passcode": nextPasscode } : {},
        cache: "no-store",
      });
      const data = (await response.json()) as {
        ok?: boolean;
        leads?: Lead[];
        message?: string;
      };

      if (response.status === 401) {
        setState("locked");
        setMessage(data.message || "Enter the admin passcode to view submissions.");
        return;
      }

      if (!response.ok || data.ok === false) {
        throw new Error(data.message || "Could not load submissions.");
      }

      setLeads(data.leads || []);
      setState("ready");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not load submissions.");
    }
  }

  useEffect(() => {
    refreshLeads("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const uniqueEmails = new Set(leads.map((lead) => lead.email).filter(Boolean));
    const latest = leads[0]?.submittedAt
      ? formatDate(leads[0].submittedAt)
      : "No submissions yet";

    return [
      { label: "Total leads", value: String(leads.length) },
      { label: "Unique emails", value: String(uniqueEmails.size) },
      { label: "Latest", value: latest },
    ];
  }, [leads]);

  function handlePasscodeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    refreshLeads(passcode);
  }

  function exportCsv() {
    const csv = leadsToCsv(leads);
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

    const response = await fetch("/api/leads", {
      method: "DELETE",
      headers: passcode ? { "x-admin-passcode": passcode } : {},
    });

    if (!response.ok) {
      setMessage("Could not clear submissions. Check the admin passcode.");
      setState("error");
      return;
    }

    setLeads([]);
    setState("ready");
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <section className="border-b border-[hsl(var(--border))] bg-white/90 backdrop-blur-xl dark:bg-[hsl(var(--background))]/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--blue-700))]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>

            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[hsl(var(--blue-700))] text-white shadow-glow">
                <Inbox className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[hsl(var(--blue-700))]">
                  Supabase inbox
                </p>
                <h1 className="font-display text-3xl font-semibold text-[hsl(var(--navy-950))] dark:text-white md:text-4xl">
                  Vera contact submissions
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl leading-7 text-[hsl(var(--muted-foreground))]">
              This page reads contact submissions from Supabase. Set
              <span className="font-mono"> ADMIN_PASSCODE</span> to protect this inbox.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => refreshLeads()}
              className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm font-bold text-[hsl(var(--navy-950))] transition hover:-translate-y-0.5 hover:border-[hsl(var(--blue-400))] dark:bg-white/5 dark:text-white"
              type="button"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={exportCsv}
              disabled={leads.length === 0}
              className="primary-action inline-flex items-center gap-2 px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={handleClear}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--danger))]/30 bg-[hsl(var(--danger-light))]/40 px-4 py-3 text-sm font-bold text-[hsl(var(--danger))] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {(state === "locked" || state === "error") && (
          <form
            onSubmit={handlePasscodeSubmit}
            className="mb-6 rounded-3xl border border-[hsl(var(--border))] bg-white p-5 shadow-sm dark:bg-[hsl(var(--card))]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                  <Lock className="h-4 w-4" />
                  Admin passcode
                </label>
                <input
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-4 py-4 text-sm outline-none transition focus:border-[hsl(var(--blue-400))] focus:bg-white dark:border-white/10 dark:bg-white/5"
                  placeholder="Enter passcode from ADMIN_PASSCODE"
                  type="password"
                />
                {message && (
                  <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                    {message}
                  </p>
                )}
              </div>
              <button
                className="primary-action px-5 py-4 text-sm"
                type="submit"
              >
                Unlock inbox
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-[hsl(var(--border))] bg-white p-5 shadow-sm dark:bg-[hsl(var(--card))]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                {stat.label}
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-white shadow-vera dark:bg-[hsl(var(--card))]">
          {state === "loading" ? (
            <EmptyState title="Loading submissions..." body="Checking the Supabase inbox." />
          ) : leads.length === 0 ? (
            <EmptyState
              title="No submissions yet"
              body="Submit the contact form on the website, then come back here to see the saved data."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/45">
                  <tr>
                    {["Submitted", "Name", "Company", "Contact", "Interest", "Message"].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="align-top transition hover:bg-[hsl(var(--muted))]/28">
                      <td className="px-5 py-5 text-sm font-semibold text-[hsl(var(--navy-950))] dark:text-white">
                        {formatDate(lead.submittedAt)}
                      </td>
                      <td className="px-5 py-5">
                        <p className="font-bold text-[hsl(var(--navy-950))] dark:text-white">
                          {lead.name || "Unnamed"}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm text-[hsl(var(--muted-foreground))]">
                        {lead.company || "-"}
                      </td>
                      <td className="px-5 py-5 text-sm text-[hsl(var(--muted-foreground))]">
                        <p>{lead.email || "-"}</p>
                        <p className="mt-1">{lead.phone || "-"}</p>
                      </td>
                      <td className="px-5 py-5">
                        <span className="rounded-full bg-[hsl(var(--blue-100))] px-3 py-1.5 text-xs font-bold text-[hsl(var(--blue-700))] dark:bg-white/10">
                          {lead.interest || "Not specified"}
                        </span>
                      </td>
                      <td className="max-w-sm px-5 py-5 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                        {lead.message || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--muted))] text-[hsl(var(--blue-700))]">
          <Inbox className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-[hsl(var(--navy-950))] dark:text-white">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-[hsl(var(--muted-foreground))]">
          {body}
        </p>
      </div>
    </div>
  );
}
