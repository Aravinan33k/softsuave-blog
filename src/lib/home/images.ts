import generated from "./images.generated.json";
import type { PageKey } from "./content";

export type GeneratedImage = {
  page: string;
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  pexelsId: number;
  photographer: string;
  pexelsUrl: string;
  matchedTier: string;
};

const map = generated as Record<string, GeneratedImage>;

/**
 * Returns the generated Pexels image for a slot. Throws if missing so a
 * broken build surfaces loudly instead of shipping an empty <img>.
 */
export function getImage(page: PageKey, id: string): GeneratedImage {
  const img = map[`${page}/${id}`];
  if (!img) {
    throw new Error(
      `[images] Missing generated image for "${page}/${id}". Run \`npm run images:home\`.`
    );
  }
  return img;
}

/** All images for a page (useful for galleries). */
export function getPageImages(page: PageKey): GeneratedImage[] {
  return Object.values(map).filter((i) => i.page === page);
}

/** Photographer credits for a page (Pexels attribution). */
export function getCredits(page: PageKey) {
  return getPageImages(page).map((i) => ({
    photographer: i.photographer,
    url: i.pexelsUrl,
  }));
}
