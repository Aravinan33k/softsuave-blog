import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../env';

/**
 * The one SMTP connection both lead emails share: the team's notification
 * (notify.ts) and the visitor's thank-you (auto-reply.ts). Configured entirely
 * from lib/env.ts and off until `SMTP_HOST` is set.
 */

/** Whether this deployment can send email at all. */
export const mailEnabled = Boolean(env.SMTP_HOST);

/** The From mailbox: LEAD_NOTIFY_FROM, else the account that authenticates. */
export const senderAddress = env.LEAD_NOTIFY_FROM || env.SMTP_USER;

/** The team inbox(es) leads are sent to — LEAD_NOTIFY_TO, split on commas. */
export const teamAddresses = env.LEAD_NOTIFY_TO.split(',')
  .map((a) => a.trim())
  .filter(Boolean);

/** One header line: visitor text with any line breaks flattened. */
export const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The SMTP password as the server expects it. Google shows an app password in
 * four groups ("abcd efgh ijkl mnop") and it is usually pasted that way; the
 * password itself is the sixteen letters, so for Gmail the spaces are dropped.
 * Any other provider's password is used exactly as written.
 */
export function smtpPassword(host: string, pass: string): string {
  return /(^|\.)(gmail|googlemail)\.com$/i.test(host.trim()) ? pass.replace(/\s+/g, '') : pass;
}

let transporter: Transporter | null = null;

export function getTransporter(): Transporter {
  transporter ??= nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE ?? env.SMTP_PORT === 465,
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: smtpPassword(env.SMTP_HOST, env.SMTP_PASS) } : undefined,
    // Bounded, so a mail server that hangs cannot hold the request's `after()`
    // work open indefinitely.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transporter;
}
