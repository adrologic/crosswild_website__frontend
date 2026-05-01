import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Why Choose The Crosswild as a Trusted Partner for Custom Printing & Quality Craftsmanship',
  description: 'The Crosswild combines quality, affordability, and passion in custom printing. Experience superior service, competitive pricing, and designs tailored to your needs.',
  keywords: 'Why Choose Us, custom printing, quality craftsmanship, The Cross Wild',
  alternates: { canonical: 'https://www.thecrosswild.com/why-choose-us' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.thecrosswild.com/why-choose-us',
    siteName: 'The CrossWild',
    title: 'Why Choose The Crosswild as a Trusted Partner for Custom Printing & Quality Craftsmanship',
    description: 'The Crosswild combines quality, affordability, and passion in custom printing. Experience superior service, competitive pricing, and designs tailored to your needs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose The Crosswild as a Trusted Partner for Custom Printing & Quality Craftsmanship',
    description: 'The Crosswild combines quality, affordability, and passion in custom printing. Experience superior service, competitive pricing, and designs tailored to your needs.',
  },
};

const reasons = [
  'Timely Work',
  'Best Price',
  'Quality',
  'Service',
  'Experience',
  'Trust our work',
  'Quick response',
  'After delivery responsible',
  'Big team',
  'Check review',
  'The wide range of product',
];

export default function WhyChooseUs() {
  return (
    <>
      <Breadcrumb pageName="Why Choose Us" description="Quality, affordability, and passion — all in one place." />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Choose Us</h1>

          {/* Main content */}
          <div className="space-y-5 text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
            <p>
              When searching for a company to handle your custom printing needs a couple of factors come into play,
              the biggest is the quality of craftsmanship, customer service, and of course price. We pride ourselves
              on offering the best quality, if we didn&rsquo;t we would go out of business and we would rather have
              you as a lifelong customer. We pride ourselves on having the best customer service from the minute you
              call us to the time your order is complete! Last but not least is price, we try to stay competitive
              with the market but we will do our best to get you the very best price possible.
            </p>
            <p>
              Our main goal is to bring artwork to life, we enjoy designing and producing clothing for anyone&rsquo;s
              needs. The difference between us and the other companies is we enjoy what we do; this isn&rsquo;t just
              a business for us, we offer our services but we also own and operate our own clothing line. So when you
              are searching for a company to handle your needs you can rest assured you will be in good hands with us!
            </p>
          </div>

          {/* Reasons grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
              >
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">{reason}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
