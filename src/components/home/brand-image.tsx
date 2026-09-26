import Image from "next/image";
import { getImage } from "@/lib/home/images";
import { publicMediaUrl } from "@/lib/media-url";
import type { PageKey } from "@/lib/home/content";

type Props = {
  page: PageKey;
  id: string;
  /** override alt from manifest if a more specific one is desired */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** render as a fill image inside a positioned parent */
  fill?: boolean;
};

/**
 * next/image wrapper that pulls src/dimensions/blurDataURL/alt from the
 * generated Pexels manifest. Every image slot on every page uses this —
 * no placeholders, correct sizes, blur-up, priority on heroes.
 *
 * The manifest stores srcs root-relative ("/images/four/hero.webp"); the mount
 * subpath is applied here via `publicMediaUrl`. `basePath` does NOT rewrite
 * next/image sources — the optimizer fetches the `url` param verbatim, so under
 * `basePath: '/blog'` an unprefixed src misses the statically served asset and
 * comes back 400 "The requested resource isn't a valid image".
 */
export default function BrandImage({
  page,
  id,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  fill = false,
}: Props) {
  const img = getImage(page, id);
  const src = publicMediaUrl(img.src);
  const resolvedAlt = alt ?? img.alt;
  if (fill) {
    return (
      <Image
        src={src}
        alt={resolvedAlt}
        fill
        placeholder="blur"
        blurDataURL={img.blurDataURL}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={img.width}
      height={img.height}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
