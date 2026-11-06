"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { OPEN_CHAT_EVENT } from "./open-chatbot";

const ChatBot = lazy(() => import("./chatbot"));

/**
 * Brings the chat widget in once the page has loaded and gone idle, rather
 * than with the page's own scripts: the launcher is a corner button nobody
 * needs in the first second, and its code competed with the page's for a
 * phone's bandwidth and main thread during start-up (PageSpeed, 15 Oct).
 *
 * A "Live Chat" button pressed before then (`openChatBot()`) loads it at once
 * and opens it — the request is not lost to a widget that isn't there yet.
 */
export default function ChatBotLoader() {
  const [show, setShow] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  useEffect(() => {
    const hasIdle = typeof window.requestIdleCallback === "function";
    let idle: number | undefined;
    let shown = false;
    const reveal = () => {
      shown = true;
      setShow(true);
    };
    // Once the widget is up it hears the event itself.
    const onOpen = () => {
      if (shown) return;
      setOpenOnMount(true);
      reveal();
    };
    const afterLoad = () => {
      idle = hasIdle ? window.requestIdleCallback(reveal, { timeout: 3000 }) : window.setTimeout(reveal, 1500);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
      window.removeEventListener("load", afterLoad);
      if (idle !== undefined) {
        if (hasIdle) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
    };
  }, []);

  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <ChatBot openOnMount={openOnMount} />
    </Suspense>
  );
}
