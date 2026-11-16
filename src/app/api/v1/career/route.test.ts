import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/rate-limit', () => ({ rateLimit: vi.fn().mockResolvedValue(null) }));
vi.mock('@/lib/leads/forward-career', () => ({ forwardApplication: vi.fn() }));

import { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { forwardApplication } from '@/lib/leads/forward-career';
import { POST } from './route';

// POST /api/v1/career: validation and delivery. The forwarder is replaced by a stand-in, so none of these reach
// softsuave.com's real career endpoint — and so none puts an application in the real hiring inbox.

const forward = vi.mocked(forwardApplication);

const resume = (name = 'Jane CV.pdf', size = 1200) => new File([new Uint8Array(size)], name, { type: 'application/pdf' });

function post(fields: Record<string, string | File | undefined> = {}) {
  const form = new FormData();
  const base: Record<string, string | File> = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+91 9876543210',
    experience: '3',
    file: resume(),
  };
  for (const [k, v] of Object.entries({ ...base, ...fields })) if (v !== undefined) form.append(k, v);
  return new NextRequest('http://localhost:3100/api/v1/career', { method: 'POST', body: form });
}

beforeEach(() => {
  forward.mockReset().mockResolvedValue(true);
  vi.mocked(rateLimit).mockResolvedValue(null);
});

const message = async (res: Response) => (await res.json()).error.message as string;

describe('POST /api/v1/career', () => {
  it('accepts a good application and hands it on with the role', async () => {
    const res = await POST(post({ role: 'software-engineer' }));
    expect(res.status).toBe(202);
    expect(forward).toHaveBeenCalledTimes(1);
    const sent = forward.mock.calls[0][1];
    expect(sent).toMatchObject({ name: 'Jane Doe', email: 'jane@example.com', phone: '+91 9876543210', experience: '3', role: 'software-engineer' });
    expect(sent.file.name).toBe('Jane CV.pdf');
  });

  it('accepts a .doc resume too, in any letter case', async () => {
    expect((await POST(post({ file: resume('CV.DOC') }))).status).toBe(202);
  });

  it('drops a role slug that is not a slug, rather than passing it on', async () => {
    await POST(post({ role: 'x"><script>' }));
    expect(forward.mock.calls[0][1].role).toBeNull();
  });

  it('answers a honeypot like a real application and delivers nothing', async () => {
    const res = await POST(post({ website: 'http://spam.example' }));
    expect(res.status).toBe(202);
    expect(forward).not.toHaveBeenCalled();
  });

  it('rejects a missing name, email or phone', async () => {
    for (const bad of [{ name: '' }, { email: '' }, { phone: '' }]) {
      expect((await POST(post(bad))).status).toBe(400);
    }
    expect(forward).not.toHaveBeenCalled();
  });

  it('rejects a name with digits, a bad email and a short phone', async () => {
    expect(await message(await POST(post({ name: 'Jane 123' })))).toMatch(/letters only/i);
    expect(await message(await POST(post({ email: 'not-an-email' })))).toMatch(/valid email/i);
    expect(await message(await POST(post({ phone: '+91 123' })))).toMatch(/10-digit/i);
    expect(forward).not.toHaveBeenCalled();
  });

  it('rejects an experience outside the live dropdown', async () => {
    expect((await POST(post({ experience: '7' }))).status).toBe(400);
    expect((await POST(post({ experience: '' }))).status).toBe(400);
  });

  it('rejects a missing resume', async () => {
    expect((await POST(post({ file: undefined }))).status).toBe(400);
  });

  it("rejects anything but pdf or doc, with the live script's words", async () => {
    for (const name of ['CV.docx', 'CV.png', 'CV.exe', 'CV', 'cv.pdf.exe']) {
      const res = await POST(post({ file: resume(name) }));
      expect(res.status).toBe(400);
      expect(await message(res)).toBe('Upload only pdf or doc files');
    }
    expect(forward).not.toHaveBeenCalled();
  });

  it("rejects a resume at or over 500,000 bytes, with the live script's words", async () => {
    const over = await POST(post({ file: resume('CV.pdf', 500_000) }));
    expect(over.status).toBe(400);
    expect(await message(over)).toBe('Uploaded file exceeds the maximum file size of 500KB');
    expect((await POST(post({ file: resume('CV.pdf', 499_999) }))).status).toBe(202);
  });

  it('answers 502 when the application could not be delivered', async () => {
    forward.mockResolvedValue(false);
    const res = await POST(post());
    expect(res.status).toBe(502);
    expect(await message(res)).toMatch(/could not send your application/i);
  });

  it('refuses an oversized upload on its declared length, before reading it', async () => {
    const req = new NextRequest('http://localhost:3100/api/v1/career', {
      method: 'POST',
      body: new FormData(),
      headers: { 'content-length': String(2_000_000) },
    });
    const spy = vi.spyOn(req, 'formData');
    const res = await POST(req);
    expect(res.status).toBe(413);
    expect(await message(res)).toBe('Uploaded file exceeds the maximum file size of 500KB');
    expect(spy).not.toHaveBeenCalled();
    expect(forward).not.toHaveBeenCalled();
  });

  it('is rate limited', async () => {
    const limited = new Response(JSON.stringify({ error: { code: 'rate_limited' } }), { status: 429 });
    vi.mocked(rateLimit).mockResolvedValue(limited as never);
    expect((await POST(post())).status).toBe(429);
    expect(forward).not.toHaveBeenCalled();
  });

  it('answers 400 to a body that is not a form', async () => {
    const res = await POST(new NextRequest('http://localhost:3100/api/v1/career', { method: 'POST', body: '{"a":1}', headers: { 'content-type': 'application/json' } }));
    expect(res.status).toBe(400);
  });
});
