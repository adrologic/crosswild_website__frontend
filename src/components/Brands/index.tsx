"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getBrands, getSiteSettings, type Brand, type StatItem } from '@/lib/cms';

// Client logos shipped with the site, shown until brands are added in the admin
// panel — the CMS list is empty today, so without these the marquee rendered
// nothing at all and the section was just a heading above the stats.
// Files live in public/images/clients.
const FALLBACK_CLIENTS: Brand[] = [
  { _id: 'client-airtel', name: 'Airtel', logoImage: '/images/clients/airtel.jpg', websiteUrl: '' },
  { _id: 'client-amity', name: 'Amity University', logoImage: '/images/clients/amity.jpg', websiteUrl: '' },
  { _id: 'client-biyani', name: 'Biyani Group of Colleges', logoImage: '/images/clients/biyani.jpg', websiteUrl: '' },
  { _id: 'client-bjp', name: 'BJP', logoImage: '/images/clients/bjp.jpg', websiteUrl: '' },
  { _id: 'client-dlb', name: 'DLB', logoImage: '/images/clients/dlb.jpg', websiteUrl: '' },
  { _id: 'client-hdfc', name: 'HDFC Bank', logoImage: '/images/clients/hdfc.jpg', websiteUrl: '' },
  { _id: 'client-icici', name: 'ICICI Bank', logoImage: '/images/clients/icici.jpg', websiteUrl: '' },
  { _id: 'client-tvs', name: 'TVS', logoImage: '/images/clients/tvs.jpg', websiteUrl: '' },
];

const DEFAULT_STATS: StatItem[] = [
  { label: 'Happy Clients', value: '5000+' },
  { label: 'Orders Delivered', value: '50K+' },
  { label: 'Satisfaction Rate', value: '99%' },
  { label: 'Support Available', value: '24/7' },
];

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>(FALLBACK_CLIENTS);
  const [stats, setStats] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    // Anything configured in admin replaces the shipped logos wholesale.
    getBrands().then((b) => { if (b.length) setBrands(b); });
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
  const logo = brand.logoImage ? (
    <Image
      src={brand.logoImage}
      alt={`${brand.name} — client of The Cross Wild`}
      fill
      sizes="160px"
      className="object-contain p-2"
    />
  ) : null;

  // Tile rather than a bare image: these logos are JPGs with a white
  // background, so on the dark theme a transparent tile would show them as
  // pale rectangles floating on dark. White behind them in both themes reads
  // as a deliberate logo wall.
  const tileClass =
    'relative block h-16 w-40 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5';

  return (
    <div className="flex-shrink-0 mx-6 transition-transform hover:scale-105">
      {brand.websiteUrl ? (
        <a href={brand.websiteUrl} target="_blank" rel="nofollow noreferrer" className={tileClass}>
          {logo}
        </a>
      ) : (
        // No site on file — a link to "#" would just be a dead control.
        <div className={tileClass}>{logo}</div>
      )}
    </div>
  );
}
