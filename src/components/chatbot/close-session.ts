import { appPath } from "@/lib/media-url";

/**
 * Ends a chat session at the assistant (via /api/v1/chat/session). Its own
 * module so the launcher, on every page, can end an expired session without
 * loading the rest of the chat API.
 */
export function closeSession(sessionId: string): Promise<unknown> {
  return fetch(appPath(`/api/v1/chat/session?sessionId=${encodeURIComponent(sessionId)}`), {
    method: "DELETE",
    keepalive: true,
  }).catch(() => null);
}
