'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface MediaItem {
  id: string;
  url: string;
  filename: string;
  altText: string;
  width: number | null;
  height: number | null;
  mimeType: string | null;
}

export function MediaPicker({
  onSelect,
  children,
}: {
  onSelect: (media: MediaItem) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="contents">
        {children}
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Media library</DialogTitle>
          </DialogHeader>
          <MediaPickerBody
            onPick={(m) => {
              onSelect(m);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function MediaPickerBody({ onPick }: { onPick: (m: MediaItem) => void }) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);

  async function load() {
    try {
      const data = await api<{ items: MediaItem[] }>('/api/v1/admin/media?perPage=60');
      setItems(data.items);
    } catch {
      toast.error('Failed to load media.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Initial fetch on mount; setState happens after the awaited request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);

  async function upload() {
    if (!file) return toast.error('Choose a file.');
    if (!altText.trim()) return toast.error('Alt text is required.');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('altText', altText.trim());
      const data = await api<{ media: MediaItem }>('/api/v1/admin/media', { method: 'POST', body: form });
      toast.success('Uploaded.');
      onPick(data.media);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <Tabs defaultValue="library">
      <TabsList>
        <TabsTrigger value="library">Library</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
      </TabsList>

      <TabsContent value="library">
        {loading ? (
          <p className="p-4 text-sm text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No media yet. Upload something.</p>
        ) : (
          <div className="grid max-h-[50vh] grid-cols-3 gap-3 overflow-y-auto p-1 sm:grid-cols-4">
            {items.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onPick(m)}
                className="group relative aspect-square overflow-hidden rounded-md border hover:ring-2 hover:ring-primary"
                title={m.altText || m.filename}
              >
                <Image src={m.url} alt={m.altText} fill sizes="150px" className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="upload" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mp-file">Image file</Label>
          <Input
            id="mp-file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mp-alt">Alt text (required)</Label>
          <Input id="mp-alt" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image" />
        </div>
        <Button onClick={upload} disabled={uploading}>
          {uploading ? 'Uploading…' : 'Upload & select'}
        </Button>
      </TabsContent>
    </Tabs>
  );
}
