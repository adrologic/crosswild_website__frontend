"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/Common/SafeImage';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, ChevronDown, Phone, Mail, Home, MessageCircle, Loader2, Tag, MapPin } from 'lucide-react';
import { LOCATIONS, FOOTER_LOCATION_ITEMS } from '@/data/locations';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectTotalItems } from '@/store/slices/cartSlice';
import {
  selectIsMenuOpen, selectIsMobileSearchOpen,
  openCart, toggleMenu, closeMenu, toggleMobileSearch, closeMobileSearch,
} from '@/store/slices/uiSlice';
import { productsAPI, categoriesAPI, Product } from '@/lib/api';
import { getCategoryUrl, getSubCategoryUrl } from '@/lib/categoryUrls';
import { getSiteSettings, type SiteSettings } from '@/lib/cms';
import CartDrawer from '@/components/Cart/CartDrawer';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

// Types for nav categories
interface NavItem { name: string; link: string }
interface NavCategory { name: string; slug: string; items: NavItem[] }
interface FlatCategory { name: string; slug: string }

// Fallback hardcoded categories (used until API loads)
const FALLBACK_CATEGORIES: NavCategory[] = [
  { name: 'T-Shirts', slug: 'tshirts', items: [
    { name: 'Dry Fit T-Shirts', link: getSubCategoryUrl('dry-fit-tshirts') },
    { name: 'Cotton T-Shirts', link: getSubCategoryUrl('cotton-tshirts') },
    { name: 'Polyester T-Shirts', link: getSubCategoryUrl('polyester-tshirts') },
    { name: 'Sports Jersey', link: getSubCategoryUrl('sports-jersey') },
  ]},
  { name: 'Bags', slug: 'bags', items: [
    { name: 'School Bags', link: getSubCategoryUrl('school-bags') },
    { name: 'Laptop Bags', link: getSubCategoryUrl('laptop-bags') },
    { name: 'Office Bags', link: getSubCategoryUrl('office-bags') },
  ]},
  { name: 'Caps', slug: 'caps', items: [
    { name: 'Cotton Caps', link: getSubCategoryUrl('cotton-caps') },
    { name: 'Sports Caps', link: getSubCategoryUrl('sports-caps') },
  ]},
  { name: 'More', slug: '', items: [
    { name: 'Sweatshirts & Hoodies', link: getCategoryUrl('sweatshirts') },
    { name: 'Lower & Shorts', link: getCategoryUrl('lowers') },
    { name: 'Uniforms', link: getCategoryUrl('uniforms') },
    { name: 'Printing & Embroidery', link: getCategoryUrl('printing') },
    { name: 'Apron', link: getCategoryUrl('apron') },
    { name: 'Chef Coat', link: getCategoryUrl('chef-coat') },
    { name: 'Raincoats', link: getCategoryUrl('raincoats') },
  ]},
];

const FALLBACK_FLAT: FlatCategory[] = [
  { name: 'T-Shirts', slug: 'tshirts' },
  { name: 'Bags', slug: 'bags' },
  { name: 'Caps', slug: 'caps' },
  { name: 'Sweatshirts & Hoodies', slug: 'sweatshirts' },
  { name: 'Lower & Shorts', slug: 'lowers' },
  { name: 'School & Office Uniform', slug: 'uniforms' },
  { name: 'Printing & Embroidery', slug: 'printing' },
  { name: 'Apron', slug: 'apron' },
  { name: 'Chef Coat', slug: 'chef-coat' },
  { name: 'Raincoats', slug: 'raincoats' },
];

// Transform API tree into nav format
function buildNavCategories(tree: any[]): { nav: NavCategory[]; flat: FlatCategory[] } {
  const flat: FlatCategory[] = [];
  const mainCats: NavCategory[] = [];
  const standaloneCats: NavItem[] = [];

  for (const cat of tree) {
    flat.push({ name: cat.name, slug: cat.id });
    const subs = cat.subcategories || [];

    if (subs.length > 0) {
      mainCats.push({
        name: cat.name,
        slug: cat.id,
        items: subs.map((sub: any) => ({
          name: sub.name,
          link: getSubCategoryUrl(sub.seoUrl || sub.id),
        })),
      });
      // Also add subcategories to flat list
      for (const sub of subs) {
        flat.push({ name: sub.name, slug: sub.id });
      }
    } else {
      standaloneCats.push({ name: cat.name, link: getCategoryUrl(cat.id) });
    }
  }

  // Group standalone categories under "More"
  if (standaloneCats.length > 0) {
    mainCats.push({ name: 'More', slug: '', items: standaloneCats });
  }

  return { nav: mainCats, flat };
}

function SearchBox({
  value, onChange, onSubmit, suggestions, loading, showDropdown,
  onSelectProduct, onSelectCategory, onClose, containerRef, inputClass, isMobile, flatCategories,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  suggestions: Product[];
  loading: boolean;
  showDropdown: boolean;
  onSelectProduct: (id: string) => void;
  onSelectCategory: (slug: string) => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputClass: string;
  isMobile: boolean;
  flatCategories: FlatCategory[];
}) {
  const matchingCategories = flatCategories.filter(c =>
    value.trim().length > 0 && c.name.toLowerCase().includes(value.toLowerCase())
  );
  const hasResults = matchingCategories.length > 0 || suggestions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          onFocus={() => value.trim() && onClose()}
          className={inputClass}
          autoComplete="off"
        />
        <button
          onClick={onSubmit}
          aria-label="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {showDropdown && value.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-theme-bg dark:bg-[#1E1A14] border border-theme-border rounded-xl shadow-2xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[200] overflow-hidden max-h-[420px] overflow-y-auto">
          {loading && suggestions.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-6 text-theme-text-muted text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching...
            </div>
          )}
          {!loading && !hasResults && (
            <div className="py-6 text-center text-theme-text-muted text-sm">
              No results found for &quot;{value}&quot;
            </div>
          )}
          {matchingCategories.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider border-b border-theme-border">
                Categories
              </div>
              {matchingCategories.map(cat => (
                <button key={cat.slug} onClick={() => onSelectCategory(cat.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-soft dark:hover:bg-[#26211A] transition-colors text-left">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Tag className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-theme-text">{cat.name}</div>
                    <div className="text-xs text-theme-text-muted">Browse category</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-theme-text-muted uppercase tracking-wider border-b border-theme-border">
                Products
              </div>
              {suggestions.map(product => (
                <button key={product.id} onClick={() => onSelectProduct(product.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-soft dark:hover:bg-[#26211A] transition-colors text-left">
                  {product.image ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-theme-bg-soft">
                      <SafeImage src={product.image} alt={product.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-theme-bg-soft flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-theme-text truncate">{product.title || product.name}</div>
                    {product.category && (
                      <div className="text-xs text-theme-text-muted capitalize">{product.category}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {value.trim().length > 0 && (
            <button onClick={onSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-theme-bg-soft dark:bg-[#26211A] hover:bg-theme-bg-card dark:hover:bg-[#2E2820] transition-colors text-sm font-semibold text-primary border-t border-theme-border">
              <Search className="w-4 h-4" />
              See all results for &quot;{value}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CrosswildHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux UI state
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
  const isMobileSearchOpen = useAppSelector(selectIsMobileSearchOpen);
  const totalItems = useAppSelector(selectTotalItems);

  // Local state (ephemeral, no need in Redux)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Dynamic categories from API
  const [categories, setCategories] = useState<NavCategory[]>(FALLBACK_CATEGORIES);
  const [flatCategories, setFlatCategories] = useState<FlatCategory[]>(FALLBACK_FLAT);

  // CMS-driven site settings (logo, top bar, ticker, customize CTA URLs)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Fetch categories from API on mount
  useEffect(() => {
    let cancelled = false;
    categoriesAPI.getTree({ active: true }).then((data) => {
      if (cancelled || !data.categories?.length) return;
      const { nav, flat } = buildNavCategories(data.categories);
      setCategories(nav);
      setFlatCategories(flat);
    }).catch(() => {/* keep fallback */});
    getSiteSettings().then((s) => { if (!cancelled) setSiteSettings(s); });
    return () => { cancelled = true; };
  }, []);

  const header = siteSettings?.header;
  const topBarPhone = header?.topBarPhone || '+91-9529626262';
  const topBarEmail = header?.topBarEmail || 'orders@thecrosswild.com';
  const topBarLinks = header?.topBarLinks?.length ? header.topBarLinks : [
    { label: 'Services', href: '/services' },
    { label: 'How It Works', href: '/our_process' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/image-gallery' },
  ];
  const logoSrc = header?.logo || '/images/logo/logo-crosswile.jpg';
  const logoAlt = header?.logoAlt || 'The CrossWild';
  const customizeCTA = header?.customizeCTA;
  const promoTicker = header?.promoTicker?.length ? header.promoTicker : [
    '🎉 Get 20% OFF on Bulk Orders! BULK20',
    '🚚 Free Delivery on Orders Above ₹999',
    '👕 Custom T-Shirts Starting ₹199',
    '🏆 Premium Quality Printing & Merchandise',
    '📦 Pan India Fast Delivery',
    '✨ Uniforms, Gifts & Promotional Items',
  ];

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileBarSearchRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/';
  const isProductsPage = pathname === '/products' || pathname.startsWith('/products?');
  const isBlogPage = pathname === '/blog' || pathname.startsWith('/blog/');

  // Scroll listener — passive + rAF-throttled, deduped to avoid re-renders
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setIsScrolled((prev) => (prev === next ? prev : next));
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    setSearchLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await productsAPI.getAll({ search: searchQuery.trim(), limit: 6 });
        setSuggestions(res.products || []);
      } catch {
        setSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!desktopSearchRef.current?.contains(target) && !mobileBarSearchRef.current?.contains(target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (!searchQuery.trim()) return;
    setShowDropdown(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, router]);

  const handleSelectProduct = useCallback((id: string) => {
    setShowDropdown(false);
    setSearchQuery('');
    dispatch(closeMobileSearch());
    router.push(`/products/${id}`);
  }, [dispatch, router]);

  const handleSelectCategory = useCallback((slug: string) => {
    setShowDropdown(false);
    setSearchQuery('');
    dispatch(closeMobileSearch());
    router.push(getCategoryUrl(slug));
  }, [dispatch, router]);

  const closeDropdown = useCallback(() => setShowDropdown(false), []);

  return (
    <>
      {/* Backdrop — blurs page when search dropdown or burger menu is open */}
      <div
        onClick={() => { closeDropdown(); dispatch(closeMenu()); }}
        className={`fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-opacity duration-200 ${
          (showDropdown || isMenuOpen) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Top Bar */}
      <div className="bg-primary-800 dark:bg-[#1E1A14] text-white dark:text-[#C8B99A] text-sm py-2 hidden lg:block">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${topBarPhone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">
              <Phone className="w-4 h-4" /><span>{topBarPhone}</span>
            </a>
            <a href={`mailto:${topBarEmail}`} className="flex items-center gap-2 hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">
              <Mail className="w-4 h-4" /><span>{topBarEmail}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {topBarLinks.map((l) => (
              <Link key={l.href} href={l.href || '#'} className="hover:text-white/80 dark:hover:text-[#F5A623] transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-navbar-bg border-b border-navbar-border transition-shadow duration-300 ${
        isScrolled ? 'shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.4)]' : 'shadow-sm'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src={logoSrc} alt={logoAlt}
                width={160} height={50} className="h-12 w-auto dark:brightness-90" priority />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <SearchBox
                value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearchSubmit}
                suggestions={suggestions} loading={searchLoading} showDropdown={showDropdown}
                onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory}
                onClose={closeDropdown} containerRef={desktopSearchRef}
                inputClass="w-full px-4 py-3 pr-12 border-2 border-theme-border bg-theme-bg-soft dark:bg-[#1E1A14] text-theme-text placeholder-theme-text-muted rounded-lg focus:border-primary focus:outline-none transition-colors text-sm"
                isMobile={false} flatCategories={flatCategories}
              />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isHomePage ? 'bg-primary text-white' : 'text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A]'
              }`}>
                <Home className="w-5 h-5" /><span className="font-medium">Home</span>
              </Link>

              {/* Locations Button */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('locations-cta')}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="flex items-center gap-1.5 px-4 py-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Locations</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {activeDropdown === 'locations-cta' && (
                  <div className="absolute top-full right-0 pt-1 z-50">
                    <div className="bg-theme-bg dark:bg-[#222222] border border-theme-border shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-lg min-w-[280px] py-2 max-h-[400px] overflow-y-auto">
                      {FOOTER_LOCATION_ITEMS.map((item) => (
                        <Link
                          key={item.label}
                          href={`/${item.citySlug}`}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-theme-bg-soft dark:hover:bg-[#2C2C2C] transition-colors group/item"
                        >
                          <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-sm text-theme-text group-hover/item:text-blue-500 transition-colors">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => dispatch(openCart())}
                className="relative flex items-center gap-2 px-4 py-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <ThemeToggle />
            </div>

            {/* Mobile: Search + Theme + Menu */}
            <div className="lg:hidden flex items-center gap-1">
              <button onClick={() => dispatch(toggleMobileSearch())}
                aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
                aria-expanded={isMobileSearchOpen}
                className="p-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              <ThemeToggle />
              <button onClick={() => dispatch(toggleMenu())}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                className="p-2 text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#26211A] rounded-lg transition-colors">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileSearchOpen ? 'max-h-[400px] pb-3 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <SearchBox
              value={searchQuery} onChange={setSearchQuery}
              onSubmit={() => { handleSearchSubmit(); dispatch(closeMobileSearch()); }}
              suggestions={suggestions} loading={searchLoading} showDropdown={showDropdown}
              onSelectProduct={(id) => { handleSelectProduct(id); dispatch(closeMobileSearch()); }}
              onSelectCategory={(slug) => { handleSelectCategory(slug); dispatch(closeMobileSearch()); }}
              onClose={closeDropdown} containerRef={mobileBarSearchRef}
              inputClass="w-full px-4 py-2.5 border border-theme-border bg-theme-bg-soft dark:bg-[#1E1A14] text-theme-text placeholder-theme-text-muted rounded-lg pr-12 focus:outline-none focus:border-primary transition-colors text-sm"
              isMobile={true} flatCategories={flatCategories}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-theme-border">
            <ul className="flex items-center gap-6 py-3">
              <li>
                <Link href="/products" className={`text-sm font-semibold transition-colors ${
                  isProductsPage ? 'text-primary' : 'text-theme-text-secondary hover:text-primary'
                }`}>All Products</Link>
              </li>
              {categories.map((category, idx) => (
                <li key={idx} className="relative"
                  onMouseEnter={() => setActiveDropdown(category.name)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  {category.slug ? (
                    <Link href={getCategoryUrl(category.slug)} className="flex items-center gap-1 text-sm font-medium text-theme-text-secondary hover:text-primary transition-colors py-2">
                      {category.name}<ChevronDown className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-1 text-sm font-medium text-theme-text-secondary hover:text-primary transition-colors py-2">
                      {category.name}<ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-0 mt-0 bg-theme-bg dark:bg-[#222222] border border-theme-border shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-lg min-w-[240px] py-2 max-h-[400px] overflow-y-auto">
                      {category.items.map((item, i) => (
                        <Link key={i} href={item.link}
                          className="block px-4 py-2 text-sm text-theme-text-secondary hover:text-primary hover:bg-theme-bg-soft dark:hover:bg-[#2C2C2C] transition-colors">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li className="ml-auto relative"
                onMouseEnter={() => setActiveDropdown('custom-cta')}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="group relative px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white rounded-full bg-gradient-to-r from-primary to-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 transition-all duration-200">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-orange-500 animate-pulse opacity-30" />
                  <span className="relative">Customize</span>
                </button>
                {activeDropdown === 'custom-cta' && (
                  <div className="absolute top-full right-0 pt-1 z-50">
                    <div className="bg-theme-bg dark:bg-[#222222] border border-theme-border shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] rounded-lg min-w-[200px] py-2">
                      <a href={customizeCTA?.whatsappUrl || 'https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20create%20a%20custom%20product.'} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-theme-text-secondary hover:text-green-500 hover:bg-theme-bg-soft dark:hover:bg-[#2C2C2C] transition-colors">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        WhatsApp
                      </a>
                      <a href={customizeCTA?.emailMailto || 'mailto:orders@thecrosswild.com?subject=Custom%20Product%20Inquiry'} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-theme-text-secondary hover:text-primary hover:bg-theme-bg-soft dark:hover:bg-[#2C2C2C] transition-colors">
                        <Mail className="w-4 h-4 text-primary" />
                        Email Us
                      </a>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-theme-bg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[900px] border-t border-theme-border opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}>
          <div className="px-4 py-4 space-y-4 overflow-y-auto max-h-[75vh]">
            <div className="space-y-2">
              <Link href="/products" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-semibold transition-colors ${
                  isProductsPage ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>All Products</Link>
              {categories.map((category, idx) => {
                const isExpanded = activeDropdown === `mobile-${category.name}`;
                return (
                  <div key={idx} className="border-t border-theme-border pt-2">
                    <button
                      onClick={() => setActiveDropdown(isExpanded ? null : `mobile-${category.name}`)}
                      className="w-full flex items-center justify-between py-2 font-semibold text-theme-text hover:text-primary transition-colors"
                    >
                      {category.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      {category.slug && (
                        <Link href={getCategoryUrl(category.slug)} onClick={() => dispatch(closeMenu())}
                          className="block py-1.5 pl-4 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                          View All {category.name}
                        </Link>
                      )}
                      {category.items.map((item, i) => (
                        <Link key={i} href={item.link} onClick={() => dispatch(closeMenu())}
                          className="block py-1.5 pl-4 text-sm text-theme-text-secondary hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}


              <Link href="/services" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  pathname === '/services' ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>Services</Link>

              <Link href="/our_process" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  pathname === '/our_process' ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>How It Works</Link>

              <Link href="/about-us" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  pathname === '/about-us' ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>About Us</Link>

              <Link href="/contact-us" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  pathname === '/contact-us' ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>Contact Us</Link>

              <Link href="/blog" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  isBlogPage ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>Blog</Link>

              <Link href="/image-gallery" onClick={() => dispatch(closeMenu())}
                className={`block py-2 font-medium border-t border-theme-border pt-2 transition-colors ${
                  pathname === '/image-gallery' ? 'text-primary' : 'text-theme-text hover:text-primary'
                }`}>Gallery</Link>

              {/* Locations — mobile expandable */}
              <div className="border-t border-theme-border pt-2">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'mobile-locations' ? null : 'mobile-locations')}
                  className="w-full flex items-center justify-between py-2 font-semibold text-theme-text hover:text-blue-500 transition-colors"
                >
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" />Locations</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-locations' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeDropdown === 'mobile-locations' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {LOCATIONS.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/${loc.slug}`}
                      onClick={() => dispatch(closeMenu())}
                      className="flex items-center gap-2 py-1.5 pl-4 text-sm text-theme-text-secondary hover:text-blue-500 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {loc.categoryLabel} — {loc.city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Product CTA — compact */}
            <div className="border-t border-theme-border pt-3 flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-theme-text-muted">Customize</span>
              <a href="https://wa.me/919529626262?text=Hello%2C%20I%20want%20to%20create%20a%20custom%20product." target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-xs font-semibold">
                <MessageCircle className="w-3.5 h-3.5" />WhatsApp
              </a>
              <a href="mailto:info@thecrosswild.com?subject=Custom%20Product%20Inquiry&body=Hello%2C%20I%20want%20to%20create%20a%20custom%20product.%20Please%20share%20the%20details."
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-primary to-orange-500 text-white rounded-full hover:shadow-[0_0_12px_rgba(249,115,22,0.4)] transition-all text-xs font-semibold">
                <Mail className="w-3.5 h-3.5" />Email
              </a>
            </div>

            <div className="flex gap-2 border-t border-theme-border pt-4">
              <a href="https://wa.me/919529626262" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />WhatsApp
              </a>
              <a href="tel:+919529626262"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                <Phone className="w-5 h-5" />Call Now
              </a>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href="/" onClick={() => dispatch(closeMenu())}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                  isHomePage ? 'bg-primary text-white' : 'border border-theme-border text-theme-text hover:bg-theme-bg-soft dark:hover:bg-[#2C2C2C]'
                }`}>
                <Home className="w-5 h-5" />Home
              </Link>
              <button onClick={() => { dispatch(openCart()); dispatch(closeMenu()); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors relative">
                <ShoppingCart className="w-5 h-5" />Cart
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Scrolling Promo Ticker */}
          <div className="border-t border-primary/30 bg-primary overflow-hidden py-2.5">
            <div className="flex animate-scroll pause-animation whitespace-nowrap" style={{ animationDuration: '12s' }}>
              {[0, 1].map((i) => (
                <span key={i} className="flex items-center gap-6 text-white text-xs font-semibold px-6">
                  {promoTicker.map((msg, idx) => (
                    <React.Fragment key={idx}>
                      <span className="flex items-center gap-2">{msg}</span>
                      <span className="opacity-40">•</span>
                    </React.Fragment>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
