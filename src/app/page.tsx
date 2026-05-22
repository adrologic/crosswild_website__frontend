import dynamic from "next/dynamic";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import CrosswildHero from "@/components/Hero/CrosswildHero";
import OurNetworkSection from "@/components/Locations/OurNetworkSection";
import CrosswildCategories from "@/components/Categories/CrosswildCategories";
import TrustSection from "@/components/Features/TrustSection";
import ScrollUp from "@/components/Common/ScrollUp";
import HomeBrandContent from "@/components/Home/HomeBrandContent";
import PromoBanner from "@/components/Promotions/PromoBanner";

// Below-the-fold components — lazy loaded for faster initial page render
const PopularProducts = dynamic(() => import("@/components/Products/PopularProducts"));
const TrendingProducts = dynamic(() => import("@/components/Products/TrendingProducts"));
const ShopByCategory = dynamic(() => import("@/components/Products/ShopByCategory"));
const BestSellersAndNewArrivals = dynamic(() => import("@/components/CategorySection/BestSellersAndNewArrivals"));
const DealsSection = dynamic(() => import("@/components/Promotions/DealsSection"));
const Process = dynamic(() => import("@/components/Process/Process"));
const Brands = dynamic(() => import("@/components/Brands"));
const HomeBlogsSection = dynamic(() => import("@/components/Blogs/HomeBlogsSection"));



export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/', {
    title: 'Manufacturers of Custom T-shirts, Bags & Caps in Jaipur, India | The Cross Wild',
    description: 'The Cross Wild is India\'s trusted custom T-shirt, bags, and caps manufacturer in Jaipur since 2016. Bulk printing, corporate promotional products & uniforms. Prices from ₹70/piece. Fast delivery across India.',
    keywords: ['custom t-shirt manufacturer Jaipur', 'bags manufacturer Jaipur', 'cap printing manufacturer Jaipur', 'bulk t-shirt printing India', 'promotional products manufacturer', 'corporate merchandise India', 'The Cross Wild', 'customize corporate apparels', 'promotional products suppliers', 'promo totes India', 'bulk t-shirts supplier'],
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

      {/* Our Network — office locations, controlled via admin panel */}
      <OurNetworkSection />

      {/* Product Categories - Crosswild Style */}
      <CrosswildCategories />

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
      {/* Admin → Page Content → Home → "Customize & Promote Section" (home/why-choose) */}
      <HomeBrandContent content={content?.['why-choose']} />

      {/* Promo Banner — Digital Printing / Brand Promotion, managed via admin panel */}
      <PromoBanner content={content?.['promo-banner']} />

      {/* Trust & Features Section */}
      <TrustSection content={content?.trust} />

      {/* Manufacturing Process */}
      <Process />

      {/* Trusted Brands & Clients */}
      <Brands />

      {/* Blogs — only blogs marked "Show on Home" in admin panel appear here */}
      <HomeBlogsSection />
    </>
  );
}