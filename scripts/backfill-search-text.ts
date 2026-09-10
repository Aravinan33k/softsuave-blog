import 'dotenv/config';
import { prisma } from '../src/lib/db';
import { htmlToText } from '../src/lib/content/render';

/**
 * Populate the `searchText` column from `contentHtml` for posts and pages.
 *
 *   npm run search:backfill          # fill only rows with an empty searchText
 *   npm run search:backfill -- --all # recompute every row
 *
 * Needed because `searchText` is maintained by the application (see
 * RenderedContent in lib/content/service.ts), not by a database trigger as the
 * Postgres tsvector column was. Any row written outside those paths — a manual
 * SQL edit, a restored dump, a migration that predates this column — has an
 * empty searchText and is simply invisible to search, with nothing failing.
 *
 * Run it after a bulk import, after restoring a dump, and whenever htmlToText
 * changes (with --all, since existing values were produced by the old version).
 */

const BATCH = 200;

/**
 * Post and Page are structurally identical here but are distinct Prisma
 * delegates, and TypeScript cannot call a method on a union of them. Each model
 * therefore supplies its own two closures rather than the code branching on a
 * model name and casting the delegate away.
 */
interface Backfillable {
  name: string;
  find: (args: { skip?: number; onlyEmpty: boolean }) => Promise<{ id: string; contentHtml: string }[]>;
  update: (id: string, searchText: string) => Promise<unknown>;
}

const MODELS: Backfillable[] = [
  {
    name: 'post',
    find: ({ skip, onlyEmpty }) =>
      prisma.post.findMany({
        where: onlyEmpty ? { searchText: '' } : {},
        select: { id: true, contentHtml: true },
        take: BATCH,
        skip,
        orderBy: { id: 'asc' },
      }),
    update: (id, searchText) => prisma.post.update({ where: { id }, data: { searchText } }),
  },
  {
    name: 'page',
    find: ({ skip, onlyEmpty }) =>
      prisma.page.findMany({
        where: onlyEmpty ? { searchText: '' } : {},
        select: { id: true, contentHtml: true },
        take: BATCH,
        skip,
        orderBy: { id: 'asc' },
      }),
    update: (id, searchText) => prisma.page.update({ where: { id }, data: { searchText } }),
  },
];

async function backfill(model: Backfillable, all: boolean): Promise<number> {
  let done = 0;

  for (;;) {
    // Without --all the WHERE clause stops matching a row the moment it is
    // fixed, so paging must NOT advance an offset or it would step over
    // unprocessed rows. With --all nothing changes what a row matches, so a
    // moving offset is both correct and necessary to make progress.
    const rows = await model.find({ onlyEmpty: !all, skip: all ? done : undefined });
    if (rows.length === 0) break;

    // Sequential, not Promise.all: a few hundred concurrent UPDATEs would exhaust
    // the connection pool, and this is a maintenance script, not a hot path.
    for (const row of rows) {
      await model.update(row.id, htmlToText(row.contentHtml));
    }
    done += rows.length;
    console.log(`  ${model.name}: ${done} updated`);
    if (rows.length < BATCH) break;
  }
  return done;
}

async function main() {
  const all = process.argv.includes('--all');
  console.log(all ? 'Recomputing searchText for ALL rows…' : 'Filling empty searchText…');

  const [posts, pages] = [await backfill(MODELS[0], all), await backfill(MODELS[1], all)];

  console.log(`✓ Done — ${posts} post(s), ${pages} page(s).`);
  if (posts + pages === 0) console.log('  Nothing to do.');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
