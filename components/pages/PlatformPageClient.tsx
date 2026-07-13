"use client";

import StandalonePageShell from "../layout/StandalonePageShell";
import StackExperience from "../home/sections/HowItWorks";
import { PlatformDemo } from "../home/HomePage";
import DeviationTrendVisual from "../platform/DeviationTrendVisual";

export default function PlatformPageClient() {
  return (
    <StandalonePageShell>
      {(copy) => (
        <>
          <StackExperience copy={copy} />

          <section className="relative py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-6">
              <DeviationTrendVisual />
            </div>
          </section>

          <PlatformDemo copy={copy} />
        </>
      )}
    </StandalonePageShell>
  );
}
