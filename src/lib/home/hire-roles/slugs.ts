/**
 * The nine "Hire Developers by Role" routes, as slug + title only.
 *
 * Deliberately dependency-free, like `lib/flags.ts`: `next.config.ts` reads it
 * to keep the release redirects in step with the routes, and that runs outside
 * the app's module graph, where a `@/` alias does not resolve and pulling in the
 * nine content modules (and through them the React section components they type
 * themselves against) would be wrong on both counts.
 *
 * `HIRE_ROLE_PAGES` in `./index.ts` is the full registry — it carries the copy —
 * and its own test asserts the two lists never drift apart.
 *
 * `path` is the app-internal route, i.e. what a `<Link href>` would use. The
 * mount subpath is applied where it is consumed (`absoluteUrl` for the
 * sitemap), so nothing here carries one — see `lib/flags.ts`.
 */

export interface HireRoleRoute {
  readonly path: string;
  readonly title: string;
}

/**
 * The thirteen routes, in the order softsuave.com's "Hire By Role" menu lists
 * them. That order is the one thing here that is not arbitrary: the nav group,
 * the sitemap and the cross-links between these pages all read it.
 */
export const HIRE_ROLE_ROUTES: readonly HireRoleRoute[] = [
  { path: '/hire-software-developers', title: 'Hire Software Developer' },
  { path: '/hire-web-app-developers', title: 'Hire Web App Developer' },
  { path: '/hire-mobile-app-developers', title: 'Hire Mobile App Developer' },
  { path: '/hire-frontend-application-developer', title: 'Hire Frontend Developer' },
  { path: '/hire-backend-application-developer', title: 'Hire Backend Developer' },
  { path: '/hire-dedicated-developers', title: 'Hire Dedicated Developer' },
  { path: '/hire-ai-developer', title: 'Hire AI Developer' },
  { path: '/hire-qa-testers-india', title: 'Hire QA Engineer' },
  { path: '/hire-android-developers', title: 'Hire Android Developer' },
  { path: '/hire-ios-developers', title: 'Hire iOS Developer' },
  { path: '/hire-devops-developers', title: 'Hire DevOps Developer' },
  { path: '/hire-salesforce-developer', title: 'Hire Salesforce Developer' },
  { path: '/hire-blockchain-developer', title: 'Hire Blockchain Developer' },
] as const;

/** Just the paths, for the redirect list and the sitemap. */
export const HIRE_ROLE_SLUGS: readonly string[] = HIRE_ROLE_ROUTES.map((r) => r.path);
