import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { HIRE_PATHS, HIRE_SKILLS, hireSkill } from './hire-skills';
import { LANDING_PAGES } from './landing-pages';
import type { HireBand } from './hire-skill';
import { HIRE_CLIENT_LOGOS, HIRE_CLOSING_BAND } from './hire-blocks';
import { finalCta } from './content';

/**
 * These pages render through one component, so the risks are not the usual
 * ones. Nothing here re-tests a landing component; what it pins is the wiring
 * that a shared template makes easy to get wrong in bulk — a slug with no
 * route, a route missing from the registries — plus the two rules that this
 * page set exists to keep:
 *
 *   1. Section order is per page, taken from that page's live source. It is not
 *      one sequence applied to all twenty.
 *   2. No homepage-only section appears on any of them.
 */

const MARKETING_DIR = join(process.cwd(), 'src', 'app', '(marketing)');

describe('hire skill registry', () => {
  // Twenty of the original twenty-four. Android, iOS, Salesforce and Blockchain
  // moved out to `lib/home/hire-roles/`: softsuave.com files all four under
  // "Hire By Role", and their live pages run the role sections, so they are
  // role pages now. A path can only belong to one registry — two would mean two
  // entries in `LANDING_PAGES` for the same URL.
  it('has all 20 skills', () => {
    expect(HIRE_SKILLS).toHaveLength(20);
  });

  it('has unique slugs and keys', () => {
    expect(new Set(HIRE_SKILLS.map((s) => s.slug)).size).toBe(HIRE_SKILLS.length);
    expect(new Set(HIRE_SKILLS.map((s) => s.key)).size).toBe(HIRE_SKILLS.length);
  });

  // A slug with no folder renders nothing; a folder with no slug throws at
  // build. Both are silent until someone visits the URL.
  it('has a route folder for every skill', () => {
    for (const skill of HIRE_SKILLS) {
      const page = join(MARKETING_DIR, skill.slug, 'page.tsx');
      expect(existsSync(page), `missing route for ${skill.slug}`).toBe(true);
    }
  });

  it('throws on an unknown slug rather than rendering an empty page', () => {
    expect(() => hireSkill('hire-cobol-developers')).toThrow(/Unknown hire skill slug/);
  });

  it('registers every hire route in LANDING_PAGES, which drives the sitemap', () => {
    const registered = new Set(LANDING_PAGES.map((p) => p.path));
    for (const path of HIRE_PATHS) {
      expect(registered.has(path), `${path} missing from LANDING_PAGES`).toBe(true);
    }
  });
});

describe('section order follows each live page', () => {
  /**
   * The regression this set was rebuilt to fix: every page used to render one
   * fixed sequence. If these ever collapse back to a single order, they have
   * stopped reflecting their sources.
   */
  it('runs more than one distinct band order across the twenty pages', () => {
    const orders = new Set(HIRE_SKILLS.map((s) => s.order.join('>')));
    expect(orders.size).toBeGreaterThan(4);
  });

  it('keeps the newer pages on their own sequence, steps before services', () => {
    for (const slug of [
      'hire-django-developer',
      'hire-laravel-developer',
      'hire-ruby-on-rails-developer',
      'hire-kotlin-developer',
      'hire-magento-developer',
      'hire-drupal-developer',
    ]) {
      const { order } = hireSkill(slug);
      expect(order[0], slug).toBe('clients');
      expect(order.indexOf('process'), slug).toBeLessThan(order.indexOf('services'));
    }
  });

  it('keeps the older pages on theirs, rate band before the steps', () => {
    for (const slug of [
      'hire-reactjs-developers',
      'hire-java-developers',
      'hire-python-developers',
      'hire-dot-net-developers',
      'hire-flutter-developers',
    ]) {
      const { order } = hireSkill(slug);
      expect(order.indexOf('midCta'), slug).toBeLessThan(order.indexOf('process'));
      expect(order.indexOf('process'), slug).toBeLessThan(order.indexOf('whyUs'));
    }
  });

  it('puts the React Native comparison before its rate band, as the live page does', () => {
    const { order } = hireSkill('hire-react-native-developers');
    expect(order.indexOf('comparison')).toBeLessThan(order.indexOf('midCta'));
  });

  it('gives NestJS no FAQ, because its live page publishes none', () => {
    const nest = hireSkill('hire-nestjs-developers');
    expect(nest.order).not.toContain('faq');
    expect(nest.faq).toBeUndefined();
  });

  it('only lists a band the page actually carries content for', () => {
    // `clients` and `testimonials` render company-level components and hold no
    // per-page field, so they are exempt.
    type ContentBand = Exclude<HireBand, 'clients' | 'testimonials'>;
    const componentBands: readonly HireBand[] = ['clients', 'testimonials'];
    for (const skill of HIRE_SKILLS) {
      for (const band of skill.order) {
        if (componentBands.includes(band)) continue;
        const field = skill[band as ContentBand];
        expect(field, `${skill.slug} lists ${band} with no content`).toBeDefined();
      }
    }
  });

  it('declares no band twice on one page', () => {
    for (const skill of HIRE_SKILLS) {
      expect(new Set(skill.order).size, skill.slug).toBe(skill.order.length);
    }
  });
});

describe('no homepage content on a hire page', () => {
  const template = readFileSync(
    join(process.cwd(), 'src', 'components', 'landing', 'hire-page.tsx'),
    'utf8',
  );

  /**
   * The homepage's "Why Soft Suave" manifesto used to render on all twenty of
   * these under an `#why` anchor. It is on none of their live pages — the
   * per-page `whyUs` cards are what those pages run instead.
   */
  it('does not import the homepage manifesto', () => {
    expect(template).not.toMatch(/^import .*home\/manifesto/m);
  });

  it('does not import the homepage industries fan, work grid or awards strip', () => {
    for (const mod of ['industries', 'work-grid', 'awards']) {
      expect(template, mod).not.toMatch(new RegExp(`^import .*home/${mod}`, 'm'));
    }
  });

  /**
   * The homepage logo strip opens with the three clients its testimonials
   * quote, added here from softsuave.com's /clients index. The hire pages' own
   * band runs the other nineteen, so those three must not ride along.
   */
  it('runs the hire pages\' own client roster, not the homepage\'s three extras', () => {
    expect(HIRE_CLIENT_LOGOS).toHaveLength(19);
    for (const name of ['Phoenix Technologies', 'AMD Telecom', 'Perkypet']) {
      expect(HIRE_CLIENT_LOGOS.map((l) => l.name), name).not.toContain(name);
    }
  });

  /**
   * The closing band's copy must be the live "Book Free Consultation"
   * invitation, not the homepage's own AI-strategy pitch.
   */
  it('closes on the live enquiry band, not the homepage final CTA', () => {
    expect(HIRE_CLOSING_BAND.title).toBe('Book Free Consultation');
    expect(HIRE_CLOSING_BAND.title).not.toBe(finalCta.title);
    expect(HIRE_CLOSING_BAND.body).not.toBe(finalCta.body);
    // The band names itself in its heading, so it carries no separate kicker.
    expect(template).toMatch(/eyebrow=""/);
  });
});

describe('hire page copy', () => {
  // The point of twenty separate pages is that each carries its own page's
  // copy. If these collapse into a find-and-replace of the technology name,
  // they are doorway pages.
  it('gives every skill a distinct title, description and H1', () => {
    for (const field of ['metaTitle', 'metaDescription'] as const) {
      const values = HIRE_SKILLS.map((s) => s[field]);
      expect(new Set(values).size, `duplicate ${field}`).toBe(HIRE_SKILLS.length);
    }
    const h1s = HIRE_SKILLS.map((s) => s.hero.titleLines.join(' '));
    expect(new Set(h1s).size).toBe(HIRE_SKILLS.length);
  });

  it('gives every skill its own hero body', () => {
    const bodies = HIRE_SKILLS.map((s) => s.hero.body.join(' '));
    expect(new Set(bodies).size).toBe(HIRE_SKILLS.length);
  });

  it('gives every skill its own service card copy', () => {
    const bodies = HIRE_SKILLS.flatMap((s) => s.services?.items.map((i) => i.body) ?? []);
    expect(new Set(bodies).size).toBe(bodies.length);
  });

  /**
   * FAQ questions are NOT asserted unique across pages. Several live pages ask
   * the same four ("Is there any free trial period available?" and friends)
   * word for word, and rewording one to satisfy a test would put copy on the
   * page that its source does not have. Uniqueness is asserted per page.
   */
  it('asks each question only once within a page', () => {
    for (const skill of HIRE_SKILLS) {
      const qs = skill.faq?.items.map((f) => f.q) ?? [];
      expect(new Set(qs).size, skill.slug).toBe(qs.length);
    }
  });

  it('carries a hero, a headline and assurance points on every page', () => {
    for (const skill of HIRE_SKILLS) {
      expect(skill.hero.titleLines.length, skill.slug).toBe(2);
      expect(skill.hero.body.length, skill.slug).toBeGreaterThanOrEqual(2);
      expect(skill.hero.points.length, skill.slug).toBeGreaterThanOrEqual(4);
      expect(skill.hero.form.title, skill.slug).toBe('Get Skilled Remote Developers');
    }
  });

  it('keeps meta descriptions within the length search results will show', () => {
    for (const skill of HIRE_SKILLS) {
      expect(skill.metaDescription.length, skill.slug).toBeGreaterThan(110);
      expect(skill.metaDescription.length, skill.slug).toBeLessThanOrEqual(230);
    }
  });

  it('points every hero image at a real asset path', () => {
    for (const skill of HIRE_SKILLS) {
      expect(skill.hero.image?.src, skill.slug).toMatch(/^\/images\/four\/[\w.-]+$/);
      expect(skill.hero.image?.alt.length ?? 0, skill.slug).toBeGreaterThan(20);
    }
  });

  it('numbers every process and vetting step in sequence', () => {
    for (const skill of HIRE_SKILLS) {
      for (const [label, band] of [
        ['process', skill.process],
        ['vetting', skill.vetting],
      ] as const) {
        if (!band) continue;
        band.steps.forEach((step, i) => {
          expect(step.n, `${skill.slug} ${label}`).toBe(String(i + 1).padStart(2, '0'));
        });
      }
    }
  });

  it('keeps every comparison row aligned with its columns', () => {
    for (const skill of HIRE_SKILLS) {
      const table = skill.comparison;
      if (!table) continue;
      for (const row of table.rows) {
        expect(row.values.length, `${skill.slug}: ${row.area}`).toBe(table.columns.length);
      }
    }
  });

  it('links the explore band only at routes this app serves', () => {
    const paths = new Set(HIRE_PATHS);
    for (const skill of HIRE_SKILLS) {
      for (const item of skill.exploreMore?.items ?? []) {
        expect(paths.has(item.href ?? ''), `${skill.slug} -> ${item.href}`).toBe(true);
      }
    }
  });
});
