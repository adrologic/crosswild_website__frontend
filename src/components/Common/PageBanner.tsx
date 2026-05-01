import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  subtitle?: string;
  bannerImage?: string | null;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageBanner({ title, subtitle, bannerImage, breadcrumbs }: Props) {
  const crumbs = breadcrumbs || [{ label: 'Home', href: '/' }, { label: title }];

  return (
    <div className="w-full">
      {bannerImage ? (
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
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-base sm:text-lg text-white/80 max-w-xl">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <div className="bg-[#f5f5f5] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8 px-6">
          <div className="container text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
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
