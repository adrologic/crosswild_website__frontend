import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Strips the legacy ?category= and ?sub= query params from every URL and
// redirects /products?category=X[&sub=Y] to the clean /category/<slug> URL.
//
// Reason: next.config.js redirects preserve query strings, so a user landing on
// /products?category=tshirts&sub=cotton would arrive at
// /category/cotton?category=tshirts&sub=cotton — clean path but ugly tail.
// This middleware drops those orphan params with a single 301.
// Old-site location URLs that were spelled with a capital city name. These
// cannot live in next.config.js: `source` there matches case-insensitively, so
// a rule pointing /...-in-Kota at /...-in-kota matched the lowercase target too
// and redirected it to itself for ever. Compared exactly here instead, so the
// capitalised spelling redirects once and the canonical lowercase URL serves.
const CAPITALISED_SLUG_REDIRECTS: Record<string, string> = {
  '/bags-manufacturer-in-Jodhpur': '/bags-manufacturer-in-jodhpur',
  '/tshirt-manufacturer-wholesaler-in-Kota': '/tshirt-manufacturer-wholesaler-in-kota',
  '/bags-manufacturing-company-in-Kota': '/bags-manufacturing-company-in-kota',
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Exact match only — the lowercase spelling must fall through and be served.
  const canonicalPath = CAPITALISED_SLUG_REDIRECTS[pathname];
  if (canonicalPath && canonicalPath !== pathname) {
    const target = request.nextUrl.clone();
    target.pathname = canonicalPath;
    return NextResponse.redirect(target, 301);
  }

  const hasCategoryParam = searchParams.has('category');
  const hasSubParam = searchParams.has('sub');

  if (!hasCategoryParam && !hasSubParam) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const sub = searchParams.get('sub');
  const category = searchParams.get('category');

  // Legacy /products?category=X&sub=Y → /category/Y (sub wins; falls back to category)
  if (pathname === '/products') {
    if (sub) url.pathname = `/category/${sub}`;
    else if (category) url.pathname = `/category/${category}`;
  }

  url.searchParams.delete('category');
  url.searchParams.delete('sub');

  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    '/products',
    '/category/:path*',
    // Both spellings: the matcher itself is case-insensitive, and the handler
    // above redirects only on an exact capitalised match.
    '/bags-manufacturer-in-Jodhpur',
    '/tshirt-manufacturer-wholesaler-in-Kota',
    '/bags-manufacturing-company-in-Kota',
  ],
};
