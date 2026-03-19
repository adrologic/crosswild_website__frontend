"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
}

const SafeImage = ({ fallbackText = "No Image", alt, ...props }: SafeImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-theme-bg-soft text-theme-text-muted">
        <ImageOff className="w-10 h-10 mb-2 opacity-40" />
        <span className="text-xs opacity-60">{fallbackText}</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
};

export default SafeImage;
