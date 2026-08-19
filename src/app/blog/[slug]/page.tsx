import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, ArrowRight, Eye, Clock } from 'lucide-react';
import { generateBlogMetadata, generateBreadcrumbSchema, getGlobalSEO } from '@/lib/seo';
import {
  SITE_URL,
  blogDate,
  blogDateTime,
  blogExcerpt,
  blogHref,
  blogImageAlt,
  getAllBlogs,
  getBlogBySlug,
  stripTitleDuplicateHeadings,
  toBlogCard,
  type Blog,
} from '@/lib/blog';
import Breadcrumb from '@/components/Common/Breadcrumb';
import ShareButtons from './ShareButtons';

// Posts are immutable in practice; an hour of ISR keeps them static-fast.
// Must stay a literal — Next parses this statically, it can't follow a const
// imported from another module.
export const revalidate = 3600;

/** Detect a MongoDB ObjectId (24-char hex) — those redirect to the slug URL. */
const isObjectId = (s: string) => /^[a-f0-9]{24}$/i.test(s);

/**
 * Pre-render every post at build time so each URL is a static HTML file. Slugs
 * come from the backend — never hardcoded, so a new post needs no code change.
 */
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.filter((blog) => blog.slug).map((blog) => ({ slug: blog.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Blog Not Found | The Cross Wild' };

  return generateBlogMetadata({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    paragraph: blog.paragraph || '',
    image: blog.image,
    author: blog.author,
    tags: blog.tags,
    seo: blog.seo,
    publishedTime: blogDateTime(blog),
    modifiedTime: blog.updatedAt,
  });
}

/** Rough reading time from the body word count. */
function readingTime(html: string): string {
  const words = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatLongDate(blog: Blog): string {
  const { display } = blogDate(blog);
  // Legacy rows carry only a year — show it as-is rather than inventing a day.
  if (/^\d{4}$/.test(display)) return display;
  return new Date(blogDate(blog).iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 301: an ObjectId URL forwards to the canonical slug URL.
  if (isObjectId(slug)) {
    const byId = await getBlogBySlug(slug);
    if (byId?.slug) redirect(`/blog/${byId.slug}`);
  }

  const [blog, allBlogs, globalSEO] = await Promise.all([
    getBlogBySlug(slug),
    getAllBlogs(),
    getGlobalSEO(),
  ]);

  // A missing post is a 404, not a 200 page that says "not found".
  if (!blog) notFound();

  const canonicalPath = blogHref(blog);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const { iso: dateIso } = blogDate(blog);
  const publishedIso = blogDateTime(blog);
  const modifiedIso = blog.updatedAt || publishedIso;

  // Position in the (newest-first) list drives previous/next.
  const index = allBlogs.findIndex((b) => (b.slug || b.id) === (blog.slug || blog.id));
  const newerPost = index > 0 ? allBlogs[index - 1] : undefined;
  const olderPost = index >= 0 && index < allBlogs.length - 1 ? allBlogs[index + 1] : undefined;

  // Related: prefer posts sharing a tag, then fill up from the rest.
  const others = allBlogs.filter((b) => (b.slug || b.id) !== (blog.slug || blog.id));
  const tags = blog.tags || [];
  const sharesTag = others.filter((b) => (b.tags || []).some((t) => tags.includes(t)));
  const related = [...sharesTag, ...others.filter((b) => !sharesTag.includes(b))]
    .slice(0, 3)
    .map(toBlogCard);

  const publisherLogo =
    globalSEO?.organizationSchema?.logo || `${SITE_URL}/images/logo/logo-crosswile.jpg`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    url: canonicalUrl,
    headline: blog.title,
    description: blog.seo?.description || blogExcerpt(blog.paragraph, 160),
    image: blog.image ? [blog.image] : undefined,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    inLanguage: 'en-IN',
    keywords: (blog.tags || []).join(', ') || undefined,
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'The Cross Wild Team',
    },
    publisher: {
      '@type': 'Organization',
      name: globalSEO?.siteName || 'The Cross Wild',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: publisherLogo },
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: blog.title, url: canonicalUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Home › Blog › {Post Title} — every step a real link. */}
      <Breadcrumb
        pageName={blog.title}
        description="Read our latest insights and updates"
        trail={[{ name: 'Blog', href: '/blog' }]}
      />

      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </Link>

          {/* Main Article */}
          <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
            {/* Featured Image */}
            <div className="relative h-72 md:h-96 lg:h-[450px] w-full overflow-hidden rounded-t-3xl">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blogImageAlt(blog)}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <span className="text-white text-8xl">📰</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Tags on Image */}
              {tags.length > 0 && (
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-white text-sm font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Title — the page's single <h1> */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {/* Author */}
                <div className="flex items-center gap-3">
                  {blog.author?.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src={blog.author.image}
                        alt={blog.author.name || 'Author'}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {blog.author?.name || 'The Cross Wild Team'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {blog.author?.designation || 'Author'}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={dateIso}>{formatLongDate(blog)}</time>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{readingTime(blog.paragraph)}</span>
                </div>

                {/* Views */}
                {(blog.views || 0) > 0 && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views} views</span>
                  </div>
                )}
              </div>

              {/* Blog Content — rendered on the server, so the full article is
                  in the HTML a crawler receives. */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none break-words overflow-x-hidden
                  prose-headings:text-gray-900 dark:prose-headings:text-white
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
                  prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                  prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-1
                  prose-strong:text-gray-900 dark:prose-strong:text-white"
                dangerouslySetInnerHTML={{
                  __html: stripTitleDuplicateHeadings(blog.paragraph, blog.title),
                }}
              />

              <ShareButtons title={blog.title} url={canonicalUrl} />
            </div>
          </article>

          {/* Previous / Next post — keeps every article reachable from its
              neighbours, so no post is an orphan in the link graph. */}
          {(newerPost || olderPost) && (
            <nav
              aria-label="More articles"
              className="mt-12 grid gap-4 sm:grid-cols-2"
            >
              {newerPost ? (
                <Link
                  href={blogHref(newerPost)}
                  rel="prev"
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                    <ArrowLeft className="w-4 h-4" /> Previous article
                  </span>
                  <span className="block font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {newerPost.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {olderPost && (
                <Link
                  href={blogHref(olderPost)}
                  rel="next"
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow sm:text-right"
                >
                  <span className="flex items-center gap-2 sm:justify-end text-sm font-semibold text-primary mb-2">
                    Next article <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="block font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {olderPost.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

          {/* Author Bio */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {blog.author?.image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white dark:ring-gray-700 shadow-lg">
                  <Image
                    src={blog.author.image}
                    alt={blog.author.name || 'Author'}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  About {blog.author?.name || 'the Author'}
                </h2>
                <p className="text-primary font-semibold mb-3">
                  {blog.author?.designation || 'Author'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {blog.author?.name || 'Our author'} is a {(blog.author?.designation || 'content writer').toLowerCase()} at The Cross Wild,
                  bringing expertise and creativity to every project. With years of experience in the custom printing
                  industry, they help businesses create impactful promotional materials.
                </p>
              </div>
            </div>
          </div>

          {/* Related Blogs */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Related Articles
                </h2>
                <Link
                  href="/blog"
                  className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View All <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={relatedBlog.href}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {relatedBlog.image ? (
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={relatedBlog.dateIso}>{relatedBlog.dateDisplay}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Get in touch with us for custom printing solutions tailored to your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
