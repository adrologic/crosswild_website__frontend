import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import PageBanner from "@/components/Common/PageBanner";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

/**
 * About Us hero — one designed image per theme, 7000x3938 (16:9). The heading,
 * tagline and CTA are baked into the artwork, so the banner renders at its own
 * ratio with nothing drawn over it and `tagline` mirrors the artwork's copy into
 * the DOM for search engines and screen readers.
 *
 * A `banner.image` set in the CMS still wins and falls back to the old short
 * banner with the title overlaid.
 */
const ABOUT_BANNER = {
  light: '/banners/aboutUS/aboutHeroLight.png',
  dark: '/banners/aboutUS/aboutHeroDark.png',
  aspectRatio: '7000 / 3938',
  tagline:
    'We don’t just make apparel & bags. We help brands, businesses & organisation bring their ideas to life with quality they can trust.',
};

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/about-us', {
    title: 'About Us - The Cross Wild',
    description: "Since 2016, The CrossWild has been a trusted name in custom manufacturing and printing. Specializing in t-shirts, bags, caps, and more, we offer high-quality, affordable promotional products tailored to your needs. Proudly Indian-made, with fast delivery and exceptional customer service.",
    keywords: [
      'about The Cross Wild',
      'custom t-shirt manufacturer Jaipur',
      'bags manufacturer Jaipur',
      'cap printing manufacturer Jaipur',
      'promotional products company India',
      'custom printing manufacturer since 2016',
      'The CrossWild',
    ],
  });
}

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getPageContent('about-us');
  const banner = content?.banner;

  return (
    <>
      <PageBanner
        title={banner?.title || 'About Us'}
        subtitle={banner?.subtitle || ABOUT_BANNER.tagline}
        bannerImage={banner?.image || ABOUT_BANNER.light}
        bannerImageDark={banner?.image ? null : ABOUT_BANNER.dark}
        aspectRatio={banner?.image ? undefined : ABOUT_BANNER.aspectRatio}
        bannerBgClass="bg-[#AACBFE] dark:bg-[#861424]"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        asH1
      />
      <AboutSectionOne content={content?.intro} />
      <AboutSectionTwo
        whatWeOfferContent={content?.['what-we-offer']}
        valuesContent={content?.values}
        whyContent={content?.['why-choose-us']}
        founderContent={content?.founder}
      />
    </>
  );
}
