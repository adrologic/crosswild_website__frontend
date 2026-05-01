import Image from 'next/image';
import Link from 'next/link';

interface ServiceProductCardProps {
  name: string;
  image: string;
  description: string;
  features?: string[];
  sizes?: string;
}

const WA_ICON = (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ServiceProductCard({
  name,
  image,
  description,
  features,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: ServiceProductCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-[220px] w-full bg-gray-100 dark:bg-gray-700 flex-shrink-0">
        <Image src={image} alt={name} fill className="object-cover" sizes={sizes} />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
        <div className="flex-1">
          <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-3 whitespace-pre-line">
            {description}
          </p>
          {features && features.length > 0 && (
            <ul className="mb-3 space-y-1">
              {features.map((f) => (
                <li key={f} className="text-[12px] text-gray-500 dark:text-gray-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-2 mt-3">
          <Link
            href="/contact-us"
            className="flex-1 text-center bg-primary text-white text-[13px] font-semibold py-2 px-3 rounded hover:bg-primary/90 transition-colors"
          >
            Add to Enquiry
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=919529626262"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[13px] font-semibold py-2 px-3 rounded transition-colors"
          >
            {WA_ICON}
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
