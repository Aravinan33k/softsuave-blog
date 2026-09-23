import { describe, expect, it } from 'vitest';
import { navHrefForPage, navPanels } from './nav-menu';
import { nav } from './content';

/**
 * The whole marketing surface renders the homepage's bar, so the homepage's
 * in-page anchors have to keep working from pages that do not have those
 * sections. Getting this wrong fails silently — the link simply scrolls
 * nowhere — which is why it is tested rather than eyeballed.
 */
describe('navHrefForPage', () => {
  it('leaves the homepage untouched', () => {
    expect(navHrefForPage('#services', true)).toBe('#services');
    expect(navHrefForPage('#top', true)).toBe('#top');
  });

  it('resolves a bare anchor against the homepage elsewhere', () => {
    expect(navHrefForPage('#services', false)).toBe('/#services');
    expect(navHrefForPage('#why', false)).toBe('/#why');
    expect(navHrefForPage('#top', false)).toBe('/#top');
  });

  it('never touches a path, with or without a fragment', () => {
    for (const onHome of [true, false]) {
      expect(navHrefForPage('/industries', onHome)).toBe('/industries');
      expect(navHrefForPage('/industries#sector-fintech', onHome)).toBe(
        '/industries#sector-fintech',
      );
      expect(navHrefForPage('/blog', onHome)).toBe('/blog');
    }
  });
});

describe('nav menu data', () => {
  // Anything else — "industries", "./x" — would resolve against whatever path
  // the reader happens to be on, so it must not exist in the first place.
  it('only holds hrefs that are a path or an anchor', () => {
    const hrefs = [
      // a null href is a division with no page of its own — nothing to resolve
      ...nav.links.flatMap((l) => (l.href === null ? [] : [l.href])),
      nav.cta.href,
      ...Object.values(navPanels).flatMap((panel) => [
        panel.cta.href,
        ...panel.groups.flatMap((g) =>
          g.items.flatMap((i) => [i.href, ...(i.items ?? []).map((s) => s.href)]),
        ),
      ]),
    ];

    expect(hrefs.length).toBeGreaterThan(50);
    for (const href of hrefs) {
      expect(
        href.startsWith('/') || href.startsWith('#'),
        `"${href}" is neither a path nor an anchor`,
      ).toBe(true);
    }
  });

  it('opens a panel for every division that is not a plain link', () => {
    // A label with a panel must match by exact string — the bar looks its panel
    // up by label, so a renamed division silently loses its menu.
    for (const label of Object.keys(navPanels)) {
      expect(
        nav.links.some((l) => l.label === label),
        `panel "${label}" is not on the bar`,
      ).toBe(true);
    }
  });
});
