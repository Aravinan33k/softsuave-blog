import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('server-only', () => ({}));

import { applicationPageUrl, forwardApplication } from './forward-career';

// The application is handed to softsuave.com's own career endpoint in the shape its /softsuave-career page posts:
// one multipart POST, the resume as `file`, then the form's fields and the visitor's location. These tests stand in
// for that endpoint — nothing here reaches the live server.

const post = (origin = 'https://www.softsuave.com') =>
  new Request('http://internal:3000/api/v1/career', {
    method: 'POST',
    headers: { origin, 'x-forwarded-for': '203.0.113.9', 'x-vercel-ip-city': 'Chennai', 'x-vercel-ip-country-region': 'TN', 'x-vercel-ip-country': 'IN' },
  });

const application = () => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+91 9876543210',
  experience: '3',
  role: 'software-engineer',
  file: new File(['%PDF-1.4 test'], 'Jane Doe CV.pdf', { type: 'application/pdf' }),
});

afterEach(() => vi.restoreAllMocks());

describe('applicationPageUrl', () => {
  it('writes the role the way the live careers links do', () => {
    expect(applicationPageUrl(post('http://localhost:3100'), 'trainee-hr')).toBe(
      'http://localhost:3100/softsuave-career?role=trainee-hr',
    );
  });

  it('is the bare page when no role is given', () => {
    expect(applicationPageUrl(post('http://localhost:3100'))).toBe('http://localhost:3100/softsuave-career');
  });
});

describe('forwardApplication', () => {
  it('posts the resume and fields as one multipart form, and resolves true on { status: "success" }', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ status: 'success' }), { status: 200 }));

    await expect(forwardApplication(post(), application())).resolves.toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('https://www.softsuave.com/forms/enquires/career');
    expect(init?.method).toBe('POST');
    // No hand-written Content-Type: fetch must add the multipart boundary itself.
    expect(Object.keys((init?.headers as Record<string, string>) ?? {}).map((k) => k.toLowerCase())).not.toContain('content-type');

    const body = init?.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    const file = body.get('file') as File;
    expect(file.name).toBe('Jane Doe CV.pdf');
    expect(await file.text()).toBe('%PDF-1.4 test');
    expect(body.get('name')).toBe('Jane Doe');
    expect(body.get('email')).toBe('jane@example.com');
    expect(body.get('phone')).toBe('+91 9876543210');
    expect(body.get('experience')).toBe('3');
    expect(body.get('url')).toBe('https://www.softsuave.com/softsuave-career?role=software-engineer');
    // The live page's other fields are all present, even when the location is unknown.
    for (const k of ['ipAddress', 'city', 'region', 'country']) expect(body.has(k)).toBe(true);
    // Exactly the live page's fields — nothing of ours leaks to the collector.
    expect([...body.keys()].sort()).toEqual(
      ['city', 'country', 'email', 'experience', 'file', 'ipAddress', 'name', 'phone', 'region', 'url'].sort(),
    );
  });

  it('resolves false when the endpoint answers an error status', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('boom', { status: 500 }));
    await expect(forwardApplication(post(), application())).resolves.toBe(false);
  });

  it('resolves false when the endpoint does not confirm success', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ status: 'error' }), { status: 200 }));
    await expect(forwardApplication(post(), application())).resolves.toBe(false);
  });

  it('never throws when the network fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    await expect(forwardApplication(post(), application())).resolves.toBe(false);
  });
});
