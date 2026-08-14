"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * Simple scroll-into-view fade + lift for non-heading blocks (paragraphs,
 * cards, rows). Uses a batch-friendly single tween. Reduced-motion safe.
 */
export default function FadeUp({
  children,
  className,
  y = 32,
  delay = 0,
  start = "top 88%",
  duration = 0.8,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`${styles.fadeReady} ${className ?? ""}`}>
      {children}
    </div>
  );
}
