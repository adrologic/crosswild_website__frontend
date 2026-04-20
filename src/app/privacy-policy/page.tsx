import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Cross Wild',
  description: 'Read The Cross Wild\'s privacy policy. Learn how we collect, use, and protect your personal information when you use our custom printing and manufacturing services.',
  alternates: { canonical: 'https://www.thecrosswild.com/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Breadcrumb pageName="Privacy Policy" description="How we handle your data and protect your privacy." />
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p><strong>Last updated:</strong> January 2024</p>

          <h2>Information We Collect</h2>
          <p>When you place an order or contact us, we collect your name, email address, phone number, and shipping address to process your order and communicate with you.</p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To process and fulfill your custom printing orders</li>
            <li>To communicate about your order status</li>
            <li>To send promotional offers (only with your consent)</li>
            <li>To improve our website and services</li>
          </ul>

          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. We do not sell, trade, or transfer your personal information to third parties without your consent.</p>

          <h2>Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</p>

          <h2>Contact Us</h2>
          <p>For any privacy-related questions, contact us at <a href="mailto:orders@thecrosswild.com">orders@thecrosswild.com</a> or call <a href="tel:+919529626262">+91-9529626262</a>.</p>
        </div>
      </section>
    </>
  );
}
