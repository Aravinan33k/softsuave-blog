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
  // `/career-overview` is the stand-in for a path this app does not serve at
  // all — it is linked from the nav (and from the applicant notice under every
  // hero enquiry form) but has no route in app/(marketing), so it belongs to
  // the live site whatever the release flag says. A path we DO serve can never
  // demonstrate this.
  //
  // It replaced `/career-overview` here once this app grew its own careers
  // index, which had replaced `/case-studies`, which had replaced `/about`,
  // which had replaced `/contact`. Each swap is this app absorbing one more
  // page from the live site.
  //
  // `/softsuave-career` should outlast them: it is HR's applicant intake form,
  // not a marketing page, and this app has no reason to grow one. Our own
  // careers page deliberately links out to it (see `careers-content.ts`), so
  // this assertion is load-bearing rather than illustrative — if it ever goes
  // local, every "Apply Now" on /career-overview breaks with it.
  it('sends paths this app does not serve to the live site in either release state', async () => {
    for (const flag of ['true', 'false']) {
      const { navHref, isExternalHref } = await loadNav(flag);
      expect(navHref('/softsuave-career')).toBe(`${SITE}/softsuave-career`);
      expect(isExternalHref('/softsuave-career')).toBe(true);
    }
  });

  // An href that is already a complete destination must survive untouched.
  // `navHref` prefixes anything it does not recognise with SITE, which turned
  // `mailto:careers@softsuave.com` into
  // `https://www.softsuave.commailto:careers@softsuave.com` — a dead link that
  // failed silently. /career-overview's HR cards are mailto links, so this is
  // the guard on them.
  it('passes complete URLs and non-http schemes through untouched', async () => {
    for (const flag of ['true', 'false']) {
      const { navHref, isExternalHref } = await loadNav(flag);
      for (const href of [
        'https://www.softsuave.com/30-min-free-consultation',
        'http://example.com/x',
        '//cdn.example.com/y',
        'mailto:careers@softsuave.com',
        'tel:+918015159981',
      ]) {
        expect(navHref(href), href).toBe(href);
        expect(isExternalHref(href), href).toBe(true);
      }
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

  // The sector index is the one marketing route whose path also exists on
  // softsuave.com, and the nav's Industries item has pointed at it since before
  // we served it. Both directions matter: unreleased it must reach the live
  // site's page, released it must reach ours rather than the live one.
  it('follows the release flag for the sector index, which exists on both sites', async () => {
    const released = await loadNav('true');
    expect(released.navHref('/industries')).toBe('/industries');
    expect(released.isExternalHref('/industries')).toBe(false);

    for (const flag of ['false', undefined]) {
      const { navHref, isExternalHref } = await loadNav(flag);
      expect(navHref('/industries')).toBe(`${SITE}/industries`);
      expect(isExternalHref('/industries')).toBe(true);
    }
  });

  // The mega menu's sector items are "/industries#sector-<key>". A fragment is
  // part of the link, not the route, so it must not decide where the link goes:
  // matching the whole string would miss the local set and hand every sector
  // item to softsuave.com, for a page we serve ourselves.
  it('judges a href carrying a fragment by its path', async () => {
    const released = await loadNav('true');
    expect(released.isExternalHref('/industries#sector-fintech')).toBe(false);
    expect(released.navHref('/industries#sector-fintech')).toBe('/industries#sector-fintech');
    expect(released.navRoute('/industries#sector-fintech')).toBe('/industries#sector-fintech');

    // Unreleased it still belongs to the live site — fragment carried along.
    const unreleased = await loadNav('false');
    expect(unreleased.navHref('/industries#sector-fintech')).toBe(
      `${SITE}/industries#sector-fintech`,
    );
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
      expect(navRoute('/softsuave-career')).toBe(`${SITE}/softsuave-career`);
    }
  });
});
