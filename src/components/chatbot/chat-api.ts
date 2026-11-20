import { appPath } from "@/lib/media-url";

/**
 * The widget's calls, all to this app's own proxies (app/api/v1/chat/*) —
 * the CSP allows `connect-src 'self'` only. Each mirrors a call softsuave.com's
 * widget makes straight to the assistant.
 */

export type ChatAnswer = { answer?: string };

class HttpError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: { message?: unknown } } | null;
  return typeof body?.error?.message === "string" ? body.error.message : fallback;
}

async function postAnswer(sessionId: string, query: string): Promise<ChatAnswer> {
  const res = await fetch(appPath("/api/v1/chat"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId, query }),
  });
  if (!res.ok) throw new HttpError(res.status, `chat failed: ${res.status}`);
  return (await res.json()) as ChatAnswer;
}

/**
 * One turn, streamed: `onDelta` receives the answer's text as the model writes
 * it, and the promise resolves to the `done` payload, whose `answer` is
 * authoritative. Without a streaming endpoint (404) — or when the stream can't
 * even be opened — the turn goes to the whole-answer route instead; once a
 * stream has started it is never retried, since the turn may already be stored.
 */
export async function requestAnswer(
  sessionId: string,
  query: string,
  onDelta: (text: string) => void,
): Promise<ChatAnswer> {
  let res: Response;
  try {
    res = await fetch(appPath("/api/v1/chat/stream"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, query }),
    });
  } catch {
    return postAnswer(sessionId, query);
  }
  if (res.status === 404 || res.status === 405) return postAnswer(sessionId, query);
  if (!res.ok) throw new HttpError(res.status, `chat failed: ${res.status}`);

  let result: ChatAnswer | null = null;
  await readSse(res, (event, data) => {
    if (event === "delta") onDelta(typeof data.text === "string" ? data.text : "");
    else if (event === "done") result = data as ChatAnswer;
    else if (event === "error") throw new Error(typeof data.error === "string" ? data.error : "Streaming failed");
  });
  if (!result) throw new Error("The answer stream ended early");
  return result;
}

type SseData = Record<string, unknown>;

/** One SSE frame (`event:` / `data:` lines) → its event name and parsed data. */
export function parseSseFrame(frame: string): { event: string; data: SseData } | null {
  let event = "message";
  let data = "";
  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) event = line.slice(6).trim();
    else if (line.startsWith("data:")) data += line.slice(5).trim();
  }
  if (!data) return null;
  return { event, data: JSON.parse(data) as SseData };
}

/** Server-Sent Events over fetch (EventSource can't POST). */
async function readSse(res: Response, onEvent: (event: string, data: SseData) => void) {
  const handle = (frame: string) => {
    const parsed = parseSseFrame(frame);
    if (parsed) onEvent(parsed.event, parsed.data);
  };
  if (!res.body) {
    (await res.text()).replace(/\r\n/g, "\n").split("\n\n").forEach(handle);
    return;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer = (buffer + decoder.decode(value, { stream: true })).replace(/\r\n/g, "\n");
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        handle(buffer.slice(0, end));
        buffer = buffer.slice(end + 2);
      }
    }
    if (buffer.trim()) handle(buffer);
  } catch (error) {
    reader.cancel().catch(() => {});
    throw error;
  }
}

/** The recording as text, or the status and message the widget should show. */
export async function transcribe(blob: Blob, sessionId: string | null): Promise<{ ok: true; text: string } | { ok: false; status: number; message: string }> {
  const extension = blob.type.includes("mp4") ? "mp4" : blob.type.includes("ogg") ? "ogg" : "webm";
  const form = new FormData();
  form.append("file", blob, `voice.${extension}`);
  if (sessionId) form.append("sessionId", sessionId);
  const res = await fetch(appPath("/api/v1/chat/transcribe"), { method: "POST", body: form });
  if (!res.ok) return { ok: false, status: res.status, message: await errorMessage(res, "Couldn't transcribe that, please try again.") };
  const data = (await res.json().catch(() => ({}))) as { text?: string };
  return { ok: true, text: data.text ?? "" };
}

/** MP3 for one chunk of a reply. */
export async function speak(text: string, sessionId: string | null): Promise<ArrayBuffer> {
  const res = await fetch(appPath("/api/v1/chat/speak"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(sessionId ? { text, sessionId } : { text }),
  });
  if (!res.ok) throw new HttpError(res.status, `speak failed: ${res.status}`);
  return res.arrayBuffer();
}

/* ---------- meeting slots ---------- */

/** One bookable day, in the visitor's time zone. */
export type SlotDay = { date: string; dateNumber: string; day: string; monthYear: string; times: string[] };

type RawSlots = { slots?: { date?: string; slots?: Record<string, unknown> }[] };

export async function fetchSlots(timeZone = visitorTimeZone()): Promise<SlotDay[]> {
  const res = await fetch(appPath("/api/v1/chat/slots"));
  if (!res.ok) throw new HttpError(res.status, "slots unavailable");
  return groupSlots((await res.json()) as RawSlots, timeZone);
}

export function visitorTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/** The zone as the assistant expects it (the live widget sends Kolkata, not Calcutta). */
export function bookingTimeZone(): string {
  return visitorTimeZone().replace("Calcutta", "Kolkata");
}

/**
 * The assistant's slots are UTC ("2026-10-15" + "11:00-11:30"). Each start time
 * is moved into `timeZone` — which can change its date — and the slots are
 * regrouped by local date, earliest first, as "hh:mm AM" labels.
 */
export function groupSlots(data: RawSlots, timeZone: string): SlotDay[] {
  const byDate = new Map<string, string[]>();
  for (const day of data.slots ?? []) {
    if (!day?.date || !day.slots) continue;
    for (const range of Object.keys(day.slots)) {
      const local = toLocalDateTime(day.date, range.split("-")[0], timeZone);
      if (!local) continue;
      const list = byDate.get(local.date) ?? [];
      if (!list.includes(local.time)) list.push(local.time);
      byDate.set(local.date, list);
    }
  }
  return [...byDate.keys()].sort().map((date) => {
    const [y, m, d] = date.split("-").map(Number);
    const noon = new Date(Date.UTC(y, m - 1, d, 12));
    return {
      date,
      dateNumber: String(d).padStart(2, "0"),
      day: noon.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
      monthYear: noon.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }),
      times: (byDate.get(date) ?? []).sort(byClock),
    };
  });
}

export function toLocalDateTime(date: string, time: string, timeZone: string): { date: string; time: string } | null {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if ([year, month, day, hour, minute].some((n) => !Number.isFinite(n))) return null;
  const utc = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .formatToParts(utc)
      .map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute} ${String(parts.dayPeriod).toUpperCase()}`,
  };
}

function byClock(a: string, b: string) {
  const minutes = (t: string) => {
    const [, h, m, p] = /^(\d+):(\d+) (AM|PM)$/.exec(t) ?? [];
    return ((Number(h) % 12) + (p === "PM" ? 12 : 0)) * 60 + Number(m);
  };
  return minutes(a) - minutes(b);
}

/** "2026-10-15" → "Oct 15", read as a calendar date (never shifted by the zone). */
export function readableDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}
