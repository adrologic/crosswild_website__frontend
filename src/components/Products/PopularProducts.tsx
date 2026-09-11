"use client";

import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { productImage } from '@/lib/productImage';
import { useProducts } from '@/hooks/useProducts';
import { TrendingUp, Loader2, Package } from 'lucide-react';

export default function PopularProducts() {
  const { data, isLoading: loading } = useProducts({ bestSeller: true, limit: 8 });
  const products = data?.products ?? [];

  if (loading) {
    return (
      <section className="py-10 md:py-16 bg-theme-bg">
        <div className="flex justify-center items-center py-12 md:py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-theme-bg">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Customer Favorites
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Most Popular Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Top-rated products loved by thousands of customers across India
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
          {products.map((product) => {
            const hoverImage = product.images?.find((img) => img && img !== product.image);
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block bg-card-bg border border-black/5 dark:border-white/10 rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(22,36,59,0.06),0_6px_16px_rgba(22,36,59,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] hover:shadow-[0_2px_6px_rgba(22,36,59,0.07),0_12px_26px_rgba(22,36,59,0.11)] dark:hover:shadow-[0_12px_26px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-200 ease-out"
              >
                <div className="relative aspect-square bg-[#ffffff] rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(22,36,59,0.07)]">
                  {product.image ? (
                    <>
                      <SafeImage
                        {...productImage(product)}
                        alt={product.name}
                        fill
                        className={`object-contain p-4 sm:p-6 transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      {hoverImage && (
                        <SafeImage
                          src={hoverImage}
                          alt={product.name}
                          fill
                          className="object-contain p-4 sm:p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          sizes="(max-width: 640px) 50vw, 25vw"
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

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            <TrendingUp className="w-5 h-5" />
            <span>View All Popular Products</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
