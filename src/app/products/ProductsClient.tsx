"use client";

import { useState, useMemo, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productCategories, getCategoryById } from '@/data/products';
import { productsAPI, categoriesAPI, type Product, type Category } from '@/lib/api';
import SafeImage from '@/components/Common/SafeImage';
import { productImage } from '@/lib/productImage';
import ProductCodeBadge from '@/components/Common/ProductCodeBadge';
import Link from 'next/link';
import SEOHead from '@/components/SEO/SEOHead';
import { defaultFAQs } from '@/lib/seo';
import { toPlainText } from '@/lib/text';
import {
  Star,
  MessageCircle,
  Mail,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Package
} from 'lucide-react';

// Contact details for inquiries
const WHATSAPP_NUMBER = '+919529626262';
const EMAIL_ADDRESS = 'orders@thecrosswild.com';

// Helper functions for inquiry
const getWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi! I'm interested in:\n\n` +
    `*${product.name}*\n` +
    `${product.sku ? `Product code: ${product.sku}\n` : ''}` +
    `Category: ${product.category}\n\n` +
    `Please share pricing and availability.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
};

const getEmailLink = (product: Product) => {
  const subject = encodeURIComponent(
    `Inquiry: ${product.name}${product.sku ? ` (${product.sku})` : ''}`
  );
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in "${product.name}"${product.sku ? ` (product code ${product.sku})` : ''}.` +
    `\n\nPlease share pricing and availability details.\n\nThank you!`
  );
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
};

// Sidebar row styling: scrolling chips on mobile, a plain list on desktop.
//
// Backgrounds here are black/white alphas rather than `bg-gray-*` on purpose.
// styles/index.css remaps every gray background under `.dark` with `!important`
// (`.dark .bg-gray-700` → #3a0c15), so a `lg:bg-transparent` on the same element
// silently loses and every desktop row stays a filled pill.
const categoryButtonClass = (active: boolean) =>
  [
    'rounded-xl transition-colors',
    // Mobile: fixed-size chip on a horizontal rail.
    'max-lg:shrink-0 max-lg:whitespace-nowrap max-lg:px-3.5 max-lg:py-2 max-lg:text-sm',
    // Desktop: full-width row, wrapping rather than overflowing the sidebar.
    'lg:block lg:w-full lg:px-4 lg:py-2.5 lg:text-left lg:overflow-hidden',
    active
      ? 'bg-primary text-white font-semibold'
      : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 max-lg:bg-black/5 max-lg:dark:bg-white/10',
  ].join(' ');

const subButtonClass = (active: boolean) =>
  [
    'rounded-lg text-sm transition-colors',
    'max-lg:shrink-0 max-lg:whitespace-nowrap max-lg:px-3 max-lg:py-1.5',
    // items-start keeps the count on the first line when a long name wraps.
    'lg:flex lg:w-full lg:items-start lg:justify-between lg:gap-2 lg:px-3.5 lg:py-2 lg:text-left lg:overflow-hidden',
    active
      ? 'bg-primary/10 text-primary font-semibold'
      : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 max-lg:bg-black/5 max-lg:dark:bg-white/10',
  ].join(' ');

// Category name formatter
const formatCategoryName = (category: string) => {
  const names: Record<string, string> = {
    tshirts: 'T-Shirts',
    bags: 'Bags',
    caps: 'Caps',
    sweatshirts: 'Sweatshirts & Hoodies',
    lowers: 'Lower & Shorts',
    uniforms: 'School & Office Uniform',
    printing: 'Printing & Embroidery',
    apron: 'Apron',
    'chef-coat': 'Chef Coat',
    raincoats: 'Raincoats',
  };
  return names[category] || category;
};

// Cache fetched products per category so returning from a product detail page
// doesn't refetch or re-shuffle the list. Module scope persists across client-
// side navigation; it's cleared on a full page reload. Each entry stores the
// API "version" signature it was fetched at, so we can detect when the data
// changed (product added/edited/removed) and refetch only then.
type CacheEntry = { products: Product[]; signature: string };
const productsCache = new Map<string, CacheEntry>();

// Products rendered per batch. Search/filter/sort always run over the full set;
// only the rendered slice grows as the user scrolls.
const PRODUCTS_PER_PAGE = 30;

// How many products were on screen when the user left for a product detail
// page. Restored on back-navigation so the saved scroll position still has a
// grid tall enough to land on.
const VISIBLE_COUNT_KEY = 'products-visible-count';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const subParam = searchParams.get('sub');

  const [products, setProducts] = useState<Product[]>(() => productsCache.get(categoryParam || 'all')?.products ?? []);
  const [loading, setLoading] = useState(() => !productsCache.has(categoryParam || 'all'));
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedSub, setSelectedSub] = useState(subParam || '');
  // Sub-category names/ids live in the CMS tree, not the hardcoded top-level
  // list, so the sidebar needs the tree to label anything below a category.
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);
  // Bumped to re-run the freshness check (e.g. when the tab regains focus after
  // adding data in the admin panel in another tab).
  const [revalidateTick, setRevalidateTick] = useState(0);
  // Number of products currently rendered (infinite scroll). Seeded from the
  // count saved on the way out so back-navigation restores the same grid.
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return PRODUCTS_PER_PAGE;
    // Only a real back-navigation (scroll position saved too) restores a count.
    if (!sessionStorage.getItem('products-scroll')) return PRODUCTS_PER_PAGE;
    const saved = parseInt(sessionStorage.getItem(VISIBLE_COUNT_KEY) || '', 10);
    return Number.isNaN(saved) ? PRODUCTS_PER_PAGE : Math.max(PRODUCTS_PER_PAGE, saved);
  });

  // Re-check for new data whenever the tab/window regains focus.
  useEffect(() => {
    const revalidate = () => setRevalidateTick((t) => t + 1);
    const onVisible = () => { if (document.visibilityState === 'visible') revalidate(); };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  // Category tree (top-level -> sub-categories). Fetched once; if it fails the
  // sidebar simply shows top-level categories with no sub-category section.
  useEffect(() => {
    let cancelled = false;
    categoriesAPI.getTree({ active: true })
      .then((res) => { if (!cancelled) setCategoryTree(res.categories || []); })
      .catch(() => { /* non-fatal — sub-categories just stay hidden */ });
    return () => { cancelled = true; };
  }, []);

  // Sync URL params when they change (e.g. header search navigation)
  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    else setSelectedCategory('all');
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam !== null) setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    setSelectedSub(subParam || '');
  }, [subParam]);

  // Picking a category drops any sub-category filter — keeping it would filter
  // the new category by a sub-category that doesn't belong to it.
  const selectCategory = (id: string) => {
    setSelectedCategory(id);
    setSelectedSub('');
  };

  // Load products for the selected category.
  //
  // Caching strategy ("remember the page, refresh only when data changes"):
  //  - If we have a cached list, render it instantly with no spinner.
  //  - In the background, ask the API for a cheap version signature
  //    (product count + last-modified time). If it matches the cached
  //    signature, nothing changed — keep the cache, no full refetch.
  //  - If it differs (a product was added / edited / removed), or there is
  //    no cache, (re)fetch the full list and update the cache silently.
  useEffect(() => {
    let cancelled = false;

    // Fetch every page (API caps at 100/page) and shuffle the All-Products view.
    const buildList = async (): Promise<Product[]> => {
      const baseParams: { category?: string; limit: number } = { limit: 100 };
      if (selectedCategory !== 'all') baseParams.category = selectedCategory;

      const list: Product[] = [];
      let page = 1;
      let totalPages = 1;
      const MAX_PAGES = 50; // safety guard against an unexpected loop
      do {
        const response = await productsAPI.getAll({ ...baseParams, page });
        list.push(...(response.products || []));
        totalPages = response.totalPages ?? 1;
        page += 1;
      } while (page <= totalPages && page <= MAX_PAGES);

      // Mix categories on the All-Products view so they aren't grouped newest-first.
      if (selectedCategory === 'all') {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
      }
      return list;
    };

    const load = async () => {
      const cached = productsCache.get(selectedCategory);
      if (cached) {
        setProducts(cached.products);
        setLoading(false);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        // Cheap freshness check. '' => the check failed; in that case keep any cache.
        let signature = '';
        try {
          signature = await productsAPI.getVersion();
        } catch {
          signature = '';
        }
        if (cancelled) return;

        // Cache still valid (unchanged, or check failed) — keep showing it.
        if (cached && (!signature || cached.signature === signature)) return;

        // No cache, or the data changed — (re)fetch the full list and update.
        const list = await buildList();
        if (cancelled) return;
        productsCache.set(selectedCategory, { products: list, signature });
        setProducts(list);
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to fetch products:', err);
        if (!cached) setError('Failed to load products. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [selectedCategory, revalidateTick]);

  // Save scroll position before opening a product, so back-navigation returns
  // the user to the product they clicked instead of the top of the list.
  const rememberScroll = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('products-scroll', String(window.scrollY));
      // Without the batch count the restored scroll would land past the end of
      // a freshly-reset 30-product grid.
      sessionStorage.setItem(VISIBLE_COUNT_KEY, String(visibleCount));
    }
  };

  // On return (back from a product detail page), restore the saved scroll
  // position. Cleared after use so a fresh visit to /products still lands at top.
  useEffect(() => {
    const saved = sessionStorage.getItem('products-scroll');
    sessionStorage.removeItem('products-scroll');
    sessionStorage.removeItem(VISIBLE_COUNT_KEY);
    if (!saved) return;
    const y = parseInt(saved, 10);
    if (Number.isNaN(y)) return;
    // Wait two frames so the (cached) grid is laid out before restoring scroll.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => window.scrollTo(0, y))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  // Search matches, before the sub-category filter is applied. The sidebar
  // counts read off this, so they track the search box instead of contradicting
  // it ("Cotton T-Shirts (12)" leading to 3 results).
  const searchMatched = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      // A buyer reads the code off a product photo and types it in — this
      // page filters client-side, so it has to match the code too or the
      // search dead-ends on the very code the badge is advertising.
      (p.sku || '').toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Products per sub-category of the selected category.
  const subCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (selectedCategory === 'all') return counts;
    for (const p of searchMatched) {
      for (const pc of p.productCategories || []) {
        if (pc.category !== selectedCategory) continue;
        for (const sub of pc.subcategories || []) {
          counts.set(sub, (counts.get(sub) || 0) + 1);
        }
      }
    }
    return counts;
  }, [searchMatched, selectedCategory]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = selectedSub
      ? searchMatched.filter(p => (p.productCategories || []).some(pc =>
          pc.category === selectedCategory && (pc.subcategories || []).includes(selectedSub)
        ))
      : [...searchMatched];

    // Sort. On "All Products" keep the shuffled order so categories stay
    // mixed. Within a single category, surface featured/bestsellers first.
    if (selectedCategory !== 'all') {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.bestSeller && !b.bestSeller) return -1;
        if (!a.bestSeller && b.bestSeller) return 1;
        return 0;
      });
    }

    return filtered;
  }, [searchMatched, selectedSub, selectedCategory]);

  const currentCategory = getCategoryById(selectedCategory);

  // Sub-categories to offer for the selected category. Ones with nothing in
  // them are dropped — a filter that leads to an empty grid is worse than a
  // filter that isn't there. The active one always stays, so the current
  // selection can never disappear out from under the user.
  const visibleSubs = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const subs = categoryTree.find(c => c.id === selectedCategory)?.subcategories || [];
    if (loading || products.length === 0) return subs;
    return subs.filter(sub => (subCounts.get(sub.id) || 0) > 0 || sub.id === selectedSub);
  }, [categoryTree, selectedCategory, subCounts, selectedSub, loading, products.length]);

  // Infinite scroll — render PRODUCTS_PER_PAGE at a time and grow the slice as
  // the sentinel below the grid scrolls into view. Search / filter / sort above
  // run over the FULL set, so the visible slice always reflects the complete
  // filtered list. The whole list is already in memory, so "loading more" is a
  // render-slice change, not a network call.
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((c) => c + PRODUCTS_PER_PAGE);
  }, []);

  // Back to the first batch whenever the filtered set changes (new search /
  // filter / sort / category). Skipped on the first run so a restored count
  // (back-navigation) survives.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [searchQuery, selectedCategory, selectedSub]);

  // Auto-load the next batch when the sentinel enters the viewport. Starts
  // fetching slightly early (rootMargin) so the grid never visibly runs dry.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || loading) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(node);

    // Backstop for a jump to the bottom. The footer below this sentinel is
    // taller than the viewport, so dragging the scrollbar down or pressing End
    // clears the sentinel within a single frame: the observer sees
    // non-intersecting before and non-intersecting after, never crosses a
    // threshold, and so never fires at all — the spinner would sit there
    // claiming to load with nothing behind it. This only handles the case the
    // observer structurally cannot see (sentinel already above the viewport),
    // so the two never both fire for the same scroll.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (node.getBoundingClientRect().bottom < 0) loadMore();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hasMore, loading, loadMore, filteredProducts.length]);

  // Product Card Component
  const ProductCard = ({ product }: { product: Product }) => {
    const hoverImage = product.images?.find((img) => img && img !== product.image);
    return (
    <div className="group bg-card-bg rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out">
      {/* Image tile */}
      <Link href={`/products/${product.id}`} onClick={rememberScroll} className="block">
        <div className="relative aspect-[4/3] bg-[#ffffff] rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden">
          {product.image ? (
            <>
              <SafeImage
                {...productImage(product)}
                alt={product.name}
                fill
                className={`object-contain p-[22px] transition-all duration-500 group-hover:scale-105 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {hoverImage && (
                <SafeImage
                  src={hoverImage}
                  alt={product.name}
                  fill
                  className="object-contain p-[22px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-300" />
            </div>
          )}

          {/* Badges — product code first so it reads top-left of the photo */}
          <div className="absolute top-[14px] left-[14px] right-[14px] flex flex-wrap items-start gap-2">
            <ProductCodeBadge code={product.sku} inline />
            {product.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            {product.newArrival && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                <TrendingUp className="w-3 h-3" />
                Best Seller
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="pt-4 px-2 pb-1.5">
        {product.category && (
          <span className="inline-flex items-center bg-[#ffffff] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">
            {product.category}
          </span>
        )}
        {/* Title */}
        <Link href={`/products/${product.id}`} onClick={rememberScroll}>
          <h3 className="font-bold text-base text-[#16243b] dark:text-white mb-3.5 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title || product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
            {product.reviews > 0 && (
              <span className="text-xs text-gray-400">({product.reviews})</span>
            )}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={getEmailLink(product)}
            aria-label={`Email inquiry about ${product.name}`}
            className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            href={`/products/${product.id}`} onClick={rememberScroll}
            className="flex-1 flex items-center justify-center gap-1 h-[38px] bg-[#ffffff] text-primary border-[1.5px] border-primary rounded-[11px] text-sm font-bold hover:bg-primary hover:text-white transition-colors"
          >
            View
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
    );
  };

  return (
    <>
      <SEOHead
        breadcrumbItems={[
          { name: 'Home', url: 'https://thecrosswild.com' },
          { name: 'Products', url: 'https://thecrosswild.com/products' },
        ]}
        faqItems={defaultFAQs}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Header */}
        <div className="bg-[#abccff] dark:bg-[#9a0822] pt-28 pb-12">
          <div className="w-full px-6 lg:px-12 sm:px-6 lg:px-8">
            <div className="text-center text-[#ff4f20] dark:text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentCategory?.name || 'Our Products'}
              </h1>
              <p className="text-lg text-[#ff4f20]/90 dark:text-white/90 max-w-2xl mx-auto">
                {selectedCategory === 'all'
                  ? 'Discover premium custom merchandise and promotional products for your brand'
                  : `Explore our collection of high-quality ${currentCategory?.name?.toLowerCase()}`
                }
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:px-12 sm:px-6 lg:px-8 -mt-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Categories + sub-categories */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 lg:mb-5">Categories</h2>

                <div className="relative">
                <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
                  <button
                    onClick={() => selectCategory('all')}
                    className={categoryButtonClass(selectedCategory === 'all')}
                  >
                    All Products
                  </button>
                  {productCategories.filter(c => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className={categoryButtonClass(selectedCategory === cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-800 lg:hidden" />
                </div>

                {/* Sub-categories of the selected category. Appears only once a
                    category is picked, so the sidebar stays short by default. */}
                {visibleSubs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 lg:mt-5 lg:pt-5">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                      Browse {currentCategory?.name}
                    </h3>
                    <div className="relative">
                    <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                      <button
                        onClick={() => setSelectedSub('')}
                        className={subButtonClass(!selectedSub)}
                      >
                        <span>All {currentCategory?.name}</span>
                      </button>
                      {visibleSubs.map((sub) => {
                        const active = selectedSub === sub.id;
                        const count = subCounts.get(sub.id) || 0;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedSub(sub.id)}
                            className={subButtonClass(active)}
                          >
                            <span className="lg:min-w-0 lg:break-words">{sub.name}</span>
                            {count > 0 && (
                              <span className={`hidden lg:block lg:shrink-0 lg:pt-0.5 text-xs tabular-nums ${
                                active ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                              }`}>
                                {count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-gray-800 lg:hidden" />
                    </div>
                  </div>
                )}

                {/* Clear Filters */}
                {(searchQuery || selectedCategory !== 'all' || selectedSub) && (
                  <button
                    onClick={() => {
                      selectCategory('all');
                      setSearchQuery('');
                    }}
                    className="w-full mt-5 px-4 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Products */}
            <main className="flex-1 min-w-0">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  {loading
                    ? 'Loading...'
                    : filteredProducts.length === 0
                    ? '0 products found'
                    : `Showing ${visibleProducts.length} of ${filteredProducts.length} products`}
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
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      selectCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Infinite scroll sentinel — auto-loads the next batch as it
                  scrolls into view. The button is a manual fallback for when
                  the observer can't fire (no IntersectionObserver, reduced
                  motion / keyboard-only users who never scroll it into view). */}
              {!loading && !error && hasMore && (
                <div ref={sentinelRef} className="mt-10 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-400" aria-hidden="true">
                    <span className="inline-block w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <span className="text-sm">Loading more products…</span>
                  </div>
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Load more
                  </button>
                </div>
              )}

              {/* End-of-list marker, so the grid doesn't just stop dead. */}
              {!loading && !error && !hasMore && filteredProducts.length > PRODUCTS_PER_PAGE && (
                <p className="mt-10 text-center text-sm text-gray-400">
                  You&rsquo;ve reached the end &mdash; {filteredProducts.length} products.
                </p>
              )}
            </main>
          </div>
        </div>

      </div>
    </>
  );
}

export default function ProductsClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
