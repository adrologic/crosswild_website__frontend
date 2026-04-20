"use client";

import React from 'react';
import { Truck, Shield, Headphones, Award, Clock, ThumbsUp } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = { Truck, Shield, Headphones, Award, Clock, ThumbsUp };
const COLORS = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-red-100 text-red-600', 'bg-teal-100 text-teal-600'];

const DEFAULT_FEATURES = [
  { icon: 'Truck', title: 'Fast Delivery', description: 'Quick turnaround time with pan-India shipping' },
  { icon: 'Shield', title: '100% Quality Guarantee', description: 'Premium materials and strict quality checks' },
  { icon: 'Headphones', title: '24/7 Support', description: 'Always here to help with your orders' },
  { icon: 'Award', title: 'Best Prices', description: 'Competitive pricing with bulk discounts' },
  { icon: 'Clock', title: 'Quick Turnaround', description: 'Get your products in 3-5 business days' },
  { icon: 'ThumbsUp', title: 'Easy Ordering', description: 'Simple design tools and hassle-free process' },
];

interface Feature { icon?: string; title: string; description: string }
interface Props {
  content?: {
    heading?: string;
    subheading?: string;
    features?: Feature[];
  };
}

export default function TrustSection({ content }: Props) {
  const heading = content?.heading || 'Why Choose The CrossWild?';
  const subheading = content?.subheading || "We're committed to delivering excellence in every order";
  const features: Feature[] = content?.features?.length ? content.features : DEFAULT_FEATURES;

  return (
    <section className="py-16 bg-theme-bg-soft">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{heading}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subheading}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = ICON_MAP[feature.icon || 'ThumbsUp'] || ThumbsUp;
            return (
              <div key={idx} className="group bg-theme-bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-theme-border">
                <div className="flex items-start gap-4">
                  <div className={`${COLORS[idx % COLORS.length]} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div><div className="text-4xl md:text-5xl font-black mb-2">5000+</div><div className="text-white/80">Happy Customers</div></div>
            <div><div className="text-4xl md:text-5xl font-black mb-2">50K+</div><div className="text-white/80">Orders Delivered</div></div>
            <div><div className="text-4xl md:text-5xl font-black mb-2">99%</div><div className="text-white/80">Satisfaction Rate</div></div>
            <div><div className="text-4xl md:text-5xl font-black mb-2">24hrs</div><div className="text-white/80">Support Available</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
