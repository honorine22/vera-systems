export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
  submittedAt: string;
};

export function leadsToCsv(leads: Lead[]) {
  const headers = [
    "Submitted at",
    "Name",
    "Company",
    "Email",
    "Phone",
    "Interest",
    "Message",
    "Source",
  ];

  const rows = leads.map((lead) => [
    lead.submittedAt,
    lead.name,
    lead.company,
    lead.email,
    lead.phone,
    lead.interest,
    lead.message,
    lead.source,
  ]);

  return [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");
}
