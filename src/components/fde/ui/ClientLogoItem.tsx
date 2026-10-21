"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { publicMediaUrl } from "@/lib/media-url";
import type { ClientLogo } from "@/lib/fde/content/logos";
import { cn } from "@/lib/fde/utils";

/**
 * A single mark in the trust strip. If the artwork fails to load the item
 * removes itself, rather than showing a broken-image icon or a text stand-in.
 */
export function ClientLogoItem({ logo }: { logo: ClientLogo }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const wrapper = (
    <div
      className={cn(
        "flex h-8 shrink-0 items-center justify-center opacity-80 transition-opacity duration-300 sm:h-9 lg:h-10",
        "hover:opacity-100",
      )}
    >
      <Image
        src={publicMediaUrl(logo.src)}
        alt={logo.name}
        width={logo.width}
        height={logo.height}
        onError={() => setFailed(true)}
        className="h-full w-auto object-contain"
        style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
        unoptimized
      />
    </div>
  );

  if (logo.href) {
    return (
      <Link href={logo.href} target="_blank" rel="noreferrer noopener">
        {wrapper}
      </Link>
    );
  }

  return wrapper;
}
