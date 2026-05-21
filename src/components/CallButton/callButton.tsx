"use client";

import { useEffect, useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { getSiteSettings, type SiteSettings } from '@/lib/cms';

export default function CallButton() {
  const [s, setS] = useState<SiteSettings | null>(null);
  useEffect(() => { getSiteSettings().then(setS); }, []);
  const fb = s?.floatingButtons?.call;
  if (fb && fb.enabled === false) return null;
  const phone = fb?.phone || s?.contact?.primaryPhone || '+919529626262';
  const tel = phone.replace(/[^+\d]/g, '');
  const aria = fb?.ariaLabel || 'Call us';
  return (
    <a
      href={`tel:${tel}`}
      aria-label={aria}
      className="fixed bottom-20 left-6 z-50 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-yellow-600"
    >
      <FaPhoneAlt size={24} aria-hidden="true" />
    </a>
  );
}
