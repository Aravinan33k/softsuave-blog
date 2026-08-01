'use client';

import { useState } from 'react';
import { KeyRound, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Role = 'ADMIN' | 'EDITOR';

export interface UserRow {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  twoFactorEnabled: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

const ENDPOINT = '/api/v1/admin/users';

export function UsersManager({ initialUsers, currentUserId }: { initialUsers: UserRow[]; currentUserId: string }) {
  const [users, setUsers] = useState(initialUsers);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('EDITOR');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function create() {
    if (!email.trim() || password.length < 8) return toast.error('Email and an 8+ char password are required.');
    setBusy(true);
    try {
      const data = await api<{ user: UserRow }>(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined, role, password }),
      });
      setUsers((prev) => [...prev, data.user]);
      setEmail('');
      setName('');
      setPassword('');
      toast.success('User created.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Create failed.');
    } finally {
      setBusy(false);
    }
  }

  async function changeRole(user: UserRow, newRole: Role) {
    try {
      const data = await api<{ user: UserRow }>(`${ENDPOINT}/${user.id}`, { method: 'PATCH', body: JSON.stringify({ role: newRole }) });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? data.user : u)));
      toast.success('Role updated.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Update failed.');
    }
  }

  async function resetPassword(user: UserRow) {
    const pw = window.prompt(`New password for ${user.email} (min 8 chars):`);
    if (!pw) return;
    if (pw.length < 8) return toast.error('Password must be at least 8 characters.');
    try {
      await api(`${ENDPOINT}/${user.id}`, { method: 'PATCH', body: JSON.stringify({ password: pw }) });
      toast.success('Password reset.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Reset failed.');
    }
  }

  async function remove(user: UserRow) {
    if (!window.confirm(`Delete ${user.email}?`)) return;
    try {
      await api(`${ENDPOINT}/${user.id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast.success('Deleted.');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Delete failed.');
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-wrap items-end gap-3 pt-6">
          <div className="space-y-2"><Label htmlFor="ue">Email</Label><Input id="ue" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-56" /></div>
          <div className="space-y-2"><Label htmlFor="un">Name</Label><Input id="un" value={name} onChange={(e) => setName(e.target.value)} className="w-40" /></div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => { if (v) setRole(v as Role); }}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="EDITOR">Editor</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label htmlFor="up">Temp password</Label><Input id="up" type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="w-44" /></div>
          <Button onClick={create} disabled={busy}>Create user</Button>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-32">Role</TableHead>
              <TableHead>2FA</TableHead>
              <TableHead>Last login</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.email}{u.id === currentUserId && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}</TableCell>
                <TableCell className="text-muted-foreground">{u.name ?? '—'}</TableCell>
                <TableCell>
                  <Select value={u.role} onValueChange={(v) => { if (v && v !== u.role) changeRole(u, v as Role); }} disabled={u.id === currentUserId}>
                    <SelectTrigger className="h-8 w-28"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="EDITOR">Editor</SelectItem><SelectItem value="ADMIN">Admin</SelectItem></SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{u.twoFactorEnabled ? <Badge variant="secondary">on</Badge> : <span className="text-xs text-muted-foreground">off</span>}</TableCell>
                <TableCell className="text-muted-foreground">{u.lastLoginAt ? new Date(u.lastLoginAt).toISOString().slice(0, 10) : 'never'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => resetPassword(u)} aria-label="Reset password" title="Reset password"><KeyRound className="h-4 w-4" /></Button>
                    {u.id !== currentUserId && <Button variant="ghost" size="icon" onClick={() => remove(u)} aria-label="Delete"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
