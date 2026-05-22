import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'face-mask-and-ppe-kit-manufacturer-jaipur';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366789/crosswild/category/migrated/18f1046130e78256ffcfed19179e0961.jpg';

const PRODUCTS = [
  {
    name: 'Face Mask',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366762/crosswild/products/migrated/7ee58cd665ba15256c8e85808a85e7b6.jpg',
    description: 'We manufacture high-quality face masks including N95 masks, printed face masks, and surgical masks to keep you and your team safe. Available in bulk quantities at the best wholesale prices.',
  },
  {
    name: 'PPE Kit',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366762/crosswild/products/migrated/900af3a323036134f274d01d1bd2d79f.jpg',
    description: 'Complete PPE Kits manufactured using high-standard materials for hospitals, clinics, salons, and other essential service workers. Bulk orders welcome with fast delivery across India.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Face Mask And PPE Kit Manufacturer & Wholesaler',
    body: 'We understand how important it is these days to cover your face and body with face masks and PPE kits if you\'re working in healthcare sectors.\n\nThis is the time when face masks have become a necessity for everyone. To help you in this difficult situation, Cross Wild comes up with a wide range of PPE Kits and Face Masks. As one of the leading face mask manufacturers in Jaipur, we offer an exclusive collection of PPE Kits and Face Masks that are made from high-quality materials and keep you safe from viruses.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'N95 Mask Manufacturer in Jaipur',
    body: 'N95 Masks are in higher demand around the globe, as these masks keep you safe from viruses and their quality is much higher as compared to ordinary masks available in the market.\n\nThese kinds of masks are a must-have for every healthcare worker as they have much more power to keep the wearer safe. There are very few N95 mask manufacturers in Jaipur, and The Cross Wild is one of them — offering masks and PPE kit manufacturing services to keep the people of our country safe and healthy.',
  },
  {
    heading: 'Top PPE Kit Manufacturer in Jaipur',
    body: 'Help protect yourself and society, now and in the future, with PPE kits manufactured using high-standard materials. As one of the leading PPE Kit Manufacturers in Rajasthan, you can find a wide variety of PPE Kits for hospitals, clinics, salons, and others.',
  },
  {
    heading: 'Face Masks and PPE Kit in Jaipur',
    bullets: [
      'No matter what kind of face mask and PPE kit you\'re looking for in bulk, your search will end here at Cross Wild.',
      'Keep you and your family safe from viruses with our certified protective gear.',
      'For any kind of face masks and PPE kits in wholesale, feel free to get in touch with us!',
    ],
  },
];

const DEFAULT_SEO = {
  title: 'N95 Face Mask, PPE Kit Manufacturer Wholesale in Jaipur, Rajasthan - The Crosswild',
  description: 'We are manufacturing N95 face mask, printed face mask and PPE kits at best price in Jaipur Rajasthan. Get the best deals on face mask and PPE kits. Call us for free quote.',
  keywords: 'n95 mask manufacturer in rajasthan, ppe kit manufacturer in rajasthan, ppe kit manufacturer',
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

export default async function FaceMaskPPEKitJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Face Mask & PPE Kit Manufacturer in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Face Mask and PPE Kit Manufacturer Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Face Mask and PPE Kit Manufacturer Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Face Mask & PPE Kit Manufacturing', category: 'Healthcare Products Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="Face Mask & PPE Kit" description="" />

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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Face Masks &amp; PPE Kits in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for wholesale pricing on face masks and PPE kits. Pan-India delivery from Jaipur.</p>
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
