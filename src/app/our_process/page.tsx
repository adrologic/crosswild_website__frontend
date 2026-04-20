import type { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Process from "@/components/ProcessDetail/ProcessDetail";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/our_process', {
    title: 'Our Manufacturing Process | The Cross Wild - Custom Printing Jaipur',
    description: 'Discover The Cross Wild\'s 7-step manufacturing process: client meeting, sampling, fabric cutting, stitching, printing, quality checking, and delivery. Premium custom T-shirt manufacturing in Jaipur.',
    keywords: ['custom t-shirt manufacturing process', 'printing process Jaipur', 'how we make custom products', 'The Cross Wild process'],
  });
}

export const revalidate = 60;

export default async function OurProcess() {
  const content = await getPageContent('our-process');
  return (
    <>
      <Breadcrumb
        pageName="Our Process"
        description={content?.intro?.description || "Our process making business easy in fashion"}
      />
      <Process intro={content?.intro} steps={content?.steps?.steps} />
    </>
  );
}
