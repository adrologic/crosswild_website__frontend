import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPageContent } from '@/lib/content';
import ServiceProductCard from '@/components/Common/ServiceProductCard';
import ServiceContentSections, { type ContentSection } from '@/components/Common/ServiceContentSections';

const SLUG = 'school-uniform';
const CANONICAL = `https://www.thecrosswild.com/product/${SLUG}`;
const BANNER_FALLBACK = 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366789/crosswild/category/migrated/0c977d4571c4f822f96a1cc74bc91517.jpg';

const PRODUCTS = [
  {
    name: 'Girls School Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366760/crosswild/products/migrated/6f037be3dce207d89d5cdafd83cd28ce.jpg',
    description: 'Leading manufacturer of school uniforms for girls such as salwar suits, shirts, pants, and skirts. You can select the fabric in pattern and grade as per your requirements. If you need Salwar Suit in different designs then you can tell us. We have tailors who are experts in their work.',
  },
  {
    name: 'School House Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366760/crosswild/products/migrated/75d8c5aa82f17774857d95ffafd93fc1.jpg',
    description: "Design your school's students' uniforms in comfortable fabric according to their schoolhouse. Want to get perfect and high-quality fabric dresses for school students? Enquiry now for bulk orders.",
  },
  {
    name: 'Boys School Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366772/crosswild/products/migrated/ebe8c56622667e5d29c12316b2f7e8b1.jpg',
    description: "Students should feel comfortable in what they wear. Hence, we always recommend you choose cotton and polycotton. Boys' shorts and full/half pants and t-shirts or shirts, you can get anything made from us. Different patterns are available. Inquire now for more details.",
  },
  {
    name: 'School Sports Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366760/crosswild/products/migrated/7a6ba77b5a3ca04de4ef9479825461d1.jpg',
    description: 'An athlete or a team needs to play a vital role. We consider the breath-ability, comfort and durability of our sports school uniforms. You can contact us for school sports uniforms like basketball, cricket, etc.',
  },
  {
    name: 'School Teachers Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366762/crosswild/products/migrated/8ea195c9b0a741b7d76d1979a679dbc8.jpg',
    description: "A teacher's personality also reflects on students, such as how to maintain discipline, manners, personality, hygiene, professionalism, etc. Staff should be well-presented and have a positive impact on students. So, design their formal attire from the best School Teachers' Uniform manufacturer.",
  },
  {
    name: 'Pre-Primary School Uniform',
    image: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366755/crosswild/products/migrated/5173fbc952708f453b5e9bde8d2086b6.jpg',
    description: "Kids should be comfortable throughout the day. Always suggest soft fabrics for their attire that will be easy to clean. For a positive learning environment, their uniforms should be stylish and vibrant. Many options are available for kids' school uniforms like t-shirts, skirts, shorts, polo shirts, and jumpers. Inquire now for more information.",
  },
];

const DEFAULT_BEFORE_SECTIONS: ContentSection[] = [
  {
    heading: 'School Uniform Manufacturer for Student and Teacher | Sport Dress Manufacturer In Jaipur',
    body: 'The Cross Wild it is the best school uniform manufacturer in Jaipur that develops and manufactures a comprehensive range of quality high-performance uniforms for students and teachers. Our commitment to excellence ensures that each garment we manufacture provides the highest level of comfort in wearing and durability.\n\nAlong with student uniforms, we also provide uniforms for educators. Our manufacturing units in Jaipur design and produce professional and comfortable teacher uniforms that speak volumes about the commitment and professionalism of teaching staff. We offer different styles and sizes so that every teacher can look great while helping to maintain a positive learning environment.\n\nBesides this for the schools which emphasize on physical education and sports, sport T-shirt manufacturers in Jaipur offer different types of sportswear for performance. Besides that, we at The Cross Wild provide customized printed sport T shirts in Jaipur, which prove to be a great medium to showcase a school\'s unique identity and spirit.',
  },
];

const DEFAULT_AFTER_SECTIONS: ContentSection[] = [
  {
    heading: 'Kids, Girls and Boys School Uniform & Dress Manufacturer Jaipur',
    body: 'We specialize in polyester cotton school uniforms, which besides being fashionable, are comfortable to wear every day. Our range of boys\', girls\', and pre-primary kids\' uniforms is designed for the best fit for each student. Being one of the leading school dress wholesaler, we believe in offering such clothes that keep the children comfortable, functional, and focused on their studies and activities.\n\nWe have designed our uniforms, keeping active school students in mind. For example, school tracksuit manufacturers in Jaipur have prepared tracksuits that are just apt for physical education classes as well as for the purpose of playing sports activities with a lot of ease and style.\n\nAt The Cross Wild, we pride ourselves on an extensive range to satisfy every student and teacher needs when it comes to school uniforms. From stylish school uniforms to professional ones for educators, we will support you in finding your perfect solution. Rest assured that, together with us, your school community will look cohesive and professional.',
  },
];

const DEFAULT_SEO = {
  title: 'Customized School Dress | School Uniform Manufacturer In Jaipur India',
  description: 'Find the best school uniform manufacturer in Jaipur for your dress customization needs. Crosswild provides school uniform manufacturers and promotional printing services at wholesaler prices. For bulk orders call 9529626262.',
  keywords: 'School Uniform Manufacturers Jaipur, Sport T Shirt Manufacturers In Jaipur, Teacher Uniform Manufacturers In Jaipur, Customized School dress manufactuers, Girls School dress manufacturers, Boys School dress manufacturers, Girls School Uniform manufacturers',
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

export default async function SchoolUniformManufacturerJaipur() {
  const content = await getPageContent(SLUG);
  const banner = content?.banner;

  const bannerImage = banner?.image || BANNER_FALLBACK;
  const bannerTitle = banner?.title || 'School Uniform Manufacturer In Jaipur';

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
          { '@type': 'ListItem', position: 2, name: 'School Uniform Manufacturer In Jaipur', item: CANONICAL },
        ],
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: 'School Uniform Manufacturer In Jaipur',
        description: DEFAULT_SEO.description,
        provider: { '@type': 'Organization', name: 'The CrossWild', url: 'https://www.thecrosswild.com', logo: 'https://res.cloudinary.com/djvsjbzez/image/upload/v1779366749/crosswild/seo/migrated/logo.jpg' },
        areaServed: { '@type': 'City', name: 'Jaipur' },
        serviceType: 'School Uniform Manufacturing', category: 'Apparel Manufacturing',
        offers: { '@type': 'Offer', availability: 'https://schema.org/PreOrder', priceCurrency: 'INR', url: CANONICAL },
      })}} />

      <div className="relative w-full">
        <Image src={bannerImage} alt={bannerTitle} width={1920} height={640} className="w-full h-auto" priority sizes="100vw" />
        <p className="sr-only">{bannerTitle}</p>
      </div>

      <Breadcrumb pageName="School Uniform" description="" />

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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order Custom School Uniforms in Bulk</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Contact us for bulk pricing on school uniforms. Pan-India delivery from our Jaipur manufacturing unit.</p>
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
