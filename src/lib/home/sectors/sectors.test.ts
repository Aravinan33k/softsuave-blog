import { describe, expect, it } from 'vitest';

import { SECTOR_PAGES, SECTOR_SLUGS } from './index';
import { capabilities, sectors } from '../industries-content';
import { caseStudies } from '../content';
import { LANDING_PAGES } from '../landing-pages';
import generated from '../images.generated.json';

/**
 * The sector pages are wired to four things that live elsewhere — the index's
 * sector list, the capability list, the case studies, and the image manifest —
 * by string key. Every one of those breaks silently: a renamed key leaves an
 * empty band or a missing image, with no type error. That is what this covers.
 */

/**
 * Slots the pipeline has actually rendered — the file `getImage` reads, keyed
 * "<page>/<id>". Not `images.manifest.json`, which also lists slots that were
 * declared but never generated, and so would pass a page that throws.
 */
const renderedSlots = new Set(Object.keys(generated as Record<string, unknown>));

describe('sector pages', () => {
  it('covers every sector the index lists, once', () => {
    expect(SECTOR_PAGES.map((s) => s.key).sort()).toEqual(sectors.items.map((s) => s.key).sort());
    expect(new Set(SECTOR_SLUGS).size).toBe(SECTOR_PAGES.length);
  });

  it('takes its slug from the index card that links to it', () => {
    // The card's href IS the route. If these drift, /industries links to a 404
    // or back out to the live site.
    for (const page of SECTOR_PAGES) {
      const card = sectors.items.find((s) => s.key === page.key);
      expect(card, `no index card for ${page.key}`).toBeDefined();
      expect(card!.href).toBe(page.slug);
    }
  });

  it('is registered as a landing page', () => {
    const known = new Set(LANDING_PAGES.map((p) => p.path));
    for (const slug of SECTOR_SLUGS) expect(known.has(slug), `${slug} unregistered`).toBe(true);
  });

  // A tag that matches nothing would silently drop the page to the one
  // "Every sector" row, which reads as a design choice rather than a bug.
  it('has a capabilityTag that selects at least one named capability row', () => {
    for (const page of SECTOR_PAGES) {
      const named = capabilities.items.filter((item) =>
        (item.sectors as readonly string[]).includes(page.capabilityTag),
      );
      expect(named.length, `${page.key}: capabilityTag "${page.capabilityTag}" matches nothing`)
        .toBeGreaterThan(0);
    }
  });

  it('names a case study that exists, or none at all', () => {
    const keys = new Set<string>(caseStudies.items.map((s) => s.key));
    for (const page of SECTOR_PAGES) {
      if (page.proof.caseStudyKey === null) continue;
      expect(keys.has(page.proof.caseStudyKey), `${page.key}: no study "${page.proof.caseStudyKey}"`)
        .toBe(true);
    }
  });

  // `BrandImage` throws on an unknown id at build time, so a hero pointing at
  // an unregistered slot takes the page down rather than degrading. Covers the
  // hand-placed `sec-hero-*` frames too: those are registered in
  // images.generated.json by hand, so nothing but this test catches a typo.
  it('only points at image slots the pipeline has rendered', () => {
    for (const page of SECTOR_PAGES) {
      if (page.hero.img === null) continue;
      const slot = `four/${page.hero.img}`;
      expect(renderedSlots.has(slot), `${page.key}: missing slot ${slot}`).toBe(
        true,
      );
    }
  });

  it('says something concrete in every band', () => {
    for (const page of SECTOR_PAGES) {
      expect(page.hero.titleLines.length).toBeGreaterThanOrEqual(2);
      expect(page.hero.body.length).toBeGreaterThan(40);
      expect(page.solutions.items.length).toBeGreaterThanOrEqual(5);
      expect(page.meta.title.length).toBeGreaterThan(10);
      expect(page.meta.description.length).toBeGreaterThan(50);
      for (const item of page.solutions.items) {
        expect(item.body.length, `${page.key}/${item.name} has no description`).toBeGreaterThan(40);
      }
    }
  });
});
