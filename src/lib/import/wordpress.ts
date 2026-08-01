import 'server-only';
import { XMLParser } from 'fast-xml-parser';
import { generateJSON } from '@tiptap/html';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '../db';
import { Prisma } from '@/generated/prisma/client';
import { baseExtensions } from '../tiptap/extensions';
import { sanitizeHtml, contentStats, deriveExcerpt } from '../content/render';
import { slugify, ensureUniqueSlug } from '../content/slug';
import type { ContentStatus } from '@/generated/prisma/enums';

// WordPress WXR (XML export) importer. Maps categories, tags, attachments
// (as media, referencing their original URLs), and posts/pages into the schema.
// Content HTML is demoted h1→h2 (single-h1 rule), sanitized, and converted to
// TipTap JSON. Existing slugs are skipped (safe re-import).

export interface ImportSummary {
  categories: number;
  tags: number;
  media: number;
  posts: number;
  pages: number;
  skipped: number;
  errors: string[];
}

type AnyRec = Record<string, unknown>;

function toArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function text(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (typeof v === 'object' && '#text' in (v as AnyRec)) return String((v as AnyRec)['#text'] ?? '');
  return '';
}

function parseWpDate(s: string): Date | null {
  if (!s || s.startsWith('0000')) return null;
  const d = new Date(`${s.replace(' ', 'T')}Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function mapStatus(wpStatus: string, publishedAt: Date | null): { status: ContentStatus; publishedAt: Date | null } {
  if (wpStatus === 'publish') return { status: 'PUBLISHED', publishedAt: publishedAt ?? new Date() };
  if (wpStatus === 'future' && publishedAt) return { status: 'SCHEDULED', publishedAt };
  return { status: 'DRAFT', publishedAt: null };
}

function htmlToContent(rawHtml: string) {
  // Demote h1 → h2 so the page/post title remains the single h1.
  const demoted = rawHtml.replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');
  const contentHtml = sanitizeHtml(demoted);
  const contentJson = generateJSON(demoted, baseExtensions) as JSONContent;
  const { wordCount, readingTimeMinutes } = contentStats(contentHtml);
  return { contentHtml, contentJson, wordCount, readingTimeMinutes };
}

export async function importWordpressWxr(xml: string, authorId: string): Promise<ImportSummary> {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', trimValues: true });
  const doc = parser.parse(xml) as AnyRec;
  const channel = (doc?.rss as AnyRec)?.channel as AnyRec | undefined;
  if (!channel) throw new Error('Not a valid WordPress WXR export (missing rss > channel).');

  const summary: ImportSummary = { categories: 0, tags: 0, media: 0, posts: 0, pages: 0, skipped: 0, errors: [] };

  // ── Terms: categories + tags (slug → id maps) ──────────────────────────────
  const categoryBySlug = new Map<string, string>();
  const tagBySlug = new Map<string, string>();
  for (const c of await prisma.category.findMany({ select: { id: true, slug: true } })) categoryBySlug.set(c.slug, c.id);
  for (const t of await prisma.tag.findMany({ select: { id: true, slug: true } })) tagBySlug.set(t.slug, t.id);

  async function ensureCategory(name: string, slug: string): Promise<string> {
    const s = slug || slugify(name);
    if (categoryBySlug.has(s)) return categoryBySlug.get(s)!;
    const created = await prisma.category.create({ data: { name: name || s, slug: s } });
    categoryBySlug.set(s, created.id);
    summary.categories += 1;
    return created.id;
  }
  async function ensureTag(name: string, slug: string): Promise<string> {
    const s = slug || slugify(name);
    if (tagBySlug.has(s)) return tagBySlug.get(s)!;
    const created = await prisma.tag.create({ data: { name: name || s, slug: s } });
    tagBySlug.set(s, created.id);
    summary.tags += 1;
    return created.id;
  }

  for (const c of toArray<AnyRec>(channel['wp:category'] as AnyRec[])) {
    await ensureCategory(text(c['wp:cat_name']), text(c['wp:category_nicename']));
  }
  for (const t of toArray<AnyRec>(channel['wp:tag'] as AnyRec[])) {
    await ensureTag(text(t['wp:tag_name']), text(t['wp:tag_slug']));
  }

  // ── Attachments → media (referencing original URLs) ────────────────────────
  const items = toArray<AnyRec>(channel.item as AnyRec[]);
  const mediaByWpId = new Map<string, string>();

  for (const item of items) {
    if (text(item['wp:post_type']) !== 'attachment') continue;
    const url = text(item['wp:attachment_url']);
    if (!url) continue;
    try {
      const postmeta = toArray<AnyRec>(item['wp:postmeta'] as AnyRec[]);
      const alt = postmeta.find((m) => text(m['wp:meta_key']) === '_wp_attachment_image_alt');
      const media = await prisma.media.create({
        data: {
          url,
          filename: url.split('/').pop() || 'import',
          altText: (alt ? text(alt['wp:meta_value']) : '') || text(item.title) || 'Imported image',
          uploadedById: authorId,
        },
      });
      mediaByWpId.set(text(item['wp:post_id']), media.id);
      summary.media += 1;
    } catch (e) {
      summary.errors.push(`media ${url}: ${(e as Error).message}`);
    }
  }

  // ── Posts + pages ──────────────────────────────────────────────────────────
  for (const item of items) {
    const type = text(item['wp:post_type']);
    if (type !== 'post' && type !== 'page') continue;

    try {
      const title = text(item.title) || 'Untitled';
      const baseSlug = text(item['wp:post_name']) || slugify(title);

      // Skip if a same-slug record already exists (idempotent re-import).
      const exists =
        type === 'post'
          ? await prisma.post.count({ where: { slug: baseSlug } })
          : await prisma.page.count({ where: { slug: baseSlug } });
      if (exists > 0) {
        summary.skipped += 1;
        continue;
      }

      const publishedAt = parseWpDate(text(item['wp:post_date_gmt']));
      const { status, publishedAt: pub } = mapStatus(text(item['wp:status']), publishedAt);
      const { contentHtml, contentJson, wordCount, readingTimeMinutes } = htmlToContent(text(item['content:encoded']));
      const excerpt = text(item['excerpt:encoded']) || (contentHtml ? deriveExcerpt(contentHtml) : null);

      // Featured image via _thumbnail_id → attachment.
      const meta = toArray<AnyRec>(item['wp:postmeta'] as AnyRec[]);
      const thumbId = meta.find((m) => text(m['wp:meta_key']) === '_thumbnail_id');
      const coverImageId = thumbId ? mediaByWpId.get(text(thumbId['wp:meta_value'])) ?? null : null;

      const slug = await ensureUniqueSlug(baseSlug, async (s) =>
        type === 'post'
          ? (await prisma.post.count({ where: { slug: s } })) > 0
          : (await prisma.page.count({ where: { slug: s } })) > 0,
      );

      // Assigned terms (inline <category domain=...>).
      const catIds: string[] = [];
      const tagIds: string[] = [];
      if (type === 'post') {
        for (const term of toArray<AnyRec>(item.category as AnyRec[])) {
          const domain = String(term['@_domain'] ?? '');
          const nicename = String(term['@_nicename'] ?? '');
          const name = text(term);
          if (domain === 'category') catIds.push(await ensureCategory(name, nicename));
          else if (domain === 'post_tag') tagIds.push(await ensureTag(name, nicename));
        }
      }

      const data = {
        title,
        slug,
        contentJson: contentJson as unknown as Prisma.InputJsonValue,
        contentHtml,
        excerpt,
        status,
        publishedAt: pub,
        authorId,
        coverImageId,
        readingTimeMinutes,
        wordCount,
      };

      if (type === 'post') {
        await prisma.post.create({
          data: {
            ...data,
            categories: catIds.length ? { create: [...new Set(catIds)].map((categoryId) => ({ categoryId })) } : undefined,
            tags: tagIds.length ? { create: [...new Set(tagIds)].map((tagId) => ({ tagId })) } : undefined,
          },
        });
        summary.posts += 1;
      } else {
        await prisma.page.create({ data });
        summary.pages += 1;
      }
    } catch (e) {
      summary.errors.push(`item "${text(item.title)}": ${(e as Error).message}`);
    }
  }

  return summary;
}
