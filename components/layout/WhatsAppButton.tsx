"use client";

import { WhatsappLogoIcon } from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "250789657355";
const DEFAULT_MESSAGE = "Hello Vera Systems, I'd like to know more about your services.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vera Systems on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsappLogoIcon className="h-7 w-7" weight="fill" />
    </a>
  );
}
