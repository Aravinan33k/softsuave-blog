import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// City / region / country in the lead email come from the VISITOR's IP, as on
// softsuave.com's own lead email. These pin where each value comes from, and
// that every failure leaves the fields blank instead of losing the email.

const fetchMock = vi.fn();

beforeEach(() => {
  vi.resetModules();
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const EMPTY = { city: '', region: '', country: '' };

describe('lookupIpLocation', () => {
  it("asks ipinfo about the visitor's IP", async () => {
    fetchMock.mockResolvedValue(json({ ip: '157.51.86.204', city: 'Chennai', region: 'Tamil Nadu', country: 'IN' }));
    const { lookupIpLocation } = await import('./ip-location');
    expect(await lookupIpLocation('157.51.86.204')).toEqual({ city: 'Chennai', region: 'Tamil Nadu', country: 'IN' });
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://ipinfo.io/157.51.86.204/json');
  });

  it('sends the ipinfo token when one is configured', async () => {
    vi.stubEnv('IPINFO_TOKEN', 'tok123');
    fetchMock.mockResolvedValue(json({ city: 'Chennai', region: 'Tamil Nadu', country: 'IN' }));
    const { lookupIpLocation } = await import('./ip-location');
    await lookupIpLocation('157.51.86.204');
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://ipinfo.io/157.51.86.204/json?token=tok123');
  });

  it('prefers the platform headers when the host provides them', async () => {
    const { lookupIpLocation, platformLocation } = await import('./ip-location');
    const headers = new Headers({ 'x-vercel-ip-city': 'S%C3%A3o%20Paulo', 'x-vercel-ip-country-region': 'SP', 'x-vercel-ip-country': 'BR' });
    expect(await lookupIpLocation('203.0.113.7', platformLocation(headers))).toEqual({ city: 'São Paulo', region: 'SP', country: 'BR' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('in production, never looks up a private or missing address — and says why', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { lookupIpLocation } = await import('./ip-location');
    for (const ip of ['::1', '127.0.0.1', '10.0.0.4', '172.18.0.1', '192.168.12.5', null]) {
      expect(await lookupIpLocation(ip)).toEqual(EMPTY);
    }
    expect(fetchMock).not.toHaveBeenCalled();
    expect(String(warn.mock.calls[0][0])).toContain('X-Forwarded-For');
    warn.mockRestore();
  });

  it("in development, a local request reports this machine's public IP and location", async () => {
    vi.stubEnv('NODE_ENV', 'development');
    fetchMock.mockResolvedValue(json({ ip: '157.51.86.204', city: 'Chennai', region: 'Tamil Nadu', country: 'IN' }));
    const { lookupIpLocation } = await import('./ip-location');
    expect(await lookupIpLocation('::1')).toEqual({ city: 'Chennai', region: 'Tamil Nadu', country: 'IN', ipAddress: '157.51.86.204' });
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://ipinfo.io/json');
  });

  it('only replaces the IP for a local request, never a real one', async () => {
    fetchMock.mockResolvedValue(json({ ip: '157.51.86.204', city: 'Chennai', region: 'Tamil Nadu', country: 'IN' }));
    const { lookupIpLocation } = await import('./ip-location');
    expect((await lookupIpLocation('157.51.86.204')).ipAddress).toBeUndefined();
  });

  it('unwraps IPv4 addresses seen through an IPv6 socket', async () => {
    fetchMock.mockResolvedValue(json({ city: 'Chennai', region: 'Tamil Nadu', country: 'IN' }));
    const { lookupIpLocation, normalizeIp } = await import('./ip-location');
    expect(normalizeIp('::ffff:157.51.86.204')).toBe('157.51.86.204');
    await lookupIpLocation('::ffff:157.51.86.204');
    expect(String(fetchMock.mock.calls[0][0])).toContain('/157.51.86.204/');
  });

  it('leaves the fields blank when ipinfo errors or times out', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { lookupIpLocation } = await import('./ip-location');
    fetchMock.mockResolvedValueOnce(json({ error: 'rate limited' }, 429));
    expect(await lookupIpLocation('157.51.86.204')).toEqual(EMPTY);
    fetchMock.mockRejectedValueOnce(new Error('The operation was aborted due to timeout'));
    expect(await lookupIpLocation('157.51.86.204')).toEqual(EMPTY);
    warn.mockRestore();
  });

  it('can be switched off with LEAD_GEO_LOOKUP=false', async () => {
    vi.stubEnv('LEAD_GEO_LOOKUP', 'false');
    const { lookupIpLocation } = await import('./ip-location');
    expect(await lookupIpLocation('157.51.86.204')).toEqual(EMPTY);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
