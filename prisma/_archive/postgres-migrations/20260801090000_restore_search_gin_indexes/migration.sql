-- Restore the full-text search GIN indexes.
--
-- These were created by the init migration (20260716120035_init) but dropped by
-- 20260716124442_auth_refresh_tokens and never recreated. Without them, every
-- search request runs two sequential scans over "Post"/"Page" evaluating the
-- tsvector match, because `searchVector` is Unsupported("tsvector") in
-- schema.prisma and therefore cannot carry an @@index directive that Prisma
-- would regenerate on its own.
--
-- `IF NOT EXISTS` keeps this idempotent for any environment where the index was
-- restored by hand. Not CONCURRENTLY: Prisma runs migrations inside a
-- transaction, which CONCURRENTLY forbids. At blog-scale table sizes the brief
-- write lock is acceptable; on a large table, create these by hand out-of-band
-- with CONCURRENTLY and this migration becomes a no-op.

CREATE INDEX IF NOT EXISTS "Post_searchVector_idx" ON "Post" USING GIN ("searchVector");
CREATE INDEX IF NOT EXISTS "Page_searchVector_idx" ON "Page" USING GIN ("searchVector");
