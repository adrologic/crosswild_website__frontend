"use client";

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';
import { useProducts } from '@/hooks/useProducts';
import { getCategoryUrl } from '@/lib/categoryUrls';
import { Star, ChevronLeft, ChevronRight, ArrowRight, Loader2, Grid3X3, MessageCircle, Mail } from 'lucide-react';

const WHATSAPP_NUMBER = '+919529626262';
const EMAIL_ADDRESS = 'orders@thecrosswild.com';

const getWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi! I'm interested in:\n\n*${product.name}*\nCategory: ${product.category}\n\nPlease share pricing and availability.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
};

const getEmailLink = (product: Product) => {
  const subject = encodeURIComponent(`Inquiry: ${product.name}`);
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in "${product.name}".\n\nPlease share pricing and availability details.\n\nThank you!`
  );
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
};

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
    <section className="py-16 bg-theme-bg-soft">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
            <Grid3X3 className="w-4 h-4" />
            Browse Categories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of custom products across all categories
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
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
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-16">
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
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-72 group bg-theme-bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <Link href={`/products/${product.id}`} className="block relative h-64 bg-theme-bg-soft overflow-hidden">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="288px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.bestSeller && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          Best Seller
                        </span>
                      )}
                      {product.newArrival && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                          New
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-base mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[3rem]">
                        {product.title || product.name}
                      </h3>
                    </Link>

                    {product.rating > 0 && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <a
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inquire about ${product.name} on WhatsApp`}
                        className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <a
                        href={getEmailLink(product)}
                        aria-label={`Email inquiry about ${product.name}`}
                        className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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
            href={getCategoryUrl(activeCategory)}
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
