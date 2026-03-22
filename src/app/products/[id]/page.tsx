import { Metadata } from 'next';
import { generateProductMetadata } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';

async function getProduct(id: string) {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const product = data.product || data;
    return { ...product, id: product._id || product.id };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) {
    return { title: 'Product Not Found | The CrossWild' };
  }
  return generateProductMetadata({
    id: product.id,
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
  return <ProductDetailClient id={id} />;
}
