"use client";

import { FaPhoneAlt } from "react-icons/fa";

export default function CallButton() {
  return (
    <a
      href="tel:+919529626262"
      aria-label="Call us at +91 95296 26262"
      className="fixed bottom-20 left-6 z-50 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-yellow-600"
    >
      <FaPhoneAlt size={24} aria-hidden="true" />
    </a>
  );
}
