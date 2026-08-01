import 'server-only';
import { JSDOM } from 'jsdom';
import { generateJSON, generateHTML } from '@tiptap/html/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '../db';
import { Prisma } from '@/generated/prisma/client';
import { baseExtensions } from '../tiptap/extensions';
import { sanitizeHtml, contentStats, deriveExcerpt, htmlToText } from '../content/render';
import { slugify, ensureUniqueSlug } from '../content/slug';
import { processAndStoreImage } from '../media/process';
import type { ContentStatus } from '@/generated/prisma/enums';

// Importer for the WordPress REST API (wp-json/wp/v2). Pulls posts with
// _embed (author, featured media, terms), re-hosts every image as WebP into the
// media library, rewrites content URLs, and maps into the schema. Idempotent by
// slug. Designed to run from a CLI script (no HTTP timeout).

export interface RestImportOptions {
  baseUrl: string; // e.g. https://www.softsuave.com/blog
  uploaderId: string; // admin user id that owns uploaded media
  limit?: number; // max posts (for testing); omit for all
  sample?: number; // import a RANDOM sample of this many posts (ignores limit/paging)
  onProgress?: (msg: string) => void;
}

export interface RestImportSummary {
  posts: number;
  skipped: number;
  categories: number;
  tags: number;
  media: number;
  authors: number;
  errors: string[];
  /** Slugs of posts created this run (for on-demand revalidation). */
  slugs: string[];
}

interface WpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}
interface WpAuthor {
  id: number;
  name: string;
  description?: string;
  avatar_urls?: Record<string, string>;
}
interface WpMedia {
  source_url?: string;
  alt_text?: string;
}
interface WpPost {
  id: number;
  slug: string;
  status: string;
  date_gmt: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    author?: WpAuthor[];
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: WpTerm[][];
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 SoftSuaveBlogImporter/1.0' } });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  // Some WP plugins prepend stray HTML comments before the JSON body.
  const text = await res.text();
  const start = text.search(/[[{]/);
  return JSON.parse(start > 0 ? text.slice(start) : text) as T;
}

/**
 * Normalise WordPress/Gutenberg content so it maps 1:1 onto our editor nodes.
 * Grounded in the real softsuave.com/blog markup:
 *  - strip the embedded Easy-TOC entirely (container + inline anchor spans) — we
 *    auto-generate the TOC from headings;
 *  - convert the Yoast FAQ block (.wp-block-yoast-faq-block / .schema-faq) into our
 *    <section class="faq"> native-<details> accordion, so it round-trips into the
 *    faq node and emits FAQPage schema on our pages (matches the old site's SEO);
 *  - convert the red-bordered "TL;DR" / "Key Takeaways" columns to our .callout box;
 *  - strip leftover shortcodes (Visual Composer, Divi).
 */
export function normalizeWpContent(html: string): string {
  const cleaned = html
    .replace(/\[\/?vc_[^\]]*\]/gi, '')
    .replace(/\[\/?et_pb[^\]]*\]/gi, '')
    .replace(/\[caption[^\]]*\]|\[\/caption\]/gi, '');

  const dom = new JSDOM(`<body>${cleaned}</body>`);
  const doc = dom.window.document;

  // 1. Remove Easy-TOC: the container/nav AND the inline <span class="ez-toc-section">
  //    anchors injected inside every heading.
  doc.querySelectorAll('[class*="ez-toc"], [id^="ez-toc"]').forEach((el) => el.remove());

  // 2. Yoast FAQ block → our faq section (native <details>/<summary> accordion).
  doc.querySelectorAll('.wp-block-yoast-faq-block, .schema-faq').forEach((block) => {
    const section = doc.createElement('section');
    section.className = 'faq';
    block.querySelectorAll('.schema-faq-section').forEach((qa) => {
      const q = qa.querySelector('.schema-faq-question')?.textContent?.trim();
      const answerEl = qa.querySelector('.schema-faq-answer');
      if (!q || !answerEl) return;
      const details = doc.createElement('details');
      details.className = 'faq-item';
      const summary = doc.createElement('summary');
      summary.textContent = q;
      const answer = doc.createElement('div');
      answer.className = 'faq-answer';
      const inner = answerEl.innerHTML.trim();
      // Ensure block-level answer content (paragraph) so it parses as a node.
      answer.innerHTML = /^<(p|ul|ol|div|h[2-6]|blockquote|table)/i.test(inner) ? inner : `<p>${inner}</p>`;
      details.appendChild(summary);
      details.appendChild(answer);
      section.appendChild(details);
    });
    if (section.children.length) block.replaceWith(section);
    else block.remove();
  });

  // 3. Red-bordered "TL;DR" / "Key Takeaways" columns → our .callout box (unwrap the
  //    inner Gutenberg column so only the content survives). TL;DR boxes get the
  //    distinct callout-tldr variant.
  doc.querySelectorAll('.wp-block-columns.has-border-color, .wp-block-group.is-style-callout').forEach((el) => {
    const inner = el.querySelector('.wp-block-column') ?? el;
    const label = (inner.querySelector('strong')?.textContent ?? '').toLowerCase();
    const variant = /tl;?dr/.test(label) ? 'callout-tldr' : 'callout-note';
    const box = doc.createElement('div');
    box.className = `callout ${variant}`;
    box.innerHTML = inner.innerHTML;
    el.replaceWith(box);
  });

  // 4. WordPress CTA panels → our decorative ctaSection block. The marker is a
  //    <div class="wp-block-buttons cta_btn"> inside a wp-block-group; the group
  //    holds a <p><strong> title, a plain <p> description, and the button. Runs
  //    before the generic button conversion (which handles standalone buttons).
  doc.querySelectorAll('.wp-block-buttons.cta_btn').forEach((buttons) => {
    const a = buttons.querySelector('a');
    const container = buttons.closest('.wp-block-group') ?? buttons.parentElement;
    if (!a || !container) return;
    const paras = Array.from(container.querySelectorAll('p'));
    const titleP = paras.find((p) => p.querySelector('strong'));
    const title = (titleP?.textContent ?? '').trim();
    if (!title) return;
    const textP = paras.find((p) => p !== titleP && (p.textContent ?? '').trim());
    const text = (textP?.textContent ?? '').trim();

    const section = doc.createElement('section');
    section.className = 'cta-section';
    const inner = doc.createElement('div');
    inner.className = 'cta-section-inner';
    const t = doc.createElement('p');
    t.className = 'cta-section-title';
    t.textContent = title;
    inner.appendChild(t);
    if (text) {
      const x = doc.createElement('p');
      x.className = 'cta-section-text';
      x.textContent = text;
      inner.appendChild(x);
    }
    const btn = doc.createElement('a');
    btn.className = 'cta-btn cta-primary';
    btn.setAttribute('href', a.getAttribute('href') ?? '#');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.textContent = (a.textContent ?? '').trim() || 'Get Started';
    inner.appendChild(btn);
    section.appendChild(inner);
    container.replaceWith(section);
  });

  // 5. Remaining standalone WordPress buttons → our CTA button node. Set the class
  //    our ctaButton node parses (a.cta-btn) and unwrap the Gutenberg wrappers so
  //    the anchor sits at block level.
  doc.querySelectorAll('a.wp-block-button__link').forEach((a) => {
    const outline = !!(a as HTMLElement).closest('.is-style-outline');
    a.setAttribute('class', `cta-btn cta-${outline ? 'outline' : 'primary'}`);
    a.removeAttribute('style');
    const btn = (a as HTMLElement).closest('.wp-block-button');
    if (btn) btn.replaceWith(a);
  });
  doc.querySelectorAll('.wp-block-buttons').forEach((wrap) => {
    wrap.replaceWith(...Array.from(wrap.childNodes));
  });

  // 5. Clean polluted alt text (WordPress/screen-reader leakage) — better for SEO
  //    and accessibility; cap at a sensible length.
  doc.querySelectorAll('img[alt]').forEach((img) => {
    img.setAttribute('alt', cleanAlt(img.getAttribute('alt') ?? ''));
  });

  // 6. Drop empty paragraphs left behind by shortcode/ez-toc stripping.
  doc.querySelectorAll('p').forEach((p) => {
    if (!p.textContent?.trim() && p.children.length === 0) p.remove();
  });

  return doc.body.innerHTML;
}

/**
 * If `href` points to a single-segment post URL under the old blog base
 * (e.g. https://www.softsuave.com/blog/my-post/), return its slug; otherwise null.
 * Category/tag/author/page links and off-site links return null.
 */
function internalPostSlug(href: string, baseUrl: string): string | null {
  try {
    const u = new URL(href);
    const b = new URL(baseUrl);
    if (u.host.replace(/^www\./, '') !== b.host.replace(/^www\./, '')) return null;
    const basePath = b.pathname.replace(/\/+$/, ''); // e.g. /blog
    if (!u.pathname.startsWith(`${basePath}/`)) return null;
    const rest = u.pathname.slice(basePath.length + 1).replace(/\/+$/, '');
    if (!rest || rest.includes('/')) return null; // only top-level post slugs
    if (['category', 'tag', 'author', 'page', 'wp-content'].includes(rest)) return null;
    return rest;
  } catch {
    return null;
  }
}

/** Rewrite link-mark + CTA hrefs in a TipTap doc via `rewrite` (null = leave). */
function rewriteLinksInJson(node: JSONContent, rewrite: (href: string) => string | null): boolean {
  let changed = false;
  if (Array.isArray(node.marks)) {
    for (const m of node.marks) {
      const href = m?.attrs?.href;
      if (m?.type === 'link' && typeof href === 'string') {
        const next = rewrite(href);
        if (next) {
          m.attrs!.href = next;
          changed = true;
        }
      }
    }
  }
  if (node.type === 'ctaButton' && typeof node.attrs?.href === 'string') {
    const next = rewrite(node.attrs.href);
    if (next) {
      node.attrs.href = next;
      changed = true;
    }
  }
  if (Array.isArray(node.content)) {
    for (const child of node.content) if (rewriteLinksInJson(child, rewrite)) changed = true;
  }
  return changed;
}

/** Strip screen-reader/plugin noise that WordPress sometimes bakes into alt text. */
function cleanAlt(alt: string): string {
  return alt
    .replace(/Turn on screen reader support[\s\S]*$/i, '')
    .replace(/To enable screen reader support[\s\S]*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 125);
}

interface PostSeo {
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  noIndex: boolean;
}

function stripSiteSuffix(title: string): string {
  return title.replace(/\s*[|\-–]\s*Soft ?Suave.*$/i, '').trim();
}

/** Scrape Yoast SEO from the rendered post <head> (not exposed via the REST API). */
async function fetchSeo(url: string): Promise<PostSeo> {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const head = html.slice(0, html.search(/<\/head>/i) + 1);
    const grab = (re: RegExp) => head.match(re)?.[1]?.trim() ?? null;
    const titleRaw = grab(/<title>([\s\S]*?)<\/title>/i);
    return {
      seoTitle: titleRaw ? stripSiteSuffix(decodeEntities(titleRaw)) : null,
      seoDescription: (() => {
        const d = grab(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
        return d ? decodeEntities(d) : null;
      })(),
      ogImageUrl: grab(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i),
      noIndex: /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(head),
    };
  } catch {
    return { seoTitle: null, seoDescription: null, ogImageUrl: null, noIndex: false };
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#0?38;/g, '&')
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'");
}

/** Total posts available on the source WordPress site (from the X-WP-Total header). */
export async function fetchWpTotal(baseUrl: string): Promise<number> {
  const base = baseUrl.replace(/\/+$/, '');
  const res = await fetch(`${base}/wp-json/wp/v2/posts?per_page=1`, {
    headers: { 'user-agent': 'Mozilla/5.0 SoftSuaveBlogImporter/1.0' },
  });
  return Number(res.headers.get('x-wp-total') ?? 0);
}

export async function importWordpressRest(opts: RestImportOptions): Promise<RestImportSummary> {
  const base = opts.baseUrl.replace(/\/+$/, '');
  const api = `${base}/wp-json/wp/v2`;
  const log = opts.onProgress ?? (() => {});
  const summary: RestImportSummary = { posts: 0, skipped: 0, categories: 0, tags: 0, media: 0, authors: 0, errors: [], slugs: [] };

  // Caches keyed by remote URL / WP id.
  const mediaByUrl = new Map<string, string>(); // remote url → new url
  const authorByWpId = new Map<number, string>(); // wp author id → our user id
  const categoryBySlug = new Map<string, string>();
  const tagBySlug = new Map<string, string>();
  for (const c of await prisma.category.findMany({ select: { id: true, slug: true } })) categoryBySlug.set(c.slug, c.id);
  for (const t of await prisma.tag.findMany({ select: { id: true, slug: true } })) tagBySlug.set(t.slug, t.id);

  async function rehostImage(url: string, alt: string): Promise<string | null> {
    if (mediaByUrl.has(url)) return mediaByUrl.get(url)!;
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'SoftSuaveBlogImporter/1.0' } });
      if (!res.ok) throw new Error(`img ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const processed = await processAndStoreImage(buf, url.split('/').pop()?.split('?')[0]);
      await prisma.media.create({
        data: {
          url: processed.url,
          filename: url.split('/').pop() || 'import',
          altText: alt || 'Imported image',
          mimeType: processed.mimeType,
          width: processed.width,
          height: processed.height,
          sizeBytes: processed.sizeBytes,
          variantsJson: processed.variants as unknown as Prisma.InputJsonValue,
          uploadedById: opts.uploaderId,
        },
      });
      mediaByUrl.set(url, processed.url);
      summary.media += 1;
      return processed.url;
    } catch (e) {
      summary.errors.push(`image ${url}: ${(e as Error).message}`);
      return null;
    }
  }

  async function ensureAuthor(a: WpAuthor | undefined): Promise<string> {
    // Author data is often restricted via REST (returns an error object, not an
    // author). Fall back to the importing admin when name isn't available.
    if (!a || typeof a !== 'object' || 'code' in a || !a.name || typeof a.name !== 'string') {
      return opts.uploaderId;
    }
    if (authorByWpId.has(a.id)) return authorByWpId.get(a.id)!;
    const email = `wp-author-${a.id}@softsuave.imported`;
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) {
      authorByWpId.set(a.id, existing.id);
      return existing.id;
    }
    // Download the largest avatar if present.
    let avatarMediaId: string | null = null;
    const avatarUrl = a.avatar_urls ? Object.values(a.avatar_urls).pop() : undefined;
    if (avatarUrl) {
      const url = await rehostImage(avatarUrl.replace(/&#038;|&amp;/g, '&'), `${a.name} avatar`);
      if (url) {
        const m = await prisma.media.findFirst({ where: { url }, select: { id: true } });
        avatarMediaId = m?.id ?? null;
      }
    }
    const user = await prisma.user.create({
      data: {
        email,
        name: decodeEntities(a.name),
        role: 'EDITOR',
        passwordHash: 'imported-no-login', // non-verifiable hash → cannot log in until reset
        bio: a.description ? decodeEntities(a.description) : null,
        avatarMediaId,
      },
      select: { id: true },
    });
    authorByWpId.set(a.id, user.id);
    summary.authors += 1;
    return user.id;
  }

  async function ensureCategory(t: WpTerm): Promise<string> {
    const slug = t.slug || slugify(t.name);
    if (categoryBySlug.has(slug)) return categoryBySlug.get(slug)!;
    const created = await prisma.category.create({ data: { name: decodeEntities(t.name), slug } });
    categoryBySlug.set(slug, created.id);
    summary.categories += 1;
    return created.id;
  }
  async function ensureTag(t: WpTerm): Promise<string> {
    const slug = t.slug || slugify(t.name);
    if (tagBySlug.has(slug)) return tagBySlug.get(slug)!;
    const created = await prisma.tag.create({ data: { name: decodeEntities(t.name), slug } });
    tagBySlug.set(slug, created.id);
    summary.tags += 1;
    return created.id;
  }

  async function rewriteImages(html: string): Promise<string> {
    // Strip srcset (point only at re-hosted src), then rehost each unique src.
    let out = html.replace(/\s+srcset="[^"]*"/gi, '').replace(/\s+sizes="[^"]*"/gi, '');
    const srcs = new Set<string>();
    for (const m of out.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)) srcs.add(m[1]);
    for (const src of srcs) {
      if (!/^https?:\/\//.test(src)) continue;
      const newUrl = await rehostImage(src, '');
      if (newUrl) out = out.split(src).join(newUrl);
    }
    return out;
  }

  async function importPost(post: WpPost): Promise<void> {
    const baseSlug = post.slug || slugify(post.title.rendered);
    if ((await prisma.post.count({ where: { slug: baseSlug } })) > 0) {
      summary.skipped += 1;
      return;
    }

    const authorId = await ensureAuthor(post._embedded?.author?.[0]);

    const terms = post._embedded?.['wp:term'] ?? [];
    const catIds: string[] = [];
    const tagIds: string[] = [];
    for (const group of terms) {
      for (const t of group) {
        if (t.taxonomy === 'category') catIds.push(await ensureCategory(t));
        else if (t.taxonomy === 'post_tag') tagIds.push(await ensureTag(t));
      }
    }

    // Featured image → cover.
    let coverImageId: string | null = null;
    const featured = post._embedded?.['wp:featuredmedia']?.[0];
    if (featured?.source_url) {
      const url = await rehostImage(featured.source_url, featured.alt_text || post.title.rendered);
      if (url) {
        const m = await prisma.media.findFirst({ where: { url }, select: { id: true } });
        coverImageId = m?.id ?? null;
      }
    }

    // Content: normalize WP blocks, demote h1→h2, rewrite images, sanitize, → TipTap JSON.
    const normalized = normalizeWpContent(post.content.rendered).replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');
    const withImages = await rewriteImages(normalized);
    // Parse to TipTap JSON, then render contentHtml FROM that JSON — the same
    // canonical path the editor's publish uses (generateHTML + sanitize), but via
    // the Node-safe @tiptap/html/server entry. Guarantees import output == publish
    // output: clean <h2> (so the TOC builds), our block markup (callout/faq/tldr),
    // and no leftover WordPress wrapper classes.
    const contentJson = generateJSON(withImages, baseExtensions) as JSONContent;
    const contentHtml = sanitizeHtml(generateHTML(contentJson, baseExtensions));
    const { wordCount, readingTimeMinutes } = contentStats(contentHtml);
    const excerptText = post.excerpt.rendered ? htmlToText(post.excerpt.rendered) : '';
    const excerpt = excerptText || (contentHtml ? deriveExcerpt(contentHtml) : null);

    // SEO — scraped from the rendered <head> (Yoast) and preserved as-is.
    const seo = await fetchSeo(post.link);
    let ogImageId: string | null = null;
    if (seo.ogImageUrl) {
      const url = await rehostImage(seo.ogImageUrl, `${post.title.rendered} OG image`);
      if (url) ogImageId = (await prisma.media.findFirst({ where: { url }, select: { id: true } }))?.id ?? null;
    }

    const status: ContentStatus = post.status === 'publish' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = status === 'PUBLISHED' ? new Date(`${post.date_gmt}Z`) : null;
    const slug = await ensureUniqueSlug(baseSlug, async (s) => (await prisma.post.count({ where: { slug: s } })) > 0);

    await prisma.post.create({
      data: {
        title: decodeEntities(post.title.rendered),
        slug,
        contentJson: contentJson as unknown as Prisma.InputJsonValue,
        contentHtml,
        excerpt,
        status,
        publishedAt,
        authorId,
        coverImageId,
        ogImageId,
        seoTitle: seo.seoTitle,
        seoDescription: seo.seoDescription,
        noIndex: seo.noIndex,
        readingTimeMinutes,
        wordCount,
        categories: catIds.length ? { create: [...new Set(catIds)].map((categoryId) => ({ categoryId })) } : undefined,
        tags: tagIds.length ? { create: [...new Set(tagIds)].map((tagId) => ({ tagId })) } : undefined,
      },
    });
    summary.posts += 1;
    summary.slugs.push(slug);
  }

  // After importing, re-point internal blog links (to posts we actually have) at
  // our relative URLs. Runs against the full post set so cross-references between
  // posts imported in the same run resolve regardless of order. Off-site links
  // (main site, third-party) and links to posts we don't have are left untouched.
  async function reconcileInternalLinks() {
    if (!summary.slugs.length) return;
    const known = new Set((await prisma.post.findMany({ select: { slug: true } })).map((p) => p.slug));
    let fixed = 0;
    for (const slug of summary.slugs) {
      const post = await prisma.post.findUnique({ where: { slug }, select: { id: true, contentJson: true } });
      if (!post) continue;
      const doc = JSON.parse(JSON.stringify(post.contentJson)) as JSONContent;
      const changed = rewriteLinksInJson(doc, (href) => {
        const s = internalPostSlug(href, base);
        return s && known.has(s) ? `/${s}` : null;
      });
      if (changed) {
        const contentHtml = sanitizeHtml(generateHTML(doc, baseExtensions));
        await prisma.post.update({
          where: { id: post.id },
          data: { contentJson: doc as unknown as Prisma.InputJsonValue, contentHtml },
        });
        fixed += 1;
      }
    }
    if (fixed) log(`re-pointed internal links in ${fixed} post(s)`);
  }

  // Random sample: collect all post ids, shuffle, then import the chosen subset.
  if (opts.sample && opts.sample > 0) {
    const ids: number[] = [];
    for (let pg = 1; ; pg++) {
      let batch: { id: number }[];
      try {
        batch = await fetchJson<{ id: number }[]>(`${api}/posts?per_page=100&page=${pg}&_fields=id&orderby=date&order=desc`);
      } catch (e) {
        if (!(e as Error).message.includes('400')) summary.errors.push(`ids page ${pg}: ${(e as Error).message}`);
        break;
      }
      if (!batch.length) break;
      ids.push(...batch.map((b) => b.id));
      if (batch.length < 100) break;
    }
    // Fisher–Yates shuffle, then take the sample.
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    const picked = ids.slice(0, opts.sample);
    log(`sampling ${picked.length} random of ${ids.length} total posts`);
    if (picked.length) {
      const batch = await fetchJson<WpPost[]>(`${api}/posts?include=${picked.join(',')}&per_page=${picked.length}&_embed=1`);
      let n = 0;
      for (const post of batch) {
        try {
          await importPost(post);
        } catch (e) {
          summary.errors.push(`post ${post.slug}: ${(e as Error).message}`);
        }
        n += 1;
        log(`(${n}/${batch.length}) ${post.slug} — posts:${summary.posts} media:${summary.media} skipped:${summary.skipped}`);
      }
    }
    await reconcileInternalLinks();
    return summary;
  }

  let page = 1;
  const perPage = 20;
  let processed = 0;
  for (;;) {
    // `limit` caps NEWLY imported posts — already-imported ones are skipped and do
    // not count, so running batches repeatedly keeps advancing through the archive.
    if (opts.limit && summary.posts >= opts.limit) break;
    let batch: WpPost[];
    try {
      batch = await fetchJson<WpPost[]>(`${api}/posts?per_page=${perPage}&page=${page}&_embed=1&orderby=date&order=desc`);
    } catch (e) {
      if ((e as Error).message.includes('400')) break; // past the last page
      summary.errors.push(`page ${page}: ${(e as Error).message}`);
      break;
    }
    if (batch.length === 0) break;
    for (const post of batch) {
      if (opts.limit && summary.posts >= opts.limit) break;
      try {
        await importPost(post);
      } catch (e) {
        summary.errors.push(`post ${post.slug}: ${(e as Error).message}`);
      }
      processed += 1;
      log(`(${processed}) ${post.slug} — imported:${summary.posts} media:${summary.media} skipped:${summary.skipped}`);
    }
    page += 1;
  }

  await reconcileInternalLinks();
  return summary;
}
