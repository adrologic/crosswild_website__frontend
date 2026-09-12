"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import MountainMark from "./MountainMark";

const TEXT_SRC = {
  white: "/images/logo/text-white.webp",
  black: "/images/logo/text-black.webp",
} as const;

type Phase = "loading" | "splitting" | "done";

// Renders in the "loading" phase on both server and client by default — no
// client-only gate deciding whether to show it. A gate like that (e.g. a
// useEffect flipping visibility after checking sessionStorage) means the
// server-rendered page paints first and the splash only appears once React
// hydrates and that effect runs, which is exactly the "real homepage flashes
// for a moment before the loader appears" bug. Starting visible by default
// costs nothing: it's covering the page it's stacked on top of regardless,
// and this component only mounts on a genuine full page load (Next.js keeps
// the root layout mounted across client-side Link navigation), so it shows
// on first visit and on every refresh, never on an internal link click —
// exactly the intended split with PageTransitionOverlay.
export default function InitialSplash() {
  const { resolvedTheme } = useTheme();
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Progress eases up to 92% on its own — a believable "still working" read —
  // then completes for real once the page has actually finished loading, or
  // after a safety cap so one slow resource can never strand someone here.
  useEffect(() => {
    if (phase !== "loading") return;

    if (reducedMotion) {
      setProgress(100);
      const t = setTimeout(() => setPhase("splitting"), 250);
      return () => clearTimeout(t);
    }

    let raf = 0;
    const start = performance.now();
    const RAMP_MS = 1400;
    const tick = (now: number) => {
      const t = Math.min((now - start) / RAMP_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(92, eased * 92));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setTimeout(() => setPhase("splitting"), 350);
    };

    if (document.readyState === "complete") {
      const t = setTimeout(finish, 700);
      return () => { cancelAnimationFrame(raf); clearTimeout(t); };
    }
    window.addEventListener("load", finish);
    const maxWait = setTimeout(finish, 4000);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
      clearTimeout(maxWait);
    };
  }, [phase, reducedMotion]);

  // Hold the split just long enough to read, then unmount for good.
  useEffect(() => {
    if (phase !== "splitting") return;
    const t = setTimeout(() => setPhase("done"), reducedMotion ? 350 : 850);
    return () => clearTimeout(t);
  }, [phase, reducedMotion]);

  if (phase === "done") return null;

  // Defaults to the white mark on the dark background — the site's own
  // default theme (`defaultTheme="dark"` in providers.tsx) — until the real
  // resolved theme is available, so there's nothing to correct visibly for
  // the common case.
  const variant = resolvedTheme === "light" ? "black" : "white";
  const splitting = phase === "splitting";

  const pieceMotion = reducedMotion
    ? "transition-opacity duration-300"
    : "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="The CrossWild is loading"
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        splitting ? "opacity-0" : "opacity-100"
      } ${
        variant === "white"
          ? "bg-[radial-gradient(ellipse_at_center,_#3e030e_0%,_#1a0509_65%,_#0d0203_100%)]"
          : "bg-[radial-gradient(ellipse_at_center,_#fdf2f4_0%,_#e9f1fd_100%)]"
      }`}
    >
      <div className="flex flex-col items-center">
        <MountainMark
          variant={variant}
          progress={progress}
          glow
          className={`w-24 sm:w-32 md:w-36 ${pieceMotion} ${
            splitting
              ? `opacity-0 ${reducedMotion ? "" : "translate-x-[60vw] sm:translate-x-[45vw]"}`
              : "opacity-100 translate-x-0"
          }`}
        />
        <div
          className={`relative w-40 sm:w-52 md:w-60 mt-3 ${pieceMotion} ${
            splitting
              ? `opacity-0 ${reducedMotion ? "" : "-translate-x-[60vw] sm:-translate-x-[45vw]"}`
              : "opacity-100 translate-x-0"
          }`}
          style={{ aspectRatio: "459/131" }}
        >
          <Image
            src={TEXT_SRC[variant]}
            alt="The CrossWild — Crossing Limits, Creating Wild."
            fill
            sizes="240px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
