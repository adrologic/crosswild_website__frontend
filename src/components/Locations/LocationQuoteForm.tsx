"use client";

import { useState } from "react";

// The old markup posted the form with method="get" to a mailto: action, which
// drops the subject and never includes the field values — i.e. the form did
// nothing useful. This builds a proper mailto: URL (subject + body) on submit
// instead. Markup and classes are unchanged from the original inline form.
export default function LocationQuoteForm({ city }: { city?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Enquiry from ${city || "Website"}`;
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Enquiry:\n${form.message}`;
    window.location.href = `mailto:orders@thecrosswild.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter Your Name"
        required
        className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter Your Email"
        required
        className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter Your Phone No."
        maxLength={10}
        required
        className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Enter Your Enquiry"
        rows={3}
        required
        className="w-full px-4 py-2.5 rounded-lg border border-theme-border bg-theme-bg text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />
      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors tracking-wide"
      >
        SUBMIT
      </button>
    </form>
  );
}
