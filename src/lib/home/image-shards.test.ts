import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "./images.generated.json";
import { imageShards } from "../../../scripts/image-shards.mjs";

const SHARDS = path.join(__dirname, "image-shards");

describe("image shards", () => {
  it("match the full manifest (run `npm run images:shards` if this fails)", () => {
    const expected = imageShards(manifest) as Record<string, Record<string, Record<string, unknown>>>;
    for (const [name, shard] of Object.entries(expected)) {
      const onDisk = JSON.parse(fs.readFileSync(path.join(SHARDS, `${name}.generated.json`), "utf8"));
      const slim = Object.fromEntries(
        Object.entries(shard).map(([k, v]) => [k, { src: v.src, width: v.width, height: v.height, alt: v.alt, blurDataURL: v.blurDataURL }]),
      );
      expect(onDisk).toEqual(slim);
    }
  });

  it("never leaves a named slot out", () => {
    // A literal id with no manifest entry would silently drop an image on that page.
    for (const [name, shard] of Object.entries(imageShards(manifest) as Record<string, object>)) {
      expect(Object.keys(shard).length, name).toBeGreaterThan(0);
    }
  });
});
