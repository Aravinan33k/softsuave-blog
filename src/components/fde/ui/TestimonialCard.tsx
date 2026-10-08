import { QuoteIcon, StarIcon } from "@/components/fde/ui/Icons";
import { toInitials, type Testimonial } from "@/lib/fde/content/testimonials";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const initials = testimonial.initials ?? toInitials(testimonial.name);

  return (
    <figure className="flex h-full flex-col rounded-[1rem] border border-border bg-background p-6 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_22px_50px_-30px_hsl(220_15%_8%/0.22)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex gap-1 text-primary"
          role="img"
          aria-label={`Rated ${testimonial.rating} out of 5`}
        >
          {Array.from({ length: testimonial.rating }, (_, index) => (
            <StarIcon key={index} className="h-[1.05rem] w-[1.05rem]" />
          ))}
        </div>
        <QuoteIcon aria-hidden className="shrink-0 text-primary/20" />
      </div>

      {/* min-height keeps the attributions level across a row of cards */}
      <blockquote className="mt-5 text-[0.95rem] leading-[1.65] text-foreground/85 lg:min-h-[8.5rem]">
        {`"${testimonial.quote}"`}
      </blockquote>

      {/* mt-auto keeps the attribution on the card's bottom edge */}
      <figcaption className="mt-auto flex items-start gap-3.5 pt-7">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[0.8rem] font-semibold text-primary-deep"
        >
          {initials}
        </span>
        <span>
          <span className="block font-display text-[0.95rem] font-bold text-foreground">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block text-[0.875rem] leading-[1.45] text-muted-foreground">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
