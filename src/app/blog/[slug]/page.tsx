import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { generateBlogMetadata } from '@/lib/seo';
import BlogDetailClient from './BlogDetailClient';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';

async function getBlog(idOrSlug: string) {
  try {
    const response = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const blog = data.blog || data;
    return { ...blog, id: blog._id || blog.id };
  } catch {
    return null;
  }
}

// Detect MongoDB ObjectId (24-char hex) — redirect to slug URL
const isObjectId = (s: string) => /^[a-f0-9]{24}$/i.test(s);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | The CrossWild' };
  return generateBlogMetadata({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    paragraph: blog.paragraph || '',
    image: blog.image,
    author: blog.author,
    tags: blog.tags,
    seo: blog.seo,
  });
}

export const revalidate = 60;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 301 redirect: if accessed via MongoDB ObjectId, forward to canonical slug URL
  if (isObjectId(slug)) {
    const blog = await getBlog(slug);
    if (blog?.slug) redirect(`/blog/${blog.slug}`);
  }

  return <BlogDetailClient slug={slug} />;
}
