import dynamic from "next/dynamic";
import { Metadata } from "next";
import CrosswildHero from "@/components/Hero/CrosswildHero";
import CrosswildCategories from "@/components/Categories/CrosswildCategories";
import TrustSection from "@/components/Features/TrustSection";
import ScrollUp from "@/components/Common/ScrollUp";

// Below-the-fold components — lazy loaded for faster initial page render
const ExploreAllCategories = dynamic(() => import("@/components/Categories/ExploreAllCategories"));
const PopularProducts = dynamic(() => import("@/components/Products/PopularProducts"));
const TrendingProducts = dynamic(() => import("@/components/Products/TrendingProducts"));
const ShopByCategory = dynamic(() => import("@/components/Products/ShopByCategory"));
const BestSellersAndNewArrivals = dynamic(() => import("@/components/CategorySection/BestSellersAndNewArrivals"));
const DealsSection = dynamic(() => import("@/components/Promotions/DealsSection"));
const Process = dynamic(() => import("@/components/Process/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Brands = dynamic(() => import("@/components/Brands"));
const Contact = dynamic(() => import("@/components/Contact"));



export const metadata: Metadata = {
  title: "The CrossWild - Custom T-Shirts, Uniforms & Corporate Merchandise | Premium Printing Services",
  description: "Leading manufacturer of custom t-shirts, corporate uniforms, promotional merchandise, and personalized products. Premium printing, bulk orders, and custom branding solutions for businesses across India.",
  keywords: [
    "custom t-shirts India",
    "corporate uniforms manufacturer",
    "promotional merchandise",
    "bulk t-shirt printing",
    "custom merchandise",
    "corporate gifting",
    "branded apparel",
    "school uniforms",
    "staff uniforms",
    "promotional products",
  ],
  authors: [{ name: "The CrossWild" }],
  creator: "The CrossWild",
  publisher: "The CrossWild",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thecrosswild.com/",
    title: "The CrossWild - Custom T-Shirts & Corporate Merchandise",
    description: "Premium custom printing services for t-shirts, uniforms, and promotional merchandise. Trusted by leading brands across India.",
    siteName: "The CrossWild",
    images: [
      {
        url: "/images/logo/logo-crosswile.jpg",
        width: 1200,
        height: 630,
        alt: "The CrossWild - Custom Printing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The CrossWild - Custom T-Shirts & Corporate Merchandise",
    description: "Premium custom printing services for t-shirts, uniforms, and promotional merchandise.",
    images: ["/images/logo/logo-crosswile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <ScrollUp />

      {/* Hero Section with Promotional Banner */}
      <CrosswildHero />

      {/* Product Categories - Crosswild Style */}
      <CrosswildCategories />

      {/* Explore All Categories Section */}
      <ExploreAllCategories />

      {/* Best Sellers & New Arrivals */}
      <BestSellersAndNewArrivals />

      {/* Our Most Popular Products */}
      <PopularProducts />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Shop by Category - Products per Category */}
      <ShopByCategory />

      {/* Deals & Promotions Section */}
      <DealsSection />

      {/* Trust & Features Section */}
      <TrustSection />

      {/* Manufacturing Process */}
      <Process />

      {/* Trusted Brands & Clients */}
      <Brands />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />
    </>
  );
}