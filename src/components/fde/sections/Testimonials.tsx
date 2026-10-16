import { Badge } from "@/components/fde/ui/Badge";
import { Container } from "@/components/fde/ui/Container";
import ReviewArchive from "@/components/home/reviews/review-archive";
import home from "@/components/home/home.module.css";
import { testimonials, type Testimonial } from "@/lib/home/content";
import { testimonialsContent } from "@/lib/fde/content/testimonials";

type TestimonialsProps = {
  content?: typeof testimonialsContent;
  /** The client stories. Defaults to the site's own, as every page runs them. */
  items?: readonly Testimonial[];
};

/**
 * Client stories: this page's own masthead (badge, H2, subtext) and closing
 * segments row, around the site's client-story box — `ReviewArchive`, the
 * rotating story slot with photo, quote, counter, dots and arrows that every
 * other page's testimonials section runs (13 Oct review: "update the client
 * testimonial box alone without changing the h2 or the subtext design"). It
 * replaced a row of three star-rated quote cards.
 *
 * The box reads the site's band tokens, which the `.fde` wrapper re-points or
 * leaves at their dark-band values, so it sits in the warm-white `.light`
 * scope; `fde-reviews` (fde.css) matches that scope's ground to this section.
 */
export function Testimonials({
  content = testimonialsContent,
  items = testimonials.items,
}: TestimonialsProps) {
  return (
    <section className="bg-surface py-[var(--section-y)]">
      <Container size="wide">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="soft">{content.badge}</Badge>

          <h2 className="mt-6 font-display text-balance text-[length:var(--fs-h2)] font-light leading-[1.1] tracking-[-0.03em] text-foreground">
            {content.headline}
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-[length:var(--fs-body)] leading-[1.6] text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className={`${home.light} fde-reviews mx-auto mt-[var(--section-head-gap)] max-w-[1180px]`}>
          <ReviewArchive reviews={items.map((review, i) => ({ ...review, ordinal: i + 1 }))} />
        </div>

        <div className="mt-[var(--section-head-gap)] flex flex-col items-center">
          <p className="text-center text-[length:var(--fs-body-sm)] text-muted-foreground">
            {content.segmentsPrompt}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 lg:gap-x-14">
            {content.segments.map((segment) => (
              <li
                key={segment}
                className="text-[length:var(--fs-body-sm)] text-muted-foreground"
              >
                {segment}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
