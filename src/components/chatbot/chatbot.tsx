"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { publicMediaUrl } from "@/lib/media-url";
import { closeSession } from "./close-session";
import { CHAT_COPY } from "./chat-copy";
import { SESSION_TIMEOUT_MS, UNREAD_KEY, store } from "./chat-store";
import { OPEN_CHAT_EVENT } from "./open-chatbot";
import styles from "./chatbot.module.css";

/**
 * The site-wide "Soft Suave - Live Chat" widget, as on softsuave.com: a robot
 * launcher in the bottom-right corner with a "Hi there! Need help?" bubble,
 * opening the assistant's chat panel. The live widget's #ff0042 is this site's
 * CTA orange (`--brand-500`, the "Book AI Strategy Call" button).
 *
 * Only the launcher ships with every page. The panel — chat, voice, booking —
 * is its own chunk, fetched when the visitor reaches for the launcher, or in
 * the background once a conversation is under way (it keeps the session's
 * follow-up and cross-tab sync running even while closed).
 *
 * Not on the admin dashboard or CMS previews.
 */
const ChatPanel = lazy(() => import("./chat-panel"));

const HIDDEN_ON = /^\/(admin|preview)(\/|$)/;

export default function ChatBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panelLoaded, setPanelLoaded] = useState(false);
  const [unread, setUnread] = useState(0);
  const [greeted, setGreeted] = useState(false);
  // A new key remounts the panel on a fresh, empty session.
  const [generation, setGeneration] = useState(0);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const loadPanel = useCallback(() => setPanelLoaded(true), []);

  const openChat = useCallback(() => {
    // An hour without activity ends the session: start the visitor afresh.
    const sessionId = store.sessionId();
    const last = store.lastActivity();
    if (sessionId && last && Date.now() - last > SESSION_TIMEOUT_MS) {
      void closeSession(sessionId);
      store.clear();
      setGeneration((g) => g + 1);
    }
    store.setUnread(0);
    setUnread(0);
    setGreeted(true);
    setPanelLoaded(true);
    setOpen(true);
  }, []);

  const minimize = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus({ preventScroll: true }));
  }, []);

  const sessionEnded = useCallback(() => {
    setOpen(false);
    setGeneration((g) => g + 1);
  }, []);

  useEffect(() => {
    const syncUnread = () => setUnread(store.unread());
    const id = window.setTimeout(syncUnread, 0);
    // A conversation under way: bring the panel's engine in once the page is idle.
    const hasIdle = typeof window.requestIdleCallback === "function";
    let idle: number | undefined;
    if (store.sessionId()) {
      idle = hasIdle ? window.requestIdleCallback(loadPanel, { timeout: 4000 }) : window.setTimeout(loadPanel, 2000);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === UNREAD_KEY || e.key === null) syncUnread();
    };
    window.addEventListener(OPEN_CHAT_EVENT, openChat);
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearTimeout(id);
      if (idle !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
      window.removeEventListener(OPEN_CHAT_EVENT, openChat);
      window.removeEventListener("storage", onStorage);
    };
  }, [loadPanel, openChat]);

  if (HIDDEN_ON.test(pathname)) return null;

  return (
    <div className={styles.root}>
      {!open && (
        <div className={styles.launcherRow}>
          {unread > 0 ? (
            <button type="button" className={styles.tooltip} onClick={openChat} aria-live="polite">
              {CHAT_COPY.unread}
            </button>
          ) : (
            !greeted && (
              <button type="button" className={styles.tooltip} onClick={openChat} onPointerEnter={loadPanel}>
                {CHAT_COPY.tooltip}
              </button>
            )
          )}
          <button
            ref={launcherRef}
            type="button"
            className={styles.launcher}
            onClick={openChat}
            onPointerEnter={loadPanel}
            onFocus={loadPanel}
            onTouchStart={loadPanel}
            aria-label={unread > 0 ? `Open live chat, ${unread} new message${unread > 1 ? "s" : ""}` : "Open live chat"}
            aria-haspopup="dialog"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- a 6 KB fixed-size icon; the optimizer adds nothing */}
            <img src={publicMediaUrl("/images/chatbot/chat-launcher.webp")} width={45} height={50} alt="" decoding="async" />
            {unread > 0 && (
              <span className={styles.badge} aria-hidden>
                {unread}
              </span>
            )}
          </button>
        </div>
      )}
      {panelLoaded && (
        <Suspense fallback={null}>
          <ChatPanel key={generation} open={open} onMinimize={minimize} onEnded={sessionEnded} onUnread={setUnread} />
        </Suspense>
      )}
    </div>
  );
}
