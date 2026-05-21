import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPolicyPage } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Cross Wild',
  description: 'This privacy policy has been compiled to better serve those concerned with how their Personally identifiable information (PII) is being used online at The Cross Wild.',
  alternates: { canonical: 'https://www.thecrosswild.com/privacy-policy' },
  robots: { index: true, follow: true },
};

export default async function PrivacyPolicy() {
  const page = await getPolicyPage('privacy-policy');
  const title = page?.title || 'Privacy Policy';
  const breadcrumbDesc = 'How we handle your data and protect your privacy.';

  return (
    <>
      <Breadcrumb pageName={title} description={breadcrumbDesc} />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>

          {page?.intro && (
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: page.intro }} />
          )}

          {page?.sections?.length ? (
            <div>
              {page.sections.map((s, i) => (
                <div key={i} className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800 last:border-0 last:mb-0 last:pb-0">
                  {s.heading && <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.heading}</h2>}
                  <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]" dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Privacy policy content is being prepared. Please check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
