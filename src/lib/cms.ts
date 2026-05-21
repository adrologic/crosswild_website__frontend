// Shared CMS fetchers for the new content-editability backend.
//
// All helpers:
//   - Use Next.js ISR with `revalidate: 60` (admin edits show up within a minute).
//   - Time out after 3s. If the backend is slow or down, callers fall back to
//     hardcoded defaults so SSR is never blocked.
//   - Return safe defaults on any error (empty list / null) — never throw.

const API_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '/api')
    : `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com'}/api`;

const REVALIDATE = 60;
const TIMEOUT_MS = 3000;

async function safeJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface Link { label: string; href: string; order?: number; children?: Link[]; }

export interface BranchOffice {
  city: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  mapLink?: string;
  order?: number;
}

export interface StatItem { label: string; value: string; icon?: string; order?: number; }

export interface SiteSettings {
  header: {
    logo: string;
    logoAlt: string;
    topBarPhone: string;
    topBarEmail: string;
    topBarLinks: Link[];
    navLinks: Link[];
    promoTicker: string[];
    customizeCTA: { label: string; whatsappUrl: string; emailMailto: string };
  };
  footer: {
    logo: string;
    companyDescription: string;
    copyrightText: string;
    bottomLinks: Link[];
    servicesLinks: Link[];
    quickLinks: Link[];
    newsletter: { enabled: boolean; heading: string; subheading: string; placeholder: string; buttonLabel: string };
    branchOffices: BranchOffice[];
  };
  contact: {
    primaryPhone: string;
    secondaryPhones: string[];
    primaryEmail: string;
    secondaryEmails: string[];
    whatsappNumber: string;
    whatsappPrefilledMessage: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      geo?: { lat: number; lng: number };
    };
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    pinterest: string;
    whatsapp: string;
  };
  floatingButtons: {
    call: { enabled: boolean; phone: string; ariaLabel: string };
    whatsapp: { enabled: boolean; url: string; ariaLabel: string };
  };
  layoutMeta: {
    themeColor: string;
    geoRegion: string;
    geoPlacename: string;
    geoPosition: string;
    icbm: string;
    googlebot: string;
    bingbot: string;
    faviconIco: string;
    appleTouchIcon: string;
  };
  stats: StatItem[];
  trustBadges: string[];
  personSchema: { name: string; jobTitle: string; worksFor: string };
}

export interface Testimonial { _id: string; name: string; designation: string; content: string; image: string; rating: number; }
export interface Brand { _id: string; name: string; logoImage: string; websiteUrl: string; }
export interface Deal { _id: string; title: string; discountLabel: string; description: string; badge?: string; link: string; image?: string; }
export interface Menu { key: string; items: Link[]; }
export interface PolicySection { heading: string; body: string; order?: number; }
export interface PolicyPage { slug: string; title: string; metaTitle: string; metaDescription: string; intro: string; sections: PolicySection[]; lastUpdated?: string; }
export interface GalleryItem { _id: string; title: string; alt: string; image: string; category?: string; }
export interface ServiceCard { _id: string; title: string; slug: string; intro: string; images: { url: string }[]; features: string[]; link: string; }
export interface WhyChooseReason { _id: string; text: string; icon?: string; }
export interface HomeCapability { _id: string; title: string; items: string[]; link: string; image?: string; }
export interface HomeProductHighlight { _id: string; title: string; image: string; link: string; }
export interface HomeWhyChoose { _id: string; number: string; title: string; description: string; }
export interface ProcessStep { _id: string; number: string; title: string; description: string; icon?: string; image?: string; page?: string; }
export interface CategoryHomeCard { _id: string; title: string; description: string; icon: string; link: string; popular: boolean; }
export interface SizeChartRow { label: string; chest: string; length: string; shoulder: string; }
export interface SizeChart { name: string; sizes: SizeChartRow[]; }

// ────────────────────────────────────────────────────────────────────────────
// Fetchers
// ────────────────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const data = await safeJson<{ settings?: SiteSettings }>(`/site-settings`, {});
  return data.settings ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await safeJson<{ testimonials?: Testimonial[] }>(`/testimonials?active=true`, {});
  return data.testimonials ?? [];
}

export async function getBrands(): Promise<Brand[]> {
  const data = await safeJson<{ brands?: Brand[] }>(`/brands?active=true`, {});
  return data.brands ?? [];
}

export async function getDeals(): Promise<Deal[]> {
  const data = await safeJson<{ deals?: Deal[] }>(`/deals?active=true`, {});
  return data.deals ?? [];
}

export async function getMenu(key: string): Promise<Menu | null> {
  const data = await safeJson<{ menu?: Menu }>(`/menus/${key}`, {});
  return data.menu ?? null;
}

export async function getPolicyPage(slug: string): Promise<PolicyPage | null> {
  const data = await safeJson<{ page?: PolicyPage }>(`/policy-pages/${slug}`, {});
  return data.page ?? null;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await safeJson<{ items?: GalleryItem[] }>(`/gallery?active=true`, {});
  return data.items ?? [];
}

export async function getServiceCards(): Promise<ServiceCard[]> {
  const data = await safeJson<{ items?: ServiceCard[] }>(`/service-cards?active=true`, {});
  return data.items ?? [];
}

export async function getWhyChooseReasons(): Promise<WhyChooseReason[]> {
  const data = await safeJson<{ items?: WhyChooseReason[] }>(`/why-choose-reasons?active=true`, {});
  return data.items ?? [];
}

export async function getHomeCapabilities(): Promise<HomeCapability[]> {
  const data = await safeJson<{ items?: HomeCapability[] }>(`/home-capabilities?active=true`, {});
  return data.items ?? [];
}

export async function getHomeProductHighlights(): Promise<HomeProductHighlight[]> {
  const data = await safeJson<{ items?: HomeProductHighlight[] }>(`/home-product-highlights?active=true`, {});
  return data.items ?? [];
}

export async function getHomeWhyChoose(): Promise<HomeWhyChoose[]> {
  const data = await safeJson<{ items?: HomeWhyChoose[] }>(`/home-why-choose?active=true`, {});
  return data.items ?? [];
}

export async function getProcessSteps(page?: 'home' | 'our-process'): Promise<ProcessStep[]> {
  const qs = page ? `?active=true&page=${page}` : '?active=true';
  const data = await safeJson<{ items?: ProcessStep[] }>(`/process-steps${qs}`, {});
  return data.items ?? [];
}

export async function getCategoryHomeCards(): Promise<CategoryHomeCard[]> {
  const data = await safeJson<{ items?: CategoryHomeCard[] }>(`/category-home-cards?active=true`, {});
  return data.items ?? [];
}

export async function getSizeChart(name: string = 'default'): Promise<SizeChart | null> {
  const data = await safeJson<{ chart?: SizeChart }>(`/size-charts/${encodeURIComponent(name)}`, {});
  return data.chart ?? null;
}

// Optional: per-page SEO (already exposed by the SEO backend route).
export interface PageSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}
export async function getPageSEO(path: string): Promise<PageSEO | null> {
  const data = await safeJson<{ seo?: PageSEO }>(`/seo/pages/${encodeURIComponent(path)}`, {});
  return data.seo ?? null;
}

// ────────────────────────────────────────────────────────────────────────────
// Public submission endpoints (client-side fetch from forms)
// ────────────────────────────────────────────────────────────────────────────

const CLIENT_API =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com'}/api`)
    : API_URL;

export async function subscribeEmail(email: string, source = 'footer'): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${CLIENT_API}/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function submitContact(payload: { name: string; email: string; phone?: string; message: string; source?: string }) {
  try {
    const res = await fetch(`${CLIENT_API}/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function submitQuote(payload: { name: string; email: string; phone?: string; enquiry: string; location?: string; source?: string }) {
  try {
    const res = await fetch(`${CLIENT_API}/quote-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error' };
  }
}
