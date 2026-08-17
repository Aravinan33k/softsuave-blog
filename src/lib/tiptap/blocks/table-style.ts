import { Table } from '@tiptap/extension-table';
import type { JSONContent } from '@tiptap/core';

// Style variants for comparison tables.
//
// 'brand' is the accent-header table and stays the DEFAULT, so every table
// already authored or imported keeps rendering exactly as before — the attribute
// is additive. 'plain' is the minimal variant: no header fill, no inner rules.
//
// The variant only ever needs to reach CSS, so it rides on the <table> class via
// an attribute-level renderHTML. Table's own renderHTML already merges
// HTMLAttributes, which means we never override it — that method also builds the
// <colgroup> and resolves column widths, and reimplementing it just to add a
// class would be a needless fork of upstream behaviour.
export const TABLE_STYLES = ['brand', 'plain'] as const;
export type TableStyle = (typeof TABLE_STYLES)[number];

export const StyledTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      variant: {
        default: 'brand' as TableStyle,
        parseHTML: (el) => ((el as HTMLElement).classList.contains('table-plain') ? 'plain' : 'brand'),
        // 'brand' is the CSS default (bare <table>), so it emits no class at all.
        renderHTML: (attrs) => (attrs.variant === 'plain' ? { class: 'table-plain' } : {}),
      },
    };
  },
});

// Build a table pre-shaped for comparisons: a header row carrying `headers`
// followed by `bodyRows` empty rows, in the given style variant. The labels are
// placeholders the author overwrites. Lives here rather than in the toolbar
// because `insertTable` can neither pre-fill cells nor set attributes, so the
// explicit node tree has to stay in step with this node's schema.
export function comparisonTable(headers: string[], bodyRows: number, variant: TableStyle = 'brand'): JSONContent {
  const cell = (type: 'tableHeader' | 'tableCell', text?: string): JSONContent => ({
    type,
    content: [text ? { type: 'paragraph', content: [{ type: 'text', text }] } : { type: 'paragraph' }],
  });
  return {
    type: 'table',
    attrs: { variant },
    content: [
      { type: 'tableRow', content: headers.map((h) => cell('tableHeader', h)) },
      ...Array.from({ length: bodyRows }, () => ({
        type: 'tableRow',
        content: headers.map(() => cell('tableCell')),
      })),
    ],
  };
}
