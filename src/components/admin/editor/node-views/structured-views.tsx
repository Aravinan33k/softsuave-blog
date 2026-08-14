'use client';

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import type { FeatureItem, StatItem, StepItem } from '@/lib/tiptap/blocks/structured';

// Shared editor chrome for the data-driven blocks. The published HTML is built by
// each node's renderHTML from the same `items` array — these forms only edit it.

// `onAdd` covers the common case of appending a blank item. Blocks whose Add has
// to open a picker pass `addControl` instead, and `headerExtra` carries any
// block-level control (e.g. the gallery's column count) into the same header row.
export function BlockShell({
  label,
  onAdd,
  addControl,
  headerExtra,
  children,
}: {
  label: string;
  onAdd?: () => void;
  addControl?: React.ReactNode;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NodeViewWrapper className="my-3 rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          {headerExtra}
          {addControl ??
            (onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium hover:bg-accent"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            ))}
        </div>
      </div>
      {children}
    </NodeViewWrapper>
  );
}

export function Field({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`rounded border bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring ${className ?? ''}`}
    />
  );
}

export function Row({ onRemove, children }: { onRemove: () => void; children: React.ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      {children}
      <button
        type="button"
        onClick={onRemove}
        title="Remove"
        className="ml-auto rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function FeatureGridView({ node, updateAttributes }: NodeViewProps) {
  const items = (node.attrs.items as FeatureItem[]) ?? [];
  const set = (i: number, patch: Partial<FeatureItem>) =>
    updateAttributes({ items: items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const add = () => updateAttributes({ items: [...items, { icon: '✨', title: 'New feature', desc: '' }] });
  const remove = (i: number) => updateAttributes({ items: items.filter((_, idx) => idx !== i) });

  return (
    <BlockShell label="Feature grid" onAdd={add}>
      {items.map((it, i) => (
        <Row key={i} onRemove={() => remove(i)}>
          <Field value={it.icon} onChange={(v) => set(i, { icon: v })} placeholder="⚡" className="w-12 text-center" />
          <Field value={it.title} onChange={(v) => set(i, { title: v })} placeholder="Title" className="w-40" />
          <Field value={it.desc} onChange={(v) => set(i, { desc: v })} placeholder="Description (optional)" className="flex-1" />
        </Row>
      ))}
    </BlockShell>
  );
}

export function StatsView({ node, updateAttributes }: NodeViewProps) {
  const items = (node.attrs.items as StatItem[]) ?? [];
  const set = (i: number, patch: Partial<StatItem>) =>
    updateAttributes({ items: items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const add = () => updateAttributes({ items: [...items, { value: '00', label: 'Label' }] });
  const remove = (i: number) => updateAttributes({ items: items.filter((_, idx) => idx !== i) });

  return (
    <BlockShell label="Stats counter" onAdd={add}>
      {items.map((it, i) => (
        <Row key={i} onRemove={() => remove(i)}>
          <Field value={it.value} onChange={(v) => set(i, { value: v })} placeholder="15K+" className="w-28" />
          <Field value={it.label} onChange={(v) => set(i, { label: v })} placeholder="Customers" className="flex-1" />
        </Row>
      ))}
    </BlockShell>
  );
}

export function StepsView({ node, updateAttributes }: NodeViewProps) {
  const items = (node.attrs.items as StepItem[]) ?? [];
  const set = (i: number, patch: Partial<StepItem>) =>
    updateAttributes({ items: items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const add = () => updateAttributes({ items: [...items, { title: 'Next step', desc: '' }] });
  const remove = (i: number) => updateAttributes({ items: items.filter((_, idx) => idx !== i) });

  return (
    <BlockShell label="Steps" onAdd={add}>
      {items.map((it, i) => (
        <Row key={i} onRemove={() => remove(i)}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff0042] text-xs font-bold text-white">
            {i + 1}
          </span>
          <Field value={it.title} onChange={(v) => set(i, { title: v })} placeholder="Step title" className="w-44" />
          <Field value={it.desc} onChange={(v) => set(i, { desc: v })} placeholder="Description (optional)" className="flex-1" />
        </Row>
      ))}
    </BlockShell>
  );
}
