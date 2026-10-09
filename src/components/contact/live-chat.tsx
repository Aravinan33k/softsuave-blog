"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { appPath } from "@/lib/media-url";
import { quickContact } from "@/lib/home/contact-content";
import styles from "./live-chat.module.css";

type Message = { readonly from: "bot" | "user"; readonly text: string };

const copy = quickContact.liveChat.panel;
const SESSION_KEY = "ss-live-chat-session";

/**
 * The /contact "Live Chat" panel: softsuave.com's own AI assistant, the one
 * its Live Chat row opens (see `/api/v1/chat`, which forwards to it).
 *
 * A fixed panel at the bottom right, like the live widget: title bar with a
 * live dot and a close button, a message list that opens on the live
 * greeting, and an input. One session id per browser tab, so the assistant
 * keeps the thread's context across messages; closing the panel keeps the
 * conversation, a reload starts a new one.
 *
 * Accessibility: a labelled non-modal dialog; the input takes focus on open,
 * Escape closes it and focus returns to whatever opened it; new replies are
 * announced through a polite live region.
 */
export default function LiveChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<readonly Message[]>([{ from: "bot", text: copy.greeting }]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, sending]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const query = draft.trim();
    if (!query || sending) return;
    setDraft("");
    setMessages((m) => [...m, { from: "user", text: query }]);
    setSending(true);
    try {
      const res = await fetch(appPath("/api/v1/chat"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId(), query }),
      });
      const data = (await res.json().catch(() => null)) as { answer?: string } | null;
      setMessages((m) => [...m, { from: "bot", text: res.ok && data?.answer ? data.answer : copy.error }]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: copy.error }]);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  if (!open) return null;

  // Portalled to <body>: the card that opens it sits inside a FadeUp whose
  // transform would otherwise become the fixed panel's containing block.
  return createPortal(
    <div className={styles.panel} role="dialog" aria-modal="false" aria-labelledby="live-chat-title">
      <div className={styles.head}>
        <span id="live-chat-title" className={styles.title}>
          {copy.title}
          <span className={styles.dot} aria-hidden />
        </span>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div ref={listRef} className={styles.list} aria-live="polite">
        {messages.map((m, i) => (
          <p key={i} className={m.from === "user" ? styles.user : styles.bot}>
            {m.from === "bot" ? withLinks(m.text) : m.text}
          </p>
        ))}
        {sending && (
          <p className={`${styles.bot} ${styles.typing}`} aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </p>
        )}
      </div>

      <form className={styles.form} onSubmit={send}>
        <input
          ref={inputRef}
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          maxLength={1000}
          autoComplete="off"
        />
        <button type="submit" className={styles.send} disabled={!draft.trim() || sending} aria-label="Send message">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
            <path d="M3 20.5 21 12 3 3.5l2.8 8.5L3 20.5Zm2.8-8.5h7.7" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </form>
    </div>,
    document.body,
  );
}

/** One id per tab, created on first use; survives closing the panel, not a reload. */
function sessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/**
 * The assistant answers in plain text with Markdown links
 * (`[Contact](https://www.softsuave.com/contact)`). Render those links, and
 * only those, as anchors — never as HTML — and only for http(s) URLs.
 */
function withLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}
