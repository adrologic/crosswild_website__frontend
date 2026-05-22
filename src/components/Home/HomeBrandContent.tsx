"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import {
  getHomeCapabilities,
  getHomeWhyChoose,
  getHomeProductHighlights,
  type HomeCapability,
  type HomeWhyChoose,
  type HomeProductHighlight,
} from '@/lib/cms';

// Fallbacks so the section never blanks out during the first paint or backend outage.
const FALLBACK_CAPABILITIES: HomeCapability[] = [
  { _id: 'c1', title: 'T-Shirts', items: ['Custom Corporate Tees', 'Budget-Friendly Printing', 'Event-Specific Designs'], link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur', image: '' },
  { _id: 'c2', title: 'Bags', items: ['Custom Gym Bags', 'Wholesale Tote Suppliers', 'Laptop Bags (India)'], link: '/product/school-laptop-bag-manufacturer-in-Jaipur', image: '' },
  { _id: 'c3', title: 'Caps', items: ['Branded & Embroidered Caps', 'Baseball & Trucker Styles', 'Eco-Friendly Options'], link: '/product/cap-printing-manufacturer-in-jaipur', image: '' },
];

const FALLBACK_WHY_CHOOSE: HomeWhyChoose[] = [
  { _id: 'w1', number: '01', title: 'Unmatched Customization', description: 'We offer custom artwork with every order, ensuring your products are unique and perfectly matched with your exact needs.' },
  { _id: 'w2', number: '02', title: 'Affordable Bulk Manufacturing', description: 'Ordering large quantities can be expensive. We make it affordable without sacrificing quality.' },
  { _id: 'w3', number: '03', title: 'Fast Turnaround Times', description: 'We put our customers first by making sure that your orders are packed and sent as soon as possible.' },
];

const FALLBACK_HIGHLIGHTS: HomeProductHighlight[] = [
  { _id: 'h1', title: 'Mug Printing', image: '/images/products/Mugs/Promotional-Mug.jpg', link: '/contact-us' },
  { _id: 'h2', title: 'Cap Printing', image: '/images/products/Caps/Sports-Cap.jpg', link: '/contact-us' },
  { _id: 'h3', title: 'Digital Printing', image: '/images/products/Digital-Printing/Digital-Printing.jpg', link: '/contact-us' },
];

const CAPABILITY_COLORS = [
  { bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', title: 'text-blue-700 dark:text-blue-400' },
  { bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', title: 'text-orange-700 dark:text-orange-400' },
  { bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', title: 'text-green-700 dark:text-green-400' },
];

const WHY_CHOOSE_COLORS = [
  'from-blue-500 to-blue-600',
  'from-primary to-orange-500',
  'from-green-500 to-green-600',
];

const HIGHLIGHT_GRADIENTS = [
  'from-red-900/70 to-red-700/50',
  'from-gray-900/70 to-gray-700/50',
  'from-teal-900/70 to-teal-700/50',
];

// Editable text blocks come from PageContent — admin → Page Content → Home →
// "Customize & Promote Section" (key `home/why-choose`).
interface BrandTextContent {
  introBadge?: string;
  introHeading?: string;
  introParagraph?: string;
  capabilitiesHeading?: string;
  customizeHeading?: string;
  customizeParagraph?: string;
  whyChooseHeading?: string;
  bestResultsHeading?: string;
  bestResultsParagraph?: string;
  // Legacy field names also supported (heading + description from `home/why-choose`)
  heading?: string;
  description?: string;
}

interface Props { content?: BrandTextContent }

export default function HomeBrandContent({ content }: Props = {}) {
  const [capabilities, setCapabilities] = useState<HomeCapability[]>(FALLBACK_CAPABILITIES);
  const [whyChoose, setWhyChoose] = useState<HomeWhyChoose[]>(FALLBACK_WHY_CHOOSE);
  const [highlights, setHighlights] = useState<HomeProductHighlight[]>(FALLBACK_HIGHLIGHTS);

  useEffect(() => {
    getHomeCapabilities().then((d) => { if (d.length) setCapabilities(d); });
    getHomeWhyChoose().then((d) => { if (d.length) setWhyChoose(d); });
    getHomeProductHighlights().then((d) => { if (d.length) setHighlights(d); });
  }, []);

  // Text resolved from CMS with sensible defaults so the section never blanks.
  const introBadge = content?.introBadge || 'Drive Brand Success with Cross Wild Manufacturing';
  const introHeading = content?.introHeading || 'Custom T-Shirts, Bags, and Caps Manufacturer in Jaipur, India';
  const introParagraph = content?.introParagraph || 'Founded in 2016, The Cross Wild has grown into one of the most trusted names in custom product printing and manufacturing in India. Based in Jaipur, we are proud to be a leading t-shirt manufacturer, bag manufacturer, and custom cap manufacturer with a rapidly expanding presence across India and internationally. Our goal is to be the ultimate one-stop shop for all customized product manufacturing and printing needs, offering unmatched quality and service.';
  const capabilitiesHeading = content?.capabilitiesHeading || 'Explore Our Capabilities';
  // `customizeHeading` / `customizeParagraph` map onto the legacy `heading` / `description`
  // fields that the existing admin "Customize & Promote Section" already uses.
  const customizeHeading = content?.customizeHeading || content?.heading || 'Customize & Promote with The Cross Wild';
  const customizeParagraph = content?.customizeParagraph || content?.description || 'At The Cross Wild, we cover a wide spectrum of industries and events with products that fulfill functionality yet are stylish. Whether you are a business needing branded corporate T-shirts, a company looking for wholesale tote bags or an event organizer sourcing custom bags and personalized hats — The Cross Wild is sure to cater for all your needs. Over the years, our dedication to customer satisfaction has driven us to expand our portfolio. In addition to t-shirt printing and bag manufacturing, we now specialize in custom caps, mug printing, sweater manufacturing, and more. Leveraging state-of-the-art technologies, we deliver high-quality personalized and promotional products at competitive prices. Our designs are tailored to meet the corporate or individual needs of clients with attention to detail as well as affordability.';
  const whyChooseHeading = content?.whyChooseHeading || 'Why Choose The CrossWild';
  const bestResultsHeading = content?.bestResultsHeading || 'Get the Best Result for Your Corporate & Promotional Needs';
  const bestResultsParagraph = content?.bestResultsParagraph || "Unbeatable quality is what you will enjoy with The Cross Wild. Whether you want event t-shirts with your company's logo and message printed on them or eco-friendly caps and stylish custom backpacks that will make everyone smile in admiration, we have something for almost any need and at reasonable prices.";

  return (
    <>
      {/* ── Intro + Capabilities ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              {introBadge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {introHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {introParagraph}
            </p>
          </div>

          {/* Explore Our Capabilities */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              {capabilitiesHeading}
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {capabilities.map((cat, idx) => {
                const c = CAPABILITY_COLORS[idx % CAPABILITY_COLORS.length];
                return (
                  <Link
                    key={cat._id}
                    href={cat.link || '#'}
                    className={`group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${c.bg}`}
                  >
                    <h4 className={`text-lg font-bold mb-4 ${c.title}`}>{cat.title}</h4>
                    <ul className="space-y-2">
                      {(cat.items || []).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-current opacity-70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customize & Promote ──────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {customizeHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {customizeParagraph}
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {whyChooseHeading}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChoose.map((item, idx) => {
              const color = WHY_CHOOSE_COLORS[idx % WHY_CHOOSE_COLORS.length];
              return (
                <div key={item._id} className="relative bg-theme-bg-card rounded-2xl p-8 shadow-sm border border-theme-border hover:shadow-lg transition-all duration-300">
                  <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${color} items-center justify-center text-white font-black text-lg mb-5`}>
                    {item.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Get the Best Result + Product Images ────────── */}
      <section className="py-16 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {bestResultsHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {bestResultsParagraph}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, idx) => {
              const gradient = HIGHLIGHT_GRADIENTS[idx % HIGHLIGHT_GRADIENTS.length];
              return (
                <Link
                  key={item._id}
                  href={item.link || '#'}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-black tracking-widest uppercase drop-shadow-lg">
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
