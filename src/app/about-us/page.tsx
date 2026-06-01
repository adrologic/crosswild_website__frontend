import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import PageBanner from "@/components/Common/PageBanner";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

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
        subtitle={banner?.subtitle}
        bannerImage={banner?.image || null}
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
