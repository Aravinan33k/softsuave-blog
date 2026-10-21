import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Guards against a class of bug the compiler and ESLint both wave through: the
 * same property declared twice in one rule, where the second silently wins.
 *
 * Written after `.svcTitle` in `gen-ai.module.css` carried both `color: #fff`
 * (the intent, per the comment above the rule) and `color: var(--text-bright)`
 * a few lines later. The second won, so inside a `.light` band the card title
 * resolved to near-black ink over the near-black gradient the artwork cards
 * paint under their copy — 1.10:1, on 41 cards across six hire-by-role pages.
 * Nothing failed: the build was clean, the types were clean, and every test
 * passed, because none of them look at a rendered colour.
 *
 * A stylelint `declaration-block-no-duplicate-properties` rule would cover this
 * too, but the project runs no stylelint, and one test is cheaper than a second
 * linter in the pipeline.
 *
 * Deliberately not a contrast assertion: that needs a browser, and the browser
 * pass is what found this one. This catches the authoring slip that caused it.
 */

const MODULES = [
  'src/components/generative-ai/gen-ai.module.css',
  'src/components/home/home.module.css',
  'src/components/landing/landing.module.css',
];

/**
 * Every `selector { … }` block with the properties it declares more than once.
 *
 * Comments are stripped first, and custom properties are skipped: a re-declared
 * `--token` inside one block is how a theme narrows a value, not a mistake.
 * The regex only matches innermost blocks, so an at-rule wrapper contributes
 * its nested rules rather than itself — which is what we want to check anyway.
 */
function duplicateDeclarations(css: string): string[] {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const found: string[] = [];

  for (const [, rawSelector, body] of stripped.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = rawSelector.trim().split('\n').pop()!.trim();
    const seen = new Map<string, number>();

    for (const declaration of body.split(';')) {
      const colon = declaration.indexOf(':');
      if (colon < 0) continue;
      const property = declaration.slice(0, colon).trim();
      if (!property || property.startsWith('--')) continue;
      seen.set(property, (seen.get(property) ?? 0) + 1);
    }

    for (const [property, count] of seen) {
      if (count > 1) found.push(`${selector} { ${property} declared ${count}x }`);
    }
  }

  return found;
}

describe('CSS modules', () => {
  it.each(MODULES)('declares each property once per rule in %s', (file) => {
    if (!existsSync(file)) return;
    expect(duplicateDeclarations(readFileSync(file, 'utf8'))).toEqual([]);
  });

  it('detects a duplicate when one is present', () => {
    expect(duplicateDeclarations('.a { color: #fff; margin: 0; color: red; }')).toEqual([
      '.a { color declared 2x }',
    ]);
  });

  it('allows a re-declared custom property', () => {
    expect(duplicateDeclarations(':root { --x: 1; --x: 2; }')).toEqual([]);
  });
});
