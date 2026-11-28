#!/usr/bin/env node
/**
 * Derives `src/lib/home/image-shards/<name>.generated.json` — for each page
 * content module that ships to the browser, just the image slots it names —
 * from `images.generated.json`.
 *
 * A route's sections import their own copy (so it is not serialized into the
 * RSC payload as props), which puts the content module in the page's
 * JavaScript. Several of those modules call `overviewImage()` / `landingImage()`
 * / `landingPhoto()` at load, and those used to read the whole manifest: ~300 KB
 * of blur placeholders on every page that did. The module now imports its own
 * shard instead, via `imageSlots()` in `overview-images.ts`.
 *
 * A shard is found by the import that names it —
 * `import shard from "./image-shards/<name>.generated.json"` — and holds the
 * slots that same file asks for by literal id, so adding a call to the module
 * and re-running `npm run images:shards` is all it takes. The three image
 * scripts call `writeImageShards()` after writing the manifest, and
 * `image-shards.test.ts` fails if a shard ever drifts from it. Entries keep
 * every field, blur included, so the page renders exactly what the full
 * manifest gave it.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOME = path.join(ROOT, "src", "lib", "home");
const GENERATED = path.join(HOME, "images.generated.json");
const SHARDS = path.join(HOME, "image-shards");

const SHARD_IMPORT = /image-shards\/([\w-]+)\.generated\.json/;

/** Manifest keys a module's source asks for by literal id (comments ignored). */
export function slotKeys(source) {
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const keys = new Set();
  for (const m of code.matchAll(/\boverviewImage\(\s*["']([^"']+)["']/g)) keys.add(`landing/ov-${m[1]}`);
  for (const m of code.matchAll(/\b(?:landingImage|landingPhoto)\(\s*["']([^"']+)["']/g)) keys.add(`landing/${m[1]}`);
  return [...keys].sort();
}

function sources(dir = HOME) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "image-shards" ? [] : sources(p);
    return /\.tsx?$/.test(e.name) && !/\.test\./.test(e.name) ? [p] : [];
  });
}

/** shard name -> its slice of `manifest` */
export function imageShards(manifest) {
  const out = {};
  for (const file of sources()) {
    const src = fs.readFileSync(file, "utf8");
    const m = src.match(SHARD_IMPORT);
    if (!m) continue;
    const shard = {};
    for (const key of slotKeys(src)) if (manifest[key]) shard[key] = manifest[key];
    out[m[1]] = shard;
  }
  return out;
}

export function writeImageShards(manifest = JSON.parse(fs.readFileSync(GENERATED, "utf8"))) {
  fs.mkdirSync(SHARDS, { recursive: true });
  const shards = imageShards(manifest);
  for (const [name, shard] of Object.entries(shards)) {
    const slim = {};
    for (const [key, img] of Object.entries(shard)) {
      slim[key] = { src: img.src, width: img.width, height: img.height, alt: img.alt, blurDataURL: img.blurDataURL };
    }
    fs.writeFileSync(path.join(SHARDS, `${name}.generated.json`), JSON.stringify(slim, null, 2) + "\n");
  }
  return Object.keys(shards);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const names = writeImageShards();
  console.log(`[images] wrote ${names.length} shards under ${path.relative(ROOT, SHARDS)}`);
}
