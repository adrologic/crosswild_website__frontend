import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateCategoryMetadata, generateCategorySchema, generateBreadcrumbSchema, getGlobalSEO } from '@/lib/seo';
import { ChevronRight } from 'lucide-react';
import CategoryBrowser from './CategoryBrowser';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// When viewing a sub-category page, also fetch the parent's other sub-categories
// so the sidebar can offer sibling navigation.
async function getSiblings(parentId: string) {
  try {
    const res = await fetch(`${API_URL}/categories?parent=${parentId}&active=true`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
  } catch {
    return [];
  }
}

// Top-level categories for the sidebar — fetched server-side so the client
// component doesn't re-request them on mount.
async function getTopLevelCategories() {
  try {
    const res = await fetch(`${API_URL}/categories?root=true&active=true`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories || [];
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
  const [data, topCategories] = await Promise.all([
    getCategory(slug),
    getTopLevelCategories(),
  ]);

  if (!data?.category) {
    notFound();
  }

  const { category, subcategories } = data;
  const globalSEO = await getGlobalSEO();
  const siteUrl = globalSEO.siteUrl || 'https://thecrosswild.com';

  const isSubCategory = !!category.parentCategory;
  const parent = isSubCategory ? category.parentCategory : null;

  // For sub-cat pages, sidebar shows siblings (other subs under same parent).
  // For top-level pages, sidebar shows this category's own subcategories.
  const siblingSubs = isSubCategory ? await getSiblings(parent.id) : subcategories;

  const ownUrl = `${siteUrl}/category/${category.seoUrl || category.id}`;

  const breadcrumbs = [
    { name: 'Home', url: siteUrl },
    { name: 'Products', url: `${siteUrl}/products` },
    ...(parent
      ? [{ name: parent.name, url: `${siteUrl}/category/${parent.seoUrl || parent.id}` }]
      : []),
    { name: category.name, url: ownUrl },
  ];

  const categorySchema = generateCategorySchema(category, subcategories, siteUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {category.seo?.otherMetaTags && (
        <div dangerouslySetInnerHTML={{ __html: category.seo.otherMetaTags }} />
      )}

      {/* Breadcrumb (server-rendered for SEO) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            {parent && (
              <>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link
                  href={`/category/${parent.seoUrl || parent.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {parent.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <CategoryBrowser
        category={{ id: category.id, name: category.name, seoUrl: category.seoUrl }}
        parent={parent ? { id: parent.id, name: parent.name, seoUrl: parent.seoUrl } : null}
        subcategories={(siblingSubs || []).map((s: any) => ({ id: s.id, name: s.name, seoUrl: s.seoUrl }))}
        topCategories={topCategories.map((c: any) => ({ id: c.id, name: c.name, seoUrl: c.seoUrl }))}
        description={category.seo?.description || category.description?.replace(/<[^>]*>/g, '').slice(0, 200)}
      />

      {/* Server-rendered rich descriptions (good for SEO, after the browser) */}
      {(category.description || category.description1) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {category.description && (
            <section className="mb-12">
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: category.description }}
              />
            </section>
          )}
          {category.description1 && (
            <section className="mb-12">
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: category.description1 }}
              />
            </section>
          )}
        </div>
      )}
    </>
  );
}
