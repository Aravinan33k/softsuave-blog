// Pulls page artwork from the live softsuave.com and lands it in
// public/images/four/ as exact-size webp, the same on-disk contract the Pexels
// and AI scripts produce — so the content modules reference these the same way
// they reference everything else.
//
// These are Soft Suave's own production assets being reused on Soft Suave's own
// new pages. It is deliberately NOT a general-purpose scraper: the host is
// pinned, and there is no crawling — one fetch per slug you name.
//
//   node scripts/import-live-images.mjs --slugs=hire-java-developers,cloud-computing
//   node scripts/import-live-images.mjs --all            # every slug in --slugs-file
//   node scripts/import-live-images.mjs --slugs=x --dry  # report, download nothing
//
// Per slug it keeps the `--count` largest content images (og:image first, since
// that is the page's own pick of its best frame), writes <slug>-1.webp … and
// prints a JSON report to scripts/.live-images-report.json for the wiring step.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "four");
const REPORT = path.join(ROOT, "scripts", ".live-images-report.json");

const HOST = "https://www.softsuave.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** Chrome, sprites, and UI furniture — never page artwork. */
const REJECT = /logo|icon|favicon|sprite|flag|avatar|arrow|bullet|placeholder|loader|spinner|pixel|badge|star|quote|tick|check|close|menu|search|play-button|whatsapp|linkedin|twitter|facebook|instagram|youtube/i;

/** Below this it is furniture, not artwork, whatever the filename says. */
const MIN_BYTES = 12_000;
const MIN_WIDTH = 480;

const log = (m) => process.stdout.write(`${m}\n`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function arg(name, fallback = null) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
const hasFlag = (name) => process.argv.includes(`--${name}`);

function absolutise(src, pageUrl) {
  try {
    return new URL(src, pageUrl).href;
  } catch {
    return null;
  }
}

/**
 * Collects candidate image URLs from a page, best-first. `og:image` leads
 * because it is the page's own declaration of its representative frame;
 * everything else is ordered by document position, which on these pages tracks
 * hero-then-body closely enough.
 */
function extractCandidates(html, pageUrl) {
  const out = [];
  const push = (u) => {
    const abs = absolutise(u, pageUrl);
    if (!abs || !/^https?:/i.test(abs)) return;
    if (abs.startsWith("data:")) return;
    if (REJECT.test(abs)) return;
    if (!/\.(jpe?g|png|webp|avif)(\?|$)/i.test(abs)) return;
    if (!out.includes(abs)) out.push(abs);
  };

  const og = html.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
  );
  if (og) push(og[1]);

  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0];
    // srcset's last entry is the widest; prefer it over a thumbnail src.
    const ss = tag.match(/srcset=["']([^"']+)["']/i);
    if (ss) {
      const last = ss[1]
        .split(",")
        .map((s) => s.trim().split(/\s+/)[0])
        .filter(Boolean)
        .pop();
      if (last) push(last);
    }
    const src =
      tag.match(/\sdata-src=["']([^"']+)["']/i) || tag.match(/\ssrc=["']([^"']+)["']/i);
    if (src) push(src[1]);
  }
  return out;
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "user-agent": UA, referer: HOST } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function importSlug(slug, count, dry) {
  const pageUrl = `${HOST}/${slug}`;
  const res = await fetch(pageUrl, { headers: { "user-agent": UA } });
  if (!res.ok) return { slug, error: `page HTTP ${res.status}`, saved: [] };
  const html = await res.text();

  const candidates = extractCandidates(html, pageUrl);
  const kept = [];

  for (const url of candidates) {
    if (kept.length >= count) break;
    let buf;
    try {
      buf = await fetchBuffer(url);
    } catch {
      continue;
    }
    if (buf.length < MIN_BYTES) continue;

    let meta;
    try {
      meta = await sharp(buf).metadata();
    } catch {
      continue;
    }
    if (!meta.width || meta.width < MIN_WIDTH) continue;
    // Banner strips and tall rails crop badly into a 4:3 card.
    const ratio = meta.width / meta.height;
    if (ratio < 0.6 || ratio > 3.2) continue;

    kept.push({ url, width: meta.width, height: meta.height, bytes: buf.length, buf });
  }

  const saved = [];
  for (let i = 0; i < kept.length; i++) {
    const k = kept[i];
    const id = `${slug}-${i + 1}`;
    const file = path.join(OUT_DIR, `${id}.webp`);
    if (!dry) {
      fs.mkdirSync(OUT_DIR, { recursive: true });
      await sharp(k.buf)
        .resize(1200, 900, { fit: "cover", position: "attention" })
        .webp({ quality: 82 })
        .toFile(file);
    }
    saved.push({
      id,
      src: `/images/four/${id}.webp`,
      width: 1200,
      height: 900,
      from: k.url,
      sourceSize: `${k.width}x${k.height}`,
    });
  }
  return { slug, candidates: candidates.length, saved };
}

async function main() {
  const dry = hasFlag("dry");
  const count = Number(arg("count", "3"));
  let slugs = (arg("slugs", "") || "").split(",").map((s) => s.trim()).filter(Boolean);

  if (hasFlag("all")) {
    const file = arg("slugs-file", path.join(ROOT, "scripts", ".live-slugs.txt"));
    slugs = fs
      .readFileSync(file, "utf8")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!slugs.length) {
    log("no slugs. use --slugs=a,b or --all with scripts/.live-slugs.txt");
    process.exit(1);
  }

  log(`${slugs.length} slug(s), up to ${count} image(s) each${dry ? " (dry run)" : ""}`);
  const report = [];
  for (const slug of slugs) {
    try {
      const r = await importSlug(slug, count, dry);
      report.push(r);
      log(`  ${slug}: ${r.error ? `ERROR ${r.error}` : `${r.saved.length} saved of ${r.candidates} candidates`}`);
      for (const s of r.saved) log(`      ${s.id}.webp  <- ${s.sourceSize}  ${s.from.slice(0, 96)}`);
    } catch (e) {
      report.push({ slug, error: e.message, saved: [] });
      log(`  ${slug}: ERROR ${e.message}`);
    }
    await sleep(400); // be a polite client against their own origin
  }

  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  const total = report.reduce((n, r) => n + r.saved.length, 0);
  log(`done: ${total} image(s). report -> ${path.relative(ROOT, REPORT)}`);
}

main().catch((e) => {
  log(`fatal: ${e.stack || e.message}`);
  process.exit(1);
});
