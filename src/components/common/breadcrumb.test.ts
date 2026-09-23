import { describe, it, expect } from 'vitest';
import { breadcrumbLabel } from './breadcrumb';
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
    expect(breadcrumbLabel('/software-development-company')).toBe('Custom Software Development');
    expect(breadcrumbLabel('/fintech-ai-solutions')).toBe('FinTech');
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
