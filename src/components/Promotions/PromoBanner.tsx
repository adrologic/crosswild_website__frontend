import Image from 'next/image';
import Link from 'next/link';

interface PromoBannerData {
  image?: string;
  alt?: string;
  linkUrl?: string;
}

interface Props {
  content?: PromoBannerData;
}

export default function PromoBanner({ content }: Props) {
  const src = content?.image || '/images/about/digitalPrint.webp';
  const alt = content?.alt || 'Digital Printing Brand Promotion Products';
  const linkUrl = content?.linkUrl;

  const inner = (
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="100vw"
        priority={false}
      />
    </div>
  );

  return (
    <section className="w-full bg-[#f5ede0] dark:bg-[#1a1612]">
      {linkUrl ? (
        <Link href={linkUrl} className="block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </section>
  );
}
