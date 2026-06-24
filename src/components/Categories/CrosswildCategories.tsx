"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCategoryHomeCards, type CategoryHomeCard } from '@/lib/cms';
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
            return (
              <Link
                key={category._id}
                href={category.link || '#'}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/50 overflow-hidden"
              >
                {category.popular && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{toPlainText(category.description)}</p>
                  <div className="flex items-center text-primary text-sm font-semibold">
                    <span className="group-hover:mr-2 transition-all">Shop Now</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
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
