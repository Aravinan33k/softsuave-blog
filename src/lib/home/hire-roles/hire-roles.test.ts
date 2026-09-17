import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { HIRE_ROLE_PAGES, HIRE_ROLE_ROUTES } from './index';
import { LANDING_PAGES } from '../landing-pages';

/**
 * The nine role pages are wired to four things that live elsewhere — the
 * dependency-free slug list `next.config.ts` reads, the landing-page registry
 * the sitemap reads, the `public/images/landing` artwork, and the five-step ring
 * the `Process` section renders. Every one of those breaks silently: a slug that
 * drifts serves a page at a URL the redirect list does not cover, a missing
 * image renders an empty card, and a four-step process leaves the ring's fifth
 * position reading `undefined`. That is what this covers.
 */

const PUBLIC_DIR = join(process.cwd(), 'public');

/** Every image path any section on these pages points at. */
function imagePaths(page: (typeof HIRE_ROLE_PAGES)[number]): string[] {
  return [
    ...page.capabilities.items.map((i) => i.image),
    ...(page.fit?.rows ?? []).map((r) => r.image),
    ...page.specialisations.items.map((i) => i.image),
    page.hero.background?.src,
    page.overview.image?.src,
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

  it('gives Process exactly five steps', () => {
    // `components/generative-ai/process.tsx` renders a five-point ring and
    // slices to five. With fewer, advancing past the last step indexes past the
    // end of the array and the copy panel renders undefined.
    for (const page of HIRE_ROLE_PAGES) {
      expect(page.process.steps.length, `${page.key}: process has ${page.process.steps.length} steps`)
        .toBe(5);
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
      for (const table of [page.comparison, page.rates].filter(Boolean)) {
        const expected = table!.columns.length - 1;
        for (const row of table!.rows) {
          expect(row.values.length, `${page.key}/${row.criterion}`).toBe(expected);
        }
      }
    }
  });

  it('links cards only at routes we serve', () => {
    // A card href is either the hero form's anchor (the default) or one of our
    // own routes. An outbound or speculative URL here would 404 silently on
    // hover — the failure mode `MARKETING_PATHS` exists to prevent, except that
    // these hrefs bypass `navHref` entirely and so are not covered by it.
    const ours = new Set(LANDING_PAGES.map((p) => p.path));
    for (const page of HIRE_ROLE_PAGES) {
      for (const item of page.specialisations.items) {
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
      expect(page.overview.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(page.capabilities.items.length).toBeGreaterThanOrEqual(6);
      expect(page.specialisations.items.length).toBeGreaterThanOrEqual(6);
      expect(page.engagement.blocks.length).toBeGreaterThanOrEqual(2);
      expect(page.techStack.groups.length).toBeGreaterThanOrEqual(4);
      expect(page.faq.items.length).toBeGreaterThanOrEqual(5);

      for (const item of page.capabilities.items) {
        expect(item.body.length, `${page.key}/${item.name} has no description`).toBeGreaterThan(60);
      }
      for (const item of page.specialisations.items) {
        expect(item.body.length, `${page.key}/${item.name} has no description`).toBeGreaterThan(60);
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
