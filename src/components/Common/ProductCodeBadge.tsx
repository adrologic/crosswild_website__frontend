/**
 * The public product code ("CW1482") shown on top of a product photo.
 *
 * It lives inside the image frame on purpose: buyers screenshot the photo and
 * send it over WhatsApp, so the code has to travel with the picture.
 *
 * `pointer-events-none` keeps it from eating a swipe on the gallery carousel or
 * a tap on the card link underneath it.
 */

const BADGE_CLASS =
  'pointer-events-none select-none rounded-full bg-black/60 px-2.5 py-1 ' +
  'font-mono text-[11px] font-semibold leading-none tracking-wide text-white ' +
  'shadow-sm backdrop-blur-sm';

export default function ProductCodeBadge({
  code,
  inline = false,
  className = '',
}: {
  code?: string | null;
  /** Set when the badge sits inside an existing absolutely-positioned stack
   *  (the product cards already have one at the top-left of the image). */
  inline?: boolean;
  className?: string;
}) {
  if (!code) return null;

  return (
    <span
      className={`${inline ? '' : 'absolute left-3 top-3 z-10 '}${BADGE_CLASS}${className ? ` ${className}` : ''}`}
      aria-label={`Product code ${code}`}
    >
      {code}
    </span>
  );
}
