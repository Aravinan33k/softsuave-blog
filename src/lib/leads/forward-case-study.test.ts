import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('server-only', () => ({}));

import { forwardCaseStudyRequest } from './forward-case-study';
import { CASE_STUDY_IDS, caseStudyIdFor } from './case-study-ids';
import fs from 'node:fs';
import path from 'node:path';

// A case study's download is handed to softsuave.com's own case-study endpoint in the shape its dialog posts:
// JSON with the visitor's details, the case study's live id and their location. These tests stand in for that
// endpoint — nothing here reaches the live server.

const post = (origin = 'https://www.softsuave.com') =>
  new Request('http://internal:3000/api/v1/enquiry', {
    method: 'POST',
    headers: { origin, 'x-forwarded-for': '203.0.113.9', 'x-vercel-ip-city': 'Chennai', 'x-vercel-ip-country-region': 'TN', 'x-vercel-ip-country': 'IN' },
  });

const request = () => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+91 9876543210',
  caseStudyType: 'VEHICLE_INTELLIGENCE_PLATFORM',
  sourcePath: '/case-study-vehicle-intelligence',
});

afterEach(() => vi.restoreAllMocks());

describe('forwardCaseStudyRequest', () => {
  it('posts the live payload as JSON and resolves true on { status: "success" }', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ status: 'success' }), { status: 200 }));

    await expect(forwardCaseStudyRequest(post(), request())).resolves.toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('https://www.softsuave.com/forms/enquires/caseStudy');
    expect(init?.method).toBe('POST');
    expect(JSON.parse(String(init?.body))).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+91 9876543210',
      caseStudyType: 'VEHICLE_INTELLIGENCE_PLATFORM',
      url: 'https://www.softsuave.com/case-study-vehicle-intelligence',
      city: 'Chennai',
      country: 'IN',
    });
  });

  it('resolves false when the endpoint does not confirm, or fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify({ status: 'error' }), { status: 200 }));
    await expect(forwardCaseStudyRequest(post(), request())).resolves.toBe(false);
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('boom', { status: 500 }));
    await expect(forwardCaseStudyRequest(post(), request())).resolves.toBe(false);
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network down'));
    await expect(forwardCaseStudyRequest(post(), request())).resolves.toBe(false);
  });
});

describe('case study ids', () => {
  it('knows the Vehicle Intelligence study by its PDF path', () => {
    expect(caseStudyIdFor('/assets/case-studies/Vehicle_Intelligence_Case_Study.pdf')).toBe('VEHICLE_INTELLIGENCE_PLATFORM');
    expect(caseStudyIdFor('/assets/case-studies/not-ours.pdf')).toBeNull();
    // Live's file names differ from ours only in case.
    expect(caseStudyIdFor('/assets/case-studies/BrandForge_Case_Study.pdf')).toBe('BRANDFORGE');
  });

  it('has an id for every PDF this site serves from /assets/case-studies', () => {
    const dir = path.join(process.cwd(), 'public', 'assets', 'case-studies');
    const served = fs.readdirSync(dir).filter((f) => f.endsWith('.pdf'));
    const known = new Set(Object.keys(CASE_STUDY_IDS).map((f) => f.toLowerCase()));
    const missing = served.filter((f) => !known.has(f.toLowerCase()));
    // Every study a visitor can request has a live id to forward under.
    expect(missing).toEqual([]);
  });
});
