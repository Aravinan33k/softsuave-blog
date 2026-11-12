import 'server-only';
import path from 'node:path';
import { env } from '../env';
import { footer } from '../home/content';
import { escapeHtml, getTransporter, mailEnabled, oneLine, senderAddress, teamAddresses } from './mailer';

/**
 * The visitor's automatic "thank you for getting in touch" email, sent when a
 * form lead is stored — alongside, not instead of, the team's notification
 * (notify.ts).
 *
 * Laid out as softsuave.com's own confirmation email is: a blue-grey page, the
 * white logo on a brand-red header bar, a white card with the greeting and a
 * "Know more" button, then social icons and the office address. The copy is
 * the 7 Oct wording (one message for every form), and the footer carries the
 * offices and social links this site's footer shows today
 * (lib/home/content.ts) rather than the live email's 2020 address.
 *
 * Images are inline (CID) attachments from public/email/, not remote URLs, so
 * they show without the reader allowing remote images and without depending on
 * the site being reachable from the mail provider.
 */

export type AutoReplyLead = {
  name: string;
  email: string;
};

const BRAND = '#ff0042';
const ASSET_DIR = path.join(process.cwd(), 'public', 'email');

/** The social icons we draw (public/email/social-<key>.png), by footer name. */
const SOCIAL_ICONS: Record<string, string> = {
  LinkedIn: 'linkedin',
  Instagram: 'instagram',
  YouTube: 'youtube',
};

const socials = footer.social.filter((s) => SOCIAL_ICONS[s.name]);
const office = footer.offices[0];
const contactEmail = footer.contact.email;

/** Whether this deployment sends the visitor's thank-you email. */
export const autoReplyEnabled = mailEnabled && env.LEAD_AUTOREPLY;

/** "Jane" from "Jane Doe" — the email greets by first name. */
function firstName(name: string): string {
  return oneLine(name).split(/\s+/)[0] || 'there';
}

const NEXT_STEP = 'Our team will review your requirements and contact you within 24 hours to discuss how we can help you.';

/** Subject, plain text and HTML. Pure, so it is unit-tested without a mail server. */
export function buildAutoReplyEmail(
  lead: AutoReplyLead,
  opts: { siteUrl: string; year?: number },
): { subject: string; text: string; html: string } {
  const year = opts.year ?? new Date().getFullYear();
  const hello = firstName(lead.name);
  const address = `©${year} ${office.company} ${office.lines.join(', ')}.`;
  const subject = 'Thank you for getting in touch with Soft Suave';

  const text = [
    `Hi ${hello},`,
    '',
    'Thank you for getting in touch with Soft Suave.',
    '',
    NEXT_STEP,
    '',
    `If you have any questions in the meantime, please email us at ${contactEmail}.`,
    '',
    'We look forward to working with you!',
    '',
    'Best regards,',
    'Soft Suave Technologies',
    '',
    `Know more: ${opts.siteUrl}`,
    '',
    address,
  ].join('\n');

  const p = 'margin:0 0 20px;';
  const icons = socials
    .map(
      (s) =>
        `<a href="${escapeHtml(s.href)}" style="display:inline-block;margin:0 6px;text-decoration:none;"><img src="cid:social-${SOCIAL_ICONS[s.name]}" width="20" height="20" alt="${escapeHtml(s.name)}" style="display:block;border:0;"></a>`,
    )
    .join('');

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#d1deec;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#d1deec;">
<tr><td align="center" style="padding:28px 12px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:530px;">
<tr><td align="center" style="background:${BRAND};border-radius:6px;padding:18px 24px;">
<img src="cid:softsuave-logo" width="120" height="37" alt="Soft Suave" style="display:block;border:0;">
</td></tr>
<tr><td style="height:16px;line-height:16px;font-size:0;">&nbsp;</td></tr>
<tr><td style="background:#ffffff;border-radius:6px;padding:34px 22px 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#4e4e4e;">
<h1 style="margin:0 0 28px;font-size:20px;line-height:1.3;color:#222222;">Hi ${escapeHtml(hello)},</h1>
<p style="${p}">Thank you for getting in touch with Soft Suave.</p>
<p style="${p}">${NEXT_STEP}</p>
<p style="${p}">If you have any questions in the meantime, please email us at <a href="mailto:${contactEmail}" style="color:#1155cc;">${contactEmail}</a>.</p>
<p style="margin:0 0 30px;">We look forward to working with you!</p>
<p style="margin:0 0 6px;">Best regards,</p>
<p style="margin:0 0 18px;font-size:13px;color:#222222;">Soft Suave Technologies</p>
<table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
<tr><td style="background:${BRAND};border-radius:3px;"><a href="${escapeHtml(opts.siteUrl)}" style="display:inline-block;padding:9px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#ffffff;text-decoration:none;">Know more</a></td></tr>
</table>
</td></tr>
<tr><td align="center" style="padding:24px 0 10px;">${icons}</td></tr>
<tr><td align="center" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.8;font-weight:bold;color:#a5adb4;">©${year} ${escapeHtml(office.company)} ${escapeHtml(office.lines[0])},<br>${office.lines.slice(1).map(escapeHtml).join(', ')}.</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  return { subject, text, html };
}

/**
 * Sends the thank-you to the visitor. Replies go to the team inbox, not to the
 * sending mailbox. Resolves true when the mail server accepted it; never throws.
 */
export async function sendAutoReply(lead: AutoReplyLead, siteUrl: string): Promise<boolean> {
  if (!autoReplyEnabled) return false;

  const { subject, text, html } = buildAutoReplyEmail(lead, { siteUrl });
  try {
    await getTransporter().sendMail({
      from: senderAddress ? { name: 'Softsuave', address: senderAddress } : undefined,
      to: { name: oneLine(lead.name), address: lead.email },
      replyTo: teamAddresses[0],
      subject,
      text,
      html,
      attachments: [
        { filename: 'softsuave-logo.png', path: path.join(ASSET_DIR, 'softsuave-logo-white.png'), cid: 'softsuave-logo' },
        ...socials.map((s) => ({
          filename: `${SOCIAL_ICONS[s.name]}.png`,
          path: path.join(ASSET_DIR, `social-${SOCIAL_ICONS[s.name]}.png`),
          cid: `social-${SOCIAL_ICONS[s.name]}`,
        })),
      ],
    });
    return true;
  } catch (err) {
    console.error('[lead auto-reply] email not sent:', (err as Error).message);
    return false;
  }
}
