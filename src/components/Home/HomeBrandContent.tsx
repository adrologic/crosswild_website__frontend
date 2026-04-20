import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const CAPABILITIES = [
  {
    title: 'T-Shirts',
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    titleColor: 'text-blue-700 dark:text-blue-400',
    items: ['Custom Corporate Tees', 'Budget-Friendly Printing', 'Event-Specific Designs'],
    link: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur',
  },
  {
    title: 'Bags',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    titleColor: 'text-orange-700 dark:text-orange-400',
    items: ['Custom Gym Bags', 'Wholesale Tote Suppliers', 'Laptop Bags (India)'],
    link: '/product/school-laptop-bag-manufacturer-in-Jaipur',
  },
  {
    title: 'Caps',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    titleColor: 'text-green-700 dark:text-green-400',
    items: ['Branded & Embroidered Caps', 'Baseball & Trucker Styles', 'Eco-Friendly Options'],
    link: '/product/cap-printing-manufacturer-in-jaipur',
  },
];

const WHY_CHOOSE = [
  {
    num: '01',
    title: 'Unmatched Customization',
    description:
      'We offer custom artwork with every order, ensuring your products are unique and perfectly matched with your exact needs. Our designers are widely experienced in logos, images and patterns that can meet your branding needs.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    num: '02',
    title: 'Affordable Bulk Manufacturing',
    description:
      'Ordering large quantities can be expensive. We make it affordable to get there with every bulk custom t-shirt order, personalized bags in bulk or promotional campaign caps without sacrificing quality.',
    color: 'from-primary to-orange-500',
  },
  {
    num: '03',
    title: 'Fast Turnaround Times',
    description:
      'We put our customers first by making sure that your orders are packed and sent as soon as possible. On most orders you will even receive free delivery for added convenience.',
    color: 'from-green-500 to-green-600',
  },
];

const PRODUCT_HIGHLIGHTS = [
  {
    title: 'Mug Printing',
    image: '/images/products/Mugs/Promotional-Mug.jpg',
    link: '/product/mug-printing-in-Jaipur',
    gradient: 'from-red-900/70 to-red-700/50',
  },
  {
    title: 'Cap Printing',
    image: '/images/products/Caps/Sports-Cap.jpg',
    link: '/product/cap-printing-manufacturer-in-jaipur',
    gradient: 'from-gray-900/70 to-gray-700/50',
  },
  {
    title: 'Digital Printing',
    image: '/images/products/Digital-Printing/Digital-Printing.jpg',
    link: '/product/printing',
    gradient: 'from-teal-900/70 to-teal-700/50',
  },
];

export default function HomeBrandContent() {
  return (
    <>
      {/* ── Intro + Capabilities ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Drive Brand Success with Cross Wild Manufacturing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Custom T-Shirts, Bags, and Caps Manufacturer in Jaipur, India
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded in 2016, The Cross Wild has grown into one of the most trusted names in custom product printing
              and manufacturing in India. Based in Jaipur, we are proud to be a leading t-shirt manufacturer, bag
              manufacturer, and custom cap manufacturer with a rapidly expanding presence across India and
              internationally. Our goal is to be the ultimate one-stop shop for all customized product manufacturing
              and printing needs, offering unmatched quality and service.
            </p>
          </div>

          {/* Explore Our Capabilities */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Explore Our Capabilities
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {CAPABILITIES.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.link}
                  className={`group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cat.color}`}
                >
                  <h4 className={`text-lg font-bold mb-4 ${cat.titleColor}`}>{cat.title}</h4>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-current opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customize & Promote ──────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Customize &amp; Promote with The Cross Wild
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At The Cross Wild, we cover a wide spectrum of industries and events with products that fulfill
              functionality yet are stylish. Whether you are a business needing branded corporate T-shirts, a company
              looking for wholesale tote bags or an event organizer sourcing custom bags and personalized hats — The
              Cross Wild is sure to cater for all your needs. Over the years, our dedication to customer satisfaction
              has driven us to expand our portfolio. In addition to t-shirt printing and bag manufacturing, we now
              specialize in custom caps, mug printing, sweater manufacturing, and more. Leveraging state-of-the-art
              technologies, we deliver high-quality personalized and promotional products at competitive prices. Our
              designs are tailored to meet the corporate or individual needs of clients with attention to detail as
              well as affordability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Choose ──────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose the Cross Wild?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {WHY_CHOOSE.map((item) => (
              <div key={item.num} className="relative bg-theme-bg-card rounded-2xl p-8 shadow-sm border border-theme-border hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} items-center justify-center text-white font-black text-lg mb-5`}>
                  {item.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get the Best Result + Product Images ────────── */}
      <section className="py-16 md:py-20 bg-theme-bg-soft">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get the Best Result for Your Corporate &amp; Promotional Needs
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Unbeatable quality is what you will enjoy with The Cross Wild. Whether you want event t-shirts with your
              company's logo and message printed on them or eco-friendly caps and stylish custom backpacks that will
              make everyone smile in admiration, we have something for almost any need and at reasonable prices.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRODUCT_HIGHLIGHTS.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-black tracking-widest uppercase drop-shadow-lg">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
