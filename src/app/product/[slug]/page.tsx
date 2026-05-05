import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo';
import { getCategoryUrl } from '@/lib/categoryUrls';

// ── City config ────────────────────────────────────────────────────────────────
const CITIES: Record<string, { name: string; state: string }> = {
  jaipur:   { name: 'Jaipur',   state: 'Rajasthan' },
  jodhpur:  { name: 'Jodhpur',  state: 'Rajasthan' },
  indore:   { name: 'Indore',   state: 'Madhya Pradesh' },
  udaipur:  { name: 'Udaipur',  state: 'Rajasthan' },
  kota:     { name: 'Kota',     state: 'Rajasthan' },
  sikar:    { name: 'Sikar',    state: 'Rajasthan' },
  ajmer:    { name: 'Ajmer',    state: 'Rajasthan' },
};

// ── Product config ─────────────────────────────────────────────────────────────
interface ProductConfig {
  category: string;
  title: (city: string) => string;
  h1: (city: string) => string;
  description: (city: string) => string;
  features: string[];
  types: { label: string; img: string }[];
  benefits: string[];
  metaKeywords: (city: string) => string[];
}

const PRODUCTS: Record<string, ProductConfig> = {
  'tshirt': {
    category: 'tshirts',
    title: (city) => `Custom T-Shirt Manufacturer in ${city} | Bulk Printing from ₹70 | The Cross Wild`,
    h1: (city) => `Custom T-Shirt Manufacturer in ${city}`,
    description: (city) =>
      `The Cross Wild is a leading custom T-shirt manufacturer in ${city}. We produce bulk Polo, Round Neck, V-Neck, and Dry-Fit T-shirts with screen, digital, and sublimation printing. Starting from ₹70/piece with fast delivery across India.`,
    features: [
      'Minimum order from 50 pieces',
      'Polo, Round Neck, V-Neck & Dry-Fit styles',
      'Screen, Digital & Sublimation printing',
      'Premium quality fabric — skin-friendly',
      'Custom branding, logo & embroidery',
      'Pan-India delivery from ' + 'our Jaipur facility',
    ],
    types: [
      { label: 'Polo T-Shirt',        img: 'https://www.thecrosswild.com/products_image/0c06d108827197660b14472a650fc036.jpg' },
      { label: 'Round Neck T-Shirt',  img: 'https://www.thecrosswild.com/products_image/29789ee9122312588a1facf5f9bdc7dd.jpg' },
      { label: 'Dry-Fit Sports',      img: 'https://www.thecrosswild.com/products_image/f5528e5386c99cd334f4dab763edbd92.jpg' },
      { label: 'Customised T-Shirt',  img: 'https://www.thecrosswild.com/products_image/68b8fbc7dfab9d830a9e38d62f2502ac.jpg' },
    ],
    benefits: [
      'Elegant and classic color range',
      'Skin-friendly, high thread-count fabric',
      'Exclusive custom designs for your brand',
      'Perfect fit across all sizes',
      'Competitive bulk pricing',
    ],
    metaKeywords: (city) => [
      `custom t-shirt manufacturer ${city}`,
      `promotional t-shirt printing ${city}`,
      `bulk t-shirt manufacturer ${city}`,
      `corporate t-shirt ${city}`,
      't-shirt printing India',
      'custom t-shirt manufacturer Jaipur',
    ],
  },

  'bag': {
    category: 'bags',
    title: (city) => `Bag Manufacturer in ${city} | School, Laptop & Office Bags | The Cross Wild`,
    h1: (city) => `Bag Manufacturer in ${city}`,
    description: (city) =>
      `The Cross Wild manufactures school, laptop, office, corporate, food delivery, gym, and travel bags in ${city}. Large-scale production with custom printing and waterproof options available for bulk orders.`,
    features: [
      'School, laptop, office & travel bags',
      'Food delivery & grocery delivery bags',
      'Corporate & promotional bags',
      'Waterproof & multi-compartment options',
      'Custom logo printing & branding',
      'Bulk manufacturing from our Jaipur plant',
    ],
    types: [
      { label: 'School Bag',       img: 'https://www.thecrosswild.com/products_image/7ce7854d3bdabdb70d535cc6635b8a1e.jpg' },
      { label: 'Laptop Bag',       img: 'https://www.thecrosswild.com/products_image/909a8a47ec773aab30a62f4842e7ece6.jpg' },
      { label: 'Food Delivery Bag',img: 'https://www.thecrosswild.com/products_image/64967665b8a0a42eeff038a1a4da662b.jpg' },
      { label: 'Corporate Bag',    img: 'https://www.thecrosswild.com/products_image/434c37ef79b102bd5c2e64df74df0828.jpg' },
    ],
    benefits: [
      'Durable and stylish designs',
      'Fine quality raw materials',
      'Custom design and printing options',
      'Waterproof variants available',
      'Consistent quality across bulk orders',
    ],
    metaKeywords: (city) => [
      `bag manufacturer ${city}`,
      `school bag manufacturer ${city}`,
      `laptop bag manufacturer ${city}`,
      `corporate bag manufacturer ${city}`,
      'bag manufacturer Jaipur',
      'custom bag printing India',
    ],
  },

  'cap': {
    category: 'caps',
    title: (city) => `Cap Printing & Manufacturer in ${city} | Custom Caps | The Cross Wild`,
    h1: (city) => `Promotional Cap Printing & Manufacturing in ${city}`,
    description: (city) =>
      `The Cross Wild is a pioneer in customized cap printing in ${city}. We design and manufacture corporate, sports, tourist, and plain caps with embroidery and latest printing technology at minimum prices.`,
    features: [
      'Corporate, sports, tourist & plain caps',
      'Embroidery with latest technology',
      'Adjustable self-material strap',
      'Long-lasting and cost-effective',
      'Premium quality customization',
      'Bulk orders welcome',
    ],
    types: [
      { label: 'Corporate Cap', img: 'https://www.thecrosswild.com/products_image/3a24a9801ed1dbdd1b4bf5d5d911eda2.jpg' },
      { label: 'Sports Cap',    img: 'https://www.thecrosswild.com/products_image/ac448874f5641fe053e423a219cd4ce0.jpg' },
      { label: 'Tourist Cap',   img: 'https://www.thecrosswild.com/products_image/cd1ffc6104e185ecb2dfefd56ee0eb66.jpg' },
      { label: 'Plain Cap',     img: 'https://www.thecrosswild.com/products_image/eacd5a023684aca00f9c8450c970c904.jpg' },
    ],
    benefits: [
      'Best-quality premium customization',
      'Minimum price guarantee',
      'Adjustable strap for all head sizes',
      'Durable embroidery that lasts',
      'Available in bulk quantities',
    ],
    metaKeywords: (city) => [
      `cap printing manufacturer ${city}`,
      `custom cap manufacturer ${city}`,
      `promotional cap printing ${city}`,
      `cap manufacturer Jaipur`,
      'customized cap printing India',
    ],
  },

  'school-uniform': {
    category: 'uniforms',
    title: (city) => `School Uniform Manufacturer in ${city} | Custom Uniforms | The Cross Wild`,
    h1: (city) => `School & Office Uniform Manufacturer in ${city}`,
    description: (city) =>
      `The Cross Wild manufactures quality school uniforms for students and teachers in ${city}. We produce girls, boys, pre-primary, house, sports, and teacher uniforms with polyester cotton fabric for schools across India.`,
    features: [
      'Girls, boys & pre-primary uniforms',
      'House & sports uniforms',
      'Teacher & staff uniforms',
      'Polyester cotton blend fabric',
      'Custom embroidery & logo',
      'Bulk manufacturing — schools & corporates',
    ],
    types: [
      { label: 'Girls Uniform',   img: 'https://www.thecrosswild.com/products_image/6f037be3dce207d89d5cdafd83cd28ce.jpg' },
      { label: 'Boys Uniform',    img: 'https://www.thecrosswild.com/products_image/ebe8c56622667e5d29c12316b2f7e8b1.jpg' },
      { label: 'Sports Uniform',  img: 'https://www.thecrosswild.com/products_image/7a6ba77b5a3ca04de4ef9479825461d1.jpg' },
      { label: 'Teacher Uniform', img: 'https://www.thecrosswild.com/products_image/8ea195c9b0a741b7d76d1979a679dbc8.jpg' },
    ],
    benefits: [
      'Comfortable and durable polyester-cotton blend',
      'Custom school logo embroidery',
      'Available in all standard sizes',
      'Consistent quality across large orders',
      'Pan-India delivery',
    ],
    metaKeywords: (city) => [
      `school uniform manufacturer ${city}`,
      `school dress manufacturer ${city}`,
      `custom school uniform ${city}`,
      'school uniform manufacturer Jaipur',
      'bulk school uniform India',
    ],
  },

  'staff-uniform': {
    category: 'uniforms',
    title: (city) => `Staff Uniform Manufacturer in ${city} | Corporate Uniforms | The Cross Wild`,
    h1: (city) => `Staff & Corporate Uniform Manufacturer in ${city}`,
    description: (city) =>
      `The Cross Wild manufactures professional staff and corporate uniforms in ${city}. Custom designs for hospitals, hotels, restaurants, factories, and offices with logo embroidery and bulk pricing.`,
    features: [
      'Hospital, hotel & restaurant uniforms',
      'Factory & industrial uniforms',
      'Office & corporate uniforms',
      'Custom logo & badge embroidery',
      'Premium fabric options',
      'Bulk orders with consistent quality',
    ],
    types: [
      { label: 'Office Uniform',    img: 'https://www.thecrosswild.com/products_image/8ea195c9b0a741b7d76d1979a679dbc8.jpg' },
      { label: 'Industrial Uniform',img: 'https://www.thecrosswild.com/products_image/ebe8c56622667e5d29c12316b2f7e8b1.jpg' },
      { label: 'Hotel Uniform',     img: 'https://www.thecrosswild.com/products_image/6f037be3dce207d89d5cdafd83cd28ce.jpg' },
      { label: 'Sports Uniform',    img: 'https://www.thecrosswild.com/products_image/7a6ba77b5a3ca04de4ef9479825461d1.jpg' },
    ],
    benefits: [
      'Professional and polished appearance',
      'Durable fabric for daily wear',
      'Custom branding and logo placement',
      'Consistent sizing across bulk orders',
      'Competitive pricing for corporates',
    ],
    metaKeywords: (city) => [
      `staff uniform manufacturer ${city}`,
      `corporate uniform manufacturer ${city}`,
      `office uniform ${city}`,
      'staff uniform manufacturer Jaipur',
      'bulk corporate uniform India',
    ],
  },

  'sweatshirt-hoodie': {
    category: 'sweatshirts',
    title: (city) => `Sweatshirt & Hoodie Manufacturer in ${city} | Custom Printing | The Cross Wild`,
    h1: (city) => `Custom Sweatshirt & Hoodie Manufacturer in ${city}`,
    description: (city) =>
      `The Cross Wild is a leading sweatshirt and hoodie manufacturer in ${city}. Customized woolens with soft fabric, durable stitching, and breathable designs for corporates, companies, and shops.`,
    features: [
      'Sweatshirts, hoodies & sweaters',
      'Tracksuits & sportswear',
      'Custom logo printing & embroidery',
      'High-quality breathable fabric',
      'Wind-resistant designs',
      'Quick delivery on bulk orders',
    ],
    types: [
      { label: 'Sweatshirt', img: 'https://www.thecrosswild.com/products_image/564e4a74f39c30ede3ea2f262debe4a4.jpg' },
      { label: 'Hoodies',    img: 'https://www.thecrosswild.com/products_image/98475159d591ffdc68f5ed05821be0e9.jpg' },
      { label: 'Sweaters',   img: 'https://www.thecrosswild.com/products_image/ec96c104e6f55f8814b9071a92156210.jpg' },
      { label: 'Tracksuit',  img: 'https://www.thecrosswild.com/products_image/5e582bc24b0af8858daeaa4c41d4febf.jpg' },
    ],
    benefits: [
      'Premium quality soft fabric',
      'Durable stitching for long-lasting wear',
      'Breathable and wind-resistant',
      'Multiple styles available',
      'Extensive custom design options',
    ],
    metaKeywords: (city) => [
      `sweatshirt manufacturer ${city}`,
      `hoodie manufacturer ${city}`,
      `custom sweatshirt printing ${city}`,
      'sweatshirt manufacturer Jaipur',
      'bulk hoodie manufacturer India',
    ],
  },

  'printing': {
    category: 'printing',
    title: (city) => `T-Shirt Printing Services in ${city} | Digital, Screen & Sublimation | The Cross Wild`,
    h1: (city) => `Digital, Screen & Sublimation Printing Services in ${city}`,
    description: (city) =>
      `The Cross Wild is the largest commercial printing company in ${city}. We specialise in digital, screen, sublimation, and rubber printing on T-shirts, bags, caps, mugs, and sweatshirts with bright, durable results.`,
    features: [
      'Digital printing — photo-quality results',
      'Screen printing — ideal for bulk orders',
      'Sublimation printing — all-over prints',
      'Rubber & heat transfer printing',
      'Embroidery for premium look',
      'Printing on T-shirts, bags, caps, mugs',
    ],
    types: [
      { label: 'Digital Printing',     img: 'https://www.thecrosswild.com/products_image/eb85bc3c535700dfb594d1d6751244ac.jpg' },
      { label: 'Screen Printing',      img: 'https://www.thecrosswild.com/products_image/a34823c6ca08d69011b704e0e9551548.jpg' },
      { label: 'Sublimation Printing', img: 'https://www.thecrosswild.com/products_image/4c2c70e121e7476fa095c187b6ab2a2e.jpg' },
      { label: 'Rubber Printing',      img: 'https://www.thecrosswild.com/products_image/68ee7632b4a386af593eafa8458d17b8.jpg' },
    ],
    benefits: [
      'Bright and durable prints',
      'Suitable for all fabric types',
      'High-resolution digital artwork support',
      'Bulk order discounts',
      'Free design consultation',
    ],
    metaKeywords: (city) => [
      `t-shirt printing ${city}`,
      `digital printing ${city}`,
      `screen printing ${city}`,
      `sublimation printing ${city}`,
      't-shirt printing Jaipur',
      'commercial printing company India',
    ],
  },

  'mug': {
    category: 'mugs',
    title: (city) => `Mug Printing in ${city} | Custom Mugs | The Cross Wild`,
    h1: (city) => `Custom Mug Printing in ${city}`,
    description: (city) =>
      `The Cross Wild offers custom mug printing in ${city} for corporate gifting, promotional events, and retail. High-quality sublimation printing with vibrant colours that last. Bulk orders from 50 pieces.`,
    features: [
      'Sublimation printing for lasting colours',
      'White, colour & magic mugs',
      'Corporate gifting packages',
      'Custom logo & photo printing',
      'Minimum order 50 pieces',
      'Pan-India delivery',
    ],
    types: [
      { label: 'White Mug',       img: 'https://www.thecrosswild.com/products_image/4c2c70e121e7476fa095c187b6ab2a2e.jpg' },
      { label: 'Colour Mug',      img: 'https://www.thecrosswild.com/products_image/eb85bc3c535700dfb594d1d6751244ac.jpg' },
      { label: 'Corporate Gift',  img: 'https://www.thecrosswild.com/products_image/a34823c6ca08d69011b704e0e9551548.jpg' },
      { label: 'Promotional Mug', img: 'https://www.thecrosswild.com/products_image/68ee7632b4a386af593eafa8458d17b8.jpg' },
    ],
    benefits: [
      'Vibrant sublimation printing',
      'Dishwasher-safe prints',
      'Perfect for corporate gifting',
      'Custom packaging available',
      'Bulk pricing discounts',
    ],
    metaKeywords: (city) => [
      `mug printing ${city}`,
      `custom mug printing ${city}`,
      `promotional mug ${city}`,
      'mug printing Jaipur',
      'corporate mug printing India',
    ],
  },
};

// ── Slug → product key + city mapping ─────────────────────────────────────────
function parseSlug(slug: string): { product: ProductConfig; cityName: string; cityKey: string } | null {
  // Normalize slug to lowercase
  const s = slug.toLowerCase();

  // Detect city from "in-<city>" suffix
  let cityKey = 'jaipur'; // default
  for (const [key] of Object.entries(CITIES)) {
    if (s.endsWith(`-in-${key}`) || s.endsWith(`-${key}`)) {
      cityKey = key;
      break;
    }
  }
  const city = CITIES[cityKey] || CITIES['jaipur'];

  // Match product type by slug pattern
  let productKey: string | null = null;

  if (s.includes('mug')) productKey = 'mug';
  else if (s.includes('sweatshirt') || s.includes('hoodie')) productKey = 'sweatshirt-hoodie';
  else if (s.includes('printing') && !s.includes('cap') && !s.includes('tshirt') && !s.includes('t-shirt')) productKey = 'printing';
  else if (s.includes('staff-uniform') || s.includes('staff_uniform')) productKey = 'staff-uniform';
  else if (s.includes('school-uniform') || s.includes('uniform')) productKey = 'school-uniform';
  else if (s.includes('cap')) productKey = 'cap';
  else if (s.includes('bag') || s.includes('laptop-bag') || s.includes('school-bag')) productKey = 'bag';
  else if (s.includes('tshirt') || s.includes('t-shirt') || s.includes('customize-promotional')) productKey = 'tshirt';

  if (!productKey || !PRODUCTS[productKey]) return null;

  return { product: PRODUCTS[productKey], cityName: city.name, cityKey };
}

// ── generateMetadata ───────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: 'Product | The Cross Wild' };

  const { product, cityName } = parsed;
  return generatePageMetadata(`/product/${slug}`, {
    title: product.title(cityName),
    description: product.description(cityName),
    keywords: product.metaKeywords(cityName),
  });
}

export const revalidate = 60;

// ── Page Component ─────────────────────────────────────────────────────────────
export default async function ProductServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) notFound();

  const { product, cityName } = parsed;

  return (
    <>
      <Breadcrumb
        pageName={product.h1(cityName)}
        description={`Custom manufacturing & printing services in ${cityName} — bulk orders with pan-India delivery.`}
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Hero intro */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.h1(cityName)}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description(cityName)}
              </p>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact-us"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href={getCategoryUrl(product.category)}
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3">
              {product.types.map((t) => (
                <div key={t.label} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={t.img}
                    alt={t.label}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-semibold">{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why choose us */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Choose The Cross Wild in {cityName}?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                  <span className="text-primary text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{b}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                <span className="text-primary text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">Pan-India delivery from Jaipur</span>
              </div>
              <div className="flex items-start gap-3 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                <span className="text-primary text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">Serving clients in {cityName} since 2016</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-10 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Order in {cityName}?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Contact us for a free quote. Bulk orders dispatched from our Jaipur manufacturing unit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+919529626262"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/5 transition-colors"
              >
                Call +91-9529626262
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
