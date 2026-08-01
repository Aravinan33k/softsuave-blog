import 'dotenv/config';
import { prisma } from '../src/lib/db';
import { importWordpressRest } from '../src/lib/import/wordpress-rest';

// Migrate posts from the live WordPress REST API.
// Usage: npm run import:wp -- [baseUrl] [limit]
//   npm run import:wp                          # all posts from softsuave.com/blog
//   npm run import:wp -- https://site/blog 5   # first 5 posts (newest, test run)
//   npm run import:wp -- https://site/blog random 10   # 10 RANDOM posts

async function main() {
  const baseUrl = process.argv[2] ?? 'https://www.softsuave.com/blog';
  const random = process.argv[3] === 'random';
  const sample = random ? Number(process.argv[4] ?? 10) : undefined;
  const limit = !random && process.argv[3] ? Number(process.argv[3]) : undefined;

  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
    orderBy: { createdAt: 'asc' },
    select: { id: true, email: true },
  });
  if (!admin) throw new Error('No ADMIN user found — run `npm run db:seed` first.');

  const mode = sample ? `random sample of ${sample}` : limit ? `limit ${limit}` : 'all posts';
  console.log(`Importing from ${baseUrl} (uploader: ${admin.email}), ${mode}…\n`);
  const summary = await importWordpressRest({
    baseUrl,
    uploaderId: admin.id,
    limit,
    sample,
    onProgress: (m) => console.log('  ' + m),
  });

  console.log(
    '\nDone:',
    JSON.stringify({ ...summary, slugs: summary.slugs.length, errors: summary.errors.slice(0, 15) }, null, 2),
  );

  // Refresh the ISR cache for the imported posts, the same way an admin publish
  // does. Best-effort: needs the running app URL + REVALIDATE_SECRET; a failure
  // just means you rebuild/redeploy (or wait for ISR) to see the new content.
  if (summary.slugs.length) {
    const appUrl = (process.env.REVALIDATE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/+$/, '');
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
      console.log('\n[revalidate] skipped — REVALIDATE_SECRET not set.');
    } else {
      try {
        const res = await fetch(`${appUrl}/api/v1/revalidate`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${secret}` },
          body: JSON.stringify({ paths: summary.slugs.map((s) => `/${s}`) }),
        });
        console.log(`\n[revalidate] ${res.ok ? 'ok' : `HTTP ${res.status}`} → ${appUrl} (${summary.slugs.length} paths)`);
      } catch (e) {
        console.log(`\n[revalidate] could not reach ${appUrl} (${(e as Error).message}). Rebuild/redeploy to refresh.`);
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
