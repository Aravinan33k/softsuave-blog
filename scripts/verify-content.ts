// Content verification harness — grades what is actually in the database.
//
// Written to be the gate before pointing nginx at this app: everything it checks
// is something a reader or Googlebot would hit on day one. It reads the database
// directly, so it needs no running server and no WordPress access.
//
//   npm run verify:content              # all checks, HTTP probes included
//   npm run verify:content -- --no-http # skip network probes (fast, CI-friendly)
//
// Exit code 1 if any check fails, so it can gate a deploy.
import 'dotenv/config';
import { prisma } from '../src/lib/db';

const SKIP_HTTP = process.argv.includes('--no-http');
const CONCURRENCY = 8;

interface Failure {
  check: string;
  slug: string;
  detail: string;
}

const failures: Failure[] = [];
const fail = (check: string, slug: string, detail: string) => failures.push({ check, slug, detail });

/** Shortcodes that mean a page-builder payload leaked through un-rendered. */
const SHORTCODE_RE = /\[(?:vc_|et_|ez-toc|elementor|caption|gallery|embed)[^\]]*\]/gi;
/** Any bracket token that looks like an unresolved shortcode, for the long tail. */
const GENERIC_SHORTCODE_RE = /\[\/?[a-z][a-z0-9_-]{2,30}(?:\s[^\]]{0,120})?\]/gi;

function textOf(html: string): string {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function attrs(html: string, tag: string, attr: string): string[] {
  const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*["']([^"']+)["']`, 'gi');
  return [...html.matchAll(re)].map((m) => m[1]);
}

async function probe(url: string): Promise<number> {
  try {
    const r = await fetch(url, { method: 'GET', headers: { range: 'bytes=0-0' } });
    return r.status;
  } catch {
    return 0;
  }
}

async function probeAll(urls: string[]): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  const queue = [...urls];
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
      for (let u = queue.pop(); u; u = queue.pop()) out.set(u, await probe(u));
    }),
  );
  return out;
}

async function main() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      slug: true, title: true, contentHtml: true, contentJson: true, excerpt: true, publishedAt: true,
      seoTitle: true, seoDescription: true, coverImageId: true, wordCount: true,
    },
    orderBy: { publishedAt: 'asc' },
  });
  const pages = await prisma.page.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, title: true, contentHtml: true, contentJson: true },
  });

  console.log(`Checking ${posts.length} published post(s) and ${pages.length} page(s)\n`);

  const slugs = new Set<string>([...posts.map((p) => p.slug), ...pages.map((p) => p.slug)]);
  const remoteImages = new Set<string>();

  for (const p of [...posts, ...pages.map((g) => ({ ...g, excerpt: null, publishedAt: new Date(), seoTitle: null, seoDescription: null, coverImageId: null, wordCount: 0 }))]) {
    const html = p.contentHtml ?? '';

    // 1. Empty or near-empty bodies — an import that "succeeded" but lost the body.
    const text = textOf(html);
    if (text.length < 200) fail('empty-body', p.slug, `body text only ${text.length} chars`);

    // 2. Page-builder shortcodes that survived the import.
    const known = html.match(SHORTCODE_RE);
    if (known) fail('shortcode', p.slug, `${known.length}x e.g. ${known[0].slice(0, 40)}`);
    else {
      const generic = [...new Set((html.match(GENERIC_SHORTCODE_RE) ?? []).map((s) => s.toLowerCase()))];
      if (generic.length) fail('shortcode-maybe', p.slug, generic.slice(0, 3).join(' '));
    }

    // 3. Legacy media paths. Post-Cloudinary these must all be absolute CDN URLs.
    if (/["'(](?:\/blog)?\/uploads\//.test(html)) fail('legacy-uploads', p.slug, 'contentHtml still references /uploads/');
    if (/wp-content/.test(html)) fail('wp-content', p.slug, 'contentHtml still references wp-content');

    // 3b. Same check on contentJson. This is the editor's source of truth and
    // contentHtml is regenerated from it, so a stale ref here is a live landmine:
    // it reappears in the HTML the next time anyone saves the post. The media
    // migration only ever rewrote contentHtml, so these can diverge.
    const json = JSON.stringify(p.contentJson ?? {});
    if (/(?:\\?\/blog)?\\?\/uploads\\?\//.test(json)) fail('legacy-uploads-json', p.slug, 'contentJson still references /uploads/');
    if (/wp-content/.test(json)) fail('wp-content-json', p.slug, 'contentJson still references wp-content');

    // 4. Images: collect for probing, and catch structural problems.
    for (const src of attrs(html, 'img', 'src')) {
      if (src.startsWith('data:')) continue;
      if (/^https?:\/\//.test(src)) remoteImages.add(src);
      else fail('relative-img', p.slug, `non-absolute img src: ${src.slice(0, 60)}`);
    }
    for (const [i, img] of [...html.matchAll(/<img\b[^>]*>/gi)].entries()) {
      if (!/\balt\s*=/.test(img[0])) fail('img-alt', p.slug, `img #${i + 1} has no alt attribute`);
    }

    // 5. Internal links must resolve to a slug we actually hold.
    for (const href of attrs(html, 'a', 'href')) {
      const m = /^(?:https?:\/\/(?:www\.)?softsuave\.com)?\/blog\/([a-z0-9-]+)\/?$/i.exec(href);
      if (m && !slugs.has(m[1])) fail('dead-internal-link', p.slug, `-> /blog/${m[1]}`);
    }
  }

  // 6. Post-only metadata checks.
  for (const p of posts) {
    if (!p.publishedAt) fail('no-publish-date', p.slug, 'PUBLISHED but publishedAt is null');
    if (!p.seoTitle && !p.title) fail('no-title', p.slug, 'no seoTitle and no title');
    if (!p.seoDescription && !p.excerpt) fail('no-meta-description', p.slug, 'neither seoDescription nor excerpt');
    if (!p.coverImageId) fail('no-cover', p.slug, 'no cover image (card + OG fall back)');
    if (p.wordCount === 0) fail('zero-wordcount', p.slug, 'wordCount 0 — reading time will read as 0 min');
  }

  // 7. Duplicate titles often mean a re-import created a second copy.
  const byTitle = new Map<string, string[]>();
  for (const p of posts) {
    const k = p.title.trim().toLowerCase();
    byTitle.set(k, [...(byTitle.get(k) ?? []), p.slug]);
  }
  for (const [title, dupes] of byTitle) {
    if (dupes.length > 1) fail('duplicate-title', dupes.join(', '), `${dupes.length} posts share the title "${title.slice(0, 50)}"`);
  }

  // 8. Every referenced image must actually serve.
  if (!SKIP_HTTP && remoteImages.size) {
    console.log(`probing ${remoteImages.size} distinct image URL(s)...\n`);
    const results = await probeAll([...remoteImages]);
    for (const [url, status] of results) {
      if (status < 200 || status >= 400) fail('image-not-200', '(content)', `${status || 'network error'} ${url.slice(0, 90)}`);
    }
  } else if (SKIP_HTTP) {
    console.log(`skipping HTTP probes (${remoteImages.size} image URLs unchecked)\n`);
  }

  // Report, grouped by check.
  const grouped = new Map<string, Failure[]>();
  for (const f of failures) grouped.set(f.check, [...(grouped.get(f.check) ?? []), f]);

  if (!grouped.size) {
    console.log('PASS — no issues found.');
    return;
  }
  console.log('FAILURES BY CHECK\n');
  for (const [check, list] of [...grouped.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${check}  (${list.length})`);
    for (const f of list.slice(0, 8)) console.log(`   ${f.slug}: ${f.detail}`);
    if (list.length > 8) console.log(`   ... and ${list.length - 8} more`);
    console.log();
  }
  console.log(`TOTAL: ${failures.length} issue(s) across ${grouped.size} check(s)`);
  process.exitCode = 1;
}

main()
  .catch((e) => { console.error('ERR', (e as Error).message); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
