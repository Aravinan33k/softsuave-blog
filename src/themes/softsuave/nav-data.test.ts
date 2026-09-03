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
  // `/about` is the stand-in for a path this app does not serve at all — it has
  // no route in app/(marketing), so it belongs to the live site whatever the
  // release flag says. It replaced `/contact` here once this app grew its own
  // contact page; a path we DO serve can never demonstrate this.
  it('sends paths this app does not serve to the live site in either release state', async () => {
    for (const flag of ['true', 'false']) {
      const { navHref, isExternalHref } = await loadNav(flag);
      expect(navHref('/about')).toBe(`${SITE}/about`);
      expect(isExternalHref('/about')).toBe(true);
    }
  });

  // /contact and /awards-recognition are real routes in app/(marketing), so they
  // follow "/" behind the same flag: ours once released, the live site's until
  // then — the same contract as the service pages.
  it('keeps this app own contact and awards pages local once released', async () => {
    const { navHref, isExternalHref } = await loadNav('true');
    for (const path of ['/contact', '/awards-recognition']) {
      expect(navHref(path)).toBe(path);
      expect(isExternalHref(path)).toBe(false);
    }
  });

  it('sends contact and awards to the live site while unreleased', async () => {
    for (const flag of ['false', undefined]) {
      const { navHref, isExternalHref } = await loadNav(flag);
      for (const path of ['/contact', '/awards-recognition']) {
        expect(navHref(path)).toBe(`${SITE}${path}`);
        expect(isExternalHref(path)).toBe(true);
      }
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

  // The service pages in app/(marketing) ship with the homepage behind the same
  // flag, so they follow "/" in both directions. next.config.ts redirects them to
  // /blog while the flag is off, which is exactly why an unreleased one must link
  // out to the live site rather than at our own redirect.
  it('keeps marketing service pages local once the homepage is released', async () => {
    const { navHref, isExternalHref } = await loadNav('true');
    expect(navHref('/ai-development-service')).toBe('/ai-development-service');
    expect(isExternalHref('/ai-development-service')).toBe(false);
  });

  it('sends marketing service pages to the live site while unreleased', async () => {
    for (const flag of ['false', undefined]) {
      const { navHref, isExternalHref } = await loadNav(flag);
      expect(navHref('/ai-development-service')).toBe(`${SITE}/ai-development-service`);
      expect(isExternalHref('/ai-development-service')).toBe(true);
    }
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

// `navRoute` is the next/link counterpart of `navHref`. With the app served from
// the domain root the two agree — every local path IS its own route — so what
// these cases pin is that a <Link> href is never sent through the marketing site
// or left needing a redirect hop.
describe('navRoute', () => {
  it('routes the archive to itself — no redirect hop for next/link', async () => {
    for (const flag of ['true', 'false', undefined]) {
      const { navRoute } = await loadNav(flag);
      expect(navRoute('/blog')).toBe('/blog');
    }
  });

  it('routes "/" locally once the homepage is released', async () => {
    const { navRoute } = await loadNav('true');
    expect(navRoute('/')).toBe('/');
  });

  it('sends "/" to the live site while the homepage is unreleased', async () => {
    for (const flag of ['false', undefined]) {
      const { navRoute } = await loadNav(flag);
      expect(navRoute('/')).toBe(`${SITE}/`);
    }
  });

  it('leaves paths this app does not serve to navHref, absolute and unprefixed', async () => {
    for (const flag of ['true', 'false']) {
      const { navRoute } = await loadNav(flag);
      expect(navRoute('/about')).toBe(`${SITE}/about`);
    }
  });
});
