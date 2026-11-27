"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays a one-time CSS reveal when its block scrolls into view. The block is
 * fully visible as rendered: only once this has run does it get `data-armed`
 * (the CSS hides the animated parts), then `data-play` when it is on screen.
 * So with no JavaScript, or under `prefers-reduced-motion`, nothing is hidden.
 */
export default function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.dataset.play = "";
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
