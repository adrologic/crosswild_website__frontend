import { Metadata } from 'next';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

// Default SEO values (fallback if API fails)
const defaultSEO = {
  siteName: 'The Cross Wild',
  siteUrl: 'https://www.thecrosswild.com',
  defaultTitle: 'Manufacturers of Custom T-shirts, Bags & Caps in Jaipur, India | The Cross Wild',
  titleTemplate: '%s | The Cross Wild',
  defaultDescription: 'The Cross Wild is India\'s trusted custom T-shirt, bags, and caps manufacturer in Jaipur since 2016. Bulk printing, corporate promotional products, and uniforms. Prices from ₹70/piece. Fast delivery across India.',
  defaultKeywords: [
    'custom t-shirt manufacturer Jaipur',
    'promotional t-shirt printing India',
    'bags manufacturer Jaipur',
    'cap printing manufacturer Jaipur',
    'bulk t-shirt printing',
    'corporate promotional products',
    'custom uniform manufacturer',
    'mug printing Jaipur',
    'promotional merchandise India',
    'The Cross Wild',
  ],
  defaultOgImage: '/images/og-default.jpg',
};

// Fetch global SEO settings from API
export async function getGlobalSEO() {
  try {
    const response = await fetch(`${API_URL}/seo/global`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return defaultSEO;
    const data = await response.json();
    return data.settings || defaultSEO;
  } catch {
    return defaultSEO;
  }
}

// Fetch page-specific SEO from API
export async function getPageSEO(path: string) {
  try {
    const response = await fetch(`${API_URL}/seo/pages/${encodeURIComponent(path)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.page;
  } catch {
    return null;
  }
}

// Generate metadata for a page
export async function generatePageMetadata(
  path: string,
  customData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
  }
): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();
  const pageSEO = await getPageSEO(path);

  // Merge: page SEO (admin-controlled) > custom data fallback > global defaults
  const title = pageSEO?.title || customData?.title || globalSEO.defaultTitle;
  const description = pageSEO?.description || customData?.description || globalSEO.defaultDescription;
  const keywords = pageSEO?.keywords?.length ? pageSEO.keywords : (customData?.keywords || globalSEO.defaultKeywords || []);
  const ogImage = pageSEO?.ogImage || customData?.image || globalSEO.defaultOgImage;
  const noIndex = pageSEO?.noIndex ?? customData?.noIndex ?? false;

  const siteUrl = globalSEO.siteUrl || defaultSEO.siteUrl;
  const canonicalUrl = pageSEO?.canonicalUrl || `${siteUrl}${path}`;

  return {
    title: {
      default: title,
      template: globalSEO.titleTemplate || defaultSEO.titleTemplate,
    },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: globalSEO.siteName || defaultSEO.siteName }],
    creator: globalSEO.siteName || defaultSEO.siteName,
    publisher: globalSEO.siteName || defaultSEO.siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-IN': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `${siteUrl}${path}`,
      siteName: globalSEO.siteName || defaultSEO.siteName,
      title: pageSEO?.ogTitle || title,
      description: pageSEO?.ogDescription || description,
      images: ogImage ? [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO?.ogTitle || title,
      description: pageSEO?.ogDescription || description,
      images: ogImage ? [ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`] : undefined,
    },
    robots: {
      index: !noIndex,
      follow: !pageSEO?.noFollow,
      googleBot: {
        index: !noIndex,
        follow: !pageSEO?.noFollow,
      },
    },
    verification: {
      google: globalSEO.googleSiteVerification,
    },
  };
}

// Generate product metadata
export async function generateProductMetadata(product: {
  id: string;
  slug?: string;
  name: string;
  description: string;
  image?: string;
  category?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
}): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();
  const siteUrl = globalSEO.siteUrl || defaultSEO.siteUrl;

  // Use slug for URL if available, otherwise fallback to ID
  const urlPath = product.slug || product.id;
  const title = product.seo?.title || product.name;
  const description = product.seo?.description || product.description.substring(0, 160);
  const image = product.seo?.ogImage || product.image;
  const keywords = product.seo?.keywords || [product.name, product.category, 'custom printing'].filter(Boolean);
  const canonicalUrl = product.seo?.canonicalUrl || `${siteUrl}/products/${urlPath}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !product.seo?.noIndex,
      follow: !product.seo?.noFollow,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/products/${urlPath}`,
      siteName: globalSEO.siteName || defaultSEO.siteName,
      title,
      description,
      images: image ? [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image.startsWith('http') ? image : `${siteUrl}${image}`] : undefined,
    },
  };
}

// Generate blog metadata
export async function generateBlogMetadata(blog: {
  id: string;
  slug?: string;
  title: string;
  paragraph: string;
  image?: string;
  author?: { name: string };
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
}): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();
  const siteUrl = globalSEO.siteUrl || defaultSEO.siteUrl;

  // Use slug for URL if available, otherwise fallback to ID
  const urlPath = blog.slug || blog.id;
  const title = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.paragraph.substring(0, 160);
  const image = blog.seo?.ogImage || blog.image;
  const keywords = blog.seo?.keywords || blog.tags || [];
  const canonicalUrl = blog.seo?.canonicalUrl || `${siteUrl}/blog/${urlPath}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: blog.author ? [{ name: blog.author.name }] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !blog.seo?.noIndex,
      follow: !blog.seo?.noFollow,
    },
    openGraph: {
      type: 'article',
      url: `${siteUrl}/blog/${urlPath}`,
      siteName: globalSEO.siteName || defaultSEO.siteName,
      title,
      description,
      images: image ? [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image.startsWith('http') ? image : `${siteUrl}${image}`] : undefined,
    },
  };
}

// Generate category metadata
export async function generateCategoryMetadata(category: {
  id: string;
  name: string;
  description?: string;
  image?: string;
  seoUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
}): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();
  const siteUrl = globalSEO.siteUrl || defaultSEO.siteUrl;

  const urlPath = category.seoUrl || category.id;
  const title = category.seo?.title || `${category.name} - ${globalSEO.siteName || defaultSEO.siteName}`;
  const plainDesc = category.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
  const description = category.seo?.description || plainDesc || `Browse ${category.name} at The CrossWild. Premium quality custom printing and merchandise.`;
  const image = category.seo?.ogImage || category.image;
  const keywords = category.seo?.keywords || [category.name, 'custom printing', 'The CrossWild'].filter(Boolean);
  const canonicalUrl = category.seo?.canonicalUrl || `${siteUrl}/categories/${urlPath}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !category.seo?.noIndex,
      follow: !category.seo?.noFollow,
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/categories/${urlPath}`,
      siteName: globalSEO.siteName || defaultSEO.siteName,
      title,
      description,
      images: image ? [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image.startsWith('http') ? image : `${siteUrl}${image}`] : undefined,
    },
  };
}

// Generate category JSON-LD schema
export function generateCategorySchema(category: any, subcategories: any[], siteUrl: string) {
  const urlPath = category.seoUrl || category.id;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.seo?.description || category.description?.replace(/<[^>]*>/g, '').substring(0, 300),
    url: `${siteUrl}/categories/${urlPath}`,
    image: category.image || undefined,
    isPartOf: {
      '@type': 'WebSite',
      name: 'The CrossWild',
      url: siteUrl,
    },
    hasPart: subcategories.map((sub: any) => ({
      '@type': 'CollectionPage',
      name: sub.name,
      url: `${siteUrl}/categories/${sub.seoUrl || sub.id}`,
    })),
  };
}

// Generate JSON-LD structured data
export function generateOrganizationSchema(globalSEO: any) {
  return {
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
    address: globalSEO.contactInfo?.address ? {
      '@type': 'PostalAddress',
      streetAddress: globalSEO.contactInfo.address.street,
      addressLocality: globalSEO.contactInfo.address.city,
      addressRegion: globalSEO.contactInfo.address.state,
      postalCode: globalSEO.contactInfo.address.postalCode,
      addressCountry: globalSEO.contactInfo.address.country,
    } : undefined,
    sameAs: [
      globalSEO.socialLinks?.facebook,
      globalSEO.socialLinks?.twitter,
      globalSEO.socialLinks?.instagram,
      globalSEO.socialLinks?.linkedin,
      globalSEO.socialLinks?.youtube,
    ].filter(Boolean),
  };
}

export function generateProductSchema(product: any, siteUrl: string) {
  const urlPath = product.slug || product.id;
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku || undefined,
    url: `${siteUrl}/products/${urlPath}`,
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
  };

  // Add aggregate rating if reviews exist
  if (product.reviews && product.reviews > 0 && product.rating && product.rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function generateBlogSchema(blog: any, siteUrl: string) {
  const urlPath = blog.slug || blog.id;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.paragraph?.substring(0, 160),
    image: blog.image,
    url: `${siteUrl}/blog/${urlPath}`,
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
}

// Generate LocalBusiness JSON-LD schema
export function generateLocalBusinessSchema(globalSEO: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: globalSEO.organizationSchema?.name || globalSEO.siteName || 'The CrossWild',
    url: globalSEO.siteUrl || 'https://thecrosswild.com',
    telephone: globalSEO.contactInfo?.phone,
    email: globalSEO.contactInfo?.email,
    image: globalSEO.organizationSchema?.logo,
    description: globalSEO.organizationSchema?.description || globalSEO.defaultDescription,
    priceRange: globalSEO.localBusiness?.priceRange || '₹₹',
    openingHours: globalSEO.localBusiness?.openingHours || 'Mo-Sa 09:00-18:00',
    address: globalSEO.contactInfo?.address ? {
      '@type': 'PostalAddress',
      streetAddress: globalSEO.contactInfo.address.street,
      addressLocality: globalSEO.contactInfo.address.city,
      addressRegion: globalSEO.contactInfo.address.state || 'India',
      postalCode: globalSEO.contactInfo.address.postalCode,
      addressCountry: 'IN',
    } : undefined,
    sameAs: [
      globalSEO.socialLinks?.facebook,
      globalSEO.socialLinks?.twitter,
      globalSEO.socialLinks?.instagram,
      globalSEO.socialLinks?.linkedin,
      globalSEO.socialLinks?.youtube,
    ].filter(Boolean),
  };
}

// Generate BreadcrumbList JSON-LD schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate FAQPage JSON-LD schema
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Default FAQ items for homepage and products page
export const defaultFAQs = [
  {
    question: 'What is the minimum order quantity for custom merchandise?',
    answer: 'Our minimum order quantity varies by product. For custom t-shirts, it starts at 10 pieces. For caps, bags, and other merchandise, the minimum is typically 25 pieces. Contact us for specific requirements.',
  },
  {
    question: 'How long does delivery take for custom orders?',
    answer: 'Standard delivery for custom orders takes 7-14 business days after design approval. Rush orders can be completed in 3-5 business days for an additional fee. Delivery time may vary based on order size and customization complexity.',
  },
  {
    question: 'What customization options are available?',
    answer: 'We offer screen printing, digital printing, sublimation printing, embroidery, and heat transfer. You can customize with your logo, brand colors, text, and artwork on t-shirts, caps, bags, uniforms, and more.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including bank transfer (NEFT/RTGS), UPI, credit/debit cards, and cash on delivery for select orders. For bulk orders, we offer flexible payment terms with 50% advance.',
  },
  {
    question: 'Do you offer bulk pricing discounts?',
    answer: 'Yes, we offer tiered pricing with significant discounts for bulk orders. The more you order, the lower the per-unit cost. Contact us with your quantity requirements for a custom quote.',
  },
];
