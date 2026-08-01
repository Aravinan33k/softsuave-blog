'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MediaPicker, type MediaItem } from '@/components/admin/media/media-picker';

export interface SettingsInitial {
  siteTitle: string;
  tagline: string;
  siteDescription: string;
  accentColor: string;
  fontChoice: 'inter' | 'serif' | 'mono';
  activeTheme: string;
  analyticsSnippet: string;
  socialLinks: { label: string; url: string }[];
  logo: MediaItem | null;
  favicon: MediaItem | null;
}

export function SettingsForm({
  initial,
  themes,
}: {
  initial: SettingsInitial;
  themes: { id: string; label: string }[];
}) {
  const router = useRouter();
  const [f, setF] = useState(initial);
  const [logo, setLogo] = useState<MediaItem | null>(initial.logo);
  const [favicon, setFavicon] = useState<MediaItem | null>(initial.favicon);
  const [saving, setSaving] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const set = <K extends keyof SettingsInitial>(key: K, value: SettingsInitial[K]) => setF((prev) => ({ ...prev, [key]: value }));

  async function save() {
    setSaving(true);
    try {
      await api('/api/v1/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          siteTitle: f.siteTitle,
          tagline: f.tagline || null,
          siteDescription: f.siteDescription || null,
          accentColor: f.accentColor,
          fontChoice: f.fontChoice,
          activeTheme: f.activeTheme,
          socialLinks: f.socialLinks.filter((s) => s.label && s.url),
          analyticsSnippet: f.analyticsSnippet || null,
          logoMediaId: logo?.id ?? null,
          faviconMediaId: favicon?.id ?? null,
        }),
      });
      toast.success('Settings saved.');
      setPreviewKey((k) => k + 1);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  const addSocial = () => set('socialLinks', [...f.socialLinks, { label: '', url: '' }]);
  const updateSocial = (i: number, patch: Partial<{ label: string; url: string }>) =>
    set('socialLinks', f.socialLinks.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const removeSocial = (i: number) => set('socialLinks', f.socialLinks.filter((_, idx) => idx !== i));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Identity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Field label="Site title"><Input value={f.siteTitle} onChange={(e) => set('siteTitle', e.target.value)} /></Field>
            <Field label="Tagline"><Input value={f.tagline} onChange={(e) => set('tagline', e.target.value)} /></Field>
            <Field label="Description"><Textarea rows={2} value={f.siteDescription} onChange={(e) => set('siteDescription', e.target.value)} /></Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Appearance</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Field label="Theme">
              <Select value={f.activeTheme} onValueChange={(v) => { if (v) set('activeTheme', v); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {themes.map((t) => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Accent colour">
              <div className="flex items-center gap-2">
                <input type="color" value={f.accentColor} onChange={(e) => set('accentColor', e.target.value)} className="h-9 w-12 rounded border" />
                <Input value={f.accentColor} onChange={(e) => set('accentColor', e.target.value)} className="w-32" />
              </div>
            </Field>
            <Field label="Font">
              <Select value={f.fontChoice} onValueChange={(v) => { if (v) set('fontChoice', v as SettingsInitial['fontChoice']); }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter (sans)</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Mono</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Branding</CardTitle></CardHeader>
          <CardContent className="flex gap-6">
            <BrandImage label="Logo" media={logo} onSelect={setLogo} onClear={() => setLogo(null)} />
            <BrandImage label="Favicon" media={favicon} onSelect={setFavicon} onClear={() => setFavicon(null)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Social links</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {f.socialLinks.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Label" value={s.label} onChange={(e) => updateSocial(i, { label: e.target.value })} className="w-32" />
                <Input placeholder="https://…" value={s.url} onChange={(e) => updateSocial(i, { url: e.target.value })} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeSocial(i)} aria-label="Remove"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSocial}><Plus className="mr-1 h-4 w-4" /> Add link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Analytics</CardTitle></CardHeader>
          <CardContent>
            <Field label="Analytics snippet (e.g. Plausible/GA4)">
              <Textarea rows={3} value={f.analyticsSnippet} onChange={(e) => set('analyticsSnippet', e.target.value)} placeholder="<script ...></script>" className="font-mono text-xs" />
            </Field>
          </CardContent>
        </Card>

        <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</Button>
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">Live preview — {themes.find((t) => t.id === f.activeTheme)?.label}</p>
          <Button variant="ghost" size="sm" onClick={() => setPreviewKey((k) => k + 1)}><RefreshCw className="mr-1 h-4 w-4" /> Refresh</Button>
        </div>
        <div className="overflow-hidden rounded-lg border bg-white">
          <iframe
            key={previewKey}
            src={`/admin/theme-preview?theme=${encodeURIComponent(f.activeTheme)}&v=${previewKey}`}
            className="h-[70vh] w-full"
            title="Theme preview"
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function BrandImage({
  label,
  media,
  onSelect,
  onClear,
}: {
  label: string;
  media: MediaItem | null;
  onSelect: (m: MediaItem) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {media && (
        <div className="relative h-16 w-16 overflow-hidden rounded border bg-muted">
          <Image src={media.url} alt={media.altText} fill sizes="64px" className="object-contain" unoptimized />
        </div>
      )}
      <div className="flex gap-2">
        <MediaPicker onSelect={onSelect}><Button size="sm" variant="outline">{media ? 'Change' : 'Select'}</Button></MediaPicker>
        {media && <Button size="sm" variant="ghost" onClick={onClear}>Remove</Button>}
      </div>
    </div>
  );
}
