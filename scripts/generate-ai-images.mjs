// scripts/generate-ai-images.mjs
// Fills the AI-generated image slots in content/images.manifest.json using Gemini.
//
// Sibling to generate-home-images.mjs, which owns the Pexels slots. The split is
// by the slot's own `source` field, so one manifest still describes every image
// on the site and the two scripts never touch each other's slots:
//
//   no `source`          -> Pexels keyword search        (generate-home-images.mjs)
//   "source": "gemini"   -> generated from `prompt`      (this file)
//   "source": "hand-placed" -> art dropped in by hand, neither script touches it
//
// Everything downstream of the fetch is deliberately identical to the Pexels
// script — sharp crop to the exact slot size, blurDataURL, the same
// public/images/<page>/<id>.webp output path and the same images.generated.json
// registration — so `getImage()` and `BrandImage` cannot tell the two apart.
//
// - a STYLE prefix is prepended to every prompt, so 100+ generated frames read
//   as one visual system rather than 100 unrelated pictures
// - skips slots already generated (file present AND recorded), like its sibling
// - persists incrementally, so a mid-run failure costs nothing already paid for
// - NEVER substitutes a placeholder: unfilled slots fail the run with a list
//
// Usage:
//   npm run images:ai              generate every pending gemini slot
//   npm run images:ai -- --dry-run list what would be generated, call nothing
//   npm run images:ai -- --only svc-hero,svc-benefit-1
//   npm run images:ai -- --force   regenerate even if already present

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

const API_KEY = process.env.GEMINI_API_KEY;
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * MuAPI is the second route to the same Google models.
 *
 * Google's own API gates image generation behind billing on the Cloud project
 * (the free tier reports `limit: 0`, not a rate limit), so a key that works
 * fine for text still cannot generate a frame. MuAPI resells the same models
 * — `nano-banana` IS Gemini's image model, `google-imagen4` is Imagen 4 — on
 * prepaid credit instead, which is the cheaper door to walk through if you
 * want a handful of images rather than a Cloud billing account.
 *
 * Selected by prefixing the model with `muapi/`, e.g.
 * GEMINI_IMAGE_MODEL=muapi/nano-banana.
 */
const MUAPI_KEY = process.env.MUAPI_API_KEY;
const MUAPI_BASE = "https://api.muapi.ai/api/v1";

/**
 * Default model. Overridable per slot (`"model": "..."`) and globally via
 * GEMINI_IMAGE_MODEL, because Google renames these faster than this repo ships
 * — `gemini-2.5-flash` was already 404 ("no longer available to new users") by
 * the time this script was written. Run with --list-models to see what the key
 * in .env can currently reach.
 *
 * Two request shapes exist and the name decides which one is used: an
 * `imagen-*` model takes `:predict`, anything else takes `:generateContent`.
 */
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";

const THROTTLE_MS = 1200; // generation is slower and costlier than search

/**
 * Prepended to every prompt.
 *
 * This is the whole reason the generated set can hang together. The Pexels
 * pipeline gets coherence for free by deduping real photographs against one
 * another; generated frames have no such constraint, so the consistency has to
 * be stated. Edit this once and regenerate with --force to restyle the site.
 */
const STYLE = [
  "Cinematic editorial photograph for a premium enterprise technology brand.",
  "Deep navy and near-black background, warm amber and soft copper accent light,",
  "shallow depth of field, restrained and confident, generous negative space.",
  "No text, no logos, no watermarks, no charts, no user interface elements.",
].join(" ");

/**
 * Appended to every prompt.
 *
 * People are the failure mode for this surface: a company selling real delivery
 * teams cannot illustrate itself with synthetic ones. Slots that need people
 * belong on the Pexels path, so this states the constraint rather than trusting
 * each prompt to remember it.
 */
const NEGATIVE =
  "Do not depict recognisable human faces or people as the subject. " +
  "Avoid stock-photo clichés, avoid glowing blue holograms, avoid AI-art gloss.";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function log(...a) {
  console.log("[ai-images]", ...a);
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const out = { dryRun: false, force: false, only: null, listModels: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--list-models") out.listModels = true;
    else if (a === "--force") out.force = true;
    else if (a === "--only") out.only = new Set((argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean));
    else if (a.startsWith("--only=")) out.only = new Set(a.slice(7).split(",").map((s) => s.trim()).filter(Boolean));
  }
  return out;
}

// ---------------------------------------------------------------------------
// Aspect ratio
// ---------------------------------------------------------------------------

/**
 * Nearest aspect ratio the API will accept for a slot's dimensions.
 *
 * The returned frame is still cropped to the exact slot size afterwards, so
 * this only has to get close — the point is to avoid asking for a square and
 * then cropping away half a composition to reach 1920x1080.
 */
const RATIOS = [
  ["1:1", 1], ["4:3", 4 / 3], ["3:4", 3 / 4], ["16:9", 16 / 9],
  ["9:16", 9 / 16], ["3:2", 1.5], ["2:3", 2 / 3], ["21:9", 21 / 9],
];

function nearestRatio(width, height) {
  const target = width / height;
  let best = RATIOS[0];
  let bestDelta = Infinity;
  for (const r of RATIOS) {
    const delta = Math.abs(Math.log(r[1] / target));
    if (delta < bestDelta) {
      bestDelta = delta;
      best = r;
    }
  }
  return best[0];
}

// ---------------------------------------------------------------------------
// Gemini
// ---------------------------------------------------------------------------

function fullPrompt(entry) {
  const ratio = nearestRatio(entry.width, entry.height);
  return [
    STYLE,
    entry.prompt,
    NEGATIVE,
    `Composition framed for a ${ratio} crop.`,
  ].filter(Boolean).join(" ");
}

/**
 * Pulls the first inline image out of a response.
 *
 * Both request shapes are handled here rather than at the call site because the
 * only thing the caller wants is bytes, and which endpoint produced them is an
 * implementation detail of the model name.
 */
function extractImage(json, model) {
  // imagen-* / :predict
  const pred = json?.predictions?.[0];
  if (pred?.bytesBase64Encoded) {
    return Buffer.from(pred.bytesBase64Encoded, "base64");
  }
  // gemini-* / :generateContent
  const parts = json?.candidates?.[0]?.content?.parts || [];
  for (const p of parts) {
    const data = p?.inlineData?.data || p?.inline_data?.data;
    if (data) return Buffer.from(data, "base64");
  }
  // Nothing usable — surface why rather than a bare "undefined".
  const block = json?.promptFeedback?.blockReason || json?.candidates?.[0]?.finishReason;
  const text = parts.map((p) => p.text).filter(Boolean).join(" ").slice(0, 300);
  throw new Error(
    `no image in ${model} response` +
    (block ? ` (finish/block reason: ${block})` : "") +
    (text ? ` — model replied with text: "${text}"` : "") +
    ` — raw keys: ${Object.keys(json || {}).join(", ")}`
  );
}

/**
 * Generate via MuAPI rather than Google directly.
 *
 * NOTE: the response shape here is written defensively because it could not be
 * exercised — the account's balance was $0.00 at the time, so every call
 * returned 402 before producing one. It handles the two shapes such APIs use
 * (an inline/URL result, or a job id to poll) and, failing both, prints the raw
 * body rather than guessing. Verify on the first funded run.
 */
async function generateViaMuApi(entry, model) {
  if (!MUAPI_KEY) throw new Error("MUAPI_API_KEY is not set but the model is 'muapi/…'.");
  const prompt = fullPrompt(entry);
  const headers = { "x-api-key": MUAPI_KEY, "Content-Type": "application/json" };

  await sleep(THROTTLE_MS);
  const res = await fetch(`${MUAPI_BASE}/${model}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt, aspect_ratio: nearestRatio(entry.width, entry.height) }),
  });

  const raw = await res.text();
  if (res.status === 402) {
    throw new Error(
      `MuAPI has no credit balance — top up at https://muapi.ai/topup ` +
      `(this model costs about $0.03 per image).`
    );
  }
  if (!res.ok) throw new Error(`MuAPI error ${res.status} for "${model}": ${raw.slice(0, 400)}`);

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`MuAPI returned non-JSON for "${model}": ${raw.slice(0, 200)}`);
  }

  // Shape A: the image is already here, as a URL or as base64.
  const direct =
    json.image_url || json.url || json.output?.[0] || json.images?.[0]?.url || json.images?.[0];
  if (typeof direct === "string" && /^https?:\/\//.test(direct)) {
    const img = await fetch(direct);
    if (!img.ok) throw new Error(`MuAPI image download failed ${img.status}: ${direct}`);
    return { buffer: Buffer.from(await img.arrayBuffer()), model: `muapi/${model}`, prompt };
  }
  const b64 = json.image_base64 || json.b64_json || (typeof direct === "string" ? direct : null);
  if (b64 && b64.length > 512) {
    return { buffer: Buffer.from(b64.replace(/^data:[^,]+,/, ""), "base64"), model: `muapi/${model}`, prompt };
  }

  // Shape B: a job id to poll.
  const jobId = json.request_id || json.id || json.job_id;
  if (jobId) {
    for (let i = 0; i < 60; i++) {
      await sleep(2000);
      const p = await fetch(`${MUAPI_BASE}/predictions/${jobId}/result`, { headers });
      if (!p.ok) continue;
      const pj = await p.json().catch(() => ({}));
      const status = (pj.status || "").toLowerCase();
      if (status && /fail|error|cancel/.test(status)) {
        throw new Error(`MuAPI job ${jobId} ${status}: ${JSON.stringify(pj).slice(0, 300)}`);
      }
      const done = pj.image_url || pj.url || pj.outputs?.[0]?.url || pj.outputs?.[0];
      if (typeof done === "string" && /^https?:\/\//.test(done)) {
        const img = await fetch(done);
        if (!img.ok) throw new Error(`MuAPI image download failed ${img.status}: ${done}`);
        return { buffer: Buffer.from(await img.arrayBuffer()), model: `muapi/${model}`, prompt };
      }
    }
    throw new Error(`MuAPI job ${jobId} did not finish within 2 minutes.`);
  }

  throw new Error(
    `MuAPI response for "${model}" had no image and no job id — raw: ${raw.slice(0, 400)}`
  );
}

async function generate(entry) {
  const model = entry.model || MODEL;

  if (model.startsWith("muapi/")) {
    return generateViaMuApi(entry, model.slice("muapi/".length));
  }

  const isImagen = model.startsWith("imagen");
  const prompt = fullPrompt(entry);
  const ratio = nearestRatio(entry.width, entry.height);

  const url = `${API_BASE}/${model}:${isImagen ? "predict" : "generateContent"}`;
  const body = isImagen
    ? {
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: ratio },
      }
    : {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { imageConfig: { aspectRatio: ratio } },
      };

  await sleep(THROTTLE_MS);
  const res = await fetch(url, {
    method: "POST",
    headers: { "x-goog-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    const detail = await res.text().catch(() => "");
    // "limit: 0" is not a rate limit, it is an entitlement: the free tier grants
    // no image-generation quota at all, so retrying never succeeds. Saying
    // "wait and re-run" here would send someone into an infinite retry loop over
    // something only a billing change can fix.
    if (/limit:\s*0\b/.test(detail)) {
      throw new Error(
        `model "${model}" has zero image quota on this key's tier — this is a billing ` +
        "entitlement, not a transient rate limit, so retrying will not help. " +
        "Enable billing on the Google Cloud project behind GEMINI_API_KEY, or use the Pexels path for this slot."
      );
    }
    throw new Error("Gemini rate limit hit (429). Wait and re-run; finished slots are kept.");
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status} for model "${model}": ${detail.slice(0, 400)}`);
  }

  return { buffer: extractImage(await res.json(), model), model, prompt };
}

async function makeBlur(buffer) {
  const b = await sharp(buffer)
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${b.toString("base64")}`;
}

// ---------------------------------------------------------------------------

/**
 * Every image-capable model the key can currently reach.
 *
 * Worth having as a flag rather than a note in a README: the model list moves
 * under this script, and the failure it causes (404 "no longer available to new
 * users") reads like a broken script rather than a renamed model.
 */
async function listModels() {
  if (!API_KEY) {
    console.error("[ai-images] GEMINI_API_KEY is not set.");
    process.exit(1);
  }
  const res = await fetch(`${API_BASE}?pageSize=200`, { headers: { "x-goog-api-key": API_KEY } });
  if (!res.ok) {
    console.error(`[ai-images] model list failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
    process.exit(1);
  }
  const models = (await res.json()).models || [];
  // "nano-banana" is an image model whose name says so nowhere else.
  const image = models.filter((m) => /image|imagen|banana/i.test(m.name));
  log(`${image.length} image-capable model(s) reachable with this key (default: "${MODEL}"):`);
  for (const m of image) console.log(`  ${m.name.replace("models/", "")}`);
  if (!image.length) console.log("  (none — check the key's project)");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.listModels) return listModels();

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  // Only this script's slots. A slot without `source` belongs to the Pexels
  // script; "hand-placed" belongs to neither.
  const entries = manifest.images.filter(
    (e) => e.id && e.page && e.source === "gemini" && (!args.only || args.only.has(e.id))
  );

  if (!entries.length) {
    log(
      args.only
        ? `no gemini slots matched --only ${[...args.only].join(",")}`
        : 'no slots with "source": "gemini" in the manifest — nothing to do.'
    );
    return;
  }

  const missingPrompt = entries.filter((e) => !e.prompt || !e.prompt.trim());
  if (missingPrompt.length) {
    console.error(
      `\n[ai-images] ERROR: ${missingPrompt.length} gemini slot(s) have no "prompt":\n` +
      missingPrompt.map((e) => `  - ${e.page}/${e.id}`).join("\n") +
      "\nA gemini slot is defined by its prompt the way a Pexels slot is defined by its keywords.\n"
    );
    process.exit(1);
  }

  let generated = {};
  if (fs.existsSync(GENERATED)) {
    try {
      generated = JSON.parse(fs.readFileSync(GENERATED, "utf8"));
    } catch {
      generated = {};
    }
  }

  const isDone = (e) => {
    const key = `${e.page}/${e.id}`;
    const outFile = path.join(OUT_DIR, e.page, `${e.id}.webp`);
    return fs.existsSync(outFile) && generated[key]?.source === "gemini";
  };

  const pending = args.force ? entries : entries.filter((e) => !isDone(e));

  if (!pending.length) {
    log(`all ${entries.length} generated images already present — skipping (no API call).`);
    return;
  }

  if (args.dryRun) {
    log(`--dry-run: ${pending.length} slot(s) would be generated with model "${MODEL}":\n`);
    for (const e of pending) {
      console.log(`  ${e.page}/${e.id}  [${e.width}x${e.height} -> ${nearestRatio(e.width, e.height)}]`);
      console.log(`    ${fullPrompt(e)}\n`);
    }
    return;
  }

  if (!API_KEY) {
    console.error(
      `\n[ai-images] ERROR: ${pending.length} slot(s) need generating and GEMINI_API_KEY is not set.\n` +
      "Set GEMINI_API_KEY in .env (see .env.example), then re-run.\n" +
      "Missing: " + pending.map((e) => `${e.page}/${e.id}`).join(", ") + "\n"
    );
    process.exit(1);
  }

  const unfilled = [];
  let filled = 0;
  const skipped = entries.length - pending.length;

  for (const entry of pending) {
    const key = `${entry.page}/${entry.id}`;
    const outPageDir = path.join(OUT_DIR, entry.page);
    const outFile = path.join(outPageDir, `${entry.id}.webp`);
    ensureDir(outPageDir);

    try {
      const { buffer, model, prompt } = await generate(entry);

      await sharp(buffer)
        .resize(entry.width, entry.height, { fit: "cover", position: "attention" })
        .webp({ quality: 82 })
        .toFile(outFile);

      generated[key] = {
        page: entry.page,
        id: entry.id,
        src: `/images/${entry.page}/${entry.id}.webp`,
        width: entry.width,
        height: entry.height,
        alt: entry.alt,
        blurDataURL: await makeBlur(buffer),
        // Bookkeeping, mirroring what the Pexels script records: enough to
        // reproduce the frame, and enough for anyone reading the generated
        // manifest to see at a glance that this one is not a photograph.
        source: "gemini",
        model,
        prompt,
        generatedAt: new Date().toISOString().slice(0, 10),
      };
      filled++;
      log(`  ✓ ${key} <- ${model}`);

      // Persist per slot: generation costs money, so a crash on slot 40 must
      // not throw away the 39 already paid for.
      ensureDir(path.dirname(GENERATED));
      fs.writeFileSync(GENERATED, JSON.stringify(generated, null, 2));
    } catch (e) {
      unfilled.push({ entry, reason: e.message });
      log(`  ✗ ${key} — ${e.message}`);
    }
  }

  ensureDir(path.dirname(GENERATED));
  fs.writeFileSync(GENERATED, JSON.stringify(generated, null, 2));

  log(`done: ${filled} generated, ${skipped} skipped (already present), ${unfilled.length} unfilled`);

  if (unfilled.length) {
    console.error("\n[ai-images] FAILED — these slots could not be generated:");
    for (const u of unfilled) {
      console.error(`  - ${u.entry.page}/${u.entry.id}  [${u.entry.width}x${u.entry.height}]`);
      console.error(`      ${u.reason}`);
    }
    console.error("\nNo placeholders were written. Adjust the prompt or model and re-run.\n");
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("[ai-images] Fatal:", e);
  process.exit(1);
});
