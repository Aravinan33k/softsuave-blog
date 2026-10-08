import { Container } from "@/components/fde/ui/Container";
import { TimelineStep } from "@/components/fde/ui/TimelineStep";
import { protocolContent, protocolSteps, type ProtocolStep } from "@/lib/fde/content/protocol";

type ProtocolProps = {
  content?: typeof protocolContent;
  steps?: ProtocolStep[];
};

export function Protocol({
  content = protocolContent,
  steps = protocolSteps,
}: ProtocolProps) {
  return (
    <section className="bg-background py-10 sm:py-12 lg:py-[60px]">
      <Container size="wide">
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-[0.7rem] tracking-[0.18em] text-primary sm:text-xs">
            {content.eyebrow}
          </p>

          <h2 className="mt-6 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
            {content.headline}
          </h2>

          <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-muted-foreground sm:text-base">
            {content.subheading}
          </p>
        </div>

        {/* Scrolls sideways on narrow screens so the timeline keeps its shape
            instead of collapsing into unreadable columns. `tabIndex` makes the
            overflow reachable by keyboard, and a scroll box that takes focus
            needs a name — see the same pairing in ComparisonTable.

            `relative` keeps any absolutely positioned descendant (an `.sr-only`
            label, a badge) inside this scroller's containing block, so it is
            clipped here instead of escaping to the `html` box and widening the
            document. Same reason it is on the ComparisonTable wrapper. */}
        <div
          role="region"
          aria-label={content.headline}
          tabIndex={0}
          className="relative mt-14 -mx-4 overflow-x-auto px-4 sm:mt-16 sm:mx-0 sm:px-0"
        >
          <ol
            className="mx-auto grid min-w-[44rem] max-w-5xl"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((step) => (
              <TimelineStep key={step.day} step={step} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
