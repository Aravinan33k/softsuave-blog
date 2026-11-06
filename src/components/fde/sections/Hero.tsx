import { Fragment } from "react";

import { Badge } from "@/components/fde/ui/Badge";
import { Button } from "@/components/fde/ui/Button";
import { Container } from "@/components/fde/ui/Container";
import { MailIcon, MessageIcon, SparklesIcon } from "@/components/fde/ui/Icons";
import { StatList } from "@/components/fde/ui/StatList";
import { heroContent, type HeroContent } from "@/lib/fde/content/hero";
import { cn } from "@/lib/fde/utils";

const iconMap = {
  message: <MessageIcon />,
  mail: <MailIcon />,
};

export function Hero({ content = heroContent }: { content?: HeroContent }) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <Container size="wide" className="pt-10 pb-[var(--section-y)] sm:pt-14 lg:pt-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <Badge
            tag={content.badge.tag}
            icon={<SparklesIcon />}
            className="animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_both]"
          >
            {content.badge.text}
          </Badge>

          <h1
            className={cn(
              // The site's page-H1 size and weight (`--fs-h1`, home.css: 50px
              // on desktop easing to 34px on phones); the forced break below
              // gives two full lines from `lg` up.
              "mt-7 text-balance font-display text-[length:var(--fs-h1)] font-light leading-[1.08] tracking-[-0.04em] text-foreground",
              "sm:mt-8",
              "animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.08s_both]",
            )}
          >
            {content.headline.map((run, index) => (
              <Fragment key={index}>
                {run.accent ? (
                  <em className="font-serif font-normal italic text-gradient">
                    {run.text}
                  </em>
                ) : (
                  <span>{run.text}</span>
                )}
                {/* Wider viewports get the deliberate two-line split; narrow
                    ones keep the balanced natural wrap. */}
                {run.breakAfter ? <br className="hidden lg:inline" /> : null}
              </Fragment>
            ))}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--fs-body)] leading-[1.6] text-muted-foreground animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.16s_both] sm:mt-7">
            {content.description}
          </p>

          <div className="mt-9 flex w-full flex-col items-stretch gap-3 animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.24s_both] sm:mt-11 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            {content.actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant}
                size="lg"
              >
                {action.icon ? iconMap[action.icon] : null}
                {action.label}
              </Button>
            ))}
          </div>

          {/* <div className="mt-12 flex w-full flex-col items-center gap-4 animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.32s_both] sm:mt-14">
            <p className="text-[0.95rem] text-muted-foreground">
              {content.newsletter.prompt}
            </p>
            <NewsletterForm
              placeholder={content.newsletter.placeholder}
              submitLabel={content.newsletter.submitLabel}
              successLabel={content.newsletter.successLabel}
            />
          </div> */}

          <StatList
            stats={content.stats}
            className="mt-12 w-full animate-[fde-fade-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.4s_both] sm:mt-16"
          />
        </div>
      </Container>
    </section>
  );
}

/** Soft radial brand wash sitting behind the hero copy. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--fde-primary)/0.08),transparent_50%),radial-gradient(circle_at_80%_100%,hsl(var(--fde-primary-glow)/0.06),transparent_50%)]" />
      <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[64rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--fde-primary)/0.07),transparent_65%)] blur-2xl" />
    </div>
  );
}

