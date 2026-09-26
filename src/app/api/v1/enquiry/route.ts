import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError, getClientIp, getUserAgent } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { enquiryInput } from '@/lib/api/schemas';
import { prisma } from '@/lib/db';
import { databaseConfigured } from '@/lib/env';
import { forwardLead } from '@/lib/leads/forward';

/**
 * POST /api/v1/enquiry — a lead from the marketing surface's hero form.
 *
 * This replaces a `mailto:` link. `landing/hero.tsx` used to serialise the
 * fields into a mail body and set `window.location.href`, which meant every
 * submission from a visitor without a configured desktop mail client was lost
 * with no trace and no error — on pages whose only conversion path this is.
 *
 * Deliberately NOT under `/admin`: this is the one public write endpoint on the
 * marketing surface, so it carries its own protections rather than an auth
 * check —
 *
 *   - a per-IP rate limit, tighter than the public read routes' 30/min, because
 *     a human fills this form once;
 *   - a honeypot field that real users never see and never fill;
 *   - zod validation whose maximums mirror the MySQL column widths, so an
 *     oversized field is a 400 with a message rather than a strict-mode insert
 *     rejection surfacing as an opaque 500.
 *
 * The response is intentionally thin. Nothing about the stored row — not its
 * id, not its count — is returned: this endpoint is unauthenticated, and a
 * response that reflected storage back would make it an oracle.
 */

// The lead has to be written before the response is sent, so this route is
// dynamic. Marking it explicitly keeps a future `export const revalidate` on a
// sibling from accidentally making it cacheable.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 5 per minute per IP. A person submits once; anything above this is a
    // retry storm or a bot, and both should be shed before they reach the DB.
    const limited = await rateLimit(req, { id: 'public-enquiry', limit: 5, windowMs: 60_000 });
    if (limited) return limited;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'invalid_body', 'Expected a JSON body.');
    }

    const parsed = enquiryInput.safeParse(body);
    if (!parsed.success) {
      // The first message only — the form shows one line, and enumerating every
      // failed field tells a scripted caller more about the schema than it
      // tells a person filling the form.
      const first = parsed.error.issues[0];
      return jsonError(400, 'invalid_input', first?.message ?? 'Please check the form and try again.');
    }

    const { website, phone, ...lead } = parsed.data;

    // Honeypot. Answered with the same 202 a real submission gets: telling a bot
    // it was detected only teaches the next attempt which field to leave alone.
    if (website) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    // No database configured (lib/env.ts): hand the lead to softsuave.com's own
    // lead endpoint instead of storing it, so it still reaches the team.
    if (!databaseConfigured) {
      const sent = await forwardLead(req, {
        name: lead.name,
        email: lead.email,
        phone: phone || null,
        description: lead.subject ? `${lead.requirement}\n\n(${lead.subject})` : lead.requirement,
        sourcePath: lead.sourcePath,
      });
      if (!sent) {
        return jsonError(
          502,
          'lead_not_delivered',
          'We could not send your enquiry just now. Please try again, or email contact@softsuave.com.',
        );
      }
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    await prisma.enquiry.create({
      data: {
        ...lead,
        // "" from an untouched optional input is absence, not an empty phone
        // number — store NULL so the column means what it says.
        phone: phone ? phone : null,
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
      },
    });

    // 202, not 201: the lead is recorded, but what the reader is promised — that
    // someone gets in touch — has not happened yet, and no resource is being
    // located for them to fetch.
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    return handleRouteError(err, 'api/enquiry');
  }
}
