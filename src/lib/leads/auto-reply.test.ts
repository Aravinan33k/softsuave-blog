import fs from 'node:fs';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// The visitor's thank-you email, laid out like softsuave.com's own. These pin
// its wording per page type, that what the visitor typed is escaped, that the
// inline images it references are attached (and exist), and that it stays off
// without SMTP or with LEAD_AUTOREPLY=false.

const { sendMail, createTransport } = vi.hoisted(() => {
  const sendMail = vi.fn();
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});
vi.mock('nodemailer', () => ({ default: { createTransport } }));

const site = 'http://54.237.230.68/';

describe('buildAutoReplyEmail', () => {
  it('greets the visitor by first name', async () => {
    const { buildAutoReplyEmail } = await import('./auto-reply');
    const { text, html } = buildAutoReplyEmail({ name: 'Jane Doe', email: 'jane@company.com' }, { siteUrl: site });
    expect(text.startsWith('Hi Jane,')).toBe(true);
    expect(html).toContain('Hi Jane,');
  });

  it('carries the agreed wording, in order, for every form', async () => {
    const { buildAutoReplyEmail } = await import('./auto-reply');
    const { subject, text } = buildAutoReplyEmail({ name: 'Jane', email: 'j@x.com' }, { siteUrl: site });
    expect(subject).toBe('Thank you for getting in touch with Soft Suave');
    const order = [
      'Hi Jane,',
      'Thank you for getting in touch with Soft Suave.',
      'Our team will review your requirements and contact you within 24 hours to discuss how we can help you.',
      'If you have any questions in the meantime, please email us at contact@softsuave.com.',
      'We look forward to working with you!',
      'Best regards,',
      'Soft Suave Technologies',
    ];
    let at = -1;
    for (const line of order) {
      const i = text.indexOf(line);
      expect(i, line).toBeGreaterThan(at);
      at = i;
    }
  });

  it('carries the live layout: logo, Know more link, social icons and address', async () => {
    const { buildAutoReplyEmail } = await import('./auto-reply');
    const { html } = buildAutoReplyEmail({ name: 'Jane', email: 'j@x.com' }, { siteUrl: site, year: 2026 });
    expect(html).toContain('src="cid:softsuave-logo"');
    expect(html).toContain(`href="${site}"`);
    expect(html).toContain('>Know more<');
    for (const k of ['linkedin', 'instagram', 'youtube']) expect(html).toContain(`cid:social-${k}`);
    expect(html).toContain('©2026 Soft Suave LLC 3030 K Street NW, Suite 102,<br>Washington, DC 20007, USA.');
    expect(html).toContain('mailto:contact@softsuave.com');
  });

  it('escapes the visitor name', async () => {
    const { buildAutoReplyEmail } = await import('./auto-reply');
    const { html } = buildAutoReplyEmail({ name: '<b>Jane</b> Doe', email: 'j@x.com' }, { siteUrl: site });
    expect(html).toContain('Hi &lt;b&gt;Jane&lt;/b&gt;,');
    expect(html).not.toContain('<b>Jane</b>');
  });
});

describe('sendAutoReply', () => {
  beforeEach(() => {
    vi.resetModules();
    sendMail.mockReset();
    createTransport.mockClear();
  });
  afterEach(() => vi.unstubAllEnvs());

  it('sends nothing while SMTP is unconfigured', async () => {
    vi.stubEnv('SMTP_HOST', '');
    const { sendAutoReply } = await import('./auto-reply');
    expect(await sendAutoReply({ name: 'Jane', email: 'j@x.com' }, site)).toBe(false);
    expect(createTransport).not.toHaveBeenCalled();
  });

  it('can be switched off on its own with LEAD_AUTOREPLY=false', async () => {
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    vi.stubEnv('LEAD_AUTOREPLY', 'false');
    const { sendAutoReply, autoReplyEnabled } = await import('./auto-reply');
    expect(autoReplyEnabled).toBe(false);
    expect(await sendAutoReply({ name: 'Jane', email: 'j@x.com' }, site)).toBe(false);
  });

  it('mails the visitor, replies going to the team, with every image attached', async () => {
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    vi.stubEnv('SMTP_USER', 'website@softsuave.com');
    vi.stubEnv('LEAD_NOTIFY_TO', 'sales@softsuave.com, ops@softsuave.com');
    sendMail.mockResolvedValue({ messageId: '1' });
    const { sendAutoReply } = await import('./auto-reply');

    expect(await sendAutoReply({ name: 'Jane Doe', email: 'jane@company.com' }, site)).toBe(true);
    const msg = sendMail.mock.calls[0][0];
    expect(msg.to).toEqual({ name: 'Jane Doe', address: 'jane@company.com' });
    expect(msg.from).toEqual({ name: 'Softsuave', address: 'website@softsuave.com' });
    expect(msg.replyTo).toBe('sales@softsuave.com');
    const cids = msg.attachments.map((a: { cid: string }) => a.cid);
    expect(cids).toEqual(['softsuave-logo', 'social-linkedin', 'social-instagram', 'social-youtube']);
    for (const a of msg.attachments as { path: string }[]) expect(fs.existsSync(a.path)).toBe(true);
    // Every inline image the HTML asks for is one of the attachments.
    for (const [, cid] of msg.html.matchAll(/cid:([\w-]+)/g)) expect(cids).toContain(cid);
  });

  it('reports a failed send instead of throwing', async () => {
    vi.stubEnv('SMTP_HOST', 'smtp.example.com');
    sendMail.mockRejectedValue(new Error('mailbox unavailable'));
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { sendAutoReply } = await import('./auto-reply');
    expect(await sendAutoReply({ name: 'Jane', email: 'j@x.com' }, site)).toBe(false);
    expect(err).toHaveBeenCalled();
    err.mockRestore();
  });
});
