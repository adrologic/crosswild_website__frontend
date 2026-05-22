import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'sweatshirt-hoodie-manufacturer-in-Jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366792/crosswild/category/migrated/6475bbd0fc62eef7a6bb1b793933e830.jpg';

const PRODUCTS = [
  {
    name: 'Sweatshirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366755/crosswild/products/migrated/564e4a74f39c30ede3ea2f262debe4a4.jpg',
    description: 'We are Men Sweatshirt Wholesalers, Suppliers and Manufacturing Company in Jaipur, India. Our company manufacture Sweatshirt for Men in various styles, designs, colours, prints, embroidery and sizes.\n\nWe are Sweatshirt export company, offering an exotic collection of Men Sweatshirt that are manufactured using only best quality fabrics that add exceptionally comfortable feel.',
  },
  {
    name: 'Hoodies',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366765/crosswild/products/migrated/98475159d591ffdc68f5ed05821be0e9.jpg',
    description: 'We are the manufacture of different types of Hoodies.',
  },
  {
    name: 'Sweaters',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366771/crosswild/products/migrated/ec96c104e6f55f8814b9071a92156210.jpg',
    description: 'We manufacturer the stylish and fashionable Sweaters.',
  },
  {
    name: 'Tracksuit',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366757/crosswild/products/migrated/5e582bc24b0af8858daeaa4c41d4febf.jpg',
    description: 'We are manufacturer of wide variety of Tracksuits with stylish and trend fashion designs and prints.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Custom Sweatshirt & Hoodie Manufacturer in Jaipur',
    body: 'Being the prime sweatshirt printer in Jaipur, our catalogues speak our caliber. Our custom and personalized woolens with soft fabric will give you added comfort, while the top stitching will make it a durable choice for the fall. Stay warm as you brave the elements with our exclusive range of breathable and wind-resistant sweatshirts and hoodies. Trusted by a lot of corporates, companies, groups, and shops across Jaipur and beyond; our bespoke quality will leave you astonished.\n\nThe CrossWild massive design gallery has just about every idea you could imagine. With a wide range of sweater options, why settle for a basic one in winter? With a variety of materials, colors, and sizes, the Cross Wild offers an endless array of customized sweatshirts and woolens.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Promotional & Customized Sweatshirt Manufacturing Company in Jaipur',
    body: 'Since we keep customers as our first priority, we are committed to making their experience as smooth and as convenient as possible. The entire process of purchase, delivery, and payment is customer-friendly with a focus on fast delivery and smooth payment options. All this has collectively made The Cross Wild a decent shopping hub.',
  },
];

const DEFAULT_SEO = {
  title: 'Best Sweatshirt, Hoodie Manufacturer and Printer in Jaipur',
  description: 'The crosswild are recognized as the foremost Manufacturer and designing of a wide range of sweatshirt and hoodie in Jaipur at best price. Call 9571815050',
  keywords: 'sweatshirt manufacturer in Jaipur, hoodie manufacturer in Jaipur, sweatshirt printer in Jaipur',
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

export default async function SweatshirtManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Custom Sweatshirt & Hoodie Manufacturer in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Sweatshirt Hoodie Manufacturer in Jaipur, India', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Sweatshirt Hoodie Manufacturer in Jaipur, India',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Sweatshirt Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="Sweatshirt Manufacturing" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Sweatshirts',
                text: 'No one stocks a better selection of sweatshirts than the Cross Wild. We boast of ourselves as the top sweatshirt wholesaler in Jaipur. With heavyweight to tri-blend super soft sweatshirts, we have hundreds of patterns to choose from. No matter the occasion, unique and personalized sweatshirts are the way to go.',
              },
              {
                title: 'Hoodies',
                text: 'No matter whether you are a teen or young, we are sure you love hoodies. Therefore, we manufacture an ocean of hoodies to suit your every need. Specially made for youths of all ages, our fun hoodies with the custom design of your choice will bring the oomph factor out.',
              },
              {
                title: 'Sweaters',
                text: 'The slim fit and full sleeve style sit ideally on your body, creating an eye-catching look. Designed to keep you warm in the coldest months, these sweaters are no less trendiest.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Capabilities:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Quick Delivery', 'High-Quality Fabric', 'Fine and best-quality Printing'].map((item) => (
                <li key={item} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom Sweatshirts &amp; Hoodies in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing. Orders dispatched from our Jaipur manufacturing unit across India.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact-us" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">Get a Free Quote</Link>
              <a href="tel:+919571815050" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">Call +91-9571815050</a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
