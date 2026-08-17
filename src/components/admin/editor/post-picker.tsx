'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api';

// Post search popover for the related-reading card. Reuses the existing
// GET /api/v1/admin/posts endpoint (already role-guarded by requireApiRole and
// already supporting ?q=), so this adds no new API surface.

export interface PickedPost {
  slug: string;
  title: string;
  status: string;
}

interface PostListResponse {
  items: { id: string; title: string; slug: string; status: string }[];
}

export function PostPicker({
  onSelect,
  children,
}: {
  onSelect: (post: PickedPost) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [items, setItems] = useState<PickedPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  // Debounced search; an AbortController drops responses from superseded queries
  // so a slow early request can't overwrite a newer one's results.
  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ perPage: '8' });
        if (q.trim()) params.set('q', q.trim());
        const data = await api<PostListResponse>(`/api/v1/admin/posts?${params}`, { signal: ctrl.signal });
        setItems(data.items.map((p) => ({ slug: p.slug, title: p.title, status: p.status })));
      } catch (err) {
        if (ctrl.signal.aborted) return;
        setError(err instanceof ApiError ? err.message : 'Could not load posts.');
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      ctrl.abort();
      clearTimeout(timer);
    };
  }, [q, open]);

  return (
    <span className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{children}</span>
      {open && (
        <>
          <span className="fixed inset-0 z-10 block" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-80 rounded-md border bg-popover p-2 shadow-md">
            <div className="mb-2 flex items-center gap-2 rounded border px-2">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search posts…"
                className="w-full bg-transparent py-1.5 text-sm outline-none"
              />
              {loading && <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-muted-foreground" />}
            </div>

            {error && <p className="px-1 py-2 text-xs text-destructive">{error}</p>}
            {!error && !loading && items.length === 0 && (
              <p className="px-1 py-2 text-xs text-muted-foreground">No posts found.</p>
            )}

            <ul className="max-h-64 overflow-y-auto">
              {items.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(p);
                      setOpen(false);
                    }}
                    className="flex w-full flex-col items-start gap-0.5 rounded px-2 py-1.5 text-left hover:bg-accent"
                  >
                    <span className="flex w-full items-center gap-2">
                      <span className="flex-1 truncate text-sm">{p.title}</span>
                      {p.status !== 'PUBLISHED' && (
                        <span className="shrink-0 rounded bg-muted px-1 text-[0.6rem] font-semibold uppercase text-muted-foreground">
                          {p.status}
                        </span>
                      )}
                    </span>
                    <span className="truncate text-[0.7rem] text-muted-foreground">/{p.slug}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </span>
  );
}
