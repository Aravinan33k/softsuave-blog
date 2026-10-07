import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../env';

/**
 * Emails the team about a lead the database has just stored — the enquiry
 * forms on every marketing page and the /contact meeting booking.
 *
 * Before this, a stored lead reached nobody: the `Enquiry` table has no admin
 * view, so a submission sat in MySQL until someone thought to query it. The
 * no-database mode does not need this — there the lead is forwarded to the live
 * site's own endpoint (lib/leads/forward.ts), which already notifies the team.
 *
 * Plain SMTP via nodemailer, so it works with whichever mail provider runs
 * softsuave.com. Off until `SMTP_HOST` is set (lib/env.ts). Sending never
 * blocks or fails the visitor's submission: the routes call this from `after()`,
 * once the lead is safely stored and the response has gone out.
 */

export type LeadNotice = {
  name: string;
  email: string;
  phone?: string | null;
  requirement: string;
  /** The page's own subject line ("Hire ReactJS Developers enquiry"). */
  subject?: string | null;
  /** Absolute URL of the page the form was on (`leadPageUrl`). */
  pageUrl?: string | null;
  ipAddress?: string | null;
  receivedAt?: Date;
};

/** Whether lead emails are switched on for this deployment. */
export const leadNotifyEnabled = Boolean(env.SMTP_HOST && env.LEAD_NOTIFY_TO.trim());

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * "Wed, 7 Oct, 2026, 5:07:50 pm IST" — in LEAD_NOTIFY_TIMEZONE, not the
 * server's clock (UTC in the container), so the time matches the team's inbox
 * wherever the app runs. An unknown zone name falls back to UTC.
 */
export function formatReceived(date: Date, timeZone: string = env.LEAD_NOTIFY_TIMEZONE): string {
  const opts: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  };
  try {
    return new Intl.DateTimeFormat('en-IN', { ...opts, timeZone }).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-IN', { ...opts, timeZone: 'UTC' }).format(date);
  }
}

/** One header line: the visitor's text with any line breaks flattened. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

/**
 * The email itself — subject, plain text and HTML. Pure, so it is unit-tested
 * without a mail server. Everything the visitor typed is escaped in the HTML.
 */
export function buildLeadEmail(lead: LeadNotice): { subject: string; text: string; html: string } {
  const label = oneLine(lead.subject || 'Website enquiry');
  const subject = `New lead: ${label} — ${oneLine(lead.name)}`;
  const received = formatReceived(lead.receivedAt ?? new Date());

  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || '—'],
    ['Page', lead.pageUrl || '—'],
    ['Received', received],
  ];

  const text = [
    `New lead from the Soft Suave website: ${label}`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Requirement:',
    lead.requirement,
    '',
    `Reply to this email to answer ${lead.name} directly.`,
    ...(lead.ipAddress ? ['', `IP address: ${lead.ipAddress}`] : []),
  ].join('\n');

  const cell = 'padding:6px 12px 6px 0;vertical-align:top;';
  const html = `<!doctype html><html><body style="margin:0;padding:24px;font:15px/1.5 Arial,Helvetica,sans-serif;color:#16181d;">
<p style="margin:0 0 4px;font-size:13px;color:#656b76;">New lead from the Soft Suave website</p>
<h1 style="margin:0 0 18px;font-size:20px;">${escapeHtml(label)}</h1>
<table style="border-collapse:collapse;margin:0 0 18px;">
${rows
  .map(([k, v]) => {
    const value =
      k === 'Email'
        ? `<a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a>`
        : k === 'Page' && /^https?:\/\//.test(v)
          ? `<a href="${escapeHtml(v)}">${escapeHtml(v)}</a>`
          : escapeHtml(v);
    return `<tr><td style="${cell}color:#656b76;">${k}</td><td style="${cell}font-weight:600;">${value}</td></tr>`;
  })
  .join('\n')}
</table>
<p style="margin:0 0 6px;color:#656b76;">Requirement</p>
<div style="margin:0 0 18px;padding:12px 14px;border-left:3px solid #ff5436;background:#f6f7f9;white-space:pre-wrap;">${escapeHtml(lead.requirement)}</div>
<p style="margin:0;font-size:13px;color:#656b76;">Reply to this email to answer ${escapeHtml(lead.name)} directly.${
    lead.ipAddress ? ` IP address: ${escapeHtml(lead.ipAddress)}.` : ''
  }</p>
</body></html>`;

  return { subject, text, html };
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE ?? env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    // Bounded, so a mail server that hangs cannot hold the request's `after()`
    // work open indefinitely.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}

/** Resolves true when the mail server accepted the message. Never throws. */
export async function notifyLead(lead: LeadNotice): Promise<boolean> {
  if (!leadNotifyEnabled) return false;

  const { subject, text, html } = buildLeadEmail(lead);
  const from = env.LEAD_NOTIFY_FROM || env.SMTP_USER;
  try {
    await getTransporter().sendMail({
      from: from ? { name: 'Soft Suave Website', address: from } : undefined,
      to: env.LEAD_NOTIFY_TO.split(',').map((a) => a.trim()).filter(Boolean),
      // Answering the notification answers the visitor. An address object, not
      // a "name <email>" string, so nodemailer encodes the name safely.
      replyTo: { name: oneLine(lead.name), address: lead.email },
      subject,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('[lead notify] email not sent:', (err as Error).message);
    return false;
  }
}
