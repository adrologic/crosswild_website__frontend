"use client";

import React, { useState, useRef, useCallback, memo } from "react";
import Link from "next/link";
import SafeImage from "@/components/Common/SafeImage";
import { ChevronLeft, ChevronRight, Star, Award, Sparkles, Loader2, MessageCircle, Mail } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/api";

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
    <div className="flex-none w-72 md:w-80 lg:w-72 xl:w-80 p-3">
      <div className="group bg-card-bg dark:bg-gray-800 rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out">
        {/* Image Container */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-[4/3] bg-[#ffffff] dark:bg-gray-700 rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden">
            {product.image && (
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                className={`object-contain p-[22px] transition-all duration-500 group-hover:scale-105 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            {hoverImage && (
              <SafeImage
                src={hoverImage}
                alt={product.name}
                fill
                className="object-contain p-[22px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}

            {/* Badges */}
            <div className="absolute top-[14px] left-[14px] flex flex-col gap-2">
              {product.bestSeller && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                  <Award className="w-3 h-3" />
                  Best Seller
                </span>
              )}
              {product.newArrival && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                  <Sparkles className="w-3 h-3" />
                  New
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                  Featured
                </span>
              )}
            </div>

            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="pt-4 px-2 pb-1.5">
          {product.category && (
            <span className="inline-flex items-center bg-[#ffffff] dark:bg-gray-700 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">{product.category}</span>
          )}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-base text-[#16243b] dark:text-white mb-3.5 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title || product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* CTA Buttons - WhatsApp, Email, View */}
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
      <section className="py-16 bg-theme-bg-soft">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0 && newArrivals.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our curated selection of top-selling and newest products
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-8 mb-10 border-b-2 border-gray-200 dark:border-gray-700">
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
