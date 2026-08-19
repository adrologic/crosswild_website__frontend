// Server-side blog data access.
//
// Everything the /blog routes render comes from here and is fetched on the
// server with ISR, so both the index and each post ship complete HTML. A
// crawler must never need to run JavaScript to discover a post, read its
// title, or follow its link — that was the bug this module exists to prevent.
//
// Client components in the blog UI (search box, tag filter, share buttons)
// receive already-prepared `BlogCard` objects as props. They still render to
// HTML on the server, and they never fetch.

import { toPlainText } from './text';

const API_URL =
  (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

/**
 * Canonical production origin — used for canonicals, JSON-LD and the sitemap.
 * Never the Vercel preview domain: an override belongs in NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thecrosswild.com';

/** Blog content changes rarely; an hour of ISR keeps the pages static-fast. */
export const BLOG_REVALIDATE = 3600;

const TIMEOUT_MS = 20000; // absorbs a Render free-tier cold start
const ATTEMPTS = 3;

export interface BlogAuthor {
  name?: string;
  image?: string;
  designation?: string;
}

export interface BlogSeoFields {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface Blog {
  _id: string;
  id: string;
  slug?: string;
  title: string;
  /** Rich-text HTML body. */
  paragraph: string;
  image?: string;
  author?: BlogAuthor;
  tags?: string[];
  publishDate?: string;
  views?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  seo?: BlogSeoFields;
}

/**
 * A post flattened into exactly what a card needs, with dates and excerpts
 * already formatted. Server-prepared so client components stay dumb and the
 * server and client markup can't drift apart on hydration.
 */
export interface BlogCard {
  id: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt: string;
  /** Machine-readable, always YYYY-MM-DD — for <time datetime> and JSON-LD. */
  dateIso: string;
  /** Human-readable, e.g. "Apr 20, 2026" or a bare year for legacy rows. */
  dateDisplay: string;
  tags: string[];
  authorName: string;
  authorImage?: string;
  authorDesignation: string;
  views: number;
}

/** Thrown when the backend can't be reached — the route turns this into a 500. */
export class BlogFetchError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'BlogFetchError';
  }
}

/**
 * GET one backend path with retries. Returns null on 404. Throws
 * BlogFetchError once the retries are exhausted — callers must not swallow
 * that into an empty page: an empty 200 is worse for SEO than a 500.
 */
async function fetchJson(path: string): Promise<any | null> {
  let lastError: unknown;

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`, {
        next: { revalidate: BLOG_REVALIDATE },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
      // Other 4xx are our bug, not a blip — fail immediately.
      if (res.status < 500) {
        throw new BlogFetchError(`Backend returned ${res.status} for ${path}`);
      }
      lastError = new BlogFetchError(`Backend returned ${res.status} for ${path}`);
    } catch (err) {
      if (err instanceof BlogFetchError && !/^Backend returned 5/.test(err.message)) throw err;
      lastError = err;
    }
    if (attempt < ATTEMPTS - 1) {
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }

  throw new BlogFetchError(`Could not load ${path} from the blog backend`, { cause: lastError });
}

function normalize(raw: any): Blog {
  return { ...raw, id: raw._id || raw.id };
}

/**
 * Every published post, newest first. The backend caps list endpoints at
 * 100/page, so page through until the last one — older posts must stay
 * reachable from /blog.
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const all: Blog[] = [];
  const MAX_PAGES = 50; // safety guard against an unexpected loop

  for (let page = 1; page <= MAX_PAGES; page++) {
    const data = await fetchJson(`/blogs?limit=100&page=${page}`);
    const batch: any[] = data?.blogs || [];
    all.push(...batch.map(normalize));
    if (batch.length < 100 || page >= (data?.totalPages ?? page)) break;
  }

  return all;
}

/**
 * One post by slug (or legacy ObjectId). Null when it doesn't exist.
 *
 * Served from the cached list first, on purpose. The backend's single-post
 * endpoint increments the view counter, and that write also bumps the row's
 * `updatedAt` — so rendering a post through it would churn `dateModified` and
 * the sitemap's `lastmod` on every revalidation, telling Google the article
 * changes hourly when nothing changed at all. The list carries the full body,
 * so the detail endpoint is only needed for ids that aren't in the list.
 */
export async function getBlogBySlug(slugOrId: string): Promise<Blog | null> {
  const listed = (await getAllBlogs()).find(
    (blog) => blog.slug === slugOrId || blog.id === slugOrId || blog._id === slugOrId,
  );
  if (listed) return listed;

  const data = await fetchJson(`/blogs/${encodeURIComponent(slugOrId)}`);
  if (!data) return null;
  const blog = data.blog || data;
  if (!blog?.title) return null;
  return normalize(blog);
}

/** Canonical path for a post. Slug wins; the id is only a legacy fallback. */
export function blogHref(blog: Pick<Blog, 'slug' | 'id'>): string {
  return `/blog/${blog.slug || blog.id}`;
}

/**
 * Plain-text summary of the body, cut on a word boundary so cards and meta
 * descriptions don't end mid-word.
 */
export function blogExcerpt(html: string | undefined, maxLength = 180): string {
  const text = toPlainText(html);
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:—-]$/, '')}…`;
}

/**
 * Publication date in both machine and human form.
 *
 * The migrated rows carry a bare year ("2024") in `publishDate`, which is not a
 * valid `datetime="YYYY-MM-DD"` value, so it is normalised to 1 January of that
 * year for machines while the display keeps showing just the year, as the old
 * site did. Setting real dates in the admin panel replaces both.
 */
export function blogDate(blog: Pick<Blog, 'publishDate' | 'createdAt'>): {
  iso: string;
  display: string;
} {
  const raw = blog.publishDate || blog.createdAt || '';

  if (/^\d{4}$/.test(raw)) return { iso: `${raw}-01-01`, display: raw };

  const parsed = new Date(raw);
  if (!raw || Number.isNaN(parsed.getTime())) {
    const fallback = new Date(blog.createdAt || Date.now());
    return {
      iso: fallback.toISOString().slice(0, 10),
      display: fallback.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
  }

  return {
    iso: parsed.toISOString().slice(0, 10),
    display: parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  };
}

/** Full ISO timestamp for JSON-LD / Open Graph, from the same normalisation. */
export function blogDateTime(blog: Pick<Blog, 'publishDate' | 'createdAt'>): string {
  return new Date(`${blogDate(blog).iso}T00:00:00.000Z`).toISOString();
}

/**
 * Descriptive alt text for a post thumbnail — the headline plus context, never
 * the filename and never empty.
 */
export function blogImageAlt(blog: Pick<Blog, 'title'>): string {
  return `${blog.title} — The Cross Wild blog article`;
}

/** Flatten a post into the shape the cards render. */
export function toBlogCard(blog: Blog): BlogCard {
  const { iso, display } = blogDate(blog);
  return {
    id: blog.id,
    slug: blog.slug || blog.id,
    href: blogHref(blog),
    title: blog.title,
    excerpt: blogExcerpt(blog.paragraph),
    image: blog.image,
    imageAlt: blogImageAlt(blog),
    dateIso: iso,
    dateDisplay: display,
    tags: blog.tags || [],
    authorName: blog.author?.name || 'The Cross Wild Team',
    authorImage: blog.author?.image,
    authorDesignation: blog.author?.designation || 'Author',
    views: blog.views || 0,
  };
}

/**
 * Authors sometimes paste the post title as an <h1>/<h2> at the top of the body
 * HTML, which duplicates the page's own <h1>. Strip every h1/h2 whose visible
 * text matches the title (case-, whitespace- and entity-insensitive);
 * legitimate subsection headings are untouched.
 */
export function stripTitleDuplicateHeadings(html?: string, title?: string): string {
  if (!html || !title) return html || '';
  const normalize = (s: string) =>
    s
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&nbsp;|&#160;| /g, ' ')
      .replace(/[\s ]+/g, ' ')
      .trim()
      .toLowerCase();

  const target = normalize(title);
  if (!target) return html;

  return html.replace(/<h([12])\b[^>]*>([\s\S]*?)<\/h\1>\s*/gi, (match, _level, inner) =>
    normalize(inner) === target ? '' : match,
  );
}
