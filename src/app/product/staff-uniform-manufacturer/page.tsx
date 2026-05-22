import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'staff-uniform-manufacturer';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366792/crosswild/category/migrated/48929651dd915ebe39e4f608bf8d674a.jpg';

const PRODUCTS = [
  {
    name: 'Office Staff Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366750/crosswild/products/migrated/1ab794294005ed569e6b8093901e47b0.jpg',
    description: 'Enhance your office environment with the leading manufacturer of office staff uniforms. We offer a wide range of options including suits, shirts and trousers, all made from high-quality fabrics. Choose the style and material that best suits your needs. If you have a specific design requirement, we are here to customize. Contact us to begin a bulk order.',
  },
  {
    name: 'Doctors Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366753/crosswild/products/migrated/3e96df68e2f1770428e2495f8e7fe70b.jpg',
    description: 'Design doctors uniforms with the expertise of our manufacturer to combine professionalism and comfort. Need a special design or additional features? Let us know, and our skilled team will create a uniform to your exact specifications. Get in touch for more information and bulk orders.',
  },
  {
    name: 'Hospital Staff Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366755/crosswild/products/migrated/4baffe8b501fdf846f016305e9268e73.jpg',
    description: "For hospital staff, comfort and functionality are crucial. We offer a range of uniforms suitable for a variety of roles within healthcare settings. Our fabrics are chosen for their durability and comfort. Contact us for customized solutions that meet your hospital's need and feels at ease. Contact us for customized solutions that cater to your hospital's needs.",
  },
  {
    name: 'Workshop Staff Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366753/crosswild/products/migrated/39ea10fad7bf4c8350a799b255d17567.jpg',
    description: 'We provide durable fabrics and practical designs to keep factory workers safe and comfortable during their shifts. Our uniforms offer both flexibility and comfort in the factory. From work shirts to coveralls, inquire now for custom uniforms that meet industry standards.',
  },
  {
    name: 'Hotel Staff Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366769/crosswild/products/migrated/ceeca38033f62ddd520b10dbe95e1bba.jpg',
    description: 'The personality of the hospitality service personnel also reflects on the visitors, such as how to maintain etiquette, personality and professionalism etc. Whether for the front desk, housekeeping or service staff, we offer a variety of designs and fabrics that reflect the elegance and professionalism of your establishment. Get in touch to explore customized options that make a lasting impression.',
  },
  {
    name: 'Retail Store Staff Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366775/crosswild/products/migrated/f244d9fe61a5fc9871b89bd5db5e9946.jpg',
    description: 'Create a consistent and professional look for your retail team with our versatile uniforms. We offer a range of styles including t-shirts, blouses and aprons etc, all designed to be both stylish and comfortable. Contact us to discuss your specific custom requirements.',
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'Custom Uniform Manufacturer in Jaipur',
    body: 'We offer custom uniforms reflecting your enterprise identity with logo and size customization in various sectors, including healthcare, hospitality and industrial businesses. We are also proud to be one of the leading employee uniform supplier in Jaipur. Our uniforms are specially designed to meet the demands of the workforce and maintain comfort and hygiene in any workplace. We are among the leading work wear manufacturers that provide quality, durable, and easy-to-maintain work uniforms.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Doctors and Hospital Uniform Manufacturer in Jaipur',
    body: 'At CrossWild, we value the art of tailoring uniforms for personnel across various industries. Our company is a leading hospital uniform manufacturer in Jaipur with brand logo, tailoring durable and comfortable uniforms for doctors, hospital staff and workers, from ensuring quality in production to finer details, we promise that your staff will never suffer from hygiene issues and will remain comfortable, whether it is in the hospital operation theater, patient ward etc.',
  },
  {
    heading: 'Industrial Worker Uniform Manufacturer in Jaipur, India',
    body: 'In addition, our range extends to industrial employee uniform manufacturing, where we customize uniforms as per the needs of industrial factories. For retail businesses, we have exclusive uniforms available for showroom staff and we ensure that your team represents your brand respectfully. As an employee uniform supplier in Jaipur, we are proud to provide quality uniforms that meet the specific needs of your business.\n\nDo you need custom uniforms for staff? Choose The CrossWild and experience the difference in quality, customization and customer satisfaction provided by professional staff uniform manufacturers.',
  },
];

const DEFAULT_SEO = {
  title: 'Uniform Manufacturer, Supplier for Office Employees and Healthcare Workers in Jaipur',
  description: 'The Crosswild offers a wide range of healthcare, industrial workshop and office staff uniforms with customization and branding in Jaipur. Call 9529626262 for bulk orders.',
  keywords: 'uniform for office staff in Jaipur, doctors uniform manufacturer in Jaipur, employee uniform supplier',
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

export default async function StaffUniformManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'Uniform Manufacturer for Office Employees & Healthcare Workers in Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'Uniform Manufacturer for Office Employees and Healthcare Workers in Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'Uniform Manufacturer for Office Employees and Healthcare Workers in Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'Staff Uniform Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="Staff Uniform" description="" />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto space-y-12">

          <ServiceContentSections sections={beforeSections} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToRender.map((p: any) => (
              <ServiceProductCard key={p.name} {...p} />
            ))}
          </div>

          <ServiceContentSections sections={afterSections} />

          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom Staff Uniforms in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing on staff uniforms. Pan-India delivery from our Jaipur manufacturing unit.</p>
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
