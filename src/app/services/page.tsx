import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { getServiceCards } from '@/lib/cms';
import { getSection } from '@/lib/content';

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

export default async function ServicesPage() {
  const [services, introSection, ctaSection] = await Promise.all([
    getServiceCards(),
    getSection('services', 'intro').catch(() => null),
    getSection('services', 'cta').catch(() => null),
  ]);

  const intro = introSection || {} as Record<string, unknown>;
  const cta = ctaSection || {} as Record<string, unknown>;

  // Fallback to hardcoded copy if backend is offline
  const breadcrumbDesc = (intro as any).breadcrumbDescription as string ||
    'Custom manufacturing of T-shirts, bags, caps, uniforms and more — bulk orders from ₹70/piece with pan-India delivery.';
  const introHeading = (intro as any).heading as string || 'What We Manufacture';
  const introParagraph = (intro as any).paragraph as string ||
    "The Cross Wild is Jaipur's trusted custom manufacturing partner since 2016. From T-shirts and bags to caps and uniforms, we handle bulk orders for corporates, schools, and businesses across India.";
  const ctaHeading = (cta as any).heading as string || 'Ready to Place a Bulk Order?';
  const ctaParagraph = (cta as any).paragraph as string || 'Get a free quote for your custom printing requirements. Minimum order from 10 pieces.';
  const ctaLabel = (cta as any).buttonLabel as string || 'Get a Free Quote';
  const ctaHref = (cta as any).buttonHref as string || '/contact-us';

  return (
    <>
      <Breadcrumb pageName="Our Services" description={breadcrumbDesc} />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{introHeading}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{introParagraph}</p>
          </div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service._id}
                className={`flex flex-col lg:flex-row gap-10 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
                  {(service.images || []).slice(0, 4).map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={img.url}
                        alt={`${service.title} ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

                <div className="w-full lg:w-1/2 space-y-5">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {service.intro}
                  </p>
                  <ul className="space-y-2">
                    {(service.features || []).map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                      View {service.title} Products
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-primary/5 dark:bg-primary/10 rounded-2xl p-10 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{ctaHeading}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">{ctaParagraph}</p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
