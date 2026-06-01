import type { Metadata } from 'next';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Gallery from "@/components/Gallary/ImageGallary";
import { generatePageMetadata } from "@/lib/seo";
import { getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/image-gallery', {
    title: 'Gallery - Custom Printing & Manufacturing Portfolio | The Cross Wild',
    description: 'View The Cross Wild\'s portfolio of custom T-shirts, bags, caps, promotional products, and uniforms. See real work from our Jaipur manufacturing facility serving clients across India.',
    keywords: ['custom printing gallery', 'promotional products portfolio', 't-shirt printing samples', 'The Cross Wild gallery', 'custom manufacturing Jaipur'],
  });
}

export const revalidate = 60;

const ImageGallery = async () => {
  const content = await getPageContent('image-gallery');
  return (
    <>
      <Breadcrumb
        pageName={content?.banner?.title || 'Image Gallery'}
        description={content?.banner?.description || 'Explore our best custom printing and manufacturing projects.'}
        asH1
      />
      <Gallery />
    </>
  );
};

export default ImageGallery;


