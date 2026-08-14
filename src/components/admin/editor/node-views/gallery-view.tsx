'use client';

import { type NodeViewProps } from '@tiptap/react';
import { Plus } from 'lucide-react';
import { GALLERY_COLUMNS, type GalleryImage } from '@/lib/tiptap/blocks/gallery';
import { MediaPicker } from '@/components/admin/media/media-picker';
import { BlockShell, Field, Row } from './structured-views';

// Editor form for the image gallery. Images come from the media library rather
// than a URL field so alt text is inherited from the library record — the gallery
// can't become a source of unaudited external image URLs or missing alt text.
export function GalleryView({ node, updateAttributes }: NodeViewProps) {
  const items = (node.attrs.items as GalleryImage[]) ?? [];
  const columns = String(node.attrs.columns ?? '2');

  const set = (i: number, patch: Partial<GalleryImage>) =>
    updateAttributes({ items: items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)) });
  const remove = (i: number) => updateAttributes({ items: items.filter((_, idx) => idx !== i) });

  return (
    <BlockShell
      label="Image gallery"
      headerExtra={
        <select
          value={columns}
          onChange={(e) => updateAttributes({ columns: e.target.value })}
          className="h-7 rounded border bg-background px-1 text-xs"
          title="Columns"
        >
          {GALLERY_COLUMNS.map((c) => (
            <option key={c} value={c}>
              {c} cols
            </option>
          ))}
        </select>
      }
      addControl={
        <MediaPicker
          onSelect={(m) =>
            updateAttributes({ items: [...items, { src: m.url, alt: m.altText ?? '', caption: '' }] })
          }
        >
          <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium hover:bg-accent">
            <Plus className="h-3.5 w-3.5" /> Add image
          </button>
        </MediaPicker>
      }
    >
      {items.length === 0 && (
        <p className="text-xs text-muted-foreground">No images yet — use “Add image”.</p>
      )}
      {items.map((it, i) => (
        <Row key={`${it.src}-${i}`} onRemove={() => remove(i)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- editor-only thumbnail */}
          <img src={it.src} alt="" className="h-10 w-14 shrink-0 rounded object-cover" />
          <Field value={it.alt} onChange={(v) => set(i, { alt: v })} placeholder="Alt text" className="w-40" />
          <Field
            value={it.caption}
            onChange={(v) => set(i, { caption: v })}
            placeholder="Caption (optional)"
            className="flex-1"
          />
        </Row>
      ))}
    </BlockShell>
  );
}
