import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import BlogClient from './BlogClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/blog', {
    title: 'Blog - Custom Printing Tips, Trends & Industry Insights | The CrossWild',
    description: 'Read expert tips, industry trends, and helpful guides for custom printing, promotional merchandise, and corporate branding from The CrossWild.',
    keywords: ['custom printing blog', 'promotional merchandise tips', 'branding insights', 'corporate merchandise guide'],
  });
}

export const revalidate = 60;

export default function BlogPage() {
  return <BlogClient />;
}
