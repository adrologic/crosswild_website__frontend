/**
 * Picks the right image source for a product, plus its inline placeholder.
 *
 * Products carry three versions of every photo:
 *   image      full size — the product page
 *   imageThumb ~500px    — cards, grids, menus, thumbnails
 *   imageBlur  ~1KB      — a base64 placeholder rendered instantly, with no
 *                          network request at all, while the real photo loads
 *
 * Older products have only `image`, so every field falls back cleanly and a
 * missing placeholder simply means no blur-up (SafeImage handles that).
 *
 * Spread the result into SafeImage:
 *   <SafeImage {...productImage(product)} alt={product.name} fill />
 */

type ImageBearing = {
  image?: string;
  imageThumb?: string;
  imageBlur?: string;
};

type SubImage = string | { url?: string; thumbUrl?: string; blurData?: string };

export function productImage(
  product: ImageBearing | null | undefined,
  size: 'thumb' | 'full' = 'thumb'
): { src: string; blurDataURL?: string } {
  const full = product?.image || '';
  const src = size === 'thumb' ? product?.imageThumb || full : full;
  return {
    src,
    blurDataURL: product?.imageBlur || undefined,
  };
}

/** Same idea for a gallery sub-image, which may still be a bare URL string. */
export function subImage(
  img: SubImage,
  size: 'thumb' | 'full' = 'full'
): { src: string; blurDataURL?: string } {
  if (typeof img === 'string') return { src: img };
  const full = img.url || '';
  return {
    src: size === 'thumb' ? img.thumbUrl || full : full,
    blurDataURL: img.blurData || undefined,
  };
}
