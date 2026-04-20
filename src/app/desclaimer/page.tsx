import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Disclaimer | The Cross Wild',
  description: 'Read The Cross Wild\'s disclaimer regarding our custom printing and manufacturing services, product images, and pricing information.',
  alternates: { canonical: 'https://www.thecrosswild.com/desclaimer' },
};

export default function Disclaimer() {
  return (
    <>
      <Breadcrumb pageName="Disclaimer" description="Important information about our services and limitations." />
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg dark:prose-invert">
          <h1>Disclaimer</h1>
          <p><strong>Last updated:</strong> January 2024</p>

          <h2>Product Images</h2>
          <p>Product images shown on our website are for representation purposes only. The actual printed product may vary slightly in color due to differences in display screens and printing materials.</p>

          <h2>Pricing</h2>
          <p>Prices listed on our website are indicative and subject to change based on quantity, customization complexity, and material costs. Final pricing will be confirmed at the time of order.</p>

          <h2>Delivery Timelines</h2>
          <p>Estimated delivery timelines are provided in good faith but may vary due to factors outside our control including logistics, material availability, and order volume.</p>

          <h2>Accuracy of Information</h2>
          <p>While we strive to keep all information on our website accurate and up-to-date, we do not warrant the completeness or accuracy of the information provided.</p>

          <h2>Contact Us</h2>
          <p>For any questions, contact us at <a href="mailto:orders@thecrosswild.com">orders@thecrosswild.com</a> or call <a href="tel:+919529626262">+91-9529626262</a>.</p>
        </div>
      </section>
    </>
  );
}
