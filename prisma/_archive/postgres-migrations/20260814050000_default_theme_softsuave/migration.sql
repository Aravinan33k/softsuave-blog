-- Align the "SiteSettings"."activeTheme" column default with DEFAULT_THEME in
-- src/themes/registry.ts.
--
-- The registry has declared `softsuave` as the default theme since it was added,
-- but this column kept the original `minimal` default from 20260716120035_init.
-- prisma/seed.ts creates the singleton row with `create: { id: 'singleton' }` and
-- no explicit activeTheme, so every fresh install took the *column* default and
-- rendered the Minimal theme — deliberately spare markup that reads as an
-- unstyled page — while the code intended Softsuave. Nothing in the app ever
-- reconciled the two, because getTheme() only falls back to DEFAULT_THEME when
-- the stored id is null or unknown, and `minimal` is a perfectly valid id.
--
-- Default only: existing rows are left alone. An operator who deliberately
-- selected Minimal in Settings must keep it, and this migration cannot tell that
-- choice apart from an untouched default. Installs still sitting on the old
-- default can switch under Settings, which has a live preview.

ALTER TABLE "SiteSettings" ALTER COLUMN "activeTheme" SET DEFAULT 'softsuave';
