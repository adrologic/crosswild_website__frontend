"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
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
              <a href="tel:+919529626262" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>+91-9529626262</span>
              </a>
              <a href="mailto:orders@thecrosswild.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>orders@thecrosswild.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/product/customize-promotional-t-shirt-manufacturer-in-Jaipur" className="hover:text-primary transition-colors">T-Shirt Manufacturing</Link></li>
              <li><Link href="/product/sweatshirt-hoodie-manufacturer-in-Jaipur" className="hover:text-primary transition-colors">Sweatshirt Manufacturing</Link></li>
              <li><Link href="/product/school-laptop-bag-manufacturer-in-Jaipur" className="hover:text-primary transition-colors">Bag Manufacturer</Link></li>
              <li><Link href="/product/cap-printing-manufacturer-in-jaipur" className="hover:text-primary transition-colors">Cap Manufacturer</Link></li>
              <li><Link href="/product/mug-printing-in-Jaipur" className="hover:text-primary transition-colors">Mug Printing</Link></li>
              <li><Link href="/product/digital-printing-in-jaipur" className="hover:text-primary transition-colors">Digital Printing</Link></li>
              <li><Link href="/product/face-masks-ppe-kits" className="hover:text-primary transition-colors">Face Masks &amp; PPE Kits</Link></li>
              <li><Link href="/product/sanitizer-infrared-thermometer" className="hover:text-primary transition-colors">Sanitizer &amp; Infrared Thermometer</Link></li>
              <li><Link href="/product/school-uniform" className="hover:text-primary transition-colors">School Uniform</Link></li>
              <li><Link href="/product/staff-uniform" className="hover:text-primary transition-colors">Staff Uniform</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/our_process" className="hover:text-primary transition-colors">Our Process</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/image-gallery" className="hover:text-primary transition-colors">Our Gallery</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/why-choose-us" className="hover:text-primary transition-colors">Why Choose Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/desclaimer" className="hover:text-primary transition-colors">Desclaimer</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <a href="mailto:orders@thecrosswild.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>orders@thecrosswild.com</span>
              </a>
              <div>
                <p className="text-white font-semibold text-xs uppercase tracking-wide mb-1">Jaipur</p>
                <a href="tel:+919571815050" className="flex items-center gap-2 hover:text-primary transition-colors mb-1">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91-9571815050</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-xs uppercase tracking-wide mb-1">Jodhpur</p>
                <a href="tel:+919571286262" className="flex items-center gap-2 hover:text-primary transition-colors mb-1">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91-9571286262</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>B-13, Shastri Nagar, Near Shastri Circle, Jodhpur</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-xs uppercase tracking-wide mb-1">Indore</p>
                <a href="tel:+919649715050" className="flex items-center gap-2 hover:text-primary transition-colors mb-1">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91-9649715050</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>401, 4th Floor, Near Sky Corporate Tower, Scheme No 78, AB Road, Vijay Nagar, Indore, MP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-[#2A2018]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Follow Us:</span>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/thecrosswild/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/thecrosswild" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.instagram.com/thecrosswildcompany/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://www.youtube.com/channel/UCiMxyFkSTrGDq_v9mRYwEZw" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://in.pinterest.com/thecrosswildcompany/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-label="Pinterest">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
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
