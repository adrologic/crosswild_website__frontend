'use client'
import React, { useRef } from 'react';

// --- Placeholder Data ---
const popularProducts = [
  { id: 1, title: "Hoodies", price: 1700, imageUrl: "/images/delete/products/Product35.png" },
  { id: 2, title: "Desk Calendars", price: 280, imageUrl: "/images/delete/products/Product36.png" },
  { id: 3, title: "Men's Polo T-Shirts", price: 550, imageUrl: "/images/delete/products/Product73.png" },
  { id: 4, title: "Standard Visiting Cards", price: 200, imageUrl: "/images/delete/products/Product92.png" },
  { id: 5, title: "Self Inking Stamps", price: 790, imageUrl: "/images/delete/products/Product95.png" },
  { id: 6, title: "Fleece Jackets", price: 1250, imageUrl: "/images/delete/products/Product97.png" },
  { id: 7, title: "Custom Mugs", price: 350, imageUrl: "/images/delete/products/Product3.png" },
];


const trendingProducts = [
  { id: 8, title: "Men's Puffer Jacket", price: 2300, imageUrl: "/images/delete/products/Product24.png" },
  { id: 9, title: "Photo Albums", price: 775, imageUrl: "/images/delete/products/Product27.png" },
  { id: 10, title: "Wall Calendars", price: 390, imageUrl: "/images/delete/products/Product 49 (1).png" },
  { id: 11, title: "Rounded Corner Visiting Cards", price: 250, imageUrl: "/images/delete/products/Product 53 (1).png" },
  { id: 12, title: "Diary With Pen Holder", price: 450, imageUrl: "/images/delete/products/Product 80 (1).png" },
];


// --- Sub-Components ---

// SVG for the horizontal scroll arrows
const ArrowIcon = ({ direction, className = '' }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    {direction === 'left' ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    )}
  </svg>
);

const ProductCard = ({ product }) => (
  <div className="flex-shrink-0 w-[160px] sm:w-[200px] h-full bg-white rounded-xl shadow-lg overflow-hidden relative cursor-pointer hover:shadow-xl transition-all duration-300">
    {/* Price Badge */}
    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full z-10 opacity-90">
      BUY 1 @ Rs.{product.price}
    </div>

    {/* Product Image */}
    <div className="h-40 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
      />
    </div>

    {/* Product Title */}
    <div className="p-3">
      <p className="text-sm sm:text-base font-medium text-gray-800 truncate">{product.title}</p>
    </div>
  </div>
);

const WhatsAppBanner = () => {
  const whatsappNumber = "919529626262"; // Removed '+' and spaces
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-[200px] sm:w-[280px] h-full rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-end p-5 cursor-pointer transition-colors duration-300 group"
      style={{ 
        backgroundImage: 'url("/images/catagory/WhatsAppBackground.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      {/* Content at the bottom (relative to avoid being hidden by icon) */}
      <div className="relative z-10">
        <h3 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">WhatsApp</h3>
        <p className="text-white text-sm mt-1 opacity-90">Share Design On WhatsApp</p>
      </div>
    </a>
  );
};


// --- Main Component ---
const ProductShowcase = () => {
  const scrollRefPopular = useRef(null);
  const scrollRefTrending = useRef(null);

  // Function to handle horizontal scrolling
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderProductSection = (title, products, ref, isTrending = false) => (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      
      {/* Scroll Container */}
      <div className="relative group">
        <div
          ref={ref}
          className="flex overflow-x-scroll no-scrollbar py-2 space-x-4 sm:space-x-6 scroll-smooth"
        >
          {/* Render WhatsApp Banner for Trending section */}
          {isTrending && (
            <div className="flex-shrink-0 mr-4 sm:mr-6">
              <WhatsAppBanner />
            </div>
          )}

          {/* Render Product Cards */}
          {products.map(product => (
            <div key={product.id} className="h-72"> {/* Fixed height for alignment */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Scroll Arrows (Hidden on mobile, visible on hover/desktop) */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg opacity-70 hover:opacity-100 transition duration-300 z-20  "
          onClick={() => scroll(ref, 'left')}
          aria-label="Scroll left"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg opacity-70 hover:opacity-100 transition duration-300 z-20  "
          onClick={() => scroll(ref, 'right')}
          aria-label="Scroll right"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12 font-sans">
      {/* This container now takes up 100% width, maintaining padding from the parent div. */}
      <div className="w-full">
        
        {/* Our Most Popular Products Section */}
        {renderProductSection(
          "Our Most Popular Products",
          popularProducts,
          scrollRefPopular
        )}

        {/* Trending Section */}
        {renderProductSection(
          "Trending",
          trendingProducts,
          scrollRefTrending,
          true // Mark as trending to include the WhatsApp banner
        )}
      </div>

      {/* Tailwind utility class to hide the default scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;