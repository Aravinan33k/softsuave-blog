import generated from "./images.generated.json";

/**
 * Overview illustrations for the landing pages that had none.
 *
 * The Sep corrections review found 38 pages whose Overview section was prose
 * only. Each now has a Pexels photograph filled by the image pipeline: a slot
 * `landing/ov-<slug>` in content/images.manifest.json, written by
 * `npm run images:home` to public/images/landing/ov-<slug>.webp and recorded —
 * with its blur placeholder and alt text — in images.generated.json.
 *
 * This reads that record into the `image` shape both Overview components take
 * (`components/landing/overview` and `components/generative-ai/overview`), so a
 * content module states only which page it is, never a path or a dimension that
 * could drift from the file on disk.
 */

interface GeneratedImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

const images = generated as Record<string, GeneratedImage>;

export interface OverviewImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
}

/**
 * The overview photograph for a page slug, or `undefined` when the pipeline has
 * no slot for it — so a caller can write `image: overviewImage(slug)` and a page
 * without one simply renders prose-only, as before.
 */
export function overviewImage(slug: string): OverviewImage | undefined {
  const img = images[`landing/ov-${slug}`];
  if (!img) return undefined;
  return { src: img.src, width: img.width, height: img.height, alt: img.alt, blurDataURL: img.blurDataURL };
}

/**
 * The same record, for the smaller card artwork a page can carry (the computer
 * vision page's service cards are the first). Returns the `{src, alt}` shape
 * the card components take, or `undefined` when the pipeline has no such slot.
 */
export function landingImage(id: string): { src: string; alt: string } | undefined {
  const img = images[`landing/${id}`];
  return img ? { src: img.src, alt: img.alt } : undefined;
}

/**
 * A pipeline slot's full record — dimensions and blur placeholder included —
 * for a hero or other slot that is not an `ov-<slug>` overview. Same shape as
 * `overviewImage`, looked up by the slot's own id (`landing/<id>`).
 */
export function landingPhoto(id: string): OverviewImage | undefined {
  const img = images[`landing/${id}`];
  if (!img) return undefined;
  return { src: img.src, width: img.width, height: img.height, alt: img.alt, blurDataURL: img.blurDataURL };
}
