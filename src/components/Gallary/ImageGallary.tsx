"use client";
import Image from 'next/image';

const Gallery = () => {
  const images = [
    { src: "/images/gallery/gallery-1.jpg", alt: "Custom T-shirt Manufacturing Jaipur" },
    { src: "/images/gallery/gallery-2.jpg", alt: "Custom Bag Manufacturing India" },
    { src: "/images/gallery/gallery-3.jpg", alt: "Cap Manufacturing Jaipur" },
    { src: "/images/gallery/gallery-4.jpg", alt: "Promotional Products Printing" },
    { src: "/images/gallery/gallery-5.jpg", alt: "Custom Sweatshirt Manufacturing" },
    { src: "/images/gallery/gallery-6.jpg", alt: "Digital Printing Services" },
    { src: "/images/gallery/gallery-7.jpg", alt: "School Uniform Manufacturing" },
    { src: "/images/gallery/gallery-8.jpg", alt: "Staff Uniform Manufacturing" },
    { src: "/images/gallery/gallery-9.jpg", alt: "Custom Mug Printing Jaipur" },
    { src: "/images/gallery/gallery-10.jpg", alt: "Bulk Order Manufacturing India" },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Gallery
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Capturing moments that inspire
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gray-200 mt-1">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            View More Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;