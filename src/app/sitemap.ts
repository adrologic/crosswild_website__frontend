import { MetadataRoute } from 'next';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';
const baseUrl = 'https://www.thecrosswild.com';

export const revalidate = 3600; // Refresh every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes (existing 18 pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    { route: '',               priority: 1.0, freq: 'daily'   },
    { route: '/about-us',      priority: 0.8, freq: 'monthly' },
    { route: '/contact-us',    priority: 0.8, freq: 'monthly' },
    { route: '/blog',          priority: 0.9, freq: 'weekly'  },
    { route: '/products',      priority: 0.9, freq: 'daily'   },
    { route: '/services',      priority: 0.9, freq: 'weekly'  },
    // Old-site keyword product pages (same URLs as before — preserving rankings)
    { route: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur', priority: 0.9, freq: 'weekly' },
    { route: '/product/school-laptop-bag-manufacturer-in-Jaipur',             priority: 0.9, freq: 'weekly' },
    { route: '/product/cap-printing-manufacturer-in-jaipur',                  priority: 0.9, freq: 'weekly' },
    { route: '/product/school-uniform',                                        priority: 0.8, freq: 'weekly' },
    { route: '/product/staff-uniform-manufacturer',                            priority: 0.8, freq: 'weekly' },
    { route: '/product/sweatshirt-hoodie-manufacturer-in-Jaipur',             priority: 0.8, freq: 'weekly' },
    { route: '/product/printing',                                              priority: 0.8, freq: 'weekly' },
    { route: '/product/mug-printing-in-Jaipur',                               priority: 0.8, freq: 'weekly' },
    { route: '/image-gallery', priority: 0.7, freq: 'monthly' },
    { route: '/our_process',   priority: 0.7, freq: 'monthly' },
    // Location pages — same slugs as old site (preserve rankings)
    { route: '/tshirt-manufacturer-in-jodhpur',            priority: 0.8, freq: 'weekly' },
    { route: '/bags-manufacturer-in-jodhpur',              priority: 0.8, freq: 'weekly' },
    { route: '/cap-printing-manufacturer-jodhpur',         priority: 0.8, freq: 'weekly' },
    { route: '/uniform-manufacturer-jodhpur',              priority: 0.8, freq: 'weekly' },
    { route: '/tshirt-manufacturer-in-indore',             priority: 0.8, freq: 'weekly' },
    { route: '/bag-manufacturer-in-indore',                priority: 0.8, freq: 'weekly' },
    { route: '/uniform-manufacturer-in-indore',            priority: 0.8, freq: 'weekly' },
    { route: '/bags-manufacturing-company-in-udaipur',     priority: 0.8, freq: 'weekly' },
    { route: '/tshirt-manufacturer-wholesaler-in-udaipur', priority: 0.8, freq: 'weekly' },
    { route: '/tshirt-manufacturer-wholesaler-in-kota',    priority: 0.8, freq: 'weekly' },
    { route: '/bags-manufacturing-company-in-kota',        priority: 0.8, freq: 'weekly' },
    { route: '/tshirt-manufacturer-wholesaler-in-sikar',   priority: 0.8, freq: 'weekly' },
    { route: '/bags-manufacturing-company-in-sikar',       priority: 0.8, freq: 'weekly' },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority,
  }));

  // Dynamic product URLs
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsRes = await fetch(`${API_URL}/api/products?limit=1000`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (productsRes.ok) {
      const data = await productsRes.json();
      const products = data.products || [];
      productRoutes = products.map((product: any) => ({
        url: `${baseUrl}/products/${product.slug || product._id || product.id}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Backend unavailable — skip dynamic product routes
  }

  // Dynamic blog URLs
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsRes = await fetch(`${API_URL}/api/blogs?limit=1000`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (blogsRes.ok) {
      const data = await blogsRes.json();
      const blogs = data.blogs || [];
      blogRoutes = blogs.map((blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug || blog._id || blog.id}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Backend unavailable — skip dynamic blog routes
  }

  // Dynamic category URLs
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categoriesRes = await fetch(`${API_URL}/api/categories?active=true`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (categoriesRes.ok) {
      const data = await categoriesRes.json();
      const categories = data.categories || [];
      categoryRoutes = categories
        .filter((cat: any) => cat.seoUrl)
        .map((cat: any) => ({
          url: `${baseUrl}/categories/${cat.seoUrl}`,
          lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
    }
  } catch {
    // Backend unavailable — skip dynamic category routes
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
