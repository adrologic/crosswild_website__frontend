export interface ProductDetail {
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

export interface Location {
  name: string;
  slug: string;
  state: string;
  tagline: string;
  heroHeading: string;
  description: string;
  whyChooseUs: string[];
  products: ProductDetail[];
  printingMethods?: string[];
  fabrics?: string[];
  contact: LocationContact;
  partners?: string[];
  isHeadquarters?: boolean;
}

export const LOCATIONS: Location[] = [
  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    tagline: 'Headquarters — Custom Manufacturing in the Pink City',
    heroHeading: 'Custom T-shirt, Bags, Caps & Uniform Manufacturing in Jaipur',
    description:
      'The CrossWild headquarters is based in Jaipur — India\'s Pink City. We are a leading custom manufacturing company serving schools, corporates, hotels, and events across Rajasthan. Starting from just ₹70 with fast delivery all over India.',
    whyChooseUs: [
      'Headquarters & main manufacturing unit',
      'Starting at just ₹70 — best price guaranteed',
      'Pan-India fast delivery from Jaipur HQ',
      'Screen printing, sublimation & DTG printing',
      'Custom branding with logos and taglines',
      'Monday–Saturday, 9 AM – 7:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Sublimation Printing', 'Direct to Garments (DTG)', 'Heat Press', 'Heat Transfer Vinyl', 'Plastisol Transfer', 'CAD Cut Printing'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Sports / Dry Fit T-shirts', 'Round Neck T-shirts', 'Promotional T-shirts', 'Customized Jerseys'],
        description: 'Custom t-shirt printing for schools, colleges, corporates, and events. Starting at ₹70. Polo, sports, round neck and more — all printed with your brand.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['School Bags', 'Laptop Bags', 'Gym Bags', 'Backpacks', 'Food Delivery Bags', 'Corporate Office Bags'],
        description: 'Premium quality bags for schools, offices, and delivery services. Bulk orders at competitive prices with custom logo printing.',
      },
      {
        name: 'Cap Manufacturing',
        slug: 'caps',
        icon: '🧢',
        link: '/products?category=caps',
        types: ['Snapback Caps', 'Trucker Hats', 'Beanies', 'Promotional Caps', 'Sports Caps'],
        description: 'Promotional cap manufacturing for business branding. Custom logo, color schemes, and bulk order capabilities.',
      },
      {
        name: 'Uniform Manufacturing',
        slug: 'uniforms',
        icon: '👔',
        link: '/products?category=uniforms',
        types: ['Office Staff Uniforms', 'Hospital & Medical Uniforms', 'Hotel & Resort Dress', 'School Uniforms', 'Sports Jerseys'],
        description: 'Professional uniforms for schools, hospitals, hotels, and offices. Custom branding with logos and color schemes.',
      },
    ],
    contact: {
      address: 'D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017',
      phone: ['+91-9571815050', '+91-9529626262'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 9:00 AM – 7:30 PM',
      mapLink: 'https://maps.google.com/?q=D-8,+Near+World+Trade+Park,+Malviya+Nagar,+Jaipur',
    },
    isHeadquarters: true,
  },
  {
    name: 'Jodhpur',
    slug: 'jodhpur',
    state: 'Rajasthan',
    tagline: 'Custom Manufacturing in the Blue City',
    heroHeading: 'Custom T-shirt, Bags, Caps & Uniform Manufacturing in Jodhpur',
    description:
      'The CrossWild is the best custom manufacturing company in Jodhpur, offering premium quality t-shirts, bags, caps, and uniforms for schools, corporates, hotels, and events. Starting from just ₹70 with fast delivery across Jodhpur.',
    whyChooseUs: [
      'Starting at just ₹70 — best price guaranteed',
      'Bulk orders with fast turnaround',
      'Screen printing & sublimation printing',
      'Custom branding with logos and taglines',
      'In-house design team, design to delivery',
      'Monday–Saturday, 10 AM – 6:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Sublimation Printing', 'Heat Press', 'DTG Printing', 'Heat Transfer Vinyl'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Sports / Dry Fit T-shirts', 'Round Neck T-shirts', 'Promotional T-shirts', 'Customized Jerseys'],
        description: 'Custom t-shirt printing for schools, colleges, corporates, and events. Starting at ₹70. Polo, sports, round neck and more — all printed with your brand.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['School Bags', 'Laptop Bags', 'Gym Bags', 'Backpacks', 'Food Delivery Bags (Zomato/Swiggy)', 'Corporate Office Bags'],
        description: 'Premium quality bags for schools, offices, and delivery services. Bulk orders at competitive prices with custom logo printing.',
      },
      {
        name: 'Cap Manufacturing',
        slug: 'caps',
        icon: '🧢',
        link: '/products?category=caps',
        types: ['Snapback Caps', 'Trucker Hats', 'Beanies', 'Promotional Caps', 'Sports Caps'],
        description: 'Promotional cap manufacturing for business branding. Custom logo, color schemes, and bulk order capabilities.',
      },
      {
        name: 'Uniform Manufacturing',
        slug: 'uniforms',
        icon: '👔',
        link: '/products?category=uniforms',
        types: ['Office Staff Uniforms', 'Hospital & Medical Uniforms', 'Hotel & Resort Dress', 'School Uniforms', 'Sports Jerseys'],
        description: 'Professional uniforms for schools, hospitals, hotels, and offices. Custom branding with logos and color schemes.',
      },
    ],
    contact: {
      address: 'B-13, Shastri Nagar, Near Shastri Circle, Jodhpur, Rajasthan 342003',
      phone: ['+91-9571286262', '+91-9571815050'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 10:00 AM – 6:30 PM',
      mapLink: 'https://maps.google.com/?q=B-13,+Shastri+Nagar,+Near+Shastri+Circle,+Jodhpur',
    },
  },
  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    tagline: 'Custom Manufacturing Hub in Central India',
    heroHeading: 'T-shirt, Bags & Uniform Manufacturing in Indore at Affordable Prices',
    description:
      'The CrossWild is a trusted custom manufacturing company in Indore, serving startups, corporations, hospitals, schools, and event organizers. Premium quality t-shirts, bags, and uniforms with full customization at the best prices.',
    whyChooseUs: [
      'Tailor-made solutions for startups to large corporations',
      'Custom logo placement and durable printing',
      'Diverse fabric options with eclectic customization',
      'School, sports, hospital & corporate uniforms',
      'Eco-friendly grocery bags available',
      'Monday–Saturday, 10 AM – 6:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Direct to Garments (DTG)', 'Dye Sublimation', 'Heat Press Printing', 'Heat Transfer Vinyl', 'Plastisol Transfer', 'CAD Cut Printing'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Corporate Event T-shirts', 'Promotional T-shirts', 'Customized Branded T-shirts', 'Bulk Order T-shirts', 'Team Uniform T-shirts'],
        description: 'Corporate and promotional t-shirt manufacturing in Indore for startups, events, and trade shows. Cost-effective wearable visibility for your brand.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['Custom Laptop Backpacks', 'Food Delivery Bags (Swiggy/Zomato)', 'Eco-Friendly Grocery Bags', 'Gym Bags', 'Office Laptop Bags', 'School Bags'],
        description: 'Trusted custom bag manufacturing in Indore. Durable materials, expert craftsmanship — merging style, durability, and affordability.',
      },
      {
        name: 'Uniform Manufacturing',
        slug: 'uniforms',
        icon: '👔',
        link: '/products?category=uniforms',
        types: ['School Uniforms', 'Sports Jerseys & Athletic Wear', 'Hospital & Medical Staff Uniforms', 'Corporate Staff Uniforms'],
        description: 'Leading uniform manufacturer in Indore for schools, hospitals, sports institutions, and corporates. Breathable, skin-friendly fabrics.',
      },
    ],
    contact: {
      address: '401, 4th Floor, Near Sky Corporate Tower, Scheme No 78, AB Road, Vijay Nagar, Indore, Madhya Pradesh 452010',
      phone: ['+91-9649715050', '+91-9571815050'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 10:00 AM – 6:30 PM',
      mapLink: 'https://maps.google.com/?q=401,+4th+Floor,+Near+Sky+Corporate+Tower,+AB+Road,+Vijay+Nagar,+Indore',
    },
  },
  {
    name: 'Udaipur',
    slug: 'udaipur',
    state: 'Rajasthan',
    tagline: 'Premium Custom Products in the City of Lakes',
    heroHeading: 'T-shirt & Bags Manufacturing in Udaipur at Best Price',
    description:
      'The CrossWild is a reputable t-shirt manufacturer and bags wholesaler in Udaipur, offering quality products at reasonable prices. Trusted by hotels, resorts, schools, and businesses across the City of Lakes.',
    whyChooseUs: [
      'Thousands of bags manufactured in 24 hours',
      'Waterproof bag coating with special chemicals',
      '7 printing methods for t-shirts',
      'Quality fabrics — Cotton, Poly, Lycra, Rayon',
      'Custom branding for hotels, resorts & corporates',
      'Monday–Saturday, 9 AM – 7:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Direct to Garments (DTG)', 'Dye Sublimation', 'Heat Press Printing', 'Heat Transfer Vinyl', 'Plastisol Transfer', 'CAD Cut Printing'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Dry Fit Sports T-shirts', 'Round Neck T-shirts', '100% Cotton T-shirts', 'Custom Sports Jerseys'],
        description: 'T-shirt manufacturer and wholesaler in Udaipur. Quality fabrics, perfect fitting, strict quality checks before dispatch.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['Backpacks', 'School Bags', 'Laptop Bags', 'Gym Bags', 'Corporate Bags', 'Food Delivery Bags (Swiggy/Zomato)'],
        description: 'Bags wholesaler in Udaipur. Spacious, lightweight designs with waterproof coating. Custom bags for food delivery and corporates.',
      },
    ],
    contact: {
      address: '45, Moti Magri Scheme, Zinc Park, Udaipur, Rajasthan 313001',
      phone: ['+91-9549066262'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 9:00 AM – 7:30 PM',
      mapLink: 'https://maps.google.com/?q=45,+Moti+Magri+Scheme,+Zinc+Park,+Udaipur',
    },
  },
  {
    name: 'Ajmer',
    slug: 'ajmer',
    state: 'Rajasthan',
    tagline: 'Custom Manufacturing Near the Holy City',
    heroHeading: 'Custom T-shirt, Bags & Uniform Manufacturing in Ajmer',
    description:
      'The CrossWild serves Ajmer with high-quality custom t-shirts, bags, caps, and uniforms. From schools and colleges to corporate offices and events — we deliver premium custom products at the best prices across Ajmer.',
    whyChooseUs: [
      'Starting at just ₹70 — wholesale pricing',
      'Bulk orders with fast delivery across Ajmer',
      'Multiple printing methods available',
      'Custom branding with logos and taglines',
      'School, hospital & corporate uniforms',
      'Monday–Saturday, 9 AM – 7:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Sublimation Printing', 'Heat Press', 'DTG Printing', 'Heat Transfer Vinyl'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Round Neck T-shirts', 'Dry Fit Sports T-shirts', 'Promotional T-shirts', 'Customized T-shirts'],
        description: 'Bulk t-shirt manufacturing in Ajmer for schools, colleges, sports events, and corporates. Sizes S–XXL, starting at ₹70.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['School Bags', 'Laptop Bags', 'Gym Bags', 'Backpacks', 'Corporate Office Bags'],
        description: 'Quality bag manufacturing in Ajmer. Durable, waterproof options with custom branding for schools, offices, and events.',
      },
      {
        name: 'Uniform Manufacturing',
        slug: 'uniforms',
        icon: '👔',
        link: '/products?category=uniforms',
        types: ['School Uniforms', 'Office Staff Uniforms', 'Hospital Uniforms', 'Sports Jerseys'],
        description: 'Custom uniforms for schools, hospitals, and corporates in Ajmer. Breathable, durable fabrics with logo embroidery.',
      },
    ],
    contact: {
      address: 'A-21, Vaishali Nagar, Near Civil Lines, Ajmer, Rajasthan 305001',
      phone: ['+91-9571815050', '+91-9529626262'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 9:00 AM – 7:30 PM',
      mapLink: 'https://maps.google.com/?q=A-21,+Vaishali+Nagar,+Near+Civil+Lines,+Ajmer',
    },
  },
  {
    name: 'Kota',
    slug: 'kota',
    state: 'Rajasthan',
    tagline: 'Quality Custom Products in the Industrial City',
    heroHeading: 'T-shirt & Bags Manufacturing in Kota at Wholesale Prices',
    description:
      'The CrossWild is a trusted t-shirt manufacturer and wholesaler in Kota, supplying bulk t-shirts and bags to coaching institutes, colleges, schools, and corporates. Best wholesale prices starting from ₹70.',
    whyChooseUs: [
      'Wholesale pricing from ₹70 per piece',
      'Bulk order specialist — ideal for coaching institutes',
      'Multiple printing methods: Screen, DTG, Dye Sublimation',
      'Quality fabrics — pre-shrunk, color-fast guaranteed',
      'Fast delivery across Kota and Rajasthan',
      'Monday–Saturday, 9 AM – 7:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Direct to Garments (DTG)', 'Dye Sublimation', 'Heat Press Printing', 'Heat Transfer Vinyl', 'Plastisol Transfer', 'CAD Cut Printing'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Round Neck T-shirts', 'Dry Fit Sports T-shirts', 'Promotional T-shirts', 'Customized T-shirts'],
        description: 'Bulk t-shirt manufacturing and wholesaling in Kota for events, schools, colleges, and promotions. Sizes S to XXL. Starting at ₹70.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['School Bags', 'Corporate / Office Bags', 'Travel Bags', 'Laptop Bags', 'Food Delivery Bags (Swiggy/Zomato/EatFit)'],
        description: 'Custom bag manufacturing for schools, colleges, and corporate offices in Kota. Trusted by Amity University, Biyani Group, Swiggy & Zomato.',
      },
    ],
    partners: ['Amity University', 'Biyani Group of Colleges', 'Swiggy', 'Zomato', 'EatFit'],
    contact: {
      address: 'D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017',
      phone: ['+91-9571815050', '+91-9529626262'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 9:00 AM – 7:30 PM',
      mapLink: 'https://maps.google.com/?q=D-8,+Near+World+Trade+Park,+Malviya+Nagar,+Jaipur',
    },
  },
  {
    name: 'Sikar',
    slug: 'sikar',
    state: 'Rajasthan',
    tagline: 'Reliable Custom Manufacturing in Sikar',
    heroHeading: 'T-shirt & Bags Manufacturing in Sikar at Best Prices',
    description:
      'The CrossWild is the topmost t-shirt manufacturing company in Sikar, offering bulk orders at discounted wholesale prices. From polo and round neck to dry-fit sports t-shirts, and all types of bags — delivered fast across Sikar.',
    whyChooseUs: [
      'Wholesale bulk pricing from ₹70',
      'Pre-shrunk & color-fast fabric guarantee',
      'Wide range: Polo, Round neck, Dry-fit & more',
      'Waterproof bag options with special coating',
      'Custom branding with logos and slogans',
      'Monday–Saturday, 9 AM – 7:30 PM support',
    ],
    printingMethods: ['Screen Printing', 'Direct to Garments (DTG)', 'Dye Sublimation', 'Heat Press Printing', 'Heat Transfer Vinyl', 'Plastisol Transfer', 'CAD Cut Printing'],
    fabrics: ['Cotton', 'Polyester', 'Lycra', 'Rayon', 'Poly/Cotton Blend'],
    products: [
      {
        name: 'T-shirt Manufacturing',
        slug: 'tshirts',
        icon: '👕',
        link: '/products?category=tshirts',
        types: ['Polo T-shirts', 'Round Neck T-shirts', 'Promotional T-shirts', 'Customized T-shirts', 'Dry Fit Sports T-shirts'],
        description: 'Bulk t-shirt wholesale in Sikar for marathons, yoga events, cricket tournaments, schools, and corporate clients.',
      },
      {
        name: 'Bags Manufacturing',
        slug: 'bags',
        icon: '🎒',
        link: '/products?category=bags',
        types: ['Backpacks', 'School Bags', 'Laptop Bags', 'Gym Bags', 'Office Bags', 'Food Delivery Bags'],
        description: 'Quality bag manufacturing in Sikar. Waterproof coating available. Custom branding for schools, offices, and food delivery services.',
      },
    ],
    contact: {
      address: 'D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017',
      phone: ['+91-9571815050', '+91-9529626262'],
      email: 'orders@thecrosswild.com',
      hours: 'Monday – Saturday, 9:00 AM – 7:30 PM',
      mapLink: 'https://maps.google.com/?q=D-8,+Near+World+Trade+Park,+Malviya+Nagar,+Jaipur',
    },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

// Office cities shown in the "Serving Across India" section
export const OFFICE_CITIES = ['jaipur', 'jodhpur', 'indore', 'udaipur', 'ajmer'];

// Footer items — each links to city page
export const FOOTER_LOCATION_ITEMS: { label: string; citySlug: string }[] = [
  { label: 'T-shirt Manufacturing in Jodhpur', citySlug: 'jodhpur' },
  { label: 'Bags Manufacturing in Jodhpur', citySlug: 'jodhpur' },
  { label: 'Cap Manufacturer in Jodhpur', citySlug: 'jodhpur' },
  { label: 'Uniform Makers in Jodhpur', citySlug: 'jodhpur' },
  { label: 'T-shirt Manufacturing in Kota', citySlug: 'kota' },
  { label: 'Bags Manufacturing in Kota', citySlug: 'kota' },
  { label: 'T-shirt Manufacturing in Sikar', citySlug: 'sikar' },
  { label: 'Bags Manufacturing in Sikar', citySlug: 'sikar' },
  { label: 'Bags Manufacturing in Udaipur', citySlug: 'udaipur' },
  { label: 'T-shirt Manufacturing in Udaipur', citySlug: 'udaipur' },
  { label: 'T-shirt Manufacturing in Indore', citySlug: 'indore' },
  { label: 'Bags Manufacturing in Indore', citySlug: 'indore' },
  { label: 'Uniform Manufacturing in Indore', citySlug: 'indore' },
];
