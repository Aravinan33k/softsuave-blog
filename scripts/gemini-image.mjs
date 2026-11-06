// scripts/gemini-image.mjs
// Drives gemini.google.com in a persistent browser profile to generate an
// image, then hands the download to `npm run images:import`.
//
// WHY THIS EXISTS
// A Google AI Pro subscription grants image generation in the Gemini web app
// but no API quota — there is no endpoint behind the subscription. This drives
// the app the way a person does, using a real logged-in session.
//
// KNOW WHAT YOU ARE AGREEING TO
// Google's Terms of Service prohibit accessing their services by automated
// means. The practical exposure is account suspension, and if this Google
// account is a work account the blast radius is larger than a few images are
// worth. The supported alternative is the paid Gemini API (npm run images:ai).
// This file is deliberately plain automation: it does not spoof fingerprints,
// patch navigator.webdriver, or otherwise try to look like it is not what it
// is. If the honest version does not work, that is a signal about whether to
// be doing it, not a prompt to disguise it.
//
//   node scripts/gemini-image.mjs --probe             open + dump input elements
//   node scripts/gemini-image.mjs --id hire-dotnet-hero   generate for a slot
//   node scripts/gemini-image.mjs --id X --keep-open  pause before closing
//
// The profile directory holds live Google session cookies. It is gitignored and
// must stay that way — it is as sensitive as a password.

import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = path.join(ROOT, "content", "images.manifest.json");

/**
 * A profile of this script's own, NOT your everyday Chrome profile.
 *
 * Two reasons, and the first is fatal rather than stylistic: Chrome locks a
 * profile directory while it is running, so pointing Playwright at your real
 * one fails whenever your browser is open, and risks corrupting it when it is
 * not. The second is blast radius — a session that only ever holds Gemini is a
 * smaller thing to lose than the profile holding every account you use.
 */
const PROFILE_DIR = path.join(ROOT, ".gemini-profile");
const DOWNLOAD_DIR = path.join(ROOT, ".gemini-downloads");

/* ===========================================================================
 * SELECTORS — the only part that rots.
 *
 * Gemini's DOM is obfuscated and changes without notice, so everything
 * brittle lives here rather than scattered through the flow. Each entry is a
 * list tried in order, so a UI change usually means adding one line, not
 * rewriting the script. Re-run with --probe to see what the page offers now.
 * ======================================================================== */
const SEL = {
  // Confirmed by --probe: a Quill contenteditable, not a real <textarea>.
  prompt: [
    'div[role="textbox"][aria-label*="prompt" i]',
    "div.ql-editor[contenteditable='true']",
    'div[role="textbox"]',
  ],
  submit: [
    'button[aria-label*="send" i]',
    'button[aria-label*="submit" i]',
    'button[mattooltip*="send" i]',
  ],
  // Generated images live in the response stream. Chat avatars and icons also
  // match <img>, so the flow filters by rendered size rather than trusting this.
  responseImage: ["img"],
};

const log = (...a) => console.log("[gemini]", ...a);

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

/** First selector in the list that resolves to a visible element. */
async function firstVisible(page, selectors, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    for (const s of selectors) {
      const el = page.locator(s).first();
      if (await el.isVisible().catch(() => false)) return { locator: el, selector: s };
    }
    await page.waitForTimeout(400);
  }
  return null;
}

/**
 * The prompt, as one line.
 *
 * Enter submits in this editor, so a prompt containing newlines would send
 * itself after its first line. Collapsing whitespace is not cosmetic here — it
 * is what stops the script firing a truncated prompt.
 */
function flatten(text) {
  return text.replace(/\s+/g, " ").trim();
}

function slotPrompt(id) {
  if (!fs.existsSync(MANIFEST)) return null;
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const slot = (manifest.images || []).find((e) => e.id === id);
  if (!slot) return null;
  if (!slot.prompt) throw new Error(`manifest slot "${id}" has no "prompt" field.`);
  return slot;
}

/** Everything the page currently offers, for when a selector stops matching. */
async function probe(page) {
  log("probing …");
  const found = await page.evaluate(() => {
    const out = { inputs: [], buttons: [], images: [] };
    for (const el of document.querySelectorAll(
      'textarea, [contenteditable="true"], [role="textbox"]'
    )) {
      const r = el.getBoundingClientRect();
      if (r.width < 80 || r.height < 16) continue;
      out.inputs.push({
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || "").slice(0, 60),
        classes: (el.className || "").toString().slice(0, 60),
      });
    }
    for (const el of document.querySelectorAll("button")) {
      const r = el.getBoundingClientRect();
      const label = el.getAttribute("aria-label") || el.textContent?.trim() || "";
      if (r.width < 8 || !label) continue;
      out.buttons.push({ label: label.slice(0, 40), testid: el.getAttribute("data-testid") || "" });
    }
    for (const el of document.querySelectorAll("img")) {
      const r = el.getBoundingClientRect();
      if (r.width < 200 || r.height < 200) continue; // avatars and icons
      out.images.push({
        w: Math.round(r.width),
        h: Math.round(r.height),
        alt: (el.alt || "").slice(0, 50),
        src: (el.currentSrc || el.src || "").slice(0, 90),
      });
    }
    return out;
  });

  log(`  inputs (${found.inputs.length}):`);
  found.inputs.forEach((i) => log(`    ${JSON.stringify(i)}`));
  log(`  buttons (${found.buttons.length}) — looking for send/download:`);
  found.buttons
    .filter((b) => /send|submit|download|save|export|more|image/i.test(b.label))
    .forEach((b) => log(`    ${JSON.stringify(b)}`));
  log(`  large images (${found.images.length}):`);
  found.images.forEach((i) => log(`    ${JSON.stringify(i)}`));
  return found;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const firstRun = !fs.existsSync(PROFILE_DIR);
  fs.mkdirSync(PROFILE_DIR, { recursive: true });
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    // Real Chrome, not Playwright's bundled Chromium. Google's sign-in refuses
    // many non-branded builds with "This browser or app may not be secure",
    // which is a compatibility wall rather than a bot check — you cannot log in
    // at all. Drop `channel` if Chrome is not installed and expect that wall.
    channel: "chrome",
    headless: false,
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
  });

  const page = context.pages()[0] ?? (await context.newPage());

  log("opening gemini.google.com …");
  await page.goto("https://gemini.google.com/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);

  if (firstRun) {
    log("");
    log("FIRST RUN — log into your Google account in the window that opened.");
    log("The session is saved to .gemini-profile/ and reused next time.");
    log("");
  }

  // An "Upgrade" button means this session is on a free account, and the whole
  // point of driving the UI is to use a subscription that has no API. Worth
  // saying before spending a run discovering the model refuses.
  const upgrade = await page
    .locator('button:has-text("Upgrade"), a:has-text("Upgrade")')
    .first()
    .isVisible()
    .catch(() => false);
  if (upgrade) {
    log('WARNING: an "Upgrade" control is visible — this session looks like a FREE account.');
    log("         Switch to the account that has Pro (avatar, bottom-left) or image");
    log("         generation may be unavailable or limited.");
  }

  if (args.probe || !args.id) {
    await probe(page);
    log("");
    log(args.id ? "" : "No --id given, so nothing was generated.");
    log("Pausing — Inspector open. Resume or close it to end.");
    await page.pause();
    await context.close();
    return;
  }

  // ---- generate -----------------------------------------------------------

  const slot = slotPrompt(args.id);
  if (!slot) throw new Error(`no manifest slot named "${args.id}".`);
  const text = flatten(slot.prompt);

  log(`slot   : ${slot.page}/${slot.id} (${slot.width}x${slot.height})`);
  log(`prompt : ${text.slice(0, 120)}…`);

  const box = await firstVisible(page, SEL.prompt);
  if (!box) throw new Error("could not find the prompt box — re-run with --probe.");
  log(`found prompt box via: ${box.selector}`);

  await box.locator.click();
  // insertText rather than type(): it does not fire per-character key handling,
  // so the editor's Enter-to-send cannot trip partway through.
  await page.keyboard.insertText(text);
  await page.waitForTimeout(500);

  const send = await firstVisible(page, SEL.submit, 8000);
  if (send) {
    log(`submitting via: ${send.selector}`);
    await send.locator.click();
  } else {
    log("no send button matched — falling back to Enter.");
    await page.keyboard.press("Enter");
  }

  log("waiting for the image (up to 3 minutes) …");
  const deadline = Date.now() + 180000;
  let shot = null;
  while (Date.now() < deadline) {
    await page.waitForTimeout(3000);
    const imgs = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("img")) {
        const r = el.getBoundingClientRect();
        const src = el.currentSrc || el.src || "";
        if (r.width < 300 || r.height < 200) continue;
        if (!/^https?:|^blob:|^data:/.test(src)) continue;
        out.push({ src, w: Math.round(r.width), h: Math.round(r.height) });
      }
      return out;
    });
    if (imgs.length) {
      shot = imgs[imgs.length - 1];
      break;
    }
  }

  if (!shot) {
    log("no image appeared. Probing so we can see what the page did instead:");
    await probe(page);
    log("Pausing — inspect, then resume to close.");
    await page.pause();
    await context.close();
    process.exitCode = 1;
    return;
  }

  log(`image on page: ${shot.w}x${shot.h} ${shot.src.slice(0, 80)}…`);

  // Pull the bytes through the page's own session rather than hunting for a
  // download button: the <img> is already rendered and authenticated, and a
  // fetch from the page context needs no extra selector to rot.
  const b64 = await page.evaluate(async (src) => {
    const res = await fetch(src);
    const buf = await res.arrayBuffer();
    let s = "";
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }, shot.src);

  const outFile = path.join(DOWNLOAD_DIR, `${args.id}.png`);
  fs.writeFileSync(outFile, Buffer.from(b64, "base64"));
  log(`✓ saved ${(fs.statSync(outFile).size / 1024).toFixed(0)} KB -> ${path.relative(ROOT, outFile)}`);
  log("");
  log("Next:");
  log(`  npm run images:import -- --id ${args.id} --file "${path.relative(ROOT, outFile)}"`);

  if (args["keep-open"]) {
    log("--keep-open: pausing. Resume to close.");
    await page.pause();
  }
  await context.close();
}

main().catch((e) => {
  console.error("[gemini] Fatal:", e.message);
  process.exit(1);
});
