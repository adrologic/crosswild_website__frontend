import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  subtitle?: string;
  bannerImage?: string | null;
  /**
   * Dark-mode variant of `bannerImage`. Swapped with CSS rather than `useTheme`
   * so the correct image is in the markup on first paint — next-themes sets
   * `.dark` on <html> before hydration, so there is no flash and no layout shift.
   */
  bannerImageDark?: string | null;
  /**
   * Natural ratio of the artwork, e.g. '7000 / 3938'. Setting it switches the
   * banner into *artwork mode*: the image renders full-bleed at its own ratio
   * with no crop and no dark overlay, and `title`/`subtitle` go screen-reader-only
   * because the artwork already carries them visually. Leave unset for the default
   * short banner with the text drawn on top.
   */
  aspectRatio?: string;
  /** Tailwind classes for the colour behind the artwork while it loads, e.g.
   *  'bg-[#AACBFE] dark:bg-[#861424]'. Artwork mode only. */
  bannerBgClass?: string;
  breadcrumbs?: { label: string; href?: string }[];
  /**
   * When true, render the banner title as the page's <h1>. Default false so
   * pages that already own their h1 elsewhere keep this as a <p>. One h1 per page.
   */
  asH1?: boolean;
}

export default function PageBanner({
  title,
  subtitle,
  bannerImage,
  bannerImageDark,
  aspectRatio,
  bannerBgClass = '',
  breadcrumbs,
  asH1 = false,
}: Props) {
  const crumbs = breadcrumbs || [{ label: 'Home', href: '/' }, { label: title }];
  const TitleTag = asH1 ? 'h1' : 'p';
  const artwork = Boolean(aspectRatio && bannerImage);

  return (
    <div className="w-full">
      {artwork ? (
        <div className={`relative w-full overflow-hidden ${bannerBgClass}`} style={{ aspectRatio }}>
          {/* Decorative: the heading and copy baked into the artwork are exposed
              to search engines and screen readers by the sr-only block below. */}
          <Image
            src={bannerImage as string}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${bannerImageDark ? 'dark:hidden' : ''}`}
            priority
            fetchPriority="high"
          />
          {bannerImageDark && (
            <Image
              src={bannerImageDark}
              alt=""
              fill
              sizes="100vw"
              className="hidden object-cover dark:block"
              priority
              fetchPriority="high"
            />
          )}
          <div className="sr-only">
            <TitleTag>{title}</TitleTag>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      ) : bannerImage ? (
        <div className="relative w-full h-[180px] sm:h-[240px] overflow-hidden">
          <Image
            src={bannerImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <TitleTag className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</TitleTag>
            {subtitle && <p className="mt-2 text-base sm:text-lg text-white/80 max-w-xl">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <div className="bg-[#f5f5f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8 px-6">
          <div className="container text-center">
            <TitleTag className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</TitleTag>
            {subtitle && <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Breadcrumb bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-2.5 px-6">
        <div className="container">
          <ol className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            {crumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-gray-300 dark:text-gray-600">›</span>}
                {crumb.href && i < crumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
