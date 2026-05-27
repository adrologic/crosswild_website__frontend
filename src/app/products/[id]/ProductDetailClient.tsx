"use client";

import { useState, useEffect } from 'react';
import { productsAPI, type Product } from '@/lib/api';
import { getCategoryUrl, getSubCategoryUrl } from '@/lib/categoryUrls';
import SafeImage from '@/components/Common/SafeImage';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  MessageCircle,
  Mail,
  ChevronRight,
  Star,
  Info,
  Sparkles,
} from 'lucide-react';
import { ProductSEO } from '@/components/SEO/SEOHead';

const WHATSAPP_NUMBER = '+919529626262';
const EMAIL_ADDRESS = 'orders@thecrosswild.com';

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

const getSubImageUrl = (img: string | { url: string }) =>
  typeof img === 'string' ? img : img.url;

const formatSubcategory = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export default function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productsAPI.getById(id);
        console.log('Product data:', JSON.stringify(data, null, 2));
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

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
  const galleryImages: string[] = [];
  if (product.image) galleryImages.push(product.image);
  if (product.subImages && product.subImages.length > 0) {
    product.subImages.forEach(img => {
      const url = getSubImageUrl(img);
      if (url) galleryImages.push(url);
    });
  }

  // ─── WhatsApp & Email ───
  const whatsappMessage = `Hi, I am interested in this product: ${product.name}`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
  const emailLink = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(`Inquiry for ${product.name}`)}`;

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
  const hasCategories = product.productCategories && product.productCategories.length > 0;
  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const hasCustomFields = product.customFields && product.customFields.length > 0;
  const hasSections = product.sections && product.sections.length > 0;
  const hasDetails = detailEntries.length > 0;
  const hasProductType = !!product.productType?.name;
  const hasMinOrder = product.minOrderQuantity && product.minOrderQuantity > 1;
  const hasSpecsTable = hasProductType || hasCategories || hasSizes || hasColors || hasMinOrder || hasDetails || hasCustomFields;

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
                    href={getCategoryUrl(primaryCategory)}
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

            {/* ════════ LEFT — Image Gallery (Sticky) ════════ */}
            <div className="md:sticky md:top-24 space-y-3">
              {/* Main Image */}
              <div className="relative bg-theme-bg-card border border-theme-border rounded-2xl overflow-hidden aspect-square w-full">
                {galleryImages.length > 0 ? (
                  <SafeImage
                    src={galleryImages[selectedImage]}
                    alt={`${product.name} - Image ${selectedImage + 1}`}
                    fill
                    className="object-contain p-6"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-20 h-20 text-theme-text-muted opacity-20" />
                  </div>
                )}

                {/* Best Seller badge overlay */}
                {product.bestSeller && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-sm">
                      Best Seller
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all ${
                        selectedImage === idx
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-theme-border hover:border-theme-text-muted'
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ════════ RIGHT — Product Info ════════ */}
            <div className="space-y-6">
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

              {/* Tagline */}
              {product.tagline && (
                <p className="text-base md:text-lg text-theme-text-secondary leading-relaxed">
                  {product.tagline}
                </p>
              )}

              {/* Price */}
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

              {/* Min Order Quantity (when no price) */}
              {(!product.price || product.price === 0) && hasMinOrder && (
                <p className="text-sm text-theme-text-secondary">
                  Minimum Order Quantity: <span className="font-semibold text-theme-text">{product.minOrderQuantity} pcs</span>
                </p>
              )}

              {/* Rating */}
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

              {/* Short Description */}
              {product.shortDescription && (
                <div
                  className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
              )}

              {/* Description (only if no shortDescription) */}
              {!product.shortDescription && product.description && (
                <div
                  className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {/* ─── CTA Buttons ─── */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#1eba59] text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>
                <a
                  href={emailLink}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors text-sm shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                  Email Inquiry
                </a>
              </div>

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

        {/* ─── ABOUT / FULL DESCRIPTION ─── */}
        {product.shortDescription && product.description && (
          <section className="max-w-3xl mx-auto px-5 pb-6">
            <div className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8">
              <h2 className="text-lg font-bold text-theme-text mb-4">About This Product</h2>
              <div
                className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </section>
        )}

        {/* ─── PRODUCT DETAILS / SPECIFICATIONS TABLE ─── */}
        {hasSpecsTable && (
          <section className="max-w-3xl mx-auto px-5 pb-6">
            <div className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-5">
                <Info className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-theme-text">Product Details</h2>
              </div>
              <div className="divide-y divide-theme-border">
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
          </section>
        )}

        {/* ─── DYNAMIC CMS CONTENT SECTIONS ─── */}
        {hasSections && (
          <section className="max-w-3xl mx-auto px-5 pb-6 space-y-4">
            {product.sections!.map((section, index) => (
              <div
                key={index}
                className="bg-theme-bg-card border border-theme-border rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-lg font-bold text-theme-text mb-4">
                  {section.title}
                </h2>
                <div
                  className="rich-text text-sm text-theme-text-secondary leading-7 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </section>
        )}

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
