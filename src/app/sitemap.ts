import { MetadataRoute } from 'next';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';
const baseUrl = 'https://thecrosswild.com';

export const revalidate = 3600; // Refresh every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes (existing 18 pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/products',
    '/image-gallery',
    '/our_process',
    '/t-shirt_manufacturing',
    '/sweatshirt_manufacturing',
    '/bag_manufacturing',
    '/cap_manufacturing',
    '/mug_manufacturing',
    '/digital_printing',
    '/face_masks_ppe_kits',
    '/sanitizer_infrared_thermometer',
    '/school_uniform',
    '/staff_uniform',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product URLs (use slug if available, otherwise fallback to _id)
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const productsRes = await fetch(`${API_URL}/api/products?limit=1000`, {
      next: { revalidate: 3600 },
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
  } catch (error) {
    console.error('Sitemap: Failed to fetch products', error);
  }

  // Dynamic blog URLs (use slug if available, otherwise fallback to _id)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogsRes = await fetch(`${API_URL}/api/blogs?limit=1000`, {
      next: { revalidate: 3600 },
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
  } catch (error) {
    console.error('Sitemap: Failed to fetch blogs', error);
  }

  // Dynamic category URLs (from API)
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categoriesRes = await fetch(`${API_URL}/api/categories?active=true`, {
      next: { revalidate: 3600 },
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
  } catch (error) {
    console.error('Sitemap: Failed to fetch categories', error);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
