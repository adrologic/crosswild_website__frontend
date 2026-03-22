"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { seoAPI, type GlobalSEO } from '@/lib/api';
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: object;
  breadcrumbItems?: { name: string; url: string }[];
  faqItems?: { question: string; answer: string }[];
}

export default function SEOHead({
  title,
  structuredData,
  breadcrumbItems,
  faqItems,
}: SEOHeadProps) {
  const [globalSEO, setGlobalSEO] = useState<GlobalSEO | null>(null);
  const [schemasData, setSchemasData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const loadGlobalSEO = async () => {
      try {
        const response = await seoAPI.getGlobalSettings();
        setGlobalSEO(response.settings);
      } catch (error) {
        console.log('SEO settings not available');
      }
    };

    const loadSchemas = async () => {
      try {
        const response = await fetch('/api/seo/schemas');
        if (response.ok) {
          const data = await response.json();
          setSchemasData(data);
        }
      } catch (error) {
        // Schemas endpoint optional
      }
    };

    loadGlobalSEO();
    loadSchemas();
  }, [isClient]);

  // Generate page title
  const pageTitle = title
    ? globalSEO?.titleTemplate?.replace('%s', title) || `${title} | The CrossWild`
    : globalSEO?.defaultTitle || 'The CrossWild - Custom Printing & Promotional Merchandise';

  // Update document title in effect to avoid hydration issues
  useEffect(() => {
    if (isClient && pageTitle) {
      document.title = pageTitle;
    }
  }, [isClient, pageTitle]);

  // Update favicon dynamically from admin panel
  useEffect(() => {
    if (!isClient || !globalSEO?.favicon) return;
    const link = document.getElementById('favicon') as HTMLLinkElement || document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      link.href = globalSEO.favicon;
    }
  }, [isClient, globalSEO?.favicon]);

  // Don't render anything until client-side
  if (!isClient) {
    return null;
  }

  return (
    <>

      {/* Google Analytics */}
      {globalSEO?.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${globalSEO.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {globalSEO?.googleTagManagerId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalSEO.googleTagManagerId}');
          `}
        </Script>
      )}

      {/* Facebook Pixel */}
      {globalSEO?.facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${globalSEO.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Custom Structured Data */}
      {structuredData && (
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Organization Schema */}
      {globalSEO && (
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': globalSEO.organizationSchema?.type || 'Organization',
              name: globalSEO.organizationSchema?.name || globalSEO.siteName,
              url: globalSEO.siteUrl,
              logo: globalSEO.organizationSchema?.logo,
              description: globalSEO.organizationSchema?.description || globalSEO.defaultDescription,
              contactPoint: globalSEO.contactInfo ? {
                '@type': 'ContactPoint',
                telephone: globalSEO.contactInfo.phone,
                email: globalSEO.contactInfo.email,
                contactType: 'customer service',
              } : undefined,
              sameAs: [
                globalSEO.socialLinks?.facebook,
                globalSEO.socialLinks?.twitter,
                globalSEO.socialLinks?.instagram,
                globalSEO.socialLinks?.linkedin,
                globalSEO.socialLinks?.youtube,
              ].filter(Boolean),
            }),
          }}
        />
      )}

      {/* LocalBusiness Schema */}
      {globalSEO && (
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema(
              schemasData?.localBusiness
                ? { ...globalSEO, localBusiness: schemasData.localBusiness }
                : globalSEO
            )),
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
          }}
        />
      )}

      {/* FAQ Schema */}
      {faqItems && faqItems.length > 0 && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqItems)),
          }}
        />
      )}

      {/* Dynamic FAQ from backend */}
      {schemasData?.faqItems && schemasData.faqItems.length > 0 && !faqItems && (
        <Script
          id="faq-schema-backend"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(schemasData.faqItems)),
          }}
        />
      )}
    </>
  );
}

// Product SEO component
export function ProductSEO({ product, breadcrumbItems }: { product: any; breadcrumbItems?: { name: string; url: string }[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'The CrossWild',
    },
    offers: {
      '@type': 'Offer',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: 'INR',
      price: product.price || 0,
    },
    ...(product.reviews > 0 && product.rating > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
        bestRating: 5,
        worstRating: 1,
      },
    } : {}),
  };

  return (
    <SEOHead
      title={product.seo?.title || product.name}
      description={product.seo?.description || product.description?.substring(0, 160)}
      keywords={product.seo?.keywords || [product.name, product.category, 'custom printing']}
      ogImage={product.seo?.ogImage || product.image}
      structuredData={structuredData}
      breadcrumbItems={breadcrumbItems}
    />
  );
}

// Blog SEO component
export function BlogSEO({ blog, breadcrumbItems }: { blog: any; breadcrumbItems?: { name: string; url: string }[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.paragraph?.substring(0, 160),
    image: blog.image,
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'The CrossWild',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The CrossWild',
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
  };

  return (
    <SEOHead
      title={blog.seo?.title || blog.title}
      description={blog.seo?.description || blog.paragraph?.substring(0, 160)}
      keywords={blog.seo?.keywords || blog.tags}
      ogImage={blog.seo?.ogImage || blog.image}
      structuredData={structuredData}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
