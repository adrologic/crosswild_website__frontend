import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Strips the legacy ?category= and ?sub= query params from every URL and
// redirects /products?category=X[&sub=Y] to the clean /category/<slug> URL.
//
// Reason: next.config.js redirects preserve query strings, so a user landing on
// /products?category=tshirts&sub=cotton would arrive at
// /category/cotton?category=tshirts&sub=cotton — clean path but ugly tail.
// This middleware drops those orphan params with a single 301.
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
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
  ],
};
