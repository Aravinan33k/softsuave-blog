'use client';

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { filledStars } from '@/lib/tiptap/blocks/rating';

// Editor form for the rating block, with a live star preview built from the same
// filledStars() the published renderHTML uses — so what's previewed can't drift
// from what's published.
export function RatingView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const a = node.attrs as { score: string; max: string; label: string; count: string };
  const filled = filledStars(Number.parseFloat(a.score), Number.parseFloat(a.max));

  const field = (
    key: keyof typeof a,
    placeholder: string,
    className: string,
    inputMode?: 'decimal',
  ) => (
    <input
      value={a[key] ?? ''}
      onChange={(e) => updateAttributes({ [key]: e.target.value })}
      placeholder={placeholder}
      inputMode={inputMode}
      className={`rounded border bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring ${className}`}
    />
  );

  return (
    <NodeViewWrapper className="my-3 rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Rating</span>
        <button
          type="button"
          onClick={() => deleteNode()}
          title="Remove rating"
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-lg leading-none tracking-tight text-[#ff0042]">
          {'★'.repeat(filled)}
          <span className="text-muted-foreground/40">{'☆'.repeat(5 - filled)}</span>
        </span>
        <span className="text-sm font-bold">
          {a.score || '—'}/{a.max || '5'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {field('score', '4.8', 'w-16', 'decimal')}
        <span className="text-sm text-muted-foreground">/</span>
        {field('max', '5', 'w-14', 'decimal')}
        {field('label', 'Clutch rating', 'w-40')}
        {field('count', '39 reviews (optional)', 'flex-1 min-w-40')}
      </div>
      <p className="mt-1.5 text-[0.7rem] text-muted-foreground">
        Stars round to the nearest whole star; the exact score is always shown as text.
      </p>
    </NodeViewWrapper>
  );
}
