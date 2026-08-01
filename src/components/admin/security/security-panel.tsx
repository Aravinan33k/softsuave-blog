'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { api, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SecurityPanel({ initialEnabled, gate = false }: { initialEnabled: boolean; gate?: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [phase, setPhase] = useState<'idle' | 'setup'>('idle');
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  async function startSetup() {
    setBusy(true);
    try {
      const d = await api<{ qrDataUrl: string; secret: string }>('/api/v1/auth/2fa/setup', { method: 'POST' });
      setQr(d.qrDataUrl);
      setSecret(d.secret);
      setPhase('setup');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Could not start setup.');
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    setBusy(true);
    try {
      await api('/api/v1/auth/2fa/verify', { method: 'POST', body: JSON.stringify({ code }) });
      toast.success('Two-factor authentication enabled.');
      setEnabled(true);
      setPhase('idle');
      setCode('');
      if (gate) window.location.reload();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Verification failed.');
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    try {
      await api('/api/v1/auth/2fa/disable', { method: 'POST', body: JSON.stringify({ code }) });
      toast.success('Two-factor authentication disabled.');
      setEnabled(false);
      setCode('');
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : 'Could not disable.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {enabled ? <ShieldCheck className="h-5 w-5 text-green-600" /> : <ShieldAlert className="h-5 w-5 text-amber-600" />}
          Two-factor authentication
        </CardTitle>
        <CardDescription>
          {enabled ? 'Your account is protected with TOTP 2FA.' : 'Add a second factor using an authenticator app (TOTP).'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {gate && !enabled && (
          <p className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Your organisation requires administrators to enable 2FA before continuing.
          </p>
        )}

        {enabled ? (
          <div className="space-y-3">
            <Label htmlFor="dcode">Enter a current code to disable</Label>
            <div className="flex gap-2">
              <Input id="dcode" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" className="w-40" />
              <Button variant="destructive" onClick={disable} disabled={busy || code.length < 6}>Disable 2FA</Button>
            </div>
          </div>
        ) : phase === 'idle' ? (
          <Button onClick={startSetup} disabled={busy}>{busy ? 'Preparing…' : 'Set up 2FA'}</Button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Scan this QR code with your authenticator app, or enter the secret manually.</p>
            {qr && <Image src={qr} alt="2FA QR code" width={200} height={200} unoptimized className="rounded border" />}
            <p className="break-all font-mono text-xs text-muted-foreground">{secret}</p>
            <div className="space-y-2">
              <Label htmlFor="code">Enter the 6-digit code to confirm</Label>
              <div className="flex gap-2">
                <Input id="code" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" className="w-40" />
                <Button onClick={confirm} disabled={busy || code.length < 6}>Verify & enable</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
