import 'server-only';
import { env } from '../env';
import { getClientIp } from '../http';
import { leadPageUrl } from './forward';
import { lookupIpLocation, normalizeIp, platformLocation } from './ip-location';

/**
 * Forwards a case-study download request to softsuave.com's own case-study endpoint — the one its
 * "Download Case Study!!!" dialog posts to (`sendEmailFormCaseStudy` in its email-utility.js).
 *
 * The live page does not download anything in the browser: it posts the visitor's `name`, `phone` and `email`
 * with the case study's id (`caseStudyType`, see case-study-ids.ts), the visitor's `ipAddress`, `city`, `region`
 * and `country` and the page's `url`, and the server e-mails the visitor the case study. Success is the
 * endpoint's own `{ "status": "success" }` reply.
 */

/** The live endpoint. `env` supplies it too; this is for a running server that read its environment before the setting existed. */
const DEFAULT_URL = 'https://www.softsuave.com/forms/enquires/caseStudy';

export type ForwardedCaseStudyRequest = {
  name: string;
  email: string;
  phone: string;
  /** The live id of the case study (`VEHICLE_INTELLIGENCE_PLATFORM`). */
  caseStudyType: string;
  /** Root-relative path of the case study page. */
  sourcePath?: string | null;
};

/** Resolves true when the endpoint accepted the request. Never throws. */
export async function forwardCaseStudyRequest(req: Request, request: ForwardedCaseStudyRequest): Promise<boolean> {
  const ip = normalizeIp(getClientIp(req));
  const where = await lookupIpLocation(ip, platformLocation(req.headers));
  // The live page sends the city with accents stripped.
  const ascii = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '');

  const payload = {
    name: request.name,
    phone: request.phone,
    email: request.email,
    caseStudyType: request.caseStudyType,
    ipAddress: where.ipAddress ?? ip ?? '',
    url: leadPageUrl(req, request.sourcePath),
    city: ascii(where.city),
    region: where.region,
    country: where.country,
  };

  try {
    const res = await fetch(env.CASE_STUDY_FORWARD_URL ?? DEFAULT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      // The live page waits as long as the server takes: the endpoint sends the e-mail before it answers, which can run
      // well past the 10 s the plain lead forward allows.
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 300);
      console.error(`[case study forward] endpoint answered ${res.status}${detail ? `: ${detail}` : ''}`);
      return false;
    }
    const data = (await res.json().catch(() => null)) as { status?: string } | null;
    if (data?.status !== 'success') {
      console.error('[case study forward] endpoint did not confirm the request:', data);
      return false;
    }
    return true;
  } catch (err) {
    const timedOut = (err as Error).name === 'TimeoutError' || (err as Error).name === 'AbortError';
    console.error(`[case study forward] request ${timedOut ? 'timed out' : 'failed'}:`, (err as Error).message);
    return false;
  }
}
