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
  /**
   * Where the frame came from. Absent means the Pexels pipeline, which
   * generated the original set; "hand-placed" is art dropped into
   * public/images/<page>/ by hand and registered here so that it renders
   * through `BrandImage` like everything else; "gemini" is generated from a
   * prompt by `scripts/generate-ai-images.mjs`.
   *
   * The Pexels fields below are that pipeline's bookkeeping — the photo id
   * feeds its site-wide dedupe, and the photographer and URL are the
   * attribution it owes. Hand-placed and generated art have none of that, so
   * they are optional rather than filled with placeholder values that would
   * read as real credit to a real person.
   */
  source?: "hand-placed" | "gemini";
  pexelsId?: number;
  photographer?: string;
  pexelsUrl?: string;
  matchedTier?: string;
  /**
   * Generation bookkeeping, `source: "gemini"` only — the model and the full
   * prompt that produced the frame, so it can be reproduced or restyled
   * without guessing what was asked for.
   */
  model?: string;
  prompt?: string;
  generatedAt?: string;
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

/**
 * Photographer credits for a page (Pexels attribution).
 *
 * Hand-placed art is skipped: it carries no photographer, and an entry with
 * an empty name would render as a credit to nobody.
 */
export function getCredits(page: PageKey) {
  return getPageImages(page)
    .filter((i) => i.photographer && i.pexelsUrl)
    .map((i) => ({
      photographer: i.photographer!,
      url: i.pexelsUrl!,
    }));
}
