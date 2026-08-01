'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import type { JSONContent } from '@tiptap/core';
import { api, ApiError } from '@/lib/api';
import { slugify } from '@/lib/content/slug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichEditor } from './rich-editor';
import { EditorPanel } from './editor-panel';
import { MediaPicker, type MediaItem } from '@/components/admin/media/media-picker';
import { RevisionsDialog } from './revisions-dialog';

type Kind = 'post' | 'page';
type Status = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED';

interface TaxItem {
  id: string;
  name: string;
}

export interface ContentRecord {
  id: string;
  title: string;
  slug: string;
  contentJson: JSONContent;
  excerpt: string | null;
  status: Status;
  publishedAt: string | null;
  coverImage: MediaItem | null;
  ogImage: MediaItem | null;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  categoryIds: string[];
  tagIds: string[];
}

function toLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 16);
}

function toIso(local: string): string | null {
  if (!local) return null;
  const d = new Date(local);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function ContentForm({
  kind,
  initial,
  categories = [],
  tags = [],
}: {
  kind: Kind;
  initial: ContentRecord | null;
  categories?: TaxItem[];
  tags?: TaxItem[];
}) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(initial?.id ?? null);
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [content, setContent] = useState<JSONContent | null>(initial?.contentJson ?? null);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [status, setStatus] = useState<Status>(initial?.status ?? 'DRAFT');
  const [publishedAt, setPublishedAt] = useState(toLocalInput(initial?.publishedAt ?? null));
  const [cover, setCover] = useState<MediaItem | null>(initial?.coverImage ?? null);
  const [ogImage, setOgImage] = useState<MediaItem | null>(initial?.ogImage ?? null);
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? '');
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? '');
  const [canonicalUrl, setCanonicalUrl] = useState(initial?.canonicalUrl ?? '');
  const [noIndex, setNoIndex] = useState(initial?.noIndex ?? false);
  const [categoryIds, setCategoryIds] = useState<string[]>(initial?.categoryIds ?? []);
  const [tagIds, setTagIds] = useState<string[]>(initial?.tagIds ?? []);

  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const base = `/api/v1/admin/${kind}s`;

  const effectiveSlug = slugTouched ? slug : slugify(title || 'untitled');

  function buildPayload() {
    const payload: Record<string, unknown> = {
      title,
      slug: effectiveSlug,
      contentJson: content ?? { type: 'doc', content: [{ type: 'paragraph' }] },
      excerpt: excerpt || null,
      status,
      publishedAt: status === 'DRAFT' ? (publishedAt ? toIso(publishedAt) : null) : toIso(publishedAt),
      coverImageId: cover?.id ?? null,
      ogImageId: ogImage?.id ?? null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      canonicalUrl: canonicalUrl || null,
      noIndex,
    };
    if (kind === 'post') {
      payload.categoryIds = categoryIds;
      payload.tagIds = tagIds;
    }
    return payload;
  }

  const markDirty = () => setDirty(true);

  // Mark dirty whenever a tracked field changes (after mount).
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    markDirty();
  }, [title, slug, content, excerpt, status, publishedAt, cover, ogImage, seoTitle, seoDescription, canonicalUrl, noIndex, categoryIds, tagIds]);

  const doSave = useCallback(
    async (opts: { autosave?: boolean; overrideStatus?: Status } = {}) => {
      setSaving(true);
      try {
        const payload = buildPayload();
        if (opts.overrideStatus) payload.status = opts.overrideStatus;

        if (!id) {
          const data = await api<Record<string, ContentRecord>>(base, {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          const record = data[kind];
          setId(record.id);
          setDirty(false);
          setSavedAt(new Date().toLocaleTimeString());
          if (!opts.autosave) {
            toast.success('Created.');
            router.replace(`/admin/${kind}s/${record.id}`);
          }
          return record.id;
        }

        await api(`${base}/${id}${opts.autosave ? '?autosave=1' : ''}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setDirty(false);
        setSavedAt(new Date().toLocaleTimeString());
        if (!opts.autosave) toast.success('Saved.');
        if (opts.overrideStatus) setStatus(opts.overrideStatus);
        return id;
      } catch (e) {
        if (!opts.autosave) toast.error(e instanceof ApiError ? e.message : 'Save failed.');
        return null;
      } finally {
        setSaving(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, base, kind, title, slug, content, excerpt, status, publishedAt, cover, ogImage, seoTitle, seoDescription, canonicalUrl, noIndex, categoryIds, tagIds],
  );

  // Debounced autosave (only for existing records).
  useEffect(() => {
    if (!id || !dirty) return;
    const t = setTimeout(() => {
      void doSave({ autosave: true });
    }, 1500);
    return () => clearTimeout(t);
  }, [id, dirty, doSave]);

  async function preview() {
    let currentId = id;
    if (!currentId || dirty) currentId = await doSave({ autosave: true });
    if (!currentId) return toast.error('Save before previewing.');
    try {
      const data = await api<{ url: string }>(`${base}/${currentId}/preview`, { method: 'POST' });
      window.open(data.url, '_blank', 'noopener');
    } catch {
      toast.error('Could not create preview link.');
    }
  }

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Main column */}
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled" className="text-lg" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={effectiveSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <RichEditor value={content} onChange={setContent} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Auto-generated from content if left blank." />
        </div>
      </div>

      {/* Sidebar */}
      <EditorPanel showTaxonomy={kind === 'post'}>
        <Card data-panel-section="publish">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Publish</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(status === 'SCHEDULED' || status === 'PUBLISHED') && (
              <div className="space-y-2">
                <Label htmlFor="publishedAt">Publish date</Label>
                <Input id="publishedAt" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{saving ? 'Saving…' : savedAt ? `Saved ${savedAt}` : dirty ? 'Unsaved changes' : 'Up to date'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => doSave()} disabled={saving} size="sm">Save</Button>
              <Button onClick={() => doSave({ overrideStatus: 'PUBLISHED' })} disabled={saving} size="sm" variant="secondary">Publish</Button>
              <Button onClick={preview} disabled={saving} size="sm" variant="outline">Preview</Button>
              {kind === 'post' && id && <RevisionsDialog postId={id} />}
            </div>
          </CardContent>
        </Card>

        <Card data-panel-section="cover">
          <CardHeader className="pb-3"><CardTitle className="text-sm">Cover image</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {cover ? (
              <div className="space-y-2">
                <div className="relative aspect-video overflow-hidden rounded-md border">
                  <Image src={cover.url} alt={cover.altText} fill sizes="300px" className="object-cover" unoptimized />
                </div>
                <div className="flex gap-2">
                  <MediaPicker onSelect={setCover}><Button size="sm" variant="outline">Change</Button></MediaPicker>
                  <Button size="sm" variant="ghost" onClick={() => setCover(null)}>Remove</Button>
                </div>
              </div>
            ) : (
              <MediaPicker onSelect={setCover}><Button size="sm" variant="outline">Select cover image</Button></MediaPicker>
            )}
          </CardContent>
        </Card>

        {kind === 'post' && (
          <Card data-panel-section="taxonomy">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Taxonomy</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TaxGroup label="Categories" items={categories} selected={categoryIds} onToggle={(v) => toggle(categoryIds, setCategoryIds, v)} empty="No categories yet." />
              <TaxGroup label="Tags" items={tags} selected={tagIds} onToggle={(v) => toggle(tagIds, setTagIds, v)} empty="No tags yet." />
            </CardContent>
          </Card>
        )}

        <Card data-panel-section="seo">
          <CardHeader className="pb-3"><CardTitle className="text-sm">SEO</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="seoTitle">Meta title</Label>
                <span title="Recommended: up to 60 characters" className={`text-xs ${seoTitle.length > 60 ? 'font-medium text-amber-600' : 'text-muted-foreground'}`}>
                  {seoTitle.length}/60
                </span>
              </div>
              <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="seoDescription">Meta description</Label>
                <span
                  title="Recommended: 150–160 characters"
                  className={`text-xs ${seoDescription.length > 0 && (seoDescription.length < 150 || seoDescription.length > 160) ? 'font-medium text-amber-600' : 'text-muted-foreground'}`}
                >
                  {seoDescription.length}/160
                </span>
              </div>
              <Textarea id="seoDescription" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canonicalUrl">Canonical URL</Label>
              <Input id="canonicalUrl" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} placeholder="https://…" />
            </div>
            <div className="space-y-2">
              <Label>OG image override</Label>
              <div className="flex items-center gap-2">
                <MediaPicker onSelect={setOgImage}><Button size="sm" variant="outline">{ogImage ? 'Change' : 'Select'}</Button></MediaPicker>
                {ogImage && <Button size="sm" variant="ghost" onClick={() => setOgImage(null)}>Remove</Button>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="noIndex">No-index</Label>
              <Switch id="noIndex" checked={noIndex} onCheckedChange={setNoIndex} />
            </div>
          </CardContent>
        </Card>
      </EditorPanel>
    </div>
  );
}

function TaxGroup({
  label,
  items,
  selected,
  onToggle,
  empty,
}: {
  label: string;
  items: TaxItem[];
  selected: string[];
  onToggle: (id: string) => void;
  empty: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{empty}</p>
      ) : (
        <div className="max-h-40 space-y-1.5 overflow-y-auto">
          {items.map((it) => (
            <label key={it.id} className="flex items-center gap-2 text-sm">
              <Checkbox checked={selected.includes(it.id)} onCheckedChange={() => onToggle(it.id)} />
              {it.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
