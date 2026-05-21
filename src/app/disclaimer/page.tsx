import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { getPolicyPage } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Disclaimer - The Cross Wild',
  description: 'Important information about the use of this website.',
  keywords: 'disclaimer',
  alternates: { canonical: 'https://www.thecrosswild.com/disclaimer' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.thecrosswild.com/disclaimer',
    siteName: 'The CrossWild',
    title: 'Disclaimer - The Cross Wild',
    description: 'Important information about the use of this website.',
  },
};

const FALLBACK_SECTIONS = [
  '<p>The information contained in this website is for general information purposes only. The information is provided by The Cross Wild and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>',
  '<p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>',
  '<p>Through this website you are able to link to other websites which are not under the control of The Cross Wild. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>',
  '<p>Every effort is made to keep the website up and running smoothly. However, The Cross Wild takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p>',
];

export default async function Disclaimer() {
  const page = await getPolicyPage('disclaimer');
  const title = page?.title || 'Disclaimer';
  const breadcrumbDesc = 'Important information about the use of this website.';

  return (
    <>
      <Breadcrumb pageName={title} description={breadcrumbDesc} />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h1>

          {page?.intro && (
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: page.intro }} />
          )}

          {(page?.sections?.length ?? 0) > 0 ? (
            <div className="space-y-8">
              {page!.sections.map((s, i) => (
                <div key={i}>
                  {s.heading && <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.heading}</h2>}
                  <div className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.body }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5 text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {FALLBACK_SECTIONS.map((html, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
