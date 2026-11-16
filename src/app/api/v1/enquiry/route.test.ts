import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/rate-limit', () => ({ rateLimit: vi.fn().mockResolvedValue(null) }));
vi.mock('@/lib/env', async (orig) => ({ ...(await orig<typeof import('@/lib/env')>()), databaseConfigured: false }));
vi.mock('@/lib/leads/forward', async (orig) => ({ ...(await orig<typeof import('@/lib/leads/forward')>()), forwardLead: vi.fn() }));
vi.mock('@/lib/leads/forward-case-study', () => ({ forwardCaseStudyRequest: vi.fn() }));
vi.mock('@/lib/leads/auto-reply', async (orig) => ({ ...(await orig<typeof import('@/lib/leads/auto-reply')>()), sendAutoReply: vi.fn() }));

import { NextRequest } from 'next/server';
import { forwardLead } from '@/lib/leads/forward';
import { forwardCaseStudyRequest } from '@/lib/leads/forward-case-study';
import { POST } from './route';

// POST /api/v1/enquiry, the case-study branch. With no database (the mode this suite pins) a case study's download
// request goes to the live case-study endpoint, which e-mails the visitor the case study; an ordinary enquiry still
// goes to the lead endpoint. The forwarders are stand-ins, so nothing here reaches softsuave.com.

const caseStudy = vi.mocked(forwardCaseStudyRequest);
const lead = vi.mocked(forwardLead);

const post = (extra: Record<string, unknown> = {}) =>
  new NextRequest('http://localhost:3100/api/v1/enquiry', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3100' },
    body: JSON.stringify({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+91 9876543210',
      requirement: 'Case study download: Vehicle Intelligence',
      sourcePath: '/case-study-vehicle-intelligence',
      ...extra,
    }),
  });

beforeEach(() => {
  caseStudy.mockReset().mockResolvedValue(true);
  lead.mockReset().mockResolvedValue(true);
});

describe('POST /api/v1/enquiry — case study download', () => {
  it('forwards a case study request to the case-study endpoint under its live id, not as a lead', async () => {
    const res = await POST(post({ caseStudyPdf: '/assets/case-studies/Vehicle_Intelligence_Case_Study.pdf' }));
    expect(res.status).toBe(202);
    expect(caseStudy).toHaveBeenCalledTimes(1);
    expect(caseStudy.mock.calls[0][1]).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+91 9876543210',
      caseStudyType: 'VEHICLE_INTELLIGENCE_PLATFORM',
      sourcePath: '/case-study-vehicle-intelligence',
    });
    expect(lead).not.toHaveBeenCalled();
  });

  it('reports a failed delivery as 502', async () => {
    caseStudy.mockResolvedValue(false);
    const res = await POST(post({ caseStudyPdf: '/assets/case-studies/Vehicle_Intelligence_Case_Study.pdf' }));
    expect(res.status).toBe(502);
  });

  it('treats a PDF that is not in /public as an ordinary lead', async () => {
    const res = await POST(post({ caseStudyPdf: '/assets/case-studies/does-not-exist.pdf' }));
    expect(res.status).toBe(202);
    expect(caseStudy).not.toHaveBeenCalled();
    expect(lead).toHaveBeenCalledTimes(1);
  });

  it('refuses a path outside /assets/case-studies', async () => {
    for (const bad of ['/etc/passwd', '/assets/case-studies/../../.env', 'https://evil.example/x.pdf', '/assets/case-studies/x.html']) {
      expect((await POST(post({ caseStudyPdf: bad }))).status, bad).toBe(400);
    }
    expect(caseStudy).not.toHaveBeenCalled();
  });

  it('sends an ordinary enquiry to the lead endpoint, as before', async () => {
    const res = await POST(post());
    expect(res.status).toBe(202);
    expect(lead).toHaveBeenCalledTimes(1);
    expect(caseStudy).not.toHaveBeenCalled();
  });
});
