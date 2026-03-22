import Breadcrumb from "@/components/Common/Breadcrumb";
import Locations from "@/components/Locations/locations";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get a Custom Merchandise Quote | The CrossWild",
  description: "Contact The CrossWild for custom t-shirts, uniforms, and corporate merchandise. Get a free quote for bulk orders, printing, and embroidery services across India.",
  keywords: "contact the crosswild, custom merchandise quote, bulk order inquiry, printing services India",
  openGraph: {
    title: "Contact Us - Get a Custom Merchandise Quote | The CrossWild",
    description: "Contact us for custom t-shirts, uniforms, and corporate merchandise. Free quotes for bulk orders across India.",
    type: "website",
    url: "https://thecrosswild.com/contact",
  },
  alternates: {
    canonical: "https://thecrosswild.com/contact",
    languages: {
      "en-IN": "https://thecrosswild.com/contact",
      "x-default": "https://thecrosswild.com/contact",
    },
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Get in touch with us for inquiries, support, or collaborations. We're here to help and just a message or call away."
      />
      <Locations />
      <Contact />
    </>
  );
};

export default ContactPage;
