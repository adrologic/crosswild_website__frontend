import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import {
  SITE_URL,
  getAllBlogs,
  toBlogCard,
  type BlogCard,
} from '@/lib/blog';
import Breadcrumb from '@/components/Common/Breadcrumb';
import BlogList from './BlogList';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/blog', {
    title: 'Blog - Custom T-shirt Printing, Promotional Products & Manufacturing Insights | The Cross Wild',
    description: 'Read expert articles on custom t-shirt printing, bag manufacturing, promotional products, corporate branding, and uniform manufacturing from The Cross Wild, Jaipur.',
    keywords: ['custom t-shirt printing blog', 'promotional products India', 'bag manufacturing tips', 'corporate uniform guide', 'custom printing Jaipur'],
  });
}

// Posts change rarely — an hour of ISR keeps this page static-fast and fresh.
// Deliberately not `force-dynamic`: nothing on this page is per-request, and
// going dynamic would cost a backend round trip on every crawl.
// Must stay a literal — Next parses this statically, it can't follow a const
// imported from another module.
export const revalidate = 3600;

/** How many posts the "Recent Posts" list links to. */
const RECENT_POSTS_COUNT = 15;

export default async function BlogPage() {
  // Deliberately unguarded: if the backend can't be reached this throws, the
  // error boundary renders and Next returns a 500. Catching it here would ship
  // an empty page under HTTP 200, which tells Google the blog has no articles.
  const blogs = await getAllBlogs();
  const cards: BlogCard[] = blogs.map(toBlogCard);
  const recent = cards.slice(0, RECENT_POSTS_COUNT);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: 'The Cross Wild Blog',
    description:
      'Expert articles on custom t-shirt printing, bag manufacturing, promotional products, corporate branding and uniform manufacturing.',
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Organization',
      name: 'The Cross Wild',
      url: SITE_URL,
    },
    blogPost: cards.map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      url: `${SITE_URL}${blog.href}`,
      image: blog.image || undefined,
      datePublished: blog.dateIso,
      author: { '@type': 'Person', name: blog.authorName },
    })),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        pageName="Our Blog"
        description="Stay updated with the latest trends, tips, and insights in custom printing and promotional merchandise"
      />

      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="w-full px-6 lg:px-12">
          {/* Header Section — the page's single <h1> */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles &amp; Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover expert tips, industry trends, and helpful guides for your custom printing and branding needs
            </p>
          </div>

          {/* Every post is rendered here on the server; this client component
              only layers search and tag filtering over the same list. */}
          <BlogList blogs={cards} />

          {/* Recent Posts — the internal-link path every post URL depends on.
              Matches the old site's sidebar list; kept server-rendered. */}
          {recent.length > 0 && (
            <aside
              aria-labelledby="recent-posts-heading"
              className="mt-20 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-10"
            >
              <h2
                id="recent-posts-heading"
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Recent Posts
              </h2>
              <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                {recent.map((blog) => (
                  <li key={blog.id} className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="text-primary">&rsaquo;</span>
                    <Link
                      href={blog.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {blog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Want to Stay Updated?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest articles, industry news, and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
