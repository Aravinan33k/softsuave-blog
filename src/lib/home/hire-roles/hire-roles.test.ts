import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { HIRE_ROLE_PAGES, HIRE_ROLE_ROUTES } from './index';
import { LANDING_PAGES } from '../landing-pages';

/**
 * The nine role pages are wired to three things that live elsewhere — the
 * dependency-free slug list `next.config.ts` reads, the landing-page registry
 * the sitemap reads, and the `public/images/landing` artwork. Every one of those
 * breaks silently: a slug that drifts serves a page at a URL the redirect list
 * does not cover, and a missing image renders an empty card. That is what this
 * covers.
 *
 * The process ring used to be a fourth: it was hardcoded to five positions, so
 * a page carrying its live page's four-step process left the fifth reading
 * `undefined`. `Process` now sizes the ring to the steps it is given, so the
 * copy no longer has to pad itself to fit the component.
 */

const PUBLIC_DIR = join(process.cwd(), 'public');

/** Every image path any section on these pages points at. */
function imagePaths(page: (typeof HIRE_ROLE_PAGES)[number]): string[] {
  return [
    ...(page.capabilities?.items ?? []).map((i) => i.image),
    ...(page.fit?.rows ?? []).map((r) => r.image),
    ...(page.specialisations?.items ?? []).map((i) => i.image),
    page.hero.background?.src,
    page.overview?.image?.src,
  ].filter((p): p is string => typeof p === 'string');
}

describe('hire-by-role pages', () => {
  it('matches the dependency-free slug list exactly', () => {
    // `next.config.ts` and the sitemap read `HIRE_ROLE_ROUTES`, which cannot
    // import the content modules. If these drift, a page is served at a URL the
    // release redirects do not cover — or redirected while it is meant to be live.
    expect(HIRE_ROLE_PAGES.map((p) => p.slug)).toEqual(HIRE_ROLE_ROUTES.map((r) => r.path));
  });

  it('has a unique slug and a unique key per page', () => {
    expect(new Set(HIRE_ROLE_PAGES.map((p) => p.slug)).size).toBe(HIRE_ROLE_PAGES.length);
    // `key` is the hero form's field-id prefix and the FAQ's id namespace, so a
    // duplicate would produce colliding ids if two pages ever rendered together.
    expect(new Set(HIRE_ROLE_PAGES.map((p) => p.key)).size).toBe(HIRE_ROLE_PAGES.length);
  });

  it('is registered as a landing page', () => {
    const known = new Set(LANDING_PAGES.map((p) => p.path));
    for (const page of HIRE_ROLE_PAGES) {
      expect(known.has(page.slug), `${page.slug} unregistered`).toBe(true);
    }
  });

  it('gives Process a ring it can lay out', () => {
    // The ring is now sized from the copy, so the count is whatever the live
    // page publishes — four on most of these, five where interviewing is a
    // stage of its own. What still has to hold is that there are enough steps
    // to read as a process and that every one of them is complete: a step
    // missing its body renders an empty copy panel when the ring lands on it.
    for (const page of HIRE_ROLE_PAGES) {
      const { steps } = page.process;
      expect(steps.length, `${page.key}: process has ${steps.length} steps`).toBeGreaterThanOrEqual(
        3,
      );
      for (const step of steps) {
        expect(step.n, `${page.key}: a step has no number`).toBeTruthy();
        expect(step.name, `${page.key}: a step has no name`).toBeTruthy();
        expect(step.body.length, `${page.key}/${step.name} has no description`).toBeGreaterThan(40);
      }
    }
  });

  it('only points at artwork that exists', () => {
    for (const page of HIRE_ROLE_PAGES) {
      for (const path of imagePaths(page)) {
        expect(path.startsWith('/'), `${page.key}: "${path}" is not root-relative`).toBe(true);
        expect(existsSync(join(PUBLIC_DIR, path)), `${page.key}: missing ${path}`).toBe(true);
      }
    }
  });

  it('keeps every comparison row aligned with its columns', () => {
    // `Comparison` maps each row's values onto the columns after the first. A
    // short row silently drops a cell from the table.
    for (const page of HIRE_ROLE_PAGES) {
      for (const table of [page.comparison, page.rates].filter((t) => t !== undefined)) {
        const expected = table!.columns.length - 1;
        for (const row of table!.rows) {
          expect(row.values.length, `${page.key}/${row.criterion}`).toBe(expected);
        }
      }
    }
  });

  it('orders bands the page actually has, with no band named twice', () => {
    // `order` is what `HireRolePage` renders, in sequence. A band naming a
    // field the page does not fill renders nothing, so the two drifting apart
    // is silent: the copy is written, the order forgets it, and the section
    // vanishes from the page. These are the fields a band name maps to.
    const FIELD_BANDS = {
      overview: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.overview,
      capabilities: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.capabilities,
      specialisations: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.specialisations,
      fit: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.fit,
      engagement: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.engagement,
      globalDelivery: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.globalDelivery,
      midCta: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.midCta,
      whyRole: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.whyRole,
      comparison: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.comparison,
      rates: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.rates,
      techStack: (p: (typeof HIRE_ROLE_PAGES)[number]) => p.techStack,
    } as const;

    for (const page of HIRE_ROLE_PAGES) {
      expect(new Set(page.order).size, `${page.key}: a band is listed twice`).toBe(
        page.order.length,
      );

      for (const band of page.order) {
        const field = FIELD_BANDS[band as keyof typeof FIELD_BANDS];
        if (field) {
          expect(field(page), `${page.key}: order names "${band}" but it has none`).toBeDefined();
        }
        if (band.startsWith('list:')) {
          const list = page.lists?.find((l) => `list:${l.key}` === band);
          expect(list, `${page.key}: order names "${band}" but no list has that key`).toBeDefined();
        }
      }

      // And the reverse: a list written but never placed renders nowhere. It is
      // the failure `order` makes possible, so it is the one to guard.
      for (const list of page.lists ?? []) {
        expect(page.order, `${page.key}: list "${list.key}" is never placed`).toContain(
          `list:${list.key}`,
        );
        expect(list.groups.flatMap((g) => g.items).length, `${page.key}/${list.key} is empty`)
          .toBeGreaterThan(0);
      }

      // Every page ends on its FAQ and runs its hiring process, and every one
      // has a "what you can hire" band for the nav's #services anchor.
      expect(page.order.at(-1), `${page.key}: does not close on its FAQ`).toBe('faq');
      expect(page.order, `${page.key}: no process band`).toContain('process');
      expect(
        page.order.includes('capabilities') || page.order.includes('specialisations'),
        `${page.key}: no #services band`,
      ).toBe(true);
    }
  });

  it('links cards only at routes we serve', () => {
    // A card href is either the hero form's anchor (the default) or one of our
    // own routes. An outbound or speculative URL here would 404 silently on
    // hover — the failure mode `MARKETING_PATHS` exists to prevent, except that
    // these hrefs bypass `navHref` entirely and so are not covered by it.
    const ours = new Set(LANDING_PAGES.map((p) => p.path));
    for (const page of HIRE_ROLE_PAGES) {
      for (const item of page.specialisations?.items ?? []) {
        if (!item.href) continue;
        expect(ours.has(item.href), `${page.key}/${item.name}: ${item.href} is not our route`).toBe(
          true,
        );
      }
    }
  });

  it('states only role-specific content, leaving company claims to the homepage', () => {
    // The guard for this turn's whole point: "Why Soft Suave", the clients, the
    // case studies, the recognitions, the client stories and the closing CTA
    // render the homepage's components over `lib/home/content.ts`. Re-adding a
    // role-written version of any of them would put a second set of facts about
    // the company on the site, free to drift from the homepage's.
    const COMPANY_KEYS = ['whyUs', 'proof', 'finalCta', 'industries', 'clients', 'testimonials'];
    for (const page of HIRE_ROLE_PAGES) {
      for (const key of COMPANY_KEYS) {
        expect(key in page, `${page.key}: "${key}" belongs to the homepage, not a role page`).toBe(
          false,
        );
      }
    }
  });

  it('says something concrete in every band', () => {
    for (const page of HIRE_ROLE_PAGES) {
      expect(page.hero.titleLines.length).toBeGreaterThanOrEqual(2);
      expect(page.hero.points.length).toBeGreaterThanOrEqual(4);
      // `overview` is present only where the live page runs a prose block —
      // the Salesforce and Blockchain pages go straight from the hero to their
      // "why hire" cards. Where there is one, it has to be more than a line.
      if (page.overview) expect(page.overview.paragraphs.length).toBeGreaterThanOrEqual(3);
      // `engagement` and `globalDelivery` are each present only where the live
      // page runs that band, but a band that is there has to say something. The
      // first is labelled panels (the hiring models), the second is prose.
      if (page.engagement) expect(page.engagement.blocks.length).toBeGreaterThanOrEqual(2);
      if (page.globalDelivery) {
        expect(page.globalDelivery.paragraphs.length).toBeGreaterThanOrEqual(2);
      }
      // Some live pages group their stack, some print one flat list, and the
      // Android and iOS pages publish no technology section at all. Where there
      // is one, the count that matters is how many technologies are named, not
      // how many headings they sit under.
      if (page.techStack) {
        const technologies = page.techStack.groups.flatMap((g) => g.items);
        expect(technologies.length, `${page.key}: thin technology list`).toBeGreaterThanOrEqual(10);
      }
      expect(page.faq.items.length).toBeGreaterThanOrEqual(5);

      // `capabilities` and `specialisations` are each optional — a live page
      // may run one, the other or both — but a page with neither would have no
      // "what you can hire" band at all, and no #services section for the nav
      // bar to scroll to. Whichever are present must be real sections.
      const cardSections = [page.capabilities, page.specialisations].filter((s) => s !== undefined);
      expect(cardSections.length, `${page.key}: no services band`).toBeGreaterThanOrEqual(1);
      for (const section of cardSections) {
        expect(section.items.length, `${page.key}/${section.title} is thin`).toBeGreaterThanOrEqual(
          6,
        );
        for (const item of section.items) {
          expect(item.body.length, `${page.key}/${item.name} has no description`).toBeGreaterThan(
            60,
          );
        }
      }
      for (const item of page.faq.items) {
        expect(item.a.length, `${page.key}: "${item.q}" has no answer`).toBeGreaterThan(60);
      }
    }
  });

  it('has SEO metadata within the lengths search results actually show', () => {
    for (const page of HIRE_ROLE_PAGES) {
      expect(page.meta.title.length, `${page.key}: title too short`).toBeGreaterThan(20);
      expect(page.meta.title.length, `${page.key}: title too long`).toBeLessThanOrEqual(70);
      expect(page.meta.description.length, `${page.key}: description too short`).toBeGreaterThan(70);
      expect(page.meta.description.length, `${page.key}: description too long`).toBeLessThanOrEqual(
        180,
      );
    }
  });
});
