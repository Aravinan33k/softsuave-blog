import 'server-only';
import TurndownService from 'turndown';
import { prisma } from '../db';

// Full-content export to JSON or Markdown, so the platform never becomes a new
// lock-in.

export async function buildJsonExport() {
  const [posts, pages, categories, tags, media, redirects, settings] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        author: { select: { email: true, name: true } },
        categories: { include: { category: { select: { slug: true } } } },
        tags: { include: { tag: { select: { slug: true } } } },
      },
    }),
    prisma.page.findMany({ orderBy: { createdAt: 'asc' }, include: { author: { select: { email: true, name: true } } } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' } }),
    prisma.media.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.redirect.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.siteSettings.findUnique({ where: { id: 'singleton' } }),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    version: 1,
    counts: { posts: posts.length, pages: pages.length, categories: categories.length, tags: tags.length, media: media.length },
    posts: posts.map((p) => ({
      ...p,
      categories: p.categories.map((c) => c.category.slug),
      tags: p.tags.map((t) => t.tag.slug),
    })),
    pages,
    categories,
    tags,
    media,
    redirects,
    settings,
  };
}

function yamlList(items: string[]): string {
  return `[${items.map((s) => JSON.stringify(s)).join(', ')}]`;
}

export async function buildMarkdownExport(): Promise<string> {
  const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

  const [posts, pages] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        categories: { include: { category: { select: { slug: true } } } },
        tags: { include: { tag: { select: { slug: true } } } },
      },
    }),
    prisma.page.findMany({ orderBy: { createdAt: 'asc' } }),
  ]);

  const blocks: string[] = [];

  for (const p of posts) {
    const front = [
      '---',
      `type: post`,
      `title: ${JSON.stringify(p.title)}`,
      `slug: ${JSON.stringify(p.slug)}`,
      `status: ${p.status}`,
      `date: ${p.publishedAt ? p.publishedAt.toISOString() : 'null'}`,
      `categories: ${yamlList(p.categories.map((c) => c.category.slug))}`,
      `tags: ${yamlList(p.tags.map((t) => t.tag.slug))}`,
      '---',
    ].join('\n');
    blocks.push(`${front}\n\n# ${p.title}\n\n${td.turndown(p.contentHtml)}\n`);
  }

  for (const p of pages) {
    const front = [
      '---',
      `type: page`,
      `title: ${JSON.stringify(p.title)}`,
      `slug: ${JSON.stringify(p.slug)}`,
      `status: ${p.status}`,
      '---',
    ].join('\n');
    blocks.push(`${front}\n\n# ${p.title}\n\n${td.turndown(p.contentHtml)}\n`);
  }

  return blocks.join('\n\n<!-- ────────────────────────────── -->\n\n');
}
