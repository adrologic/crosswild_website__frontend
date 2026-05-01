import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'cap-printing-manufacturer-in-jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://www.thecrosswild.com/upload/category/a1770d345abcda021af21af6ba5638e2.jpg';

const PRODUCTS = [
  {
    name: 'Corporate Cap',
    image: 'https://www.thecrosswild.com/products_image/3a24a9801ed1dbdd1b4bf5d5d911eda2.jpg',
    description: 'We are Manufacturer & Suppliers of the Customize Corporate Cap in Jaipur. The Crosswild have a wide collection of Corporate Cap in different colours, sizes and price. Our Professional Team can design Customized Corporate Cap according to your requirement.',
    features: ['Best-Quality', 'Premium Customization', 'Minimum Price', 'Adjustable self-material strap'],
  },
  {
    name: 'Sports Cap',
    image: 'https://www.thecrosswild.com/products_image/ac448874f5641fe053e423a219cd4ce0.jpg',
    description: 'We are manufacturer and suppliers of the Sports Cap in Jaipur. The Crosswild offer a wide range of Sports Cap with various designs, patterns and colour combination. Our Sports Cap are known for their long lasting and cost effective features. Design your Brand Logo, Team Name on the Cap. We customized the Sports Cap according to your requirement.',
    features: ['Best-Quality', 'Premium Customization', 'Minimum Price', 'Adjustable self-material strap'],
  },
  {
    name: 'Tourist Cap',
    image: 'https://www.thecrosswild.com/products_image/cd1ffc6104e185ecb2dfefd56ee0eb66.jpg',
    description: 'we are counted as a leading Manufacturer Tourist Cap in Jaipur. we have a huge collection of Tourist Cap with variety patterns, size and colour combination. Our designs and manufacturer high-quality Tourist Cap are delivered at the best affordable price. We customize the Tourist Cap with your current requirement.',
  },
  {
    name: 'Plain Cap',
    image: 'https://www.thecrosswild.com/products_image/eacd5a023684aca00f9c8450c970c904.jpg',
    description: 'The Crosswild manufacturer of highly fashionable Plain Cap in Jaipur. Our Caps are high on demand, due to their best quality. These Plain Cap help to keep you dry during playing and exercise as well as jogging. We have a wide collection of Plain Cap with different colours, patterns and size. We can provide Plain Cap according to your requirement.',
  },
];

const CAP_TYPES = [
  {
    title: 'Corporate Caps',
    text: 'Dynamic Cap endeavors to be your first resort for quality customized corporate caps in Jaipur. With a commitment to excellence, we serve our clients with superior quality Corporate Cap. Caps are great value for money and can be customized to suit your organizational needs.',
  },
  {
    title: 'Sports Caps',
    text: 'The Cross Wild also supplies and manufactures Sports Caps in India. Dress up your team with a custom-designed adjustable sports cap. Our sports caps are known for their long-lasting and durable construction. Each piece is designed by our expert designers and is guaranteed to come out the best.',
  },
  {
    title: 'Tourist Caps',
    text: "When it's done right, people love the usefulness of a well-made tourist hat and hat. Plus, you can also promote your brand with these caps. As the leading manufacturer of Camper Cap in Jaipur, we have a vast collection of Camper Cap. These are economical and promote positive interactions with the audience you want.",
  },
  {
    title: 'Simple, Versatile Caps',
    text: 'Considering a fitted cap with an adjustable snap back or Velcro fit? We manufacture highly fashionable Plain Cap in Jaipur. These custom-made caps are perfect for a morning walk, jogging, or a simple day-wear. With vibrant colors and exceptional quality, these caps come at pocket-friendly prices.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Promotional Customized Cap Printing & Manufacturing Company in Jaipur, India — The Cross Wild',
    body: 'There doesn\'t seem to be much order when it comes to accessorizing your outfit. Hats and caps have become major accessories and items that people not only use in the sun but also use to enhance their looks. When these caps are customized, they add yet another charm to the look.\n\nIf you are also looking for caps, we are here to help you. We are a pioneer in providing Customized Cap Printing in Jaipur. With years of experience in designing customized caps, we take pride in offering personalized caps for every occasion and purpose.\n\nYou can choose from many different caps and hats, which vary in model type, color, size, and pattern. The Cross Wild a leading cap manufacturer in Jaipur ensures that the caps are of the highest quality and fit snugly on the wearer.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Various Types of Caps We Manufacture and Print',
    body: 'The use of ultra-modern equipment ensures that your hat is embroidered or printed to the highest standard. Whether you want embroidery or plain text, we promise to meet your every wish. We have all the resources available to you to quickly create your unique cap. This means that personalized tactile caps are delivered in almost the same way as our simple and plain caps.',
  },
];

const DEFAULT_SEO = {
  title: 'Caps Printing, Manufacturer in Jaipur, India | Customized & Promotional Caps -The CrossWild',
  description: 'The CrossWild is well reputed customized & promotional caps printing & printing manufacturer in Jaipur, India. We are manufacturer of corporate, sports, tourist caps call +91-9529626262.',
  keywords: 'cap printing in jaipur, cap manufacturer in jaipur, customized caps, promotional caps',
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

export default async function CapManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Cap Printing & Manufacturing in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Caps Printing, Manufacturer in Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Caps Printing, Manufacturer in Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://www.thecrosswild.com/assets/front/images/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Caps Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <h1 className="sr-only">{bannerTitle}</h1>
      </div>

      <Breadcrumb pageName="Cap Manufacturer" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAP_TYPES.map((item) => (
              <div key={item.title} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Why Choose The Cross Wild?</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {['Caps of The Highest Quality', 'Embroidered With The Latest Technology', 'Minimum Price', 'Premium Customization'].map((item) => (
                <li key={item} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom Caps in Bulk</h2>
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
