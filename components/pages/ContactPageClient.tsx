"use client";

import StandalonePageShell from "../layout/StandalonePageShell";
import { Contact } from "../home/HomePage";

export default function ContactPageClient() {
  return <StandalonePageShell>{(copy) => <Contact copy={copy} />}</StandalonePageShell>;
}
