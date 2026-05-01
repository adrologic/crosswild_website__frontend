import { Metadata } from 'next';
import Breadcrumb from '@/components/Common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Cross Wild',
  description: 'This privacy policy has been compiled to better serve those concerned with how their Personally identifiable information (PII) is being used online at The Cross Wild.',
  alternates: { canonical: 'https://www.thecrosswild.com/privacy-policy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Breadcrumb pageName="Privacy Policy" description="How we handle your data and protect your privacy." />

      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="w-full px-6 lg:px-16 xl:px-24 max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            This privacy policy has been compiled to better serve those concerned with how their &ldquo;Personally
            identifiable information&rdquo; (PII) is being used online. PII encompasses information identifying
            individuals or enabling contact.
          </p>

          <PolicySection title="When do we collect information?">
            <p>We collect information from you when you register on our site, fill out a form or enter information on our site.</p>
            <p className="mt-3 font-semibold">What personal information do we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name, email address, phone number, Company Details or other details</li>
            </ul>
          </PolicySection>

          <PolicySection title="How do we use your information?">
            <p>
              We may use the information we collect from you when you register, make a purchase, sign up for our newsletter,
              respond to a survey or marketing communication, surf the website, or use certain other site features in the
              following ways:
            </p>
          </PolicySection>

          <PolicySection title="How do we protect visitor information?">
            <p>
              Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your
              visit to our site as safe as possible.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>We use regular Malware Scanning.</li>
              <li>We do not use an SSL certificate.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Do we use 'cookies'?">
            <p>
              Yes. Cookies are small files that a site or its service provider transfers to your computer&rsquo;s hard drive
              through your Web browser (if you allow) that enables the site&rsquo;s or service provider&rsquo;s systems to
              recognize your browser and capture and remember certain information. For instance, we use cookies to help us
              remember and process the items in your shopping cart. They are also used to help us understand your preferences
              based on previous or current site activity, which enables us to provide you with improved services. We also use
              cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better
              site experiences and tools in the future.
            </p>
          </PolicySection>

          <PolicySection title="We use cookies to:">
            <p>
              Compile aggregate data about site traffic and site interactions in order to offer better site experiences and
              tools in the future. We may also use trusted third party services that track this information on our behalf.
            </p>
            <p className="mt-3">
              You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off
              all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little
              different, so look at your browser&rsquo;s Help menu to learn the correct way to modify your cookies.
            </p>
            <p className="mt-3">
              If you disable cookies off, some features will be disabled. It won&rsquo;t affect the users experience that
              make your site experience more efficient and some of our services will not function properly. However, you can
              still place orders.
            </p>
          </PolicySection>

          <PolicySection title="Third Party Disclosure">
            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</p>
          </PolicySection>

          <PolicySection title="Third party links">
            <p>We do not include or offer third party products or services on our website.</p>
          </PolicySection>

          <PolicySection title="Google">
            <p>
              Google&rsquo;s advertising requirements can be summed up by Google&rsquo;s Advertising Principles. They are
              put in place to provide a positive experience for users. We use Google Ad Sense Advertising on our website.
            </p>
            <p className="mt-3">
              Google, as a third party vendor, uses cookies to serve ads on our site. Google&rsquo;s use of the DART cookie
              enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users
              may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
            </p>
          </PolicySection>

          <PolicySection title="We have implemented the following:">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">Remarketing with Google AdSense</h3>
            <p>
              We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics
              cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together
              to compile data regarding user interactions with ad impressions, and other ad service functions as they relate
              to our website.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">Opting out:</h3>
            <p>
              Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively,
              you can opt out by visiting the Network Advertising initiative opt out page or permanently using the Google
              Analytics Opt Out Browser add on.
            </p>
          </PolicySection>

          <PolicySection title="Fair Information Practices">
            <p>
              The Fair Information Practices Principles form the backbone of privacy law in the United States and the
              concepts they include have played a significant role in the development of data protection laws around the
              globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical
              to comply with the various privacy laws that protect personal information.
            </p>
            <p className="mt-3">
              In order to be in line with Fair Information Practices we will take the following responsive action, should
              a data breach occur:
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">
              We will notify the users via email Within 7 business days
            </h3>
            <p>
              We also agree to the individual redress principle, which requires that individuals have a right to pursue
              legally enforceable rights against data collectors and processors who fail to adhere to the law. This
              principle requires not only that individuals have enforceable rights against data users, but also that
              individuals have recourse to courts or a government agency to investigate and/or prosecute non-compliance by
              data processors.
            </p>
          </PolicySection>

          <PolicySection title="CAN SPAM Act">
            <p>
              The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial
              messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough
              penalties for violations.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">
              We collect your email address in order to:
            </h3>
            <p>To be in accordance with CANSPAM we agree to the following:</p>
            <p className="mt-3">
              If at any time you would like to unsubscribe from receiving future emails, you can email us and we will
              promptly remove you from ALL correspondence.
            </p>
          </PolicySection>

          <PolicySection title="Contacting Us">
            <p>If there are any questions regarding this privacy policy you may contact us using the information below.</p>
            <address className="not-italic mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>thecrosswild.com</strong><br />
              D-8, Near World Trade Park, Malviya Nagar, Jaipur<br />
              <a href="mailto:orders@thecrosswild.com" className="text-primary hover:underline">
                orders@thecrosswild.com
              </a>
            </address>
          </PolicySection>

        </div>
      </section>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-100 dark:border-gray-800 last:border-0 last:mb-0 last:pb-0">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  );
}
