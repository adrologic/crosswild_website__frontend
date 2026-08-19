"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Eye, Search } from "lucide-react";
import type { BlogCard } from "@/lib/blog";

/**
 * Search + tag filtering for the blog index.
 *
 * Client-side only for the *interaction* — the posts arrive as props, already
 * fetched and formatted on the server, so the first render (the one crawlers
 * read) contains every title, link, excerpt, thumbnail and date. Nothing here
 * fetches; adding a fetch would put the whole list back behind JavaScript.
 */
export default function BlogList({ blogs }: { blogs: BlogCard[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags))).filter(Boolean);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const isFiltering = Boolean(searchQuery || selectedTag);
  const featured = !isFiltering ? filteredBlogs[0] : undefined;
  const gridBlogs = featured ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            aria-label="Search articles"
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

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isFiltering ? 'No matching articles found' : 'No blog posts yet'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {isFiltering
              ? 'Try adjusting your search or filter criteria'
              : 'Check back soon for new content!'}
          </p>
          {isFiltering && (
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
          {featured && (
            <Link href={featured.href} className="block mb-12 group">
              <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-2 gap-0">
                <div className="relative h-72 md:h-96 overflow-hidden">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
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
                      <time dateTime={featured.dateIso}>{featured.dateDisplay}</time>
                    </div>
                    {featured.views > 0 && (
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{featured.views} views</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featured.authorImage ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={featured.authorImage}
                            alt={featured.authorName}
                            fill
                            sizes="40px"
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
                          {featured.authorName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {featured.authorDesignation}
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
            {gridBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={blog.href}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Tags on Image */}
                  {blog.tags.length > 0 && (
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
                      <time dateTime={blog.dateIso}>{blog.dateDisplay}</time>
                    </div>
                    {blog.views > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      {blog.authorImage ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={blog.authorImage}
                            alt={blog.authorName}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {blog.authorName}
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
    </>
  );
}
