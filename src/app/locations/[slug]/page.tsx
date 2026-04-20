import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamicImport from "next/dynamic";
import { ArrowRight, MapPin, CheckCircle, Phone, Mail, Clock, ExternalLink, Printer, Layers } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import ScrollUp from "@/components/Common/ScrollUp";
import TrustSection from "@/components/Features/TrustSection";
import LocationImageSlider from "@/components/Locations/LocationImageSlider";


const PopularProducts = dynamicImport(() => import("@/components/Products/PopularProducts"));
const TrendingProducts = dynamicImport(() => import("@/components/Products/TrendingProducts"));
const DealsSection = dynamicImport(() => import("@/components/Promotions/DealsSection"));
const Process = dynamicImport(() => import("@/components/Process/Process"));
const Testimonials = dynamicImport(() => import("@/components/Testimonials"));
const Brands = dynamicImport(() => import("@/components/Brands"));
const Contact = dynamicImport(() => import("@/components/Contact"));

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

// Product image sliders per slug
const STATIC_SLIDER_IMAGES: Record<string, string[]> = {
  'tshirt-manufacturer-wholesaler-in-udaipur': [
    '/images/fileBanners/thirtSlider/4.jpg',
    '/images/fileBanners/thirtSlider/6.jpg',
    '/images/fileBanners/thirtSlider/IMG_8501.jpg',
    '/images/fileBanners/thirtSlider/IMG_8508.jpg',
  ],
  'tshirt-manufacturer-wholesaler-in-sikar': [
    '/images/fileBanners/thirtSlider/4.jpg',
    '/images/fileBanners/thirtSlider/6.jpg',
    '/images/fileBanners/thirtSlider/IMG_8501.jpg',
    '/images/fileBanners/thirtSlider/IMG_8508.jpg',
  ],
  'tshirt-manufacturer-wholesaler-in-kota': [
    '/images/fileBanners/thirtSlider/4.jpg',
    '/images/fileBanners/thirtSlider/6.jpg',
    '/images/fileBanners/thirtSlider/IMG_8501.jpg',
    '/images/fileBanners/thirtSlider/IMG_8508.jpg',
  ],
};

// Static CTA banner images per slug — used as fallback if pageImages not in DB
const STATIC_PAGE_IMAGES: Record<string, string[]> = {
  'tshirt-manufacturer-in-indore': [
    '/images/fileBanners/indore/tshirt/indor-CTA-1.webp',
    '/images/fileBanners/indore/tshirt/indor-CTA-2.webp',
  ],
  'bag-manufacturer-in-indore': [
    '/images/fileBanners/indore/bags/Laptop-CTA-banner.webp',
    '/images/fileBanners/indore/bags/bags-banner-CTA.webp',
  ],
  'uniform-manufacturer-in-indore': [
    '/images/fileBanners/indore/uniform/School-uniform-CTA-banner.webp',
    '/images/fileBanners/indore/uniform/office-uniform-cta-banner.webp',
  ],
};

const DEFAULT_PRINTING_METHODS = [
  "Screen Printing",
  "Digital Printing / DTG",
  "Embroidery",
  "Heat Transfer / Vinyl",
  "Sublimation Printing",
  "Offset Printing",
];

const DEFAULT_FABRICS = [
  "100% Cotton",
  "Polyester",
  "Cotton-Poly Blend",
  "Dry-Fit / Performance",
  "Fleece",
  "Premium Pique Cotton",
];

// Fetch from API, fall back to static data
async function getLocation(slug: string) {
  try {
    const res = await fetch(`${API_URL}/locations/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.location) return data.location;
    }
  } catch {}
  // Fallback to static data
  return LOCATIONS.find((l) => l.slug === slug) ?? null;
}

async function getAllLocationSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/locations?active=true`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.locations?.length) return data.locations.map((l: any) => l.slug);
    }
  } catch {}
  return LOCATIONS.map((l) => l.slug);
}

async function getAllLocations() {
  try {
    const res = await fetch(`${API_URL}/locations?active=true`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.locations?.length) return data.locations;
    }
  } catch {}
  return LOCATIONS;
}

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) return {};

  // SEO landing pages use metaTitle / metaDescription fields
  const title = location.metaTitle || location.seo?.title || `${location.heroHeading || location.name || location.h1} | The CrossWild`;
  const description = location.metaDescription || location.seo?.description || location.description || location.introContent?.replace(/<[^>]*>/g, '').slice(0, 160);
  const keywords = location.seo?.keywords?.length
    ? location.seo.keywords
    : (location.products ?? []).map((p: any) => `${p.name} in ${location.name || location.city}`);

  return {
    title,
    description,
    keywords,
    ...(location.seo?.noIndex || location.seo?.noFollow ? {
      robots: { index: !location.seo?.noIndex, follow: !location.seo?.noFollow },
    } : {}),
    ...(location.seo?.canonicalUrl ? { alternates: { canonical: location.seo.canonicalUrl } } : {}),
    openGraph: {
      title,
      description,
      images: [{ url: location.seo?.ogImage || location.image || "/images/logo/logo-crosswile.jpg", width: 1200, height: 630 }],
    },
  };
}

export const revalidate = 60;

// ── Helper: display label for any location type ──────────────────────────────
function locationLabel(l: any): string {
  if (l.name && l.state) return `${l.name}, ${l.state}`;
  if (l.name) return l.name;
  if (l.city) return l.city;
  return l.h1 || l.slug;
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) notFound();

  const allLocations = await getAllLocations();
  const otherLocations = allLocations.filter((l: any) => l.slug !== slug);

  // ── SEO LANDING PAGE TEMPLATE ────────────────────────────────────────────
  if (location.h1) {
    const printingMethods = location.printingMethods?.length ? location.printingMethods : DEFAULT_PRINTING_METHODS;
    const fabrics = location.fabrics?.length ? location.fabrics : DEFAULT_FABRICS;
    const pageImages: string[] = location.pageImages?.length ? location.pageImages : (STATIC_PAGE_IMAGES[slug] ?? []);
    const sliderImages: string[] = location.sliderImages?.length ? location.sliderImages : (STATIC_SLIDER_IMAGES[slug] ?? []);

    return (
      <>
        <ScrollUp />

        {/* ── HERO ── */}
        <section className="relative w-full overflow-hidden">
          {location.image ? (
            <div className="relative h-[380px] md:h-[480px] w-full">
              <Image
                src={location.image}
                alt={location.h1}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-12">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                    <MapPin className="w-4 h-4" />
                    {location.city || location.name || "India"}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    {location.h1}
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all shadow-lg"
                    >
                      Explore Products <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 border border-white/30 transition-all"
                    >
                      Get a Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-primary to-secondary py-20 px-6 lg:px-12">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4">
                  <MapPin className="w-4 h-4" />
                  {location.city || location.name || "India"}
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  {location.h1}
                </h1>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
                  >
                    Explore Products <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 border border-white/30 transition-all"
                  >
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── CONTENT + SIDEBAR (2-column) ── */}
        {(location.introContent || location.mainContent) && (
          <section className="bg-theme-bg py-14">
            <div className="w-full px-6 lg:px-12">
              <div className="grid lg:grid-cols-12 gap-10 items-start">

                {/* LEFT — article content */}
                <div className="lg:col-span-7">
                  {location.introContent && (
                    <div
                      className="rich-text-lg text-base text-gray-700 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: location.introContent }}
                    />
                  )}

                  {/* Product image slider — mid content */}
                  {sliderImages.length > 0 && (
                    <LocationImageSlider images={sliderImages} alt={location.h1} />
                  )}

                  {/* CTA banner images — mid content */}
                  {pageImages.length > 0 && (
                    <div className="my-8 space-y-4">
                      {pageImages.map((src: string, i: number) => (
                        <div key={i} className="w-full rounded-xl overflow-hidden shadow-sm">
                          <Image
                            src={src}
                            alt={`${location.h1} — banner ${i + 1}`}
                            width={800}
                            height={300}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {location.mainContent && (
                    <div
                      className="rich-text-lg text-base text-gray-700 dark:text-gray-300 mt-8"
                      dangerouslySetInnerHTML={{ __html: location.mainContent }}
                    />
                  )}
                </div>

                {/* RIGHT — Quote form + Google Map */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

                  {/* Get A Free Quote */}
                  <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-theme-border shadow-md overflow-hidden">
                    <div className="bg-primary px-6 py-4">
                      <h3 className="text-lg font-bold text-white">Get A Free Quote</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Call:{" "}
                        <a
                          href={`tel:${(location.branchPhone || "+919571286262").replace(/[^+\d]/g, "")}`}
                          className="text-primary font-semibold hover:underline"
                        >
                          {location.branchPhone || "+91-9571286262"}
                        </a>{" "}
                        or fill in the form below and we'll contact you:
                      </p>
                      <form
                        action={`mailto:orders@thecrosswild.com?subject=Enquiry from ${location.city || "Website"}`}
                        method="get"
                        className="space-y-3"
                      >
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter Your Name"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter Your Email"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter Your Phone No."
                          maxLength={10}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <textarea
                          name="message"
                          placeholder="Enter Your Enquiry"
                          rows={3}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors tracking-wide"
                        >
                          SUBMIT
                        </button>
                      </form>

                      {/* Quick contact row */}
                      <div className="flex gap-2 mt-4">
                        <a
                          href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20place%20a%20bulk%20order."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          WhatsApp
                        </a>
                        <a
                          href={`mailto:orders@thecrosswild.com?subject=Enquiry - ${location.city || location.h1}`}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Email Us
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps embed */}
                  {location.mapEmbed && (
                    <div className="rounded-2xl overflow-hidden border border-theme-border shadow-md">
                      <iframe
                        src={location.mapEmbed}
                        width="100%"
                        height="320"
                        style={{ border: 0, display: "block" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`The CrossWild ${location.city || ""} location map`}
                      />
                    </div>
                  )}

                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── PRINTING METHODS ── */}
        {location.showPrintingMethods && (
          <section className="bg-theme-bg py-16">
            <div className="w-full px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Printer className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Printing Methods</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {printingMethods.map((method: string, i: number) => (
                      <div key={method} className="flex items-center gap-3 p-3 bg-theme-bg-soft dark:bg-[#1E1E1E] rounded-lg border border-theme-border">
                        <span className="w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── FABRICS ── */}
                {location.showFabrics && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <Layers className="w-5 h-5 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fabric Options</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {fabrics.map((fabric: string) => (
                        <div key={fabric} className="flex items-center gap-3 p-3 bg-theme-bg-soft dark:bg-[#1E1E1E] rounded-lg border border-theme-border">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{fabric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── SIZE CHART ── */}
        {location.showSizeChart && (
          <section className="bg-theme-bg-soft py-12">
            <div className="w-full px-6 lg:px-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Size Chart</h2>
              <div className="overflow-x-auto rounded-lg border border-theme-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary/10 text-primary">
                      {['S', 'M', 'L', 'XL', 'XXL', '3XL'].map((s) => (
                        <th key={s} className="py-3 px-4 font-bold text-center">{s}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-600 dark:text-gray-300">
                      {['36–38"', '38–40"', '40–42"', '42–44"', '44–46"', '46–48"'].map((m) => (
                        <td key={m} className="py-3 px-4 text-center text-xs border-t border-theme-border">{m}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── CONTACT CARD ── */}
        {(location.branchAddress || location.branchPhone) && (
          <section className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20 py-16">
            <div className="w-full px-6 lg:px-12">
              <div className="max-w-3xl mx-auto bg-theme-bg dark:bg-[#1E1E1E] rounded-2xl border border-theme-border shadow-lg overflow-hidden">
                <div className="bg-primary px-8 py-5">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> Our Branch — {location.city || location.name}
                  </h2>
                </div>
                <div className="p-8 grid sm:grid-cols-2 gap-6">
                  {location.branchAddress && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Address</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{location.branchAddress}</p>
                        {location.mapLink && (
                          <a href={location.mapLink} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2 hover:underline">
                            Get Directions <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {location.branchPhone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                        <a href={`tel:${location.branchPhone.replace(/[^+\d]/g, '')}`}
                          className="block text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium">
                          {location.branchPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {location.branchHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Working Hours</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{location.branchHours}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                  {location.branchPhone && (
                    <a href={`tel:${location.branchPhone.replace(/[^+\d]/g, '')}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                      <Phone className="w-4 h-4" /> Call Now
                    </a>
                  )}
                  <a href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20place%20a%20bulk%20order." target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <Link href="/contact-us"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                    <Mail className="w-4 h-4" /> Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── OTHER LOCATIONS ── */}
        {otherLocations.length > 0 && (
          <section className="bg-theme-bg py-10 border-t border-theme-border">
            <div className="w-full px-6 lg:px-12">
              <p className="text-sm font-semibold text-theme-text-muted uppercase tracking-wider mb-4">
                Also Available In
              </p>
              <div className="flex flex-wrap gap-3">
                {otherLocations.map((l: any) => (
                  <Link
                    key={l.slug}
                    href={`/${l.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-soft border border-theme-border rounded-full text-sm font-medium text-theme-text-secondary hover:text-primary hover:border-primary transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {locationLabel(l)}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── SHARED PAGE SECTIONS ── */}
        <TrustSection />
        <PopularProducts />
        <TrendingProducts />
        <DealsSection />
        <Process />
        <Brands />
        <Testimonials />
        <Contact />
      </>
    );
  }

  // ── CITY PAGE TEMPLATE ──────────────────────────────────────────────────
  return (
    <>
      <ScrollUp />

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-secondary to-secondary-600 text-white py-3">
        <div className="w-full px-6 lg:px-12 text-center">
          <p className="text-sm md:text-base font-semibold">
            ✨ Now Serving {location.name}, {location.state} — Starting at ₹70 | Fast Delivery | Custom Branding ✨
          </p>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="bg-theme-bg w-full px-6 lg:px-12 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              {location.name}, {location.state}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {location.heroHeading || location.name}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {location.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all shadow-lg hover:shadow-xl"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-theme-border text-theme-text font-semibold rounded-lg hover:border-primary hover:text-primary transition-all"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">5000+</div>
                  <div className="text-xs text-gray-500">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-orange-600">₹70</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Starting Price</div>
                  <div className="text-xs text-gray-500">Per Piece</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-11 h-11 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">4.8/5</div>
                  <div className="text-xs text-gray-500">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Product Cards */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-primary/20 to-purple-100 dark:from-primary/10 dark:to-purple-900/20 p-8">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center">
                  Available in {location.name}
                </p>
                <div className="grid gap-4 grid-cols-2">
                  {(location.products ?? []).map((product: any) => (
                    <Link
                      key={product.slug}
                      href={product.link || '/products'}
                      className="bg-white dark:bg-gray-800 p-5 rounded-xl transform hover:scale-105 transition-all duration-200 cursor-pointer shadow hover:shadow-lg text-center"
                    >
                      <div className="text-4xl mb-2">{product.icon}</div>
                      <div className="font-semibold text-gray-800 dark:text-white text-sm leading-tight">
                        {product.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-800 dark:text-white">Fast Delivery</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-lg">
                <span className="text-xs font-semibold text-gray-800 dark:text-white">✓ {location.name}, {location.state}</span>
              </div>
            </div>
            <div className="absolute -top-4 right-0 w-24 h-24 bg-yellow-300 rounded-full blur-2xl opacity-40"></div>
            <div className="absolute -bottom-4 left-0 w-32 h-32 bg-blue-300 rounded-full blur-2xl opacity-40"></div>
          </div>
        </div>
      </section>

      {/* ── SERVICES DETAIL ── */}
      <section className="bg-theme-bg-soft py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Services in <span className="text-primary">{location.name}</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Premium quality manufacturing with custom branding, bulk pricing, and fast delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(location.products ?? []).map((product: any) => (
              <div key={product.slug} className="bg-theme-bg dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-theme-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-3xl">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name} in {location.name}</h3>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide">From ₹70 per piece</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 leading-relaxed">{product.description}</p>

                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Types Available</p>
                    <div className="flex flex-wrap gap-2">
                      {(product.types ?? []).map((type: string) => (
                        <span key={type} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" /> {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={product.link || '/products'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    View Products <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINTING METHODS ── */}
      {location.printingMethods && location.printingMethods.length > 0 && (
        <section className="bg-theme-bg py-16">
          <div className="w-full px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Printing Methods */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Printer className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Printing Methods</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {location.printingMethods.map((method: string, i: number) => (
                    <div key={method} className="flex items-center gap-3 p-3 bg-theme-bg-soft dark:bg-[#1E1E1E] rounded-lg border border-theme-border">
                      <span className="w-7 h-7 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fabric Options */}
              {location.fabrics && location.fabrics.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fabric Options</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {location.fabrics.map((fabric: string) => (
                      <div key={fabric} className="flex items-center gap-3 p-3 bg-theme-bg-soft dark:bg-[#1E1E1E] rounded-lg border border-theme-border">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{fabric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Size Chart */}
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Size Chart</p>
                    <div className="overflow-x-auto rounded-lg border border-theme-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-primary/10 text-primary">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                              <th key={s} className="py-2 px-3 font-bold text-center">{s}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-gray-600 dark:text-gray-300">
                            {['36–38"', '38–40"', '40–42"', '42–44"', '44–46"'].map((m) => (
                              <td key={m} className="py-2 px-3 text-center text-xs border-t border-theme-border">{m}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      {location.whyChooseUs && location.whyChooseUs.length > 0 && (
        <section className="bg-theme-bg-soft py-16">
          <div className="w-full px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Why Choose The CrossWild in <span className="text-primary">{location.name}?</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {location.whyChooseUs.map((reason: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-theme-bg dark:bg-[#1E1E1E] rounded-xl border border-theme-border hover:border-primary transition-colors group">
                  <div className="w-9 h-9 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PARTNERS ── */}
      {location.partners && location.partners.length > 0 && (
        <section className="bg-theme-bg py-10">
          <div className="w-full px-6 lg:px-12 text-center">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
              Trusted By Leading Brands
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {location.partners.map((partner: string) => (
                <span key={partner} className="px-5 py-2 bg-theme-bg-soft dark:bg-[#1E1E1E] border border-theme-border rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CARD ── */}
      {location.contact && (
        <section className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20 py-16">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-3xl mx-auto bg-theme-bg dark:bg-[#1E1E1E] rounded-2xl border border-theme-border shadow-lg overflow-hidden">
              <div className="bg-primary px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Our Office — {location.name}
                </h2>
              </div>
              <div className="p-8 grid sm:grid-cols-2 gap-6">
                {location.contact.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Address</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{location.contact.address}</p>
                      {location.contact.mapLink && (
                        <a href={location.contact.mapLink} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2 hover:underline">
                          Get Directions <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {location.contact.phone?.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                      {location.contact.phone.map((ph: string) => (
                        <a key={ph} href={`tel:${ph.replace(/[^+\d]/g, '')}`} className="block text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium">
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {location.contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                      <a href={`mailto:${location.contact.email}`} className="text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium">
                        {location.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {location.contact.hours && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Working Hours</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{location.contact.hours}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
                {location.contact.phone?.[0] && (
                  <a href={`tel:${location.contact.phone[0].replace(/[^+\d]/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                )}
                {location.contact.email && (
                  <a href={`mailto:${location.contact.email}?subject=Inquiry from ${location.name}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                )}
                <a href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20place%20a%20bulk%20order." target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER LOCATIONS ── */}
      {otherLocations.length > 0 && (
        <section className="bg-theme-bg py-10 border-t border-theme-border">
          <div className="w-full px-6 lg:px-12">
            <p className="text-sm font-semibold text-theme-text-muted uppercase tracking-wider mb-4">
              Also Available In
            </p>
            <div className="flex flex-wrap gap-3">
              {otherLocations.map((l: any) => (
                <Link
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-soft border border-theme-border rounded-full text-sm font-medium text-theme-text-secondary hover:text-primary hover:border-primary transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {locationLabel(l)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SHARED PAGE SECTIONS ── */}
      <TrustSection />
      <PopularProducts />
      <TrendingProducts />
      <DealsSection />
      <Process />
      <Brands />
      <Testimonials />
      <Contact />
    </>
  );
}
