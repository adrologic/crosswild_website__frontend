import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'customize-promotional-t-shirt-manufacturer-in-Jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366795/crosswild/category/migrated/ed3730d3c937c8abfc9cb55772e0de8a.jpg';

const PRODUCTS = [
  {
    name: 'Polo T-Shirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/products/migrated/0c06d108827197660b14472a650fc036.jpg',
    description: 'The Cross Wild manufactures high quality Polo T-shirts in various styles, colors and sizes as per the requirements of the clients. We guarantee that your custom polo shirt will be completed on time every time.',
  },
  {
    name: 'Round Neck T-shirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366753/crosswild/products/migrated/29789ee9122312588a1facf5f9bdc7dd.jpg',
    description: 'Round neck t-shirts are perfect for both men and women. These t-shirts are comfortable and softer than you can imagine. The round neck looks even better with a custom design on it. Book one for yourself or your loved ones today!',
  },
  {
    name: 'Customised T-shirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366757/crosswild/products/migrated/68b8fbc7dfab9d830a9e38d62f2502ac.jpg',
    description: 'Customized products are the best creative gifts for lovely people and workplace employee. Custom printing offers more choices of products which can.',
  },
  {
    name: 'Dry Fit Sports T-shirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366774/crosswild/products/migrated/f5528e5386c99cd334f4dab763edbd92.jpg',
    description: 'Get the best quality Drift T-shirts & promotional t-shirts for events & sports from best T-shirt manufacturers in Jaipur. Polyester T-shirts that come with various knit types will suit an array of design and prints on it. Due to its less water retaining properties and skin fit aesthetics, Drift T-shirts make more sense for sports & marathon events.',
  },
  {
    name: 'Promotional T-shirt',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366771/crosswild/products/migrated/eb0859ce28338b9620490c7a94eb31b1.jpg',
    description: 'The Cross Wild provide the Promotional T-shirt In Jaipur. We provide you with the most fashionable and attractive design in a T-shirt. All our t-shirts are intended for cooling friends who take the utmost care in selecting the best designs to wear. Give a Fresh & Elegant Look Through the Day and did not shrink a bit.',
    features: ['Soft Sleeves', 'Perfect fitting on the body', 'Umbro Design', '100% Cotton'],
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Custom T-shirt Manufacturer in Jaipur',
    body: 'Nowadays, both casual and formal t-shirts are forcing businesses to think beyond the other clothing options. Customized products are doing well for this generation, and so are our amazing products. We as a reputed custom t-shirt manufacturers in Jaipur guarantee high quality fabric and maximum thread. Our t-shirt range starts at Rs. 70 per piece.',
  },
  {
    heading: 'Polo, Round, V-neck Promotional T-shirt Printing in Jaipur',
    body: 'Manufacturing of t-shirts is one of the functions of this organization. Being a t-shirt printing company in Jaipur, the CrossWild also provides delivery facility outside the city.\n\nKeeping in mind concept designing, we not only understand the need of the customer but also design it. Our brand is unmatched in converting those designs into quality printing. Promotional t-shirt printing in Jaipur is common, but Cross Wild is exceptional. This is due to the experience of their staff and the quality of the printing tools used. We are here to provide you with the best trends available in terms of polo, round, V-neck, dry fit sports t-shirts.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Customized Bulk T-shirt Printing in India | Corporate T-shirts Manufacturer',
    body: 'The CrossWild has a wide range of excellent quality corporate t-shirts. One can easily fulfill their need of custom t-shirt printing for promotional purposes with us. With the best quality and prices, we believe in customer satisfaction and mutual respect.\n\nWe also provide customized T-shirt printing on bulk orders in India. One of the main goals of this organization is to build trust among the customers and provide them standard products at reasonable prices. Many corporate startups consider promotional products to gain a better customer base. Our expert team can design custom T-shirt printing on bulk orders for all types of sports events, yoga, cricket tournaments, professional and personal events.',
  },
  {
    heading: 'Why Cross Wild for Customize T-shirts',
    bullets: ['Elegant and Classic Colors', 'Skin Friendly Fabric', 'Exclusive Designs', 'Perfect Fit to Body'],
  },
];

const DEFAULT_SEO = {
  title: 'Customize, Promotional T-shirt Manufacturer and Printing in Jaipur-TheCrosswild',
  description: 'The crosswild is the reputed & leading firm in the field of manufacturer & printing of all types of customize, promotional T-shirts in Jaipur for more info call 9529626262',
  keywords: 't-shirt manufacturer in jaipur, t-shirt printing in Jaipur, t-shirt printer in jaipur, customize t-shirt in jaipur, promotional t-shirt in jaipur, tshirt manufacturing company in jaipur, t-shirts at a wholesale price, bulk t-shirt manufacturing',
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

export default async function TShirtManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;
  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Custom T-shirt Manufacturer in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'T-shirt Printing & Manufacturer in Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'T-shirt Printing & Manufacturer in Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'T-shirt Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="T-Shirt Manufacturing" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} asPrimary />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ready to Order Custom T-shirts?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing. Orders dispatched from our Jaipur manufacturing unit across India.</p>
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
