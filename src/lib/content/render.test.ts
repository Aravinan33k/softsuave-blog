import { describe, it, expect } from 'vitest';
import { sanitizeHtml, contentStats, deriveExcerpt } from './render';

describe('sanitizeHtml', () => {
  it('strips <script> tags', () => {
    expect(sanitizeHtml('<p>hi</p><script>alert(1)</script>')).not.toContain('script');
  });
  it('neutralises javascript: hrefs', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).not.toContain('javascript:');
  });
  it('keeps allowed tags', () => {
    const out = sanitizeHtml('<h2>t</h2><strong>b</strong>');
    expect(out).toContain('<h2>');
    expect(out).toContain('<strong>');
  });
  it('removes disallowed tags (iframe)', () => {
    expect(sanitizeHtml('<iframe src="https://evil"></iframe>')).not.toContain('iframe');
  });
  it('adds lazy loading + async decoding to images that lack them', () => {
    const out = sanitizeHtml('<img src="/uploads/a.webp" alt="a">');
    expect(out).toContain('loading="lazy"');
    expect(out).toContain('decoding="async"');
  });
  it('keeps explicit loading/decoding values', () => {
    const out = sanitizeHtml('<img src="/a.webp" alt="a" loading="eager" decoding="sync">');
    expect(out).toContain('loading="eager"');
    expect(out).toContain('decoding="sync"');
    expect(out).not.toContain('lazy');
  });
});

describe('contentStats', () => {
  it('counts words and computes reading time', () => {
    const s = contentStats(`<p>${Array(400).fill('word').join(' ')}</p>`);
    expect(s.wordCount).toBe(400);
    expect(s.readingTimeMinutes).toBe(2);
  });
  it('returns zero for empty content', () => {
    expect(contentStats('')).toEqual({ wordCount: 0, readingTimeMinutes: 0 });
  });
});

describe('deriveExcerpt', () => {
  it('truncates with an ellipsis', () => {
    const e = deriveExcerpt(`<p>${'alpha '.repeat(100)}</p>`, 40);
    expect(e.length).toBeLessThanOrEqual(41);
    expect(e.endsWith('…')).toBe(true);
  });
});
