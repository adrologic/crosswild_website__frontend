// Server component on purpose.
//
// This footer used to fetch its menus in a useEffect, so every page on the site
// shipped three empty column headings and zero links in its HTML — including
// the "Blog" link that is a crawl path into the article set. Awaiting the CMS
// here puts the real links in the server-rendered markup instead. Nothing in
// the footer is interactive, so there is nothing to keep on the client.

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  getSiteSettings,
  getMenu,
  type Link as CmsLink,
  type BranchOffice,
} from '@/lib/cms';

// Pre-rebrand logo still stored in Site Settings; treated as "no custom logo".
const LEGACY_LOGO = '/images/logo/logo-crosswile.jpg';

/**
 * Rendered when the CMS menus are unavailable, so the footer never degrades to
 * bare headings. Mirrors the menus configured in the admin panel.
 */
const FALLBACK_QUICK_LINKS: CmsLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Process', href: '/our_process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Our Gallery', href: '/image-gallery' },
  { label: 'Contact Us', href: '/contact-us' },
];

const FALLBACK_SERVICES: CmsLink[] = [
  { label: 'T-Shirt Manufacturing', href: '/product/customize-promotional-t-shirt-manufacturer-in-Jaipur' },
  { label: 'Bag Manufacturing', href: '/product/school-laptop-bag-manufacturer-in-Jaipur' },
  { label: 'Cap Printing', href: '/product/cap-printing-manufacturer-in-jaipur' },
  { label: 'Staff Uniforms', href: '/product/staff-uniform-manufacturer' },
  { label: 'All Products', href: '/products' },
];

/**
 * Branch offices shown when Site Settings has none. The other FALLBACK_* lists
 * above exist so the footer never renders a bare heading; this one was missing,
 * so an unreachable backend emptied the offices row entirely.
 * Addresses and numbers match DEFAULT_OFFICES in components/Contact/index.tsx.
 */
const FALLBACK_BRANCH_OFFICES: BranchOffice[] = [
  { city: 'Jaipur',  phone: '+91-9571815050', address: 'D-8, Near World Trade Park, Malviya Nagar, Jaipur, Rajasthan', hours: 'Mon\u2013Sat: 9:00 AM \u2013 6:00 PM', email: '', order: 0 },
  { city: 'Jodhpur', phone: '+91-9571286262', address: 'B-13, Shastri Nagar, Near Shastri Circle, Jodhpur', hours: 'Mon\u2013Sat: 9:00 AM \u2013 6:00 PM', email: '', order: 1 },
  { city: 'Indore',  phone: '+91-9649715050', address: '401, 4th Floor, Near Sky Corporate Tower, Scheme No 78, AB Road, Vijay Nagar, Indore, MP', hours: 'Mon\u2013Sat: 9:00 AM \u2013 6:00 PM', email: '', order: 2 },
  { city: 'Udaipur', phone: '+91-9549066262', address: '45, Moti Magri Scheme, Zinc Park, Udaipur, Rajasthan 313001', hours: 'Mon\u2013Sat: 9:00 AM \u2013 6:00 PM', email: '', order: 3 },
];

const SOCIAL_ICONS: Record<string, React.ReactElement> = {
  facebook: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
  ),
  twitter: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  instagram: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
  ),
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  ),
  pinterest: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-label="Pinterest"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452z" /></svg>
  ),
};

export default async function CrosswildFooter() {
  const [settings, servicesMenu, quickLinks, bottomLinks] = await Promise.all([
    getSiteSettings(),
    getMenu('footer-services'),
    getMenu('footer-quick-links'),
    getMenu('footer-bottom'),
  ]);

  // Sensible defaults so the footer renders even if the backend is unavailable
  const footer = settings?.footer;
  const contact = settings?.contact;
  const social = settings?.social;

  // The footer sits on a dark surface in both themes, so it always takes the
  // dark-background logo. A custom upload in Site Settings still wins; the
  // legacy pre-rebrand default counts as unset. Uploads keep the invert filter
  // (they're assumed to be dark-on-light artwork); our own logo does not.
  const cmsLogo = footer?.logo && footer.logo !== LEGACY_LOGO ? footer.logo : null;
  // Not the header's dark logo: that one's peaks are black so they read against
  // the maroon navbar, and black on this near-black footer would disappear.
  // This copy is the same mark with white peaks.
  const logoSrc = cmsLogo || '/images/logo/footer-logo.png';

  const year = new Date().getFullYear();
  const services = servicesMenu?.items?.length
    ? servicesMenu.items
    : footer?.servicesLinks?.length
      ? footer.servicesLinks
      : FALLBACK_SERVICES;
  const quickFromCms = quickLinks?.items?.length
    ? quickLinks.items
    : footer?.quickLinks?.length
      ? footer.quickLinks
      : FALLBACK_QUICK_LINKS;
  // /blog is the only crawl path from the site chrome into the articles, so it
  // is guaranteed here rather than left to whatever the CMS menu happens to say.
  const quick = quickFromCms.some((l) => l.href === '/blog')
    ? quickFromCms
    : [...quickFromCms, { label: 'Blog', href: '/blog' }];
  const bottom = bottomLinks?.items || footer?.bottomLinks || [];

  // Offices come from Site Settings; fall back so the row is never empty, and
  // sort by the admin-set order rather than insertion order.
  const offices = (footer?.branchOffices?.length ? footer.branchOffices : FALLBACK_BRANCH_OFFICES)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Links sit on a near-black surface, where the brand crimson (#9a0822) is all
  // but invisible. primary-300 is the same hue lifted to read against it.
  const linkClass =
    'text-gray-400 dark:text-[#8C7F6E] hover:text-primary-300 transition-colors duration-200';

  return (
    <footer className="bg-[#0f1a2e] dark:bg-[#140407] text-gray-300 dark:text-[#C8B99A]">
      {/* Hairline that picks the brand colour up off the page above */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />

      <div className="w-full px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 xl:col-span-4">
            <Image
              src={logoSrc}
              alt="The CrossWild"
              width={459}
              height={320}
              className={`h-11 w-auto mb-5 ${cmsLogo ? 'brightness-0 invert' : ''}`}
            />
            <p className="text-gray-400 dark:text-[#8C7F6E] leading-relaxed max-w-sm">
              {footer?.companyDescription || "India's leading manufacturers & printers of custom T-Shirts, Bags, Caps & Uniforms."}
            </p>

            {social && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-[#6F6555] mb-3">Follow Us</p>
                <div className="flex flex-wrap gap-2.5">
                  {(['facebook', 'twitter', 'instagram', 'youtube', 'pinterest', 'linkedin'] as const).map((k) => {
                    const url = social[k];
                    if (!url) return null;
                    return (
                      <a
                        key={k}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={k}
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors duration-200"
                      >
                        {SOCIAL_ICONS[k]}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Services */}
          <div className="xl:col-span-2">
            <h4 className="text-white font-semibold mb-1">Services</h4>
            <span className="block w-8 h-0.5 bg-primary rounded-full mb-4" />
            <ul className="space-y-2.5 text-sm">
              {services.map((s, i) => (
                <li key={i}><Link href={s.href || '#'} className={linkClass}>{s.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="xl:col-span-2">
            <h4 className="text-white font-semibold mb-1">Quick Links</h4>
            <span className="block w-8 h-0.5 bg-primary rounded-full mb-4" />
            <ul className="space-y-2.5 text-sm">
              {quick.map((l, i) => (
                <li key={i}><Link href={l.href || '#'} className={linkClass}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="sm:col-span-2 xl:col-span-4">
            <h4 className="text-white font-semibold mb-1">Get in Touch</h4>
            <span className="block w-8 h-0.5 bg-primary rounded-full mb-4" />
            <div className="space-y-3 text-sm">
              {contact?.primaryPhone && (
                <a href={`tel:${contact.primaryPhone}`} className="group flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="text-gray-300 dark:text-[#C8B99A] group-hover:text-primary-300 transition-colors">{contact.primaryPhone}</span>
                </a>
              )}
              {contact?.primaryEmail && (
                <a href={`mailto:${contact.primaryEmail}`} className="group flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="text-gray-300 dark:text-[#C8B99A] group-hover:text-primary-300 transition-colors break-all">{contact.primaryEmail}</span>
                </a>
              )}
              {contact?.address?.street && (
                <div className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-primary-300 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="text-gray-400 dark:text-[#8C7F6E] leading-relaxed pt-1.5">
                    {contact.address.street}
                    {contact.address.city && `, ${contact.address.city}`}
                    {contact.address.state && `, ${contact.address.state}`}
                    {contact.address.postalCode && ` ${contact.address.postalCode}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Offices — their own row, so a fourth city widens the grid instead of
            stretching one cramped column further down the page. */}
        {offices.length > 0 && (
          <div className="mt-14 pt-10 border-t border-white/10 dark:border-[#2A2018]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {offices.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-primary-400/40 hover:bg-white/[0.06] transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-7 h-7 rounded-lg bg-primary/25 text-primary-300 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <h5 className="text-white font-semibold">{b.city}</h5>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    {b.phone && (
                      <a href={`tel:${b.phone}`} className="flex items-center gap-2.5 text-gray-300 dark:text-[#C8B99A] hover:text-primary-300 transition-colors">
                        <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                        <span>{b.phone}</span>
                      </a>
                    )}
                    {b.address && (
                      <p className="flex items-start gap-2.5 text-gray-400 dark:text-[#8C7F6E] leading-relaxed">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-500" />
                        <span>{b.address}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 dark:border-[#2A2018]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-[#8C7F6E]">
            <p>&copy; {year} {footer?.copyrightText || 'The CrossWild. All rights reserved.'}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {bottom.map((l, i) => (
                <Link key={i} href={l.href || '#'} className="hover:text-primary-300 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
