"use client";

import React from 'react';
import SafeImage from '@/components/Common/SafeImage';
import Link from 'next/link';
import { X, ShoppingCart, Plus, Minus, Trash2, MessageCircle, Mail } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectCartItems, selectTotalItems, selectTotalPrice,
  updateQuantity, removeFromCart,
} from '@/store/slices/cartSlice';
import { selectIsCartOpen, closeCart } from '@/store/slices/uiSlice';

const WHATSAPP_NUMBER = '919529626262';
const EMAIL = 'orders@thecrosswild.com';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const cart = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectTotalItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const onClose = () => dispatch(closeCart());

  const getWhatsAppOrderLink = () => {
    const itemsList = cart.map(item =>
      `• ${item.name}${item.size ? ` (Size: ${item.size})` : ''}${item.color ? ` (Color: ${item.color})` : ''} ×${item.quantity}`
    ).join('\n');
    const message = encodeURIComponent(
      `Hi! I'd like to place an order:\n\n*Order Summary:*\n${itemsList}\n\n*Total: ₹${totalPrice.toLocaleString()}*\n\nPlease confirm availability and delivery details. Thank you!`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  const getEmailOrderLink = () => {
    const subject = encodeURIComponent('New Order Request - The CrossWild');
    const itemsList = cart.map(item =>
      `- ${item.name}${item.size ? ` (Size: ${item.size})` : ''}${item.color ? ` (Color: ${item.color})` : ''} ×${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    const body = encodeURIComponent(
      `Hi The CrossWild Team,\n\nI'd like to place the following order:\n\n${itemsList}\n\nSubtotal: ₹${totalPrice.toLocaleString()}\n\nPlease confirm availability, pricing, and delivery details.\n\nThank you!`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-theme-bg shadow-2xl z-[1000] flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-theme-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-theme-text">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-normal text-theme-text-secondary">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-theme-bg-soft transition-colors text-theme-text-secondary hover:text-theme-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingCart className="w-16 h-16 text-theme-text-muted" />
              <h3 className="text-lg font-semibold text-theme-text">Your cart is empty</h3>
              <p className="text-theme-text-secondary text-sm">Add some products to get started!</p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-3 p-3 bg-theme-bg-soft rounded-xl border border-theme-border"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-theme-bg-card">
                    <SafeImage src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-theme-text line-clamp-2 mb-1">{item.name}</h3>

                    {(item.size || item.color) && (
                      <div className="flex gap-2 text-xs text-theme-text-muted mb-1">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    )}

                    <div className="text-primary font-bold text-sm mb-2">₹{item.price.toLocaleString()}</div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-theme-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1 hover:bg-theme-bg-card transition-colors text-theme-text"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold text-theme-text border-x border-theme-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1 hover:bg-theme-bg-card transition-colors text-theme-text"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-theme-border px-5 py-4 space-y-4 bg-theme-bg">
            <div className="flex justify-between items-center">
              <span className="text-theme-text-secondary font-medium">Subtotal</span>
              <span className="text-xl font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
            </div>

            <div>
              <p className="text-xs text-theme-text-muted text-center mb-2 font-medium uppercase tracking-wide">
                Place Order via
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href={getEmailOrderLink()}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-theme-border" />
              <span className="text-xs text-theme-text-muted">or</span>
              <div className="flex-1 border-t border-theme-border" />
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-3 bg-theme-text text-theme-bg text-center font-semibold rounded-xl hover:opacity-90 transition-all duration-200 active:scale-95"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={onClose}
                className="block w-full py-2.5 text-theme-text-secondary text-sm text-center font-medium hover:text-primary transition-colors"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
