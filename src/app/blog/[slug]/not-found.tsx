import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/components/Common/Breadcrumb';

/**
 * Shown when a /blog/<slug> URL has no matching post. Kept server-rendered and
 * link-bearing rather than blank: whatever status the response carries, a
 * crawler that lands here should still find its way back into the article set.
 */
export default function BlogPostNotFound() {
  return (
    <>
      <Breadcrumb
        pageName="Article Not Found"
        description="The article you're looking for doesn't exist or has been moved"
        trail={[{ name: 'Blog', href: '/blog' }]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">📄</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The article you&rsquo;re looking for doesn&rsquo;t exist or has been removed.
            Browse the blog to find what you were after.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all articles
          </Link>
        </div>
      </section>
    </>
  );
}
