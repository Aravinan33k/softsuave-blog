'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MediaPicker, type MediaItem } from '@/components/admin/media/media-picker';

export interface ProfileInitial {
  name: string;
  title: string;
  bio: string;
  socialLinks: { label: string; url: string }[];
  avatar: MediaItem | null;
}

export function ProfileForm({ initial }: { initial: ProfileInitial }) {
  const router = useRouter();
  const [f, setF] = useState(initial);
  const [avatar, setAvatar] = useState<MediaItem | null>(initial.avatar);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ProfileInitial>(k: K, v: ProfileInitial[K]) => setF((p) => ({ ...p, [k]: v }));

  async function save() {
    setSaving(true);
    try {
      await api('/api/v1/admin/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          name: f.name || null,
          title: f.title || null,
          bio: f.bio || null,
          avatarMediaId: avatar?.id ?? null,
          socialLinks: f.socialLinks.filter((s) => s.label && s.url),
        }),
      });
      toast.success('Profile saved.');
      router.refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  const addSocial = () => set('socialLinks', [...f.socialLinks, { label: '', url: '' }]);
  const updSocial = (i: number, patch: Partial<{ label: string; url: string }>) =>
    set('socialLinks', f.socialLinks.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const rmSocial = (i: number) => set('socialLinks', f.socialLinks.filter((_, idx) => idx !== i));

  return (
    <Card className="max-w-2xl">
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center gap-4">
          {avatar ? (
            <Image src={avatar.url} alt={avatar.altText} width={72} height={72} unoptimized className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-muted" />
          )}
          <div className="flex gap-2">
            <MediaPicker onSelect={setAvatar}><Button size="sm" variant="outline">{avatar ? 'Change avatar' : 'Set avatar'}</Button></MediaPicker>
            {avatar && <Button size="sm" variant="ghost" onClick={() => setAvatar(null)}>Remove</Button>}
          </div>
        </div>

        <div className="space-y-2"><Label htmlFor="pn">Display name</Label><Input id="pn" value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ramesh Vayavuru" /></div>
        <div className="space-y-2"><Label htmlFor="pt">Title</Label><Input id="pt" value={f.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Founder & CEO" /></div>
        <div className="space-y-2"><Label htmlFor="pb">Bio</Label><Textarea id="pb" rows={4} value={f.bio} onChange={(e) => set('bio', e.target.value)} /></div>

        <div className="space-y-2">
          <Label>Social links</Label>
          {f.socialLinks.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="LinkedIn" value={s.label} onChange={(e) => updSocial(i, { label: e.target.value })} className="w-36" />
              <Input placeholder="https://…" value={s.url} onChange={(e) => updSocial(i, { url: e.target.value })} className="flex-1" />
              <Button variant="ghost" size="icon" onClick={() => rmSocial(i)} aria-label="Remove"><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addSocial}><Plus className="mr-1 h-4 w-4" /> Add link</Button>
        </div>

        <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</Button>
      </CardContent>
    </Card>
  );
}
