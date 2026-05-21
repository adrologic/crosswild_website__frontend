"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SectionTitle from '../Common/SectionTitle';
import { getTestimonials, type Testimonial } from '@/lib/cms';

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getTestimonials().then((d) => { setItems(d); setLoaded(true); });
  }, []);

  // Hide section entirely if admin has not added any (per the brief)
  if (loaded && items.length === 0) return null;

  return (
    <section className="bg-theme-bg-soft relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container">
        <SectionTitle
          title="What Our Customers Say"
          paragraph="Real feedback from businesses we've worked with."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t._id} className="w-full">
              <div className="shadow-two hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark rounded-xs bg-white p-8 duration-300 lg:px-5 xl:px-8">
                <div className="mb-5 flex items-center space-x-1">
                  {Array.from({ length: Math.round(t.rating || 0) }).map((_, i) => (
                    <span key={i} className="text-yellow">{starIcon}</span>
                  ))}
                </div>
                <p className="border-body-color/10 text-body-color mb-8 border-b pb-8 text-base leading-relaxed dark:border-white/10 dark:text-white">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center">
                  {t.image && (
                    <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
                      <Image src={t.image} alt={t.name} fill unoptimized />
                    </div>
                  )}
                  <div className="w-full">
                    <h3 className="text-dark mb-1 text-lg font-semibold lg:text-base xl:text-lg dark:text-white">{t.name}</h3>
                    <p className="text-body-color text-sm">{t.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
