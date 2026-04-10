"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function LocationImageSlider({ images, alt }: Props) {
  const [start, setStart] = useState(0);
  const visible = 4;
  const total = images.length;

  // Get 4 images starting from `start`, wrapping around
  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(images[(start + i) % total]);
    }
    return items;
  };

  const prev = () => setStart((s) => (s - 1 + total) % total);
  const next = () => setStart((s) => (s + 1) % total);

  if (total === 0) return null;

  return (
    <div className="relative my-10 px-10">
      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-sm hover:bg-gray-700 transition-colors text-lg font-bold select-none"
      >
        «
      </button>

      {/* Track */}
      <div className="grid grid-cols-4 gap-3">
        {getVisible().map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="aspect-[3/4] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              width={280}
              height={370}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-sm hover:bg-gray-700 transition-colors text-lg font-bold select-none"
      >
        »
      </button>
    </div>
  );
}
