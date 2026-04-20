import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import BlogClient from './BlogClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/blog', {
    title: 'Blog - Custom T-shirt Printing, Promotional Products & Manufacturing Insights | The Cross Wild',
    description: 'Read expert articles on custom t-shirt printing, bag manufacturing, promotional products, corporate branding, and uniform manufacturing from The Cross Wild, Jaipur.',
    keywords: ['custom t-shirt printing blog', 'promotional products India', 'bag manufacturing tips', 'corporate uniform guide', 'custom printing Jaipur'],
  });
}

export const revalidate = 60;

export default function BlogPage() {
  return <BlogClient />;
}
