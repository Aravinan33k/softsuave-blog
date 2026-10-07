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
  pageUrl: 'http://54.237.230.68/rag-development-services',
  ipAddress: '157.51.86.204',
  city: 'Chennai',
  region: 'Tamil Nadu',
  country: 'IN',
  receivedAt: new Date('2026-10-07T10:15:00Z'),
};

describe('buildLeadEmail', () => {
  it('uses one subject for every lead', async () => {
    const { buildLeadEmail } = await import('./notify');
    expect(buildLeadEmail(lead).subject).toBe('New Business Enquiry – Jane Doe');
  });

  it('lists the visitor, a separator, then where the lead came from — in the live order', async () => {
    const { buildLeadEmail } = await import('./notify');
    const { text } = buildLeadEmail(lead);
    const order = [
      'From: Jane Doe',
      'Email: jane@company.com',
      'Phone: +91 98765 43210',
      'description: We need a <b>RAG</b> assistant',
      '*'.repeat(58),
      'IP: 157.51.86.204',
      'URL: http://54.237.230.68/rag-development-services',
      'City: Chennai',
      'Region: Tamil Nadu',
      'Country: IN',
      'Received: Wed, 7 Oct, 2026, 3:45:00 pm IST',
    ];
    let at = -1;
    for (const s of order) {
      const i = text.indexOf(s);
      expect(i, s).toBeGreaterThan(at);
      at = i;
    }
  });

  it('links the email, phone and page, and ends with the disclaimer', async () => {
    const { buildLeadEmail, LEAD_EMAIL_DISCLAIMER } = await import('./notify');
    const { html } = buildLeadEmail(lead);
    expect(html).toContain('href="mailto:jane@company.com"');
    expect(html).toContain('href="tel:+919876543210"');
    expect(html).toContain('href="http://54.237.230.68/rag-development-services"');
    expect(html).toContain(LEAD_EMAIL_DISCLAIMER);
  });

  it('leaves location fields blank rather than failing when unknown', async () => {
    const { buildLeadEmail } = await import('./notify');
    const { text } = buildLeadEmail({ ...lead, city: null, region: null, country: null });
    expect(text).toContain('City: \nRegion: \nCountry: ');
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
    expect(msg.from).toEqual({ name: 'Softsuave', address: 'website@softsuave.com' });
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

describe('smtpPassword', () => {
  it('drops the spaces Google shows in a Gmail app password', async () => {
    const { smtpPassword } = await import('./mailer');
    expect(smtpPassword('smtp.gmail.com', 'abcd efgh ijkl mnop')).toBe('abcdefghijklmnop');
  });

  it('leaves any other provider’s password exactly as written', async () => {
    const { smtpPassword } = await import('./mailer');
    expect(smtpPassword('smtp.office365.com', 'pass with spaces')).toBe('pass with spaces');
  });
});
