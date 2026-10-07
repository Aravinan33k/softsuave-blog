import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// A stored lead used to reach nobody (no admin view of the Enquiry table), so
// every one now emails the team. These pin what that email carries, that what
// the visitor typed cannot inject markup or headers, and that sending stays
// off — and never throws — without SMTP configured.

const { sendMail, createTransport } = vi.hoisted(() => {
  const sendMail = vi.fn();
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});
vi.mock('nodemailer', () => ({ default: { createTransport } }));

const lead = {
  name: 'Jane Doe',
  email: 'jane@company.com',
  phone: '+91 98765 43210',
  requirement: 'We need a <b>RAG</b> assistant\nover our policy documents.',
  subject: 'RAG development enquiry',
  pageUrl: 'http://54.237.230.68/rag-development-services',
  ipAddress: '203.0.113.7',
  receivedAt: new Date('2026-10-07T10:15:00Z'),
};

describe('buildLeadEmail', () => {
  it('leads the subject with the page subject and the visitor name', async () => {
    const { buildLeadEmail } = await import('./notify');
    expect(buildLeadEmail(lead).subject).toBe('New lead: RAG development enquiry — Jane Doe');
  });

  it('falls back to a generic label when the page sends no subject', async () => {
    const { buildLeadEmail } = await import('./notify');
    expect(buildLeadEmail({ ...lead, subject: null }).subject).toBe('New lead: Website enquiry — Jane Doe');
  });

  it('carries every field in the plain-text body', async () => {
    const { buildLeadEmail } = await import('./notify');
    const { text } = buildLeadEmail(lead);
    for (const s of ['Name: Jane Doe', 'Email: jane@company.com', 'Phone: +91 98765 43210', 'Page: http://54.237.230.68/rag-development-services', 'over our policy documents.', 'IP address: 203.0.113.7']) {
      expect(text).toContain(s);
    }
  });

  it('writes the received time in India time by default', async () => {
    const { buildLeadEmail } = await import('./notify');
    // 10:15 UTC is 3:45 pm IST.
    expect(buildLeadEmail(lead).text).toContain('Received: Wed, 7 Oct, 2026, 3:45:00 pm IST');
  });

  it('falls back to UTC for an unknown timezone', async () => {
    const { formatReceived } = await import('./notify');
    expect(formatReceived(new Date('2026-10-07T10:15:00Z'), 'Not/AZone')).toBe('Wed, 7 Oct, 2026, 10:15:00 am UTC');
  });

  it('escapes what the visitor typed in the HTML body', async () => {
    const { buildLeadEmail } = await import('./notify');
    const { html } = buildLeadEmail({ ...lead, name: 'Jane "<script>"' });
    expect(html).toContain('&lt;b&gt;RAG&lt;/b&gt;');
    expect(html).not.toContain('<b>RAG</b>');
    expect(html).not.toContain('<script>');
  });

  it('keeps line breaks out of the subject', async () => {
    const { buildLeadEmail } = await import('./notify');
    expect(buildLeadEmail({ ...lead, name: 'Jane\r\nBcc: x@evil.test' }).subject).not.toMatch(/[\r\n]/);
  });
});

describe('notifyLead', () => {
  beforeEach(() => {
    vi.resetModules();
    sendMail.mockReset();
    createTransport.mockClear();
  });
  afterEach(() => vi.unstubAllEnvs());

  it('sends nothing while SMTP is unconfigured', async () => {
    vi.stubEnv('SMTP_HOST', '');
    const { notifyLead, leadNotifyEnabled } = await import('./notify');
    expect(leadNotifyEnabled).toBe(false);
    expect(await notifyLead(lead)).toBe(false);
    expect(createTransport).not.toHaveBeenCalled();
  });

  it('mails the configured inbox, replying to the visitor', async () => {
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    vi.stubEnv('SMTP_USER', 'website@softsuave.com');
    vi.stubEnv('SMTP_PASS', 'secret');
    vi.stubEnv('LEAD_NOTIFY_TO', 'contact@softsuave.com, sales@softsuave.com');
    sendMail.mockResolvedValue({ messageId: '1' });
    const { notifyLead } = await import('./notify');

    expect(await notifyLead(lead)).toBe(true);
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ host: 'smtp.example.com', port: 587, secure: false, auth: { user: 'website@softsuave.com', pass: 'secret' } }),
    );
    const msg = sendMail.mock.calls[0][0];
    expect(msg.to).toEqual(['contact@softsuave.com', 'sales@softsuave.com']);
    expect(msg.from).toEqual({ name: 'Soft Suave Website', address: 'website@softsuave.com' });
    expect(msg.replyTo).toEqual({ name: 'Jane Doe', address: 'jane@company.com' });
  });

  it('reports a failed send instead of throwing', async () => {
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    sendMail.mockRejectedValue(new Error('connection refused'));
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { notifyLead } = await import('./notify');

    expect(await notifyLead(lead)).toBe(false);
    expect(err).toHaveBeenCalled();
    err.mockRestore();
  });
});
