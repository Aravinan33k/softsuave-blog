import brand from "./brand-images.generated.json";

/**
 * Lookup for `BrandImage`, which renders inside client components — so this
 * module ships to the browser. It reads `brand-images.generated.json`: the
 * homepage design's ("four") slots with just their render fields, derived from
 * the full `images.generated.json` by `scripts/brand-images.mjs`. Reading the
 * full manifest here put 466 images' metadata and blur placeholders into every
 * page's JavaScript (~150 KB compressed; PageSpeed, 15 Oct).
 */
export type BrandImageData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
};

const map = brand as Record<string, BrandImageData>;

export function getImage(page: "four", id: string): BrandImageData {
  const img = page === "four" ? map[id] : undefined;
  if (!img) {
    throw new Error(
      `[images] Missing generated image for "${page}/${id}". Run \`npm run images:home\`.`
    );
  }
  return img;
}
