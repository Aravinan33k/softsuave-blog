"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANDING_PAGES } from "@/lib/home/landing-pages";
import { HIRE_SKILLS } from "@/lib/home/hire-skills";
import { HIRE_ROLE_ROUTES } from "@/lib/home/hire-roles/slugs";
import { navPanels, type NavMenuItem } from "@/lib/home/nav-menu";
import styles from "./breadcrumb.module.css";

/**
 * The visible "Home › <page>" trail at the top of a landing hero.
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
      // `#section` anchors are homepage sections, not pages.
      if (item.href.startsWith("/") && !item.href.includes("#") && !into.has(item.href)) {
        into.set(item.href, item.name);
      }
      if (item.items) visit(item.items);
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
  const label = pathname ? breadcrumbLabel(pathname) : undefined;
  if (!label) return null;

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
        <li className={styles.item}>
          <span className={styles.current} aria-current="page">
            {label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
