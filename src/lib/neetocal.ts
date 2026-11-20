import 'server-only';
import { env } from './env';

/**
 * NeetoCal client for /contact's "Schedule Meeting" card — the same meeting
 * (`meeting-with-softsuave`) and the same two external-API calls the live
 * softsuave.com/contact page makes. Server-side only: the live page ships its
 * API key to every browser, and this app's CSP (`connect-src 'self'`) would
 * block those browser calls anyway, so /api/v1/meeting/* proxies them.
 */

export const neetocalEnabled = Boolean(env.NEETOCAL_API_KEY);

export type SlotDay = { date: string; slots: string[] };

type RawSlots = {
  slots?: { date: string; slots: Record<string, { start_time: string; end_time: string; count: number }> }[];
};

/** Whether `tz` is an IANA zone this runtime knows — guards the query parameter. */
export function isValidTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/** Today's year/month as seen in `tz`. */
function monthIn(tz: string, offset: number): { year: number; month: number } {
  const [y, m] = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit' })
    .format(new Date())
    .split('-')
    .map(Number);
  const idx = y * 12 + (m - 1) + offset;
  return { year: Math.floor(idx / 12), month: (idx % 12) + 1 };
}

async function neetocal(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${env.NEETOCAL_BASE_URL}/api/external/v1${path}`, {
    ...init,
    headers: { 'X-Api-Key': env.NEETOCAL_API_KEY, 'Content-Type': 'application/json', ...init?.headers },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
}

/**
 * Open slots for this month and next, already expressed in `tz` — NeetoCal
 * shifts them server-side when asked with `time_zone`, so no client-side
 * conversion is needed (the live page fetches UTC and converts in the browser).
 * Returns days in date order, each with its start times ("HH:MM", 24h).
 */
export async function fetchSlots(tz: string): Promise<SlotDay[]> {
  const months = [monthIn(tz, 0), monthIn(tz, 1)];
  const results = await Promise.all(
    months.map(async ({ year, month }) => {
      const params = new URLSearchParams({ time_zone: tz, year: String(year), month: String(month) });
      const res = await neetocal(`/slots/${env.NEETOCAL_MEETING_SLUG}?${params}`);
      if (!res.ok) throw new Error(`NeetoCal slots ${res.status}`);
      return ((await res.json()) as RawSlots).slots ?? [];
    }),
  );

  const byDate = new Map<string, Set<string>>();
  for (const day of results.flat()) {
    const set = byDate.get(day.date) ?? new Set<string>();
    for (const s of Object.values(day.slots ?? {})) if (s.count > 0) set.add(s.start_time);
    byDate.set(day.date, set);
  }
  return [...byDate.entries()]
    .filter(([, set]) => set.size > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, set]) => ({ date, slots: [...set].sort() }));
}

/** "18:30" → "06:30 PM", the start-time form the live page books with. */
function to12h(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

export type BookingInput = {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  timeZone: string;
};

/** Books the slot. Resolves `{ ok: true }`, or `{ ok: false, message }` with NeetoCal's own reason. */
export async function createBooking(b: BookingInput): Promise<{ ok: true } | { ok: false; message: string }> {
  const payload: Record<string, unknown> = {
    meeting_slug: env.NEETOCAL_MEETING_SLUG,
    name: b.name,
    email: b.email,
    slot_date: b.date,
    slot_start_time: to12h(b.time),
    time_zone: b.timeZone,
  };
  if (b.phone) payload.form_responses = { phone_number: b.phone };

  const res = await neetocal('/bookings', { method: 'POST', body: JSON.stringify(payload) });
  if (res.ok) return { ok: true };
  const detail = (await res.json().catch(() => null)) as { error?: string; message?: string } | null;
  return { ok: false, message: detail?.error ?? detail?.message ?? `NeetoCal booking ${res.status}` };
}
