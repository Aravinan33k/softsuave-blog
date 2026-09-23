import { describe, expect, it } from 'vitest';
import { navHrefForPage, navPanels, type NavMenuItem } from './nav-menu';
import { footer, nav } from './content';

/** Every item of every panel, at every depth. */
const allItems = (items: readonly NavMenuItem[]): NavMenuItem[] =>
  items.flatMap((i) => [i, ...allItems(i.items ?? [])]);
const menuItems = Object.values(navPanels).flatMap((panel) =>
  panel.groups.flatMap((g) => allItems(g.items)),
);

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
      ...Object.values(navPanels).map((panel) => panel.cta.href),
      ...menuItems.flatMap((i) => (i.href === undefined ? [] : [i.href])),
    ];

    expect(hrefs.length).toBeGreaterThan(50);
    for (const href of hrefs) {
      expect(
        href.startsWith('/') || href.startsWith('#'),
        `"${href}" is neither a path nor an anchor`,
      ).toBe(true);
    }
  });

  // A heading with no page (Native / Hybrid App Development) is only there to
  // hold its children; one with neither would render as a dead label.
  it('gives every href-less item children to head', () => {
    for (const item of menuItems) {
      if (item.href === undefined) {
        expect(item.items?.length, `"${item.name}" has no href and no children`).toBeGreaterThan(0);
      }
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

/**
 * The footer's sitemap columns are read off these panels. Pinned here so a
 * change to either side that breaks the match shows up as a failing test
 * rather than as a footer that quietly disagrees with the nav.
 */
describe('footer columns', () => {
  const column = (title: string) =>
    footer.columns.find((c) => c.title === title)?.links.map((l) => l.label);

  it('lists exactly what the Industries, Company and Resources panels list', () => {
    for (const title of ['Industries', 'Company', 'Resources']) {
      const panel = navPanels[title].groups.flatMap((g) => g.items.map((i) => i.name));
      expect(column(title), title).toEqual(panel);
    }
  });

  it("lists each Services category's main page, not the hire lists", () => {
    expect(column('Services')).toEqual([
      'Custom AI Development',
      'Data Engineering',
      'Data Science',
      'Hire Forward Deployed Engineer',
      'Custom Software Development',
      'Web App Development',
      'Mobile App Development',
      'Global Capability Center',
      'Offshore Development',
      'IT Staff Augmentation',
      'IT Outsourcing',
      'Legacy Modernization',
      'Product Engineering',
      'Cloud Computing',
    ]);
  });
});
