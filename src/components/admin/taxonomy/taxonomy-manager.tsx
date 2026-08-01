'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export interface TaxItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count?: { posts: number };
}

export function TaxonomyManager({
  endpoint,
  itemKey,
  initialItems,
}: {
  endpoint: string;
  itemKey: 'category' | 'tag';
  initialItems: TaxItem[];
}) {
  const [items, setItems] = useState<TaxItem[]>(initialItems);
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState('');

  const shown = query
    ? items.filter((i) => `${i.name} ${i.slug} ${i.description ?? ''}`.toLowerCase().includes(query.toLowerCase()))
    : items;

  async function add() {
    if (!name.trim()) return;
    setAdding(true);
    try {
      const data = await api<Record<string, TaxItem>>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ name: name.trim() }),
      });
      setItems((prev) => [...prev, { ...data[itemKey], _count: { posts: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setName('');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Create failed.');
    } finally {
      setAdding(false);
    }
  }

  async function save(item: TaxItem, patch: { name: string; description: string }) {
    try {
      const data = await api<Record<string, TaxItem>>(`${endpoint}/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: patch.name.trim(), description: patch.description.trim() || null }),
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, ...data[itemKey] } : i)));
      toast.success('Saved.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Save failed.');
    }
  }

  async function remove(item: TaxItem) {
    if (!window.confirm(`Delete “${item.name}”? It will be removed from any posts.`)) return;
    try {
      await api(`${endpoint}/${item.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success('Deleted.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Delete failed.');
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex items-end gap-2 pt-6">
          <div className="flex-1 space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`New ${itemKey} name`}
              onKeyDown={(e) => e.key === 'Enter' && add()}
            />
          </div>
          <Button onClick={add} disabled={adding}>Add</Button>
        </CardContent>
      </Card>

      {items.length > 3 && (
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${itemKey}s…`} className="max-w-xs" aria-label={`Search ${itemKey}s`} />
      )}

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">None yet.</p>
      ) : shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">No {itemKey}s match your search.</p>
      ) : (
        <div className="space-y-2">
          {shown.map((item) => (
            <Row key={item.id} item={item} onSave={save} onRemove={remove} />
          ))}
        </div>
      )}
    </div>
  );
}

function Row({
  item,
  onSave,
  onRemove,
}: {
  item: TaxItem;
  onSave: (item: TaxItem, patch: { name: string; description: string }) => void;
  onRemove: (item: TaxItem) => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description ?? '');
  const changed = name !== item.name || description !== (item.description ?? '');

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-3 py-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} className="w-48" />
        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" className="min-w-40 flex-1" />
        <span className="text-xs text-muted-foreground">/{item.slug}</span>
        <span className="text-xs text-muted-foreground">{item._count?.posts ?? 0} posts</span>
        {changed && <Button size="sm" variant="secondary" onClick={() => onSave(item, { name, description })}>Save</Button>}
        <Button variant="ghost" size="icon" onClick={() => onRemove(item)} aria-label="Delete">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardContent>
    </Card>
  );
}
