'use client';

import { useState } from 'react';
import { History } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Revision {
  id: string;
  title: string;
  createdAt: string;
}

// Lists a post's revision history and restores a selected version. Restoring
// reloads the page so the editor re-initialises from the restored content.
export function RevisionsDialog({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function openDialog() {
    setOpen(true);
    setLoading(true);
    try {
      const data = await api<{ revisions: Revision[] }>(`/api/v1/admin/posts/${postId}/revisions`);
      setRevisions(data.revisions);
    } catch {
      toast.error('Failed to load revisions.');
    } finally {
      setLoading(false);
    }
  }

  async function restore(revisionId: string) {
    setBusy(revisionId);
    try {
      await api(`/api/v1/admin/posts/${postId}/revisions`, {
        method: 'POST',
        body: JSON.stringify({ revisionId }),
      });
      toast.success('Restored. Reloading…');
      window.location.reload();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Restore failed.');
      setBusy(null);
    }
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={openDialog}>
        <History className="mr-1 h-4 w-4" /> History
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revision history</DialogTitle>
          </DialogHeader>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : revisions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No revisions yet. They are created each time you save changes to the content.</p>
          ) : (
            <ul className="max-h-80 divide-y overflow-y-auto">
              {revisions.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                  <Button size="sm" variant="outline" disabled={busy === r.id} onClick={() => restore(r.id)}>
                    {busy === r.id ? 'Restoring…' : 'Restore'}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
