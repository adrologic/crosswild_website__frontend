// Route-level loading UI (App Router).
//
// Shown immediately when navigating to any route segment whose server component
// is still working — e.g. landing pages that `await getPageContent()` from the
// backend (~0.7s). Without this, Next.js keeps the previous page on screen until
// the new route's data is ready, so a click feels frozen for 1-2s. With it, the
// transition is instant: the persistent header/footer stay put and this shows in
// the content area while the page streams in.
//
// Purely visual on purpose. Next streams this fallback into the initial HTML
// ahead of the real content, so any text here ends up in what a crawler reads —
// a stray "Loading…" used to leak onto every page. The spinner carries its
// meaning through ARIA instead, which assistive tech announces and indexers
// ignore.
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-24">
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading content"
        className="flex flex-col items-center gap-4"
      >
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}
