"use client";

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productImage } from '@/lib/productImage';
import { useProducts } from '@/hooks/useProducts';
import { getCategoryListingUrl } from '@/lib/categoryUrls';
import { ChevronLeft, ChevronRight, ArrowRight, Loader2, Grid3X3, Package } from 'lucide-react';

const CATEGORIES = [
  { slug: 'tshirts', name: 'T-Shirts', icon: '👕' },
  { slug: 'sweatshirts', name: 'Sweatshirts', icon: '🧥' },
  { slug: 'caps', name: 'Caps & Hats', icon: '🧢' },
  { slug: 'bags', name: 'Bags & Totes', icon: '🛍️' },
  { slug: 'mugs', name: 'Mugs & Drinkware', icon: '☕' },
  { slug: 'cards', name: 'Business Cards', icon: '📇' },
  { slug: 'printing', name: 'Printing', icon: '📄' },
  { slug: 'uniforms', name: 'Uniforms', icon: '👔' },
  { slug: 'gifts', name: 'Gifts & Accessories', icon: '🎁' },
];

export default function ShopByCategory() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].slug);
  const scrollRef = useRef<HTMLDivElement>(null);

  // TanStack Query — auto-caches per category, no duplicate requests
  const { data, isLoading } = useProducts({ category: activeCategory, limit: 8 });
  const currentProducts = data?.products ?? [];

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += direction === "left" ? -320 : 320;
    }
  }, []);

  return (
    <section className="py-10 md:py-16 bg-theme-bg-soft">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-7 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Grid3X3 className="w-4 h-4" />
            Browse Categories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of custom products across all categories
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-3 mb-7 md:mb-10 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex-none flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === cat.slug
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-theme-bg text-theme-text-secondary hover:bg-theme-bg-card shadow-md'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12 md:py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No products found in this category yet.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Scrollable product row */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth gap-5 py-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {currentProducts.map((product) => {
                const hoverImage = product.images?.find((img) => img && img !== product.image);
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block flex-none w-56 bg-card-bg border border-black/5 dark:border-white/10 rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(22,36,59,0.06),0_6px_16px_rgba(22,36,59,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] hover:shadow-[0_2px_6px_rgba(22,36,59,0.07),0_12px_26px_rgba(22,36,59,0.11)] dark:hover:shadow-[0_12px_26px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-200 ease-out"
                  >
                    <div className="relative aspect-square bg-[#ffffff] rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(22,36,59,0.07)]">
                      {product.image ? (
                        <>
                          <Image
                            {...productImage(product)}
                            alt={product.name}
                            fill
                            className={`object-contain p-4 sm:p-6 transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                            sizes="224px"
                          />
                          {hoverImage && (
                            <Image
                              src={hoverImage}
                              alt={product.name}
                              fill
                              className="object-contain p-4 sm:p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                              sizes="224px"
                            />
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="w-16 h-16 text-[#c9d2e0]" />
                        </div>
                      )}
                    </div>

                    <div className="pt-3 pb-0.5 px-0.5">
                      {product.category && (
                        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4a5a73] dark:text-white/55">
                          {product.category}
                        </p>
                      )}
                      <h3 className="mt-1 min-h-[2.375rem] text-sm font-medium leading-snug text-[#16243b] dark:text-white line-clamp-2">
                        {product.title || product.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Navigation arrows */}
            {currentProducts.length > 3 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 bg-theme-bg rounded-full shadow-xl z-20 hover:bg-theme-bg-soft transition-all hover:scale-110 border border-theme-border"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} className="text-theme-text" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 bg-theme-bg rounded-full shadow-xl z-20 hover:bg-theme-bg-soft transition-all hover:scale-110 border border-theme-border"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} className="text-theme-text" />
                </button>
              </>
            )}

            {/* Gradient overlays */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-theme-bg-soft to-transparent pointer-events-none z-10"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-theme-bg-soft to-transparent pointer-events-none z-10"></div>
          </div>
        )}

        {/* View All for this category */}
        <div className="text-center mt-8">
          <Link
            href={getCategoryListingUrl(activeCategory)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <span>View All {CATEGORIES.find(c => c.slug === activeCategory)?.name}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
