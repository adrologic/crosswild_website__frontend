import Image from "next/image";
import { useState } from "react";

const ProductDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto mt-24 p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Images */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-[500px] mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex gap-2 justify-center">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 relative cursor-pointer border-2 ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center mt-2 text-gray-600">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="ml-2">(4.7) 123 reviews</span>
          </div>

          <div className="mt-4 text-2xl font-semibold text-gray-800">
            ₹{product.price}
          </div>

          <p className="mt-4 text-gray-700">{product.shortDescription}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Color</h3>
            <div className="flex gap-2 mt-2">
              <span className="w-8 h-8 rounded-full bg-white border border-gray-300 cursor-pointer"></span>
              <span className="w-8 h-8 rounded-full bg-gray-500 border border-gray-300 cursor-pointer"></span>
              <span className="w-8 h-8 rounded-full bg-black border border-gray-300 cursor-pointer"></span>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="quantity" className="text-lg font-semibold text-gray-800">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-24 mt-2 p-2 border rounded-md"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Design & print custom men's cotton t-shirts
        </h2>

        <div className="prose max-w-none">
          <p>
            A customized Cotton T-shirt from Crosswild is a great way to
            advertise your business or message. With our easy-to-use design
            studio, you can add your logo, images or text.
          </p>

          <p>
            Whether you create your own customized men's cotton t-shirts from
            scratch or upload your artwork, we print and deliver crisp,
            professional-quality tees.
          </p>

          <p>
            For bulk orders exceeding ₹5,10,000, contact our <b>Customer Care</b> for assistance.
          </p>

          <h3 className="text-xl font-semibold mt-6">
            Premium Quality at Best Price
          </h3>

          <ul className="list-disc list-inside">
            <li>Low quantities at the best prices.</li>
            <li>Easy-to-use design tools and templates.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
