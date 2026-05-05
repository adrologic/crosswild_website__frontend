"use client";

import React from 'react';
import Link from 'next/link';
import { productCategories } from '@/data/products';
import { getCategoryUrl } from '@/lib/categoryUrls';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ExploreAllCategories() {
  // Exclude "All Products" from the list
  const categories = productCategories.filter(cat => cat.id !== 'all');

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Explore Our Collection
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse through our extensive range of custom printing and merchandise products
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={getCategoryUrl(category.id)}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Category Name */}
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {category.name}
                  </h3>

                  {/* Arrow */}
                  <div className="flex items-center justify-center gap-1 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
