"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANDING_PAGES } from "@/lib/home/landing-pages";
import { HIRE_SKILLS } from "@/lib/home/hire-skills";
import { HIRE_ROLE_ROUTES } from "@/lib/home/hire-roles/slugs";
import { navPanels, type NavMenuItem } from "@/lib/home/nav-menu";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./breadcrumb.module.css";

/**
 * The visible "Home › <parent…> › <page>" trail at the top of a landing hero.
 *
 * It names the page from the route alone, so no page file passes it anything:
 * the heroes render `<Breadcrumb />` and the label comes from the registries
 * that already describe every marketing route. In order of preference:
 *
 *   1. A hire-by-skill page: its own `breadcrumbLabel`, else "Hire" + its role
 *      ("Hire Python Developers"). The registry title for these is the live
 *      `<title>` sales line ("Hire Offshore Python Developers from India"),
 *      and their nav labels are one word ("Python"), which collides with the
 *      Python *development* page's own label.
 *   2. A hire-by-role page: its route title ("Hire Dedicated Developer").
 *   3. The mega menu's label for the path, from its non-dense groups — the
 *      short name a reader already saw in the nav ("Software Development").
 *      The dense technology/skill lists are skipped for the reason in (1):
 *      "Android" alone does not say which Android page this is.
 *   4. The landing registry's title, with any " | …" / " - …" tail cut.
 *
 * A client component only because `usePathname` is a client hook. It still
 * renders on the server: client components are pre-rendered into the HTML,
 * and `usePathname` returns the request's path during that pass, so crawlers
 * and no-JS readers get the trail too. Every registry imported here is
 * already in the client bundle through the nav (`nav-data` → `landing-pages`
 * → `hire-skills`), so this adds no copy to it.
 *
 * Parents come from the same registries (see `breadcrumbTrail`): the mega
 * menu's nesting ("Custom AI Development" › "Generative AI"), a landing page's
 * declared `parent` (the industry pages under /industries), and the hire pages
 * under "Hire Dedicated Developers" — the parent their live trails name.
 *
 * Renders nothing on "/" and on any path none of the sources know — a trail
 * that reads "Home › undefined" is worse than none.
 */

/** Cut a `<title>`-style sales tail: "Hire X | 40-Hour Trial" → "Hire X". */
function stripTitleTail(title: string): string {
  return title.split(/\s+[|–—-]\s+/)[0].trim();
}

/** Every exact-path item of the mega menu, first occurrence winning. */
function collectMenuLabels(into: Map<string, string>): void {
  const visit = (items: readonly NavMenuItem[]) => {
    for (const item of items) {
      // `#section` anchors are homepage sections, not pages; an item with no
      // href is a heading with no page at all.
      const { href } = item;
      if (href?.startsWith("/") && !href.includes("#") && !into.has(href)) {
        into.set(href, item.name);
      }
      if (item.items && !item.terse) visit(item.items);
    }
  };
  for (const panel of Object.values(navPanels)) {
    for (const group of panel.groups) {
      if (!group.dense) visit(group.items);
    }
  }
}

/**
 * Built once at module load: the sources are static, and the lookup runs on
 * every hero render. Earlier sources are set first and never overwritten.
 */
const PAGE_LABELS: ReadonlyMap<string, string> = (() => {
  const labels = new Map<string, string>();
  for (const skill of HIRE_SKILLS) {
    labels.set(`/${skill.slug}`, skill.breadcrumbLabel ?? `Hire ${skill.role}`);
  }
  for (const route of HIRE_ROLE_ROUTES) {
    if (!labels.has(route.path)) labels.set(route.path, route.title);
  }
  collectMenuLabels(labels);
  for (const page of LANDING_PAGES) {
    if (!labels.has(page.path)) labels.set(page.path, stripTitleTail(page.title));
  }
  return labels;
})();

/** Where every hire-by-skill and hire-by-role page sits. */
const HIRE_INDEX = "/hire-dedicated-developers";

/**
 * Each page's chain of parent pages, nearest last, from the mega menu's
 * nesting — every group, dense ones included. Only ancestors that are pages
 * count: an unlinked heading ("Native App Development") is skipped, so
 * Android's parent is Mobile App Development. First occurrence wins.
 */
function collectMenuParents(into: Map<string, readonly string[]>): void {
  const visit = (items: readonly NavMenuItem[], chain: readonly string[]) => {
    for (const item of items) {
      const href = item.href?.startsWith("/") && !item.href.includes("#") ? item.href : undefined;
      if (href && !into.has(href)) into.set(href, chain);
      if (item.items) visit(item.items, href ? [...chain, href] : chain);
    }
  };
  for (const panel of Object.values(navPanels)) {
    for (const group of panel.groups) visit(group.items, []);
  }
}

/**
 * Built once, like the labels. In order of preference: a registry-declared
 * `parent`, the hire index for hire pages, then the menu's nesting.
 */
const PAGE_PARENTS: ReadonlyMap<string, readonly string[]> = (() => {
  const parents = new Map<string, readonly string[]>();
  for (const page of LANDING_PAGES) {
    if (page.parent) parents.set(page.path, [page.parent]);
  }
  const hirePaths = [...HIRE_SKILLS.map((s) => `/${s.slug}`), ...HIRE_ROLE_ROUTES.map((r) => r.path)];
  for (const path of hirePaths) {
    if (path !== HIRE_INDEX && !parents.has(path)) parents.set(path, [HIRE_INDEX]);
  }
  collectMenuParents(parents);
  return parents;
})();

export type Crumb = { readonly name: string; readonly path: string };

/**
 * The trail after "Home": each parent page, then the page itself. Empty for
 * "/" and unknown paths. A parent without a label of its own is dropped rather
 * than shown as a blank crumb.
 */
export function breadcrumbTrail(pathname: string): Crumb[] {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const label = breadcrumbLabel(path);
  if (!label) return [];
  const parents = (PAGE_PARENTS.get(path) ?? [])
    .filter((p) => p !== path)
    .flatMap((p) => {
      const name = breadcrumbLabel(p);
      return name ? [{ name, path: p }] : [];
    });
  return [...parents, { name: label, path }];
}

/** The trail's label for a route, or `undefined` for "/" and unknown paths. */
export function breadcrumbLabel(pathname: string): string | undefined {
  // Tolerate a trailing slash; the registries are written without one.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/") return undefined;
  return PAGE_LABELS.get(path);
}

export default function Breadcrumb({
  className,
  tone = "hero",
}: {
  className?: string;
  /**
   * `hero` (default) pins light colours for a dark hero over a photograph.
   * `band` reads the section's own tokens instead, so the trail inverts with
   * it inside a `.light` band (the awards page's masthead is one).
   */
  tone?: "hero" | "band";
}) {
  const pathname = usePathname();
  const trail = pathname ? breadcrumbTrail(pathname) : [];
  if (!trail.length) return null;
  const current = trail[trail.length - 1];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.breadcrumb}${className ? ` ${className}` : ""}`}
      data-tone={tone}
    >
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          {/* Decorative: the list itself conveys the hierarchy. */}
          <span className={styles.sep} aria-hidden>
            ›
          </span>
        </li>
        {trail.slice(0, -1).map((crumb) => (
          <li key={crumb.path} className={styles.item}>
            <SiteLink href={crumb.path} className={styles.link}>
              {crumb.name}
            </SiteLink>
            <span className={styles.sep} aria-hidden>
              ›
            </span>
          </li>
        ))}
        <li className={styles.item}>
          <span className={styles.current} aria-current="page">
            {current.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}
