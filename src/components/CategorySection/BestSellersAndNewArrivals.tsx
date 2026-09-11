"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import Link from "next/link";
import SafeImage from "@/components/Common/SafeImage";
import { productImage } from '@/lib/productImage';
import { ChevronLeft, ChevronRight, Award, Sparkles, Loader2, Package } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/api";

const TabButton = memo(({ isActive, label, icon: Icon, onClick }: { isActive: boolean; label: string; icon: any; onClick: () => void }) => (
  <button
    className={`flex items-center gap-2 pb-3 px-6 text-lg md:text-xl font-bold transition-all duration-300 border-b-4 ${
      isActive
        ? "text-primary border-primary"
        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
));
TabButton.displayName = 'TabButton';

const ProductCard = memo(({ product }: { product: Product }) => {
  const hoverImage = product.images?.find((img) => img && img !== product.image);

  return (
    <div className="flex-none w-56 p-3">
      <Link
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
                sizes="224px"
              />
              {hoverImage && (
                <SafeImage
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
    </div>
  );
});
ProductCard.displayName = 'ProductCard';

const BestSellersAndNewArrivals = () => {
  const [activeTab, setActiveTab] = useState("bestSellers");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: bestSellerData, isLoading: loadingBest } = useProducts({ bestSeller: true, limit: 8 });
  const { data: newArrivalData, isLoading: loadingNew } = useProducts({ newArrival: true, limit: 8 });

  const bestSellers = bestSellerData?.products ?? [];
  const newArrivals = newArrivalData?.products ?? [];
  const loading = loadingBest && loadingNew;
  const currentProducts = activeTab === "bestSellers" ? bestSellers : newArrivals;

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += direction === "left" ? -350 : 350;
    }
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-16 bg-theme-bg-soft">
        <div className="flex justify-center items-center py-12 md:py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0 && newArrivals.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-7 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our curated selection of top-selling and newest products
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-8 mb-7 md:mb-10 border-b-2 border-gray-200 dark:border-gray-700">
          <TabButton
            isActive={activeTab === "bestSellers"}
            label="Best Sellers"
            icon={Award}
            onClick={() => setActiveTab("bestSellers")}
          />
          <TabButton
            isActive={activeTab === "newArrivals"}
            label="New Arrivals"
            icon={Sparkles}
            onClick={() => setActiveTab("newArrivals")}
          />
        </div>

        {/* Products Container */}
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-2 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          {currentProducts.length > 3 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-4 bg-theme-bg rounded-full shadow-xl z-20 hover:bg-theme-bg-soft transition-all hover:scale-110 border-2 border-theme-border"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} className="text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-4 bg-theme-bg rounded-full shadow-xl z-20 hover:bg-theme-bg-soft transition-all hover:scale-110 border-2 border-theme-border"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} className="text-gray-800 dark:text-white" />
              </button>
            </>
          )}

          {/* Gradient Overlay - right side only to indicate more items */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 pointer-events-none z-10"></div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersAndNewArrivals;
