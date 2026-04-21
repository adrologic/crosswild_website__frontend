"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_SLIDES = [
  { src: '/images/hero/hero-1.webp', alt: 'Custom T-shirt Manufacturer Jaipur' },
  { src: '/images/hero/hero-2.webp', alt: 'Custom Bags Manufacturer Jaipur' },
  { src: '/images/hero/hero-3.webp', alt: 'Custom Caps Manufacturer Jaipur' },
  { src: '/images/hero/hero-4.webp', alt: 'Promotional Products India' },
  { src: '/images/hero/hero-5.jpg', alt: 'Custom Printing Services Jaipur' },
];

interface Slide { src: string; alt: string }
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
  slides?: Slide[];
}

interface Props { content?: HeroContent }

export default function CrosswildHero({ content }: Props) {
  const slides: Slide[] = content?.slides?.length ? content.slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="bg-theme-bg">

      {/* ── TOP: Full-width image slider ── */}
      <div className="relative w-full aspect-video sm:aspect-auto sm:h-[500px] md:h-[620px] lg:h-[750px] overflow-hidden bg-gray-900">
        {slides.map((slide, idx) => (
          <Image
            key={idx}
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-contain sm:object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            priority={idx === 0}
          />
        ))}

        {/* Prev / Next */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-5' : 'bg-white/60 w-2'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
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

            {/* Trust Badges inline */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label1: 'Unmatched', label2: 'Customization', color: 'bg-green-100', iconColor: 'text-green-600', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' },
                { label1: 'Affordable', label2: 'Bulk Orders', color: 'bg-primary-100', iconColor: 'text-primary-600', icon: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' },
                { label1: 'Fast', label2: 'Turnaround', color: 'bg-yellow-100', iconColor: 'text-yellow-600', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' },
              ].map((b) => (
                <div key={b.label1} className="flex items-center gap-2.5">
                  <div className={`w-11 h-11 ${b.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-5 h-5 ${b.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d={b.icon} clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="leading-tight">
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{b.label1}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{b.label2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
