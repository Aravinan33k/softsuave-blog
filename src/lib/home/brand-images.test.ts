import { describe, expect, it } from "vitest";
import manifest from "./images.generated.json";
import brand from "./brand-images.generated.json";
import { brandImages } from "../../../scripts/brand-images.mjs";

describe("brand image slice", () => {
  it("matches the full manifest (run `npm run images:brand` if this fails)", () => {
    // The blurs are re-encoded (4px) from the manifest's, so they are checked
    // for presence; every other field must match exactly.
    const expected = brandImages(manifest) as Record<string, unknown>;
    expect(Object.keys(brand)).toEqual(Object.keys(expected));
    for (const [id, entry] of Object.entries(brand)) {
      expect({ src: entry.src, width: entry.width, height: entry.height, alt: entry.alt }).toEqual(expected[id]);
      expect(entry.blurDataURL).toMatch(/^data:image\/webp;base64,/);
    }
  });
});
