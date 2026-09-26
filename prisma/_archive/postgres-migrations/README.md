# Archived PostgreSQL migrations

These are the original migrations from when this app ran on PostgreSQL. They are
kept for reference only — **Prisma does not read this directory**, and none of
this DDL is valid on MySQL.

The port to MySQL rebaselined the migration history, because a Prisma migration
directory is provider-specific end to end: `migration_lock.toml` pins a single
provider, and these files use Postgres-only syntax throughout (`tsvector`
columns, `USING GIN` indexes, a `plpgsql` trigger function, `text` types,
double-quoted identifiers). Replaying them against MySQL fails on the first
statement, so the active history now starts from a single
`20260821000000_init_mysql` baseline generated from the current schema.

Worth reading if you need to know *why* something is shaped the way it is:

- `20260716120035_init` — the original schema, and at the bottom the weighted
  full-text setup: a `content_search_vector_update()` trigger writing
  `setweight(to_tsvector(...), 'A'|'B'|'C')` over title/excerpt/stripped-HTML,
  plus GIN indexes. The MySQL equivalent is a plain `searchText` column written
  by `lib/content/service.ts` and `@@fulltext` indexes declared in the schema —
  see `lib/search/fulltext.ts` for what was preserved and what could not be.
- `20260716124442_auth_refresh_tokens` and
  `20260801090000_restore_search_gin_indexes` — together these show the recurring
  tax of the old design: because `searchVector` was `Unsupported("tsvector")`,
  Prisma could not see the GIN indexes, dropped them on an unrelated migration,
  and they had to be restored by hand. The MySQL setup avoids this class of bug
  entirely by keeping the search column and its indexes inside the Prisma schema.
