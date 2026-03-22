import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ProductsClient from './ProductsClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/products', {
    title: 'Custom T-Shirts, Uniforms & Corporate Merchandise | The CrossWild',
    description: 'Browse our complete range of custom t-shirts, uniforms, bags, caps, and corporate merchandise. Premium quality printing and embroidery services across India.',
    keywords: ['custom t-shirts', 'corporate uniforms', 'promotional merchandise', 'custom printing', 'bulk orders India'],
  });
}

export const revalidate = 60;

export default function ProductsPage() {
  return <ProductsClient />;
}
