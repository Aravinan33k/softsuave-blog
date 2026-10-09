import { AccentHeading } from "@/components/fde/ui/AccentHeading";
import { Badge } from "@/components/fde/ui/Badge";
import { Button } from "@/components/fde/ui/Button";
import { Container } from "@/components/fde/ui/Container";
import { EngagementCard } from "@/components/fde/ui/EngagementCard";
import { ArrowRightIcon } from "@/components/fde/ui/Icons";
import {
  engagementContent,
  engagementModels,
  type EngagementModel,
} from "@/lib/fde/content/engagement";

type EngagementModelsProps = {
  content?: typeof engagementContent;
  models?: EngagementModel[];
};

export function EngagementModels({
  content = engagementContent,
  models = engagementModels,
}: EngagementModelsProps) {
  return (
    // `data-nav-tone="dark"`: the site header turns black over this dark
    // section, white over the rest of the page (see the page's <main>).
    <section data-nav-tone="dark" className="relative overflow-hidden bg-ink py-10 sm:py-12 lg:py-[60px]">
      {/* Faint brand glow keeps the flat black from reading as dead space */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--fde-primary)/0.10),transparent_65%)]"
      />

      <Container size="wide" className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="ink">{content.badge}</Badge>

          <AccentHeading
            runs={content.headline}
            className="mt-7 text-ink-foreground text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
          />

          <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.7] text-ink-muted sm:text-base">
            {content.description}
          </p>
        </div>

        {/* pt-4 reserves room for the featured card's ribbon to overhang */}
        <div className="mt-16 grid grid-cols-1 gap-6 pt-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {models.map((model) => (
            <EngagementCard
              key={model.title}
              model={model}
              featuredLabel={content.featuredLabel}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 sm:mt-20">
          <p className="text-center text-[0.95rem] text-ink-muted">
            {content.footerPrompt}
          </p>

          <Button
            href={content.footerCta.href}
            variant="primaryInk"
            size="lg"
            className="px-8"
          >
            {content.footerCta.label}
            <ArrowRightIcon />
          </Button>
        </div>
      </Container>
    </section>
  );
}
