import type { CSSProperties } from "react";
import styles from "./simple-table.module.css";

export interface SimpleTableRow {
  /** The row's subject, rendered as `<th scope="row">`. */
  readonly head: string;
  /** One value per value column, positional against `columns.slice(1)`. */
  readonly cells: readonly string[];
}

/**
 * The one comparison table every landing page now uses.
 *
 * The review asked for "a simple table … on all pages": comparisons had been
 * drawn four different ways (a reflowing card-table, a stacked definition-list
 * copy, card rows with per-row icons, a scored board). This is the plain
 * version — a bordered `<table>` with one header row, a row header per line,
 * hairline rules and a light zebra, nothing else.
 *
 * On a narrow screen the table does not reflow into cards; it scrolls sideways
 * inside its own wrapper, which is focusable and labelled so a keyboard user
 * can scroll it too. Every column keeps a readable minimum width (see
 * `--st-cols` in the stylesheet) rather than squeezing prose into slivers.
 *
 * `lead` optionally tints one value column (0-based, among the value columns)
 * — the option a page is about. Presentation only; the text is unchanged.
 */
export default function SimpleTable({
  caption,
  columns,
  rows,
  lead,
}: Readonly<{
  /** Accessible name for the table and its scroll region (visually hidden). */
  caption: string;
  /** `[row-header column, ...value columns]`. */
  columns: readonly string[];
  rows: readonly SimpleTableRow[];
  lead?: number;
}>) {
  const [rowHeader, ...valueColumns] = columns;

  return (
    <div
      className={styles.wrap}
      role="region"
      aria-label={caption}
      tabIndex={0}
      style={{ "--st-cols": valueColumns.length } as CSSProperties}
    >
      <table className={styles.table}>
        <caption className={styles.srOnly}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.rowHeadCol}>
              {rowHeader || <span className={styles.srOnly}>Comparison area</span>}
            </th>
            {valueColumns.map((c, i) => (
              <th key={`${c}-${i}`} scope="col" data-lead={i === lead ? "true" : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={`${row.head}-${r}`}>
              <th scope="row">{row.head}</th>
              {valueColumns.map((c, i) => (
                <td key={`${c}-${i}`} data-lead={i === lead ? "true" : undefined}>
                  {row.cells[i] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
