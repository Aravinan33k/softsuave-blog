/**
 * Registry of the marketing surface's landing pages.
 *
 * Every page built from `components/landing/*` registers its route here. One
 * list, so the things that must know about all of them — the sitemap today, and
 * any future index or breadcrumb trail — stay correct when a page is added
 * without anyone remembering to update them.
 *
 * `path` is the app-internal route, i.e. what a `<Link href>` would use. It gets
 * the mount subpath applied where it is consumed (`absoluteUrl` for the
 * sitemap), so nothing here carries `/blog` — see `lib/flags.ts`.
 *
 * Adding a page: create its content module and its
 * `app/(marketing)/<slug>/page.tsx`, then add one line below.
 */

export interface LandingPage {
  /** App-internal route, leading slash, no mount subpath. */
  readonly path: string;
  /** Page title, for any future index listing. */
  readonly title: string;
}

export const LANDING_PAGES: readonly LandingPage[] = [
  { path: '/custome-ai-developement', title: 'Custom AI Development Services' },
  { path: '/generative-ai-development-company', title: 'Generative AI Development Company' },
  { path: '/agentic-ai-development-services', title: 'Agentic AI Development Services' },
] as const;
