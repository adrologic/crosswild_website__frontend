// Top-level categories with dedicated keyword-rich SEO landing pages.
// These take precedence over the generic /category/<slug> route.
const CATEGORY_URL_MAP: Record<string, string> = {
  tshirts:     '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur',
  bags:        '/product/school-laptop-bag-manufacturer-in-Jaipur',
  caps:        '/product/cap-printing-manufacturer-in-jaipur',
  uniforms:    '/product/school-uniform',
  sweatshirts: '/product/sweatshirt-hoodie-manufacturer-in-Jaipur',
  printing:    '/product/printing',
  mugs:        '/product/mug-printing-in-Jaipur',
};

// Clean URL for a category — top-level categories with a dedicated SEO
// landing page get that page; everything else uses /category/<slug>.
export function getCategoryUrl(slug: string): string {
  return CATEGORY_URL_MAP[slug] || `/category/${slug}`;
}

// Sub-category URL — flat path, parent slug is intentionally omitted so
// URLs stay short (e.g. /category/cotton-t-shirts). Sub-category slugs are
// expected to be globally unique; pass the seoUrl when available.
export function getSubCategoryUrl(subSlug: string): string {
  return `/category/${subSlug}`;
}
