"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'T-Shirts',
    description: 'Custom printed & embroidered tees',
    image: '👕',
    link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur',
    color: 'from-orange-400 to-orange-600',
    popular: true,
  },
  {
    title: 'Bags',
    description: 'School, office, gym & more',
    image: '🎒',
    link: '/product/school-laptop-bag-manufacturer-in-Jaipur',
    color: 'from-green-400 to-green-600',
    popular: true,
  },
  {
    title: 'Caps',
    description: 'Cotton, polyester & custom caps',
    image: '🧢',
    link: '/product/cap-printing-manufacturer-in-jaipur',
    color: 'from-red-400 to-red-600',
  },
  {
    title: 'Sweatshirts & Hoodies',
    description: 'Warm up in custom style',
    image: '🧥',
    link: '/product/sweatshirt-hoodie-manufacturer-in-Jaipur',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    title: 'Lower & Shorts',
    description: 'Comfortable active wear',
    image: '🩳',
    link: '/products?category=lowers',
    color: 'from-blue-400 to-blue-600',
  },
  {
    title: 'School & Office Uniform',
    description: 'Professional workwear solutions',
    image: '👔',
    link: '/product/school-uniform',
    color: 'from-teal-400 to-teal-600',
  },
  {
    title: 'Printing & Embroidery',
    description: 'Screen, digital & sublimation',
    image: '🖨️',
    link: '/product/printing',
    color: 'from-purple-400 to-purple-600',
  },
  {
    title: 'Apron & Chef Coat',
    description: 'Kitchen & hospitality wear',
    image: '🧑‍🍳',
    link: '/products?category=apron',
    color: 'from-pink-400 to-pink-600',
  },
];

export default function CrosswildCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What would you like to create?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of customizable products to bring your brand to life
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <Link
              key={idx}
              href={category.link}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/50 overflow-hidden"
            >
              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}

              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.image}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary text-sm font-semibold">
                  <span className="group-hover:mr-2 transition-all">Shop Now</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary hover:text-primary hover:shadow-lg transition-all"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
