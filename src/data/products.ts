export interface Product {
  id: string;
  name: string;
  title?: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  rating?: number;
  reviews?: number;
  slug: string;
}

export const productCategories = [
  { id: 'all', name: 'All Products', slug: 'all', icon: '🛍️' },
  { id: 'tshirts', name: 'T-Shirts', slug: 'tshirts', icon: '👕' },
  { id: 'bags', name: 'Bags', slug: 'bags', icon: '🎒' },
  { id: 'caps', name: 'Caps', slug: 'caps', icon: '🧢' },
  { id: 'sweatshirts', name: 'Sweatshirts & Hoodies', slug: 'sweatshirts', icon: '🧥' },
  { id: 'lowers', name: 'Lower & Shorts', slug: 'lowers', icon: '🩳' },
  { id: 'uniforms', name: 'School & Office Uniform', slug: 'uniforms', icon: '👔' },
  { id: 'printing', name: 'Printing & Embroidery', slug: 'printing', icon: '🖨️' },
  { id: 'apron', name: 'Apron', slug: 'apron', icon: '🧑‍🍳' },
  { id: 'chef-coat', name: 'Chef Coat', slug: 'chef-coat', icon: '👨‍🍳' },
  { id: 'raincoats', name: 'Raincoats', slug: 'raincoats', icon: '🧥' },
];

export const products: Product[] = [
  // Business Cards
  {
    id: 'bc-001',
    name: 'Premium Business Cards - Standard',
    slug: 'premium-business-cards-standard',
    description: 'High-quality business cards with vibrant full-color printing on premium card stock. Perfect for professionals and businesses.',
    price: 499,
    category: 'cards',
    image: '/images/product/business-card-1.jpg',
    images: ['/images/product/business-card-1.jpg', '/images/product/business-card-2.jpg'],
    colors: ['White', 'Cream', 'Black'],
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 'bc-002',
    name: 'Rounded Corner Business Cards',
    slug: 'rounded-corner-business-cards',
    description: 'Stand out with elegant rounded corner business cards. Premium finish with smooth edges.',
    price: 599,
    category: 'cards',
    image: '/images/product/business-card-rounded.jpg',
    featured: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 'bc-003',
    name: 'Spot UV Business Cards',
    slug: 'spot-uv-business-cards',
    description: 'Premium cards with spot UV coating for a glossy, raised effect. Make a lasting impression.',
    price: 899,
    category: 'cards',
    image: '/images/product/business-card-uv.jpg',
    newArrival: true,
    rating: 4.9,
    reviews: 156,
  },

  // T-Shirts
  {
    id: 'ts-001',
    name: 'Custom Round Neck T-Shirt',
    slug: 'custom-round-neck-tshirt',
    description: 'Premium 100% cotton round neck t-shirt with custom printing. Perfect for corporate events, teams, and promotional campaigns.',
    price: 299,
    category: 'tshirts',
    image: '/images/product/tshirt-1.jpg',
    images: ['/images/product/tshirt-1.jpg', '/images/product/tshirt-2.jpg'],
    colors: ['White', 'Black', 'Navy Blue', 'Red', 'Royal Blue', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    featured: true,
    bestSeller: true,
    rating: 4.6,
    reviews: 523,
  },
  {
    id: 'ts-002',
    name: 'Premium Polo T-Shirt',
    slug: 'premium-polo-tshirt',
    description: 'Professional polo t-shirt with collar. Ideal for corporate wear with logo embroidery or printing options.',
    price: 449,
    category: 'tshirts',
    image: '/images/product/polo-1.jpg',
    colors: ['White', 'Black', 'Navy Blue', 'Grey', 'Maroon'],
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    bestSeller: true,
    rating: 4.7,
    reviews: 412,
  },
  {
    id: 'ts-003',
    name: 'V-Neck Custom T-Shirt',
    slug: 'vneck-custom-tshirt',
    description: 'Stylish V-neck t-shirt with premium fabric. Great for casual branding and team uniforms.',
    price: 329,
    category: 'tshirts',
    image: '/images/product/vneck-1.jpg',
    colors: ['White', 'Black', 'Grey', 'Navy Blue', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    newArrival: true,
    rating: 4.5,
    reviews: 287,
  },
  {
    id: 'ts-004',
    name: 'Sports Dri-Fit T-Shirt',
    slug: 'sports-drifit-tshirt',
    description: 'Moisture-wicking sports t-shirt perfect for athletic teams and sports events. Quick-dry fabric.',
    price: 399,
    category: 'tshirts',
    image: '/images/product/sports-tshirt.jpg',
    colors: ['Black', 'Royal Blue', 'Red', 'Green', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 198,
  },

  // Sweatshirts & Hoodies
  {
    id: 'sw-001',
    name: 'Custom Printed Hoodie',
    slug: 'custom-printed-hoodie',
    description: 'Warm and comfortable hoodie with kangaroo pocket. Perfect for winter promotions, team wear, and corporate gifting.',
    price: 899,
    category: 'sweatshirts',
    image: '/images/product/hoodie-1.jpg',
    colors: ['Black', 'Navy Blue', 'Grey', 'Maroon', 'Olive Green'],
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    featured: true,
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 'sw-002',
    name: 'Pullover Sweatshirt',
    slug: 'pullover-sweatshirt',
    description: 'Classic pullover sweatshirt with logo customization. Ideal for corporate gifting and winter uniforms.',
    price: 749,
    category: 'sweatshirts',
    image: '/images/product/sweatshirt-1.jpg',
    colors: ['Black', 'Navy Blue', 'Grey', 'Red'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 193,
  },
  {
    id: 'sw-003',
    name: 'Zip-Up Hoodie',
    slug: 'zipup-hoodie',
    description: 'Full-zip hoodie with premium fabric and durable zipper. Perfect for outdoor events.',
    price: 999,
    category: 'sweatshirts',
    image: '/images/product/zip-hoodie.jpg',
    colors: ['Black', 'Navy Blue', 'Grey'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    newArrival: true,
    rating: 4.9,
    reviews: 142,
  },

  // Bags & Totes
  {
    id: 'bag-001',
    name: 'Eco-Friendly Cotton Tote Bag',
    slug: 'ecofriendly-cotton-tote',
    description: 'Sustainable cotton tote bag with custom printing. Perfect for promotional events, retail, and corporate gifting.',
    price: 199,
    category: 'bags',
    image: '/images/product/tote-1.jpg',
    colors: ['Natural', 'Black', 'Navy Blue', 'Red'],
    featured: true,
    bestSeller: true,
    rating: 4.5,
    reviews: 387,
  },
  {
    id: 'bag-002',
    name: 'Premium Laptop Backpack',
    slug: 'premium-laptop-backpack',
    description: 'Durable laptop backpack with multiple compartments and logo embroidery. Ideal for corporate gifts.',
    price: 1299,
    category: 'bags',
    image: '/images/product/laptop-bag-1.jpg',
    colors: ['Black', 'Navy Blue', 'Grey'],
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 'bag-003',
    name: 'Custom Drawstring Bag',
    slug: 'custom-drawstring-bag',
    description: 'Lightweight drawstring bag perfect for gyms, schools, and promotional events.',
    price: 149,
    category: 'bags',
    image: '/images/product/drawstring-bag.jpg',
    colors: ['Black', 'Navy Blue', 'Red', 'Green'],
    newArrival: true,
    rating: 4.4,
    reviews: 176,
  },
  {
    id: 'bag-004',
    name: 'Jute Shopping Bag',
    slug: 'jute-shopping-bag',
    description: 'Eco-friendly jute bag with strong handles. Great for retail and promotional use.',
    price: 249,
    category: 'bags',
    image: '/images/product/jute-bag.jpg',
    colors: ['Natural', 'Black'],
    rating: 4.6,
    reviews: 145,
  },

  // Caps & Hats
  {
    id: 'cap-001',
    name: 'Baseball Cap with Logo',
    slug: 'baseball-cap-logo',
    description: 'Classic baseball cap with embroidered or printed logo. Perfect for outdoor events and team wear.',
    price: 249,
    category: 'caps',
    image: '/images/product/cap-1.jpg',
    colors: ['Black', 'Navy Blue', 'White', 'Red', 'Grey'],
    bestSeller: true,
    rating: 4.5,
    reviews: 298,
  },
  {
    id: 'cap-002',
    name: 'Trucker Mesh Cap',
    slug: 'trucker-mesh-cap',
    description: 'Breathable mesh back trucker cap. Great for summer promotions and outdoor activities.',
    price: 199,
    category: 'caps',
    image: '/images/product/trucker-cap.jpg',
    colors: ['Black/White', 'Navy/White', 'Red/White'],
    rating: 4.3,
    reviews: 167,
  },
  {
    id: 'cap-003',
    name: 'Snapback Cap',
    slug: 'snapback-cap',
    description: 'Trendy snapback cap with adjustable strap. Popular for casual branding.',
    price: 299,
    category: 'caps',
    image: '/images/product/snapback.jpg',
    colors: ['Black', 'Navy Blue', 'Grey', 'White'],
    newArrival: true,
    rating: 4.7,
    reviews: 134,
  },

  // Mugs & Drinkware
  {
    id: 'mug-001',
    name: 'Ceramic Coffee Mug - 11oz',
    slug: 'ceramic-coffee-mug-11oz',
    description: 'High-quality ceramic mug with vibrant full-color printing. Perfect for corporate gifting and promotions.',
    price: 149,
    category: 'mugs',
    image: '/images/product/mug-1.jpg',
    colors: ['White', 'Black', 'Red', 'Blue'],
    featured: true,
    rating: 4.6,
    reviews: 432,
  },
  {
    id: 'mug-002',
    name: 'Magic Color-Changing Mug',
    slug: 'magic-color-changing-mug',
    description: 'Amazing color-changing mug that reveals your design when filled with hot liquid. Unique corporate gift.',
    price: 299,
    category: 'mugs',
    image: '/images/product/magic-mug.jpg',
    colors: ['Black'],
    newArrival: true,
    bestSeller: true,
    rating: 4.9,
    reviews: 267,
  },
  {
    id: 'mug-003',
    name: 'Stainless Steel Travel Mug',
    slug: 'stainless-steel-travel-mug',
    description: 'Insulated travel mug with logo engraving. Keeps drinks hot/cold for hours.',
    price: 449,
    category: 'mugs',
    image: '/images/product/travel-mug.jpg',
    colors: ['Silver', 'Black', 'Blue'],
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 'mug-004',
    name: 'Custom Water Bottle - 750ml',
    slug: 'custom-water-bottle-750ml',
    description: 'BPA-free water bottle with custom printing. Perfect for sports events and corporate use.',
    price: 249,
    category: 'mugs',
    image: '/images/product/water-bottle.jpg',
    colors: ['Clear', 'Blue', 'Green', 'Black'],
    rating: 4.5,
    reviews: 221,
  },

  // Uniforms
  {
    id: 'uni-001',
    name: 'School Uniform Set',
    slug: 'school-uniform-set',
    description: 'Complete school uniform set with customizable embroidery. Available in various color combinations.',
    price: 1299,
    category: 'uniforms',
    image: '/images/product/school-uniform.jpg',
    colors: ['White/Blue', 'White/Black', 'White/Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 178,
  },
  {
    id: 'uni-002',
    name: 'Corporate Staff Uniform',
    slug: 'corporate-staff-uniform',
    description: 'Professional staff uniform with company logo. Perfect for hotels, restaurants, and offices.',
    price: 1499,
    category: 'uniforms',
    image: '/images/product/staff-uniform.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    bestSeller: true,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 'uni-003',
    name: 'Security Guard Uniform',
    slug: 'security-guard-uniform',
    description: 'Durable security uniform with professional finish. Complete set with pants and shirt.',
    price: 1599,
    category: 'uniforms',
    image: '/images/product/security-uniform.jpg',
    sizes: ['M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 92,
  },

  // Printing & Marketing
  {
    id: 'pr-001',
    name: 'Full Color Flyers - A5',
    slug: 'fullcolor-flyers-a5',
    description: 'High-quality full-color flyers on premium paper. Perfect for promotions and events.',
    price: 999,
    category: 'printing',
    image: '/images/product/flyers.jpg',
    featured: true,
    rating: 4.7,
    reviews: 267,
  },
  {
    id: 'pr-002',
    name: 'Promotional Brochures',
    slug: 'promotional-brochures',
    description: 'Professional tri-fold or bi-fold brochures with glossy or matte finish.',
    price: 1499,
    category: 'printing',
    image: '/images/product/brochures.jpg',
    rating: 4.8,
    reviews: 198,
  },
  {
    id: 'pr-003',
    name: 'Custom Posters - A3',
    slug: 'custom-posters-a3',
    description: 'Large format posters for events, promotions, and advertising.',
    price: 199,
    category: 'printing',
    image: '/images/product/posters.jpg',
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 'pr-004',
    name: 'Vinyl Stickers',
    slug: 'vinyl-stickers',
    description: 'Waterproof vinyl stickers with custom shapes and sizes.',
    price: 299,
    category: 'printing',
    image: '/images/product/stickers.jpg',
    newArrival: true,
    rating: 4.9,
    reviews: 312,
  },

  // Gifts & Accessories
  {
    id: 'gift-001',
    name: 'Custom Keychains',
    slug: 'custom-keychains',
    description: 'Metal or acrylic keychains with custom design. Perfect for giveaways.',
    price: 49,
    category: 'gifts',
    image: '/images/product/keychain.jpg',
    bestSeller: true,
    rating: 4.5,
    reviews: 456,
  },
  {
    id: 'gift-002',
    name: 'Promotional Pens',
    slug: 'promotional-pens',
    description: 'Branded pens in bulk. Excellent for corporate events and marketing.',
    price: 15,
    category: 'gifts',
    image: '/images/product/pens.jpg',
    rating: 4.4,
    reviews: 623,
  },
  {
    id: 'gift-003',
    name: 'Custom Notebooks - A5',
    slug: 'custom-notebooks-a5',
    description: 'Quality notebooks with custom cover printing. Great for corporate gifts.',
    price: 149,
    category: 'gifts',
    image: '/images/product/notebook.jpg',
    rating: 4.7,
    reviews: 287,
  },
  {
    id: 'gift-004',
    name: 'Desk Calendar',
    slug: 'desk-calendar',
    description: 'Custom desk calendar with company branding. Perfect for year-end gifts.',
    price: 199,
    category: 'gifts',
    image: '/images/product/calendar.jpg',
    newArrival: true,
    rating: 4.6,
    reviews: 145,
  },
];

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all' || !category) return products;
  return products.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.bestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.newArrival);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
}

export function getCategoryById(id: string) {
  return productCategories.find(cat => cat.id === id);
}
