#!/usr/bin/env node
/**
 * Derives `src/lib/home/brand-images.generated.json` — the slice of the image
 * manifest the browser needs — from `images.generated.json`.
 *
 * `BrandImage` renders only inside client components, and only "four" (the
 * homepage design's) slots, but it used to import the whole manifest: 466
 * entries with pexels credits, every page's blur placeholders — ~150 KB of
 * compressed JavaScript on every page (PageSpeed, 15 Oct). This keeps just the
 * "four" slots and just what an <Image> needs: src, size, alt, blur.
 *
 * The blur is re-encoded at 4px across: `next/image` stretches it over the slot
 * under a heavy Gaussian blur, so a 4px source reads the same as the 16px one
 * at half the bytes — the slice's 199 placeholders were 18 KB of its 24 KB
 * gzipped (PageSpeed, 15 Oct).
 *
 * The three image scripts call `writeBrandImages()` after writing the
 * manifest; `npm run images:brand` does it by hand, and
 * `brand-images.test.ts` fails if the two files ever drift.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED = path.join(ROOT, "src", "lib", "home", "images.generated.json");
const BRAND = path.join(ROOT, "src", "lib", "home", "brand-images.generated.json");

/** The client slice of a manifest: "four" slots keyed by id, render fields only (blur aside). */
export function brandImages(manifest) {
  const out = {};
  for (const img of Object.values(manifest)) {
    if (img.page !== "four") continue;
    out[img.id] = { src: img.src, width: img.width, height: img.height, alt: img.alt };
  }
  return out;
}

/** A manifest blur placeholder, re-encoded at 4px across. */
export async function tinyBlur(dataUrl) {
  const buf = Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
  const out = await sharp(buf).resize(4, 4, { fit: "inside" }).webp({ quality: 50 }).toBuffer();
  return `data:image/webp;base64,${out.toString("base64")}`;
}

export async function writeBrandImages(manifest = JSON.parse(fs.readFileSync(GENERATED, "utf8"))) {
  const slice = brandImages(manifest);
  for (const img of Object.values(manifest)) {
    if (img.page === "four") slice[img.id].blurDataURL = await tinyBlur(img.blurDataURL);
  }
  fs.writeFileSync(BRAND, JSON.stringify(slice, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeBrandImages();
  console.log(`[images] wrote ${path.relative(ROOT, BRAND)}`);
}
