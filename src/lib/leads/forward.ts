import 'server-only';
import { env } from '../env';
import { getClientIp } from '../http';
import { lookupIpLocation, normalizeIp, platformLocation } from './ip-location';

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
  /**
   * The live endpoint this form's counterpart submitted to (`lib/forms/lead-routing.ts`): `developer`
   * (`LEAD_FORWARD_URL`, the default), `contactUs` or `freeQuote`, both beside it under /forms/enquires/.
   */
  type?: 'developer' | 'contactUs' | 'freeQuote';
  /** Free-quote only: the company box (the live payload's `company`). */
  company?: string | null;
};

/** The endpoint for a lead type: `developer` is `LEAD_FORWARD_URL`; the others are its siblings. */
export function leadEndpoint(type: ForwardedLead['type'] = 'developer'): string {
  if (type === 'developer') return env.LEAD_FORWARD_URL;
  return new URL(type, env.LEAD_FORWARD_URL).toString();
}

/**
 * The absolute URL of the page a lead was sent from: the request's own origin
 * (so a lead from the test server links to the test server) joined to the
 * form's `sourcePath`. Falls back to the site URL, then to the bare origin.
 */
export function leadPageUrl(req: Request, sourcePath?: string | null): string {
  const origin = req.headers.get('origin') ?? env.NEXT_PUBLIC_SITE_URL;
  try {
    return new URL(sourcePath || '/', origin).toString();
  } catch {
    return origin;
  }
}

/** Resolves true when the endpoint accepted the lead. Never throws. */
export async function forwardLead(req: Request, lead: ForwardedLead): Promise<boolean> {
  const url = leadPageUrl(req, lead.sourcePath);

  // The live site's lead endpoint expects the visitor's IP and city/region/country, which its own
  // pages fill in from the browser. Left blank (a localhost dev server, or a host with no geo
  // headers) it answers 500, so they are filled the same way the lead email's are: the platform's
  // headers first, then ipinfo.io. See ip-location.ts for the dev / proxy cases.
  const ip = normalizeIp(getClientIp(req));
  const where = await lookupIpLocation(ip, platformLocation(req.headers));
  // The live page sends the city with accents stripped.
  const ascii = (v: string) => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const geo = {
    ipAddress: where.ipAddress ?? ip ?? '',
    url,
    city: ascii(where.city),
    region: where.region,
    country: where.country,
  };
  // developer and contactUs take the same body (processDeveloperEmailForm / processContactEmailForm); the footer's
  // free-quote form names the message `projectDescription` and adds its company, service and designation boxes
  // (processFreeQuotefooterEmailForm), which these forms do not have beyond the company.
  const payload =
    lead.type === 'freeQuote'
      ? {
          name: lead.name,
          phone: lead.phone ?? '',
          email: lead.email,
          projectDescription: lead.description,
          typeOfService: '',
          designation: '',
          company: lead.company ?? '',
          ...geo,
        }
      : { name: lead.name, phone: lead.phone ?? '', email: lead.email, description: lead.description, ...geo };

  try {
    const res = await fetch(leadEndpoint(lead.type), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 300);
      console.error(`[lead forward] endpoint answered ${res.status}${detail ? `: ${detail}` : ''}`);
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
