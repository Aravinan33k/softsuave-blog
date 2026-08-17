"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/home/gsap";

/**
 * Lenis smooth-scroll driven off the GSAP ticker and wired into ScrollTrigger,
 * per DESIGN-THREE.md §5. Also hosts the global **depth-parallax** engine: each
 * [data-skew] content block drifts vertically as it crosses the viewport, with a
 * per-element depth factor so neighbouring blocks move at slightly different
 * speeds. Because the media inside tiles already parallaxes at its own rate, the
 * text blocks drifting differently produces a refined, layered sense of depth
 * (premium, no distortion) — replacing the earlier skew-on-velocity effect.
 *
 * Robustness: ScrollTrigger is refreshed after mount, after fonts load, on the
 * window `load` event, and on Lenis resize — late-loading images/fonts are the
 * usual cause of reveals firing all-at-once or never, and these refreshes fix
 * the trigger positions once everything has settled. Guarded for reduced-motion.
 */
export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      // No smooth scroll / no heavy motion, but still let any lightweight
      // ScrollTriggers measure once the page settles.
      const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => window.clearTimeout(id);
    }

    const lenis = new Lenis({
      lerp: 0.105,
      wheelMultiplier: 0.6,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.body.style.overscrollBehavior = "none";

    // While true, the magnetic snapper stands down (we're mid programmatic
    // scroll — an anchor jump or a snap already in flight).
    let programmatic = false;
    let programmaticReset = 0;
    const holdSnap = (ms: number) => {
      programmatic = true;
      window.clearTimeout(programmaticReset);
      programmaticReset = window.setTimeout(() => (programmatic = false), ms);
    };

    // ---- Smooth anchor navigation (Lenis) ------------------------------
    // Native hash jumps fight Lenis and land at a pinned section's *start*, i.e.
    // at scrub progress 0 — where the section's reveal hasn't played yet. For
    // those sections we jump to the trigger's END instead, so the link lands on
    // the fully-revealed state: #contact on the revealed enquiry, #industries on
    // the fanned-out cards rather than the empty stack.
    const REVEAL_END: Record<string, string> = {
      "#contact": "contactPin",
    };

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      holdSnap(1800); // don't let the snapper tug us off the intended target
      const pinId = REVEAL_END[href];
      if (pinId) {
        const st = ScrollTrigger.getById(pinId);
        if (st) {
          lenis.scrollTo(st.end, { duration: 1.4 });
          return;
        }
      }
      lenis.scrollTo(target as HTMLElement, { duration: 1.2, offset: -12 });
    };
    document.addEventListener("click", onAnchorClick);

    // ---- Magnetic section assist (momentum-tail) ----------------------
    // A post-stop snap always feels like a grab, because the page moves after
    // you've already settled. Instead we act on the *decaying tail* of a scroll's
    // momentum: if you're still gliding toward a nearby section boundary in your
    // direction of travel, we retarget the in-flight scroll onto it, so it eases
    // into place as one continuous motion — no pause, no jerk. Rules that keep it
    // feeling natural: it only arms after a real fling (a slow deliberate scroll
    // you park mid-section is left alone), fires at most once per gesture, isn't
    // locked (you can always scroll straight through it), and can't reach the far
    // boundary of a long pinned/scrubbed section, so those stay free. Desktop /
    // fine-pointer only.
    const snapEnabled = false;
    // Section start positions (document coords). A pinned section is wrapped in
    // a GSAP pin-spacer whose top is still the section's true start.
    const sectionTops = () => {
      const main = document.querySelector("main");
      if (!main) return [] as number[];
      return Array.from(main.children)
        .map((el) => (el as HTMLElement).getBoundingClientRect().top + window.scrollY)
        .sort((a, b) => a - b);
    };
    // "Free-scrub" = sections whose internal scroll must stay free: the pinned
    // ones (Services, Case Studies) EXCEPT Hero (snaps whole) and Journey (snaps
    // per stage), the Contact focus-pull, and any [data-scrollfree] section (the
    // Why "Soft Suave" stacking cards). Includes the start edge so landing on one
    // hands straight over to it.
    const isFreeScrub = (y: number) => {
      for (const st of ScrollTrigger.getAll()) {
        if (!st.pin) continue;
        const id = (st.trigger as HTMLElement | undefined)?.id;
        if (id === "top" || id === "journey") continue;
        if (y >= st.start - 4 && y < st.end - 8) return true;
      }
      const c = ScrollTrigger.getById("contactPin");
      if (c && y >= c.start - 4 && y < c.end - 8) return true;
      for (const el of Array.from(
        document.querySelectorAll<HTMLElement>("main [data-scrollfree]"),
      )) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y >= top - 4 && y < top + el.offsetHeight - 8) return true;
      }
      return false;
    };

    // Journey advances one *stage* per scroll: its pinned scrub range is divided
    // into equal steps (data-stages on #journey), added as intermediate stops.
    const journeyStops = () => {
      const st = ScrollTrigger.getById("journeyPin");
      const el = document.getElementById("journey");
      if (!st || !el) return [] as number[];
      const n = parseInt(el.getAttribute("data-stages") || "0", 10);
      if (n < 2) return [];
      const out: number[] = [];
      for (let k = 1; k < n; k++) out.push(st.start + ((st.end - st.start) * k) / (n - 1));
      return out;
    };

    // Every place a scroll can settle: section starts + Journey's stage stops.
    const allStops = () => [...sectionTops(), ...journeyStops()].sort((a, b) => a - b);

    // One scroll = one stop. A gesture that begins outside the free-scrub zones
    // snaps exactly one stop in its direction (next section — or next Journey
    // stage), landing aligned. Inside a free-scrub section it stands down so the
    // scroll runs free. Fires on the momentum tail with a velocity-matched glide
    // so the advance is one continuous motion, not a jerk.
    // Tied to the actual wheel GESTURE, not to velocity. A gesture opens on the
    // first wheel event after a pause and may consume exactly ONE snap — so a
    // long swipe, or the momentum trailing it, can never chain into two or three
    // sections (velocity-based arming used to re-arm the instant a snap ended).
    let gestureOpen = false;
    let gestureOriginY = 0;
    let gestureDir = 1;
    let lastWheelAt = 0;

    const onWheelProbe = (e: WheelEvent) => {
      if (!snapEnabled) return;
      const now = performance.now();
      const isNewGesture = now - lastWheelAt > 160;
      lastWheelAt = now; // always refresh, so input during a snap isn't seen as new
      if (programmatic) return;
      const y = window.scrollY;
      if (isFreeScrub(y)) {
        gestureOpen = false;
        return;
      }
      if (isNewGesture) {
        gestureOpen = true;
        gestureOriginY = y; // measure the target from HERE, not from where momentum lands
        gestureDir = e.deltaY > 0 ? 1 : -1;
      }
    };
    window.addEventListener("wheel", onWheelProbe, { passive: true });

    const onSnapScroll = () => {
      if (!snapEnabled || programmatic || !gestureOpen) return;
      // wait for the gesture itself to end, then for its momentum to calm down
      if (performance.now() - lastWheelAt < 120) return;
      if (Math.abs(lenis.velocity) > 3) return;

      const pts = allStops();
      const dir = gestureDir;
      const oy = gestureOriginY;
      gestureOpen = false; // this gesture has now had its single snap

      // Exactly one stop from where the gesture STARTED, in its direction.
      // Measuring from the origin (not the settled position) means momentum
      // overshoot can't add extra sections; and because it's a positional
      // lookup, being mid-section resolves to that section's own start rather
      // than skipping past it — which is what made reverse jump 2–3 at a time.
      let target: number | null = null;
      if (dir > 0) {
        for (const t of pts) if (t > oy + 8) { target = t; break; }
      } else {
        for (let i = pts.length - 1; i >= 0; i--) if (pts[i] < oy - 8) { target = pts[i]; break; }
      }
      if (target == null) return; // past the ends — let it run to footer / top

      const y = window.scrollY;
      const distance = Math.abs(target - y);
      if (distance < 6) return;

      programmatic = true;
      holdSnap(1500);
      // fixed, distance-scaled ease-in-out — a clean page-style transition
      const duration = Math.min(0.95, Math.max(0.5, distance / 1500));
      lenis.scrollTo(target, {
        duration,
        lock: true,
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        onComplete: () => (programmatic = false),
      });
    };
    lenis.on("scroll", onSnapScroll);

    // ---- Depth parallax: content blocks drift at different speeds -------
    // Each [data-skew] block eases vertically (y: +dist → -dist) as it crosses
    // the viewport. A per-element depth factor makes neighbours move at
    // different rates for a layered, premium sense of depth. Elements inside the
    // pinned horizontal work gallery carry no [data-skew], so they're excluded.
    // Child reveal triggers are unaffected: they cache natural (untransformed)
    // positions at refresh, so the parallax is a pure visual offset on top.
    const depthFactors = [0.55, 1, 0.75, 1.25];
    const parallaxTweens = gsap.utils
      .toArray<HTMLElement>("[data-skew]")
      .map((el, i) => {
        const attr = el.getAttribute("data-depth");
        const depth = attr ? parseFloat(attr) : depthFactors[i % depthFactors.length];
        const dist = 46 * depth; // px of drift each way
        return gsap.fromTo(
          el,
          { y: dist },
          {
            y: -dist,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });

    // ---- Refresh choreography (measure after everything loads) ---------
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const settle = window.setTimeout(refresh, 600);
    const late = window.setTimeout(refresh, 1600);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    // Refresh when the viewport/layout changes (Lenis re-measures too).
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.clearTimeout(late);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(programmaticReset);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheelProbe);
      document.removeEventListener("click", onAnchorClick);
      parallaxTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
