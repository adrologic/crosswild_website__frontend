"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Mail, MessageCircle, Minus, Phone, Plus, ShoppingBag } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { openCart } from '@/store/slices/uiSlice';
import { getSiteSettings } from '@/lib/cms';
import type { Product } from '@/lib/api';

// Used until the CMS settings land (and if the request fails).
const FALLBACK_PHONE = '+919529626262';
const FALLBACK_EMAIL = 'orders@thecrosswild.com';

const toDialable = (phone: string) => phone.replace(/[^+\d]/g, '');
const toWhatsApp = (phone: string) => phone.replace(/[^\d]/g, '');

export default function EnquiryActions({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const minQty = Math.max(1, product.minOrderQuantity || 1);

  // Held as text, not a number. With <input type="number"> the browser reports
  // an empty string for anything it can't parse — "1,000", "1 000", a half-typed
  // value — and Number('') is 0, which a clamp then silently turns into the
  // minimum. A buyer asking for 1,000 pieces would have sent an enquiry for 1.
  const [quantityText, setQuantityText] = useState(String(minQty));
  const [added, setAdded] = useState(false);
  const [phone, setPhone] = useState(FALLBACK_PHONE);
  const [whatsappNumber, setWhatsappNumber] = useState(FALLBACK_PHONE);
  const [email, setEmail] = useState(FALLBACK_EMAIL);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The component isn't remounted when navigating between two product pages,
  // so the floor has to be re-applied when the product changes.
  useEffect(() => {
    setQuantityText(String(minQty));
  }, [product.id, minQty]);

  useEffect(() => {
    let cancelled = false;
    getSiteSettings()
      .then((settings) => {
        if (cancelled || !settings?.contact) return;
        if (settings.contact.primaryPhone) setPhone(settings.contact.primaryPhone);
        if (settings.contact.whatsappNumber || settings.contact.primaryPhone) {
          setWhatsappNumber(settings.contact.whatsappNumber || settings.contact.primaryPhone);
        }
        if (settings.contact.primaryEmail) setEmail(settings.contact.primaryEmail);
      })
      .catch(() => {
        /* keep the fallbacks */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  // What the buttons actually send. An empty or half-typed box falls back to the
  // minimum rather than to zero.
  const parsed = parseInt(quantityText, 10);
  const quantity = Number.isFinite(parsed) && parsed >= minQty ? parsed : minQty;

  const title = product.title || product.name;
  const codeLine = product.sku ? `Product code: ${product.sku}\n` : '';

  const enquiryText =
    `Hi! I'm interested in this product:\n\n` +
    `*${title}*\n` +
    codeLine +
    `Quantity: ${quantity} pcs\n\n` +
    `Please share pricing and availability.`;

  const whatsappLink = `https://wa.me/${toWhatsApp(whatsappNumber)}?text=${encodeURIComponent(enquiryText)}`;

  const emailLink =
    `mailto:${email}` +
    `?subject=${encodeURIComponent(`Enquiry: ${title}${product.sku ? ` (${product.sku})` : ''}`)}` +
    `&body=${encodeURIComponent(
      `Hi The CrossWild Team,\n\nI'd like a quote for:\n\n` +
      `${title}\n${product.sku ? `Product code: ${product.sku}\n` : ''}Quantity: ${quantity} pcs\n\n` +
      `Please share pricing, branding options and delivery timelines.\n\nThank you!`
    )}`;

  const setQuantity = (value: number) => setQuantityText(String(Math.max(minQty, Math.trunc(value))));

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        sku: product.sku,
        name: title,
        price: product.price || 0,
        image: product.image,
        quantity,
        minOrderQuantity: minQty,
      })
    );
    setAdded(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setAdded(false), 4000);
  };

  const actionClass =
    'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors';

  return (
    <div className="space-y-4">
      {/* ─── Quantity ─── */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center overflow-hidden rounded-xl border border-theme-border bg-theme-bg-card">
          <button
            type="button"
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= minQty}
            aria-label="Decrease quantity"
            className="px-3.5 py-3 text-theme-text transition-colors hover:bg-theme-bg-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          {/* type="text" + inputMode="numeric": a number input blanks anything it
              can't parse, which loses a pasted "1,000" entirely. Digits are
              stripped out of the pasted text instead, so 1,000 becomes 1000. */}
          <input
            type="text"
            inputMode="numeric"
            value={quantityText}
            aria-label="Quantity"
            onChange={(e) => setQuantityText(e.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => setQuantityText(String(quantity))}
            className="w-20 border-x border-theme-border bg-transparent py-3 text-center text-sm font-semibold text-theme-text outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="px-3.5 py-3 text-theme-text transition-colors hover:bg-theme-bg-soft"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {minQty > 1 && (
          <p className="text-sm text-theme-text-secondary">
            Minimum <span className="font-semibold text-theme-text">{minQty} pieces</span>
          </p>
        )}
      </div>

      {/* ─── Add to enquiry ─── */}
      <button
        type="button"
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
      >
        <ShoppingBag className="h-5 w-5" />
        Add to enquiry
      </button>

      {/* ─── WhatsApp / Call / Email ─── */}
      <div className="grid grid-cols-3 gap-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionClass} bg-[#25D366] text-white hover:bg-[#1eba59]`}
        >
          <MessageCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          WhatsApp
        </a>

        {/* A tel: link does nothing on a desktop browser, so desktop shows the
            number itself and only the phone gets a dialable link. */}
        <a
          href={`tel:${toDialable(phone)}`}
          className={`${actionClass} border border-theme-border bg-theme-bg-card text-theme-text hover:border-primary hover:text-primary md:hidden`}
        >
          <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          Call
        </a>
        <div
          className={`${actionClass} hidden border border-theme-border bg-theme-bg-card text-theme-text md:flex`}
        >
          <Phone className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
          <span className="select-all whitespace-nowrap">{phone}</span>
        </div>

        <a
          href={emailLink}
          className={`${actionClass} border border-theme-border bg-theme-bg-card text-theme-text hover:border-primary hover:text-primary`}
        >
          <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          Email
        </a>
      </div>

      <p className="text-xs leading-relaxed text-theme-text-secondary">
        Pricing depends on quantity and branding.{' '}
        <Link href="/contact-us" className="font-semibold text-primary hover:underline">
          Talk to our team
        </Link>{' '}
        for a quote tailored to your order.
      </p>

      {/* ─── Confirmation toast ─── */}
      {added && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[1100] flex -translate-x-1/2 items-center gap-3 rounded-xl border border-theme-border bg-theme-bg-card px-4 py-3 shadow-2xl"
        >
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
            <Check className="h-4 w-4" />
          </span>
          <span className="text-sm text-theme-text">
            Added <span className="font-semibold">{quantity} pcs</span> to your enquiry list
          </span>
          <button
            type="button"
            onClick={() => {
              setAdded(false);
              dispatch(openCart());
            }}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View list
          </button>
        </div>
      )}
    </div>
  );
}
