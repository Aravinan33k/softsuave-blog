import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { prisma } from '../src/lib/db';
import { env } from '../src/lib/env';
import { CloudinaryStorageAdapter } from '../src/lib/storage/cloudinary';

// Re-upload existing local media (STORAGE_DRIVER=local files under .storage,
// referenced as /uploads/…) to Cloudinary, then rewrite every reference:
// Media.url / Media.variantsJson, and Post/Page.contentHtml embeds.
//
// Runs while the app is still on the local driver — it constructs the
// Cloudinary adapter from CLOUDINARY_* env vars directly. Idempotent: rows
// already pointing at Cloudinary are skipped, so it is safe to re-run after a
// partial failure. Does NOT delete the local .storage files; remove them
// manually once you have verified the result.
//
// Usage: npm run migrate:media

const PUBLIC_PATH = env.LOCAL_STORAGE_PUBLIC_PATH.replace(/\/+$/, '');
const LOCAL_DIR = path.resolve(process.cwd(), env.LOCAL_STORAGE_DIR);

interface Variant {
  label: string;
  key: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
}

async function main() {
  // env.ts already splits CLOUDINARY_URL into the discrete vars if needed.
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_FOLDER } = env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'Set CLOUDINARY_URL (or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET) in .env before running the migration.',
    );
  }
  const adapter = new CloudinaryStorageAdapter({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
    folder: CLOUDINARY_FOLDER,
  });

  // Media rows still served from local disk.
  const rows = await prisma.media.findMany({
    where: { url: { startsWith: `${PUBLIC_PATH}/` } },
    orderBy: { createdAt: 'asc' },
  });
  console.log(`Found ${rows.length} local media record(s) to migrate (folder: ${CLOUDINARY_FOLDER || '(root)'}).\n`);

  // old URL → new Cloudinary URL, for rewriting embedded content references.
  const urlMap = new Map<string, string>();
  let migrated = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const row of rows) {
    try {
      const variants = Array.isArray(row.variantsJson) ? (row.variantsJson as unknown as Variant[]) : null;
      const uploads: { variant?: Variant; key: string; oldUrl: string }[] = variants?.length
        ? variants.map((v) => ({ variant: v, key: v.key, oldUrl: v.url }))
        : // Legacy row without variants: treat Media.url as a single object.
          [{ key: row.url.replace(new RegExp(`^${PUBLIC_PATH}/?`), ''), oldUrl: row.url }];

      for (const up of uploads) {
        const file = await fs.readFile(path.join(LOCAL_DIR, up.key));
        const res = await adapter.uploadFile({ key: up.key, body: file, contentType: 'image/webp' });
        urlMap.set(up.oldUrl, res.url);
        if (up.variant) up.variant.url = res.url;
        else row.url = res.url;
        console.log(`  ✓ ${up.key} → ${res.url}`);
      }

      const newVariants = variants?.length ? variants : undefined;
      const fullVariant = newVariants?.find((v) => v.label === 'full') ?? newVariants?.[0];
      await prisma.media.update({
        where: { id: row.id },
        data: {
          url: fullVariant?.url ?? row.url,
          ...(newVariants ? { variantsJson: JSON.parse(JSON.stringify(newVariants)) } : {}),
        },
      });
      migrated += 1;
    } catch (e) {
      failed += 1;
      const msg = `${row.id} (${row.url}): ${(e as Error).message}`;
      failures.push(msg);
      console.error(`  ✗ ${msg}`);
    }
  }

  // Rewrite embedded references in rendered HTML.
  let postsFixed = 0;
  let pagesFixed = 0;
  if (urlMap.size) {
    const [posts, pages] = await Promise.all([
      prisma.post.findMany({ where: { contentHtml: { contains: `${PUBLIC_PATH}/` } }, select: { id: true, contentHtml: true } }),
      prisma.page.findMany({ where: { contentHtml: { contains: `${PUBLIC_PATH}/` } }, select: { id: true, contentHtml: true } }),
    ]);
    const rewrite = (html: string) => {
      let out = html;
      for (const [oldUrl, newUrl] of urlMap) out = out.split(oldUrl).join(newUrl);
      return out;
    };
    for (const p of posts) {
      const html = rewrite(p.contentHtml);
      if (html !== p.contentHtml) {
        await prisma.post.update({ where: { id: p.id }, data: { contentHtml: html } });
        postsFixed += 1;
      }
    }
    for (const p of pages) {
      const html = rewrite(p.contentHtml);
      if (html !== p.contentHtml) {
        await prisma.page.update({ where: { id: p.id }, data: { contentHtml: html } });
        pagesFixed += 1;
      }
    }
  }

  console.log(
    `\nDone: ${migrated} migrated, ${failed} failed, ${rows.length - migrated - failed} skipped; ` +
      `${postsFixed} post(s) and ${pagesFixed} page(s) relinked.`,
  );
  if (failures.length) {
    console.log('\nFailures:\n  - ' + failures.join('\n  - '));
    process.exitCode = 1;
  }
  if (migrated) {
    console.log('\nLocal files under .storage were left in place — delete them once you have verified the Cloudinary URLs.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
