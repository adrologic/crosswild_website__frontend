"use client";

import React from 'react';
import Link from 'next/link';

/**
 * Home hero banner — one designed image per theme, in two shapes. The wide pair
 * is 2939x1088 (~2.70:1) and the phone pair 4686x6250 (3:4); both run the
 * headline and logo edge-to-edge, so the container is locked to whichever exact
 * ratio is showing: any crop would cut off the logo or the wordmark.
 *
 * Set in code rather than the CMS on purpose — the `home/hero` section in the
 * database still holds the old 5-slide carousel, which is now unused.
 */
const HERO_BANNER = {
  light: '/banners/homePage/heroLight.png',
  dark: '/banners/homePage/heroDark.png',
  /**
   * Phone artwork. The wide banner keeps its ratio at every width, so on a
   * 390px screen it collapses to a ~145px sliver and the wordmark inside it is
   * barely legible. These are the same design laid out as a 3:4 poster
   * (4686x6250), used below `md` only.
   */
  mobileLight: '/banners/homePage/heroMobileLight.webp',
  mobileDark: '/banners/homePage/heroMobileDark.webp',
  alt: 'The CrossWild — custom t-shirt, bag and cap manufacturers and printers in Jaipur',
  /**
   * The artwork has a "Get Started" button drawn into it, so the whole band is
   * a link — there is no real button to attach a handler to. Same treatment as
   * the other designed bands on this page.
   */
  href: '/products',
};

interface HeroContent {
  tagline?: string;
  h1?: string;
  h1Highlight?: string;
  h1Suffix?: string;
  description?: string;
}

interface Props { content?: HeroContent }

export default function CrosswildHero({ content }: Props) {
  return (
    <section className="bg-theme-bg">

      {/* ── TOP: Full-width hero banner ── */}
      {/* Ratio matches the artwork exactly so nothing is cropped — the portrait
          poster below `md`, the wide banner from `md` up. The two theme
          variants are swapped with CSS (not `useTheme`) so the correct one is
          in the markup on first paint — next-themes sets `.dark` on <html>
          before hydration, so there is no flash and no layout shift.

          The breakpoint is picked by <picture>/<source media> rather than by
          hiding a second <Image>: `images.unoptimized` is on, so a hidden
          eager <Image> would still download its file and every phone would
          pull the 550KB of desktop artwork it never shows. Each <picture>
          fetches exactly one file, and `fetchPriority` keeps the visible one
          at the head of the queue the way `priority` did. */}
      <Link
        href={HERO_BANNER.href}
        aria-label="Get started — browse our products"
        className="relative block w-full aspect-[4686/6250] md:aspect-[2939/1088] overflow-hidden bg-[#A9CBFF] dark:bg-[#9E0B25]"
      >
        <picture className="dark:hidden">
          <source media="(min-width: 768px)" srcSet={HERO_BANNER.light} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BANNER.mobileLight}
            alt={HERO_BANNER.alt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <picture className="hidden dark:block">
          <source media="(min-width: 768px)" srcSet={HERO_BANNER.dark} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BANNER.mobileDark}
            alt={HERO_BANNER.alt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </Link>

      {/* ── BOTTOM: Text ── */}
      <div className="w-full px-6 lg:px-12 py-6 border-b border-theme-border">
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
            {content?.description || 'Founded in 2016 by Mr. Mahendra Choudhary, The Cross Wild is one of the most trusted names in custom product printing and manufacturing in India.'}
          </p>
        </div>
      </div>

    </section>
  );
}
