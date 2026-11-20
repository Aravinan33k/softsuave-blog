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

import { imageSlots, type GeneratedImage } from "./image-slots";

export type { OverviewImage } from "./image-slots";

/**
 * The lookups over the full manifest, for server-side callers (the hire-page
 * templates look a slug up at render time). Anything that ships to the browser
 * takes `imageSlots` from `./image-slots` with its own shard instead.
 */
export const { overviewImage, landingImage, landingPhoto } = imageSlots(
  generated as Record<string, GeneratedImage>,
);
