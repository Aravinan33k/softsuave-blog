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

export const HIRE_ROLE_ROUTES: readonly HireRoleRoute[] = [
  { path: '/hire-software-developers', title: 'Hire Software Developers' },
  { path: '/hire-web-app-developers', title: 'Hire Web App Developers' },
  { path: '/hire-mobile-app-developers', title: 'Hire Mobile App Developers' },
  { path: '/hire-frontend-application-developer', title: 'Hire Frontend Developers' },
  { path: '/hire-backend-application-developer', title: 'Hire Backend Developers' },
  { path: '/hire-ai-developer', title: 'Hire AI Developers' },
  { path: '/hire-qa-testers-india', title: 'Hire QA Engineers' },
  { path: '/hire-devops-developers', title: 'Hire DevOps Engineers' },
  { path: '/hire-dedicated-developers', title: 'Hire Dedicated Developers' },
] as const;

/** Just the paths, for the redirect list and the sitemap. */
export const HIRE_ROLE_SLUGS: readonly string[] = HIRE_ROLE_ROUTES.map((r) => r.path);
