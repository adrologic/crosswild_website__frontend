"use client";
import { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { useAppSelector } from '@/store/hooks';
import { selectIsMenuOpen } from '@/store/slices/uiSlice';
import { getSiteSettings, type SiteSettings } from '@/lib/cms';

export default function WhatsAppButton() {
  const [s, setS] = useState<SiteSettings | null>(null);
  useEffect(() => { getSiteSettings().then(setS); }, []);
  // The burger menu lists its own call and WhatsApp links, and this button
  // floats above the backdrop, so it is only in the way while that drawer is
  // open. The drawer itself is lg:hidden, so keep the button from lg up.
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
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
      className={`fixed bottom-20 right-6 z-50 h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 ${isMenuOpen ? 'hidden lg:flex' : 'flex'}`}
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
