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

export function getCategoryById(id: string) {
  return productCategories.find(cat => cat.id === id);
}
