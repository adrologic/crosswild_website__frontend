import type { Metadata } from "next";
import CrosswildHeader from "@/components/Header/CrosswildHeader";
import CrosswildFooter from "@/components/Footer/CrosswildFooter";
import LocationsStrip from "@/components/Locations/LocationsStrip";
import DeferredWidgets from "@/components/DeferredWidgets";
import SEOHead from "@/components/SEO/SEOHead";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import { getGlobalSEO } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecrosswild.com"),
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

async function getSchemas() {
  try {
    const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';
    const res = await fetch(`${API_URL}/seo/schemas`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [globalSEO, schemas] = await Promise.all([getGlobalSEO(), getSchemas()]);

  const org   = globalSEO.organizationSchema || {};
  const social = globalSEO.socialLinks || {};
  const contact = globalSEO.contactInfo || {};
  const lb    = schemas?.localBusiness || {};
  const faqItems: { question: string; answer: string }[] = schemas?.faqItems || [];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": org.type || "Organization",
    "name": org.name || globalSEO.siteName || "The Cross Wild",
    "url": globalSEO.siteUrl || "https://www.thecrosswild.com",
    "logo": org.logo || `${globalSEO.siteUrl}/images/logo/logo-crosswile.jpg`,
    "description": org.description || globalSEO.defaultDescription,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contact.phone || "+91-9529626262",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
    },
    "sameAs": [
      social.facebook, social.twitter, social.instagram,
      social.youtube, social.linkedin, social.pinterest,
    ].filter(Boolean),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": org.name || "The Cross Wild",
    "image": org.logo || `${globalSEO.siteUrl}/images/logo/logo-crosswile.jpg`,
    "priceRange": lb.priceRange || "₹70–₹300",
    "telephone": lb.telephone || contact.phone || "+91-9529626262",
    "openingHours": lb.openingHours || "Mo-Sa 09:00-19:30",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": lb.address?.street  || contact.address?.street  || "D-8, Near World Trade Park, Malviya Nagar",
      "addressLocality": lb.address?.city  || contact.address?.city    || "Jaipur",
      "addressRegion": lb.address?.state   || contact.address?.state   || "Rajasthan",
      "postalCode": lb.address?.postalCode || contact.address?.postalCode || "302017",
      "addressCountry": "IN",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 26.8517696, "longitude": 75.8062041 },
    "url": globalSEO.siteUrl || "https://www.thecrosswild.com",
  };

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  } : null;

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" id="favicon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563EB" />

        {/* Resource hints — speed up the critical path by warming connections to known origins */}
        <link rel="preconnect" href="https://www.thecrosswild.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.thecrosswild.com" />
        <link rel="preconnect" href="https://crosswild-backend-p5l3.onrender.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://crosswild-backend-p5l3.onrender.com" />

        {/* Organization Schema — dynamic from admin */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

        {/* LocalBusiness Schema — dynamic from admin */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

        {/* FAQ Schema — rendered only if FAQs are configured in admin */}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}

        {/* Person Schema — Director */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Mahendra Choudhary",
          "jobTitle": "Director",
          "worksFor": { "@type": "Organization", "name": "The Cross Wild" },
        }) }} />

        {/* Geographic meta tags */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur" />
        <meta name="geo.position" content="26.8517696;75.8062041" />
        <meta name="ICBM" content="26.8517696, 75.8062041" />

        {/* Language & author */}
        <meta name="language" content="English" />
        <meta name="author" content="Mahendra Choudhary" />

        {/* Search bot directives */}
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        {/* Business contact Open Graph */}
        <meta property="business:contact_data:street_address" content="D-8, Near World Trade Park, Malviya Nagar" />
        <meta property="business:contact_data:locality" content="Jaipur" />
        <meta property="business:contact_data:region" content="Rajasthan" />
        <meta property="business:contact_data:postal_code" content="302017" />
        <meta property="business:contact_data:country_name" content="India" />
        <meta property="business:contact_data:email" content="orders@thecrosswild.com" />
        <meta property="business:contact_data:phone_number" content="+91-9529626262" />
        <meta property="business:contact_data:website" content="https://www.thecrosswild.com/" />

        {/* Custom head scripts from admin */}
        {globalSEO.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: globalSEO.customHeadScripts }} />
        )}
      </head>
      <body className={`overflow-x-hidden bg-theme-bg text-theme-text transition-colors duration-200 ${inter.className}`}>
        {/* GTM / GA / Facebook Pixel are loaded inside <SEOHead /> using next/script with lazyOnload — see SEOHead.tsx */}
        <Providers>
          <SEOHead />
          <CrosswildHeader />
          {children}
          <LocationsStrip />
          <CrosswildFooter />
          <DeferredWidgets />
        </Providers>
      </body>
    </html>
  );
}
