"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  getSiteSettings,
  getMenu,
  subscribeEmail,
  type SiteSettings,
  type Menu,
} from '@/lib/cms';

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

export default function CrosswildFooter() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [servicesMenu, setServicesMenu] = useState<Menu | null>(null);
  const [quickLinks, setQuickLinks] = useState<Menu | null>(null);
  const [bottomLinks, setBottomLinks] = useState<Menu | null>(null);

  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      getSiteSettings(),
      getMenu('footer-services'),
      getMenu('footer-quick-links'),
      getMenu('footer-bottom'),
    ]).then(([s, services, quick, bottom]) => {
      setSettings(s);
      setServicesMenu(services);
      setQuickLinks(quick);
      setBottomLinks(bottom);
    });
  }, []);

  // Sensible defaults so the footer renders before/if backend is unavailable
  const footer = settings?.footer;
  const contact = settings?.contact;
  const social = settings?.social;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubStatus(null);
    const result = await subscribeEmail(email, 'footer');
    setSubStatus({ ok: !!result.success, msg: result.message || (result.success ? 'Subscribed!' : 'Failed') });
    if (result.success) setEmail('');
    setSubmitting(false);
  };

  const year = new Date().getFullYear();
  const services = servicesMenu?.items || footer?.servicesLinks || [];
  const quick = quickLinks?.items || footer?.quickLinks || [];
  const bottom = bottomLinks?.items || footer?.bottomLinks || [];

  return (
    <footer className="bg-[#111111] dark:bg-[#0E0B08] text-gray-300 dark:text-[#C8B99A]">
      {footer?.newsletter?.enabled !== false && (
        <div className="bg-gradient-to-r from-primary to-primary-dark py-12">
          <div className="w-full px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">{footer?.newsletter?.heading || 'Get Exclusive Deals & Updates'}</h3>
                <p className="text-white/80">{footer?.newsletter?.subheading || 'Subscribe to our newsletter for special offers and tips'}</p>
              </div>
              <form onSubmit={submit} className="w-full md:w-auto">
                <div className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footer?.newsletter?.placeholder || 'Enter your email'}
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button type="submit" disabled={submitting} className="px-6 py-3 bg-[#111111] dark:bg-[#26211A] text-white font-semibold rounded-lg hover:bg-black dark:hover:bg-[#38302A] transition-colors whitespace-nowrap disabled:opacity-60">
                    {submitting ? 'Sending…' : (footer?.newsletter?.buttonLabel || 'Subscribe')}
                  </button>
                </div>
                {subStatus && (
                  <p className={`mt-2 text-xs ${subStatus.ok ? 'text-green-100' : 'text-red-100'}`}>{subStatus.msg}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
            {footer?.logo ? (
              <Image
                src={footer.logo}
                alt="The CrossWild"
                width={150}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            ) : null}
            <p className="text-gray-400 dark:text-[#8C7F6E] mb-6 leading-relaxed">
              {footer?.companyDescription || "India's leading custom printing and merchandise company."}
            </p>

            <div className="space-y-3">
              {contact?.primaryPhone && (
                <a href={`tel:${contact.primaryPhone}`} className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>{contact.primaryPhone}</span>
                </a>
              )}
              {contact?.primaryEmail && (
                <a href={`mailto:${contact.primaryEmail}`} className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>{contact.primaryEmail}</span>
                </a>
              )}
              {contact?.address?.street && (
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <span>
                    {contact.address.street}
                    {contact.address.city && `, ${contact.address.city}`}
                    {contact.address.state && `, ${contact.address.state}`}
                    {contact.address.postalCode && ` ${contact.address.postalCode}`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((s, i) => (
                <li key={i}><Link href={s.href || '#'} className="hover:text-primary transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quick.map((l, i) => (
                <li key={i}><Link href={l.href || '#'} className="hover:text-primary transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Branch Offices */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              {contact?.primaryEmail && (
                <a href={`mailto:${contact.primaryEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{contact.primaryEmail}</span>
                </a>
              )}
              {(footer?.branchOffices || []).map((b, i) => (
                <div key={i}>
                  <p className="text-white font-semibold text-xs uppercase tracking-wide mb-1">{b.city}</p>
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors mb-1">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{b.phone}</span>
                    </a>
                  )}
                  {b.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social */}
        {social && (
          <div className="mt-12 pt-8 border-t border-gray-800 dark:border-[#2A2018]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Follow Us:</span>
                <div className="flex gap-3">
                  {(['facebook', 'twitter', 'instagram', 'youtube', 'pinterest', 'linkedin'] as const).map((k) => {
                    const url = social[k];
                    if (!url) return null;
                    return (
                      <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={k}
                        className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primary transition-colors">
                        {SOCIAL_ICONS[k]}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">We Accept:</span>
                <div className="flex gap-2">
                  {['💳', '💰', '📱'].map((icon, idx) => (
                    <div key={idx} className="w-10 h-10 bg-gray-800 dark:bg-[#26211A] rounded flex items-center justify-center text-xl">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-[#2A2018]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-[#8C7F6E]">
            <p>&copy; {year} {footer?.copyrightText || 'The CrossWild. All rights reserved.'}</p>
            <div className="flex gap-6">
              {bottom.map((l, i) => (
                <Link key={i} href={l.href || '#'} className="hover:text-primary transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
