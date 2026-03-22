"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogsAPI, type Blog } from "@/lib/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Calendar, User, Tag, ArrowRight, Eye, Search } from "lucide-react";

const BlogClient = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogsAPI.getAll();
        setBlogs(response.blogs || []);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get all unique tags from blogs
  const allTags = Array.from(
    new Set(blogs.flatMap(blog => blog.tags || []))
  ).filter(Boolean);

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.paragraph?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    // Check if it's just a year
    if (/^\d{4}$/.test(dateString)) return dateString;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="Our Blog"
        description="Stay updated with the latest trends, tips, and insights in custom printing and promotional merchandise"
      />

      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="w-full px-6 lg:px-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Articles & Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover expert tips, industry trends, and helpful guides for your custom printing and branding needs
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !selectedTag
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😕</span>
              </div>
              <p className="text-xl text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {searchQuery || selectedTag ? 'No matching articles found' : 'No blog posts yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || selectedTag
                  ? 'Try adjusting your search or filter criteria'
                  : 'Check back soon for new content!'}
              </p>
              {(searchQuery || selectedTag) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag(null);
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Featured Blog (First Blog) */}
              {filteredBlogs.length > 0 && !searchQuery && !selectedTag && (
                <Link
                  href={`/blog/${filteredBlogs[0].id}`}
                  className="block mb-12 group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-2 gap-0">
                    <div className="relative h-72 md:h-96 overflow-hidden">
                      {filteredBlogs[0].image ? (
                        <Image
                          src={filteredBlogs[0].image}
                          alt={filteredBlogs[0].title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <span className="text-white text-6xl">📰</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(filteredBlogs[0].publishDate || filteredBlogs[0].createdAt)}</span>
                        </div>
                        {filteredBlogs[0].views > 0 && (
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{filteredBlogs[0].views} views</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                        {filteredBlogs[0].title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                        {filteredBlogs[0].paragraph}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {filteredBlogs[0].author?.image ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={filteredBlogs[0].author.image}
                                alt={filteredBlogs[0].author.name || 'Author'}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {filteredBlogs[0].author?.name || 'Anonymous'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {filteredBlogs[0].author?.designation || 'Author'}
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedTag ? filteredBlogs : filteredBlogs.slice(1)).map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Tags on Image */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex gap-2">
                          {blog.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-white text-xs font-semibold rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blog.publishDate || blog.createdAt)}</span>
                        </div>
                        {blog.views > 0 && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{blog.views}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {blog.paragraph}
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          {blog.author?.image ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={blog.author.image}
                                alt={blog.author.name || 'Author'}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {blog.author?.name || 'Anonymous'}
                          </span>
                        </div>
                        <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
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
};

export default BlogClient;
