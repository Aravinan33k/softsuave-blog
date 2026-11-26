import { landingPhoto } from "@/lib/home/overview-images";
import type { OverviewImage } from "@/lib/home/image-slots";

/**
 * The /ad/coffee-with-us photographs: Pexels slots `landing/cw-*` in
 * content/images.manifest.json, filled by `npm run images:home` and recorded
 * (size, alt, blur placeholder) in images.generated.json.
 *
 * Server-only on purpose: `landingPhoto` reads the full manifest record, which
 * must not ship to the browser. The page resolves these and hands the plain
 * records to its sections as props.
 */
function photo(id: string): OverviewImage {
  const img = landingPhoto(id);
  if (!img) throw new Error(`Missing image slot landing/${id} — run npm run images:home`);
  return img;
}

export const cwImages = {
  collab: photo("cw-collab"),
  ai: photo("cw-ai"),
  software: photo("cw-software"),
  engineering: photo("cw-engineering"),
  office: photo("cw-office"),
  coffee: photo("cw-coffee"),
};

export type CwPhoto = OverviewImage;
