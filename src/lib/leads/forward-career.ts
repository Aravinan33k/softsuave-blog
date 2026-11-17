import 'server-only';
import { env } from '../env';
import { getClientIp } from '../http';
import { leadPageUrl } from './forward';
import { lookupIpLocation, normalizeIp, platformLocation } from './ip-location';

/**
 * Forwards a job application to softsuave.com's own career endpoint — the one its /softsuave-career page posts
 * to from the browser (`processCareerEmailForm` in its email-utility.js).
 *
 * The payload is exactly what that page sends: one multipart POST carrying the resume as `file`, the form's
 * `name`, `email`, `phone` and `experience` (a number, 1–6, from its dropdown), and the visitor's `ipAddress`,
 * `city`, `region` and `country` and the page's `url`. The live page looks the location up through ipinfo.io in
 * the browser; here it comes from the platform's request headers first (ip-location.ts), so no third party is
 * called from the visitor's device. The live page does not send the role as a field — it only shows in `url`
 * (`…/softsuave-career?role=software-engineer`) — so `url` is built to carry it too.
 *
 * Success is the endpoint's own `{ "status": "success" }` reply.
 */

export type ForwardedApplication = {
  name: string;
  email: string;
  phone: string;
  /** The live dropdown's value: "1" (less than a year) … "6" (more than five years). */
  experience: string;
  /** Slug of the role applied for (`software-engineer`), when the page was opened for one. */
  role?: string | null;
  /** The resume. */
  file: File;
};

/** The page address the application came from, with the role the way the live page's own link writes it. */
export function applicationPageUrl(req: Request, role?: string | null): string {
  const base = leadPageUrl(req, '/softsuave-career');
  return role ? `${base}?role=${encodeURIComponent(role)}` : base;
}

/** Resolves true when the endpoint accepted the application. Never throws. */
export async function forwardApplication(req: Request, application: ForwardedApplication): Promise<boolean> {
  const ip = normalizeIp(getClientIp(req));
  const where = await lookupIpLocation(ip, platformLocation(req.headers));
  // The live page sends the city with accents stripped.
  const ascii = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '');

  // `file` first, then the fields, as the live page appends them.
  const form = new FormData();
  form.append('file', application.file, application.file.name);
  form.append('name', application.name);
  form.append('email', application.email);
  form.append('phone', application.phone);
  form.append('experience', application.experience);
  form.append('ipAddress', where.ipAddress ?? ip ?? '');
  form.append('city', ascii(where.city));
  form.append('region', where.region);
  form.append('country', where.country);
  form.append('url', applicationPageUrl(req, application.role));

  try {
    // No `Content-Type` header: `fetch` writes the multipart boundary itself.
    const res = await fetch(env.CAREER_FORWARD_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: form,
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 300);
      console.error(`[career forward] endpoint answered ${res.status}${detail ? `: ${detail}` : ''}`);
      return false;
    }
    const data = (await res.json().catch(() => null)) as { status?: string } | null;
    if (data?.status !== 'success') {
      console.error('[career forward] endpoint did not confirm the application:', data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[career forward] request failed:', (err as Error).message);
    return false;
  }
}
