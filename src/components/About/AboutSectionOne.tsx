import Image from "next/image";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const DEFAULT = {
  heading: "The Cross Wild – Crafting Quality Since 2016",
  paragraph:
    "Since 2016, The Cross Wild has been a trusted name in Indian custom printing and manufacturing. Located in peaceful Jaipur, we thrive and flourish as a custom cap manufacturer, bag manufacturer, and t-shirt manufacturer.",
  servicesList: [
    "T-Shirt Manufacturing",
    "Sweatshirt & Hoodie Manufacturing",
    "Bag Manufacturing",
    "Cap Manufacturing",
    "Mug Printing",
    "Digital Printing",
    "School & Staff Uniforms",
    "Face Masks & PPE Kits",
  ],
};

interface Props {
  content?: {
    heading?: string;
    paragraph?: string;
    paragraph2?: string;
    servicesList?: string[];
    image?: string;
  };
}

const AboutSectionOne = ({ content }: Props) => {
  const heading = content?.heading || DEFAULT.heading;
  const paragraph = content?.paragraph || DEFAULT.paragraph;
  const paragraph2 = content?.paragraph2 || null;
  const servicesList = content?.servicesList?.length ? content.servicesList : DEFAULT.servicesList;
  const data = { heading, paragraph, paragraph2, servicesList };
  const half = Math.ceil(data.servicesList.length / 2);
  const col1 = data.servicesList.slice(0, half);
  const col2 = data.servicesList.slice(half);

  const List = ({ text }: { text: string }) => (
    <p className="text-body-color mb-5 flex items-center text-lg font-medium">
      <span className="bg-primary/10 text-primary mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-9">
                <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[40px]">
                  {data.heading}
                </h2>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  {data.paragraph}
                </p>
                {data.paragraph2 && (
                  <p className="mt-4 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    {data.paragraph2}
                  </p>
                )}
              </div>
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    {col1.map((t) => <List key={t} text={t} />)}
                  </div>
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    {col2.map((t) => <List key={t} text={t} />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-25/24 max-w-[500px] lg:mr-0">
                <Image
                  src="/images/about/aboutPage/vv.png"
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src="/images/about/about-image-dark.svg"
                  alt="about-image"
                  fill
                  className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
