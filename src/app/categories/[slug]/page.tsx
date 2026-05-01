import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateCategoryMetadata, generateCategorySchema, generateBreadcrumbSchema, getGlobalSEO } from '@/lib/seo';
import { getCategoryUrl, getSubCategoryUrl } from '@/lib/categoryUrls';
import { ChevronRight, Grid3x3, ArrowRight } from 'lucide-react';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

async function getCategoryProducts(categoryId: string) {
  try {
    const res = await fetch(`${API_URL}/products?category=${categoryId}&limit=50`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategory(slug);
  if (!data?.category) {
    return { title: 'Category Not Found' };
  }
  return generateCategoryMetadata(data.category);
}

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategory(slug);

  if (!data?.category) {
    notFound();
  }

  const { category, subcategories } = data;
  const globalSEO = await getGlobalSEO();
  const siteUrl = globalSEO.siteUrl || 'https://thecrosswild.com';

  // Fetch products for this category
  const products = await getCategoryProducts(category.id);

  // Breadcrumb
  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Categories', url: `${siteUrl}/products` },
    { name: category.name, url: `${siteUrl}/categories/${category.seoUrl || category.id}` },
  ];

  // Structured data
  const categorySchema = generateCategorySchema(category, subcategories, siteUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Custom meta tags from admin */}
      {category.seo?.otherMetaTags && (
        <div dangerouslySetInnerHTML={{ __html: category.seo.otherMetaTags }} />
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full md:w-64 h-40 md:h-40 object-cover rounded-xl shadow-md"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {category.icon && <span className="text-4xl">{category.icon}</span>}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h1>
                </div>
                {category.seo?.description && (
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg max-w-3xl">
                    {category.seo.description}
                  </p>
                )}
                {subcategories.length > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    {subcategories.length} subcategories | {products.length} products
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Subcategories Grid */}
          {subcategories.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Grid3x3 className="w-6 h-6 text-primary" />
                Browse {category.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {subcategories.map((sub: any) => (
                  <Link
                    key={sub._id || sub.id}
                    href={getSubCategoryUrl(category.id, sub.id)}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                  >
                    {sub.image ? (
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-3xl text-primary/40">{category.icon || '📦'}</span>
                      </div>
                    )}
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {sub.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Products</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Rich Description */}
          {category.description && (
            <section className="mb-12">
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: category.description }}
              />
            </section>
          )}

          {/* Products Grid */}
          {products.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.name} Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug || product._id}`}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.price > 0 && (
                        <p className="text-primary font-bold mt-1">₹{product.price}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Description 1 (secondary description block) */}
          {category.description1 && (
            <section className="mb-12">
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: category.description1 }}
              />
            </section>
          )}

          {/* View all products CTA */}
          <div className="text-center py-8">
            <Link
              href={getCategoryUrl(category.id)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              View All {category.name}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
