'use client';

import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { youtubeThumbnail } from '@/lib/tiptap/blocks/youtube';
import { MediaPicker } from '@/components/admin/media/media-picker';

// Editor form for video embeds. The iframe itself is NOT rendered here — a live
// embed inside the editor steals focus and clicks, and costs a third-party request
// on every keystroke-triggered re-render. Instead this shows the thumbnail plus the
// fields VideoObject JSON-LD needs (see lib/seo/video-ld.ts), because Google treats
// name/description/thumbnail/uploadDate as required and the schema is skipped
// entirely when any is blank. The warning below tells the author exactly that.

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-0.5 block text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  'w-full rounded border bg-background px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-ring';

export function VideoView({ node, updateAttributes, deleteNode }: NodeViewProps) {
  const isYoutube = node.type.name === 'youtubeEmbed';
  const a = node.attrs as {
    videoId: string;
    videoHash?: string;
    title: string;
    description: string;
    uploadDate: string;
    thumbnailUrl: string;
  };

  // Mirrors videoLd()'s own resolution order so the warning can't disagree with it.
  const thumb = a.thumbnailUrl || (isYoutube && a.videoId ? youtubeThumbnail(a.videoId) : '');
  const title = (a.title ?? '').trim().toLowerCase();
  const hasTitle = title !== '' && title !== 'youtube video' && title !== 'vimeo video';
  const missing = [
    !hasTitle && 'title',
    !a.description?.trim() && 'description',
    !thumb && 'thumbnail',
    !a.uploadDate?.trim() && 'upload date',
  ].filter(Boolean) as string[];

  return (
    <NodeViewWrapper className="my-3 rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {isYoutube ? 'YouTube' : 'Vimeo'} embed
        </span>
        <button
          type="button"
          onClick={() => deleteNode()}
          title="Remove video"
          className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-3">
        <div className="w-40 shrink-0">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- editor-only preview of a remote thumbnail
            <img src={thumb} alt="" className="aspect-video w-full rounded object-cover" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded bg-muted text-xs text-muted-foreground">
              No thumbnail
            </div>
          )}
          <p className="mt-1 truncate text-[0.65rem] text-muted-foreground" title={a.videoId}>
            id: {a.videoId || '—'}
          </p>
          {!isYoutube && (
            <MediaPicker onSelect={(m) => updateAttributes({ thumbnailUrl: m.url })}>
              <button type="button" className="mt-1 w-full rounded border px-2 py-1 text-[0.7rem] hover:bg-accent">
                Pick thumbnail
              </button>
            </MediaPicker>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <Labeled label="Title">
            <input
              value={a.title ?? ''}
              onChange={(e) => updateAttributes({ title: e.target.value })}
              placeholder="Video title"
              className={inputCls}
            />
          </Labeled>
          <Labeled label="Description">
            <textarea
              value={a.description ?? ''}
              onChange={(e) => updateAttributes({ description: e.target.value })}
              placeholder="Falls back to the post excerpt"
              rows={2}
              className={`${inputCls} resize-none`}
            />
          </Labeled>
          <Labeled label="Upload date">
            <input
              type="date"
              value={a.uploadDate ?? ''}
              onChange={(e) => updateAttributes({ uploadDate: e.target.value })}
              className={inputCls}
            />
          </Labeled>
        </div>
      </div>

      {missing.length > 0 && (
        <p className="mt-2 text-[0.7rem] text-muted-foreground">
          No video schema will be emitted — missing {missing.join(', ')}. The embed still renders normally.
        </p>
      )}
    </NodeViewWrapper>
  );
}
