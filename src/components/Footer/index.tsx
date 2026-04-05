"use client";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaMobileAlt,
  FaEnvelope,
  FaChevronDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { useState, useRef } from "react";
import { FOOTER_LOCATION_ITEMS } from "@/data/locations";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const phoneDropdownRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "QUICK LINKS",
      id: "quick-links",
      content: (
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {[
            ["Home", "/"],
            ["Our Gallery", "/gallery"],
            ["Blog", "/blog"],
            ["Contact Us", "/contact"],
            ["About Us", "/about"],
            ["Our Process", "/process"],
            ["Why Choose Us", "/why-choose-us"],
            ["Privacy Policy", "/privacy-policy"],
            ["Disclaimer", "/disclaimer"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link href={href} className="hover:text-primary transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "PRODUCTS",
      id: "products",
      content: (
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {[
            "T-Shirt Manufacturing",
            "Sweatshirt Manufacturing",
            "Bag Manufacturer",
            "Cap Manufacturer",
            "Mug Printing",
            "Digital Printing",
            "Face Masks & PPE Kits",
            "Sanitizer & Infrared Thermometer",
            "School Uniform",
            "Staff Uniform",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "ALSO AVAILABLE IN",
      id: "locations",
      content: (
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {FOOTER_LOCATION_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={`/locations/${item.citySlug}`}
                className="hover:text-primary transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "CONTACT US",
      id: "contact",
      content: (
        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-primary mt-1" />
            <span>
              <strong>The CrossWild</strong>
              <br />
              D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan
            </span>
          </li>
          <li className="flex items-center gap-3">
            <FaPhoneAlt className="text-primary" /> +91-9571815050
          </li>
          <li className="flex items-center gap-3">
            <FaMobileAlt className="text-primary" /> +91-9529626262
          </li>
          <li className="flex items-center gap-3">
            <FaEnvelope className="text-primary" /> orders(@)thecrosswild.com
          </li>
        </ul>
      ),
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 pt-12 pb-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        {/* Top Section - Mobile */}
        <div className="md:hidden space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex justify-between items-center w-full py-3 text-left"
              >
                <h2 className="text-lg font-bold">{section.title}</h2>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    openSection === section.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openSection === section.id ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Top Section - Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-lg font-bold mb-4 border-b border-dotted border-gray-400 pb-1">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-4 flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-gray-500 dark:text-gray-400">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/thecrosswild/"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-blue-600"
            >
              <FaFacebook size={22} />
            </Link>
            <Link
              href="https://x.com/thecrosswild"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-sky-500"
            >
              <FaTwitter size={22} />
            </Link>
            <Link
              href="https://www.instagram.com/thecrosswildcompany/"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-pink-500"
            >
              <FaInstagram size={22} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCiMxyFkSTrGDq_v9mRYwEZw"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-red-600"
            >
              <FaYoutube size={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/unavailable/"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-blue-700"
            >
              <FaLinkedin size={22} />
            </Link>
            <Link
              href="https://in.pinterest.com/thecrosswildcompany/"
              target="_blank"
              className="text-gray-500 transition-colors duration-300 hover:text-red-500"
            >
              <FaPinterest size={22} />
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-6 w-px bg-gray-300"></div>

          {/* Contact Buttons */}
          <div className="flex items-center gap-4 relative" ref={phoneDropdownRef}>
            {/* Phone Round Button */}
            <button
              onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
            >
              <FiPhoneCall className="text-green-600" size={20} />
            </button>

            {/* Phone Dropdown */}
            {showPhoneDropdown && (
              <div className="absolute bottom-14 right-0 z-50 w-56 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300">
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="tel:+919571815050"
                      className="block px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-green-600"
                    >
                      +91-9571815050
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+919529626262"
                      className="block px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-green-600"
                    >
                      +91-9529626262
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {/* Email Round Button */}
            <a
              href="mailto:orders@thecrosswild.com"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
            >
              <FiMail className="text-blue-600" size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ©2025, All Rights Reserved By :{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            The CrossWild
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
