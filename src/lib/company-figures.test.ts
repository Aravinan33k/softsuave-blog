import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  CLIENTS_PLUS,
  COUNTRIES_PLUS,
  FIGURES,
  HOURLY_RATE,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from './company-figures';

const SRC = join(__dirname, '..');

/** Every .ts/.tsx under src except tests and the figures module itself. */
function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    if (!/\.tsx?$/.test(name) || /\.test\.tsx?$/.test(name)) return [];
    if (path.endsWith(`lib${sep}company-figures.ts`)) return [];
    return [path];
  });
}

/** Block comments and whole-line `//` comments: documentation, not copy. */
const stripComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

describe('company figures', () => {
  it('prints each figure in the form the copy uses', () => {
    expect(YEARS_PLUS).toBe(`${FIGURES.years}+`);
    expect(SPECIALISTS_PLUS).toBe(`${FIGURES.specialists}+`);
    expect(CLIENTS_PLUS).toBe(`${FIGURES.clients}+`);
    expect(COUNTRIES_PLUS).toBe(`${FIGURES.countries}+`);
    expect(HOURLY_RATE).toBe(`$${FIGURES.hourlyRate}/hour`);
  });

  // The point of lib/company-figures.ts is that a new figure is ONE edit. A
  // figure typed straight into copy silently opts that page out — it keeps
  // the old number the next time the figures change. So no copy may spell
  // the current figures (or the ones they replaced) itself.
  it('is the only place the figures are written', () => {
    // "14+" with no space: copy writes a figure that way, while arithmetic
    // in code (`150 + rand(k, 2)`) is spaced and is not a figure.
    const typed = [
      { what: 'years', re: new RegExp(`\\b(${FIGURES.years}|13)\\+`) },
      { what: 'specialists', re: new RegExp(`\\b${FIGURES.specialists}\\+`) },
      { what: 'clients', re: new RegExp(`\\b${FIGURES.clients}\\+`) },
      { what: 'countries', re: new RegExp(`\\b(${FIGURES.countries}|21)\\+ ?countr`, 'i') },
      { what: 'hourly rate', re: new RegExp(`\\$${FIGURES.hourlyRate}\\b`) },
    ];
    const offenders: string[] = [];
    for (const file of sources(SRC)) {
      const code = stripComments(readFileSync(file, 'utf8'));
      for (const { what, re } of typed) {
        const m = code.match(re);
        if (m) offenders.push(`${relative(SRC, file)}: ${what} typed as "${m[0]}"`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
