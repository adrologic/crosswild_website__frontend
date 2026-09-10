"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { productImage } from '@/lib/productImage';
import { productsAPI, type Product } from '@/lib/api';
import { getCategoryUrl, getSubCategoryUrl } from '@/lib/categoryUrls';
import { Package } from 'lucide-react';

// Sidebar row styling — matches the All Products page: a scrolling chip rail
// on mobile, a plain sticky list on desktop. See the same pattern in
// ProductsClient.tsx (kept in sync manually since the two pages link to
// categories rather than share a component).
const categoryLinkClass = (active: boolean) =>
  [
    'rounded-xl transition-colors',
    'max-lg:shrink-0 max-lg:whitespace-nowrap max-lg:px-3.5 max-lg:py-2 max-lg:text-sm',
    'lg:block lg:w-full lg:px-4 lg:py-2.5 lg:text-left',
    active
      ? 'bg-primary text-white font-semibold'
      : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 max-lg:bg-black/5 max-lg:dark:bg-white/10',
  ].join(' ');

const subLinkClass = (active: boolean) =>
  [
    'rounded-lg text-sm transition-colors',
    'max-lg:shrink-0 max-lg:whitespace-nowrap max-lg:px-3 max-lg:py-1.5',
    'lg:block lg:w-full lg:px-3.5 lg:py-2 lg:text-left',
    active
      ? 'bg-primary/10 text-primary font-semibold'
      : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 max-lg:bg-black/5 max-lg:dark:bg-white/10',
  ].join(' ');

interface MiniCategory { id: string; name: string; seoUrl?: string }

interface Props {
  category: { id: string; name: string; seoUrl?: string };
  parent: { id: string; name: string; seoUrl?: string } | null;
  subcategories: MiniCategory[];
  topCategories: MiniCategory[];
  description?: string;
}

export default function CategoryBrowser({ category, parent, subcategories, topCategories, description }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sidebarCats = topCategories;

  // Fetch products. For sub-categories, try strict sub-filter first; if empty, fall back
  // to the parent category so users always see relevant inventory even if products
  // aren't fully tagged with sub-category metadata yet.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        let res;
        if (parent) {
          res = await productsAPI.getAll({ category: parent.id, sub: category.id, limit: 50 });
          if ((!res.products || res.products.length === 0) && !cancelled) {
            res = await productsAPI.getAll({ category: parent.id, limit: 50 });
          }
        } else {
          res = await productsAPI.getAll({ category: category.id, limit: 50 });
        }

        if (cancelled) return;
        setProducts(res.products || []);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [category.id, parent?.id]);

  // Featured/best-sellers first — same default order the search+sort bar used
  // to produce, now applied unconditionally since the sort control is gone.
  const filteredProducts = useMemo(() => {
    const filtered = [...products];
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.bestSeller && !b.bestSeller) return -1;
      if (!a.bestSeller && b.bestSeller) return 1;
      return 0;
    });
    return filtered;
  }, [products]);

  // Image-led card: a square showcase tile, then category + name. No badges,
  // rating, or action buttons — matches the All Products page's card exactly.
  const ProductCard = ({ product }: { product: Product }) => {
    const hoverImage = product.images?.find((img) => img && img !== product.image);
    return (
      <Link
        href={`/products/${product.id}`}
        className="group block bg-card-bg border border-black/5 dark:border-white/10 rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(22,36,59,0.06),0_6px_16px_rgba(22,36,59,0.06)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] hover:shadow-[0_2px_6px_rgba(22,36,59,0.07),0_12px_26px_rgba(22,36,59,0.11)] dark:hover:shadow-[0_12px_26px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-200 ease-out"
      >
        <div className="relative aspect-square bg-[#ffffff] rounded-xl overflow-hidden shadow-[0_1px_4px_rgba(22,36,59,0.07)]">
          {product.image ? (
            <>
              <SafeImage
                {...productImage(product)}
                alt={product.name}
                fill
                className={`object-contain p-6 lg:p-7 transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
              {hoverImage && (
                <SafeImage
                  src={hoverImage}
                  alt={product.name}
                  fill
                  className="object-contain p-6 lg:p-7 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-16 h-16 text-[#c9d2e0]" />
            </div>
          )}
        </div>

        <div className="pt-3 pb-0.5 px-0.5">
          {product.category && (
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4a5a73] dark:text-white/55">
              {product.category}
            </p>
          )}
          <h3 className="mt-1 min-h-[2.375rem] text-sm font-medium leading-snug text-[#16243b] dark:text-white line-clamp-2">
            {product.title || product.name}
          </h3>
        </div>
      </Link>
    );
  };

  const heroTitle = category.name;
  const heroSubtitle = description
    || (parent ? `Explore our ${category.name.toLowerCase()} collection` : `Discover premium custom ${category.name.toLowerCase()}`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-[#abccff] dark:bg-[#9a0822] pt-28 pb-12">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center text-[#ff4f20] dark:text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-lg text-[#ff4f20]/90 dark:text-white/90 max-w-2xl mx-auto">{heroSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 -mt-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Categories + sub-categories — chips on mobile, sticky list on
              desktop, always visible (no button/drawer needed to see it).
              Same layout as the All Products page's sidebar. */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 lg:mb-5">Categories</h2>

              <div className="scroll-fade-x flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
                <Link href="/products" className={categoryLinkClass(false)}>
                  All Products
                </Link>
                {sidebarCats.map((c) => {
                  const active = (parent?.id || category.id) === c.id;
                  return (
                    <Link key={c.id} href={getCategoryUrl(c.id)} className={categoryLinkClass(active)}>
                      {c.name}
                    </Link>
                  );
                })}
              </div>

              {/* Sub-categories of current top-level (or siblings of current sub-cat) */}
              {subcategories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 lg:mt-5 lg:pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                    {parent ? `Other ${parent.name}` : `Browse ${category.name}`}
                  </h3>
                  <div className="scroll-fade-x flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                    {subcategories.map((sub) => {
                      const active = sub.id === category.id;
                      return (
                        <Link key={sub.id} href={getSubCategoryUrl(sub.seoUrl || sub.id)} className={subLinkClass(active)}>
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                  <p className="text-gray-500">Loading products...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-500 text-lg mb-4">{error}</div>
                <button onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Check back soon, or browse everything we offer</p>
                <Link href="/products"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                  Browse All Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
