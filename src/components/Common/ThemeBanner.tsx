import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  /** Light-mode artwork. */
  light: string;
  /**
   * Dark-mode artwork. Swapped with CSS rather than `useTheme` so the correct
   * image is in the markup on first paint — next-themes sets `.dark` on <html>
   * before hydration, so there is no flash and no layout shift. It also means
   * the off-theme image stays `display: none` and, when lazy, is never fetched
   * until the visitor actually switches themes.
   *
   * Omit it for artwork that reads correctly in both themes — photographic
   * banners usually do — and the one image is used for both.
   */
  dark?: string;
  /** Describes the artwork, including any wording baked into it. */
  alt: string;
  /**
   * Natural ratio of the artwork, e.g. '7000 / 3937'. The band renders at this
   * ratio so the artwork is never cropped — these designs run their headline and
   * CTA edge to edge, and any crop eats the wording.
   */
  aspectRatio: string;
  /**
   * Phone-specific artwork, laid out at its own ratio (`mobileAspectRatio`)
   * rather than the wide `light`/`dark` design cropped down. Provide both or
   * neither — omit for artwork that already reads fine on a phone.
   */
  mobileLight?: string;
  mobileDark?: string;
  /** Natural ratio of the mobile artwork, e.g. '4686 / 6250'. Required with `mobileLight`. */
  mobileAspectRatio?: string;
  /** Tailwind classes for the colour behind the artwork while it loads, e.g.
   *  'bg-[#AACBFE] dark:bg-[#861424]'. Sample it from the artwork's background. */
  bgClass?: string;
  /** Makes the whole band a link. Use when the artwork has a CTA drawn into it. */
  href?: string;
  /** Only for a banner above the fold. Leave off below it so the images stay lazy. */
  priority?: boolean;
  /**
   * Ceiling on the band's height. Full-bleed 16:9 artwork is 1080px tall on a
   * 1920px screen — taller than the window — so past this height the band stops
   * growing with the viewport and is centred instead, with `bgClass` carrying
   * the artwork's flat background out to both edges. Capping the height rather
   * than cropping keeps the wording drawn into these designs intact.
   */
  maxHeight?: string;
}

/**
 * Full-bleed promotional banner with a separate image per theme.
 *
 * For artwork that carries its own heading and copy. Nothing is drawn on top and
 * nothing is cropped, so the design lands exactly as exported.
 */
export default function ThemeBanner({
  light,
  dark,
  alt,
  aspectRatio,
  mobileLight,
  mobileDark,
  mobileAspectRatio,
  bgClass = '',
  href,
  priority = false,
  maxHeight = 'min(60svh, 34rem)',
}: Props) {
  // The height cap on its own would leave the box wider than the artwork's ratio
  // and crop it, so pair it with the matching width cap — the band then keeps
  // its exact ratio and simply stops growing, centred, once it hits the ceiling.
  const [w, h] = aspectRatio.split('/').map((part) => parseFloat(part));
  const ratio = w && h ? w / h : 16 / 9;

  const hasMobile = Boolean(mobileLight && mobileDark);
  const [mw, mh] = (mobileAspectRatio || aspectRatio).split('/').map((part) => parseFloat(part));
  const mobileRatio = mw && mh ? mw / mh : ratio;

  // A single image when the artwork suits both themes — no point putting the
  // same file in the markup twice under a class that only hides one of them.
  //
  // With mobile artwork, the box's ratio itself differs by breakpoint (a
  // portrait phone poster vs. the wide desktop design), so the fixed
  // `aspectRatio` style used for the single-ratio case can't express it —
  // instead both ratios are handed to the class list as CSS custom
  // properties and picked between with `md:`, same trick `maxWidth` already
  // needs since it derives from whichever ratio is active.
  const containerStyle = hasMobile
    ? ({ '--tb-mh': maxHeight, '--tb-ar-m': mobileRatio, '--tb-ar-d': ratio } as CSSProperties)
    : { aspectRatio, maxHeight, maxWidth: `calc(${maxHeight} * ${ratio})` };
  // The height ceiling only makes sense for the wide desktop crop (see
  // `maxHeight` above) — pairing it with the portrait mobile ratio derives a
  // max-width narrower than most phones' actual viewport width, so the phone
  // poster would center with `bgClass` showing on both sides instead of
  // running edge to edge. Scoping the cap to `md:` keeps mobile uncapped.
  const containerClass = hasMobile
    ? `relative mx-auto w-full overflow-hidden aspect-[var(--tb-ar-m)] md:aspect-[var(--tb-ar-d)] md:max-h-[var(--tb-mh)] md:max-w-[calc(var(--tb-mh)*var(--tb-ar-d))] ${bgClass}`
    : `relative mx-auto w-full overflow-hidden ${bgClass}`;

  const banner = (
    <div className={containerClass} style={containerStyle}>
      {hasMobile ? (
        // Bare <picture>/<source> rather than a hidden second <Image> — with
        // `images.unoptimized` on, a hidden eager <Image> would still fetch
        // its file, and every phone would pull the desktop artwork it never
        // shows. Each <picture> below fetches exactly one file: the browser
        // picks mobile vs. desktop natively, and the light/dark pair is
        // narrowed with CSS the same way the single-ratio case does it.
        <>
          <picture className={dark ? 'dark:hidden' : undefined}>
            <source media="(min-width: 768px)" srcSet={light} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mobileLight}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority={priority ? 'high' : undefined}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
          {dark && (
            <picture className="hidden dark:block">
              <source media="(min-width: 768px)" srcSet={dark} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mobileDark}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority={priority ? 'high' : undefined}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          )}
        </>
      ) : dark ? (
        <>
          <Image
            src={light}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover dark:hidden"
            priority={priority}
          />
          <Image
            src={dark}
            alt={alt}
            fill
            sizes="100vw"
            className="hidden object-cover dark:block"
            priority={priority}
          />
        </>
      ) : (
        <Image src={light} alt={alt} fill sizes="100vw" className="object-cover" priority={priority} />
      )}
    </div>
  );

  // The flat artwork colour runs the full width of the section, so once the band
  // is capped and centred the margins read as part of the design.
  return (
    <section className={`w-full ${bgClass}`}>
      {href ? (
        <Link href={href} className="block">
          {banner}
        </Link>
      ) : (
        banner
      )}
    </section>
  );
}
