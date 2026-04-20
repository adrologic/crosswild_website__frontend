import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ProductsClient from './ProductsClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/products', {
    title: 'Custom T-Shirts, Bags, Caps & Promotional Products Manufacturer | The Cross Wild',
    description: 'Shop The Cross Wild\'s range of custom promotional products — T-shirts, bags, caps, mugs, uniforms, and digital printing. Bulk manufacturing from ₹70/piece with pan-India delivery.',
    keywords: ['custom t-shirt manufacturer', 'bags manufacturer Jaipur', 'cap printing', 'mug printing Jaipur', 'school uniform manufacturer', 'staff uniform manufacturer', 'promotional products bulk order India'],
  });
}

export const revalidate = 60;

export default function ProductsPage() {
  return <ProductsClient />;
}
