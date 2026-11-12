/**
 * Opens the site-wide chat widget from anywhere — the /contact page's "Live
 * Chat" row uses it. The widget (components/chatbot/chatbot.tsx) listens for
 * this event, so callers need no context or import of the widget itself.
 */
export const OPEN_CHAT_EVENT = "ss-chatbot:open";

export function openChatBot() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}
