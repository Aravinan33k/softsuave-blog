'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Summary {
  categories: number;
  tags: number;
  media: number;
  posts: number;
  pages: number;
  skipped: number;
  errors: string[];
}

export function ImportPanel() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);

  async function run() {
    if (!file) return toast.error('Choose a WXR .xml file.');
    setBusy(true);
    setSummary(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const data = await api<{ summary: Summary }>('/api/v1/admin/import/wordpress', { method: 'POST', body: form });
      setSummary(data.summary);
      toast.success('Import complete.');
      router.refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Import failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Import from WordPress</CardTitle>
        <CardDescription>Upload a WordPress export (WXR .xml). Existing slugs are skipped.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wxr">WXR file</Label>
          <Input id="wxr" type="file" accept=".xml,text/xml,application/xml" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="w-80" />
        </div>
        <Button onClick={run} disabled={busy}>{busy ? 'Importing…' : 'Import'}</Button>

        {summary && (
          <div className="rounded-md border bg-muted/40 p-4 text-sm">
            <p className="font-medium">Imported:</p>
            <ul className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
              <li>Posts: {summary.posts}</li>
              <li>Pages: {summary.pages}</li>
              <li>Categories: {summary.categories}</li>
              <li>Tags: {summary.tags}</li>
              <li>Media: {summary.media}</li>
              <li>Skipped: {summary.skipped}</li>
            </ul>
            {summary.errors.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer text-destructive">{summary.errors.length} error(s)</summary>
                <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                  {summary.errors.slice(0, 20).map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </details>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
