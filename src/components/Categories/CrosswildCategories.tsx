"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getCategoryHomeCards, type CategoryHomeCard } from '@/lib/cms';
import { getBannerForTitle } from '@/data/categoryBanners';
import { toPlainText } from '@/lib/text';

const FALLBACK: CategoryHomeCard[] = [
  { _id: '1', title: 'T-Shirts', description: 'Custom printed & embroidered tees', icon: '👕', link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur', popular: true },
  { _id: '2', title: 'Bags', description: 'School, office, gym & more', icon: '🎒', link: '/product/school-laptop-bag-manufacturer-in-Jaipur', popular: true },
  { _id: '3', title: 'Caps', description: 'Cotton, polyester & custom caps', icon: '🧢', link: '/product/cap-printing-manufacturer-in-jaipur', popular: false },
  { _id: '4', title: 'Sweatshirts & Hoodies', description: 'Warm up in custom style', icon: '🧥', link: '/product/sweatshirt-hoodie-manufacturer-in-Jaipur', popular: false },
  { _id: '5', title: 'Lower & Shorts', description: 'Comfortable active wear', icon: '🩳', link: '/category/lowers', popular: false },
  { _id: '6', title: 'School & Office Uniform', description: 'Professional workwear solutions', icon: '👔', link: '/product/school-uniform', popular: false },
  { _id: '7', title: 'Printing & Embroidery', description: 'Screen, digital & sublimation', icon: '🖨️', link: '/product/printing', popular: false },
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
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What would you like to create?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of customizable products to bring your brand to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((category, idx) => {
            const color = COLORS[idx % COLORS.length];
            const banner = getBannerForTitle(category.title);
            return (
              <Link
                key={category._id}
                href={category.link || '#'}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/50 overflow-hidden"
              >
                {/* The category's own banner photo, cropped to a tile. Cards
                    added in the admin panel carry a label rather than a category
                    id, so the photo is matched on the title and falls back to
                    the emoji when nothing matches. */}
                {banner ? (
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <Image
                      src={banner.src}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-16/10 items-center justify-center bg-gray-100">
                    <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                      {category.icon}
                    </span>
                  </div>
                )}

                <div className="relative p-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-1.5 text-gray-900 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{toPlainText(category.description)}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
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
