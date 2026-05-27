import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'mug-printing-in-Jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366795/crosswild/category/migrated/b1510016f57c92271cac5515176a700e.jpg';

const PRODUCTS = [
  {
    name: 'Promotional Mug',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366774/crosswild/products/migrated/f59a0b7a5ea4504fa3b3bb09f753af1a.jpg',
    description: 'Promote your Brand with every sip with The Cross Wild Promotional Mug. We are the manufacturer of the Customize Promotional Mug in Jaipur. The Cross Wild have a variety of promotional mug in different designs, shape, and rate. Our qualified team can make Customized Promotional mugs according to clients\' needs.',
  },
  {
    name: 'Printed/Customised Mug',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366768/crosswild/products/migrated/cf74faf07125a982b5aaf25d33a9f9c9.jpg',
    description: 'We are a manufacturer and supplier of Printed and Customized Mugs in Jaipur. The Crosswild offer a wide range of Printed and Customized Mug with various designs, patterns, and color combination. Design your Picture, Brand Logo, and Name on the Mug. We design and customize Mug according to your requirement.',
  },
  {
    name: 'Coffee Mug',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366762/crosswild/products/migrated/83cde8baeac2b07d58ccbc805f16ee53.jpg',
    description: 'The Crosswild are manufacturer of customized coffee mugs in Jaipur. We have many varieties of coffee mugs with separate style patterns, sizes, and color combinations. our features service and high-quality we are delivered customize coffee at the best price. we customize the coffee cup to your needs.',
  },
  {
    name: 'Corporate Mug',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366768/crosswild/products/migrated/bdff08bbc4cc26f26aa9ff8f1918ef0d.jpg',
    description: 'We are the leading all types of mug manufacturers in Jaipur, India. We make a premium quality ceramic mug. If you want to make your corporate mugs in bulk quantities then you can contact us and get free quotes.',
  },
  {
    name: 'Plain Mug',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366762/crosswild/products/migrated/7f1647eee1a016d84f75ad7c00c4cc64.jpg',
    description: 'Enjoy a cup of your favorite morning brew with one of our Customize Plain mugs. The Crosswild is the best manufacturer and supplier of Customize Plain Mug in Jaipur. Contact us if you want to buy and get a free quote for bulk orders.',
  },
];

const MUG_QUALITY = ['Lightweight', 'Dishwasher and microwave safe', 'Retains temperature longer due to thick material'];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Personalized Custom Mug Printing in Jaipur — The Cross Wild',
    body: 'Most people start their day with morning tea, but many love to drink tea in their favorite mug. One of the biggest benefits of drinking coffee or tea in a mug is that it keeps your drink warm and gives you the energy to work all day and night. A beautifully printed coffee mug does not only add beauty to the office or home space but it can be used as both a paperweight and holder.\n\nSo, if you are planning to get a customized Mug for a loved one or for your office then we are helping you with this. We hold expertise in mug printing in Jaipur and can print any logo, photos, or design on the mug.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'What are we specialized in Mug Printing?',
    bullets: [
      'From promotional mugs to corporate mugs and even plain mugs we can provide our clients with every type of mug they want.',
      'We at The Cross Wild can print inspirational quotes also as per the client\'s requirements of our clients. In fact, it is a perfect option if looking to gift something to employees. With our high-quality printing technology, we will make your creation definitely look great and worth it.',
      'We can even get it printed in whichever color you want whether raw, solid, neon, or pale. At The Cross Wild, we help our clients in each possible way, and with organized catalog customers will be able to choose the mug they are looking for in an easy and time-saving way.',
      'All mugs define the style statement and each piece is of premium and best quality. We have a team of professionals who work effectively and make sure that printing is done within time and parcels are delivered timely.',
      'The thing that makes us stand out in today\'s competitive market is that we pay attention to what the customer wants.',
    ],
  },
];

const DEFAULT_SEO = {
  title: 'Personalized Custom Mug Printing in Jaipur, India -The Crosswild',
  description: 'The Crosswild is one of the leading firm providing mug printing services and all types of personalized custom mug printing at best price in Jaipur. For more details call on +91-9529626262',
  keywords: 'mug printing in jaipur, mug printer in jaipur, custom mug printing service',
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

export default async function MugPrintingJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Personalized Custom Mug Printing in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Mugs Printing in Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Mugs Printing in Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Mugs Printing', category: 'Mug Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="Mug Printing" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} asPrimary />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Mug Quality</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MUG_QUALITY.map((item) => (
                <li key={item} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom Mugs in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing. Orders dispatched from our Jaipur unit across India.</p>
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
