import { describe, it, expect } from 'vitest';
import { slugify, ensureUniqueSlug } from './slug';

describe('slugify', () => {
  it('lowercases and hyphenates', () => expect(slugify('Hello World!')).toBe('hello-world'));
  it('strips diacritics', () => expect(slugify('Café Déjà')).toBe('cafe-deja'));
  it('collapses and trims separators', () => expect(slugify('  --Multiple   Spaces--  ')).toBe('multiple-spaces'));
  it('falls back to "untitled"', () => expect(slugify('!!!')).toBe('untitled'));
});

describe('ensureUniqueSlug', () => {
  it('returns the base when free', async () => {
    expect(await ensureUniqueSlug('post', async () => false)).toBe('post');
  });
  it('appends -2, -3 on collision', async () => {
    const taken = new Set(['post', 'post-2']);
    expect(await ensureUniqueSlug('post', async (s) => taken.has(s))).toBe('post-3');
  });
});
