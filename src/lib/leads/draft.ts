import 'server-only';
import { env } from '../env';
import { getClientIp } from '../http';
import { leadPageUrl } from './forward';
import { lookupIpLocation, normalizeIp, platformLocation, type IpLocation } from './ip-location';

/**
 * Saves what a visitor has typed into a form BEFORE they submit it — the live site's "incomplete lead" capture.
 *
 * softsuave.com's PHP forms call `handleFieldBlur*` (email-utility.js) each time a field loses focus: the form's
 * current values go to `/forms/enquires/upsert<Type>Incomplete`, whose reply carries an `id` the page keeps in
 * `sessionStorage` and sends back as `uniqueid`, so the visit updates one row instead of adding one per field. Each
 * form type has its own endpoint and payload; the four builders below reproduce them field for field, including the
 * live defaults (`' '` for an empty name or message, `'+91'` for an empty phone, `''` for an empty email).
 *
 * The live page asks ipify and ipinfo.io from the browser; here the IP and its location are looked up on the server,
 * as the submit path does (`forward.ts`), so no lookup token is published in the page.
 */

export const DRAFT_TYPES = ['developer', 'contactUs', 'freeQuote', 'caseStudy'] as const;
export type DraftType = (typeof DRAFT_TYPES)[number];

/** The live endpoint per type, under the same `/forms/enquires/` the submit endpoints live in. */
const ENDPOINT: Record<DraftType, string> = {
  developer: 'upsertDeveloperIncomplete',
  contactUs: 'upsertContactUsIncomplete',
  freeQuote: 'upsertFreeQuoteIncomplete',
  caseStudy: 'upsertCaseStudyIncomplete',
};

export type DraftFields = {
  name?: string;
  email?: string;
  phone?: string;
  /** The message / requirement box (`message` on the live forms). */
  description?: string;
  /** Free-quote only: the company box. */
  company?: string;
};

export type DraftInput = {
  type: DraftType;
  /** The id an earlier save of this visit returned; absent on the first save. */
  uniqueid?: string;
  fields: DraftFields;
  /** Root-relative path of the page the form is on. */
  sourcePath?: string | null;
};

/** The base of the live lead endpoints: `LEAD_FORWARD_URL` with its last segment dropped. */
export function enquiresBase(): string {
  return new URL('.', env.LEAD_FORWARD_URL).toString();
}

const blank = (v: string | undefined, fallback: string) => (v && v.trim().length ? v : fallback);
// The live page sends the city with accents stripped.
const ascii = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '');

/** The exact body the live `handleFieldBlur*` function for this type sends. Exported for tests. */
export function draftPayload(
  input: DraftInput,
  page: { url: string; origin: string; path: string },
  ip: string,
  where: IpLocation,
): Record<string, string> {
  const f = input.fields;
  const geo = { ipAddress: ip, city: ascii(where.city), region: where.region, country: where.country };
  const person = { name: blank(f.name, ' '), email: blank(f.email, ''), phone: blank(f.phone, '+91') };
  let body: Record<string, string>;
  switch (input.type) {
    case 'freeQuote':
      body = { ...person, projectDescription: blank(f.description, ' '), company: blank(f.company, ' '), url: page.url, ...geo };
      break;
    case 'caseStudy':
      // The live case-study form sends the site root as `url`, the page as `caseStudyUrl`, and the page's path
      // without its leading slash as `caseStudyType`.
      body = {
        ...person,
        caseStudyType: page.path.replace(/^\//, ''),
        caseStudyUrl: page.url,
        url: `${page.origin}/`,
        ...geo,
      };
      break;
    default: // developer, contactUs
      body = { ...person, description: blank(f.description, ' '), url: page.url, ...geo };
  }
  if (input.uniqueid) body.uniqueid = input.uniqueid;
  return body;
}

/* A visitor leaves several fields in a row; their location does not change between them. */
const GEO_TTL_MS = 10 * 60_000;
const geoCache = new Map<string, { at: number; where: IpLocation }>();

async function locate(req: Request, ip: string | null): Promise<IpLocation> {
  const key = ip ?? '';
  const hit = geoCache.get(key);
  if (hit && Date.now() - hit.at < GEO_TTL_MS) return hit.where;
  const where = await lookupIpLocation(ip, platformLocation(req.headers));
  if (geoCache.size > 5_000) geoCache.clear();
  geoCache.set(key, { at: Date.now(), where });
  return where;
}

/** Saves the draft; resolves the row id the endpoint returned (or null). Never throws. */
export async function saveDraft(req: Request, input: DraftInput): Promise<string | null> {
  const url = leadPageUrl(req, input.sourcePath);
  const parsed = new URL(url);
  const ip = normalizeIp(getClientIp(req));
  const where = await locate(req, ip);
  const body = draftPayload(input, { url, origin: parsed.origin, path: parsed.pathname }, where.ipAddress ?? ip ?? '', where);

  try {
    const res = await fetch(enquiresBase() + ENDPOINT[input.type], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => '')).replace(/\s+/g, ' ').slice(0, 200);
      console.error(`[lead draft] ${ENDPOINT[input.type]} answered ${res.status}${detail ? `: ${detail}` : ''}`);
      return null;
    }
    const data = (await res.json().catch(() => null)) as { id?: string | number } | null;
    return data?.id != null ? String(data.id) : (input.uniqueid ?? null);
  } catch (err) {
    console.error('[lead draft] request failed:', (err as Error).message);
    return null;
  }
}
