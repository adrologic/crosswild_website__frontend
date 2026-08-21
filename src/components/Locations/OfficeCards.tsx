"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, X } from 'lucide-react';

export interface CityCard {
  city: string;
  slug: string;
  branchAddress: string;
  image: string;
  branchPhone: string;
}

/** Kept in step with the duration-200 classes on the backdrop and panel. */
const TRANSITION_MS = 200;

/**
 * The "Our Offices" grid.
 *
 * These cards used to link to the city landing pages. Those pages exist to rank
 * for "<product> manufacturer in <city>", not to answer "where are you and what
 * is your number" — so a click opened a long sales page when the visitor wanted
 * two lines of contact detail. The card now opens a small dialog with exactly
 * that, and the landing pages keep their own traffic.
 *
 * The section's LocalBusiness JSON-LD is emitted by the server component that
 * renders this one, so the addresses stay machine-readable either way.
 */
export default function OfficeCards({ cities }: { cities: CityCard[] }) {
  // Two pieces of state, because a dialog that unmounts the instant you close
  // it has nothing left to animate out. `openCity` controls mounting; `shown`
  // drives the transition and is flipped a frame later on open, and a
  // transition earlier on close.
  const [openCity, setOpenCity] = useState<CityCard | null>(null);
  const [shown, setShown] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Remembered so focus can return to the card that opened the dialog, rather
  // than being dumped at the top of the document on close.
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    if (exitTimer.current) return; // already closing
    setShown(false);
    exitTimer.current = setTimeout(() => {
      exitTimer.current = null;
      setOpenCity(null);
      openerRef.current?.focus();
      openerRef.current = null;
    }, TRANSITION_MS);
  }, []);

  const open = (city: CityCard, event: React.MouseEvent<HTMLButtonElement>) => {
    if (exitTimer.current) {
      clearTimeout(exitTimer.current);
      exitTimer.current = null;
      // Same card re-clicked mid-exit: setOpenCity below is a no-op for React,
      // so the mount effect will not re-run to raise `shown` itself.
      setShown(true);
    }
    openerRef.current = event.currentTarget;
    setOpenCity(city);
  };

  useEffect(() => () => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
  }, []);

  // Escape closes, and the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!openCity) return;

    // Paint once in the closed state, then flip — without the frame gap the
    // browser has nothing to transition from and the dialog simply appears.
    const raf = requestAnimationFrame(() => setShown(true));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openCity, close]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <button
            key={city.city}
            type="button"
            onClick={(e) => open(city, e)}
            aria-haspopup="dialog"
            className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl p-5 block w-full text-left hover:shadow-md transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Circular city image */}
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden mb-4 border border-gray-200 dark:border-gray-600 flex-shrink-0">
              <Image
                src={city.image}
                alt={`${city.city}`}
                width={72}
                height={72}
                quality={60}
                sizes="72px"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* City name */}
            <p className="text-[17px] font-bold text-gray-900 dark:text-white mb-3">
              {city.city}
            </p>

            {/* Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-[15px] h-[15px] text-gray-500 dark:text-gray-400 flex-shrink-0 mt-[2px]" />
              <p className="text-[13px] leading-[1.55] text-gray-600 dark:text-gray-400">
                {city.branchAddress}
              </p>
            </div>
          </button>
        ))}
      </div>

      {openCity && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            shown ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="office-dialog-city"
            // The backdrop closes on click; without this a click inside the
            // panel would bubble up to it and close the dialog too.
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#1f2937] p-6 shadow-xl transition-all duration-200 ease-out motion-reduce:transition-none ${
              shown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>

            <h3
              id="office-dialog-city"
              className="mb-4 pr-8 text-lg font-bold text-gray-900 dark:text-white"
            >
              {openCity.city} Office
            </h3>

            <div className="flex items-start gap-2.5">
              <MapPin className="mt-[3px] h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {openCity.branchAddress}
              </p>
            </div>

            {openCity.branchPhone && (
              <a
                href={`tel:${openCity.branchPhone.replace(/[^+\d]/g, '')}`}
                className="mt-3 flex items-center gap-2.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                {openCity.branchPhone}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
