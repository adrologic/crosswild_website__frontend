"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import MountainMark from "./MountainMark";

// Only show once a navigation is still pending after this long — an instant
// (already-cached) page never flashes the overlay at all.
const SHOW_DELAY_MS = 150;
// Once shown, stay up at least this long so the fill reads as an intentional
// beat rather than a flicker, even if the destination resolves right after.
const MIN_VISIBLE_MS = 450;
// Hard ceiling so a navigation that never resolves (a dropped request, a
// route that errors before committing) can't strand someone behind the
// overlay forever — better to reveal whatever's there than trap them.
const MAX_VISIBLE_MS = 8000;

/** The `<a>` the click targets, if this is a same-tab internal navigation to
 *  a different route — the one case this overlay should cover. */
function internalNavTarget(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;

  const el = e.target as HTMLElement | null;
  const anchor = el?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!anchor) return null;
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  // Same path (query-only change, or a same-page hash jump) — not a route change.
  if (url.pathname === window.location.pathname) return null;

  return url.pathname;
}

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const targetRef = useRef<string | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef(0);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Capture phase so this still fires even if a Link's own onClick calls
  // stopPropagation — we only read the event, never act on it.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = internalNavTarget(e);
      if (!target) return;
      targetRef.current = target;
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      showTimerRef.current = setTimeout(() => {
        shownAtRef.current = Date.now();
        setVisible(true);
        if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
        maxTimerRef.current = setTimeout(() => {
          targetRef.current = null;
          setVisible(false);
          shownAtRef.current = 0;
        }, MAX_VISIBLE_MS);
      }, SHOW_DELAY_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // The pathname changing is the signal the destination has actually
  // mounted — Next only updates it once the new route segment is committed.
  useEffect(() => {
    if (targetRef.current === null || pathname !== targetRef.current) return;
    targetRef.current = null;

    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (!shownAtRef.current) return; // never crossed the show threshold — nothing to hide

    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAtRef.current));
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      shownAtRef.current = 0;
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    }, remaining);
  }, [pathname]);

  useEffect(() => () => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
  }, []);

  if (!visible) return null;

  const variant = resolvedTheme === "light" ? "black" : "white";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-[900] flex items-center justify-center backdrop-blur-sm bg-black/15 dark:bg-black/40"
    >
      <MountainMark
        variant={variant}
        loop={!reducedMotion}
        progress={reducedMotion ? 55 : undefined}
        className="w-14 sm:w-16 drop-shadow-lg"
      />
    </div>
  );
}
