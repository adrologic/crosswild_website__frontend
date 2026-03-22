import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Custom Merchandise Experts in India | The CrossWild",
  description: "India's trusted custom t-shirt and uniform manufacturer since 2016. We deliver premium printing, embroidery, and branding solutions for businesses across the country.",
  keywords: "about the crosswild, custom merchandise India, uniform manufacturer, printing company India",
  openGraph: {
    title: "About Us - Custom Merchandise Experts in India | The CrossWild",
    description: "India's trusted custom t-shirt and uniform manufacturer since 2016. Premium printing and branding solutions for businesses.",
    type: "website",
    url: "https://thecrosswild.com/about",
  },
  alternates: {
    canonical: "https://thecrosswild.com/about",
    languages: {
      "en-IN": "https://thecrosswild.com/about",
      "x-default": "https://thecrosswild.com/about",
    },
  },
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="our trusted one-stop destination for premium custom manufacturing and printing since 2016."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
