import SafeImage from "@/components/Common/SafeImage";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-theme-bg-card dark:bg-[#26211A] rounded-lg shadow-md dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] overflow-hidden hover:shadow-lg dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-shadow duration-300 border border-theme-border">
      <div className="relative h-64 w-full bg-theme-bg-soft">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-theme-text">{product.name}</h3>
        <p className="mt-2 text-theme-text-secondary line-clamp-3">
          {product.description}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="mt-4 w-full inline-block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
