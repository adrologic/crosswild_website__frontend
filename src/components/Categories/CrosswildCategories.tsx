"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getCategoryHomeCards, type CategoryHomeCard } from '@/lib/cms';
import { toPlainText } from '@/lib/text';
import { getCategoryListingUrl } from '@/lib/categoryUrls';

// This grid's own tile photos — deliberately separate from the designed
// banners in data/categoryBanners.ts (those are full-bleed artwork for the
// category pages themselves; cropping them to a 16:10 tile here cuts off
// their baked-in headline). Keyed by keyword the same way, longest first.
const HOME_CARD_IMAGES: Record<string, string> = {
  tshirts: '/banners/categories/home-cards/tshirts.webp',
  bags: '/banners/categories/home-cards/bags.webp',
  caps: '/banners/categories/home-cards/caps.webp',
  sweatshirts: '/banners/categories/home-cards/sweatshirts.webp',
  lowers: '/banners/categories/home-cards/lowers.webp',
  uniforms: '/banners/categories/home-cards/uniforms.webp',
  printing: '/banners/categories/home-cards/printing.webp',
  'chef-coat': '/banners/categories/home-cards/chef-coat.webp',
};

const HOME_CARD_TITLE_KEYWORDS: Array<[string, string]> = [
  ['sweatshirt', 'sweatshirts'],
  ['hoodie', 'sweatshirts'],
  ['chef coat', 'chef-coat'],
  ['chef', 'chef-coat'],
  ['uniform', 'uniforms'],
  ['printing', 'printing'],
  ['embroidery', 'printing'],
  ['t-shirt', 'tshirts'],
  ['tshirt', 'tshirts'],
  ['tee', 'tshirts'],
  ['bag', 'bags'],
  ['cap', 'caps'],
  ['lower', 'lowers'],
  ['short', 'lowers'],
];

function getHomeCardImage(title?: string | null): string | null {
  if (!title) return null;
  const t = title.toLowerCase();
  for (const [keyword, key] of HOME_CARD_TITLE_KEYWORDS) {
    if (t.includes(keyword) && HOME_CARD_IMAGES[key]) return HOME_CARD_IMAGES[key];
  }
  return null;
}

const FALLBACK: CategoryHomeCard[] = [
  { _id: '1', title: 'T-Shirts', description: 'Custom printed & embroidered tees', icon: '👕', link: getCategoryListingUrl('tshirts'), popular: true },
  { _id: '2', title: 'Bags', description: 'School, office, gym & more', icon: '🎒', link: getCategoryListingUrl('bags'), popular: true },
  { _id: '3', title: 'Caps', description: 'Cotton, polyester & custom caps', icon: '🧢', link: getCategoryListingUrl('caps'), popular: false },
  { _id: '4', title: 'Sweatshirts & Hoodies', description: 'Warm up in custom style', icon: '🧥', link: getCategoryListingUrl('sweatshirts'), popular: false },
  { _id: '5', title: 'Lower & Shorts', description: 'Comfortable active wear', icon: '🩳', link: '/category/lowers', popular: false },
  { _id: '6', title: 'School & Office Uniform', description: 'Professional workwear solutions', icon: '👔', link: getCategoryListingUrl('uniforms'), popular: false },
  { _id: '7', title: 'Printing & Embroidery', description: 'Screen, digital & sublimation', icon: '🖨️', link: getCategoryListingUrl('printing'), popular: false },
  { _id: '8', title: 'Apron & Chef Coat', description: 'Kitchen & hospitality wear', icon: '🧑‍🍳', link: '/category/apron', popular: false },
];

const COLORS = [
  'from-orange-400 to-orange-600',
  'from-green-400 to-green-600',
  'from-red-400 to-red-600',
  'from-indigo-400 to-indigo-600',
  'from-blue-400 to-blue-600',
  'from-teal-400 to-teal-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
];

export default function CrosswildCategories() {
  const [items, setItems] = useState<CategoryHomeCard[]>(FALLBACK);
  useEffect(() => {
    getCategoryHomeCards().then((d) => { if (d.length) setItems(d); });
  }, []);

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What would you like to create?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of customizable products to bring your brand to life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((category, idx) => {
            const color = COLORS[idx % COLORS.length];
            const image = getHomeCardImage(category.title);
            return (
              <Link
                key={category._id}
                href={category.link || '#'}
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
              >
                {/* The category's own product photo, filling the whole tile —
                    text sits on a gradient scrim over it instead of pushed
                    into a separate footer, so the photo stays the star.
                    Cards added in the admin panel carry a label rather than a
                    category id, so the photo is matched on the title and
                    falls back to a colored icon tile when nothing matches. */}
                {image ? (
                  <Image
                    src={image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${color}`}>
                    <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                      {category.icon}
                    </span>
                  </div>
                )}

                {/* Scrim — only the bottom third is solid (enough to stop
                    text/graphics baked into the product photo, like a print
                    design, from clashing with the title); the rest stays
                    light so the photo itself is what fills a small card. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 from-8% via-black/25 via-32% to-transparent" />

                {/* Colored icon badge — the "colorful" accent per category,
                    independent of whatever tones the photo itself carries.
                    Kept small so it reads as an accent, not a second logo
                    fighting the product photo for attention. */}
                <div
                  className={`absolute top-2.5 left-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br ${color} shadow-lg flex items-center justify-center text-xs sm:text-sm ring-2 ring-white/40`}
                >
                  {category.icon}
                </div>

                {category.popular && (
                  <span className="absolute top-2.5 right-2.5 bg-white/95 text-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow">
                    Popular
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 md:p-5">
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-white drop-shadow-sm mb-0.5 sm:mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/85 line-clamp-1 sm:line-clamp-2">
                    {toPlainText(category.description)}
                  </p>
                  <span className="mt-2 hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-white opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary hover:text-primary hover:shadow-lg transition-all"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
