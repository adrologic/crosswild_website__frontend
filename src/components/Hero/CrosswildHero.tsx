"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/cms';

/**
 * Home hero banner — one designed image per theme. Both are 2939x1088 (~2.70:1)
 * with the headline and logo running edge-to-edge, so the container is locked to
 * that exact ratio: any crop would cut off the logo or the wordmark.
 *
 * Set in code rather than the CMS on purpose — the `home/hero` section in the
 * database still holds the old 5-slide carousel, which is now unused.
 */
const HERO_BANNER = {
  light: '/banners/homePage/heroLight.png',
  dark: '/banners/homePage/heroDark.png',
  alt: 'The CrossWild — custom t-shirt, bag and cap manufacturers and printers in Jaipur',
};

interface HeroContent {
  tagline?: string;
  h1?: string;
  h1Highlight?: string;
  h1Suffix?: string;
  description?: string;
  cta1Text?: string;
  cta1Url?: string;
  cta2Text?: string;
  cta2Url?: string;
}

interface Props { content?: HeroContent }

export default function CrosswildHero({ content }: Props) {
  const [trustBadges, setTrustBadges] = useState<string[]>(['Unmatched Customization', 'Affordable Bulk Orders', 'Fast Turnaround']);
  useEffect(() => {
    getSiteSettings().then((s) => {
      if (s?.trustBadges?.length) setTrustBadges(s.trustBadges);
    });
  }, []);

  return (
    <section className="bg-theme-bg">

      {/* ── TOP: Full-width hero banner ── */}
      {/* Ratio matches the artwork exactly so nothing is cropped. The two
          variants are swapped with CSS (not `useTheme`) so the correct one is
          in the markup on first paint — next-themes sets `.dark` on <html>
          before hydration, so there is no flash and no layout shift. */}
      <div className="relative w-full aspect-[2939/1088] overflow-hidden bg-[#A9CBFF] dark:bg-[#9E0B25]">
        <Image
          src={HERO_BANNER.light}
          alt={HERO_BANNER.alt}
          fill
          sizes="100vw"
          className="object-cover dark:hidden"
          priority
          fetchPriority="high"
        />
        <Image
          src={HERO_BANNER.dark}
          alt={HERO_BANNER.alt}
          fill
          sizes="100vw"
          className="hidden object-cover dark:block"
          priority
          fetchPriority="high"
        />
      </div>

      {/* ── BOTTOM: Text + Actions ── */}
      <div className="w-full px-6 lg:px-12 py-6 border-b border-theme-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left: tagline + heading + description */}
          <div className="space-y-3 max-w-5xl">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {content?.tagline || 'Founded in 2016 — Trusted Across India'}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {content?.h1 || 'Custom T-Shirts, Bags, and Caps'}
              <span className="text-primary"> {content?.h1Highlight || 'Manufacturer'} </span>
              {content?.h1Suffix || 'in Jaipur, India'}
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              {content?.description || 'Founded in 2016, The Cross Wild is one of the most trusted names in custom product printing and manufacturing in India.'}
            </p>
          </div>

          {/* Right: buttons + trust badges */}
          <div className="flex flex-col gap-4 lg:items-end flex-shrink-0">
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={content?.cta1Url || '/contact-us'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all shadow-md hover:shadow-lg text-base"
              >
                {content?.cta1Text || 'Add to Enquiry'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={content?.cta2Url || '/our_process'}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-theme-border text-theme-text font-semibold rounded-lg hover:border-primary hover:text-primary transition-all text-base"
              >
                {content?.cta2Text || 'Our Process'}
              </Link>
            </div>

            {/* Trust Badges inline — driven by SiteSettings.trustBadges */}
            <div className="flex flex-wrap items-center gap-4">
              {trustBadges.map((badge, idx) => {
                const styles = [
                  { color: 'bg-green-100', iconColor: 'text-green-600', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' },
                  { color: 'bg-primary-100', iconColor: 'text-primary-600', icon: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' },
                  { color: 'bg-yellow-100', iconColor: 'text-yellow-600', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' },
                ];
                const s = styles[idx % styles.length];
                const [first, ...rest] = badge.split(' ');
                return (
                  <div key={badge} className="flex items-center gap-2.5">
                    <div className={`w-11 h-11 ${s.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <svg className={`w-5 h-5 ${s.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={s.icon} clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="leading-tight">
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{first}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{rest.join(' ') || ''}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
