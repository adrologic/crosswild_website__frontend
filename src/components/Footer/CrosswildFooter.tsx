"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function CrosswildFooter() {
  return (
    <footer className="bg-[#111111] dark:bg-[#0E0B08] text-gray-300 dark:text-[#C8B99A]">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
        <div className="w-full px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Get Exclusive Deals & Updates</h3>
              <p className="text-white/80">Subscribe to our newsletter for special offers and tips</p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-6 py-3 bg-[#111111] dark:bg-[#26211A] text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-[#38302A] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo/logo-crosswile.jpg"
              alt="The CrossWild"
              width={150}
              height={40}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 dark:text-[#8C7F6E] mb-6 leading-relaxed">
              India's leading custom printing and merchandise company. We bring your brand to life with premium quality products and exceptional service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@thecrosswild.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@thecrosswild.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>123 Business Park, Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/products?category=cards" className="hover:text-primary transition-colors">Business Cards</Link></li>
              <li><Link href="/products?category=tshirts" className="hover:text-primary transition-colors">T-Shirts</Link></li>
              <li><Link href="/products?category=sweatshirts" className="hover:text-primary transition-colors">Sweatshirts</Link></li>
              <li><Link href="/products?category=bags" className="hover:text-primary transition-colors">Bags & Totes</Link></li>
              <li><Link href="/products?category=caps" className="hover:text-primary transition-colors">Caps & Hats</Link></li>
              <li><Link href="/products?category=mugs" className="hover:text-primary transition-colors">Mugs</Link></li>
              <li><Link href="/products?category=uniforms" className="hover:text-primary transition-colors">Uniforms</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors font-semibold">View All</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/our_process" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/image-gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Order Tracking</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-[#2A2018]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Follow Us:</span>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex gap-2">
                {['💳', '💰', '📱'].map((icon, idx) => (
                  <div key={idx} className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded flex items-center justify-center text-xl">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-[#2A2018]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-[#8C7F6E]">
            <p>&copy; 2024 The CrossWild. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
