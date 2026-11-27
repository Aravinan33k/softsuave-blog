import type { ReactNode } from "react";
import Image from "next/image";
import TechLogo from "@/components/home/tech-logo";
import { publicMediaUrl } from "@/lib/media-url";
import TechTabsClient from "./tech-tabs-client";

/** One category tab and the tools under it. */
export interface TechTabsGroup {
  readonly name: string;
  readonly items: readonly string[];
}

export interface TechTabsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  /** One tab per group, in order; the first is open on load. */
  readonly groups: readonly TechTabsGroup[];
  /** Gives a long title the section head's wider column (see `SectionHead`'s `wide`). */
  readonly wideHead?: boolean;
  /**
   * A page's own mark for a tool, by its name as written in `items` (root-
   * relative image) — drawn instead of the `TechLogo` lookup. The /ad pages
   * carry an image for every tool, including the ones `TechLogo` has no mark
   * for. Omitted, every tool uses `TechLogo`, as before.
   */
  readonly images?: Readonly<Record<string, string>>;
}

/**
 * Technology stack as category tabs over a centred grid of logo cards — one
 * tab per group (Frontend, Backend, ...), each tool a square card with its
 * brand mark above its name (Hire Software Developers review: "use this ui
 * design for tech stack section ... create it reusable").
 *
 * The grid holds at most eight cards to a row and centres every row, so a
 * short category sits in the middle of the band and a ninth tool starts a new,
 * equally spaced row instead of squeezing the first eight.
 *
 * Takes the same `{ eyebrow, title, body, groups }` shape as the other stack
 * bands, so any page's existing stack content renders here unchanged.
 *
 * Split in two like `landing/tech-stack`: this server half draws the marks
 * (`TechLogo` is ~30 KB gzipped of SVG, which must not ship as JavaScript) and
 * hands them to the client half, which only owns the tab state.
 */
export default function TechTabs({
  content,
  id = "tech",
}: {
  content: TechTabsContent;
  id?: string;
}) {
  const marks: Record<string, ReactNode> = Object.fromEntries(
    [...new Set(content.groups.flatMap((g) => g.items))].map((item) => [
      item,
      content.images?.[item] ? (
        <Image key={item} src={publicMediaUrl(content.images[item])} alt="" width={44} height={44} unoptimized style={{ width: 44, height: 44, objectFit: "contain" }} />
      ) : (
        <TechLogo key={item} name={item} />
      ),
    ]),
  );

  return <TechTabsClient content={content} id={id} marks={marks} />;
}
