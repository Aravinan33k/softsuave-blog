import { describe, it, expect } from 'vitest';
import { breadcrumbLabel, breadcrumbTrail } from './breadcrumb';
import { MARKETING_ROUTES } from '@/lib/home/landing-pages';

/**
 * The trail names the page from the route alone, so the thing worth pinning is
 * the lookup: that every marketing route gets a label, that the label is the
 * short name rather than a `<title>` sales line, and that "/" gets none.
 */
describe('breadcrumbLabel', () => {
  it('renders no trail on the homepage', () => {
    expect(breadcrumbLabel('/')).toBeUndefined();
  });

  it('labels every other marketing route', () => {
    for (const path of MARKETING_ROUTES.filter((p) => p !== '/')) {
      const label = breadcrumbLabel(path);
      expect(label, `no breadcrumb label for ${path}`).toBeTruthy();
      // A registry title that kept its tail would read "Hire X | 40-Hour Trial".
      expect(label).not.toMatch(/\s[|–—]\s/);
    }
  });

  it('prefers the mega menu label for service pages', () => {
    expect(breadcrumbLabel('/web-application-development-company')).toBe('Web App Development');
    expect(breadcrumbLabel('/fintech-ai-solutions')).toBe('FinTech');
  });

  it('lets a registry breadcrumbLabel beat the menu label and the title', () => {
    expect(breadcrumbLabel('/software-development-company')).toBe('Software Development');
    expect(breadcrumbLabel('/python-application-development-company')).toBe('Python Development');
  });

  it('names hire pages by role, not by their one-word nav label', () => {
    expect(breadcrumbLabel('/hire-python-developers')).toBe('Hire Python Developers');
    expect(breadcrumbLabel('/hire-dedicated-developers')).toBe('Hire Dedicated Developer');
  });

  it('falls back to the registry title for pages the menu lists only tersely', () => {
    expect(breadcrumbLabel('/android-application-development-company')).toBe(
      'Android App Development Company',
    );
  });

  it('tolerates a trailing slash and ignores unknown paths', () => {
    expect(breadcrumbLabel('/clients/')).toBe('Our Clients');
    expect(breadcrumbLabel('/no-such-page')).toBeUndefined();
  });
});

describe('breadcrumbTrail', () => {
  const names = (path: string) => breadcrumbTrail(path).map((c) => c.name);
  const paths = (path: string) => breadcrumbTrail(path).map((c) => c.path);

  it('puts a sub-page under its mega-menu parent', () => {
    expect(names('/generative-ai-development-company')).toEqual(['Custom AI Development', 'Generative AI']);
    expect(paths('/generative-ai-development-company')[0]).toBe('/custom-ai-development-services');
    expect(names('/reactjs-app-development-company')[0]).toBe('Web App Development');
  });

  it('skips a menu heading that has no page of its own', () => {
    // Android sits under the unlinked "Native App Development" heading.
    expect(paths('/android-application-development-company')).toEqual([
      '/mobile-application-development-company',
      '/android-application-development-company',
    ]);
  });

  it('uses a registry-declared parent for pages the menu does not nest', () => {
    expect(paths('/ai-solutions-for-construction')[0]).toBe('/industries');
    expect(paths('/fintech-ai-solutions')[0]).toBe('/industries');
    expect(paths('/vuejs-development-company')[0]).toBe('/web-application-development-company');
  });

  it('names a page by its current-page label only at the end of its own trail', () => {
    expect(names('/web-application-development-company')).toEqual([
      'Software Development',
      'Web App Development Service',
    ]);
    expect(names('/python-application-development-company')[1]).toBe('Web App Development');
  });

  it('puts PHP under Software Development › Web App Development', () => {
    expect(names('/php-application-development-company')).toEqual([
      'Software Development',
      'Web App Development',
      'PHP Development',
    ]);
  });

  it('follows a registry-declared parent chain', () => {
    expect(names('/python-application-development-company')).toEqual([
      'Software Development',
      'Web App Development',
      'Python Development',
    ]);
    expect(paths('/python-application-development-company')).toEqual([
      '/software-development-company',
      '/web-application-development-company',
      '/python-application-development-company',
    ]);
  });

  it('puts hire pages under the hire index, but not the index itself', () => {
    expect(paths('/hire-python-developers')[0]).toBe('/hire-dedicated-developers');
    expect(paths('/hire-dedicated-developers')).toEqual(['/hire-dedicated-developers']);
  });

  it('leaves top-level pages as Home › page, and "/" empty', () => {
    expect(names('/custom-ai-development-services')).toEqual(['Custom AI Development']);
    expect(names('/about')).toEqual(['About Us']);
    expect(breadcrumbTrail('/')).toEqual([]);
  });

  it('gives every marketing route a trail whose parents are real, labelled routes', () => {
    for (const path of MARKETING_ROUTES.filter((p) => p !== '/')) {
      const trail = breadcrumbTrail(path);
      expect(trail.at(-1)?.path, path).toBe(path);
      for (const crumb of trail.slice(0, -1)) {
        expect(MARKETING_ROUTES, `${path} → ${crumb.path}`).toContain(crumb.path);
        expect(crumb.name).toBeTruthy();
      }
    }
  });
});
