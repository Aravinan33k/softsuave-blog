import TechLogo from "@/components/home/tech-logo";
import TechStackClient from "./tech-stack-client";

export interface TechStackContent {
  eyebrow: string;
  title: string;
  body: string;
  groups: readonly { readonly name: string; readonly items: readonly string[] }[];
}

/**
 * Technology stack as static bordered group panels.
 *
 * The homepage renders this as one auto-running marquee per group, alternating
 * direction and pausing on hover. On a landing page the stack is reference
 * information — a visitor scanning for "do they use Qdrant" should not have to
 * wait for a carousel to bring it round. `TechLogo` is kept: the marks are
 * brand assets, not a homepage layout.
 *
 * Entrance, as one timeline played once on scroll-in:
 *
 *   panels   the group cards lift in, staggered, and each card's accent rule
 *            draws across its top edge (the `--rule` custom property the CSS
 *            reads, so the pseudo-element can be tweened).
 *   chips    the tools spring in behind their panel, a fast stagger across
 *            the whole stack rather than per group, so the fill reads as one
 *            sweep down the section instead of thirteen separate bursts.
 *   colour   the marks arrive monochrome and dimmed, then resolve to full
 *            colour a beat later — a print coming up. It is the one moment
 *            of payoff in a reference section, and it uses the real asset
 *            (colourful brand marks) rather than decoration invented for it.
 *
 * The grey is applied by GSAP, never in CSS, so reduced motion (and any
 * failure to run) leaves every mark in full colour rather than grey. Nothing
 * here is scrubbed or pinned — this surface stays reveals-and-staggers only.
 *
 * Split in two: this server half draws the marks and hands them to the
 * animated client half (`./tech-stack-client`) ready-made. `TechLogo` is ~30 KB
 * gzipped of SVG; rendered inside the client half it shipped to every page with
 * a stack as JavaScript, ahead of the first paint (PageSpeed, 15 Oct).
 */
export default function TechStack({
  content,
  id = "tech",
  logos = true,
  largeLogos = false,
}: {
  content: TechStackContent;
  id?: string;
  /**
   * Whether each tool carries its brand mark.
   *
   * Turn it off for a long stack whose tools mostly have no mark in
   * `TechLogo` yet: a grid where a third of the chips show a real logo and
   * the rest show the generic fallback reads as broken, where a clean
   * typographic list of the same names reads as deliberate. The chips then
   * take a small accent bullet instead, and the develop-into-colour movement
   * of the reveal simply has nothing to run on.
   */
  logos?: boolean;
  /**
   * Draws each brand mark at 28px instead of the SVG's own 22px, so it fills
   * more of its 36px box (Custom AI review, 1 Oct: "make the icons slightly
   * bigger"). Opt-in, so the other stacks keep their current marks.
   */
  largeLogos?: boolean;
}) {
  const logoMarks = logos
    ? Object.fromEntries(
        [...new Set(content.groups.flatMap((g) => g.items))].map((item) => [item, <TechLogo key={item} name={item} />]),
      )
    : undefined;

  return <TechStackClient content={content} id={id} logoMarks={logoMarks} largeLogos={largeLogos} />;
}
