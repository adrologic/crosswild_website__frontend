import Image from "next/image";
import {
  CheckCircleIcon,
  TruckIcon,
  PaintBrushIcon,
  CurrencyRupeeIcon,
  CogIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/solid";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe: GlobeAsiaAustraliaIcon,
  Paint: PaintBrushIcon,
  Rupee: CurrencyRupeeIcon,
  Cog: CogIcon,
  Check: CheckCircleIcon,
  Truck: TruckIcon,
};

const DEFAULT_WHY_FEATURES = [
  { title: "100% India-Based Operations", description: "All our products are proudly manufactured in India.", icon: "Globe" },
  { title: "Top Quality Prints with Precision", description: "We use advanced printing technology for accurate designs.", icon: "Paint" },
  { title: "Transparent Pricing", description: "No hidden costs – what you see is what you get.", icon: "Rupee" },
  { title: "Innovative Design Studio", description: "Get access to our extensive library of design options or create your own custom artwork.", icon: "Cog" },
  { title: "Comprehensive Customization", description: "Whether it's personalized t-shirts, bags, or caps, we've got you covered.", icon: "Check" },
  { title: "Drop Shipping Services", description: "Hassle-free delivery to your customers' doorstep.", icon: "Truck" },
];

const DEFAULT_VALUE_ITEMS = [
  { title: "This includes everything from sophisticated corporate bags all the way down to t-shirts personalized for your home town and more." },
  { title: "Through association with each employee and acquaintance, have management become a better form of business." },
  { title: "Spacious, clean and safe production facilities guarantee a productive work environment for all staff." },
  { title: "Fast delivery everywhere in India, rest assured that all orders arrive on time!" },
  { title: "Durable high-quality products that can stand the test of time." },
  { title: "Pricing is reasonable, with bulk and volume orders carried out at privileged prices." },
];

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

interface OfferItem { title: string; description?: string }
interface Feature { title: string; description?: string; icon?: string }

interface Props {
  whatWeOfferContent?: { heading?: string; subheading?: string; items?: OfferItem[] };
  valuesContent?: { heading?: string; paragraph?: string; items?: { title?: string; description?: string }[] };
  whyContent?: { heading?: string; subheading?: string; features?: Feature[] };
  founderContent?: { heading?: string; name?: string; description?: string };
}

export default function AboutSectionTwo({ whatWeOfferContent, valuesContent, whyContent, founderContent }: Props) {
  const valueItems = valuesContent?.items?.length ? valuesContent.items : DEFAULT_VALUE_ITEMS;
  const whyFeatures: Feature[] = whyContent?.features?.length ? whyContent.features : DEFAULT_WHY_FEATURES;
  const offerItems: OfferItem[] = whatWeOfferContent?.items?.length ? whatWeOfferContent.items : [];

  return (
    <>
      {/* What We Offer */}
      {offerItems.length > 0 && (
        <section className="pt-16 md:pt-20">
          <div className="container">
            <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20">
              <h2 className="mb-2 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                {whatWeOfferContent?.heading || "What We Offer"}
              </h2>
              <p className="mb-8 text-base font-medium text-body-color sm:text-lg">
                {whatWeOfferContent?.subheading}
              </p>
              <ul className="space-y-4">
                {offerItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 text-base text-body-color sm:text-lg">
                    <span className="mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                      {checkIcon}
                    </span>
                    <span>
                      <strong className="text-black dark:text-white">{item.title}:</strong>{" "}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Value to Customers */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0">
                <Image src="/images/about/aboutPage/cp.jpg" alt="about image" fill className="drop-shadow-three" />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-[470px]">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                  {valuesContent?.heading || "Value to Customers"}
                </h2>
                <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {valuesContent?.paragraph || "Our primary goal is to offer more to the customer. This is our way of helping people make the smooth transition into work, every step that needs to take pride in being put together"}
                </p>
                <ul className="space-y-3">
                  {valueItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-body-color sm:text-lg">
                      <span className="mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                        {checkIcon}
                      </span>
                      <span>{item.description || item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {whyContent?.heading || "Why Choose Us?"}
            </h3>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {whyContent?.subheading || "Here's why we are trusted by businesses and individuals alike for their custom product manufacturing needs:"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyFeatures.map((feature) => {
              const Icon = ICON_MAP[feature.icon || "Check"] || CheckCircleIcon;
              return (
                <div key={feature.title} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  </div>
                  {feature.description && (
                    <p className="mt-3 text-gray-600 dark:text-gray-300">{feature.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      {founderContent?.description && (
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h4 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {founderContent.heading || "Founder"}
              </h4>
              <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                {founderContent.description}
              </p>
              {founderContent.name && (
                <p className="mt-4 font-semibold text-black dark:text-white">— {founderContent.name}</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
