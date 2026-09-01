"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tag, TrendingUp, Zap } from 'lucide-react';
import { getDeals, type Deal } from '@/lib/cms';
import { toPlainText } from '@/lib/text';

const COLORS = [
  'from-blue-500 to-blue-600',
  'from-orange-500 to-red-500',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
];
const ICONS = [TrendingUp, Zap, Tag];

// Mirrors the three deals stored in the CMS so the section reads the same if
// the API is unreachable — keep the two in step when the offers change.
const FALLBACK: Deal[] = [
  { _id: '1', title: 'Bulk Order Special', discountLabel: '10% OFF', description: 'On orders above 1,000 pieces', link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur' },
  { _id: '2', title: 'First Order', discountLabel: '5% OFF', description: 'On your first order with us', link: '/products' },
  { _id: '3', title: 'Loyal Customers', discountLabel: 'Up to 10% OFF', description: 'For our repeat customers', link: '/products' },
];

// The "Need Help Choosing? Talk to Our Experts!" gradient CTA that closed this
// section was the same banner, in the same colours, as LocationsCTA further
// down the page. That one is kept — it closes the page — and the deal cards
// here carry their own "Claim Now" links. Dropping it also took the
// site-settings phone lookup this component only needed for its "Call Us Now"
// button.
export default function DealsSection() {
  const [deals, setDeals] = useState<Deal[]>(FALLBACK);

  useEffect(() => {
    getDeals().then((d) => { if (d.length) setDeals(d); });
  }, []);

  return (
    <section className="py-8 md:py-12 bg-theme-bg overflow-hidden">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-5 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Special Deals & Discounts
          </h2>
        </div>

        {/* On a phone these become one swipeable row instead of three
            full-width cards stacked, which was most of the section's height. */}
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {deals.map((deal, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const color = COLORS[idx % COLORS.length];
            return (
              <Link
                key={deal._id}
                href={deal.link || '#'}
                className="group relative w-[78%] flex-none snap-center overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-transparent hover:shadow-2xl sm:w-[46%] md:w-auto"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10 p-5 text-white md:p-6">
                  {deal.badge && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {deal.badge}
                    </div>
                  )}
                  <Icon className="w-8 h-8 mb-2 opacity-80 md:w-10 md:h-10 md:mb-3" />
                  <h3 className="text-base font-bold mb-0.5 md:text-lg">{deal.title}</h3>
                  <div className="text-3xl font-black mb-1 md:text-4xl">{deal.discountLabel}</div>
                  <p className="text-sm text-white/90 mb-4 line-clamp-2">{toPlainText(deal.description)}</p>
                  <div className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm backdrop-blur-sm transition-colors">
                    <span className="font-semibold">Claim Now</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
