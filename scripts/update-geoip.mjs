// Downloads the MaxMind GeoLite2-Country database used to preselect the
// enquiry form's phone country code.
//
//   npm run geo:update
//
// Needs MAXMIND_LICENSE_KEY in .env — a free MaxMind account, "Manage License
// Keys". Without it this exits 0 with an explanation rather than failing: the
// app works without the database (every form defaults to +91), so a missing key
// must never break a build or a deploy.
//
// MaxMind publishes a new build weekly. Country-level data moves slowly, so
// re-running this monthly, or on each deploy, is plenty.

import { createWriteStream } from 'node:fs';
import { mkdir, rename, rm, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { extract } from 'tar';

const EDITION = 'GeoLite2-Country';
const dest = process.env.GEOIP_DB_PATH ?? './data/GeoLite2-Country.mmdb';
const key = process.env.MAXMIND_LICENSE_KEY ?? '';

if (!key) {
  console.log(
    `[geo] MAXMIND_LICENSE_KEY is not set — skipping ${EDITION} download.\n` +
      `      Phone country codes will default to +91 for every visitor.\n` +
      `      To enable detection: create a free account at https://www.maxmind.com/en/geolite2/signup,\n` +
      `      generate a licence key, put MAXMIND_LICENSE_KEY=... in .env, and re-run \`npm run geo:update\`.`,
  );
  process.exit(0);
}

const url =
  `https://download.maxmind.com/app/geoip_download` +
  `?edition_id=${EDITION}&license_key=${encodeURIComponent(key)}&suffix=tar.gz`;

const tmpDir = './.geoip-tmp';

try {
  console.log(`[geo] Downloading ${EDITION}…`);
  const res = await fetch(url);
  if (!res.ok) {
    // 401 here is nearly always a key that was revoked or copied with a stray
    // space, so say that rather than printing a bare status.
    throw new Error(
      res.status === 401
        ? 'MaxMind rejected the licence key (401). Check MAXMIND_LICENSE_KEY.'
        : `MaxMind responded ${res.status} ${res.statusText}.`,
    );
  }

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });

  // The archive is <edition>_<date>/<edition>.mmdb; strip the dated directory
  // so the file lands at a stable path.
  await pipeline(res.body, createGunzip(), extract({ cwd: tmpDir, strip: 1 }));

  await mkdir(dirname(dest), { recursive: true });
  // Move into place only once the download succeeded, so a failed run never
  // leaves a truncated database where a working one used to be.
  await rename(join(tmpDir, `${EDITION}.mmdb`), dest);

  const { size } = await stat(dest);
  console.log(`[geo] Installed ${dest} (${(size / 1024 / 1024).toFixed(1)} MB).`);
} catch (err) {
  console.error(`[geo] Download failed: ${err instanceof Error ? err.message : err}`);
  console.error('[geo] The app still runs; phone country codes will default to +91.');
  process.exitCode = 1;
} finally {
  await rm(tmpDir, { recursive: true, force: true });
}
