import { describe, it, expect } from 'vitest';
import { getSchema, type JSONContent } from '@tiptap/core';
import { generateJSON } from '@tiptap/html/server';
import { baseExtensions } from '../extensions';
import { renderTipTapToHtml } from '@/lib/content/render';
import { withTableScroll } from '@/lib/content/toc';
import { comparisonTable } from './table-style';

const schema = getSchema(baseExtensions);
const doc = (node: JSONContent): JSONContent => ({ type: 'doc', content: [node] });

// Renders through the real publish pipeline (generateHTML → DOMPurify) plus the
// read-time table wrapper, so these assert what a reader actually receives.
const publish = (node: JSONContent) => withTableScroll(renderTipTapToHtml(doc(node)));

describe('comparisonTable', () => {
  it('builds a schema-valid table', () => {
    expect(() => schema.nodeFromJSON(doc(comparisonTable(['A', 'B'], 2))).check()).not.toThrow();
  });

  it('emits one header cell per column and an empty body grid', () => {
    const html = publish(comparisonTable(['Company', 'Rating', 'Reviews'], 3));
    expect(html.match(/<th\b/g)).toHaveLength(3);
    expect(html.match(/<td\b/g)).toHaveLength(9);
  });

  it('pre-fills the header labels', () => {
    const html = publish(comparisonTable(['Criteria', 'Option A'], 1));
    expect(html).toContain('Criteria');
    expect(html).toContain('Option A');
  });

  it('is wrapped for horizontal scroll at read time', () => {
    expect(publish(comparisonTable(['A'], 1)).startsWith('<div class="table-scroll">')).toBe(true);
  });

  it('loses its inline min-width styles to the sanitizer', () => {
    // `style` is not in ALLOWED_ATTR; column widths come from CSS instead.
    expect(publish(comparisonTable(['A', 'B'], 1))).not.toMatch(/<table[^>]*style=/);
  });
});

describe('table style variant', () => {
  it('marks the plain variant with a class', () => {
    expect(publish(comparisonTable(['A'], 1, 'plain'))).toMatch(/<table[^>]*class="[^"]*table-plain/);
  });

  it('leaves the brand variant unclassed, since brand is the CSS default', () => {
    expect(publish(comparisonTable(['A'], 1, 'brand'))).not.toContain('table-plain');
  });

  it('defaults to brand', () => {
    expect(comparisonTable(['A'], 1).attrs?.variant).toBe('brand');
  });

  it.each(['brand', 'plain'] as const)('round-trips the %s variant through HTML', (variant) => {
    const back = generateJSON(publish(comparisonTable(['A', 'B'], 2, variant)), baseExtensions) as JSONContent;
    const table = back.content?.find((n) => n.type === 'table');
    expect(table).toBeDefined();
    expect(table?.attrs?.variant).toBe(variant);
  });

  // Tables authored before the variant existed carry no attrs. They must keep
  // rendering exactly as before, i.e. as the brand style with no class.
  it('renders a legacy table with no variant attribute as brand', () => {
    const legacy: JSONContent = {
      type: 'table',
      content: [
        { type: 'tableRow', content: [{ type: 'tableHeader', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'A' }] }] }] },
        { type: 'tableRow', content: [{ type: 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text: '1' }] }] }] },
      ],
    };
    const html = publish(legacy);
    expect(html).not.toContain('table-plain');
    expect(html).toContain('<th');
    expect(html).toContain('<td');
  });
});
