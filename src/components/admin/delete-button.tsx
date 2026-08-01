'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';

// Generic delete action for list rows. DELETEs `url`, then refreshes.
export function DeleteButton({
  url,
  confirmText = 'Delete this item? This cannot be undone.',
  onDeleted,
}: {
  url: string;
  confirmText?: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    try {
      await api(url, { method: 'DELETE' });
      toast.success('Deleted.');
      if (onDeleted) onDeleted();
      else router.refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Delete failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={del} disabled={busy} aria-label="Delete" title="Delete">
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
