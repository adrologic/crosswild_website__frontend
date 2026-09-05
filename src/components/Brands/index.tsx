"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import { getBrands, getSiteSettings, type Brand, type StatItem } from '@/lib/cms';

// Client logos shipped with the site, shown until brands are added in the admin
// panel — the CMS list is empty today, so without these the marquee rendered
// nothing at all and the section was just a heading above the stats.
//
// Files live in public/images/clients, every one fitted onto the same 250x106
// canvas so no tile reads larger than its neighbours. Logos drawn on a coloured
// plate (SBI, ZEE, Kendriya Vidyalaya, Springboard) keep that plate out to the
// canvas edge rather than floating in a white box.
//
// The order matters: the wall is split down the middle into two rows below, so
// this list is arranged to spread the banks, telecoms, government bodies and
// colleges across both rows instead of stacking a whole sector in one.
const FALLBACK_CLIENTS: Brand[] = [
  // Row one
  { _id: 'client-bjp', name: 'BJP', logoImage: '/images/clients/bjp.jpg', websiteUrl: '' },
  { _id: 'client-hdfc', name: 'HDFC Bank', logoImage: '/images/clients/hdfc.jpg', websiteUrl: '' },
  { _id: 'client-sbi', name: 'State Bank of India', logoImage: '/images/clients/sbi.jpg', websiteUrl: '' },
  { _id: 'client-airtel', name: 'Airtel', logoImage: '/images/clients/airtel.jpg', websiteUrl: '' },
  { _id: 'client-jio', name: 'Jio', logoImage: '/images/clients/jio.jpg', websiteUrl: '' },
  { _id: 'client-zomato', name: 'Zomato', logoImage: '/images/clients/zomato.jpg', websiteUrl: '' },
  { _id: 'client-indian-army', name: 'Indian Army', logoImage: '/images/clients/indian-army.jpg', websiteUrl: '' },
  { _id: 'client-amity', name: 'Amity University', logoImage: '/images/clients/amity.jpg', websiteUrl: '' },
  { _id: 'client-iit-jodhpur', name: 'IIT Jodhpur', logoImage: '/images/clients/iit-jodhpur.jpg', websiteUrl: '' },
  { _id: 'client-genpact', name: 'Genpact', logoImage: '/images/clients/genpact.jpg', websiteUrl: '' },
  { _id: 'client-nagar-nigam-jaipur', name: 'Nagar Nigam Jaipur', logoImage: '/images/clients/nagar-nigam-jaipur.jpg', websiteUrl: '' },
  { _id: 'client-resonance', name: 'Resonance', logoImage: '/images/clients/resonance.jpg', websiteUrl: '' },
  { _id: 'client-burger-farm', name: 'Burger Farm', logoImage: '/images/clients/burger-farm.jpg', websiteUrl: '' },
  { _id: 'client-unique-builders', name: 'Unique Builders', logoImage: '/images/clients/unique-builders.jpg', websiteUrl: '' },
  // Row two
  { _id: 'client-icici', name: 'ICICI Bank', logoImage: '/images/clients/icici.jpg', websiteUrl: '' },
  { _id: 'client-tvs', name: 'TVS', logoImage: '/images/clients/tvs.jpg', websiteUrl: '' },
  { _id: 'client-indian-oil', name: 'IndianOil', logoImage: '/images/clients/indian-oil.jpg', websiteUrl: '' },
  { _id: 'client-dlb', name: 'DLB', logoImage: '/images/clients/dlb.jpg', websiteUrl: '' },
  { _id: 'client-justdial', name: 'Justdial', logoImage: '/images/clients/justdial.jpg', websiteUrl: '' },
  { _id: 'client-zee-studios', name: 'ZEE Studios', logoImage: '/images/clients/zee-studios.jpg', websiteUrl: '' },
  { _id: 'client-indian-air-force', name: 'Indian Air Force', logoImage: '/images/clients/indian-air-force.jpg', websiteUrl: '' },
  { _id: 'client-biyani', name: 'Biyani Group of Colleges', logoImage: '/images/clients/biyani.jpg', websiteUrl: '' },
  { _id: 'client-aiims-jodhpur', name: 'AIIMS Jodhpur', logoImage: '/images/clients/aiims-jodhpur.jpg', websiteUrl: '' },
  { _id: 'client-manipal', name: 'Manipal University', logoImage: '/images/clients/manipal-university.jpg', websiteUrl: '' },
  { _id: 'client-kendriya-vidyalaya', name: 'Kendriya Vidyalaya Sangathan', logoImage: '/images/clients/kendriya-vidyalaya.jpg', websiteUrl: '' },
  { _id: 'client-nrai', name: 'National Rifle Association of India', logoImage: '/images/clients/nrai.jpg', websiteUrl: '' },
  { _id: 'client-au-jaipur-marathon', name: 'AU Bank Jaipur Marathon', logoImage: '/images/clients/au-bank-jaipur-marathon.jpg', websiteUrl: '' },
  { _id: 'client-springboard', name: 'Springboard Academy', logoImage: '/images/clients/springboard-academy.jpg', websiteUrl: '' },
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

  // Two rows rather than one. At 28 logos a single track takes most of a minute
  // to come back round, so a visitor sees maybe a third of the wall; halving it
  // halves that wait and lets the rows travel opposite ways. Ceil keeps the top
  // row the longer one when the count is odd, and the filter drops the second
  // row entirely if the admin panel ever supplies just one logo.
  const half = Math.ceil(brands.length / 2);
  const rows = [brands.slice(0, half), brands.slice(half)].filter((row) => row.length > 0);

  return (
    <section className="py-8 md:py-12 bg-theme-bg-soft overflow-hidden">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of satisfied clients who trust us for their printing needs
          </p>
        </div>

        {rows.length > 0 && (
          <div className="space-y-4">
            {rows.map((row, index) => (
              <BrandRow key={index} brands={row} reverse={index === 1} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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

function BrandRow({ brands, reverse }: { brands: Brand[]; reverse?: boolean }) {
  // Listed twice over: the keyframe travels exactly -50%, so the second copy
  // arrives where the first began and the loop has no seam.
  const track = [...brands, ...brands];

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-theme-bg-soft to-transparent z-10 pointer-events-none"></div>
      <div className="flex overflow-hidden">
        <div className={`flex ${reverse ? 'animate-scroll-reverse' : 'animate-scroll'} hover:pause-animation`}>
          {track.map((brand, index) => (
            <SingleBrand key={`${brand._id}-${index}`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
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
