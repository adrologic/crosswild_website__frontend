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

  // A single image when the artwork suits both themes — no point putting the
  // same file in the markup twice under a class that only hides one of them.
  const banner = (
    <div
      className={`relative mx-auto w-full overflow-hidden ${bgClass}`}
      style={{ aspectRatio, maxHeight, maxWidth: `calc(${maxHeight} * ${ratio})` }}
    >
      {dark ? (
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
