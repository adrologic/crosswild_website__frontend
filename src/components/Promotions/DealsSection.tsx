"use client";

import React from 'react';
import Link from 'next/link';
import { Tag, Clock, TrendingUp, Zap } from 'lucide-react';

const deals = [
  {
    title: 'Bulk Order Special',
    discount: '20% OFF',
    description: 'Orders above 100 pieces',
    icon: TrendingUp,
    color: 'from-blue-500 to-blue-600',
    link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur',
  },
  {
    title: 'Flash Sale',
    discount: '15% OFF',
    description: 'Limited time offer',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    link: '/product/mug-printing-in-Jaipur',
    badge: 'Ending Soon',
  },
  {
    title: 'First Order',
    discount: '10% OFF',
    description: 'New customers only',
    icon: Tag,
    color: 'from-green-500 to-green-600',
    link: '/products',
  },
];

export default function DealsSection() {
  return (
    <section className="py-12 bg-theme-bg overflow-hidden">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold mb-4">
            <Clock className="w-4 h-4" />
            Limited Time Offers
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Special Deals & Discounts
          </h2>
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((deal, idx) => (
            <Link
              key={idx}
              href={deal.link}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-transparent"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${deal.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                {/* Badge */}
                {deal.badge && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    {deal.badge}
                  </div>
                )}

                {/* Icon */}
                <deal.icon className="w-12 h-12 mb-4 opacity-80" />

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>

                {/* Discount */}
                <div className="text-4xl font-black mb-2">{deal.discount}</div>

                {/* Description */}
                <p className="text-white/90 mb-6">{deal.description}</p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors">
                  <span className="font-semibold">Claim Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Choosing? Talk to Our Experts!
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Get free consultation and design assistance from our team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Us Now
            </a>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Request Callback
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
