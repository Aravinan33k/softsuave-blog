import 'server-only';
import { env } from '../env';
import { getClientIp } from '../http';

/**
 * Forwards a lead to softsuave.com's own lead endpoint — used by the enquiry and
 * meeting routes when no database is configured (lib/env.ts), so a lead is
 * delivered to where the team already receives them instead of being lost.
 *
 * The payload is exactly what the live site's contact forms send to the same
 * endpoint (`processDeveloperEmailForm` / `externalBookingSubmit` in its
 * email-utility.js), and success is its own `{ status: "success" }` reply. The
 * live page looks the visitor's city/region/country up through ipinfo.io; here
 * they come from Vercel's request headers instead, so no third party is called
 * (left empty off Vercel).
 */

export type ForwardedLead = {
  name: string;
  email: string;
  phone?: string | null;
  /** The visitor's message — the live payload's `description`. */
  description: string;
  /** Root-relative path of the page the lead came from. */
  sourcePath?: string | null;
};

function header(req: Request, name: string): string {
  const v = req.headers.get(name);
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

/** Resolves true when the endpoint accepted the lead. Never throws. */
export async function forwardLead(req: Request, lead: ForwardedLead): Promise<boolean> {
  const origin = req.headers.get('origin') ?? env.NEXT_PUBLIC_SITE_URL;
  let url = origin;
  try {
    url = new URL(lead.sourcePath || '/', origin).toString();
  } catch {
    /* keep the bare origin */
  }

  const payload = {
    name: lead.name,
    phone: lead.phone ?? '',
    email: lead.email,
    description: lead.description,
    ipAddress: getClientIp(req) ?? '',
    url,
    city: header(req, 'x-vercel-ip-city'),
    region: header(req, 'x-vercel-ip-country-region'),
    country: header(req, 'x-vercel-ip-country'),
  };

  try {
    const res = await fetch(env.LEAD_FORWARD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[lead forward] endpoint answered ${res.status}`);
      return false;
    }
    const data = (await res.json().catch(() => null)) as { status?: string } | null;
    if (data?.status !== 'success') {
      console.error('[lead forward] endpoint did not confirm the lead:', data);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead forward] request failed:', (err as Error).message);
    return false;
  }
}
