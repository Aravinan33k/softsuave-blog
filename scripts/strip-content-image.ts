import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import type { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html/server';
import { prisma } from '../src/lib/db';
import { baseExtensions } from '../src/lib/tiptap/extensions';
import { sanitizeHtml, contentStats } from '../src/lib/content/render';

// Remove an image from every post and page that embeds it. The WordPress import
// carried decorative images into the body copy hundreds of times over; this is
// the cleanup pass for one of them.
//
// Usage: npm run content:strip-image -- <url-substring> <backup.json> [--apply]
//   ... -- images-4-removebg-preview /tmp/backup.json           # dry run, no writes
//   ... -- images-4-removebg-preview /tmp/backup.json --apply   # write it
//
// contentJson is the source of truth: image nodes matching the substring are
// dropped from it, then contentHtml is regenerated through the same
// generateHTML + sanitizeHtml the editor's publish path uses (via the Node-safe
// @tiptap/html/server entry, exactly as the WordPress importer does), so the stored HTML can
// never drift from the JSON. Word count and reading time are recomputed from
// the new HTML. Every original row is written to the backup file before the
// first update, so a restore only needs that file.

// Nodes that exist only to hold their children — one left empty by the strip is
// dropped with it, so no blank paragraph or caption-less figure is left behind.
const WRAPPERS = new Set(['paragraph', 'figure']);

function strip(node: JSONContent, needle: string, count: { n: number }): JSONContent | null {
  if (node.type === 'image' && typeof node.attrs?.src === 'string' && node.attrs.src.includes(needle)) {
    count.n += 1;
    return null;
  }
  if (Array.isArray(node.content)) {
    const kept = node.content
      .map((child) => strip(child, needle, count))
      .filter((child): child is JSONContent => child !== null);
    if (kept.length === 0 && node.content.length > 0 && WRAPPERS.has(node.type ?? '')) return null;
    return { ...node, content: kept };
  }
  return node;
}

interface Row {
  id: string;
  slug: string;
  contentJson: unknown;
  contentHtml: string;
  wordCount: number;
  readingTimeMinutes: number;
}

async function main() {
  const needle = process.argv[2];
  const backupPath = process.argv[3];
  const apply = process.argv.includes('--apply');
  if (!needle || !backupPath) {
    throw new Error('Usage: <url-substring> <backup.json> [--apply]');
  }

  const select = {
    id: true,
    slug: true,
    contentJson: true,
    contentHtml: true,
    wordCount: true,
    readingTimeMinutes: true,
  } as const;
  const posts: Row[] = await prisma.post.findMany({ select });
  const pages: Row[] = await prisma.page.findMany({ select });

  const planned: { kind: 'post' | 'page'; row: Row; json: JSONContent; html: string; removed: number }[] = [];
  for (const [kind, rows] of [['post', posts], ['page', pages]] as const) {
    for (const row of rows) {
      const count = { n: 0 };
      const json = strip(row.contentJson as JSONContent, needle, count);
      if (count.n === 0 || !json) continue;
      planned.push({ kind, row, json, html: sanitizeHtml(generateHTML(json, baseExtensions)), removed: count.n });
    }
  }

  const totalRemoved = planned.reduce((sum, p) => sum + p.removed, 0);
  console.log(`match: "${needle}"`);
  console.log(`posts: ${planned.filter((p) => p.kind === 'post').length} / ${posts.length}`);
  console.log(`pages: ${planned.filter((p) => p.kind === 'page').length} / ${pages.length}`);
  console.log(`image nodes to remove: ${totalRemoved}`);

  if (!apply) {
    console.log('\nDry run — nothing written. Re-run with --apply.');
    await prisma.$disconnect();
    return;
  }

  writeFileSync(
    backupPath,
    JSON.stringify(
      { needle, rows: planned.map((p) => ({ kind: p.kind, ...p.row })) },
      null,
      2,
    ),
  );
  console.log(`\nbackup: ${backupPath}`);

  let done = 0;
  for (const p of planned) {
    const stats = contentStats(p.html);
    const data = { contentJson: p.json, contentHtml: p.html, ...stats };
    if (p.kind === 'post') await prisma.post.update({ where: { id: p.row.id }, data });
    else await prisma.page.update({ where: { id: p.row.id }, data });
    done += 1;
    if (done % 25 === 0) console.log(`  updated ${done}/${planned.length}…`);
  }
  console.log(`updated ${done} rows, removed ${totalRemoved} image nodes.`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
