"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";

/**
 * Counts a numeric string ("150+", "13+", "2.4x") up from 0 to its parsed
 * value as it scrolls into view, keeping the original suffix and decimal
 * precision. A value with no leading number (or reduced motion) renders
 * unchanged and static — this is a proof-point accent, not a requirement.
 */
export default function CountUp({
  value,
  className,
  duration = 1.1,
  start = "top 88%",
}: {
  value: string;
  className?: string;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
      if (!el || !match || prefersReducedMotion()) return;

      const [, numStr, suffix] = match;
      const target = Number(numStr);
      const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
      const counter = { n: 0 };

      gsap.to(counter, {
        n: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start, once: true },
        onUpdate: () => {
          el.textContent = `${counter.n.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
