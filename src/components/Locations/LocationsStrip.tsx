"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Clock, ArrowRight, Building2, ExternalLink } from "lucide-react";
import { LOCATIONS, OFFICE_CITIES, FOOTER_LOCATION_ITEMS } from "@/data/locations";

// Colors per city slug
const CITY_COLORS: Record<string, {
  iconBg: string; iconText: string; bar: string;
  textColor: string; border: string;
  tagBg: string; tagText: string;
}> = {
  jaipur:  { iconBg: "bg-amber-500",  iconText: "text-amber-500",  bar: "bg-amber-500",  textColor: "text-amber-600 dark:text-amber-400",  border: "border-amber-200 dark:border-amber-800",  tagBg: "bg-amber-50 dark:bg-amber-950/30",  tagText: "text-amber-700 dark:text-amber-300" },
  jodhpur: { iconBg: "bg-blue-500",   iconText: "text-blue-500",   bar: "bg-blue-500",   textColor: "text-blue-600 dark:text-blue-400",   border: "border-blue-200 dark:border-blue-800",   tagBg: "bg-blue-50 dark:bg-blue-950/30",   tagText: "text-blue-700 dark:text-blue-300" },
  indore:  { iconBg: "bg-emerald-500",iconText: "text-emerald-500",bar: "bg-emerald-500",textColor: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-200 dark:border-emerald-800",tagBg: "bg-emerald-50 dark:bg-emerald-950/30",tagText: "text-emerald-700 dark:text-emerald-300" },
  udaipur: { iconBg: "bg-purple-500", iconText: "text-purple-500", bar: "bg-purple-500", textColor: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800", tagBg: "bg-purple-50 dark:bg-purple-950/30", tagText: "text-purple-700 dark:text-purple-300" },
  ajmer:   { iconBg: "bg-rose-500",   iconText: "text-rose-500",   bar: "bg-rose-500",   textColor: "text-rose-600 dark:text-rose-400",   border: "border-rose-200 dark:border-rose-800",   tagBg: "bg-rose-50 dark:bg-rose-950/30",   tagText: "text-rose-700 dark:text-rose-300" },
  kota:    { iconBg: "bg-orange-500", iconText: "text-orange-500", bar: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800", tagBg: "bg-orange-50 dark:bg-orange-950/30", tagText: "text-orange-700 dark:text-orange-300" },
  sikar:   { iconBg: "bg-teal-500",   iconText: "text-teal-500",   bar: "bg-teal-500",   textColor: "text-teal-600 dark:text-teal-400",   border: "border-teal-200 dark:border-teal-800",   tagBg: "bg-teal-50 dark:bg-teal-950/30",   tagText: "text-teal-700 dark:text-teal-300" },
};

const officeCities = LOCATIONS.filter((l) => OFFICE_CITIES.includes(l.slug));
const serviceCities = LOCATIONS.filter((l) => !OFFICE_CITIES.includes(l.slug));

export default function LocationsStrip() {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-theme-border py-16">
      <div className="w-full px-6 lg:px-12">

        {/* ── HEADER ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 dark:from-amber-900/30 dark:to-purple-900/30 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            Serving Across India
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            We're Closer Than You Think
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            With offices in Jaipur, Jodhpur, Indore, Udaipur &amp; Ajmer — and services across Kota &amp; Sikar — same premium quality, faster delivery, personalized service.
          </p>
        </div>

        {/* ── OFFICE CITY CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-14">
          {officeCities.map((loc) => {
            const c = CITY_COLORS[loc.slug] ?? CITY_COLORS.jaipur;
            return (
              <div
                key={loc.slug}
                onClick={() => router.push(`/locations/${loc.slug}`)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Top color bar */}
                <div className={`h-1.5 w-full ${c.bar}`} />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Icon + HQ badge */}
                  <div className="flex items-center justify-between">
                    <div className={`${c.iconBg} w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    {loc.isHeadquarters && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        HQ
                      </span>
                    )}
                  </div>

                  {/* City & State */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{loc.name}</h3>
                    <p className={`text-sm font-medium ${c.textColor}`}>{loc.state}</p>
                  </div>

                  {/* Products */}
                  <div className="flex flex-wrap gap-1">
                    {loc.products.slice(0, 3).map((p) => (
                      <span key={p.slug} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {p.icon} {p.name.split(" ")[0]}
                      </span>
                    ))}
                    {loc.products.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500">
                        +{loc.products.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Phone — plain text to avoid nested <a> */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    {loc.contact.phone[0]}
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{loc.contact.hours.replace("Monday – Saturday, ", "Mon–Sat ")}</span>
                  </div>
                </div>

                {/* Bottom hover bar */}
                <div className={`h-1 w-full ${c.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            );
          })}
        </div>

        {/* ── SERVICE CITIES (Kota & Sikar) ── */}
        {serviceCities.length > 0 && (
          <div className="mb-14">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5 text-center">
              Also Serving
            </p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto`}>
              {serviceCities.map((loc) => {
                const c = CITY_COLORS[loc.slug] ?? CITY_COLORS.kota;
                return (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className={`group flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border-2 ${c.border} hover:shadow-lg transition-all duration-200`}
                  >
                    <div className={`${c.iconBg} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{loc.name}</h3>
                        <ArrowRight className={`w-4 h-4 ${c.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <p className={`text-xs font-medium ${c.textColor} mb-2`}>{loc.state}</p>
                      <div className="flex flex-wrap gap-1">
                        {loc.products.map((p) => (
                          <span key={p.slug} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {p.icon} {p.name.replace(" Manufacturing", "")}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── GRADIENT BANNER ── */}
        <div className="relative bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-10 text-white text-center overflow-hidden mb-14">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              📍 Multiple Locations, One Quality Standard
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              With offices in Jaipur, Indore, Jodhpur, Udaipur, and Ajmer — we're always nearby to serve you better.
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

        {/* ── AVAILABLE PRODUCTS BY LOCATION ── */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5 text-center">
            Available Products by Location
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {FOOTER_LOCATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={`/locations/${item.citySlug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-theme-border rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary transition-colors shadow-sm"
              >
                <MapPin className="w-3 h-3" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
