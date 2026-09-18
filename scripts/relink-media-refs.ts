// Rewrite legacy /uploads/… media references to their Cloudinary URLs, in BOTH
// contentHtml and contentJson.
//
// Why this exists separately from migrate-media-to-cloudinary.ts: that script
// rewrites Media.url, Media.variantsJson and contentHtml — but not contentJson.
// contentJson is the TipTap document the editor loads, and contentHtml is
// regenerated from it on save, so a stale ref there is a landmine: the broken
// /uploads/ URL reappears the next time anyone edits the post. Under
// STORAGE_DRIVER=cloudinary the /uploads route 404s, so those images break.
//
// Every replacement is looked up in the Media table (rows + their variants), so
// it only ever points at an asset that was genuinely uploaded — never a guess.
//
//   DRY_RUN=1 npm run relink:media    # report only
//   npm run relink:media              # apply
//
// Idempotent: re-running finds nothing once clean.
import 'dotenv/config';
import { prisma } from '../src/lib/db';

const DRY = process.env.DRY_RUN === '1';
const CLOUD_RE = /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(.+)$/;
// Matches the stored root-relative form and the basePath-prefixed variant.
const REF_RE = /(?:\/blog)?\/uploads\/([A-Za-z0-9._\-/]+)/g;

interface Variant { key?: string; url?: string }

function keyOf(cloudUrl: string): string | null {
  const m = CLOUD_RE.exec(cloudUrl);
  return m ? m[1] : null;
}

async function buildMap(): Promise<Map<string, string>> {
  const media = await prisma.media.findMany({ select: { url: true, variantsJson: true } });
  const byKey = new Map<string, string>();
  for (const m of media) {
    const k = keyOf(m.url);
    if (k) byKey.set(k, m.url);
    const vs = Array.isArray(m.variantsJson) ? (m.variantsJson as Variant[]) : [];
    for (const v of vs) {
      if (!v.url) continue;
      const vk = keyOf(v.url);
      if (vk) byKey.set(vk, v.url);
      if (v.key) byKey.set(v.key, v.url); // storage key as stored at upload time
    }
  }
  return byKey;
}

function rewrite(text: string, byKey: Map<string, string>, misses: Set<string>): string {
  return text.replace(REF_RE, (whole, key: string) => {
    const hit = byKey.get(key);
    if (hit) return hit;
    misses.add(whole);
    return whole;
  });
}

async function main() {
  const byKey = await buildMap();
  console.log(`${DRY ? '[DRY RUN] ' : ''}key -> cloudinary map: ${byKey.size} entries\n`);

  const misses = new Set<string>();
  let htmlFixed = 0;
  let jsonFixed = 0;

  for (const kind of ['post', 'page'] as const) {
    const rows = kind === 'post'
      ? await prisma.post.findMany({ select: { id: true, slug: true, contentHtml: true, contentJson: true } })
      : await prisma.page.findMany({ select: { id: true, slug: true, contentHtml: true, contentJson: true } });

    for (const r of rows) {
      const html = r.contentHtml ?? '';
      const jsonText = JSON.stringify(r.contentJson ?? null);

      const nextHtml = rewrite(html, byKey, misses);
      const nextJsonText = rewrite(jsonText, byKey, misses);

      const htmlChanged = nextHtml !== html;
      const jsonChanged = nextJsonText !== jsonText;
      if (!htmlChanged && !jsonChanged) continue;

      // Parse before writing: a malformed rewrite must fail loudly, not persist.
      const nextJson = jsonChanged ? JSON.parse(nextJsonText) : undefined;

      if (htmlChanged) htmlFixed += 1;
      if (jsonChanged) jsonFixed += 1;
      console.log(`  ${kind} ${r.slug}: ${htmlChanged ? 'html ' : ''}${jsonChanged ? 'json' : ''}`);

      if (DRY) continue;
      const data = {
        ...(htmlChanged ? { contentHtml: nextHtml } : {}),
        ...(jsonChanged ? { contentJson: nextJson } : {}),
      };
      if (kind === 'post') await prisma.post.update({ where: { id: r.id }, data });
      else await prisma.page.update({ where: { id: r.id }, data });
    }
  }

  console.log(`\n${DRY ? 'would fix' : 'fixed'}: ${htmlFixed} contentHtml, ${jsonFixed} contentJson`);
  if (misses.size) {
    console.log(`\nUNRESOLVED (${misses.size}) — no Media row holds these keys, left untouched:`);
    [...misses].slice(0, 20).forEach((m) => console.log(`   ${m}`));
    if (misses.size > 20) console.log(`   ... and ${misses.size - 20} more`);
    process.exitCode = 1;
  }
}

main()
  .catch((e) => { console.error('ERR', (e as Error).message); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
