"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        {isDev && (
          <div className="mb-6 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
              {error.name}: {error.message}
            </p>
            {error.stack && (
              <pre className="text-xs text-red-600 dark:text-red-300 overflow-auto whitespace-pre-wrap max-h-48">
                {error.stack}
              </pre>
            )}
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
