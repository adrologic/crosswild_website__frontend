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
              {currentProducts.map((product) => {
                const hoverImage = product.images?.find((img) => img && img !== product.image);
                return (
                <div
                  key={product.id}
                  className="flex-none w-72 group bg-card-bg dark:bg-gray-800 rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out"
                >
                  {/* Image */}
                  <Link href={`/products/${product.id}`} className="relative aspect-[4/3] bg-[#ffffff] dark:bg-gray-700 rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden block">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-contain p-[22px] transition-all duration-500 group-hover:scale-105 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                        sizes="288px"
                      />
                    )}
                    {hoverImage && (
                      <Image
                        src={hoverImage}
                        alt={product.name}
                        fill
                        className="object-contain p-[22px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                        sizes="288px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-[14px] left-[14px] flex flex-col gap-2">
                      {product.bestSeller && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                          Best Seller
                        </span>
                      )}
                      {product.newArrival && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                          New
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="pt-4 px-2 pb-1.5">
                    {product.category && (
                      <span className="inline-flex items-center bg-[#ffffff] dark:bg-gray-700 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">{product.category}</span>
                    )}
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-base text-[#16243b] dark:text-white mb-3.5 line-clamp-2 group-hover:text-primary transition-colors">
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

                    <div className="flex items-center gap-2">
                      <a
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inquire about ${product.name} on WhatsApp`}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      </a>
                      <a
                        href={getEmailLink(product)}
                        aria-label={`Email inquiry about ${product.name}`}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
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
