import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  getHomeCapabilities,
  getHomeWhyChoose,
  getHomeProductHighlights,
  type HomeCapability,
  type HomeWhyChoose,
  type HomeProductHighlight,
} from '@/lib/cms';
import { toPlainText } from '@/lib/text';

// Last-resort content, used only when the CMS returns an empty list — an
// unreachable backend or an emptied collection. The database is the source of
// truth for this section and its wording is what gets server-rendered, so edits
// in admin → Home Capabilities / Why Choose / Product Highlights are what a
// crawler reads. These constants exist so an outage degrades to a full section
// rather than a hole in the page.
const FALLBACK_CAPABILITIES: HomeCapability[] = [
  { _id: 'c1', title: 'T-Shirts', items: ['Custom Fabrics and Types', 'All T-Shirt Styles and Fits', 'Custom Designs at Budget-Friendly Prices'], link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur', image: '' },
  { _id: 'c2', title: 'Bags', items: ['Custom Office, School and Gym Bags', 'Wholesale Tote Suppliers', 'Laptop Bags'], link: '/product/school-laptop-bag-manufacturer-in-Jaipur', image: '' },
  { _id: 'c3', title: 'Caps', items: ['Bulk Orders', 'Custom Hats and Caps', 'Personalized Designs for All Cap Types'], link: '/product/cap-printing-manufacturer-in-jaipur', image: '' },
];

const FALLBACK_WHY_CHOOSE: HomeWhyChoose[] = [
  { _id: 'w1', number: '01', title: 'Unmatched Customization', description: 'We offer custom artwork with every order, ensuring your products are unique and perfectly matched with your exact needs.' },
  { _id: 'w2', number: '02', title: 'Affordable Bulk Manufacturing', description: 'Ordering large quantities can be expensive. We make it affordable without sacrificing quality.' },
  { _id: 'w3', number: '03', title: 'Fast Turnaround Times', description: 'We put our customers first by making sure that your orders are packed and sent as soon as possible.' },
];

const FALLBACK_HIGHLIGHTS: HomeProductHighlight[] = [
  { _id: 'h1', title: 'Mug Printing', image: '/banners/homePage/mugPrintingLight.webp', link: '/product/mug-printing-in-Jaipur' },
  { _id: 'h2', title: 'Cap Printing', image: '/banners/homePage/capPrintingLight.webp', link: '/product/cap-printing-manufacturer-in-jaipur' },
  { _id: 'h3', title: 'Digital Printing', image: '/banners/homePage/digitalPrintingLight.webp', link: '/product/printing' },
];

/**
 * The three highlight banners ship as a designed light/dark pair, with the
 * product name, tagline and feature strip drawn into the artwork itself.
 *
 * The pairing lives here rather than in the CMS because HomeProductHighlight
 * stores a single `image` and has no dark field — adding one needs a backend
 * schema change and a redeploy. Keyed by the light path the CMS stores, so a
 * highlight whose image is swapped in admin simply falls back to the tinted,
 * labelled treatment used for plain product photos.
 *
 * Themes are swapped with CSS rather than `useTheme`, matching ThemeBanner:
 * the right image is in the markup on first paint, and the off-theme one stays
 * `display: none` and is never fetched until the visitor switches.
 */
const DESIGNED_BANNERS: Record<string, { dark: string; alt: string }> = {
  '/banners/homePage/mugPrintingLight.webp': {
    dark: '/banners/homePage/mugPrintingDark.webp',
    alt:
      'Custom mug printing — your design, your brand, your mug. Custom printing, ' +
      'branding and bulk orders; premium quality, vibrant prints, dishwasher safe.',
  },
  '/banners/homePage/capPrintingLight.webp': {
    dark: '/banners/homePage/capPrintingDark.webp',
    alt:
      'Custom cap printing — your design, your brand, your cap. Custom printing, ' +
      'branding and bulk orders; durable, comfortable caps with a clean finish.',
  },
  '/banners/homePage/digitalPrintingLight.webp': {
    dark: '/banners/homePage/digitalPrintingDark.webp',
    alt:
      'Premium digital printing — high detail, vibrant colours, unlimited possibilities. ' +
      'Custom prints with no minimums; photo-real detail, fade resistant, quick turnaround.',
  },
};

const CAPABILITY_COLORS = [
  { bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', title: 'text-blue-700 dark:text-blue-400', rule: 'bg-blue-200/80 dark:bg-blue-800/70' },
  { bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', title: 'text-orange-700 dark:text-orange-400', rule: 'bg-orange-200/80 dark:bg-orange-800/70' },
  { bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', title: 'text-green-700 dark:text-green-400', rule: 'bg-green-200/80 dark:bg-green-800/70' },
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

export default async function HomeBrandContent({ content }: Props = {}) {
  // Fetched here rather than in an effect so the CMS copy is in the HTML a
  // crawler reads. In parallel: each helper can spend 15s + a retry on a cold
  // backend, and three of those in series would be a minute of render time.
  const [cmsCapabilities, cmsWhyChoose, cmsHighlights] = await Promise.all([
    getHomeCapabilities(),
    getHomeWhyChoose(),
    getHomeProductHighlights(),
  ]);

  const capabilities = cmsCapabilities.length ? cmsCapabilities : FALLBACK_CAPABILITIES;
  const whyChoose = cmsWhyChoose.length ? cmsWhyChoose : FALLBACK_WHY_CHOOSE;
  const highlights = cmsHighlights.length ? cmsHighlights : FALLBACK_HIGHLIGHTS;

  // Text resolved from CMS with sensible defaults so the section never blanks.
  // The intro badge/heading/paragraph that used to open this section were
  // removed — the hero already carries the same headline and paragraph, so it
  // read as the page saying itself twice. Their CMS fields (`introBadge`,
  // `introHeading`, `introParagraph`) are left defined but unused.
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
      <section className="py-10 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          {/* Explore Our Capabilities — capped width so the three cards stay a
              readable group instead of stretching across a wide desktop. */}
          <div className="mx-auto max-w-6xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
              {capabilitiesHeading}
            </h3>
            <div className="mx-auto mt-4 mb-7 md:mb-10 h-1 w-16 rounded-full bg-primary" />
            <div className="grid sm:grid-cols-3 gap-6">
              {capabilities.map((cat, idx) => {
                const c = CAPABILITY_COLORS[idx % CAPABILITY_COLORS.length];
                return (
                  <Link
                    key={cat._id}
                    href={cat.link || '#'}
                    className={`group flex flex-col rounded-2xl border p-6 md:p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${c.bg}`}
                  >
                    {/* Arrow only on hover — these cards are links, which the
                        old flat panels gave no sign of. */}
                    <div className="flex items-center justify-between gap-3">
                      <h4 className={`text-lg md:text-xl font-bold ${c.title}`}>{cat.title}</h4>
                      <ArrowRight
                        className={`h-5 w-5 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${c.title}`}
                      />
                    </div>
                    <span className={`mt-4 mb-5 block h-px w-full ${c.rule}`} />
                    <ul className="space-y-3">
                      {(cat.items || []).map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm md:text-[15px] text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.title}`} />
                          <span>{item}</span>
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
      <section className="py-10 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          {/* Narrower column, and the copy set left rather than centred — eight
              centred lines give the eye no fixed edge to return to. Same words,
              same tags. */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">
              {customizeHeading}
            </h2>
            <div className="mx-auto mt-4 mb-8 h-1 w-16 rounded-full bg-primary" />
            <div className="rounded-2xl border border-theme-border bg-theme-bg-card p-6 md:p-9 shadow-sm">
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-8 whitespace-pre-line">
                {customizeParagraph}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose ──────────────────────────────────── */}
      <section className="py-10 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-8 md:mb-12">
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{toPlainText(item.description)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Get the Best Result + Product Images ────────── */}
      <section className="py-10 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {bestResultsHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {bestResultsParagraph}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {highlights.map((item, idx) => {
              const designed = DESIGNED_BANNERS[item.image];
              const gradient = HIGHLIGHT_GRADIENTS[idx % HIGHLIGHT_GRADIENTS.length];
              const imgClass =
                'object-cover transition-transform duration-500 group-hover:scale-105';
              return (
                <Link
                  key={item._id}
                  href={item.link || '/contact-us'}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={designed ? designed.alt : item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={designed ? `${imgClass} dark:hidden` : imgClass}
                    />
                  )}
                  {designed && (
                    <Image
                      src={designed.dark}
                      alt={designed.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`hidden dark:block ${imgClass}`}
                    />
                  )}

                  {/* Designed artwork carries its own headline and background, so
                      nothing is drawn over it. Plain product photos still get the
                      tint and label, which is the only thing naming them. */}
                  {!designed && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-black tracking-widest uppercase drop-shadow-lg">
                          {item.title}
                        </span>
                      </div>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
