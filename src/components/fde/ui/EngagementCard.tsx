import {
  CodeIcon,
  LayersIcon,
  RocketIcon,
} from "@/components/fde/ui/Icons";
import type {
  EngagementIconName,
  EngagementModel,
} from "@/lib/fde/content/engagement";
import { cn } from "@/lib/fde/utils";

const icons: Record<
  EngagementIconName,
  React.ComponentType<{ className?: string }>
> = {
  code: CodeIcon,
  layers: LayersIcon,
  rocket: RocketIcon,
};

type EngagementCardProps = {
  model: EngagementModel;
  featuredLabel: string;
};

export function EngagementCard({
  model,
  featuredLabel,
}: EngagementCardProps) {
  const Icon = icons[model.icon];

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[1rem] border p-7 transition-all duration-300 sm:p-8",
        model.featured
          ? "border-primary/35 bg-ink-card-raised shadow-[0_30px_70px_-40px_hsl(var(--fde-primary)/0.55)]"
          : "border-ink-border bg-ink-card hover:border-ink-border/80",
      )}
    >
      {/* Accent rule drawn as an overlay so the ribbon can sit outside the card.
          Every card shares the same fading gradient — the featured card is
          distinguished by its border, glow and ribbon instead. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] rounded-t-[1rem] bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />

      {model.featured ? (
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[0.7rem] font-semibold whitespace-nowrap text-primary-foreground shadow-[0_6px_18px_-6px_hsl(var(--fde-primary)/0.8)]">
          {featuredLabel}
        </span>
      ) : null}

      <span className="flex h-12 w-12 items-center justify-center rounded-[0.75rem] bg-primary/12 text-primary">
        <Icon className="h-5 w-5" />
      </span>

      <p className="mt-8 text-sm text-primary">{model.eyebrow}</p>

      <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.015em] text-ink-foreground sm:text-[1.35rem]">
        {model.title}
      </h3>

      {/* min-height keeps every card's bullet list starting on the same line */}
      <p className="mt-4 text-[0.9rem] leading-[1.65] text-ink-muted lg:min-h-[4.5rem]">
        {model.description}
      </p>

      <ul className="mt-6 space-y-3">
        {model.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <span
              aria-hidden
              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span className="text-[0.9rem] leading-[1.5] text-ink-muted">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
