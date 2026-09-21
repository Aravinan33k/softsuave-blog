import { type ReactNode } from "react";
import { caComparison } from "@/lib/home/custom-ai-content";
import LandingComparison from "@/components/landing/comparison";

/**
 * One icon per comparison area (`caComparison.rows`, in order) — purely
 * decorative (`aria-hidden` on the wrapper, the row's own heading already
 * names the area), just a visual anchor so eight rows of prose don't read as
 * one grey block.
 *
 * These are the *insides* of the shared table's 24×24 stroke icon: the
 * wrapper, its stroke props and `.cmpAreaIcon` all live in
 * `landing/comparison.tsx`, so this list cannot drift off that section's icon
 * style. They stay here rather than moving into the shared component because
 * they are specific to what THIS page compares — a padlock means "Security"
 * only on a page that has a Security row.
 */
const ROW_ICONS: readonly ReactNode[] = [
  // Customization — adjustment sliders
  <path key="customization" d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h2M10 18h10" />,
  // Data usage — database
  <g key="data-usage">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </g>,
  // Integration — linked chain
  <g key="integration">
    <path d="M9.5 14.5l5-5" />
    <path d="M13 5.5l1-1a3 3 0 114.2 4.2l-1 1" />
    <path d="M11 18.5l-1 1a3 3 0 11-4.2-4.2l1-1" />
  </g>,
  // Ownership and control — shield
  <g key="ownership-and-control">
    <path d="M12 3.5l6.5 2.8v5.4c0 4-2.7 6.8-6.5 8.3-3.8-1.5-6.5-4.3-6.5-8.3V6.3z" />
    <path d="M9 12.2l2 2 4-4.4" />
  </g>,
  // Scalability — trending up
  <g key="scalability">
    <path d="M4 16.5l5-5 4 4 6.5-7.5" />
    <path d="M15.5 7.5h4v4" />
  </g>,
  // Security — padlock
  <g key="security">
    <rect x="5.5" y="11" width="13" height="9" rx="2" />
    <path d="M8.5 11V8a3.5 3.5 0 017 0v3" />
  </g>,
  // Implementation — build blocks
  <g key="implementation">
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="4" width="7" height="7" rx="1.2" />
    <rect x="4" y="13" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
  </g>,
  // Best suited for — target
  <g key="best-suited-for">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
  </g>,
];

/**
 * Custom vs. off-the-shelf comparison.
 *
 * A thin adapter over the shared `landing/comparison` table: this page used to
 * carry its own card-per-row markup (one bordered panel per area, holding the
 * two values side by side), which stated "Custom AI Solutions" and
 * "Off-the-Shelf AI Tools" again on every one of the eight rows. Stating each
 * heading ONCE at the top is what makes the section read as a comparison
 * rather than a stack of boxes, and it is what a reader scanning for the
 * difference actually needs.
 *
 * Everything else comes free with the shared component: a real `<table>` (so a
 * screen reader announces the column per cell), the reflow to one card per row
 * below 760px, and the section's scroll-in. The only thing this page adds back
 * is `ROW_ICONS` — the shared table's own marks are deliberately generic.
 *
 * `columns` is positional against each row's `values`, so the order here is
 * the contract: custom first, which is the column the page is arguing for and
 * the one the table paints as the lead.
 */
export default function Comparison() {
  const { columns, rows } = caComparison;

  return (
    <LandingComparison
      content={{
        eyebrow: caComparison.eyebrow,
        title: caComparison.title,
        body: caComparison.body,
        columns: [columns.custom, columns.offTheShelf],
        rows: rows.map((r) => ({ area: r.area, values: [r.custom, r.offTheShelf] })),
        icons: ROW_ICONS,
        /* This page exists to argue for custom, and every row here favours it
           — so the table says so rather than laying eight rows out neutrally
           and leaving the reader to total them up. */
        verdict: true,
        verdictNote: caComparison.verdictNote,
      }}
    />
  );
}
