import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import ProductsClient from './ProductsClient';
import ThemeBanner from '@/components/Common/ThemeBanner';

/** Manufacturing banner above the full catalogue — the same story the category
 *  pages tell, for a buyer who lands on "all products" first. */
const PRODUCTS_BANNER = {
  src: '/banners/categories/tshirts-alt.webp',
  aspectRatio: '1672 / 941',
  alt:
    'Manufacturing premium apparel — quality, consistency, your brand. Premium fabrics, ' +
    'precision cutting, quality stitching and custom printing, with low minimum order ' +
    'quantities, competitive pricing and on-time delivery.',
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/products', {
    title: 'Custom T-Shirts, Bags, Caps & Promotional Products Manufacturer | The Cross Wild',
    description: 'Shop The Cross Wild\'s range of custom promotional products — T-shirts, bags, caps, mugs, uniforms, and digital printing. Bulk manufacturing from ₹70/piece with pan-India delivery.',
    keywords: ['custom t-shirt manufacturer', 'bags manufacturer Jaipur', 'cap printing', 'mug printing Jaipur', 'school uniform manufacturer', 'staff uniform manufacturer', 'promotional products bulk order India'],
  });
}

export const revalidate = 60;

export default function ProductsPage() {
  return (
    <>
      <ThemeBanner
        light={PRODUCTS_BANNER.src}
        alt={PRODUCTS_BANNER.alt}
        aspectRatio={PRODUCTS_BANNER.aspectRatio}
        priority
      />
      <ProductsClient />
    </>
  );
}
