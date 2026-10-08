import Image from "next/image";
import { Button } from "@/components/fde/ui/Button";
import { Container } from "@/components/fde/ui/Container";
import { MailIcon, MessageIcon } from "@/components/fde/ui/Icons";
import { publicMediaUrl } from "@/lib/media-url";
import { ctaBannerContent, type CtaAction } from "@/lib/fde/content/cta";

/**
 * Sits under the backdrop image as its fallback — a CSS approximation of the
 * same artwork, so a missing or slow-loading file leaves the card looking
 * right rather than flat. Layers paint first-on-top, so the banded wash is
 * listed last; the radial layer is the pale flare on the left edge.
 */
const emberBackground = [
  "radial-gradient(ellipse 24% 32% at 1% 30%, hsl(41 74% 74% / 0.80), transparent 64%)",
  "linear-gradient(120deg, hsl(40 68% 72%) 0%, hsl(28 92% 50%) 8%, hsl(20 88% 30%) 17%, hsl(12 78% 11%) 28%, hsl(0 32% 3%) 43%, hsl(0 32% 3%) 58%, hsl(10 74% 10%) 72%, hsl(22 88% 36%) 84%, hsl(27 92% 48%) 94%, hsl(30 88% 43%) 100%)",
].join(", ");

/**
 * A vignette rather than a flat wash. The artwork's core is already dark
 * enough for the copy, so this only has to take the edge off the amber bands
 * raking the corners: a light veil down the middle, thinning to almost
 * nothing at the edges where the bands should stay vivid.
 */
const copyScrim =
  "radial-gradient(ellipse 95% 130% at 50% 50%, hsl(var(--fde-ink) / 0.58) 0%, hsl(var(--fde-ink) / 0.48) 58%, hsl(var(--fde-ink) / 0.22) 86%, hsl(var(--fde-ink) / 0.06) 100%)";

const leadingIcons = {
  mail: <MailIcon width={16} height={16} />,
  message: <MessageIcon width={16} height={16} />,
};

type CtaBannerProps = {
  content?: typeof ctaBannerContent;
};

export function CtaBanner({ content = ctaBannerContent }: CtaBannerProps) {
  return (
    <section className="bg-background pb-10 pt-4 sm:pb-12 lg:pb-[60px]">
      <Container size="wide">
        <div className="relative isolate mx-auto max-w-[1024px] overflow-hidden rounded-[1rem] border border-ink-border bg-ink px-6 py-12 text-center sm:px-12 sm:py-14">
          {/*
           * Negative z-index paints these three layers above the card's own
           * background but below the in-flow copy, so the card keeps its
           * rounded-[0.25rem] clip and the text needs no stacking context of its own.
           * They share a z-index, so DOM order stacks them: fallback wash,
           * then the image over it, then the scrim over both.
           */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ backgroundImage: emberBackground }}
          />
          <Image
            src={publicMediaUrl("/images/fde/cta-background-one.webp")}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            /*
             * The art is 16:9 but the card is far wider than that on desktop
             * and taller than it on mobile. `object-cover` alone adapts the
             * crop to whatever width the card renders at (768px, 1024px, or
             * anything else); `object-left` only bites in the mobile case,
             * where a centred crop would land entirely on the black core and
             * lose the ember bands.
             */
            className="absolute inset-0 -z-10 object-cover object-left"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ backgroundImage: copyScrim }}
          />

          <h2 className="font-display text-[1.6rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink-foreground sm:text-[2rem]">
            {content.headline}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-[1.7] text-ink-muted sm:text-base">
            {content.description}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            {content.actions.map((action: CtaAction) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant}
                size="md"
              >
                {action.leadingIcon ? leadingIcons[action.leadingIcon] : null}
                {action.label}
                {action.trailingArrow ? <span aria-hidden>→</span> : null}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
