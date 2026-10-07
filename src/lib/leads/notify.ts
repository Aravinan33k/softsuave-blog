import 'server-only';
import { env } from '../env';
import { escapeHtml, getTransporter, mailEnabled, oneLine, senderAddress, teamAddresses } from './mailer';

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
  /** Absolute URL of the page the form was on (`leadPageUrl`). */
  pageUrl?: string | null;
  /** The visitor's IP, and where it is (`lookupIpLocation`). */
  ipAddress?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  receivedAt?: Date;
};

/** Whether lead emails are switched on for this deployment. */
export const leadNotifyEnabled = mailEnabled && teamAddresses.length > 0;

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

/**
 * Fine print under the lead email, as softsuave.com's own lead email carries
 * it. If the company mailbox's provider appends the same footer to outgoing
 * mail, it will show twice — drop it here then.
 */
export const LEAD_EMAIL_DISCLAIMER =
  'This email may contain confidential information intended only for the recipient. If received in error, please notify the sender and delete it. Unauthorized use or disclosure is prohibited. Opinions expressed are those of the sender and do not necessarily represent the organization. No liability is accepted for errors, omissions, or malware in email transmissions.';

const SEPARATOR = '*'.repeat(58);

/**
 * The email itself — subject, plain text and HTML. The body is laid out as
 * softsuave.com's own lead email is (the visitor's details, a row of
 * asterisks, then where the lead came from). Pure, so it is unit-tested
 * without a mail server. Everything the visitor typed is escaped in the HTML.
 */
export function buildLeadEmail(lead: LeadNotice): { subject: string; text: string; html: string } {
  const name = oneLine(lead.name);
  // One subject for every lead, whichever form it came from.
  const subject = `New Business Enquiry – ${name}`;

  const visitor: [string, string][] = [
    ['From', name],
    ['Email', lead.email],
    ['Phone', lead.phone ?? ''],
    ['description', lead.requirement],
  ];
  const origin: [string, string][] = [
    ['IP', lead.ipAddress ?? ''],
    ['URL', lead.pageUrl ?? ''],
    ['City', lead.city ?? ''],
    ['Region', lead.region ?? ''],
    ['Country', lead.country ?? ''],
    ['Received', formatReceived(lead.receivedAt ?? new Date())],
  ];

  const text = [
    ...visitor.map(([k, v]) => `${k}: ${v}`),
    SEPARATOR,
    ...origin.map(([k, v]) => `${k}: ${v}`),
    '',
    '-'.repeat(40),
    LEAD_EMAIL_DISCLAIMER,
  ].join('\n');

  const valueHtml = (k: string, v: string) => {
    if (!v) return '';
    const e = escapeHtml(v);
    if (k === 'Email') return `<a href="mailto:${e}" style="color:#1155cc;">${e}</a>`;
    if (k === 'Phone') return `<a href="tel:${escapeHtml(v.replace(/[^\d+]/g, ''))}" style="color:#1155cc;">${e}</a>`;
    if (k === 'URL' && /^https?:\/\//.test(v)) return `<a href="${e}" style="color:#1155cc;">${e}</a>`;
    return e;
  };
  const rows = (list: [string, string][]) =>
    list
      .map(
        ([k, v]) =>
          `<tr><td style="padding:3px 0;width:88px;vertical-align:top;font-weight:bold;">${k}</td><td style="padding:3px 0 3px 0;vertical-align:top;white-space:pre-wrap;">: ${valueHtml(k, v)}</td></tr>`,
      )
      .join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:16px 4px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#222222;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
${rows(visitor)}
<tr><td colspan="2" style="padding:2px 0 6px;font-size:12px;letter-spacing:0.5px;">${SEPARATOR}</td></tr>
${rows(origin)}
</table>
<hr style="margin:36px 0 14px;border:0;border-top:1px solid #9e9e9e;">
<p style="margin:0;font-family:'Times New Roman',Times,serif;font-size:13px;line-height:1.6;color:#222222;">${LEAD_EMAIL_DISCLAIMER}</p>
</body></html>`;

  return { subject, text, html };
}

/** Resolves true when the mail server accepted the message. Never throws. */
export async function notifyLead(lead: LeadNotice): Promise<boolean> {
  if (!leadNotifyEnabled) return false;

  const { subject, text, html } = buildLeadEmail(lead);
  try {
    await getTransporter().sendMail({
      from: senderAddress ? { name: 'Softsuave', address: senderAddress } : undefined,
      to: teamAddresses,
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
