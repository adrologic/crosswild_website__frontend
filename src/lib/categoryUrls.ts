// Maps category slug → keyword-rich SEO URL (matching old site URL structure)
// Falls back to /products?category=slug for categories without a dedicated page
const CATEGORY_URL_MAP: Record<string, string> = {
  tshirts:     '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur',
  bags:        '/product/school-laptop-bag-manufacturer-in-Jaipur',
  caps:        '/product/cap-printing-manufacturer-in-jaipur',
  uniforms:    '/product/school-uniform',
  sweatshirts: '/product/sweatshirt-hoodie-manufacturer-in-Jaipur',
  printing:    '/product/printing',
  mugs:        '/product/mug-printing-in-Jaipur',
};

export function getCategoryUrl(slug: string): string {
  return CATEGORY_URL_MAP[slug] || `/products?category=${slug}`;
}

// For sub-category links always keep query param format
export function getSubCategoryUrl(categorySlug: string, subSlug: string): string {
  return `/products?category=${categorySlug}&sub=${subSlug}`;
}
