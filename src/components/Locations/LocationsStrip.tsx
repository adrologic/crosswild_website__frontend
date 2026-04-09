"use client";

import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { LOCATIONS } from "@/data/locations";

// Group locations by city
const CITIES: { name: string; color: string; border: string; bg: string }[] = [
  { name: "Jodhpur", color: "text-blue-600 dark:text-blue-400",    border: "border-blue-200 dark:border-blue-800",    bg: "bg-blue-500" },
  { name: "Indore",  color: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", bg: "bg-emerald-500" },
  { name: "Udaipur", color: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800", bg: "bg-purple-500" },
  { name: "Kota",    color: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800", bg: "bg-orange-500" },
  { name: "Sikar",   color: "text-teal-600 dark:text-teal-400",     border: "border-teal-200 dark:border-teal-800",    bg: "bg-teal-500" },
];

export default function LocationsStrip() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-theme-border py-16">
      <div className="w-full px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 dark:from-amber-900/30 dark:to-purple-900/30 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold mb-4">
            <MapPin className="w-4 h-4" />
            Serving Across India
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Available Products by Location
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            T-Shirts, Bags, Caps and Uniforms — manufactured and delivered across Jodhpur, Indore, Udaipur, Kota &amp; Sikar.
          </p>
        </div>

        {/* City cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
          {CITIES.map((city) => {
            const pages = LOCATIONS.filter((l) => l.city === city.name);
            return (
              <div
                key={city.name}
                className={`bg-white dark:bg-gray-800 rounded-2xl border-2 ${city.border} shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden`}
              >
                {/* City header */}
                <div className={`${city.bg} px-5 py-4`}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white" />
                    <h3 className="text-white font-bold text-lg">{city.name}</h3>
                  </div>
                </div>

                {/* Product links */}
                <div className="p-4 space-y-2">
                  {pages.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}`}
                      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group`}
                    >
                      <span className={`text-sm font-medium ${city.color}`}>
                        {loc.categoryLabel}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${city.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-10 text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Multiple Locations, One Quality Standard
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              Same premium quality, faster delivery, personalised service at every location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20place%20a%20bulk%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
