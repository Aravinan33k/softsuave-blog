import type { SectorPageContent } from './types';

import { fintech } from './fintech';
import { healthtech } from './healthtech';
import { edtech } from './edtech';
import { ecommerce } from './ecommerce';
import { logistics } from './logistics';
import { telecom } from './telecom';
import { construction } from './construction';

export type { SectorPageContent } from './types';

/**
 * The seven sector pages, in the order the index presents them.
 *
 * One list, so everything that must know about all of them — the sitemap, the
 * release gate, the nav's local-path set — stays correct when a sector is added
 * without anyone remembering each place separately.
 *
 * Adding a sector: write its content module, add it here, create
 * `app/(marketing)/<slug>/page.tsx`, then add the slug to MARKETING_ROUTES in
 * next.config.ts (the release gate) and MARKETING_PATHS in
 * themes/softsuave/nav-data.ts (which flips its links from the live site to us).
 */
export const SECTOR_PAGES: readonly SectorPageContent[] = [
  fintech,
  healthtech,
  edtech,
  ecommerce,
  logistics,
  telecom,
  construction,
] as const;

/** Every sector route, for the sitemap and the release gate. */
export const SECTOR_SLUGS: readonly string[] = SECTOR_PAGES.map((s) => s.slug);
