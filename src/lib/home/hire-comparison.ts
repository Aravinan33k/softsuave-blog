/**
 * "Choose the Right <technology> Development Partner" — the Soft Suave vs
 * in-house vs freelancer table.
 *
 * Shared because it is shared on the live site: every page that runs this band
 * ships byte-identical rows, and only the heading names the technology. The one
 * exception is the React Native page, whose table is its own — different
 * columns, different criteria, real rate figures — so it declares its own
 * `comparison` rather than calling this.
 *
 * Only the pages whose live source runs a `.hire-models` section list
 * `comparison` in their `order`. The rest are left without a table rather than
 * given one their source never publishes.
 */

import type { ComparisonContent } from "@/components/landing/comparison";

const COLUMNS = ["Soft Suave", "In-house", "Freelancer"] as const;

const ROWS: ComparisonContent["rows"] = [
  { area: "Time to get right developers", values: ["Within 48 hours", "4 - 8 Weeks", "2 - 4 Weeks"] },
  { area: "Time to start a project", values: ["Within 48 hours", "4 - 8 Weeks", "2 - 4 Weeks"] },
  { area: "Recurring cost", values: ["0", "$2000 to $3000", "0"] },
  { area: "Project failure risk", values: ["Extremely Low", "Low", "High"] },
  { area: "Dedicated resources", values: ["Yes", "Yes", "No"] },
  { area: "Communications", values: ["Seamless", "Seamless", "Uncertain"] },
];

/**
 * The standard partner table under this page's own heading.
 *
 * `body` is optional because most live pages run this section with a heading
 * and no intro paragraph; passing one that the page does not have would be
 * copy we wrote.
 */
export function partnerTable(title: string, body = ""): ComparisonContent {
  /* `verdict` paints the Soft Suave column as the recommended option. The
     per-row tick is NOT blanket: `leadWinsRow` in the table component drops it
     on the two rows where in-house matches us ("Dedicated resources: Yes / Yes"
     and "Communications: Seamless / Seamless"), so the table never claims a win
     its own cells contradict.

     No `verdictNote`: the live pages close this band on the table, and a line
     here would be copy we wrote rather than copy they publish. */
  return { eyebrow: "Compare", title, body, columns: [...COLUMNS], rows: ROWS, verdict: true };
}
