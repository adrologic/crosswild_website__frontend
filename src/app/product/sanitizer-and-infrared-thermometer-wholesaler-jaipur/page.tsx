import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'sanitizer-and-infrared-thermometer-wholesaler-jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://www.thecrosswild.com/upload/category/8b29d382d7a8727aaa07a5c7755ec46b.jpg';

const PRODUCTS = [
  {
    name: 'Infrared Thermometer',
    image: 'https://www.thecrosswild.com/products_image/5da4f9acc5fc11aa068ceffe79add3b8.jpg',
    description: 'Infrared Thermometer is the only best way to check the temperature of all people entering into the premises and keep your place free from the risk of spread of Covid-19.',
  },
  {
    name: 'Hand Sanitizer',
    image: 'https://www.thecrosswild.com/products_image/1110ab722cc416528eb7515635a9cc10.jpg',
    description: 'Alcohol-based hand sanitizers available in 50 ml, 100 ml, 200 ml, 500 ml and 1 Liter packages — ideal for offices, hospitals, retail outlets, and bulk gifting.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Sanitizer and Infrared Thermometer Wholesaler Jaipur',
    subheading: 'Alcohol Based Hand Sanitizer Wholesaler in Jaipur',
    body: 'Hands Sanitizer or Alcohol based sanitizer plays an important role these days, it keeps you and your family safe from the spread of the virus.\n\nHand Sanitizers become essential for everyone, whether you\'re in office or travelling, sanitizers help you every time to maintain your proper hygiene as covid-19 is spreading everywhere.\n\nThere are many Hand Sanitizer Manufacturers in Jaipur that provide a wide variety of hand sanitizers in different quantities from 50 ml, 100 ml, 200 ml to 500 ml and 1 Liter packages.\n\nIf you\'re a retailer want to sell top quality hand sanitizers, you can place your hand sanitizer bulk order in Jaipur and you\'ll get delivery on time.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Infrared Thermometer Wholesale in Jaipur',
    body: 'Infrared Thermometer is a need of all organizations, Healthcare units and Industries, as after lockdown all sectors resume their work.\n\nInfrared Thermometer is the only best way to check the temperature of all people entering into the premises and keep your place free from the risk of spread of Covid-19.\n\nAs one of the leading Infrared Thermometer Wholesaler in Jaipur, we are dedicated to providing top qualities Infrared Thermometers and Hand Sanitizers to our dealer\'s at most affordable prices.',
  },
  {
    heading: 'Best Infrared Thermometer Supplier in Jaipur',
    body: 'Find the best infrared thermometer in Jaipur at most competitive prices from Cross Wild. We have plenty of choices and options, when it comes to choosing Infrared Thermometers in Jaipur.',
  },
];

const DEFAULT_SEO = {
  title: 'Hand Sanitizer, Infrared Thermometer Manufacturer Wholesale in Jaipur, Rajasthan - The Crosswild',
  description: 'We are Hand Sanitizer and Infrared Thermometer Manufacturer and Wholesaler in Jaipur Rajasthan. Get the Best Deal on Sanitizer and Infrared Thermometer. Call us for free quote.',
  keywords: 'hand sanitizer manufacturer in rajasthan, infrared thermometer wholesaler in jaipur',
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(SLUG);
  const seo = content?.seo || {};
  const title = seo.title || DEFAULT_SEO.title;
  const description = seo.description || DEFAULT_SEO.description;
  const keywords = seo.keywords || DEFAULT_SEO.keywords;
  return {
    title, description, keywords,
    alternates: { canonical: CANONICAL },
    robots: { index: true, follow: true },
    openGraph: { type: 'website', locale: 'en_IN', url: CANONICAL, siteName: 'The CrossWild', title, description, images: [{ url: BANNER_FALLBACK, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export const revalidate = 60;

export default async function SanitizerThermometerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Sanitizer & Infrared Thermometer Wholesaler Jaipur';

  const productsToRender = content?.products?.items?.length ? content.products.items : PRODUCTS;
  const contentData = content?.content || {};
  const beforeSections: ContentSection[] = contentData.beforeSections?.length ? contentData.beforeSections : DEFAULT_BEFORE_SECTIONS;
  const afterSections: ContentSection[] = contentData.afterSections?.length ? contentData.afterSections : DEFAULT_AFTER_SECTIONS;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thecrosswild.com/' },
          { '@type': 'ListItem', position: 2, name: 'Hand Sanitizer & Infrared Thermometer Wholesaler Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Hand Sanitizer & Infrared Thermometer Wholesaler Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://www.thecrosswild.com/assets/front/images/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Sanitizer & Infrared Thermometer Wholesale', category: 'Healthcare Products',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <h1 className="sr-only">{bannerTitle}</h1>
      </div>

      <Breadcrumb pageName="Sanitizer & Thermometer" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} sizes="(max-width: 640px) 100vw, 50vw" />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Sanitizers &amp; Thermometers in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for wholesale pricing. Pan-India delivery from our Jaipur unit.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact-us" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Get a Free Quote</Link>
              <a href="tel:+919529626262" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">Call +91-9529626262</a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
