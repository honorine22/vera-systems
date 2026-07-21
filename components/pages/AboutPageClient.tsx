"use client";

import StandalonePageShell from "../layout/StandalonePageShell";
import AboutSection from "../home/sections/AboutSection";

export default function AboutPageClient() {
  return <StandalonePageShell>{(copy) => <AboutSection copy={copy} />}</StandalonePageShell>;
}
