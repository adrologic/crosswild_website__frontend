"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import SafeImage from '@/components/Common/SafeImage';
import ProductCodeBadge from '@/components/Common/ProductCodeBadge';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';

/**
 * Product image carousel.
 *
 * The scroller is the source of truth, not React state. An IntersectionObserver
 * watches the slides and reports which one landed; state follows it. Driving it
 * the other way — state deciding the slide — fights iOS momentum scrolling,
 * which keeps moving after a tap and would snap the indicator back to wherever
 * the finger left it.
 */
export type GallerySlide = { src: string; blurDataURL?: string };

export default function ProductGallery({
  images,
  productName,
  sku,
}: {
  images: GallerySlide[];
  productName: string;
  sku?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Latest visible fraction per slide, kept across callbacks: an observer entry
  // only reports the slides whose visibility *changed*, so picking a winner
  // from `entries` alone would ignore the slide that's still fully on screen.
  const ratiosRef = useRef<number[]>([]);
  const [active, setActive] = useState(0);

  const total = images.length;
  const hasMultiple = total > 1;

  useEffect(() => {
    ratiosRef.current = new Array(total).fill(0);
    setActive(0);
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) ratiosRef.current[index] = entry.intersectionRatio;
        }
        // Mid-drag two slides intersect at once; the one showing more of itself
        // wins. Without this the index flickers between them while scrolling.
        let winner = -1;
        let best = 0;
        ratiosRef.current.forEach((ratio, index) => {
          if (ratio > best) {
            best = ratio;
            winner = index;
          }
        });
        if (winner >= 0) setActive(winner);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [total]);

  // Keep the active thumbnail in view without scrolling the page (which
  // scrollIntoView would do, because it walks every scrollable ancestor).
  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = thumbRefs.current[active];
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowRight' && active < total - 1) {
        event.preventDefault();
        scrollToIndex(active + 1);
      } else if (event.key === 'ArrowLeft' && active > 0) {
        event.preventDefault();
        scrollToIndex(active - 1);
      }
    },
    [active, total, scrollToIndex]
  );

  if (total === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-theme-border bg-theme-bg-card">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-20 w-20 text-theme-text-muted opacity-20" />
        </div>
        <ProductCodeBadge code={sku} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${productName} images`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="no-scrollbar relative flex w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-2xl border border-theme-border bg-theme-bg-card outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg"
        >
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              data-index={index}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Image ${index + 1} of ${total}`}
              className="relative aspect-square w-full flex-none snap-center snap-always"
            >
              {/* object-contain, not cover: the product shots are on white and
                  cover crops the garment badly. */}
              <SafeImage
                src={image.src}
                blurDataURL={image.blurDataURL}
                alt={`${productName} — image ${index + 1} of ${total}`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* The code sits inside the image frame: buyers screenshot the photo
            and send it over WhatsApp, so the code travels with the picture. */}
        <ProductCodeBadge code={sku} />

        {hasMultiple && (
          <>
            {/* Desktop arrows — invisible (not just disabled) at the ends */}
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Previous image"
              className={`absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-theme-border bg-theme-bg-card/90 text-theme-text shadow-sm backdrop-blur-sm transition hover:bg-theme-bg-card md:flex ${
                active === 0 ? 'invisible' : ''
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === total - 1}
              aria-label="Next image"
              className={`absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-theme-border bg-theme-bg-card/90 text-theme-text shadow-sm backdrop-blur-sm transition hover:bg-theme-bg-card md:flex ${
                active === total - 1 ? 'invisible' : ''
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Mobile counter */}
            <div
              aria-live="polite"
              className="pointer-events-none absolute bottom-3 right-3 select-none rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] font-semibold leading-none text-white backdrop-blur-sm md:hidden"
            >
              {active + 1} / {total}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div ref={thumbStripRef} className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`thumb-${image.src}-${index}`}
              type="button"
              ref={(el) => {
                thumbRefs.current[index] = el;
              }}
              onClick={() => scrollToIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={active === index}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all md:h-20 md:w-20 ${
                active === index
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-theme-border hover:border-theme-text-muted'
              }`}
            >
              <SafeImage
                src={image.src}
                blurDataURL={image.blurDataURL}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
