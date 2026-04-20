import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/about-us', {
    title: 'About Us - The Cross Wild | Custom Printing Manufacturer Since 2016',
    description: 'The Cross Wild is Jaipur\'s leading custom T-shirt, bag, and cap manufacturer since 2016. Trusted by 500+ businesses across India for quality promotional products, corporate uniforms, and bulk printing.',
    keywords: ['about The Cross Wild', 'custom t-shirt manufacturer Jaipur', 'promotional products company India', 'corporate printing manufacturer since 2016'],
  });
}

export const revalidate = 60;

export default async function AboutPage() {
  const content = await getPageContent('about-us');

  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description={content?.intro?.paragraph?.slice(0, 120) || "Our trusted one-stop destination for premium custom manufacturing and printing since 2016."}
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
