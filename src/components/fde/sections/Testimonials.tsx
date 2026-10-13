import { Badge } from "@/components/fde/ui/Badge";
import { Container } from "@/components/fde/ui/Container";
import { TestimonialCard } from "@/components/fde/ui/TestimonialCard";
import {
  testimonials,
  testimonialsContent,
  type Testimonial,
} from "@/lib/fde/content/testimonials";

type TestimonialsProps = {
  content?: typeof testimonialsContent;
  items?: Testimonial[];
};

export function Testimonials({
  content = testimonialsContent,
  items = testimonials,
}: TestimonialsProps) {
  return (
    <section className="bg-surface py-10 sm:py-12 lg:py-[60px]">
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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {items.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center sm:mt-20">
          <p className="text-center text-[length:var(--fs-body-sm)] text-muted-foreground">
            {content.segmentsPrompt}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 lg:gap-x-14">
            {content.segments.map((segment) => (
              <li
                key={segment}
                className="text-[length:var(--fs-body-sm)] text-muted-foreground/75"
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
