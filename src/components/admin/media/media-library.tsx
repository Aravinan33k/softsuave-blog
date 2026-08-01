'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import type { MediaItem } from './media-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MediaListItem extends MediaItem {
  sizeBytes: number;
  createdAt: string;
  uploadedBy?: { email: string };
}

interface UsageRef {
  type: string;
  title: string;
  via: string;
}

const PER_PAGE = 24;

const SORTS = [
  { key: 'newest', label: 'Newest first', sort: 'createdAt', dir: 'desc' },
  { key: 'oldest', label: 'Oldest first', sort: 'createdAt', dir: 'asc' },
  { key: 'name-asc', label: 'Name A–Z', sort: 'filename', dir: 'asc' },
  { key: 'name-desc', label: 'Name Z–A', sort: 'filename', dir: 'desc' },
  { key: 'largest', label: 'Largest first', sort: 'sizeBytes', dir: 'desc' },
  { key: 'smallest', label: 'Smallest first', sort: 'sizeBytes', dir: 'asc' },
] as const;

export function MediaLibrary() {
  const [items, setItems] = useState<MediaListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('newest');
  const [term, setTerm] = useState('');
  const [q, setQ] = useState('');

  // Debounce the free-text search into the applied query; resets to page 1.
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setQ(term.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [term]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const s = SORTS.find((x) => x.key === sortKey) ?? SORTS[0];
      const sp = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE), sort: s.sort, dir: s.dir });
      if (q) sp.set('q', q);
      const data = await api<{ items: MediaListItem[]; total: number }>(`/api/v1/admin/media?${sp.toString()}`);
      // Current page fell out of range (e.g. after deletes) — step back and refetch.
      if (data.items.length === 0 && data.total > 0 && page > 1) {
        setPage(Math.ceil(data.total / PER_PAGE));
        return;
      }
      setItems(data.items);
      setTotal(data.total);
    } catch {
      toast.error('Failed to load media.');
    } finally {
      setLoading(false);
    }
  }, [page, q, sortKey]);

  useEffect(() => {
    // Fetch on mount and whenever page/search/sort changes; setState is async.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  async function upload() {
    if (!file) return toast.error('Choose a file.');
    if (!altText.trim()) return toast.error('Alt text is required.');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('altText', altText.trim());
      const data = await api<{ media: MediaListItem }>('/api/v1/admin/media', { method: 'POST', body: form });
      if (page === 1 && !q && sortKey === 'newest') {
        setItems((prev) => [data.media, ...prev]);
        setTotal((t) => t + 1);
      } else {
        void load();
      }
      setFile(null);
      setAltText('');
      const input = document.getElementById('media-file') as HTMLInputElement | null;
      if (input) input.value = '';
      toast.success('Uploaded.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function saveAlt(item: MediaListItem, value: string) {
    if (!value.trim()) return toast.error('Alt text is required.');
    try {
      await api(`/api/v1/admin/media/${item.id}`, { method: 'PATCH', body: JSON.stringify({ altText: value.trim() }) });
      setItems((prev) => prev.map((m) => (m.id === item.id ? { ...m, altText: value.trim() } : m)));
      toast.success('Alt text saved.');
    } catch {
      toast.error('Failed to save alt text.');
    }
  }

  async function del(item: MediaListItem) {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api(`/api/v1/admin/media/${item.id}`, { method: 'DELETE' });
      toast.success('Deleted.');
      void load();
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        const usage = (e.details as { usage?: UsageRef[] } | undefined)?.usage ?? [];
        const list = usage.map((u) => `• ${u.type}: ${u.title} (${u.via})`).join('\n');
        if (window.confirm(`This image is referenced by:\n${list}\n\nDelete anyway? Those references will break.`)) {
          try {
            await api(`/api/v1/admin/media/${item.id}?force=true`, { method: 'DELETE' });
            toast.success('Deleted.');
            void load();
          } catch {
            toast.error('Force delete failed.');
          }
        }
      } else {
        toast.error(e instanceof ApiError ? e.message : 'Delete failed.');
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 pt-6">
          <div className="space-y-2">
            <Label htmlFor="media-file">Image</Label>
            <Input
              id="media-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-64"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="media-alt">Alt text (required)</Label>
            <Input id="media-alt" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image" className="w-72" />
          </div>
          <Button onClick={upload} disabled={uploading}>{uploading ? 'Uploading…' : 'Upload'}</Button>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search media…" aria-label="Search media" className="pl-8" />
        </div>
        <Select value={sortKey} onValueChange={(v) => { if (v) { setPage(1); setSortKey(String(v)); } }}>
          <SelectTrigger className="w-44" aria-label="Sort media">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((s) => (
              <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{q ? 'No media matches your search.' : 'No media yet.'}</p>
      ) : (
        <>
          <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${loading ? 'opacity-60' : ''}`}>
            {items.map((m) => (
              <Card key={m.id} className="overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <Image src={m.url} alt={m.altText} fill sizes="300px" className="object-cover" unoptimized />
                </div>
                <CardContent className="space-y-2 p-3">
                  <p className="truncate text-xs text-muted-foreground" title={m.filename}>{m.filename}</p>
                  <AltEditor initial={m.altText} onSave={(v) => saveAlt(m, v)} />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{m.width}×{m.height}</span>
                    <Button variant="ghost" size="icon" onClick={() => del(m)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages} · {total} item{total === 1 ? '' : 's'}
              </p>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AltEditor({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex gap-1">
      <Input value={value} onChange={(e) => setValue(e.target.value)} className="h-8 text-xs" />
      {value !== initial && (
        <Button size="sm" variant="secondary" className="h-8" onClick={() => onSave(value)}>Save</Button>
      )}
    </div>
  );
}
