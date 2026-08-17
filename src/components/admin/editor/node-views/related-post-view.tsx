'use client';

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Trash2, Link2 } from 'lucide-react';
import { PostPicker } from '@/components/admin/editor/post-picker';

// Editor form for the inline related-reading card. The target is chosen from the
// post list rather than typed, so the slug is always one that exists; the card
// renders a root-relative href from it (see blocks/related-post.ts).
export function RelatedPostView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const a = node.attrs as { slug: string; title: string; excerpt: string; label: string };

  return (
    <NodeViewWrapper className="my-3 rounded-lg border-l-4 border-l-[#ff0042] bg-card p-3 pl-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <input
          value={a.label ?? ''}
          onChange={(e) => updateAttributes({ label: e.target.value })}
          placeholder="Related reading"
          className="w-40 bg-transparent text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground outline-none"
        />
        <div className="flex items-center gap-1">
          <PostPicker
            onSelect={(p) => updateAttributes({ slug: p.slug, title: a.title?.trim() ? a.title : p.title })}
          >
            <button type="button" className="flex items-center gap-1 rounded border px-2 py-1 text-xs hover:bg-accent">
              <Link2 className="h-3.5 w-3.5" /> {a.slug ? 'Change post' : 'Pick post'}
            </button>
          </PostPicker>
          <button
            type="button"
            onClick={() => deleteNode()}
            title="Remove card"
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <input
        value={a.title ?? ''}
        onChange={(e) => updateAttributes({ title: e.target.value })}
        placeholder="Card title (defaults to the post title)"
        className="w-full bg-transparent text-base font-bold outline-none placeholder:text-muted-foreground/50"
      />
      <textarea
        value={a.excerpt ?? ''}
        onChange={(e) => updateAttributes({ excerpt: e.target.value })}
        placeholder="Short teaser (optional)"
        rows={2}
        className="mt-1 w-full resize-none bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground/50"
      />
      <p className="mt-1 text-[0.7rem] text-muted-foreground">
        {a.slug ? `→ /${a.slug}` : 'No post selected — the card will link nowhere until you pick one.'}
      </p>
    </NodeViewWrapper>
  );
}
