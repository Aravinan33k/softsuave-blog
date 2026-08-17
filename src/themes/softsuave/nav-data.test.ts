import { describe, it, expect, vi, afterEach } from 'vitest';

// `homepageEnabled` is read once at module load, so each case needs a fresh
// import. In the real build the compiler inlines the value; under vitest it is
// an ordinary runtime read, which is what makes both states testable at all.
async function loadNav(homepageFlag: string | undefined) {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_HOMEPAGE_ENABLED', homepageFlag);
  return import('./nav-data');
}

const SITE = 'https://www.softsuave.com';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('navHref', () => {
  it('sends marketing paths to the live site in either release state', async () => {
    for (const flag of ['true', 'false']) {
      const { navHref } = await loadNav(flag);
      expect(navHref('/contact')).toBe(`${SITE}/contact`);
    }
  });

  it('always keeps the blog archive local — it is what this app ships', async () => {
    for (const flag of ['true', 'false', undefined]) {
      const { navHref, isExternalHref } = await loadNav(flag);
      expect(navHref('/blog')).toBe('/blog');
      expect(isExternalHref('/blog')).toBe(false);
    }
  });

  it('keeps "/" local once the homepage is released', async () => {
    const { navHref, isExternalHref } = await loadNav('true');
    expect(navHref('/')).toBe('/');
    expect(isExternalHref('/')).toBe(false);
  });

  it('sends "/" to the live site while the homepage is unreleased', async () => {
    const { navHref, isExternalHref } = await loadNav('false');
    expect(navHref('/')).toBe(`${SITE}/`);
    expect(isExternalHref('/')).toBe(true);
  });

  // The blog ships before the homepage, so an unset flag must hide the homepage.
  // Failing open here would publish an unreleased page on the first deployment
  // that forgot the variable.
  it('treats an unset flag as unreleased', async () => {
    const { navHref } = await loadNav(undefined);
    expect(navHref('/')).toBe(`${SITE}/`);
  });

  it('only accepts the exact string "true" as released', async () => {
    for (const flag of ['TRUE', '1', 'yes', '']) {
      const { navHref } = await loadNav(flag);
      expect(navHref('/')).toBe(`${SITE}/`);
    }
  });
});
