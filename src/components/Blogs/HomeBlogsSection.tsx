import Link from 'next/link';
import Image from 'next/image';
import { toPlainText } from '@/lib/text';
import { getAllBlogs, blogHref, blogImageAlt, blogDate, type Blog } from '@/lib/blog';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

/**
 * How many recent posts to show when nothing is explicitly flagged for the
 * home page. The old site linked three teasers from here, and those links are
 * the crawl path from the homepage into the blog.
 */
const FALLBACK_COUNT = 3;

function stripHtml(html: string): string {
  return toPlainText(html);
}

/**
 * Posts the admin panel flagged with "Show on Home". Returns an empty list —
 * never throws — because a homepage must still render if this call fails.
 */
async function getFlaggedBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs?showOnHome=true&limit=6`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.blogs?.length) return data.blogs.map((b: any) => ({ ...b, id: b._id || b.id }));
    }
  } catch {}
  return [];
}

/**
 * Flagged posts if there are any, otherwise the most recent ones.
 *
 * No post currently carries `showOnHome`, so the flagged query comes back empty
 * and the homepage silently lost every link into the blog. The fallback keeps
 * that internal-link path alive whatever the flags say.
 */
async function getHomeBlogs(): Promise<Blog[]> {
  const flagged = await getFlaggedBlogs();
  if (flagged.length) return flagged;

  try {
    return (await getAllBlogs()).slice(0, FALLBACK_COUNT);
  } catch {
    return [];
  }
}

export default async function HomeBlogsSection() {
  const blogs = await getHomeBlogs();
  if (!blogs.length) return null;

  return (
    <section className="bg-white dark:bg-gray-900 py-14 border-t border-gray-100 dark:border-gray-800">
      <div className="w-full px-6 lg:px-12">

        {/* Section title — matches old website style */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block">
            Blogs
          </h2>
          <div className="mx-auto mt-2 h-[3px] w-16 bg-gray-900 dark:bg-white rounded-full" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const href = blogHref({ slug: blog.slug, id: blog._id || blog.id });
            const excerpt = stripHtml(blog.paragraph).slice(0, 180);
            const { iso, display } = blogDate(blog);

            return (
              <Link key={blog._id} href={href} className="group block">
                {/* Thumbnail */}
                <div className="relative w-full h-[200px] overflow-hidden rounded-sm mb-4">
                  <Image
                    src={blog.image}
                    alt={blogImageAlt(blog)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 dark:text-white text-justify uppercase leading-snug mb-3">
                  {blog.title}
                </h3>

                {/* Date */}
                <time
                  dateTime={iso}
                  className="block text-xs text-gray-500 dark:text-gray-500 mb-2"
                >
                  {display}
                </time>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-justify leading-relaxed">
                  {excerpt}
                  <span className="text-gray-400"> ....</span>
                </p>
              </Link>
            );
          })}
        </div>

        {/* More Blog button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="px-8 py-3 bg-[#f5a623] hover:bg-[#e09510] text-white font-semibold text-base rounded transition-colors"
          >
            More Blog
          </Link>
        </div>

      </div>
    </section>
  );
}
