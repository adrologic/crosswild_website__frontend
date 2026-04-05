import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, CheckCircle, Phone, Mail, Clock, ExternalLink, Printer, Layers } from "lucide-react";
import { LOCATIONS, getLocationBySlug } from "@/data/locations";
import ScrollUp from "@/components/Common/ScrollUp";
import TrustSection from "@/components/Features/TrustSection";

const PopularProducts = dynamic(() => import("@/components/Products/PopularProducts"));
const TrendingProducts = dynamic(() => import("@/components/Products/TrendingProducts"));
const DealsSection = dynamic(() => import("@/components/Promotions/DealsSection"));
const Process = dynamic(() => import("@/components/Process/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Brands = dynamic(() => import("@/components/Brands"));
const Contact = dynamic(() => import("@/components/Contact"));

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: `${location.heroHeading} | The CrossWild`,
    description: location.description,
    keywords: location.products.map((p) => `${p.name} in ${location.name}`),
    openGraph: {
      title: `${location.heroHeading} | The CrossWild`,
      description: location.description,
      images: [{ url: "/images/logo/logo-crosswile.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

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
              {location.heroHeading}
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
                href="/contact"
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
                <div className={`grid gap-4 ${location.products.length <= 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                  {location.products.map((product) => (
                    <Link
                      key={product.slug}
                      href={product.link}
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
            {location.products.map((product) => (
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
                      {product.types.map((type) => (
                        <span key={type} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          <CheckCircle className="w-3 h-3" /> {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={product.link}
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
                  {location.printingMethods.map((method, i) => (
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
              {location.fabrics && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fabric Options</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {location.fabrics.map((fabric) => (
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
      <section className="bg-theme-bg-soft py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose The CrossWild in <span className="text-primary">{location.name}?</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {location.whyChooseUs.map((reason, i) => (
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

      {/* ── PARTNERS (if any) ── */}
      {location.partners && location.partners.length > 0 && (
        <section className="bg-theme-bg py-10">
          <div className="w-full px-6 lg:px-12 text-center">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
              Trusted By Leading Brands
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {location.partners.map((partner) => (
                <span key={partner} className="px-5 py-2 bg-theme-bg-soft dark:bg-[#1E1E1E] border border-theme-border rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CARD ── */}
      <section className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20 py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto bg-theme-bg dark:bg-[#1E1E1E] rounded-2xl border border-theme-border shadow-lg overflow-hidden">
            <div className="bg-primary px-8 py-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Our Office — {location.name}
              </h2>
            </div>
            <div className="p-8 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{location.contact.address}</p>
                  <a
                    href={location.contact.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2 hover:underline"
                  >
                    Get Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                  {location.contact.phone.map((ph) => (
                    <a key={ph} href={`tel:${ph.replace(/[^+\d]/g, '')}`} className="block text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-medium">
                      {ph}
                    </a>
                  ))}
                </div>
              </div>

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

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Working Hours</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{location.contact.hours}</p>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${location.contact.phone[0].replace(/[^+\d]/g, '')}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href={`mailto:${location.contact.email}?subject=Inquiry from ${location.name}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
              <a
                href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20place%20a%20bulk%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER LOCATIONS ── */}
      <section className="bg-theme-bg py-10 border-t border-theme-border">
        <div className="w-full px-6 lg:px-12">
          <p className="text-sm font-semibold text-theme-text-muted uppercase tracking-wider mb-4">
            Also Available In
          </p>
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.filter((l) => l.slug !== location.slug).map((l) => (
              <Link
                key={l.slug}
                href={`/locations/${l.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-theme-bg-soft border border-theme-border rounded-full text-sm font-medium text-theme-text-secondary hover:text-primary hover:border-primary transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {l.name}, {l.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
