"use client";

import { useState, useEffect } from 'react';
import { productsAPI, type Product } from '@/lib/api';
import { getCategoryListingUrl } from '@/lib/categoryUrls';
import { productImage, subImage } from '@/lib/productImage';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  ChevronRight,
  Star,
  Info,
  Sparkles,
  Layers,
  MessagesSquare,
} from 'lucide-react';
import { ProductSEO } from '@/components/SEO/SEOHead';
import ProductGallery from './ProductGallery';
import EnquiryActions from './EnquiryActions';
import RelatedProducts from './RelatedProducts';

const CATEGORY_NAMES: Record<string, string> = {
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

const getCategoryName = (slug: string) => CATEGORY_NAMES[slug] || slug;

// A gallery slide: the full-size photo plus its ~1KB inline placeholder, so a
// slow connection paints something immediately instead of an empty frame.
type Slide = { src: string; blurDataURL?: string };

const formatSubcategory = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

// Facts about how this business actually works — no delivery or stock claims.
const TRUST_POINTS = [
  { icon: Sparkles, text: 'Custom branding — printing and embroidery on every piece' },
  { icon: Layers, text: 'Built for bulk: sampling, size sets and repeat orders' },
  { icon: MessagesSquare, text: 'Quoted per enquiry — no online payment, no hidden charges' },
];

export default function ProductDetailClient({
  id,
  initialProduct,
  relatedProducts = [],
}: {
  id: string;
  initialProduct?: Product | null;
  relatedProducts?: Product[];
}) {
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Server already provided the product — sync state (the component is NOT
    // remounted on client-side navigation between two product pages, so the
    // new initialProduct arrives as a prop change) and skip the client refetch.
    if (initialProduct) {
      setProduct(initialProduct);
      setError(null);
      setLoading(false);
      return;
    }
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsAPI.getById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id, initialProduct]);

  // ─── Loading State ───
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-[3px] border-primary border-t-transparent mb-4" />
          <p className="text-theme-text-muted text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  // ─── Error / Not Found ───
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="text-center max-w-md px-4">
          <Package className="w-16 h-16 text-theme-text-muted mx-auto mb-5 opacity-30" />
          <h2 className="text-2xl font-bold text-theme-text mb-2">
            {error ? 'Error Loading Product' : 'Product Not Found'}
          </h2>
          <p className="text-theme-text-secondary mb-6 text-sm">
            {error || "The product you're looking for doesn't exist or may have been removed."}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ─── Build gallery images ───
  // Every image, never a slice: capping the list silently hides photos on
  // exactly the products that have the most of them.
  const galleryImages: Slide[] = [];
  if (product.image) galleryImages.push(productImage(product, 'full'));
  if (product.subImages && product.subImages.length > 0) {
    product.subImages.forEach(img => {
      const slide = subImage(img, 'full');
      if (slide.src) galleryImages.push(slide);
    });
  }

  // Primary category for breadcrumb
  const primaryCategory = product.productCategories?.[0]?.category || product.category || '';

  // Details map (from productType dynamic fields)
  const detailFields = product.productType?.detailFields || [];
  const getDetailLabel = (key: string) => {
    const field = detailFields.find((f: any) => f.fieldName === key);
    return field
      ? field.fieldName.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').trim()
      : key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').trim();
  };
  const formatDetailValue = (value: any): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  // Safely extract details entries (Mongoose Map → plain object after JSON serialization)
  let detailEntries: [string, any][] = [];
  if (product.details && typeof product.details === 'object') {
    const raw = typeof (product.details as any).toJSON === 'function'
      ? (product.details as any).toJSON()
      : product.details;
    detailEntries = Object.entries(raw).filter(
      ([k, v]) => v !== undefined && v !== null && v !== '' && !k.startsWith('$')
    );
  }

  // Collect data flags
  const hasCode = !!product.sku;
  const hasCategories = product.productCategories && product.productCategories.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const hasCustomFields = product.customFields && product.customFields.length > 0;
  const hasSections = product.sections && product.sections.length > 0;
  const hasDetails = detailEntries.length > 0;
  const hasProductType = !!product.productType?.name;
  const hasMinOrder = product.minOrderQuantity && product.minOrderQuantity > 1;
  const hasSpecsTable = hasCode || hasProductType || hasCategories || hasSizes || hasColors || hasMinOrder || hasDetails || hasCustomFields;

  return (
    <>
      <ProductSEO
        product={product}
        breadcrumbItems={[
          { name: 'Home', url: 'https://thecrosswild.com' },
          { name: 'Products', url: 'https://thecrosswild.com/products' },
          { name: product.name, url: `https://thecrosswild.com/products/${product.id}` },
        ]}
      />

      <div className="min-h-screen bg-theme-bg">
        {/* ─── Breadcrumb ─── */}
        <div className="bg-theme-bg-card border-b border-theme-border">
          <div className="max-w-7xl mx-auto px-5 py-3.5 pt-22">
            <nav className="flex items-center gap-1.5 text-sm">
              <Link href="/" className="text-theme-text-muted hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-theme-text-muted opacity-40" />
              <Link href="/products" className="text-theme-text-muted hover:text-primary transition-colors">
                Products
              </Link>
              {primaryCategory && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-theme-text-muted opacity-40" />
                  <Link
                    href={getCategoryListingUrl(primaryCategory)}
                    className="text-theme-text-muted hover:text-primary transition-colors"
                  >
                    {getCategoryName(primaryCategory)}
                  </Link>
                </>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-theme-text-muted opacity-40" />
              <span className="text-theme-text font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* ─── MAIN SPLIT LAYOUT ─── */}
        <section className="max-w-7xl mx-auto px-5 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* ════════ LEFT — Gallery (sticky on desktop) ════════ */}
            <div className="md:sticky md:top-24">
              <ProductGallery
                key={product.id}
                images={galleryImages}
                productName={product.name}
                sku={product.sku}
              />
            </div>

            {/* ════════ RIGHT — Product Info ════════ */}
            <div className="space-y-5">
              {/* Product Type */}
              {hasProductType && (
                <span className="inline-block px-3 py-1 bg-secondary-blue/10 text-secondary-blue text-xs font-medium rounded-full">
                  {product.productType!.name}
                </span>
              )}

              {/* Product Name — keep in sync with the breadcrumb (both use product.name) */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-theme-text leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Product code + rating */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {hasCode && (
                  <p className="text-sm text-theme-text-muted">
                    Product code:{' '}
                    <span className="font-mono font-semibold tracking-wide text-theme-text">
                      {product.sku}
                    </span>
                  </p>
                )}

                {product.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= product.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-theme-text-muted opacity-30'
                          }`}
                        />
                      ))}
                    </div>
                    {product.reviews > 0 && (
                      <span className="text-xs text-theme-text-muted">
                        ({product.reviews} {product.reviews === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Tagline */}
              {product.tagline && (
                <p className="text-base md:text-lg text-theme-text-secondary leading-relaxed">
                  {product.tagline}
                </p>
              )}

              {/* Short Description */}
              {product.shortDescription && (
                <div
                  className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
              )}

              {/* Price — most bulk products carry none and are quoted per buyer */}
              {product.price > 0 && (
                <p className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                  {hasMinOrder && (
                    <span className="text-sm font-normal text-theme-text-muted ml-2">
                      (Min. order: {product.minOrderQuantity} pcs)
                    </span>
                  )}
                </p>
              )}

              {/* ─── Enquiry actions ─── */}
              <div className="pt-1">
                <EnquiryActions product={product} />
              </div>

              {/* ─── Trust bullets ─── */}
              <ul className="space-y-2.5 border-t border-theme-border pt-5">
                {TRUST_POINTS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-theme-text-secondary">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Full description (only when the short one is already shown above
                  the fold it would otherwise duplicate) */}
              {!product.shortDescription && product.description && (
                <div
                  className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {/* ─── Customization Note ─── */}
              <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-theme-text mb-0.5">Custom Branding Available</p>
                  <p className="text-xs text-theme-text-secondary leading-relaxed">
                    Want your logo or custom design? We offer printing and embroidery on all products. Reach out via WhatsApp or Email to discuss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETAIL BOXES — 2 columns on desktop to use width & cut page length ─── */}
        {((product.shortDescription && product.description) || hasSpecsTable || hasSections) && (
          <section className="max-w-7xl mx-auto px-5 pb-6">
            <div className="grid md:grid-cols-2 gap-6 items-start">

              {/* About This Product */}
              {product.shortDescription && product.description && (
                <div className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8">
                  <h2 className="text-lg font-bold text-theme-text mb-4">About This Product</h2>
                  <div
                    className="rich-text text-sm text-theme-text-secondary leading-7"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Product Details / Specifications */}
              {hasSpecsTable && (
                <div className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Info className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-theme-text">Product Details</h2>
                  </div>
                  <div className="divide-y divide-theme-border">
                    {hasCode && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Product Code</span>
                        <span className="text-sm font-mono font-semibold text-theme-text">{product.sku}</span>
                      </div>
                    )}
                    {hasProductType && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Type</span>
                        <span className="text-sm text-theme-text">{product.productType!.name}</span>
                      </div>
                    )}
                    {hasCategories && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Category</span>
                        <span className="text-sm text-theme-text">
                          {product.productCategories!.map(pc => {
                            const catName = getCategoryName(pc.category);
                            const subs = pc.subcategories?.length
                              ? ` (${pc.subcategories.map(formatSubcategory).join(', ')})`
                              : '';
                            return catName + subs;
                          }).join(' · ')}
                        </span>
                      </div>
                    )}
                    {hasSizes && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Available Sizes</span>
                        <span className="text-sm text-theme-text">{product.sizes!.join(', ')}</span>
                      </div>
                    )}
                    {hasColors && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Available Colors</span>
                        <span className="text-sm text-theme-text">{product.colors!.join(', ')}</span>
                      </div>
                    )}
                    {hasMinOrder && (
                      <div className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">Min. Order Quantity</span>
                        <span className="text-sm text-theme-text">{product.minOrderQuantity} pcs</span>
                      </div>
                    )}
                    {detailEntries.map(([key, value]) => (
                      <div key={key} className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0 capitalize">
                          {getDetailLabel(key)}
                        </span>
                        <span className="text-sm text-theme-text">
                          {formatDetailValue(value)}
                        </span>
                      </div>
                    ))}
                    {hasCustomFields && product.customFields!.map((field, idx) => (
                      <div key={`cf-${idx}`} className="flex items-start py-3 first:pt-0 last:pb-0">
                        <span className="w-2/5 text-sm font-medium text-theme-text-muted flex-shrink-0">
                          {field.label}
                        </span>
                        <span className="text-sm text-theme-text">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic CMS content sections */}
              {hasSections && product.sections!.map((section, index) => (
                <div
                  key={index}
                  className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8"
                >
                  <h2 className="text-lg font-bold text-theme-text mb-4">
                    {section.title}
                  </h2>
                  <div
                    className="rich-text text-sm text-theme-text-secondary leading-7"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}

            </div>
          </section>
        )}

        {/* ─── RELATED PRODUCTS ─── */}
        <RelatedProducts products={relatedProducts} />

        {/* ─── BACK BUTTON ─── */}
        <div className="max-w-7xl mx-auto px-5 pb-10 pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-theme-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>
        </div>
      </div>
    </>
  );
}
