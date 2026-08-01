'use client';

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';

// Editor form for the decorative CTA section. Shows a live-ish preview frame with
// editable fields; the published HTML is built by ctaSection's renderHTML.
export function CtaSectionView({ node, updateAttributes }: NodeViewProps) {
  const a = node.attrs as { title: string; text: string; buttonLabel: string; buttonHref: string };
  const set = (patch: Partial<typeof a>) => updateAttributes(patch);

  return (
    <NodeViewWrapper className="my-3">
      <div className="relative rounded-2xl border border-[#ff0042]/25 bg-[radial-gradient(130%_100%_at_50%_0%,rgba(255,0,66,0.05),transparent_60%)] p-6 text-center">
        <p className="mb-1 text-left text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">CTA section</p>
        <input
          value={a.title}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="Heading"
          className="w-full bg-transparent text-center text-xl font-extrabold outline-none placeholder:text-muted-foreground/50"
        />
        <textarea
          value={a.text}
          onChange={(e) => set({ text: e.target.value })}
          placeholder="Supporting text (optional)"
          rows={2}
          className="mt-2 w-full resize-none bg-transparent text-center text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/50"
        />
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <input
            value={a.buttonLabel}
            onChange={(e) => set({ buttonLabel: e.target.value })}
            placeholder="Button label"
            className="rounded-full bg-[#ff0042] px-4 py-2 text-center text-sm font-bold text-white outline-none placeholder:text-white/70"
            size={Math.max(8, a.buttonLabel.length)}
          />
          <input
            value={a.buttonHref}
            onChange={(e) => set({ buttonHref: e.target.value })}
            placeholder="https://…"
            className="min-w-40 flex-1 rounded border bg-background px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
