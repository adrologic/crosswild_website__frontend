import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const API_URL = (process.env.BACKEND_URL || 'https://crosswild-backend-p5l3.onrender.com') + '/api';

interface CityCard {
  city: string;
  slug: string;
  branchAddress: string;
  image: string;
  branchPhone: string;
}

// Base data — always shown; admin can override any field via the Locations admin panel
const BASE_CITIES: CityCard[] = [
  {
    city: 'Jaipur',
    slug: 'tshirt-manufacturer-in-jaipur',
    branchAddress: 'D-8, Near World Trade Park, D-Block, Malviya Nagar, Jaipur, Rajasthan 302017',
    image: '/images/city/jaipur.jpg',
    branchPhone: '+91-9571286262',
  },
  {
    city: 'Indore',
    slug: 'tshirt-manufacturer-in-indore',
    branchAddress: '401, 4th Floor, Near Sky Corporate Tower, Scheme No 78, AB Road, Vijay Nagar, Indore, Madhya Pradesh 452010',
    image: '/images/city/indore.jpg',
    branchPhone: '+91-9649715050',
  },
  {
    city: 'Jodhpur',
    slug: 'tshirt-manufacturer-in-jodhpur',
    branchAddress: 'B-13, Shastri Nagar, Near Shastri Circle, Jodhpur, Rajasthan 342003',
    image: '/images/city/jodhpur.jpg',
    branchPhone: '+91-9571286262',
  },
  {
    city: 'Udaipur',
    slug: 'tshirt-manufacturer-wholesaler-in-udaipur',
    branchAddress: '45, Moti Magri Scheme, Zinc Park, Udaipur, Rajasthan 313001',
    image: '/images/city/udaipur.jpg',
    branchPhone: '+91-9571286262',
  },
];

// City → default local image (used when DB has no image set)
const CITY_IMAGE_DEFAULTS: Record<string, string> = {
  Jaipur:  '/images/city/jaipur.jpg',
  Indore:  '/images/city/indore.jpg',
  Jodhpur: '/images/city/jodhpur.jpg',
  Udaipur: '/images/city/udaipur.jpg',
};

async function getCityCards(): Promise<CityCard[]> {
  // Start from static base so all 4 cities always appear
  const cityMap = new Map<string, CityCard>(BASE_CITIES.map((c) => [c.city, { ...c }]));

  try {
    const res = await fetch(`${API_URL}/locations?active=true`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.locations?.length) {
        const seen = new Set<string>();
        for (const loc of data.locations) {
          if (!loc.city) continue;
          const existing = cityMap.get(loc.city);
          if (!seen.has(loc.city)) {
            seen.add(loc.city);
            // Merge: admin DB data takes priority; fall back to static defaults
            cityMap.set(loc.city, {
              city: loc.city,
              slug: loc.slug || existing?.slug || '',
              branchAddress: loc.branchAddress || existing?.branchAddress || '',
              image: loc.image || CITY_IMAGE_DEFAULTS[loc.city] || existing?.image || '',
              branchPhone: loc.branchPhone || existing?.branchPhone || '',
            });
          }
        }
      }
    }
  } catch {}

  return Array.from(cityMap.values()).filter((c) => c.branchAddress);
}

export default async function OurNetworkSection() {
  const cities = await getCityCards();
  if (!cities.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Cross Wild',
    url: 'https://www.thecrosswild.com',
    branch: cities.map((c) => ({
      '@type': 'LocalBusiness',
      name: `The Cross Wild - ${c.city}`,
      ...(c.branchPhone ? { telephone: c.branchPhone } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.branchAddress,
        addressLocality: c.city,
        addressCountry: 'IN',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-[#efefef] dark:bg-[#111827] py-10">
        <div className="w-full px-6 lg:px-12">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Network
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.city}
                href={`/${city.slug}`}
                className="bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl p-5 block hover:shadow-md transition-shadow duration-200"
              >
                {/* Circular city image */}
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden mb-4 border border-gray-200 dark:border-gray-600 flex-shrink-0">
                  <Image
                    src={city.image}
                    alt={`${city.city}`}
                    width={72}
                    height={72}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* City name */}
                <p className="text-[17px] font-bold text-gray-900 dark:text-white mb-3">
                  {city.city}
                </p>

                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-[15px] h-[15px] text-gray-500 dark:text-gray-400 flex-shrink-0 mt-[2px]" />
                  <p className="text-[13px] leading-[1.55] text-gray-600 dark:text-gray-400">
                    {city.branchAddress}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
