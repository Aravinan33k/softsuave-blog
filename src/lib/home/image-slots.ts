/**
 * Lookups over a set of image slots keyed `landing/<id>` — no data of its own.
 *
 * Kept apart from `overview-images.ts`, which imports the whole ~300 KB manifest:
 * anything that ships to the browser must be able to import `imageSlots` without
 * pulling that in.
 */

export interface GeneratedImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

export interface OverviewImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
}

/**
 * The three lookups, over any set of slots.
 *
 * A module that ships to the browser must not read the full manifest (the same
 * rule `images.ts` follows for `BrandImage`). A page's content module instead
 * passes its own slice — `image-shards/<name>.generated.json`, just the slots it
 * names, derived by `scripts/image-shards.mjs` — and gets the identical lookups
 * back. Server-side callers keep the whole manifest, via `overview-images.ts`.
 */
export function imageSlots(images: Readonly<Record<string, GeneratedImage>>) {
  return {
    /**
     * The overview photograph for a page slug, or `undefined` when the pipeline has
     * no slot for it — so a caller can write `image: overviewImage(slug)` and a page
     * without one simply renders prose-only, as before.
     */
    overviewImage(slug: string): OverviewImage | undefined {
      const img = images[`landing/ov-${slug}`];
      if (!img) return undefined;
      return { src: img.src, width: img.width, height: img.height, alt: img.alt, blurDataURL: img.blurDataURL };
    },

    /**
     * The same record, for the smaller card artwork a page can carry (the computer
     * vision page's service cards are the first). Returns the `{src, alt}` shape
     * the card components take, or `undefined` when the pipeline has no such slot.
     */
    landingImage(id: string): { src: string; alt: string } | undefined {
      const img = images[`landing/${id}`];
      return img ? { src: img.src, alt: img.alt } : undefined;
    },

    /**
     * A pipeline slot's full record — dimensions and blur placeholder included —
     * for a hero or other slot that is not an `ov-<slug>` overview. Same shape as
     * `overviewImage`, looked up by the slot's own id (`landing/<id>`).
     */
    landingPhoto(id: string): OverviewImage | undefined {
      const img = images[`landing/${id}`];
      if (!img) return undefined;
      return { src: img.src, width: img.width, height: img.height, alt: img.alt, blurDataURL: img.blurDataURL };
    },
  };
}

