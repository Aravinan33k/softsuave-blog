import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { databaseConfigured } from '@/lib/env';
import { DRAFT_TYPES, saveDraft } from '@/lib/leads/draft';

/**
 * POST /api/v1/enquiry/draft — what a visitor has typed into a form so far, saved when they leave a field, before
 * they submit (softsuave.com's "incomplete lead" capture; see `lib/leads/draft.ts`). Answers `{ id }`: the row id
 * the form sends back with its next save of the visit. Never an error the visitor sees: the form ignores failures.
 *
 * Unauthenticated like the enquiry route, so: a per-IP rate limit (a person leaves a handful of fields, a bot many),
 * a honeypot, and length limits that match the enquiry route's. Values are NOT validated as a finished lead — a
 * half-typed email is exactly what this records.
 */

export const dynamic = 'force-dynamic';

const text = (max: number) => z.string().max(max).optional();

const draftInput = z.object({
  type: z.enum(DRAFT_TYPES),
  uniqueid: z.string().trim().max(64).regex(/^[\w-]*$/).optional(),
  fields: z.object({
    name: text(191),
    email: text(191),
    phone: text(64),
    description: text(5000),
    company: text(382),
  }),
  sourcePath: z.string().trim().max(512).optional(),
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-enquiry-draft', limit: 40, windowMs: 60_000 });
    if (limited) return limited;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'invalid_body', 'Expected a JSON body.');
    }
    const parsed = draftInput.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_input', 'Invalid draft.');

    // With a database the full lead is stored on submit and there is no incomplete-lead table to update.
    if (databaseConfigured) return NextResponse.json({ id: null }, { status: 202 });

    const id = await saveDraft(req, parsed.data);
    return NextResponse.json({ id }, { status: 202 });
  } catch (err) {
    return handleRouteError(err, 'api/enquiry/draft');
  }
}
