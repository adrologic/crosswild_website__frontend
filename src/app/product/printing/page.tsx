import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'printing';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366795/crosswild/category/migrated/a1829511fa2ebde94dbdd9c7699e550c.jpg';

const PRODUCTS = [
  {
    name: 'Digital Printing',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366771/crosswild/products/migrated/eb85bc3c535700dfb594d1d6751244ac.jpg',
    description: 'The Cross Wild is the Best Manufacturer of Digital Printing in Jaipur. We provide the best quality t-shirts, bags, mugs, and sweatshirts with Custom Digital Printing. Our Team will take. Contact us if you want to buy and get a free quote for bulk orders.',
  },
  {
    name: 'Screen Printing',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366765/crosswild/products/migrated/a34823c6ca08d69011b704e0e9551548.jpg',
    description: 'The Crosswild is the best manufacturer of Screen Printing in Jaipur. We perform premium quality screen printing services on T-shirts, Mugs, Hoodies, and other promotional products. Contact us to get a free quote.',
  },
  {
    name: 'Sublimation Printing',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366755/crosswild/products/migrated/4c2c70e121e7476fa095c187b6ab2a2e.jpg',
    description: 'Sublimation Printing - This printing technology is used for printing on various media. One such carrier is a cloth. The most common dye-sublimation printing on T-shirts, shirts, and sweatshirts. Such clothes can be washed, ironed, and even bleached. Sublimation printing on fabric is a transfer image that is printed on fabric on a wide printer, in which the image is bright, saturated, and stable.',
  },
  {
    name: 'Rubber Printing',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366760/crosswild/products/migrated/68ee7632b4a386af593eafa8458d17b8.jpg',
    description: 'Rubber Printing - We are a professional manufacturer of rubber printing squeegee blades, we export our squeegee for more than 7 years.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Digital, Rubber Printing on T-shirt | Commercial Printing Company in Jaipur',
    body: 'We are the largest commercial printing company in Jaipur, specializing in t-shirt printing methods like digital, rubber, screen, sublimation, etc.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [];

const DEFAULT_SEO = {
  title: 'Digital, Rubber, Screen Printing Services in Jaipur, India - The Cross Wild',
  description: 'Cross Wild is a leading commercial printing service provider company in Jaipur, India, specializing in digital, screen, and rubber printing on t-shirts at the best prices.',
  keywords: 'digital printing in jaipur, screen printing in jaipur, rubber printing in jaipur',
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

export default async function DigitalPrintingJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Digital, Rubber & Screen Printing in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Digital, Rubber, Screen Printing Services in Jaipur, India', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Digital, Rubber, Screen Printing Services in Jaipur, India',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Printing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <h1 className="sr-only">{bannerTitle}</h1>
      </div>

      <Breadcrumb pageName="Digital Printing" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            ))}
          </div>

          {afterSections.length > 0 && <ServiceContentSections sections={afterSections} />}

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Get Custom Printing Done in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing on digital, screen, sublimation and rubber printing. Pan-India delivery from Jaipur.</p>
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
