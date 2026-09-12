"use client";

import Image from "next/image";

// Cropped straight from the site's own logo files (light-logo.png /
// dark-logo.png) — just the mountain glyph, isolated from the wordmark, so
// it can animate on its own. Same asset the header/footer already ship;
// nothing here is a new mark.
const MOUNTAIN_SRC = {
  white: "/images/logo/mountain-white.webp",
  black: "/images/logo/mountain-black.webp",
} as const;

// Natural pixel ratio of the crop (459 / 178), so the wrapper's aspect-ratio
// always matches the source regardless of what width a caller renders it at.
const ASPECT = "459/178";

interface MountainMarkProps {
  /** Which logo cut to use — white mark for dark surfaces, black for light. */
  variant?: "white" | "black";
  /**
   * 0–100. Ignored when `loop` is set. Drives the fill directly (no CSS
   * transition) so a caller animating this via requestAnimationFrame gets a
   * 1:1, lag-free readout each frame.
   */
  progress?: number;
  /**
   * Indeterminate mode: loops a smooth rise-and-reset fill via CSS instead
   * of tracking real progress. Use this wherever there's nothing to
   * meaningfully report progress on (a client-side route change).
   */
  loop?: boolean;
  /** Soft brand-color glow riding the fill's leading edge. Progress mode only —
   *  skipped in loop mode, where the glow would fight the same CSS timing
   *  the fill itself already reset on. */
  glow?: boolean;
  /** Sizing classes for the wrapper, e.g. "w-28 sm:w-36". */
  className?: string;
}

export default function MountainMark({
  variant = "white",
  progress = 0,
  loop = false,
  glow = false,
  className = "",
}: MountainMarkProps) {
  const src = MOUNTAIN_SRC[variant];
  const clipTop = loop ? undefined : 100 - Math.max(0, Math.min(100, progress));

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: ASPECT }}
      aria-hidden="true"
    >
      {/* Dim base — always visible, reads as the "empty" silhouette the fill rises into. */}
      <Image src={src} alt="" fill sizes="220px" className="object-contain opacity-[0.16]" priority />

      {/* Bright fill, revealed bottom-to-top. */}
      <div
        className={`absolute inset-0 overflow-hidden ${loop ? "animate-mountain-fill-loop" : ""}`}
        style={loop ? undefined : { clipPath: `inset(${clipTop}% 0 0 0)` }}
      >
        <Image src={src} alt="" fill sizes="220px" className="object-contain" priority />
      </div>

      {glow && !loop && progress > 0 && progress < 100 && (
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 h-8 -translate-y-1/2 blur-md opacity-70 pointer-events-none"
          style={{
            top: `${clipTop}%`,
            background: "radial-gradient(closest-side, #ff4f20, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
