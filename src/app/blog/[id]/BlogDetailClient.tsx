"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogsAPI, type Blog } from '@/lib/api';
import { Calendar, User, ArrowLeft, Share2, Eye, Clock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { BlogSEO } from '@/components/SEO/SEOHead';

export default function BlogDetailClient({ id }: { id: string }) {
  const blogId = id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the blog details
        const blogData = await blogsAPI.getById(blogId);
        setBlog(blogData);

        // Fetch related blogs
        const response = await blogsAPI.getAll({ limit: 4 });
        const otherBlogs = (response.blogs || []).filter(b => b.id !== blogId);
        setRelatedBlogs(otherBlogs.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Blog not found');
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    if (/^\d{4}$/.test(dateString)) return dateString;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Share functionality
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || 'Blog Post';

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch {
        alert('Failed to copy link');
      }
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <>
        <Breadcrumb pageName="Loading..." description="Please wait" />
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Breadcrumb pageName="Blog Not Found" description="The requested blog post could not be found" />
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📄</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* SEO */}
      <BlogSEO
        blog={blog}
        breadcrumbItems={[
          { name: 'Home', url: 'https://thecrosswild.com' },
          { name: 'Blog', url: 'https://thecrosswild.com/blog' },
          { name: blog.title, url: `https://thecrosswild.com/blog/${blog.id}` },
        ]}
      />

      <Breadcrumb
        pageName={blog.title}
        description="Read our latest insights and updates"
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
          <article className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl">
            {/* Featured Image */}
            <div className="relative h-72 md:h-96 lg:h-[450px] w-full">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
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
              {blog.tags && blog.tags.length > 0 && (
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
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
              {/* Title */}
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
                      {blog.author?.name || 'Anonymous'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {blog.author?.designation || 'Author'}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(blog.publishDate || blog.createdAt)}</span>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{getReadingTime(blog.paragraph)}</span>
                </div>

                {/* Views */}
                {blog.views > 0 && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views} views</span>
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                  {blog.paragraph}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this article
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                      aria-label="Copy link"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {blog.author?.image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white dark:ring-gray-700 shadow-lg">
                  <Image
                    src={blog.author.image}
                    alt={blog.author.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  About {blog.author?.name || 'the Author'}
                </h3>
                <p className="text-primary font-semibold mb-3">
                  {blog.author?.designation || 'Author'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {blog.author?.name || 'Our author'} is a {(blog.author?.designation || 'content writer').toLowerCase()} at The CrossWild,
                  bringing expertise and creativity to every project. With years of experience in the custom printing
                  industry, they help businesses create impactful promotional materials.
                </p>
              </div>
            </div>
          </div>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
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
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {relatedBlog.image ? (
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          fill
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
                        {relatedBlog.paragraph}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(relatedBlog.publishDate || relatedBlog.createdAt)}</span>
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
                  href="/contact"
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
