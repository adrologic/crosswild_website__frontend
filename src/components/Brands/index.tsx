"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getBrands, getSiteSettings, type Brand, type StatItem } from '@/lib/cms';

const DEFAULT_STATS: StatItem[] = [
  { label: 'Happy Clients', value: '5000+' },
  { label: 'Orders Delivered', value: '50K+' },
  { label: 'Satisfaction Rate', value: '99%' },
  { label: 'Support Available', value: '24/7' },
];

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    getBrands().then(setBrands);
    getSiteSettings().then((s) => { if (s?.stats?.length) setStats(s.stats); });
  }, []);

  // Duplicate for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-12 bg-theme-bg-soft overflow-hidden">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of satisfied clients who trust us for their printing needs
          </p>
        </div>

        {brands.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll hover:pause-animation">
                {duplicatedBrands.map((brand, index) => (
                  <SingleBrand key={`${brand._id}-${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SingleBrand({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 mx-8 transition-transform hover:scale-110">
      <a
        href={brand.websiteUrl || '#'}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative block h-16 w-32 opacity-60 transition hover:opacity-100 dark:opacity-50 dark:hover:opacity-100"
      >
        {brand.logoImage && (
          <Image
            src={brand.logoImage}
            alt={brand.name}
            fill
            className="object-contain"
            unoptimized
          />
        )}
      </a>
    </div>
  );
}
