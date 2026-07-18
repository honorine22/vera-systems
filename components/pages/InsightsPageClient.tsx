"use client";

import StandalonePageShell from "../layout/StandalonePageShell";
import InsightsSection from "../home/sections/InsightsSection";

export default function InsightsPageClient() {
  return <StandalonePageShell>{(copy) => <InsightsSection copy={copy} />}</StandalonePageShell>;
}
