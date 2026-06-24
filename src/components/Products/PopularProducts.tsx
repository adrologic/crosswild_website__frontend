"use client";

import React from 'react';
import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { Product } from '@/lib/api';
import { useProducts } from '@/hooks/useProducts';
import { Star, TrendingUp, Eye, Loader2, MessageCircle, Mail, ChevronRight } from 'lucide-react';

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

export default function PopularProducts() {
  const { data, isLoading: loading } = useProducts({ bestSeller: true, limit: 8 });
  const products = data?.products ?? [];

  if (loading) {
    return (
      <section className="py-16 bg-theme-bg">
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-theme-bg">
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
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
            <div
              key={product.id}
              className="group bg-card-bg dark:bg-gray-800 rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out"
            >
              {/* Image Container */}
              <Link href={`/products/${product.id}`} className="relative aspect-[4/3] bg-[#ffffff] dark:bg-gray-700 rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden block">
                {product.image && (
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain p-[22px] transition-all duration-500 group-hover:scale-105 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
                {hoverImage && (
                  <SafeImage
                    src={hoverImage}
                    alt={product.name}
                    fill
                    className="object-contain p-[22px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-[14px] left-[14px] flex flex-col gap-2">
                  {product.bestSeller && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                      Best Seller
                    </span>
                  )}
                  {product.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <span className="p-3 bg-[#ffffff] rounded-full hover:bg-gray-100 transition-colors">
                      <Eye className="w-5 h-5 text-gray-900" />
                    </span>
                  </div>
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
                    <span className="text-xs text-gray-500">
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
