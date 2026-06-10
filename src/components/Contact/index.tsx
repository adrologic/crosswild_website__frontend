"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, RefreshCw } from "lucide-react";
import { submitContact } from "@/lib/cms";

// 6 chars, A–Z + 2–9, with visually ambiguous chars removed (0/O, 1/I/l).
const CAPTCHA_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CAPTCHA_LENGTH = 6;
function generateCaptcha(): string {
  let s = "";
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    s += CAPTCHA_ALPHABET[Math.floor(Math.random() * CAPTCHA_ALPHABET.length)];
  }
  return s;
}

const DEFAULT_OFFICES = [
  { title: "Corporate Office", city: "Jaipur", address: "D-8, Near World Trade Park, D-Block, Malviya Nagar, Jaipur, Rajasthan 302017", phone: ["+91-9571815050", "+91-9529626262"], hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
  { title: "Jodhpur Branch Location", city: "Jodhpur", address: "B-13, Shastri Nagar, Near Shastri Circle, Jodhpur, Rajasthan 342003", phone: ["+91-9571286262"], hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
  { title: "Indore Branch Location", city: "Indore", address: "401, 4th Floor, Near Sky Corporate Tower, Scheme No 78, AB Road, Vijay Nagar, Indore, Madhya Pradesh 452010", phone: ["+91-9649715050"], hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
  { title: "Udaipur Branch Location", city: "Udaipur", address: "45, Moti Magri Scheme, Zinc Park, Udaipur, Rajasthan 313001", phone: ["+91-9549066262"], hours: "Mon–Sat: 9:00 AM – 6:00 PM" },
];

interface Office { title: string; city: string; address: string; phone: string[]; hours: string }
interface ContactInfo { heading?: string; subheading?: string; email?: string; formHeading?: string; offices?: Office[] }
interface Props { content?: ContactInfo }

const Contact = ({ content }: Props) => {
  const offices: Office[] = content?.offices?.length ? content.offices : DEFAULT_OFFICES;
  const heading = content?.heading || "Contact Us";
  const subheading = content?.subheading || "We have 24 hours email support. Reach out to us anytime.";
  const email = content?.email || "orders@thecrosswild.com";
  const formHeading = content?.formHeading || "Send Us a Message";
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Captcha is generated client-side after mount to avoid SSR/CSR hydration
  // mismatch (Math.random would yield different values on server vs client).
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    // Captcha gate — case-insensitive, regenerate on failure to prevent retry.
    if (!captcha || captchaInput.trim().toUpperCase() !== captcha) {
      setError("Verification code does not match. Please try again.");
      refreshCaptcha();
      return;
    }
    setSubmitting(true);
    setError("");
    const result = await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: "contact-page",
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.message || "Failed to send. Please try again.");
      refreshCaptcha();
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl">{heading}</h2>
          <p className="mt-4 text-base text-body-color">{subheading}</p>
        </div>

        {/* Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {offices.map((office) => (
            <div
              key={office.city}
              className="rounded-xl bg-white dark:bg-gray-dark p-6 shadow-md border border-stroke dark:border-transparent"
            >
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">{office.title}</h3>
              <div className="space-y-3 text-sm text-body-color">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <span>{office.address}</span>
                </div>
                {office.phone.map((ph) => (
                  <div key={ph} className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${ph.replace(/-/g, '')}`} className="hover:text-primary transition">
                      {ph}
                    </a>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email + Contact Form */}
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-12 rounded-xs bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {formHeading}
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Fill out the form below and our team will get back to you shortly.
              </p>
              {submitted ? (
                <div className="py-10 text-center text-green-600 font-semibold text-lg">
                  Thank you! We will get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded">{error}</div>
                  )}
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Enter your message"
                          value={formData.message}
                          onChange={handleChange}
                          className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          Verification
                        </label>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            aria-label={`Captcha code: ${captcha || 'loading'}`}
                            className="select-none rounded-xs border border-stroke bg-[#f8f8f8] dark:bg-[#2C303B] dark:border-transparent px-5 py-3 font-mono text-lg font-bold tracking-[0.4em] text-dark dark:text-white"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(45deg, transparent 0, transparent 6px, rgba(0,0,0,0.06) 6px, rgba(0,0,0,0.06) 8px)',
                              fontStyle: 'italic',
                              minWidth: '11rem',
                              textAlign: 'center',
                            }}
                          >
                            {captcha || ' '}
                          </span>
                          <button
                            type="button"
                            onClick={refreshCaptcha}
                            aria-label="Generate a new verification code"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <RefreshCw className="w-4 h-4" aria-hidden="true" />
                            Refresh
                          </button>
                        </div>
                        <input
                          type="text"
                          name="captcha"
                          required
                          autoComplete="off"
                          placeholder="Enter the code shown above"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Sending...' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Email Info */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="rounded-xl bg-white dark:bg-gray-dark p-8 shadow-md border border-stroke dark:border-transparent h-full flex flex-col justify-center gap-6">
              <h3 className="text-xl font-bold text-black dark:text-white">Get In Touch</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white mb-1">Email Us</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-body-color hover:text-primary transition text-sm"
                  >
                    {email}
                  </a>
                  <p className="text-sm text-body-color mt-1">We have 24 hours email support</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white mb-1">Call Us</p>
                  <a href="tel:+919571815050" className="text-body-color hover:text-primary transition text-sm block">
                    +91-9571815050 (Jaipur)
                  </a>
                  <a href="tel:+919571286262" className="text-body-color hover:text-primary transition text-sm block">
                    +91-9571286262 (Jodhpur)
                  </a>
                  <a href="tel:+919649715050" className="text-body-color hover:text-primary transition text-sm block">
                    +91-9649715050 (Indore)
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white mb-1">Corporate Office</p>
                  <p className="text-sm text-body-color">
                    D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan 302017
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
