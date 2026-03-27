import { Metadata } from 'next';
import { generateBlogMetadata } from '@/lib/seo';
import BlogDetailClient from './BlogDetailClient';

const API_URL = process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com';

async function getBlog(idOrSlug: string) {
  try {
    // Backend now supports both MongoDB ID and slug lookup
    const response = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(idOrSlug)}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const blog = data.blog || data;
    return { ...blog, id: blog._id || blog.id };
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
  const blog = await getBlog(id);
  if (!blog) {
    return { title: 'Blog Not Found | The CrossWild' };
  }
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
