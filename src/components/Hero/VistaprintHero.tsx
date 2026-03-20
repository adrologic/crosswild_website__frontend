"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function VistaprintHero() {
  return (
    <section className="bg-theme-bg">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-secondary to-secondary-600 text-white py-3">
        <div className="w-full px-6 lg:px-12 text-center">
          <p className="text-sm md:text-base font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Limited Time Offer: Get 20% OFF on Bulk Orders! Use Code: BULK20
            <Sparkles className="w-4 h-4" />
          </p>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              🎉 India's #1 Custom Printing Partner
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create Custom
              <span className="text-primary"> Products </span>
              That Make an Impact
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              From business cards to custom apparel, we bring your brand to life with premium quality printing and fast delivery across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Start Designing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/our_process"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-theme-border text-theme-text font-semibold rounded-lg hover:border-primary hover:text-primary transition-all"
              >
                How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">5000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">4.8/5</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Premium</div>
                  <div className="text-sm text-gray-600">Quality Products</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'T-Shirts', icon: '👕', color: 'bg-red-100' },
                      { name: 'Mugs', icon: '☕', color: 'bg-yellow-100' },
                      { name: 'Bags', icon: '🎒', color: 'bg-green-100' },
                      { name: 'Caps', icon: '🧢', color: 'bg-blue-100' },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.color} p-6 rounded-xl transform hover:scale-105 transition-transform cursor-pointer`}
                      >
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <div className="font-semibold text-gray-800">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Fast Delivery</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">✓ Eco-Friendly</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 right-0 w-24 h-24 bg-yellow-300 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-4 left-0 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
