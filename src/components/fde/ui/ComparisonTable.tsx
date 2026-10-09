import { CheckIcon, CloseIcon } from "@/components/fde/ui/Icons";
import type { CellValue, TableColumn, TableRow } from "@/lib/fde/content/whyFde";
import { cn } from "@/lib/fde/utils";

/**
 * Names both the scroll region and the table's caption. Kept as one string so
 * the two cannot drift apart — a region whose label contradicts the table it
 * wraps is worse for screen readers than no label at all.
 */
const tableLabel =
  "FDE Team compared with traditional outsourcing and in-house hiring";

function Cell({ value }: { value: CellValue }) {
  switch (value.type) {
    case "yes":
      return (
        <>
          <CheckIcon
            aria-hidden
            className="mx-auto h-[1.15rem] w-[1.15rem] text-primary"
          />
          <span className="sr-only">Included</span>
        </>
      );
    case "no":
      return (
        <>
          <CloseIcon
            aria-hidden
            className="mx-auto h-[1.15rem] w-[1.15rem] text-danger"
          />
          <span className="sr-only">Not included</span>
        </>
      );
    case "partial":
      // Dash and qualifier are both brand green — a partial "yes", not a "no".
      return (
        <span className="inline-flex items-center gap-1.5 text-primary">
          <span aria-hidden>—</span>
          {value.text}
        </span>
      );
    default:
      return <span className="text-foreground">{value.text}</span>;
  }
}

type ComparisonTableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  rowHeaderLabel: string;
};

export function ComparisonTable({
  columns,
  rows,
  rowHeaderLabel,
}: ComparisonTableProps) {
  /** Applied to every cell of our own column, header included, so the tint
      reads as one continuous band down the table. */
  const highlightCell = "bg-primary/[0.045]";

  return (
    /*
      Scrolls sideways on narrow screens rather than crushing the columns. The
      negative margin lets it scroll edge-to-edge on mobile instead of stopping
      inside the page gutter, and `px-4` puts the gutter back as padding so the
      table still starts flush with the copy above it.

      `tabIndex={0}` is what makes the overflow reachable without a pointer: a
      scroll container holding no focusable elements is otherwise a dead end
      for keyboard users. Chrome and Firefox now do this for scrollers
      automatically, but Safari does not, so it stays explicit. The pairing
      with `role="region"` + a label is the standard combination — a focusable
      element with no accessible name is announced as an unlabelled stop.
      Focus styling comes from the global `:focus-visible` rule in globals.css.

      `relative` is load-bearing, not decoration. `overflow-x` alone does not
      clip an absolutely positioned descendant unless this element is also that
      descendant's containing block. Every `.sr-only` cell label below is
      `position: absolute`, so without `relative` here their containing block
      resolved to the initial one (the `html` box) and they sat at x≈615 —
      unclipped, outside `body`'s scroll width but inside the document's, which
      is what gave every mobile page 226px of horizontal scroll.
    */
    <div
      role="region"
      aria-label={tableLabel}
      tabIndex={0}
      className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <table className="w-full min-w-[44rem] border-collapse text-center">
        <caption className="sr-only">{tableLabel}</caption>

        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[21%]" />
          <col className="w-[29.5%]" />
          <col className="w-[29.5%]" />
        </colgroup>

        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="px-5 py-5 text-left text-[0.95rem] font-normal text-muted-foreground"
            >
              {rowHeaderLabel}
            </th>

            {columns.map((column) => (
              <th
                key={column.title}
                scope="col"
                className={cn("px-5 py-5", column.highlight && highlightCell)}
              >
                <span
                  className={cn(
                    "block font-display text-[0.95rem] font-bold tracking-[-0.01em]",
                    column.highlight ? "text-primary" : "text-foreground",
                  )}
                >
                  {column.title}
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  {column.subtitle}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* divide-y rules between rows only, leaving the last row unbordered */}
        <tbody className="divide-y divide-border/70">
          {rows.map((row) => (
            <tr
              key={row.capability}
              className="transition-colors duration-150 hover:bg-muted/50"
            >
              <th
                scope="row"
                className="px-5 py-5 text-left text-[0.95rem] font-normal text-foreground"
              >
                {row.capability}
              </th>

              {row.cells.map((cell, index) => (
                <td
                  key={columns[index]?.title ?? index}
                  className={cn(
                    "px-5 py-5 text-[0.95rem]",
                    columns[index]?.highlight && highlightCell,
                  )}
                >
                  <Cell value={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
