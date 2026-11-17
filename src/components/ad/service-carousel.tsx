import type { CardGridContent } from "@/components/generative-ai/industries";
import CardIcon from "@/components/generative-ai/card-icon";
import ServiceCarouselClient from "./service-carousel-client";

/**
 * A services grid's cards as a carousel — the /ad pages' "Our Services" band.
 *
 * Takes the same `CardGridContent` as the card grid it replaces, and picks
 * each card's glyph the same way (`CardIcon`, from the card's `key` or its
 * name and line), so a card keeps its icon. Picked here, on the server, and
 * handed to the client carousel as nodes, as `Industries` does for its grid.
 */
export default function ServiceCarousel({ content, id }: { content: CardGridContent; id: string }) {
  return (
    <ServiceCarouselClient
      content={content}
      id={id}
      icons={content.items.map((item) => (
        <CardIcon key={item.name} iconKey={item.key} text={`${item.name}. ${item.body}`} />
      ))}
    />
  );
}
