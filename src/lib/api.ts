// Browser: use NEXT_PUBLIC_API_URL if set (dev), otherwise /api (production, proxied by Next.js rewrites)
// SSR: use BACKEND_URL directly (server-to-server, no CORS)
const API_URL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '/api')
    : `${process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com'}/api`;

interface Product {
  _id: string;
  id: string; // For compatibility with frontend
  name: string;
  title?: string;
  tagline?: string;
  description: string;
  shortDescription?: string;
  sections?: Array<{ title: string; content: string }>;
  price: number;
  stock: number;
  category: string;
  image: string;
  imageTrackingCode?: string;
  subImages?: Array<string | { url: string; trackingCode?: string; publicId?: string }>;
  images?: string[]; // Legacy: Multiple images
  sizes?: string[];
  colors?: string[];
  minOrderQuantity?: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
  trending?: boolean;
  mostPopular?: boolean;
  rating: number;
  reviews: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Dynamic product type fields
  productType?: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    detailFields: Array<{
      fieldName: string;
      fieldType: string;
      options?: string[];
      required?: boolean;
      placeholder?: string;
    }>;
    hasSizes: boolean;
    hasColors: boolean;
    customSizes?: string[];
  };
  productCategories?: Array<{
    category: string;
    subcategories: string[];
  }>;
  details?: Record<string, any>;
  customFields?: Array<{ label: string; value: string }>;
}

interface Blog {
  _id: string;
  id: string; // For compatibility with frontend
  slug?: string;
  title: string;
  paragraph: string; // Blog content
  image: string;
  author: {
    name: string;
    image: string;
    designation: string;
  };
  tags: string[];
  publishDate: string;
  views: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];
  total: number;
  status: string;
  paymentMethod: string;
  notes?: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

interface BlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  pages: number;
}

// Helper function to map product _id to id
const mapProduct = (product: any): Product => ({
  ...product,
  id: product._id || product.id,
});

// Products API
export const productsAPI = {
  // Get all products with filters
  getAll: async (params?: {
    category?: string;
    sub?: string;
    bestSeller?: boolean;
    newArrival?: boolean;
    featured?: boolean;
    trending?: boolean;
    mostPopular?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ProductsResponse> => {
    const queryString = params ? new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';

    const response = await fetch(`${API_URL}/products${queryString ? `?${queryString}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();

    return {
      ...data,
      products: data.products.map(mapProduct),
    };
  },

  // Get single product by ID
  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const data = await response.json();
    // API returns { success: true, product: {...} }
    return mapProduct(data.product || data);
  },

  // Get product statistics
  getStats: async () => {
    const response = await fetch(`${API_URL}/products/stats`);
    if (!response.ok) throw new Error('Failed to fetch product stats');
    return response.json();
  },
};

// Helper function to map blog _id to id
const mapBlog = (blog: any): Blog => ({
  ...blog,
  id: blog._id || blog.id,
});

// Blogs API
export const blogsAPI = {
  // Get all published blogs
  getAll: async (params?: {
    search?: string;
    tag?: string;
    page?: number;
    limit?: number;
  }): Promise<BlogsResponse> => {
    const queryString = params ? new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';

    const response = await fetch(`${API_URL}/blogs${queryString ? `?${queryString}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    const data = await response.json();

    return {
      ...data,
      blogs: data.blogs.map(mapBlog),
    };
  },

  // Get single blog by ID (increments view count)
  getById: async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    const data = await response.json();
    // API returns { success: true, blog: {...} }
    return mapBlog(data.blog || data);
  },

  // Get blog statistics
  getStats: async () => {
    const response = await fetch(`${API_URL}/blogs/stats`);
    if (!response.ok) throw new Error('Failed to fetch blog stats');
    return response.json();
  },
};

// Orders API
export const ordersAPI = {
  // Create a new order
  create: async (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    items: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      size?: string;
      color?: string;
    }[];
    total: number;
    paymentMethod: string;
    notes?: string;
  }): Promise<Order> => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },
};

// Upload API
export const uploadAPI = {
  // Upload image file
  uploadFile: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },

  // Upload base64 image
  uploadBase64: async (base64: string): Promise<{ url: string }> => {
    const response = await fetch(`${API_URL}/upload/base64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64 }),
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },
};

// SEO Types
interface GlobalSEO {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  favicon: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
  contactInfo: {
    phone?: string;
    email?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
  organizationSchema: {
    type: string;
    name?: string;
    logo?: string;
    description?: string;
  };
  googleSiteVerification?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  customHeadScripts?: string;
}

interface PageSEO {
  _id: string;
  pagePath: string;
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// SEO API
export const seoAPI = {
  // Get global SEO settings
  getGlobalSettings: async (): Promise<{ settings: GlobalSEO }> => {
    const response = await fetch(`${API_URL}/seo/global`);
    if (!response.ok) throw new Error('Failed to fetch global SEO settings');
    return response.json();
  },

  // Get SEO for a specific page
  getPageSEO: async (path: string): Promise<{ page: PageSEO | null; useGlobalDefaults?: boolean; globalSettings?: Partial<GlobalSEO> }> => {
    const response = await fetch(`${API_URL}/seo/pages/${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error('Failed to fetch page SEO');
    return response.json();
  },

  // Get all page SEO settings
  getAllPages: async (): Promise<{ pages: PageSEO[] }> => {
    const response = await fetch(`${API_URL}/seo/pages`);
    if (!response.ok) throw new Error('Failed to fetch pages SEO');
    return response.json();
  },
};

// Categories API
export interface Category {
  _id: string;
  id: string;
  name: string;
  icon?: string;
  parentCategory?: string | { _id: string; id: string; name: string } | null;
  description?: string;
  richDescription?: string;
  description1?: string;
  image?: string;
  seoUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogImage?: string;
    otherMetaTags?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    structuredData?: any;
  };
  isActive?: boolean;
  subcategories?: Category[];
  createdAt?: string;
  updatedAt?: string;
}

interface CategoriesTreeResponse {
  success: boolean;
  categories: Category[];
}

interface CategoryResponse {
  success: boolean;
  category: Category;
  subcategories: Category[];
}

export const categoriesAPI = {
  getAll: async (params?: { active?: boolean; parent?: string; root?: boolean }): Promise<{ categories: Category[] }> => {
    const queryString = params ? new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';

    const response = await fetch(`${API_URL}/categories${queryString ? `?${queryString}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  getTree: async (params?: { active?: boolean }): Promise<CategoriesTreeResponse> => {
    const queryString = params ? new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';

    const response = await fetch(`${API_URL}/categories/tree${queryString ? `?${queryString}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch category tree');
    return response.json();
  },

  getBySlug: async (slug: string): Promise<CategoryResponse> => {
    const response = await fetch(`${API_URL}/categories/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },
};

// Locations API
export interface LocationProduct {
  name: string;
  slug: string;
  icon: string;
  link: string;
  types: string[];
  description: string;
}

export interface LocationContact {
  address: string;
  phone: string[];
  email: string;
  hours: string;
  mapLink: string;
}

export interface LocationPage {
  _id: string;
  slug: string;
  isActive?: boolean;

  // City page fields
  name?: string;
  state?: string;
  isHeadquarters?: boolean;
  tagline?: string;
  heroHeading?: string;
  description?: string;
  whyChooseUs?: string[];
  printingMethods?: string[];
  fabrics?: string[];
  partners?: string[];
  products?: LocationProduct[];
  contact?: LocationContact;
  image?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };

  // SEO landing page fields
  h1?: string;
  introContent?: string;
  mainContent?: string;
  metaTitle?: string;
  metaDescription?: string;
  city?: string;
  category?: string;
  categoryLabel?: string;
  branchAddress?: string;
  branchPhone?: string;
  branchHours?: string;
  mapLink?: string;
  showFabrics?: boolean;
  showPrintingMethods?: boolean;
  showSizeChart?: boolean;
  mapEmbed?: string;
  pageImages?: string[];
  sliderImages?: string[];
}

export const locationsAPI = {
  getAll: async (): Promise<{ locations: LocationPage[] }> => {
    const response = await fetch(`${API_URL}/locations?active=true`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    return response.json();
  },

  getBySlug: async (slug: string): Promise<{ location: LocationPage }> => {
    const response = await fetch(`${API_URL}/locations/${slug}`);
    if (!response.ok) throw new Error('Location not found');
    return response.json();
  },
};

// Health check
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error('API health check failed');
  return response.json();
};

// Export types
export type { Product, Blog, Order, ProductsResponse, BlogsResponse, GlobalSEO, PageSEO };
