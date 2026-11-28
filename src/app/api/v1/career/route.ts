import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { forwardApplication } from '@/lib/leads/forward-career';
import { EMAIL_MESSAGE, NAME_MESSAGE, PHONE_MESSAGE, isValidEmail, isValidName, isValidPhone } from '@/lib/forms/enquiry-rules';

/**
 * POST /api/v1/career — a job application with its resume, from /softsuave-career.
 *
 * Multipart, not JSON: the resume travels as a file. There is no table for applications here, so the route
 * validates the form and hands it on to softsuave.com's own career endpoint (lib/leads/forward-career.ts), where
 * the hiring team already receives them. Like /api/v1/enquiry it is the one public write endpoint of its kind, so
 * it carries its own protections rather than an auth check:
 *
 *   - a per-IP rate limit (a person applies once);
 *   - a honeypot field real users never see;
 *   - the same limits the live page's script enforces on the file — `.pdf` or `.doc`, under 500 KB — checked
 *     again here, since the form is not the only way to reach this route.
 *
 * The response is deliberately thin: nothing about where the application went is reflected back.
 */

export const dynamic = 'force-dynamic';

/** The live page's own file rules (its `#file` change handler): pdf or doc, under 500,000 bytes. */
const MAX_RESUME_BYTES = 500_000;

/**
 * The most a request may declare before it is read: the resume's limit plus room for the other fields and the
 * multipart framing. `req.formData()` buffers the whole body, so an oversized upload is refused on its declared
 * length rather than read in full first. (A body that declares no length is still held to the resume limit below.)
 */
const MAX_REQUEST_BYTES = MAX_RESUME_BYTES + 100_000;
const RESUME_EXTENSIONS = new Set(['pdf', 'doc']);

/** The live dropdown's values: 1 = less than a year … 6 = more than five years. */
const EXPERIENCE_VALUES = new Set(['1', '2', '3', '4', '5', '6']);

/** A role slug as the careers links write them (`software-engineer`, `sr-bd`). Anything else is dropped. */
const ROLE_SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;

const text = (form: FormData, key: string) => {
  const v = form.get(key);
  return typeof v === 'string' ? v.trim() : '';
};

export async function POST(req: NextRequest) {
  try {
    // 5 per minute per IP: shed a retry storm or a bot before it reaches anything behind this route.
    const limited = await rateLimit(req, { id: 'public-career', limit: 5, windowMs: 60_000 });
    if (limited) return limited;

    const declared = Number(req.headers.get('content-length'));
    if (Number.isFinite(declared) && declared > MAX_REQUEST_BYTES) {
      return jsonError(413, 'file_too_large', 'Uploaded file exceeds the maximum file size of 500KB');
    }

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return jsonError(400, 'invalid_body', 'Expected a multipart form.');
    }

    // Honeypot. Answered with the same 202 a real application gets, so a bot learns nothing.
    if (text(form, 'website')) return NextResponse.json({ ok: true }, { status: 202 });

    const name = text(form, 'name');
    const email = text(form, 'email');
    const phone = text(form, 'phone');
    const experience = text(form, 'experience');
    const roleRaw = text(form, 'role');
    const role = ROLE_SLUG.test(roleRaw) ? roleRaw : null;

    if (!name) return jsonError(400, 'invalid_input', 'Please enter your name.');
    if (name.length > 191 || !isValidName(name)) return jsonError(400, 'invalid_input', NAME_MESSAGE);
    if (!email) return jsonError(400, 'invalid_input', 'Please enter your email.');
    if (email.length > 191 || !isValidEmail(email)) return jsonError(400, 'invalid_input', EMAIL_MESSAGE);
    if (!phone) return jsonError(400, 'invalid_input', 'Please enter your phone number.');
    if (phone.length > 64 || !isValidPhone(phone)) return jsonError(400, 'invalid_input', PHONE_MESSAGE);
    if (!EXPERIENCE_VALUES.has(experience)) return jsonError(400, 'invalid_input', 'Please choose your experience.');

    const file = form.get('file');
    if (!(file instanceof File) || file.size === 0) {
      return jsonError(400, 'invalid_input', 'Please attach your resume.');
    }
    const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (!file.name.includes('.') || !RESUME_EXTENSIONS.has(ext)) {
      return jsonError(400, 'invalid_file', 'Upload only pdf or doc files');
    }
    if (file.size >= MAX_RESUME_BYTES) {
      return jsonError(400, 'file_too_large', 'Uploaded file exceeds the maximum file size of 500KB');
    }

    const sent = await forwardApplication(req, { name, email, phone, experience, role, file });
    if (!sent) {
      return jsonError(
        502,
        'application_not_delivered',
        'We could not send your application just now. Please try again, or email careers@softsuave.com.',
      );
    }
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    return handleRouteError(err, 'api/career');
  }
}
