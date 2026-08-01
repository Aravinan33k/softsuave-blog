// Renders a JSON-LD script tag. `<` is escaped to prevent breaking out of the
// script element. Server component (no client JS).
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
