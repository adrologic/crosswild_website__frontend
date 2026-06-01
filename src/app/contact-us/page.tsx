import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/contact-us', {
    title: 'Contact Us - The Cross Wild | Custom T-shirt Manufacturer Jaipur',
    description: 'Contact The Cross Wild for custom T-shirts, bags, caps, and promotional merchandise. Corporate office in Jaipur with branches in Jodhpur, Indore, and Udaipur. Call +91-9529626262.',
    keywords: ['contact The Cross Wild', 'custom t-shirt manufacturer contact', 'promotional products Jaipur', 'bulk order inquiry India'],
  });
}

export const revalidate = 60;

export default async function ContactPage() {
  const content = await getPageContent('contact-us');
  return (
    <>
      <Breadcrumb
        pageName={content?.banner?.title || 'Contact Page'}
        description={content?.banner?.description || content?.info?.subheading || 'Get in touch with us for inquiries, support, or collaborations.'}
        asH1
      />
      <Contact content={content?.info} />
    </>
  );
}
