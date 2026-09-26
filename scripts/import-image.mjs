// scripts/import-image.mjs
// Lands one image you already have — a Gemini/ChatGPT download, a designer's
// export, a photograph — into the same on-disk contract the Pexels and AI
// pipelines produce, so the content modules reference it like anything else.
//
// This is the third door into public/images/<page>/:
//
//   generate-home-images.mjs  Pexels keyword search   (slots with no `source`)
//   generate-ai-images.mjs    generated from a prompt ("source": "gemini")
//   import-image.mjs          a file you already have ("source": "hand-placed")
//
// The third one exists because a Gemini Pro / Google AI Pro subscription grants
// image generation in the browser app but NO API quota — there is no endpoint
// behind that subscription for a script to call. So the practical path for
// anyone on Pro is: generate it in the app, download it, run this.
//
// Dimensions and alt text come from the matching manifest slot when there is
// one, so a slot already written for the AI path can be filled by hand without
// restating anything. Flags override; with no slot, flags are required.
//
//   node scripts/import-image.mjs --id hire-dotnet-hero --file ~/Downloads/hero.png
//   node scripts/import-image.mjs --id my-art --file art.jpg --page four \
//        --width 1920 --height 1080 --alt "Describes the picture"
//   node scripts/import-image.mjs --id hire-dotnet-hero --file hero.png --dry-run

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "content", "images.manifest.json");
const OUT_DIR = path.join(ROOT, "public", "images");
const GENERATED = path.join(ROOT, "src", "lib", "home", "images.generated.json");

const log = (...a) => console.log("[import-image]", ...a);

function die(msg) {
  console.error(`\n[import-image] ERROR: ${msg}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const eq = a.indexOf("=");
    if (eq !== -1) out[a.slice(2, eq)] = a.slice(eq + 1);
    else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[a.slice(2)] = argv[++i];
    else out[a.slice(2)] = true;
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.id) die("--id is required (the slot id, e.g. --id hire-dotnet-hero)");
  if (!args.file) die("--file is required (path to the image you downloaded)");

  // ~ is a shell convenience the shell did not expand if it was quoted.
  const srcFile = path.resolve(
    ROOT,
    String(args.file).replace(/^~(?=[/\\])/, process.env.HOME || process.env.USERPROFILE || "~")
  );
  if (!fs.existsSync(srcFile)) die(`no such file: ${srcFile}`);

  // Pull defaults from the manifest slot when one exists, so a slot written for
  // the AI path can be filled by hand without restating its dimensions or alt.
  let slot = null;
  if (fs.existsSync(MANIFEST)) {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
    slot = (manifest.images || []).find((e) => e.id === args.id) || null;
  }

  const page = args.page || slot?.page;
  const width = Number(args.width || slot?.width);
  const height = Number(args.height || slot?.height);
  const alt = args.alt || slot?.alt;

  const missing = [
    !page && "--page",
    !width && "--width",
    !height && "--height",
    !alt && "--alt",
  ].filter(Boolean);
  if (missing.length) {
    die(
      `no manifest slot named "${args.id}", so these are required: ${missing.join(", ")}\n` +
      `  (add the slot to content/images.manifest.json to avoid repeating them)`
    );
  }

  const outDir = path.join(OUT_DIR, page);
  const outFile = path.join(outDir, `${args.id}.webp`);
  const meta = await sharp(srcFile).metadata();

  log(`source : ${srcFile}`);
  log(`         ${meta.width}x${meta.height} ${meta.format}`);
  log(`target : public/images/${page}/${args.id}.webp`);
  log(`         ${width}x${height} webp`);

  // A source smaller than the slot will be upscaled, which on a full-bleed hero
  // is the difference between crisp and mushy. Worth saying out loud rather
  // than silently shipping a soft image.
  if (meta.width < width || meta.height < height) {
    log(`WARNING: source is smaller than the slot — it will be upscaled and may look soft.`);
  }

  if (args["dry-run"]) {
    log("--dry-run: nothing written.");
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });
  await sharp(srcFile)
    .resize(width, height, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(outFile);

  const blurBuf = await sharp(srcFile).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();

  let generated = {};
  if (fs.existsSync(GENERATED)) {
    try {
      generated = JSON.parse(fs.readFileSync(GENERATED, "utf8"));
    } catch {
      generated = {};
    }
  }

  generated[`${page}/${args.id}`] = {
    page,
    id: args.id,
    src: `/images/${page}/${args.id}.webp`,
    width,
    height,
    alt,
    blurDataURL: `data:image/webp;base64,${blurBuf.toString("base64")}`,
    // No pexelsId and no prompt: this frame came from neither pipeline, and
    // filling those with placeholder values would read as real provenance.
    source: "hand-placed",
  };

  fs.mkdirSync(path.dirname(GENERATED), { recursive: true });
  // No trailing newline: matches what the other two scripts write, so importing
  // one image does not show up as a whole-file diff.
  fs.writeFileSync(GENERATED, JSON.stringify(generated, null, 2));

  const bytes = fs.statSync(outFile).size;
  log(`✓ written (${(bytes / 1024).toFixed(0)} KB) and registered as "${page}/${args.id}"`);
  log(`  reference it as:  src: "/images/${page}/${args.id}.webp"`);
}

main().catch((e) => {
  console.error("[import-image] Fatal:", e);
  process.exit(1);
});
