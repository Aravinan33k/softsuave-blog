import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { HIRE_PATHS, HIRE_SKILLS, hireSkill } from './hire-skills';
import { LANDING_PAGES } from './landing-pages';
import { hireCapabilities, hireFaqs, hireHero, hireOverview, hireTechStack } from './hire-content';
import { hireSharedFaqs } from './hire-shared';

/**
 * These pages are generated from one template, so the risks are not the usual
 * ones. Nothing here re-tests a landing component; what it pins is the wiring
 * that a template makes easy to get wrong in bulk — a slug with no route, a
 * route missing from the registries, or copy that is accidentally identical
 * across twenty-four pages.
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
  // build. Both are silent until someone visits the URL, which is exactly the
  // failure a generated page set invites.
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

describe('hire page copy', () => {
  // The point of 24 separate pages rather than one is that each carries its own
  // argument. If these ever collapse into a find-and-replace of the technology
  // name, they are doorway pages and should be one page instead.
  it('gives every skill a distinct title, H1, description and overview', () => {
    for (const field of ['metaTitle', 'metaDescription', 'overviewTitle', 'pullQuote'] as const) {
      const values = HIRE_SKILLS.map((s) => s[field]);
      expect(new Set(values).size, `duplicate ${field}`).toBe(HIRE_SKILLS.length);
    }
    const h1s = HIRE_SKILLS.map((s) => s.titleLines.join(' '));
    expect(new Set(h1s).size).toBe(HIRE_SKILLS.length);
  });

  it('gives every skill its own hero body and capability copy', () => {
    const heroBodies = HIRE_SKILLS.map((s) => s.heroBody.join(' '));
    expect(new Set(heroBodies).size).toBe(HIRE_SKILLS.length);

    const capabilityBodies = HIRE_SKILLS.flatMap((s) => s.capabilities.map((c) => c.body));
    expect(new Set(capabilityBodies).size).toBe(capabilityBodies.length);
  });

  it('asks technology-specific FAQs that are unique to each page', () => {
    const questions = HIRE_SKILLS.flatMap((s) => s.faqs.map((f) => f.q));
    expect(new Set(questions).size).toBe(questions.length);
  });

  it('meets the section shapes the landing components lay out for', () => {
    for (const skill of HIRE_SKILLS) {
      // `spansFor` composes rows of 2 and 3; 6 is what the bold grid lays out
      // as two clean rows, and every other page in this set uses 6.
      expect(skill.capabilities, skill.slug).toHaveLength(6);
      expect(skill.techGroups, skill.slug).toHaveLength(4);
      expect(skill.heroBody.length, skill.slug).toBe(2);
      expect(skill.overviewParagraphs.length, skill.slug).toBeGreaterThanOrEqual(3);
      expect(skill.faqs.length, skill.slug).toBeGreaterThanOrEqual(4);
    }
  });

  it('keeps meta descriptions within the length search results will show', () => {
    for (const skill of HIRE_SKILLS) {
      expect(skill.metaDescription.length, skill.slug).toBeGreaterThan(110);
      expect(skill.metaDescription.length, skill.slug).toBeLessThanOrEqual(175);
    }
  });

  it('points every hero image at a real asset path', () => {
    for (const skill of HIRE_SKILLS) {
      expect(skill.image.src, skill.slug).toMatch(/^\/images\/four\/[\w.-]+$/);
      expect(skill.image.alt.length, skill.slug).toBeGreaterThan(20);
    }
  });
});

describe('hire content composition', () => {
  const skill = hireSkill('hire-reactjs-developers');

  it('builds a hero carrying the skill copy and the shared form', () => {
    const hero = hireHero(skill);
    expect(hero.titleLines).toEqual(skill.titleLines);
    expect(hero.form.subject).toBe('React Developers enquiry');
    // `badges` is optional on HeroContent — a hero may omit them. The hire
    // template is not one of those: it always passes the shared trust row.
    expect(hero.badges?.length ?? 0).toBeGreaterThan(0);
  });

  it('puts technology questions before the shared commercial ones', () => {
    const faqs = hireFaqs(skill);
    expect(faqs.items).toHaveLength(skill.faqs.length + hireSharedFaqs.length);
    expect(faqs.items[0].q).toBe(skill.faqs[0].q);
    expect(faqs.items.at(-1)?.q).toBe(hireSharedFaqs.at(-1)?.q);
  });

  it('derives section headings from the skill rather than hardcoding one', () => {
    expect(hireCapabilities(skill).title).toContain('React Developers');
    expect(hireTechStack(skill).title).toContain('React');
    expect(hireOverview(skill).title).toBe(skill.overviewTitle);
  });

  it('produces a unique FAQ set per skill', () => {
    const first = hireFaqs(hireSkill('hire-kotlin-developer')).items.map((f) => f.q);
    const second = hireFaqs(hireSkill('hire-swift-developers')).items.map((f) => f.q);
    expect(first).not.toEqual(second);
  });
});
