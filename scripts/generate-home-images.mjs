// scripts/generate-home-images.mjs
// Fills every image slot in content/images.manifest.json with a real Pexels photo.
// - orientation + min-resolution filtering
// - fallback keyword tiers (broad -> broader -> generic on-brand)
// - dedupe by Pexels photo id across ALL slots (no photo repeats site-wide)
// - crops to exact slot dimensions with sharp, writes /public/images/<page>/<id>.webp
// - generates blurDataURL for next/image placeholder
// - caches search responses, throttles API calls, skips already-downloaded slots
// - NEVER substitutes a placeholder: if a slot can't be filled after all tiers, the
//   script fails with a clear error listing every unfilled id + its keywords.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MANIFEST = path.join(ROOT, "content", "images.manifest.json");
const OUT_DIR = path.join(ROOT, "public", "images");
const GENERATED = path.join(ROOT, "src", "lib", "home", "images.generated.json");
const CACHE_DIR = path.join(ROOT, ".cache", "pexels");

const API_KEY = process.env.PEXELS_API_KEY;
const THROTTLE_MS = 350; // polite spacing between live API calls
const PER_PAGE = 20;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(...a) {
  console.log("[images]", ...a);
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function slugCache(query, orientation) {
  return (
    query.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") +
    "__" +
    orientation +
    ".json"
  );
}

async function pexelsSearch(query, orientation) {
  ensureDir(CACHE_DIR);
  const cacheFile = path.join(CACHE_DIR, slugCache(query, orientation));
  if (fs.existsSync(cacheFile)) {
    try {
      return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    } catch {
      /* fall through to live fetch */
    }
  }
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("size", "large");

  await sleep(THROTTLE_MS);
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (res.status === 429) {
    throw new Error("Pexels rate limit hit (429). Wait and re-run; cached results are kept.");
  }
  if (!res.ok) {
    throw new Error(`Pexels API error ${res.status} for query "${query}"`);
  }
  const data = await res.json();
  fs.writeFileSync(cacheFile, JSON.stringify(data));
  return data;
}

function matchesOrientation(photo, orientation) {
  const r = photo.width / photo.height;
  if (orientation === "landscape") return r >= 1.2;
  if (orientation === "portrait") return r <= 0.85;
  return r > 0.85 && r < 1.2; // square-ish
}

// Choose the best unused photo for a slot given a search result list.
function pickPhoto(photos, entry, usedIds) {
  const oriented = photos.filter(
    (p) => matchesOrientation(p, entry.orientation) && !usedIds.has(p.id)
  );
  // Tier A: meets min resolution (>= slot dims)
  const bigEnough = oriented.filter(
    (p) => p.width >= entry.width && p.height >= entry.height
  );
  const pool = bigEnough.length ? bigEnough : oriented;
  if (!pool.length) return null;
  // Prefer the one whose area is closest-but->= to the target (avoid huge downloads),
  // else the largest available.
  const target = entry.width * entry.height;
  pool.sort((a, b) => {
    const aa = a.width * a.height;
    const bb = b.width * b.height;
    const aOk = aa >= target;
    const bOk = bb >= target;
    if (aOk && bOk) return aa - bb; // smallest sufficient first
    if (aOk) return -1;
    if (bOk) return 1;
    return bb - aa; // both too small: largest first
  });
  return pool[0];
}

function bestSrc(photo, entry) {
  // Pick a Pexels-hosted size at least as large as the slot, else original.
  const s = photo.src || {};
  const candidates = [
    { url: s.medium, w: 350 },
    { url: s.large, w: 940 },
    { url: s.large2x, w: 1880 },
    { url: s.original, w: photo.width },
  ].filter((c) => c.url);
  const need = Math.max(entry.width, entry.height);
  const sufficient = candidates.filter((c) => c.w >= need).sort((a, b) => a.w - b.w);
  return (sufficient[0] || candidates[candidates.length - 1]).url;
}

async function downloadBuffer(url) {
  await sleep(120);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function makeBlur(buffer) {
  const b = await sharp(buffer)
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${b.toString("base64")}`;
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const entries = manifest.images.filter((e) => e.id && e.page);

  // Load prior generated results so we keep dedupe stable and skip existing files.
  let generated = {};
  if (fs.existsSync(GENERATED)) {
    try {
      generated = JSON.parse(fs.readFileSync(GENERATED, "utf8"));
    } catch {
      generated = {};
    }
  }

  // Which slots still need fetching? (file missing or not recorded)
  const pending = entries.filter((e) => {
    const key = `${e.page}/${e.id}`;
    const outFile = path.join(OUT_DIR, e.page, `${e.id}.webp`);
    return !(fs.existsSync(outFile) && generated[key] && generated[key].pexelsId);
  });

  // Nothing to do — the committed images cover every slot. This is the normal
  // case on a CI/Vercel build, so we do NOT require an API key here.
  if (pending.length === 0) {
    log(`all ${entries.length} images already present — skipping (no API key needed).`);
    return;
  }

  // Something is missing and we need to fetch it → an API key is required.
  if (!API_KEY) {
    console.error(
      `\n[images] ERROR: ${pending.length} image slot(s) are missing and PEXELS_API_KEY is not set.\n` +
        "Set PEXELS_API_KEY (see .env.example) locally or in your host's env, then re-run.\n" +
        "Missing: " +
        pending.map((e) => `${e.page}/${e.id}`).join(", ") +
        "\n"
    );
    process.exit(1);
  }

  const usedIds = new Set(
    Object.values(generated)
      .map((g) => g.pexelsId)
      .filter((x) => typeof x === "number")
  );

  const unfilled = [];
  let filled = 0;
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.id || !entry.page) continue; // ignore $comment / malformed
    const key = `${entry.page}/${entry.id}`;
    const outPageDir = path.join(OUT_DIR, entry.page);
    const outFile = path.join(outPageDir, `${entry.id}.webp`);

    // Skip if already downloaded AND recorded (keeps its id reserved via usedIds above).
    if (fs.existsSync(outFile) && generated[key] && generated[key].pexelsId) {
      skipped++;
      continue;
    }

    ensureDir(outPageDir);

    let chosen = null;
    for (const tier of entry.keywords) {
      let data;
      try {
        data = await pexelsSearch(tier, entry.orientation);
      } catch (e) {
        log(`  ! search error for "${tier}": ${e.message}`);
        continue;
      }
      const photo = pickPhoto(data.photos || [], entry, usedIds);
      if (photo) {
        chosen = { photo, tier };
        break;
      }
    }

    if (!chosen) {
      unfilled.push(entry);
      log(`  ✗ ${key} — no result across tiers: ${JSON.stringify(entry.keywords)}`);
      continue;
    }

    try {
      const buf = await downloadBuffer(bestSrc(chosen.photo, entry));
      await sharp(buf)
        .resize(entry.width, entry.height, { fit: "cover", position: "attention" })
        .webp({ quality: 82 })
        .toFile(outFile);
      const blurDataURL = await makeBlur(buf);

      usedIds.add(chosen.photo.id);
      generated[key] = {
        page: entry.page,
        id: entry.id,
        src: `/images/${entry.page}/${entry.id}.webp`,
        width: entry.width,
        height: entry.height,
        alt: entry.alt,
        blurDataURL,
        pexelsId: chosen.photo.id,
        photographer: chosen.photo.photographer,
        pexelsUrl: chosen.photo.url,
        matchedTier: chosen.tier,
      };
      filled++;
      log(`  ✓ ${key} <- pexels#${chosen.photo.id} (tier: "${chosen.tier}")`);
      // Persist incrementally so a mid-run failure doesn't lose progress.
      ensureDir(path.dirname(GENERATED));
      fs.writeFileSync(GENERATED, JSON.stringify(generated, null, 2));
    } catch (e) {
      unfilled.push(entry);
      log(`  ✗ ${key} — download/crop failed: ${e.message}`);
    }
  }

  ensureDir(path.dirname(GENERATED));
  fs.writeFileSync(GENERATED, JSON.stringify(generated, null, 2));

  log(`done: ${filled} filled, ${skipped} skipped (already present), ${unfilled.length} unfilled`);

  if (unfilled.length) {
    console.error("\n[images] FAILED — the following slots could not be filled (fix keywords and re-run):");
    for (const e of unfilled) {
      console.error(`  - ${e.page}/${e.id}  [${e.orientation} ${e.width}x${e.height}]  keywords: ${JSON.stringify(e.keywords)}`);
    }
    console.error("\nNo placeholders were written. Re-run `npm run images:home` after adjusting keywords.\n");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("[images] Fatal:", e);
  process.exit(1);
});
