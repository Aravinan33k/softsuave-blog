'use client';

import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';

// Editor UI for one accordion section: a title field plus editable body content.
// Deliberately mirrors FaqItemView, but the node type differs so faqLd() skips it
// — see blocks/accordion.ts for why that separation matters.
export function AccordionItemView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  return (
    <NodeViewWrapper className="my-2 rounded-lg border bg-card">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">▸</span>
        <input
          type="text"
          value={String(node.attrs.title ?? '')}
          onChange={(e) => updateAttributes({ title: e.target.value })}
          placeholder="Section title"
          className="flex-1 bg-transparent text-sm font-semibold outline-none"
        />
        <button
          type="button"
          onClick={() => deleteNode()}
          title="Remove section"
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <NodeViewContent className="ac-body px-3 py-2 text-sm" />
    </NodeViewWrapper>
  );
}
