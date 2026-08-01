'use client';

import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';

// Editor UI for a single FAQ item: an inline question field plus the editable
// answer content. Published output is a native <details>/<summary> (see faq.ts).
export function FaqItemView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  return (
    <NodeViewWrapper className="my-2 rounded-lg border bg-card">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Q</span>
        <input
          type="text"
          value={String(node.attrs.question ?? '')}
          onChange={(e) => updateAttributes({ question: e.target.value })}
          placeholder="Question"
          className="flex-1 bg-transparent text-sm font-semibold outline-none"
        />
        <button
          type="button"
          onClick={() => deleteNode()}
          title="Remove question"
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <NodeViewContent className="faq-answer px-3 py-2 text-sm" />
    </NodeViewWrapper>
  );
}
