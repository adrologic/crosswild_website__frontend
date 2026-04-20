import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-gray-900 dark:via-gray-900 dark:to-primary/10 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4 animate-bounce">
            404
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full mb-6"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for seems to have wandered off.
          It might have been moved or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all transform hover:scale-105"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/about-us"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/our_process"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Our Process
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Need help? <Link href="/contact-us" className="text-primary hover:underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}
