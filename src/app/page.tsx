import dynamic from "next/dynamic";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";
import CrosswildHero from "@/components/Hero/CrosswildHero";
import OurNetworkSection from "@/components/Locations/OurNetworkSection";
import CrosswildCategories from "@/components/Categories/CrosswildCategories";
import ScrollUp from "@/components/Common/ScrollUp";
import HomeBrandContent from "@/components/Home/HomeBrandContent";
import ThemeBanner from "@/components/Common/ThemeBanner";

/** "Grow your Business with us" band — one designed image per theme (7000x3937). */
const GROW_BANNER = {
  light: '/banners/homePage/growLight.png',
  dark: '/banners/homePage/growDark.png',
  aspectRatio: '7000 / 3937',
  alt: 'Grow your business with us — big or small, we give our best to every order',
};

/** "What We Do" band — manufacturing, printing & embroidery, customisation. */
const WHAT_WE_DO_BANNER = {
  light: '/banners/homePage/whatWeDoLight.webp',
  dark: '/banners/homePage/whatWeDoDark.webp',
  aspectRatio: '7001 / 3938',
  alt:
    'What we do — manufacturing of premium t-shirts, polos, hoodies, bags, caps and uniforms; ' +
    'printing and embroidery including screen printing, DTF, DTG, puff and more; and ' +
    'customisation with your own design and branding',
};

/** "Who We Work With" band — the buyer types this catalogue is built for. */
const WHO_WE_WORK_WITH_BANNER = {
  light: '/banners/homePage/whoWeWorkWithLight.webp',
  dark: '/banners/homePage/whoWeWorkWithDark.webp',
  aspectRatio: '7000 / 3938',
  alt:
    'Who we work with — startups, brands, corporates, schools, events, gyms and fitness, ' +
    'restaurants and resellers',
};

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

      {/* "Grow your Business with us" band — sits directly under the hero, so it
          is near the fold and loads with priority rather than lazily. */}
      <ThemeBanner
        light={GROW_BANNER.light}
        dark={GROW_BANNER.dark}
        alt={GROW_BANNER.alt}
        aspectRatio={GROW_BANNER.aspectRatio}
        bgClass="bg-[#AACBFE] dark:bg-[#861424]"
        priority
      />

      {/* Our Network — office locations, controlled via admin panel */}
      <OurNetworkSection />

      {/* Product Categories - Crosswild Style */}
      <CrosswildCategories />

      {/* "What We Do" band — sits straight after the categories so a first-time
          visitor learns what the business actually offers before the product
          rails start. */}
      <ThemeBanner
        light={WHAT_WE_DO_BANNER.light}
        dark={WHAT_WE_DO_BANNER.dark}
        alt={WHAT_WE_DO_BANNER.alt}
        aspectRatio={WHAT_WE_DO_BANNER.aspectRatio}
        bgClass="bg-[#AACBFE] dark:bg-[#861424]"
        href="/services"
      />

      {/* Best Sellers & New Arrivals */}
      <BestSellersAndNewArrivals />

      {/* Our Most Popular Products */}
      <PopularProducts />

      {/* Trending Products */}
      <TrendingProducts />

      {/* Shop by Category - Products per Category */}
      <ShopByCategory />

      {/* "Who We Work With" band — social proof after the buyer has seen the
          range, and its drawn-in CTA leads to the contact page. */}
      <ThemeBanner
        light={WHO_WE_WORK_WITH_BANNER.light}
        dark={WHO_WE_WORK_WITH_BANNER.dark}
        alt={WHO_WE_WORK_WITH_BANNER.alt}
        aspectRatio={WHO_WE_WORK_WITH_BANNER.aspectRatio}
        bgClass="bg-[#AACBFE] dark:bg-[#861424]"
        href="/contact-us"
      />

      {/* Deals & Promotions Section */}
      <DealsSection />

      {/* Brand Content — Intro, Capabilities, Why Choose, Product Highlights */}
      {/* Admin → Page Content → Home → "Customize & Promote Section" (home/why-choose) */}
      <HomeBrandContent content={content?.['why-choose']} />

      {/* The "Digital Printing / Brand Promotion" promo banner used to render
          here. Taken off the page; its artwork and the `home/promo-banner`
          section are still in the admin panel, so it can be put back by
          restoring <PromoBanner content={content?.['promo-banner']} />. */}

      {/* The six-tile trust section rendered a second "Why Choose The CrossWild"
          H2 here, duplicating the numbered one in HomeBrandContent above. Its
          tiles were the generic half of the pair (Fast Delivery, 24/7 Support),
          so the keyword-carrying section is the one kept. Data untouched in
          `home/trust`, and the section still renders on the location pages. */}

      {/* Manufacturing Process */}
      <Process />

      {/* Trusted Brands & Clients */}
      <Brands />

      {/* Blogs — only blogs marked "Show on Home" in admin panel appear here */}
      <HomeBlogsSection />
    </>
  );
}