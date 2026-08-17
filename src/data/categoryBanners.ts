/**
 * Designed banner per product category, shown at the top of its category page.
 *
 * Each one is a photographic panel with its own headline and feature callouts
 * baked in, so nothing is drawn over it and it is never cropped — see
 * ThemeBanner. They read correctly on both light and dark grounds, so there is
 * one file per category rather than a pair.
 *
 * Keyed by the Category `id` (not `seoUrl` — the two differ for some
 * sub-categories). A sub-category with no banner of its own falls back to its
 * parent's, so /category/laptop-bags still gets the Bags banner.
 */

export interface CategoryBanner {
  src: string;
  alt: string;
  /** Natural ratio of the artwork, so it renders uncropped. */
  aspectRatio: string;
}

const BANNERS: Record<string, CategoryBanner> = {
  tshirts: {
    src: '/banners/categories/tshirts.webp',
    alt: 'Manufacturing premium apparel — quality, consistency, your brand. Custom t-shirts made with premium fabrics, precision cutting, quality stitching and custom printing, for brands, corporates and events.',
    aspectRatio: '1672 / 941',
  },
  bags: {
    src: '/banners/categories/bags.webp',
    alt: 'Custom bags made from durable, tear-resistant fabric with a front zip pocket, adjustable strap and water-resistant finish — compact and practical for everyday use.',
    aspectRatio: '1536 / 1024',
  },
  caps: {
    src: '/banners/categories/caps.webp',
    alt: 'Custom caps manufactured and embroidered in bulk for brands, teams and events.',
    aspectRatio: '1536 / 1024',
  },
  sweatshirts: {
    src: '/banners/categories/sweatshirts.webp',
    alt: 'Custom sweatshirts and hoodies manufactured in bulk, with your own printing or embroidery.',
    aspectRatio: '1536 / 1024',
  },
  lowers: {
    src: '/banners/categories/lowers.webp',
    alt: 'Custom lowers and shorts manufactured in bulk for teams, gyms and sportswear brands.',
    aspectRatio: '1536 / 1024',
  },
  uniforms: {
    src: '/banners/categories/uniforms.webp',
    alt: 'School and office uniforms manufactured to order, with school crests and company branding.',
    aspectRatio: '1672 / 941',
  },
  printing: {
    src: '/banners/categories/printing.webp',
    alt: 'Printing and embroidery services — screen printing, DTF, DTG, puff printing and embroidery on apparel.',
    aspectRatio: '1536 / 1024',
  },
  apron: {
    src: '/banners/categories/apron.webp',
    alt: 'Custom aprons manufactured in bulk for restaurants, cafés, hotels and events.',
    aspectRatio: '1536 / 1024',
  },
  'chef-coat': {
    src: '/banners/categories/chef-coat.webp',
    alt: 'Custom chef coats manufactured in bulk for restaurants, hotels and catering teams.',
    aspectRatio: '1672 / 941',
  },
  raincoats: {
    src: '/banners/categories/raincoats.webp',
    alt: 'Custom raincoats manufactured in bulk for staff, delivery fleets and promotional use.',
    aspectRatio: '1672 / 941',
  },
};

/**
 * The banner for a category, falling back to the parent's when a sub-category
 * has none of its own. Returns null when neither has one, so the page simply
 * renders without a banner.
 */
export function getCategoryBanner(
  categoryId?: string | null,
  parentId?: string | null
): CategoryBanner | null {
  if (categoryId && BANNERS[categoryId]) return BANNERS[categoryId];
  if (parentId && BANNERS[parentId]) return BANNERS[parentId];
  return null;
}

/**
 * Match a free-text card title from the CMS ("Apron & Chef Coat", "School &
 * Office Uniform") to a banner. The home-page cards are edited in the admin
 * panel, so they carry a label rather than a category id — the first keyword
 * that appears wins, longest first so "chef coat" beats "coat".
 */
const TITLE_KEYWORDS: Array<[string, string]> = [
  ['sweatshirt', 'sweatshirts'],
  ['hoodie', 'sweatshirts'],
  ['chef coat', 'chef-coat'],
  ['chef', 'chef-coat'],
  ['apron', 'apron'],
  ['raincoat', 'raincoats'],
  ['rain coat', 'raincoats'],
  ['uniform', 'uniforms'],
  ['printing', 'printing'],
  ['embroidery', 'printing'],
  ['t-shirt', 'tshirts'],
  ['tshirt', 'tshirts'],
  ['tee', 'tshirts'],
  ['bag', 'bags'],
  ['cap', 'caps'],
  ['lower', 'lowers'],
  ['short', 'lowers'],
];

export function getBannerForTitle(title?: string | null): CategoryBanner | null {
  if (!title) return null;
  const t = title.toLowerCase();
  for (const [keyword, key] of TITLE_KEYWORDS) {
    if (t.includes(keyword) && BANNERS[key]) return BANNERS[key];
  }
  return null;
}

export default BANNERS;
