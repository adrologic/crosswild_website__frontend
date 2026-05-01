import Link from 'next/link';
import Image from 'next/image';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

interface Blog {
  _id: string;
  slug?: string;
  title: string;
  paragraph: string;
  image: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function getHomeBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/blogs?showOnHome=true&limit=6`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.blogs?.length) return data.blogs;
    }
  } catch {}
  return [];
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
            const href = `/blog/${blog.slug || blog._id}`;
            const excerpt = stripHtml(blog.paragraph).slice(0, 180);

            return (
              <Link key={blog._id} href={href} className="group block">
                {/* Thumbnail */}
                <div className="relative w-full h-[200px] overflow-hidden rounded-sm mb-4">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 dark:text-white text-justify uppercase leading-snug mb-3">
                  {blog.title}
                </h3>

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
