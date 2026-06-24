"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { productsAPI, type Product } from '@/lib/api';
import { getCategoryUrl, getSubCategoryUrl } from '@/lib/categoryUrls';
import { toPlainText } from '@/lib/text';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Star,
  MessageCircle,
  Mail,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Package,
  X,
} from 'lucide-react';

const WHATSAPP_NUMBER = '+919529626262';
const EMAIL_ADDRESS = 'orders@thecrosswild.com';

const getWhatsAppLink = (product: Product) => {
  const message = encodeURIComponent(
    `Hi! I'm interested in:\n\n*${product.name}*\nCategory: ${product.category}\n\nPlease share pricing and availability.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
};

const getEmailLink = (product: Product) => {
  const subject = encodeURIComponent(`Inquiry: ${product.name}`);
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in "${product.name}".\n\nPlease share pricing and availability details.\n\nThank you!`
  );
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'name-asc':  filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'newest':    filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()); break;
      case 'rating':    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return 0;
        });
    }
    return filtered;
  }, [products, searchQuery, sortBy]);

  const ProductCard = ({ product }: { product: Product }) => {
    const hoverImage = product.images?.find((img) => img && img !== product.image);
    return (
    <div className="group bg-card-bg dark:bg-gray-800 rounded-[22px] p-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-[#ffffff] dark:bg-gray-700 rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden">
          {product.image ? (
            <>
              <SafeImage
                src={product.image}
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
          <div className="absolute top-[14px] left-[14px] flex flex-col gap-2">
            {product.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                <Sparkles className="w-3 h-3" />Featured
              </span>
            )}
            {product.newArrival && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">New</span>
            )}
            {product.bestSeller && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#ff4f20] text-white text-[11px] font-bold rounded-full shadow-[0_4px_10px_rgba(255,79,32,0.35)]">
                <TrendingUp className="w-3 h-3" />Best Seller
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="pt-4 px-2 pb-1.5">
        {product.category && (
          <span className="inline-flex items-center bg-[#ffffff] text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">
            {product.category}
          </span>
        )}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-bold text-base text-[#16243b] dark:text-white mb-3.5 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title || product.name}
          </h3>
        </Link>
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
            {product.reviews > 0 && <span className="text-xs text-gray-400">({product.reviews})</span>}
          </div>
        )}
        <div className="flex items-center gap-2">
          <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer"
            aria-label={`Inquire about ${product.name} on WhatsApp`}
            className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
          <a href={getEmailLink(product)}
            aria-label={`Email inquiry about ${product.name}`}
            className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </a>
          <Link href={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1 h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary border-[1.5px] border-primary rounded-[11px] text-sm font-bold hover:bg-primary hover:text-white transition-colors">
            View<ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
    );
  };

  const ProductListCard = ({ product }: { product: Product }) => (
    <div className="group bg-card-bg dark:bg-gray-800 rounded-[22px] p-[14px] gap-[14px] shadow-[0_14px_30px_rgba(22,36,59,0.16)] hover:-translate-y-[5px] hover:shadow-[0_22px_44px_rgba(22,36,59,0.24)] transition-all duration-[220ms] ease-out flex">
      <Link href={`/products/${product.id}`} className="relative w-32 sm:w-44 md:w-56 flex-shrink-0">
        <div className="absolute inset-0 bg-[#ffffff] dark:bg-gray-700 rounded-2xl shadow-[0_4px_12px_rgba(22,36,59,0.08)] overflow-hidden">
          {product.image ? (
            <SafeImage src={product.image} alt={product.name} fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 30vw, 20vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"><Package className="w-12 h-12 text-gray-300" /></div>
          )}
        </div>
      </Link>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          {product.category && (
            <span className="inline-flex items-center bg-[#ffffff] dark:bg-gray-700 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(22,36,59,0.08)] mb-2 capitalize">
              {product.category}
            </span>
          )}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-xl text-[#16243b] dark:text-white mb-2 group-hover:text-primary transition-colors">
              {product.title || product.name}
            </h3>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{toPlainText(product.description)}</p>
          <div className="flex items-center gap-4 mb-4">
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                {product.reviews > 0 && <span className="text-xs text-gray-400">({product.reviews} reviews)</span>}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-[38px] h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
          <a href={getEmailLink(product)}
            className="flex items-center gap-2 px-4 h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary font-bold rounded-[11px] shadow-[0_3px_8px_rgba(22,36,59,0.10)] hover:bg-primary hover:text-white transition-colors">
            <Mail className="w-4 h-4" />Email
          </a>
          <Link href={`/products/${product.id}`}
            className="flex items-center gap-2 px-6 h-[38px] bg-[#ffffff] dark:bg-gray-700 text-primary border-[1.5px] border-primary font-bold rounded-[11px] hover:bg-primary hover:text-white transition-colors">
            View Details<ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  const heroTitle = category.name;
  const heroSubtitle = description
    || (parent ? `Explore our ${category.name.toLowerCase()} collection` : `Discover premium custom ${category.name.toLowerCase()}`);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Header */}
      <div className="bg-[#abccff] pt-28 pb-12">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center text-[#ff4f20]">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-lg text-[#ff4f20]/90 max-w-2xl mx-auto">{heroSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 lg:px-12 -mt-6">
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search in ${heroTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-white min-w-[160px]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="flex gap-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
            <button onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200">
              <SlidersHorizontal className="w-5 h-5" />Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Categories</h2>
              <div className="space-y-2">
                <Link href="/products"
                  className="block px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  All Products
                </Link>
                {sidebarCats.map((c) => {
                  const active = (parent?.id || category.id) === c.id;
                  return (
                    <Link key={c.id} href={getCategoryUrl(c.id)}
                      className={`block px-4 py-2.5 rounded-xl transition-colors ${active ? 'bg-primary text-white font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {c.name}
                    </Link>
                  );
                })}
              </div>

              {/* Sub-categories of current top-level (or siblings of current sub-cat) */}
              {subcategories.length > 0 && (
                <>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-6 mb-3 uppercase tracking-wide">
                    {parent ? `Other ${parent.name}` : `Browse ${category.name}`}
                  </h3>
                  <div className="space-y-1">
                    {subcategories.map((sub) => {
                      const active = sub.id === category.id;
                      return (
                        <Link key={sub.id} href={getSubCategoryUrl(sub.seoUrl || sub.id)}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </>
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
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search</p>
                <Link href="/products"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                  Browse All Products
                </Link>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white dark:bg-gray-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Categories</h2>
              <button onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2">
              <Link href="/products" onClick={() => setShowMobileFilters(false)}
                className="block px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                All Products
              </Link>
              {sidebarCats.map((c) => (
                <Link key={c.id} href={getCategoryUrl(c.id)} onClick={() => setShowMobileFilters(false)}
                  className="block px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  {c.name}
                </Link>
              ))}
              {subcategories.length > 0 && (
                <>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide pt-4 pb-1 px-4">
                    {parent ? `Other ${parent.name}` : `Browse ${category.name}`}
                  </div>
                  {subcategories.map((sub) => (
                    <Link key={sub.id} href={getSubCategoryUrl(sub.seoUrl || sub.id)} onClick={() => setShowMobileFilters(false)}
                      className="block px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      {sub.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
