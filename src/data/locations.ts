// Static fallback data — used only if the API is unreachable
// All location pages are now managed from the database (locationpages collection)

export interface Location {
  slug: string;
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  city?: string;
  category?: string;
  categoryLabel?: string;
  introContent?: string;
  branchAddress?: string;
  branchPhone?: string;
  branchHours?: string;
  mapLink?: string;
  showPrintingMethods?: boolean;
  showFabrics?: boolean;
  showSizeChart?: boolean;
  isActive?: boolean;
}

// Minimal fallback — real data lives in MongoDB
export const LOCATIONS: Location[] = [
  { slug: 'tshirt-manufacturer-in-jodhpur',        h1: 'T-Shirt Manufacturer in Jodhpur',     city: 'Jodhpur', categoryLabel: 'T-Shirts',  isActive: true },
  { slug: 'bags-manufacturer-in-Jodhpur',          h1: 'Bags Manufacturer in Jodhpur',        city: 'Jodhpur', categoryLabel: 'Bags',      isActive: true },
  { slug: 'cap-printing-manufacturer-jodhpur',     h1: 'Cap Printing in Jodhpur',             city: 'Jodhpur', categoryLabel: 'Caps',      isActive: true },
  { slug: 'uniform-manufacturer-jodhpur',          h1: 'Uniform Manufacturer in Jodhpur',     city: 'Jodhpur', categoryLabel: 'Uniforms',  isActive: true },
  { slug: 'tshirt-manufacturer-in-indore',         h1: 'T-Shirt Manufacturer in Indore',      city: 'Indore',  categoryLabel: 'T-Shirts',  isActive: true },
  { slug: 'bag-manufacturer-in-indore',            h1: 'Bags Manufacturer in Indore',         city: 'Indore',  categoryLabel: 'Bags',      isActive: true },
  { slug: 'uniform-manufacturer-in-indore',        h1: 'Uniform Manufacturer in Indore',      city: 'Indore',  categoryLabel: 'Uniforms',  isActive: true },
  { slug: 'bags-manufacturing-company-in-udaipur', h1: 'Bags Manufacturer in Udaipur',        city: 'Udaipur', categoryLabel: 'Bags',      isActive: true },
  { slug: 'tshirt-manufacturer-wholesaler-in-udaipur', h1: 'T-Shirt Manufacturer in Udaipur', city: 'Udaipur', categoryLabel: 'T-Shirts', isActive: true },
  { slug: 'tshirt-manufacturer-wholesaler-in-Kota',    h1: 'T-Shirt Manufacturer in Kota',    city: 'Kota',    categoryLabel: 'T-Shirts', isActive: true },
  { slug: 'bags-manufacturing-company-in-Kota',        h1: 'Bags Manufacturer in Kota',       city: 'Kota',    categoryLabel: 'Bags',     isActive: true },
  { slug: 'tshirt-manufacturer-wholesaler-in-sikar',   h1: 'T-Shirt Manufacturer in Sikar',   city: 'Sikar',   categoryLabel: 'T-Shirts', isActive: true },
  { slug: 'bags-manufacturing-company-in-sikar',       h1: 'Bags Manufacturer in Sikar',      city: 'Sikar',   categoryLabel: 'Bags',     isActive: true },
];

// Used by Footer/index.tsx and LocationsStrip.tsx
export const FOOTER_LOCATION_ITEMS = LOCATIONS.map((l) => ({
  label: `${l.categoryLabel} — ${l.city}`,
  citySlug: l.slug,
}));

// No longer needed (old city pages removed) — kept as empty array to avoid import errors
export const OFFICE_CITIES: string[] = [];
