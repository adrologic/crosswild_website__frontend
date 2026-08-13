import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateProductMetadata } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';

// 'not-found' = backend said 404 (real missing product → hard 404 page);
// null = network/server error (fall back to the client-side fetch).
async function getProduct(idOrSlug: string): Promise<any | 'not-found' | null> {
  try {
    // Backend now supports both MongoDB ID and slug lookup
    const response = await fetch(`${API_URL}/api/products/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 404) return 'not-found';
    if (!response.ok) return null;
    const data = await response.json();
    const product = data.product || data;
    return { ...product, id: product._id || product.id };
  } catch {
    return null;
  }
}

// Same primary category, current product excluded. Failures are silent — a
// missing "you may also like" strip must never take the product page down.
async function getRelatedProducts(product: any): Promise<any[]> {
  const category = product?.productCategories?.[0]?.category || product?.category;
  if (!category) return [];
  try {
    const response = await fetch(
      `${API_URL}/api/products?category=${encodeURIComponent(category)}&limit=12`,
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(15000) }
    );
    if (!response.ok) return [];
    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];
    return products
      .map((p: any) => ({ ...p, id: p._id || p.id }))
      .filter((p: any) => p.id !== product.id)
      .slice(0, 8);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product || product === 'not-found') {
    return { title: 'Product Not Found | The CrossWild' };
  }
  return generateProductMetadata({
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || '',
    image: product.image,
    category: product.category,
    seo: product.seo,
  });
}

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Reuse the server-fetched product (deduped with the generateMetadata fetch)
  // so the client doesn't need to refetch it on mount.
  const product = await getProduct(id);
  // Real 404 from the backend → serve an actual 404 (was a soft-404 before).
  if (product === 'not-found') notFound();
  const relatedProducts = product ? await getRelatedProducts(product) : [];
  return (
    <ProductDetailClient
      id={id}
      initialProduct={product}
      relatedProducts={relatedProducts}
    />
  );
}
