"use client";

import StandalonePageShell from "../layout/StandalonePageShell";
import WhyVeraSection from "../home/sections/WhyVeraSection";

export default function WhyPageClient() {
  return <StandalonePageShell>{(copy) => <WhyVeraSection copy={copy} />}</StandalonePageShell>;
}
