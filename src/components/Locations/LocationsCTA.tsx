"use client";

import Link from "next/link";
import { MapPin, ArrowRight, Phone } from "lucide-react";

// The gradient CTA that used to close LocationsStrip. The city-card grid above
// it was removed; this banner was kept, because it closes the page and is the
// only remaining instance of it — DealsSection dropped its copy of the same
// banner on the assumption this one survived.
export default function LocationsCTA() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-theme-border py-16">
      <div className="w-full px-6 lg:px-12">
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
                href="/contact-us"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
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
