import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { handleRouteError, jsonError, getClientIp, getUserAgent } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/db';
import { isValidName, isValidPhone, NAME_MESSAGE, PHONE_MESSAGE } from '@/lib/forms/enquiry-rules';
import { createBooking, isValidTimeZone, neetocalEnabled } from '@/lib/neetocal';

/**
 * POST /api/v1/meeting/book — books a slot from /contact's "Schedule Meeting"
 * card with NeetoCal, and records the lead as an `Enquiry` row, which is what
 * the live page does too (it posts the same details to its enquiry endpoint
 * alongside the booking). The same protections as /api/v1/enquiry: a tight
 * per-IP limit, a honeypot, and validation matching the column widths.
 */
export const dynamic = 'force-dynamic';

const bookingInput = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(191).refine(isValidName, NAME_MESSAGE),
  email: z.email('Please enter a valid email address.').trim().max(191),
  phone: z.string().trim().min(1, 'Please enter a valid phone number.').max(64).refine(isValidPhone, PHONE_MESSAGE),
  message: z.string().trim().min(1, 'Please tell us what the meeting is about.').max(5000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please pick a date.'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Please pick a time slot.'),
  timeZone: z.string().max(64).refine(isValidTimeZone, 'Unknown time zone.'),
  sourcePath: z.string().trim().max(512).optional(),
  /** Honeypot — see the handler. */
  website: z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-meeting-book', limit: 5, windowMs: 60_000 });
    if (limited) return limited;
    if (!neetocalEnabled) return jsonError(503, 'unavailable', 'Scheduling is not configured.');

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'invalid_body', 'Expected a JSON body.');
    }
    const parsed = bookingInput.safeParse(body);
    if (!parsed.success) {
      return jsonError(400, 'invalid_input', parsed.error.issues[0]?.message ?? 'Please check the form and try again.');
    }
    const { website, message, date, time, timeZone, sourcePath, ...lead } = parsed.data;

    // Honeypot: the same 202 a real booking gets.
    if (website) return NextResponse.json({ ok: true }, { status: 202 });

    const booked = await createBooking({ ...lead, date, time, timeZone });
    if (!booked.ok) {
      // Most often the slot was taken between loading the calendar and submitting.
      console.warn('[meeting/book] NeetoCal refused booking:', booked.message);
      return jsonError(409, 'slot_unavailable', 'That slot is no longer available. Please pick another time.');
    }

    await prisma.enquiry.create({
      data: {
        ...lead,
        requirement: `Meeting booked for ${date} ${time} (${timeZone}).\n\n${message}`,
        subject: 'Contact page meeting booking',
        sourcePath: sourcePath ?? null,
        sourceKey: 'contact-meeting',
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
      },
    });

    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    return handleRouteError(err, 'api/meeting/book');
  }
}
