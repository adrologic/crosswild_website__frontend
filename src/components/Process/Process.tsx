"use client";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Lucide Icons
import {
  ClipboardList,
  Scissors,
  // Needle,
  Printer,
  ShieldCheck,
  Package,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OurProcess() {
  const router = useRouter();

  const processSteps = [
    {
      name: "Client Meeting",
      icon: <Handshake className="w-8 h-8 text-indigo-700" />,
      description: "Understanding your vision and requirements to craft tailored solutions.",
    },
    {
      name: "Sampling",
      icon: <ClipboardList className="w-8 h-8 text-indigo-700" />,
      description: "Collaborate with us to select or create unique and innovative designs.",
    },
    {
      name: "Fabric Cutting",
      icon: <Scissors className="w-8 h-8 text-indigo-700" />,
      description: "Precision cutting using advanced tools to ensure quality and accuracy.",
    },
    {
      name: "Stitching",
      // icon: <Needle className="w-8 h-8 text-indigo-700" />,
      icon: <ShieldCheck className="w-8 h-8 text-indigo-700" />,
      description: "Skilled artisans perform stitching for durability and comfort.",
    },
    {
      name: "Printing",
      icon: <Printer className="w-8 h-8 text-indigo-700" />,
      description: "High-quality printing techniques for vibrant and long-lasting designs.",
    },
    {
      name: "Quality Check",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-700" />,
      description: "Thorough quality inspections to ensure flawless products.",
    },
    {
      name: "Packing & Shipping",
      icon: <Package className="w-8 h-8 text-indigo-700" />,
      description: "Secure packaging and fast delivery through trusted partners worldwide.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-16 relative">
      <div className="w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* ===== Left Section ===== */}
        <div className="flex flex-col justify-between text-center lg:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Making business easy
            </h2>
            <p className="text-2xl font-light text-indigo-700 mt-1">in fashion</p>
            <p className="mt-6 text-gray-600 text-base md:text-lg max-w-md mx-auto lg:mx-0">
              From initial consultation to final delivery, our streamlined
              process ensures precision, creativity, and quality at every step.
            </p>
          </div>

          {/* Button */}
          <div className="mt-10">
            <button
             onClick={() => router.push("/our_process")}
              className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Explore Full Process
            </button>
          </div>
        </div>

        {/* ===== Right Section: Slider ===== */}
        <div className="relative overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {processSteps.map((step, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center bg-white shadow-md rounded-2xl p-6 text-center transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
                  {/* Step Number */}
                  <div className="text-sm font-medium text-indigo-600 mb-3">
                    Step {index + 1}
                  </div>

                  {/* Icon with circular background */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 mb-4">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ===== Custom Navigation Arrows ===== */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
            <button aria-label="Previous slide" className="custom-swiper-button-prev bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
            <button aria-label="Next slide" className="custom-swiper-button-next bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
