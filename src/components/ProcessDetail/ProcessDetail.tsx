"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Handshake, ClipboardList, Scissors, Spool, Printer, ShieldCheck, Package,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Handshake, ClipboardList, Scissors, Spool, Printer, ShieldCheck, Package,
};

const DEFAULT_INTRO = {
  h1: "Our Process",
  h2: "Welcoming You All From Our Facility At Jaipur",
  description:
    "We want to provide products tailored specifically for you. This is part of our unique manufacturing process, which we are carrying out to ensure that you only receive the items that fit your style and needs the best. Here's how we do it:",
};

const DEFAULT_STEPS = [
  {
    num: 1, title: "Client Meeting", icon: "Handshake",
    img: "/images/about/clinte-meet.jpg", alt: "Client meeting at our Jaipur facility",
    text: "We are committed to finding the right products for you. To tailor to your particular needs, we hold various meetings with our team to discuss in-depth your specific use case and ensure we don't miss a thing with your vision.",
  },
  {
    num: 2, title: "Sampling", icon: "ClipboardList",
    img: "/images/about/fabric-smapling.jpg", alt: "Sampling and design selection",
    text: "We have a huge range of personalized tools for both people and businesses that can meet all budgets and all purposes. We provide you the option to choose from our exclusive designs or create your template.",
  },
  {
    num: 3, title: "Fabric Cutting", icon: "Scissors",
    img: "/images/about/fabricCutting1.jpg", alt: "Precision fabric cutting",
    text: "Once the sample is confirmed we cut the fabric to the desired shape. From one piece to one thousand we create each and every piece to your specifications.",
  },
  {
    num: 4, title: "Stitching", icon: "Spool",
    img: "/images/about/sttching.jpg", alt: "High quality stitching",
    text: "Our Hoodie Manufacturing Company in Jaipur is proud to offer precision. Skilled artisans perform high quality stitching so your product starts to take shape.",
  },
  {
    num: 5, title: "Printing", icon: "Printer",
    img: "/images/about/digitalPrint.webp", alt: "Advanced printing methods",
    text: "Our expertise in advanced printing methods such as digital printing, screen printing, sublimation printing, rubber printing, etc. ensures clear and smudge-free designs that will last for long.",
  },
  {
    num: 6, title: "Checking and Testing", icon: "ShieldCheck",
    img: "/images/about/testing.jpeg", alt: "Quality control and testing",
    text: "Each product is individually checked and tested to ensure the highest quality by our quality control team. We make the necessary changes so that your ordering is perfect.",
  },
  {
    num: 7, title: "Packing and Shipping", icon: "Package",
    img: "/images/about/pakingg.png", alt: "Packing and shipping",
    text: "After your product passes the quality tests, we pack it securely and prepare it for delivery. We work with trusted shipping partners to ensure your order reaches you safely and on time.",
  },
];

interface Step { num: number; title: string; icon?: string; img: string; alt: string; text: string }
interface IntroData { h1?: string; h2?: string; description?: string }
interface Props { intro?: IntroData; steps?: Step[] }

export default function ProcessDetailsPage({ intro, steps }: Props) {
  const introData = { ...DEFAULT_INTRO, ...intro };
  const stepsData: Step[] = steps?.length ? steps : DEFAULT_STEPS;

  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-950">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-indigo-200 via-fuchsia-200 to-amber-200 blur-[120px] opacity-30" />
        <div className="absolute bottom-0 -left-10 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-200 blur-[120px] opacity-25" />
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="w-full py-14 md:py-20">
          <div className="text-center md:text-left">
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {introData.h2}
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-700 dark:text-gray-300">
              {introData.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {stepsData.map((s, i) => (
                <a
                  key={i}
                  href={`#step-${s.num}`}
                  className="text-xs md:text-sm text-indigo-700 bg-white/70 backdrop-blur hover:bg-white px-3 py-1 rounded-full ring-1 ring-indigo-100 shadow-sm transition"
                >
                  {s.num}. {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <div className="w-full space-y-12 md:space-y-16">
          {stepsData.map((step, idx) => {
            const Icon = ICON_MAP[step.icon || "Package"] || Package;
            const isEven = idx % 2 === 1;
            return (
              <article
                id={`step-${step.num}`}
                key={step.num}
                className={`grid items-center gap-8 md:gap-12 ${isEven ? "md:grid-cols-[1.1fr_.9fr]" : "md:grid-cols-[.9fr_1.1fr]"}`}
              >
                <div className={isEven ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-sm">
                      {step.num}
                    </span>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 ring-1 ring-indigo-100 shadow-sm">
                      <Icon className="h-5 w-5 text-indigo-700" />
                    </div>
                  </div>
                  <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{step.title}</h2>
                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">{step.text}</p>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {["Tailored to your use case", "Transparent communication", "Quality-first approach", "On-time delivery"].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={isEven ? "md:order-1" : ""}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white/60 ring-1 ring-black/5 shadow-sm">
                    <Image
                      src={step.img}
                      alt={step.alt}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                      priority={idx < 2}
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/10 to-transparent" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 pb-20">
        <div className="w-full">
          <div className="rounded-2xl bg-white/70 dark:bg-gray-800 backdrop-blur ring-1 ring-indigo-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Ready to start your custom order?</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">Talk to our team and get a tailored quotation for your project.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/contact-us" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-700 transition">
                Contact Us
              </Link>
              <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 px-5 py-2.5 text-gray-900 dark:text-white font-medium shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
