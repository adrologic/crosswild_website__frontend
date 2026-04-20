import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo';
import { getCategoryUrl } from '@/lib/categoryUrls';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/services', {
    title: 'Our Services | Custom T-Shirts, Bags, Caps & Uniforms Manufacturer - The Cross Wild',
    description: 'The Cross Wild offers custom manufacturing services for T-shirts, bags, caps, uniforms, sweatshirts, hoodies, lower & shorts, and printing & embroidery. Bulk orders from Jaipur across India.',
    keywords: [
      'custom t-shirt manufacturer Jaipur',
      'bag manufacturer Jaipur',
      'cap printing Jaipur',
      'school uniform manufacturer Jaipur',
      'sweatshirt hoodie manufacturer',
      'lower shorts manufacturer',
      'printing embroidery services Jaipur',
      'promotional products Jaipur',
      'The Cross Wild services',
    ],
  });
}

const services = [
  {
    slug: 'tshirts',
    title: 'T-Shirts',
    description:
      'Custom T-shirt manufacturing from ₹70/piece. We offer Polo, Round Neck, V-Neck, and Dry-Fit Sports styles with high-quality fabric and professional printing for corporates, events, and bulk orders.',
    features: ['Elegant & Classic Colors', 'Skin-Friendly Fabric', 'Exclusive Designs', 'Perfect Fit to Body'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/0c06d108827197660b14472a650fc036.jpg', alt: 'Polo T-Shirt' },
      { src: 'https://www.thecrosswild.com/products_image/29789ee9122312588a1facf5f9bdc7dd.jpg', alt: 'Round Neck T-Shirt' },
      { src: 'https://www.thecrosswild.com/products_image/68b8fbc7dfab9d830a9e38d62f2502ac.jpg', alt: 'Customised T-Shirt' },
      { src: 'https://www.thecrosswild.com/products_image/f5528e5386c99cd334f4dab763edbd92.jpg', alt: 'Dry Fit T-Shirt' },
    ],
  },
  {
    slug: 'bags',
    title: 'Bags',
    description:
      'Large-scale bag manufacturing for school, college, laptop, travel, office, corporate, food delivery, grocery, gym, and backpack categories. Custom design and printing, waterproof options available.',
    features: ['Durable & Stylish', 'Fine Quality Raw Materials', 'Custom Printing Options', 'Waterproof Variants'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/a9605470f8ab81052d979aaf10cbfcd1.jpg', alt: 'Backpack' },
      { src: 'https://www.thecrosswild.com/products_image/7ce7854d3bdabdb70d535cc6635b8a1e.jpg', alt: 'School Bag' },
      { src: 'https://www.thecrosswild.com/products_image/909a8a47ec773aab30a62f4842e7ece6.jpg', alt: 'Laptop Bag' },
      { src: 'https://www.thecrosswild.com/products_image/64967665b8a0a42eeff038a1a4da662b.jpg', alt: 'Food Delivery Bag' },
    ],
  },
  {
    slug: 'caps',
    title: 'Caps',
    description:
      'Pioneer in customized cap printing in Jaipur. We design caps for every occasion — corporate, sports, tourist, and plain caps with embroidery and the latest printing technology at minimum prices.',
    features: ['Premium Customization', 'Adjustable Strap', 'Long Lasting & Cost Effective', 'Embroidery Technology'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/3a24a9801ed1dbdd1b4bf5d5d911eda2.jpg', alt: 'Corporate Cap' },
      { src: 'https://www.thecrosswild.com/products_image/ac448874f5641fe053e423a219cd4ce0.jpg', alt: 'Sports Cap' },
      { src: 'https://www.thecrosswild.com/products_image/cd1ffc6104e185ecb2dfefd56ee0eb66.jpg', alt: 'Tourist Cap' },
      { src: 'https://www.thecrosswild.com/products_image/eacd5a023684aca00f9c8450c970c904.jpg', alt: 'Plain Cap' },
    ],
  },
  {
    slug: 'uniforms',
    title: 'School & Office Uniform',
    description:
      'Quality uniforms for students, teachers, and staff. We manufacture school uniforms (girls, boys, pre-primary, house, sports) and professional educator attire with polyester cotton fabric across 6+ cities.',
    features: ['Polyester Cotton Blend', 'Custom Designs', 'Sports & House Uniforms', 'Pan-India Delivery'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/6f037be3dce207d89d5cdafd83cd28ce.jpg', alt: 'Girls Uniform' },
      { src: 'https://www.thecrosswild.com/products_image/ebe8c56622667e5d29c12316b2f7e8b1.jpg', alt: 'Boys Uniform' },
      { src: 'https://www.thecrosswild.com/products_image/7a6ba77b5a3ca04de4ef9479825461d1.jpg', alt: 'Sports Uniform' },
      { src: 'https://www.thecrosswild.com/products_image/8ea195c9b0a741b7d76d1979a679dbc8.jpg', alt: 'Teachers Uniform' },
    ],
  },
  {
    slug: 'sweatshirts',
    title: 'Sweatshirts & Hoodies',
    description:
      'Prime sweatshirt printer in Jaipur. Customized woolens with soft fabric and durable stitching for corporates, companies, and shops. Breathable, wind-resistant designs available in multiple styles.',
    features: ['Quick Delivery', 'High-Quality Fabric', 'Fine Print Quality', 'Breathable & Wind-Resistant'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/564e4a74f39c30ede3ea2f262debe4a4.jpg', alt: 'Sweatshirt' },
      { src: 'https://www.thecrosswild.com/products_image/98475159d591ffdc68f5ed05821be0e9.jpg', alt: 'Hoodies' },
      { src: 'https://www.thecrosswild.com/products_image/ec96c104e6f55f8814b9071a92156210.jpg', alt: 'Sweaters' },
      { src: 'https://www.thecrosswild.com/products_image/5e582bc24b0af8858daeaa4c41d4febf.jpg', alt: 'Tracksuit' },
    ],
  },
  {
    slug: 'lowers',
    title: 'Lower & Shorts',
    description:
      'Comfortable and durable lower & shorts for sports teams, schools, gyms, and corporate events. Custom printing and branding available for bulk orders at competitive prices.',
    features: ['Comfortable Fit', 'Durable Fabric', 'Custom Branding', 'Bulk Orders Welcome'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/f5528e5386c99cd334f4dab763edbd92.jpg', alt: 'Sports Lower' },
      { src: 'https://www.thecrosswild.com/products_image/5e582bc24b0af8858daeaa4c41d4febf.jpg', alt: 'Tracksuit Lower' },
      { src: 'https://www.thecrosswild.com/products_image/7a6ba77b5a3ca04de4ef9479825461d1.jpg', alt: 'Sports Shorts' },
      { src: 'https://www.thecrosswild.com/products_image/ebe8c56622667e5d29c12316b2f7e8b1.jpg', alt: 'Casual Lower' },
    ],
  },
  {
    slug: 'printing',
    title: 'Printing & Embroidery',
    description:
      'Largest commercial printing company in Jaipur. We specialise in digital, screen, sublimation, and rubber printing on T-shirts, bags, caps, mugs, and sweatshirts. Bright, durable prints for bulk orders.',
    features: ['Digital Printing', 'Screen Printing', 'Sublimation Printing', 'Rubber Printing & Embroidery'],
    images: [
      { src: 'https://www.thecrosswild.com/products_image/eb85bc3c535700dfb594d1d6751244ac.jpg', alt: 'Digital Printing' },
      { src: 'https://www.thecrosswild.com/products_image/a34823c6ca08d69011b704e0e9551548.jpg', alt: 'Screen Printing' },
      { src: 'https://www.thecrosswild.com/products_image/4c2c70e121e7476fa095c187b6ab2a2e.jpg', alt: 'Sublimation Printing' },
      { src: 'https://www.thecrosswild.com/products_image/68ee7632b4a386af593eafa8458d17b8.jpg', alt: 'Rubber Printing' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb
        pageName="Our Services"
        description="Custom manufacturing of T-shirts, bags, caps, uniforms and more — bulk orders from ₹70/piece with pan-India delivery."
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Intro */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Manufacture
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The Cross Wild is Jaipur's trusted custom manufacturing partner since 2016. From T-shirts and bags to caps and uniforms, we handle bulk orders for corporates, schools, and businesses across India.
            </p>
          </div>

          {/* Service cards */}
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`flex flex-col lg:flex-row gap-10 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image grid */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
                  {service.images.map((img) => (
                    <div key={img.alt} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Text content */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getCategoryUrl(service.slug)}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    View {service.title} Products
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-10 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Place a Bulk Order?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Get a free quote for your custom printing requirements. Minimum order from 10 pieces.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
