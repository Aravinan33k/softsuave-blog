'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface RedirectItem {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: number;
}

const ENDPOINT = '/api/v1/admin/redirects';

export function RedirectsManager({ initialItems }: { initialItems: RedirectItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [fromPath, setFromPath] = useState('');
  const [toPath, setToPath] = useState('');
  const [statusCode, setStatusCode] = useState('301');
  const [busy, setBusy] = useState(false);

  async function add() {
    if (!fromPath.trim() || !toPath.trim()) return toast.error('From and To are required.');
    setBusy(true);
    try {
      const data = await api<{ redirect: RedirectItem }>(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ fromPath: fromPath.trim(), toPath: toPath.trim(), statusCode: Number(statusCode) }),
      });
      setItems((prev) => [data.redirect, ...prev]);
      setFromPath('');
      setToPath('');
      toast.success('Redirect added.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Failed to add redirect.');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this redirect?')) return;
    try {
      await api(`${ENDPOINT}/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((r) => r.id !== id));
      toast.success('Deleted.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Delete failed.');
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 pt-6">
          <div className="space-y-2">
            <Label htmlFor="from">From path</Label>
            <Input id="from" value={fromPath} onChange={(e) => setFromPath(e.target.value)} placeholder="/old-url" className="w-56" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To path / URL</Label>
            <Input id="to" value={toPath} onChange={(e) => setToPath(e.target.value)} placeholder="/new-url" className="w-56" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusCode} onValueChange={(v) => { if (v) setStatusCode(v); }}>
              <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="301">301</SelectItem>
                <SelectItem value="302">302</SelectItem>
                <SelectItem value="307">307</SelectItem>
                <SelectItem value="308">308</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={add} disabled={busy}>Add redirect</Button>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No redirects yet.</TableCell></TableRow>
            ) : (
              items.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.fromPath}</TableCell>
                  <TableCell className="font-mono text-xs">{r.toPath}</TableCell>
                  <TableCell>{r.statusCode}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => remove(r.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
