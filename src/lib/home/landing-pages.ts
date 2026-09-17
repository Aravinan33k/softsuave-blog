/**
 * Registry of the marketing surface's landing pages — the single place a new
 * `app/(marketing)/<slug>/page.tsx` is announced.
 *
 * `MARKETING_ROUTES` below is derived from it and consumed by everything that
 * must know about all of them:
 *   - `next.config.ts`               — the release gate (307 → /blog while
 *                                      NEXT_PUBLIC_HOMEPAGE_ENABLED is off)
 *   - `src/lib/seo/entries.ts`       — the sitemap
 *   - `src/themes/softsuave/nav-data.ts` — local vs. live-site nav links
 *
 * Miss a page here and it goes live ahead of the homepage, never appears in
 * search, and the nav sends its links out to the external site.
 *
 * Deliberately dependency-free (like `lib/flags.ts`) so `next.config.ts`, server
 * code and client components can all import it.
 *
 * `path` is the app-internal route, i.e. what a `<Link href>` would use. It gets
 * the mount subpath applied where it is consumed (`absoluteUrl` for the
 * sitemap), so nothing here carries a prefix — see `lib/flags.ts`.
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
  { path: '/ai-development-service', title: 'Custom AI Development Services' },
  { path: '/custome-ai-developement', title: 'Custom AI Development Services' },
  { path: '/generative-ai-development-company', title: 'Generative AI Development Company' },
  { path: '/agentic-ai-development-services', title: 'Agentic AI Development Services' },
  { path: '/rag-development-services', title: 'RAG & Document AI' },
  { path: '/computer-vision-development-services', title: 'Computer Vision Development Services' },
  { path: '/predictive-intelligence-services', title: 'Predictive Intelligence Services' },
  { path: '/data-engineering-services', title: 'Data Engineering Services' },
  { path: '/data-science-services', title: 'Data Science Services' },
  { path: '/mobile-application-development-company', title: 'Mobile App Development Company' },
  { path: '/android-application-development-company', title: 'Android App Development Company' },
  { path: '/ios-application-development-company', title: 'iOS App Development Company' },
  { path: '/react-native-app-development-company', title: 'React Native Development Company India' },
  { path: '/flutter-application-development-company', title: 'Flutter App Development Company in India' },
  { path: '/ionic-app-development-company', title: 'Best Ionic App Development Company in India' },
  { path: '/xamarin-app-development-company', title: 'Xamarin Development Company In India' },
  { path: '/software-development-company', title: 'Software Development Company in India' },
  { path: '/dot-net-application-development-company', title: '.NET Development Company in India' },
  { path: '/web-application-development-company', title: 'Web Application Development Company In India' },
  { path: '/angularjs-development-company', title: 'Angular Development Company in India' },
  { path: '/nextjs-development-company', title: 'Next.js Development Company for Modern Web Apps' },
  { path: '/ruby-on-rails-development-company', title: 'Ruby on Rails Development Company India' },
  { path: '/typescript-development-company', title: 'TypeScript Development Company for Web Apps' },
  { path: '/graphql-development-company', title: 'GraphQL Development Company for Modern APIs' },
  { path: '/reactjs-app-development-company', title: 'ReactJS Development Company in India' },
  { path: '/nodejs-development-company', title: 'NodeJS Development Company in India' },
  { path: '/contact', title: 'Contact Us' },
  { path: '/awards-recognition', title: 'Awards and Recognition' },
] as const;

/**
 * Every route in app/(marketing): the homepage plus each landing page. These
 * ship together behind the homepage release flag.
 */
export const MARKETING_ROUTES: readonly string[] = ['/', ...LANDING_PAGES.map((p) => p.path)];
