/**
 * Registry of the "Hire Developers by Role" pages.
 *
 * One list, so the things that must know about all nine — the sitemap, the
 * release redirects, any future index — stay correct when a role is added
 * without anyone remembering to update them. `HIRE_ROLE_ROUTES` in `./slugs.ts`
 * is the dependency-free view of the same set, for `next.config.ts`; the test
 * beside this file asserts the two never drift.
 *
 * Adding a role: write its content module here, add one line below, add one line
 * to `slugs.ts`, create `app/(marketing)/<slug>/page.tsx`, and register it in
 * `lib/home/landing-pages.ts`.
 */

import type { HireRolePageContent } from './types';

import { software } from './software';
import { webApp } from './web-app';
import { mobileApp } from './mobile-app';
import { frontend } from './frontend';
import { backend } from './backend';
import { ai } from './ai';
import { qa } from './qa';
import { devops } from './devops';
import { dedicated } from './dedicated';

export type { HireRolePageContent } from './types';
export { HIRE_ROLE_ROUTES, HIRE_ROLE_SLUGS } from './slugs';

/** In the order the nav's "Hire by role" group lists them. */
export const HIRE_ROLE_PAGES: readonly HireRolePageContent[] = [
  software,
  webApp,
  mobileApp,
  frontend,
  backend,
  ai,
  qa,
  devops,
  dedicated,
] as const;

export { software, webApp, mobileApp, frontend, backend, ai, qa, devops, dedicated };
