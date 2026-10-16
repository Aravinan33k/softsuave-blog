"use client";

/**
 * Central GSAP + plugin registration for /three. Import { gsap, ScrollTrigger,
 * useGSAP } from here so plugins are only ever registered once, client-side.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP as useGSAPBase } from "@gsap/react";
import { isOnScreen } from "./on-screen";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAPBase);
}

/** True when the user asked the OS to minimise non-essential motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ContextSafe = <T extends (...args: never[]) => unknown>(func: T) => T;
type GSAPCallback = (context: gsap.Context, contextSafe?: ContextSafe) => unknown;
type GSAPConfig = {
  scope?: { current: unknown } | Element | string;
  dependencies?: unknown[];
  revertOnUpdate?: boolean;
};

/*
 * Set-ups for sections below the fold, run a few at a time in their own tasks.
 *
 * `@gsap/react` runs every `useGSAP` callback in a layout effect, so on a page
 * load all of them — each section's `gsap.set` of its hidden state, its
 * ScrollTriggers, its timelines — ran inside React's one hydration commit: a
 * single task of 80–100 ms on a phone, and GSAP's style reads between them
 * forced ~90 style recalculations (PageSpeed, 15 Oct: the largest blocking
 * task on the AI and hire pages). Queued here and drained in slices of ~8 ms,
 * the same work no longer blocks input.
 */
const queue: { run: () => unknown; cancelled: boolean }[] = [];
let flushTimer = 0;

function flush() {
  flushTimer = 0;
  const start = performance.now();
  while (queue.length) {
    const task = queue.shift()!;
    if (!task.cancelled) task.run();
    if (performance.now() - start > 8) break;
  }
  if (queue.length) flushTimer = window.setTimeout(flush, 0);
}

function scopeElement(scope: GSAPConfig["scope"]): Element | null {
  if (!scope || typeof scope === "string") return null;
  if (scope instanceof Element) return scope;
  return scope.current instanceof Element ? scope.current : null;
}

/**
 * `@gsap/react`'s `useGSAP`, same signature and cleanup, with one difference:
 * a callback whose `scope` element is off screen when it would run is queued
 * (above) instead of run inside the hydration commit. Anything on screen — and
 * any call without an element scope — runs immediately, exactly as before, so
 * nothing the reader can see changes timing. What a queued callback creates is
 * still recorded in the component's context (`contextSafe`), so unmounting
 * reverts it, and unmounting first cancels it.
 */
export function useGSAP(callback?: GSAPCallback | GSAPConfig, dependencies?: unknown[] | GSAPConfig) {
  const config =
    dependencies && !Array.isArray(dependencies) && typeof dependencies === "object" ? dependencies : undefined;
  const run =
    typeof callback === "function"
      ? (context: gsap.Context, contextSafe?: ContextSafe) => {
          const el = scopeElement(config?.scope);
          if (!el || !contextSafe || isOnScreen(el)) return callback(context, contextSafe);
          const task = { run: contextSafe(() => callback(context, contextSafe)), cancelled: false };
          queue.push(task);
          if (!flushTimer) flushTimer = window.setTimeout(flush, 0);
          return () => {
            task.cancelled = true;
          };
        }
      : callback;
  return useGSAPBase(run, dependencies);
}

export { gsap, ScrollTrigger };
