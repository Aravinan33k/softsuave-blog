"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./free-estimate-tab.module.css";

/** How far down the page (px) the reader has to scroll before the tab slides in — the live site's threshold. */
const SHOW_AFTER = 500;

/**
 * The "Get Free Estimate" tab fixed to the right edge of the viewport, vertically centred, reading bottom to
 * top — softsuave.com's side tab that leads into the free cost estimation chooser.
 *
 * Like the live site's, it is out of sight at the top of a page and slides in once the reader has scrolled
 * past the header and the opening screen, and slides away again on the way back up.
 */
export default function FreeEstimateTab({ href = "/free-cost-estimation", label = "Get Free Estimate" }: { href?: string; label?: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShown(window.scrollY >= SHOW_AFTER);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <SiteLink
      href={href}
      className={`${styles.tab} ${shown ? "" : styles.tabHidden}`}
      aria-hidden={shown ? undefined : true}
      tabIndex={shown ? undefined : -1}
    >
      <span className={styles.label}>{label}</span>
      <Send className={styles.icon} size={15} aria-hidden />
    </SiteLink>
  );
}
