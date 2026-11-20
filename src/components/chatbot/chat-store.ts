/**
 * The chat thread and its session, kept IN MEMORY for the life of the page
 * (BUG-035). The widget lives in the root layout, so the conversation follows
 * the visitor from page to page while they browse; a refresh, a new tab or a
 * new visit starts an empty chat with a new session. softsuave.com's widget
 * keeps both in localStorage instead, which showed a previous conversation
 * again after a refresh — on a shared computer, to the next person too.
 * Within a page the live widget's rules still hold: one hour of inactivity
 * ends a session; one silent follow-up probe per session.
 */

export type ButtonKind = "yesno" | "skip" | "optout" | "editfields";

export type ChatEntry =
  | { id: string; kind: "text"; sender: "user" | "ai"; text: string; local?: boolean }
  | { id: string; kind: "buttons"; buttons: ButtonKind; text: string; fields?: string[]; disabled: boolean }
  | { id: string; kind: "slots"; field: "schedule_meeting" | "edit_slot"; disabled: boolean };

const KEYS = {
  session: "ss-chat:session",
  history: "ss-chat:history",
  slots: "ss-chat:slots",
  activity: "ss-chat:activity",
  followUp: "ss-chat:follow-up",
  unread: "ss-chat:unread",
} as const;


/** An hour without activity ends the session (live widget: 3 600 000 ms). */
export const SESSION_TIMEOUT_MS = 60 * 60 * 1000;
/** Two quiet minutes trigger the one follow-up probe. */
export const FOLLOW_UP_AFTER_MS = 2 * 60 * 1000;

const memory = new Map<string, string>();

function read(key: string): string | null {
  return memory.get(key) ?? null;
}

function write(key: string, value: string | null) {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
}

// Conversations the previous version saved in the browser: removed once, on
// the first page load after this change, so an old thread cannot linger there.
if (typeof window !== "undefined") {
  try {
    for (const key of Object.values(KEYS)) localStorage.removeItem(key);
  } catch {
    // storage blocked: nothing was saved there either
  }
}

export function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
}

export const store = {
  sessionId: () => read(KEYS.session),

  /** The current session, or a new one (which also re-arms the follow-up probe). */
  ensureSession(): string {
    const existing = read(KEYS.session);
    if (existing) return existing;
    const id = newId();
    write(KEYS.session, id);
    write(KEYS.followUp, "0");
    return id;
  },

  history(): ChatEntry[] {
    try {
      const parsed = JSON.parse(read(KEYS.history) ?? "[]") as unknown;
      return Array.isArray(parsed) ? parsed.filter(isEntry) : [];
    } catch {
      return [];
    }
  },

  /** Only what the visitor should see again: transient notices (`local`) stay out. */
  saveHistory(entries: readonly ChatEntry[]) {
    const kept = entries.filter((e) => !(e.kind === "text" && e.local));
    write(KEYS.history, kept.length ? JSON.stringify(kept) : null);
  },

  slots: () => {
    try {
      return JSON.parse(read(KEYS.slots) ?? "null") as unknown;
    } catch {
      return null;
    }
  },
  saveSlots: (value: unknown) => write(KEYS.slots, JSON.stringify(value)),

  lastActivity: () => Number(read(KEYS.activity)) || 0,
  touch: () => write(KEYS.activity, String(Date.now())),

  followUpsSent: () => Number(read(KEYS.followUp)) || 0,
  markFollowUpSent: () => write(KEYS.followUp, String(store.followUpsSent() + 1)),

  unread: () => Number(read(KEYS.unread)) || 0,
  setUnread: (n: number) => write(KEYS.unread, n > 0 ? String(n) : null),

  /** Forget the session and its thread (session ended, or timed out). */
  clear() {
    for (const key of Object.values(KEYS)) write(key, null);
  },
};

function isEntry(value: unknown): value is ChatEntry {
  if (!value || typeof value !== "object") return false;
  const e = value as Record<string, unknown>;
  return typeof e.id === "string" && (e.kind === "text" || e.kind === "buttons" || e.kind === "slots");
}
