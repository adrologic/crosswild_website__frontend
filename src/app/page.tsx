import dynamic from "next/dynamic";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import CrosswildHero from "@/components/Hero/CrosswildHero";
import CrosswildCategories from "@/components/Categories/CrosswildCategories";
import TrustSection from "@/components/Features/TrustSection";
import ScrollUp from "@/components/Common/ScrollUp";
import HomeBrandContent from "@/components/Home/HomeBrandContent";

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



export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/', {
    title: 'Manufacturers of Custom T-shirts, Bags & Caps in Jaipur, India | The Cross Wild',
    description: 'The Cross Wild is India\'s trusted custom T-shirt, bags, and caps manufacturer in Jaipur since 2016. Bulk printing, corporate promotional products & uniforms. Prices from ₹70/piece. Fast delivery across India.',
    keywords: ['custom t-shirt manufacturer Jaipur', 'bags manufacturer Jaipur', 'cap printing manufacturer Jaipur', 'bulk t-shirt printing India', 'promotional products manufacturer', 'corporate merchandise India', 'The Cross Wild'],
  });
}

export const revalidate = 60;

export default async function Home() {
  const content = await getPageContent('home');

  return (
    <>
      <ScrollUp />

      {/* Hero Section with Promotional Banner */}
      <CrosswildHero content={content?.hero} />

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

      {/* Brand Content — Intro, Capabilities, Why Choose, Product Highlights */}
      <HomeBrandContent />

      {/* Trust & Features Section */}
      <TrustSection content={content?.trust} />

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