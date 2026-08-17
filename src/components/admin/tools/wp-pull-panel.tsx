'use client';

import { useEffect, useRef, useState } from 'react';
import { CloudDownload, Loader2, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { csrfToken } from '@/lib/api';
import { appPath } from '@/lib/media-url';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DEFAULT_BASE = 'https://www.softsuave.com/blog';

interface Summary {
  posts: number;
  skipped: number;
  media: number;
  categories: number;
  tags: number;
  errors: string[];
}

// Pulls the live WordPress archive in batches. Each run imports up to `batchSize`
// NEW posts (existing slugs are skipped), so repeated batches walk the whole
// archive. "Continue until done" loops automatically until a batch imports 0.
export function WpPullPanel() {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE);
  const [batchSize, setBatchSize] = useState(50);
  const [running, setRunning] = useState(false);
  const [auto, setAuto] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const [wpTotal, setWpTotal] = useState<number | null>(null);
  const [dbPosts, setDbPosts] = useState<number | null>(null);
  const stopRef = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  const append = (line: string) => setLog((prev) => [...prev.slice(-400), line]);

  async function refreshCounts() {
    try {
      const res = await fetch(appPath(`/api/v1/admin/import/wordpress-rest?baseUrl=${encodeURIComponent(baseUrl)}`));
      if (!res.ok) return;
      const d = await res.json();
      setWpTotal(d.wpTotal ?? null);
      setDbPosts(d.dbPosts ?? null);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  /** Runs one streaming batch; resolves with how many NEW posts it imported. */
  async function runBatch(): Promise<number> {
    const csrf = csrfToken();
    const res = await fetch(appPath('/api/v1/admin/import/wordpress-rest'), {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(csrf ? { 'x-csrf-token': csrf } : {}) },
      body: JSON.stringify({ baseUrl, limit: batchSize }),
    });
    if (!res.ok || !res.body) {
      const err = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      throw new Error(err?.error?.message ?? `Import failed (HTTP ${res.status})`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let imported = 0;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.trim()) continue;
        let msg: { type: string; message?: string; summary?: Summary; dbPosts?: number };
        try {
          msg = JSON.parse(line);
        } catch {
          continue;
        }
        if (msg.type === 'progress' && msg.message) append(msg.message);
        else if (msg.type === 'error') {
          append(`✗ ${msg.message}`);
          throw new Error(msg.message ?? 'Import error');
        } else if (msg.type === 'done' && msg.summary) {
          const s = msg.summary;
          imported = s.posts;
          append(`✓ batch done — imported ${s.posts}, skipped ${s.skipped}, media ${s.media}${s.errors.length ? `, errors ${s.errors.length}` : ''}`);
          s.errors.slice(0, 5).forEach((e) => append(`   ! ${e}`));
          if (typeof msg.dbPosts === 'number') setDbPosts(msg.dbPosts);
        }
      }
    }
    return imported;
  }

  async function start() {
    setRunning(true);
    stopRef.current = false;
    setLog([]);
    try {
      let round = 0;
      for (;;) {
        round += 1;
        append(`— batch ${round} (up to ${batchSize} new posts) —`);
        const imported = await runBatch();
        if (!auto) break;
        if (stopRef.current) {
          append('■ stopped by user');
          break;
        }
        if (imported === 0) {
          append('★ all done — nothing new left to import');
          toast.success('Migration complete — no new posts remaining.');
          break;
        }
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Import failed.');
    } finally {
      setRunning(false);
      void refreshCounts();
    }
  }

  const pct = wpTotal && dbPosts !== null ? Math.min(100, Math.round((dbPosts / wpTotal) * 100)) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pull from live site</CardTitle>
        <CardDescription>
          Imports the WordPress archive in batches. Already-imported posts are skipped, so you can run it
          repeatedly until everything is migrated.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-56 flex-1 space-y-2">
            <Label htmlFor="wp-base">Source URL</Label>
            <Input id="wp-base" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} disabled={running} />
          </div>
          <div className="w-28 space-y-2">
            <Label htmlFor="wp-batch">Batch size</Label>
            <Input
              id="wp-batch"
              type="number"
              min={1}
              max={200}
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value) || 50)}
              disabled={running}
            />
          </div>
          {running ? (
            <Button variant="outline" onClick={() => { stopRef.current = true; }}>
              <StopCircle className="mr-1 h-4 w-4" /> Stop after batch
            </Button>
          ) : (
            <Button onClick={start}>
              <CloudDownload className="mr-1 h-4 w-4" /> Start import
            </Button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} disabled={running} />
          Continue automatically until everything is imported
        </label>

        {(wpTotal !== null || dbPosts !== null) && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {dbPosts ?? '—'} imported{wpTotal ? ` of ${wpTotal} on the live site` : ''}
              </span>
              {pct !== null && <span>{pct}%</span>}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-[#ff0042] transition-[width] duration-500" style={{ width: `${pct ?? 0}%` }} />
            </div>
          </div>
        )}

        {(running || log.length > 0) && (
          <div
            ref={logRef}
            className="ss-scroll max-h-64 overflow-y-auto rounded-md border bg-muted/40 p-3 font-mono text-xs leading-relaxed"
          >
            {log.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">{l}</div>
            ))}
            {running && (
              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> working…
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
