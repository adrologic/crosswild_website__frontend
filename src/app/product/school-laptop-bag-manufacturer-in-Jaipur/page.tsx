import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'school-laptop-bag-manufacturer-in-Jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://www.thecrosswild.com/upload/category/1cf6d53e65f3078d8a0cfba336955713.jpg';

const BAG_TYPES = [
  ['School/College Bag', 'Coaching Bags'],
  ['Laptop Bags', 'Travel Bags'],
  ['Backpack Bag', 'Office Bags'],
  ['Corporate Bags', 'Food Delivery Bag'],
  ['Grocery Delivery Bag', 'Gym Bags'],
];

const PRODUCTS = [
  {
    name: 'Bag Pack',
    image: 'https://www.thecrosswild.com/products_image/a9605470f8ab81052d979aaf10cbfcd1.jpg',
    description: 'Backpacks are perfect for those times when you\'ve got the world to carry on your back, literally. Indeed, backpacks are your all-time friend, especially when you can\'t just organise the load properly. We have a huge variety of backpacks in different sizes, colour, and fabric, with which you can blow someone else\'s mind. The bags are durable and stylish at the same time, giving you the much-required relief in carrying things.',
  },
  {
    name: 'School Bag',
    image: 'https://www.thecrosswild.com/products_image/7ce7854d3bdabdb70d535cc6635b8a1e.jpg',
    description: 'Bright, colourful, and functional; the CrossWild offer school bags for boys and girls of all ages. Choose from the collection of school bags with name, custom prints, designs and patterns.',
    features: ['Attractive backpack', 'Fine raw-Material', 'Separate space for notebook and books.'],
  },
  {
    name: 'Laptop Bag',
    image: 'https://www.thecrosswild.com/products_image/909a8a47ec773aab30a62f4842e7ece6.jpg',
    description: 'In Jaipur, Crosswild is one of the top Laptop Bag manufacturers providing Laptop bags in various shapes and sizes. The bags come with an easy-to-carry, durable strap with multiple folds. Designed to protect your laptop tablet, we have the most stylish and affordable options for you.',
  },
  {
    name: 'Food Delivery Bags',
    image: 'https://www.thecrosswild.com/products_image/64967665b8a0a42eeff038a1a4da662b.jpg',
    description: 'We help provide you with consistency. When you want to keep food, grocery, and e-commerce packages safe during delivery, there\'s really no other option. Invest in a quality delivery bag from The Cross Wild - A Bags manufacturer and make sure every customer can appreciate the delicious, safe, fresh packages with every order.',
  },
  {
    name: 'eCommerce Delivery Bags',
    image: 'https://www.thecrosswild.com/products_image/9ce74d413be46ea047b680b65e5c7aa6.jpg',
    description: 'We manufacture premium quality Ecommerce Delivery Bags, our products are quality tested. We build quality and robustness.',
    features: ['Our bags are waterproof.', 'Velcro strips to secure the flap.', 'Two-way industrial zippers and reinforced stitching.', 'Removable silver reflective lining.', 'Hardboard internal dividers.'],
  },
  {
    name: 'Office Bag',
    image: 'https://www.thecrosswild.com/products_image/592988b5cab7ffe3bee30ea74ab70a76.jpg',
    description: 'Set a professional image by carrying a stylish office bag to the office. The Cross Wild offers an endless array of office bags with multiple zip closures to keep important items and documents organized. We also customize the bags as per the demands of our customers.',
  },
  {
    name: 'Travel Bag',
    image: 'https://www.thecrosswild.com/products_image/0b8beb77484360b93d7dbc3b66271df8.jpg',
    description: 'From practical backpacks for your daily commute to wheeled backpacks for traveling, we have something for every need and occasion. Besides, you can also get your colleagues and customers to carry your logo with custom travel bags.',
  },
  {
    name: 'Corporate Bags',
    image: 'https://www.thecrosswild.com/products_image/434c37ef79b102bd5c2e64df74df0828.jpg',
    description: 'The Crosswild has also recently become a top corporate bag manufacturer in Jaipur. Designed to offer better personalization, the corporate bags are available at highly competitive prices. We also have ready stock of bags in the city, get it when you need it.',
  },
  {
    name: 'Gym Bag',
    image: 'https://www.thecrosswild.com/products_image/3512feaa31d0cd1cfe05786b57553eca.jpg',
    description: 'Highly practical and suitable for gym and trips, our gym bags gives you and your brand the right exposure. We boast of ourselves as the leading gym bag manufacturer in Jaipur for providing the highest quality, durable gym bags.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Bag Manufacturer in Jaipur',
    body: 'In today\'s era, the trend of bags is considered a solid basis to judge the level of any person. With the growing fashion, bags are now considered as a part of clothing. The CrossWild is a designing and printing-based best bag manufacturer in Jaipur. We also offer our own designs and custom. Bags are one of the most useful products manufactured by this organization.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [];

const DEFAULT_SEO = {
  title: 'Best Food Delivery, School, Office Bags Manufacturer in Jaipur - The CrossWild',
  description: 'The Crosswild is the largest bag manufacturer in Jaipur. We specialize in manufacturing school, laptop, corporate, food delivery backpacks/bags etc. at the best price. Call 9571815050.',
  keywords: 'bag manufacturer in Jaipur, food delivery bags, bags supplier in jaipur, bag manufacturing company in Jaipur',
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

export default async function BagManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Bag Manufacturer in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Food Delivery, School, Office Bags Manufacturer in Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Food Delivery, School, Office Bags Manufacturer in Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://www.thecrosswild.com/assets/front/images/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Bags Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <h1 className="sr-only">{bannerTitle}</h1>
      </div>

      <Breadcrumb pageName="Bag Manufacturer" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <div>
            <ServiceContentSections sections={beforeSections} />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Types of Bags We Make</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
              <table className="w-full text-[14px]">
                <tbody>
                  {BAG_TYPES.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}>
                      {row.map((cell) => (
                        <td key={cell} className="px-6 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 last:border-r-0">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
              We have a large production unit that can make thousands of bags in a short time, as we also make bags
              in bulk. Hence, we maintain the same quality across all the products. This shows our excellence in
              stitching, cut and design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} />
            ))}
          </div>

          {afterSections.length > 0 && <ServiceContentSections sections={afterSections} />}

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom Bags in Bulk</h2>
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
