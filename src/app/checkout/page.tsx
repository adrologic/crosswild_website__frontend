"use client";

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectCartItems, selectTotalPrice, clearCart } from '@/store/slices/cartSlice';
import SafeImage from '@/components/Common/SafeImage';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { ordersAPI } from '@/lib/api';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const getTotalPrice = () => totalPrice;
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [formData, setFormData] = useState({
    // Contact Info
    fullName: '',
    email: '',
    phone: '',

    // Shipping Address
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Order Notes
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // Submit order to API
      const orderData = {
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
          country: 'India',
        },
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total: getTotalPrice(),
        paymentMethod: 'COD', // Cash on Delivery
        notes: formData.notes,
      };

      const order = await ordersAPI.create(orderData);
      setOrderNumber(order.orderNumber);

      // Also send via WhatsApp or Email as notification
      if (contactMethod === 'whatsapp') {
        // Create WhatsApp message
        const message = `🛒 *New Order #${order.orderNumber}*\n\n` +
          `👤 ${formData.fullName}\n` +
          `📧 ${formData.email}\n` +
          `📱 ${formData.phone}\n\n` +
          `📍 *Shipping Address:*\n${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}\n\n` +
          `🛍️ *Order Items:*\n` +
          cart.map((item, i) =>
            `${i + 1}. ${item.name}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString()}\n   ${item.size ? `Size: ${item.size}` : ''} ${item.color ? `Color: ${item.color}` : ''}`
          ).join('\n\n') +
          `\n\n💰 *Total Amount: ₹${getTotalPrice().toLocaleString()}*` +
          (formData.notes ? `\n\n📝 Notes: ${formData.notes}` : '');

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '+919529626262';

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
      } else {
        // Create Email body
        const emailBody = `New Order #${order.orderNumber}\n\n` +
          `From: ${formData.fullName}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone}\n\n` +
          `Shipping Address:\n${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}\n\n` +
          `Order Items:\n` +
          cart.map((item, i) =>
            `${i + 1}. ${item.name}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString()}\n   ${item.size ? `Size: ${item.size}` : ''} ${item.color ? `Color: ${item.color}` : ''}`
          ).join('\n\n') +
          `\n\nTotal Amount: ₹${getTotalPrice().toLocaleString()}` +
          (formData.notes ? `\n\nNotes: ${formData.notes}` : '');

        const emailSubject = `New Order #${order.orderNumber} from ${formData.fullName}`;
        const mailtoLink = `mailto:info@thecrosswild.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Open default email client
        window.location.href = mailtoLink;
      }

      // Move to success step
      setStep(3);

      // Clear cart after a delay
      setTimeout(() => {
        dispatch(clearCart());
      }, 2000);
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some products before proceeding to checkout
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Success Step
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
          {orderNumber && (
            <p className="text-lg font-semibold text-primary mb-3">
              Order Number: #{orderNumber}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your order has been received and saved in our system. We've also sent the details via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}. Our team will contact you shortly to confirm your order.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Back to Home
            </Link>
            <Link
              href="/our_process"
              className="block w-full py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
            >
              View Our Process
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Information</span>
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Review</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{6}"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700"
                      placeholder="Any special instructions or customization details..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Continue to Review
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Review Your Order</h2>

                  {/* Review Information */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="font-semibold mb-2">Contact Information</h3>
                      <p className="text-gray-600 dark:text-gray-400">{formData.fullName}</p>
                      <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                      <p className="text-gray-600 dark:text-gray-400">{formData.phone}</p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">{formData.address}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {formData.city}, {formData.state} - {formData.pincode}
                      </p>
                    </div>

                    {formData.notes && (
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <h3 className="font-semibold mb-2">Order Notes</h3>
                        <p className="text-gray-600 dark:text-gray-400">{formData.notes}</p>
                      </div>
                    )}

                    {/* Contact Method Selection */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                      <h3 className="font-semibold mb-3">How would you like to send your order?</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setContactMethod('whatsapp')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            contactMethod === 'whatsapp'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                          }`}
                        >
                          <MessageCircle className={`w-8 h-8 mx-auto mb-2 ${
                            contactMethod === 'whatsapp' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
                          }`} />
                          <div className="font-semibold">WhatsApp</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Send order via WhatsApp
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            contactMethod === 'email'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                          }`}
                        >
                          <Mail className={`w-8 h-8 mx-auto mb-2 ${
                            contactMethod === 'email' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'
                          }`} />
                          <div className="font-semibold">Email</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Send order via Email
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
                    >
                      Send Order via {contactMethod === 'whatsapp' ? 'WhatsApp' : 'Email'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-primary font-bold text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Calculated later</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  <Truck className="w-4 h-4 inline mr-1" />
                  Shipping charges will be calculated based on your location and order quantity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
