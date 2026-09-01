"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { productImage } from '@/lib/productImage';
import ProductCodeBadge from '@/components/Common/ProductCodeBadge';
import { Product } from '@/lib/api';
import { useProducts } from '@/hooks/useProducts';
import { Star, Zap, ArrowRight, Loader2, MessageCircle, Mail, ChevronRight } from 'lucide-react';
import { toPlainText } from '@/lib/text';

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

export default function TrendingProducts() {
  const { data: newData, isLoading: loadingNew } = useProducts({ newArrival: true, limit: 6 });
  const { data: featuredData, isLoading: loadingFeatured } = useProducts({ featured: true, limit: 6 });

  const loading = loadingNew || loadingFeatured;
  const products = useMemo(() => {
    const all = [...(newData?.products ?? []), ...(featuredData?.products ?? [])];
    return all.filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i).slice(0, 6);
  }, [newData, featuredData]);

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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4 animate-pulse">
            <Zap className="w-4 h-4" />
            Hot Right Now
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trending Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover what&apos;s hot and trending in custom printing and merchandise
          </p>
        </div>

        {/* Products Grid - Featured Layout */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8">
          {products.map((product, index) => {
            const hoverImage = product.images?.find((img) => img && img !== product.image);
            return (
            <div
              key={product.id}
              className={`group bg-card-bg rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* The wide overlay card is a desktop layout: it only spans two
                  columns from lg up, and in a half-width mobile cell its
                  absolutely positioned title, copy and buttons were taller than
                  the photo and spilled over it. Below lg the first product uses
                  the same photo-above-text card as the rest. */}
              {index === 0 && (
                <div className="relative hidden h-full overflow-hidden rounded-2xl bg-theme-bg-soft lg:block">
                  <Link href={`/products/${product.id}`} className="block absolute inset-0">
                    {product.image && (
                      <SafeImage
                        {...productImage(product)}
                        alt={product.name}
                        fill
                        className={`object-contain p-3 group-hover:scale-105 transition-all duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                        sizes="66vw"
                      />
                    )}
                    {hoverImage && (
                      <SafeImage
                        src={hoverImage}
                        alt={product.name}
                        fill
                        className="object-contain p-3 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                        sizes="66vw"
                      />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </Link>

                  <div className="absolute top-[14px] left-[14px] right-[14px] flex flex-wrap items-start gap-2 z-10 pointer-events-none">
                    <ProductCodeBadge code={product.sku} inline />
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {product.title || product.name}
                    </h3>
                    <p className="text-sm md:text-base opacity-90 mb-4 line-clamp-2">
                      {toPlainText(product.description)}
                    </p>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-sm opacity-75">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <a
                        href={getWhatsAppLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Inquire about ${product.name} on WhatsApp`}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      </a>
                      <a
                        href={getEmailLink(product)}
                        aria-label={`Email inquiry about ${product.name}`}
                        className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
                      >
                        <Mail className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Image */}
              <Link
                href={`/products/${product.id}`}
                className={`block relative aspect-[4/3] bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden ${
                  index === 0 ? 'lg:hidden' : ''
                }`}
              >
                {product.image && (
                  <SafeImage
                    {...productImage(product)}
                    alt={product.name}
                    fill
                    className={`object-contain p-[22px] transition-all duration-500 group-hover:scale-105 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                {hoverImage && (
                  <SafeImage
                    src={hoverImage}
                    alt={product.name}
                    fill
                    className="object-contain p-[22px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}

                <div className="absolute top-[14px] left-[14px] right-[14px] flex flex-wrap items-start gap-2">
                  <ProductCodeBadge code={product.sku} inline />
                </div>
              </Link>

              {/* Product Info */}
              <div className={`pt-4 px-2 pb-1.5 ${index === 0 ? 'lg:hidden' : ''}`}>
                {product.category && (
                  <span className="inline-flex items-center bg-[#ffffff] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">
                    {product.category}
                  </span>
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
                      ({product.reviews})
                    </span>
                  </div>
                )}

                {/* CTA Buttons - WhatsApp, Email */}
                <div className="flex items-center gap-2">
                  <a
                    href={getWhatsAppLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inquire about ${product.name} on WhatsApp`}
                    className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={getEmailLink(product)}
                    aria-label={`Email inquiry about ${product.name}`}
                    className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
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
            <Zap className="w-5 h-5" />
            <span>Explore All Trending Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
