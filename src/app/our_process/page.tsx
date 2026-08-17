import type { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Process from "@/components/ProcessDetail/ProcessDetail";
import ThemeBanner from "@/components/Common/ThemeBanner";
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

/** Screen printing vs DTF, explained in the artwork itself. */
const PRINTING_BANNER = {
  src: '/banners/printing/printingTechniques.webp',
  aspectRatio: '7000 / 3938',
  alt:
    'Screen printing — ink is pushed through a mesh screen onto the fabric. ' +
    'DTF printing — the design is printed on a special film and then heat transferred to the fabric.',
};

export default async function OurProcess() {
  const content = await getPageContent('our-process');
  return (
    <>
      <Breadcrumb
        pageName={content?.banner?.title || 'Our Process'}
        description={content?.banner?.description || content?.intro?.description || 'Our process making business easy in fashion'}
        asH1
      />
      {/* Printing techniques — screen printing and DTF side by side, each with
          a one-line explanation drawn into the artwork. Straight after the page
          introduction, so the reader sees the two methods before the steps. */}
      <ThemeBanner
        light={PRINTING_BANNER.src}
        alt={PRINTING_BANNER.alt}
        aspectRatio={PRINTING_BANNER.aspectRatio}
        priority
      />

      <Process intro={content?.intro} steps={content?.steps?.steps} />
    </>
  );
}
