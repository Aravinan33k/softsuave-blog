"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * When to start a decorative background video — never during the page's first
 * load, where its bytes compete with what the reader sees first (PageSpeed,
 * 15 Oct: the homepage hero's 2.2 MB clip and the closing band's clip on every
 * page both downloaded alongside the hero's CSS, fonts and image). Each video
 * sits over a poster of its first frame, so the moment it starts is invisible.
 */

/** True once the element is within `margin` of the viewport — for below-the-fold media. */
export function useNearViewport(ref: RefObject<Element | null>, margin = "400px"): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setNear(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

/** True once the page has loaded and the main thread is idle — for above-the-fold media. */
export function useAfterLoad(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    let timer: number | undefined;
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else {
        timer = window.setTimeout(() => setReady(true), 300);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);
  return ready;
}
