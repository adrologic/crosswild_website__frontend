"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { openCart } from '@/store/slices/uiSlice';
import { getSiteSettings } from '@/lib/cms';
import type { Product } from '@/lib/api';

// Used until the CMS settings land (and if the request fails).
const FALLBACK_PHONE = '+919529626262';

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
  const [whatsappNumber, setWhatsappNumber] = useState(FALLBACK_PHONE);
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
        if (settings.contact.whatsappNumber || settings.contact.primaryPhone) {
          setWhatsappNumber(settings.contact.whatsappNumber || settings.contact.primaryPhone);
        }
      })
      .catch(() => {
        /* keep the fallback */
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

  // Both actions share one shape so the pair reads as a single control row.
  const actionClass =
    'inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-theme-bg';

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

      {/* ─── Add to enquiry / WhatsApp ─── */}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAdd}
          className={`${actionClass} bg-primary text-white shadow-sm hover:bg-primary/90 focus-visible:ring-primary`}
        >
          <ShoppingBag className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
          Add to enquiry
        </button>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionClass} border border-[#25D366]/40 bg-[#25D366]/10 text-[#0f7a4a] hover:border-[#25D366]/70 hover:bg-[#25D366]/20 focus-visible:ring-[#25D366] dark:text-[#25D366]`}
        >
          <MessageCircle className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
          Chat on WhatsApp
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
