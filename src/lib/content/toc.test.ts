import { describe, it, expect } from 'vitest';
import { withHeadingAnchors, withLazyImages, withTableScroll } from './toc';

describe('withHeadingAnchors', () => {
  it('injects ids and builds a table of contents', () => {
    const { html, toc } = withHeadingAnchors('<h2>Getting Started</h2><p>x</p><h3>Install</h3>');
    expect(html).toContain('<h2 id="getting-started">');
    expect(html).toContain('<h3 id="install">');
    expect(toc).toEqual([
      { id: 'getting-started', text: 'Getting Started', level: 2 },
      { id: 'install', text: 'Install', level: 3 },
    ]);
  });

  it('dedupes duplicate heading ids', () => {
    const { toc } = withHeadingAnchors('<h2>Intro</h2><h2>Intro</h2>');
    expect(toc[0].id).toBe('intro');
    expect(toc[1].id).toBe('intro-2');
  });

  it('ignores h1/h4 (only h2/h3)', () => {
    const { toc } = withHeadingAnchors('<h1>Title</h1><h4>Small</h4><h2>Real</h2>');
    expect(toc).toHaveLength(1);
    expect(toc[0].text).toBe('Real');
  });

  it('lazy-loads content images without overriding explicit attrs', () => {
    const { html } = withHeadingAnchors('<img src="/a.webp" alt="a"><img src="/b.webp" alt="b" loading="eager">');
    expect(html).toContain('<img src="/a.webp" alt="a" loading="lazy" decoding="async">');
    expect(html).toContain('<img src="/b.webp" alt="b" loading="eager" decoding="async">');
  });
});

describe('withTableScroll', () => {
  it('wraps each table in a scroll container', () => {
    const out = withTableScroll('<table><tbody><tr><th>A</th></tr></tbody></table>');
    expect(out).toBe('<div class="table-scroll"><table><tbody><tr><th>A</th></tr></tbody></table></div>');
  });

  it('wraps multiple tables independently', () => {
    const out = withTableScroll('<table><tr><td>1</td></tr></table><p>x</p><table><tr><td>2</td></tr></table>');
    expect(out.match(/<div class="table-scroll">/g)).toHaveLength(2);
    expect(out).toContain('</table></div><p>x</p><div class="table-scroll"><table>');
  });

  it('leaves table-free markup untouched', () => {
    expect(withTableScroll('<p>text</p>')).toBe('<p>text</p>');
  });

  it('runs as part of the read-time pipeline', () => {
    const { html } = withHeadingAnchors('<h2>T</h2><table><tr><td>1</td></tr></table>');
    expect(html).toContain('<div class="table-scroll"><table>');
  });
});

describe('withLazyImages', () => {
  it('leaves non-img markup untouched', () => {
    expect(withLazyImages('<p>text</p>')).toBe('<p>text</p>');
  });

  it('adds decoding only when missing', () => {
    expect(withLazyImages('<img src="/a.webp" decoding="sync">')).toBe(
      '<img src="/a.webp" decoding="sync" loading="lazy">',
    );
  });
});
