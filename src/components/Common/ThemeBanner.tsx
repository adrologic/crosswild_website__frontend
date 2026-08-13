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
   */
  dark: string;
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
}: Props) {
  const banner = (
    <div className={`relative w-full overflow-hidden ${bgClass}`} style={{ aspectRatio }}>
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
    </div>
  );

  return (
    <section className="w-full">
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
