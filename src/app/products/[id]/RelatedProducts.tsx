import Link from 'next/link';
import SafeImage from '@/components/Common/SafeImage';
import { productImage } from '@/lib/productImage';
import ProductCodeBadge from '@/components/Common/ProductCodeBadge';
import { Package } from 'lucide-react';
import type { Product } from '@/lib/api';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 pb-12">
      <h2 className="mb-5 text-lg font-bold text-theme-text md:text-xl">You may also like</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id || product._id}
            href={`/products/${product.id || product._id}`}
            className="group overflow-hidden rounded-2xl border border-theme-border bg-theme-bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              {product.image ? (
                <SafeImage
                  {...productImage(product)}
                  alt={product.title || product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="h-10 w-10 text-theme-text-muted opacity-30" />
                </div>
              )}
              <ProductCodeBadge code={product.sku} />
            </div>

            <div className="p-3.5">
              <h3 className="line-clamp-2 text-sm font-semibold text-theme-text transition-colors group-hover:text-primary">
                {product.title || product.name}
              </h3>
              {product.minOrderQuantity && product.minOrderQuantity > 1 && (
                <p className="mt-1 text-xs text-theme-text-muted">
                  Min. {product.minOrderQuantity} pcs
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
