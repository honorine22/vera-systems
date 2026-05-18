import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "./leads";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "contact-submissions.json");

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(LEADS_FILE, "utf8");
  } catch {
    await writeFile(LEADS_FILE, "[]", "utf8");
  }
}

export async function getServerLeads() {
  await ensureDataFile();

  try {
    const raw = await readFile(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    const leads = Array.isArray(parsed) ? (parsed as Lead[]) : [];

    return leads.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function saveServerLead(lead: Lead) {
  const leads = await getServerLeads();
  await writeFile(LEADS_FILE, JSON.stringify([lead, ...leads], null, 2), "utf8");

  return lead;
}

export async function clearServerLeads() {
  await ensureDataFile();
  await writeFile(LEADS_FILE, "[]", "utf8");
}
