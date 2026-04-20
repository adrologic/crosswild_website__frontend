import type { Metadata } from 'next';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Gallery from "@/components/Gallary/ImageGallary";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('/image-gallery', {
    title: 'Gallery - Custom Printing & Manufacturing Portfolio | The Cross Wild',
    description: 'View The Cross Wild\'s portfolio of custom T-shirts, bags, caps, promotional products, and uniforms. See real work from our Jaipur manufacturing facility serving clients across India.',
    keywords: ['custom printing gallery', 'promotional products portfolio', 't-shirt printing samples', 'The Cross Wild gallery', 'custom manufacturing Jaipur'],
  });
}

export const revalidate = 60;

const ImageGallery = () => {
  return (
    <>
      <Breadcrumb
        pageName="Image Gallery" // Should match the actual page content
        description="Explore our best custom printing and manufacturing projects."
      />
      {/* Assuming 'Process' component is actually displaying the gallery content */}
      <Gallery /> 
    </>
  );
};

export default ImageGallery;


