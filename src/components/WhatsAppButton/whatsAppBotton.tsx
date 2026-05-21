"use client";
import { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { getSiteSettings, type SiteSettings } from '@/lib/cms';

export default function WhatsAppButton() {
  const [s, setS] = useState<SiteSettings | null>(null);
  useEffect(() => { getSiteSettings().then(setS); }, []);
  const fb = s?.floatingButtons?.whatsapp;
  if (fb && fb.enabled === false) return null;
  const url = fb?.url || s?.social?.whatsapp || 'https://wa.me/919529626262';
  const aria = fb?.ariaLabel || 'Chat with us on WhatsApp';
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className="fixed bottom-20 right-6 z-50 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
