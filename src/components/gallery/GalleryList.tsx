import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Artwork } from "@/types/content";

type GalleryListProps = {
  artworks: Artwork[];
};

export function GalleryList({ artworks }: GalleryListProps) {
  return (
    <div className="space-y-4">
      {artworks.map((artwork) => (
        <Link
          key={artwork.id}
          href={`/artwork/${artwork.slug}?vt=${artwork.slug}`}
          className="group border-ink/10 hover:border-accent/35 grid grid-cols-[92px_1fr] items-stretch overflow-hidden border bg-surface transition-colors md:grid-cols-[160px_1fr]"
        >
          <ViewTransition
            name={`artwork-image-${artwork.slug}`}
            share="artwork-morph"
          >
            <div className="relative h-full min-h-24 overflow-hidden md:min-h-36">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </ViewTransition>

          <div className="flex min-w-0 items-center justify-between gap-4 p-4 md:p-5">
            <div className="min-w-0 space-y-1">
              <h2 className="font-display truncate text-2xl leading-tight md:text-3xl">
                {artwork.title}
              </h2>
              <p className="text-muted truncate text-sm md:text-base">
                {artwork.year} · {artwork.medium} · {artwork.dimensions}
              </p>
            </div>

            <p className="text-accent shrink-0 text-sm font-semibold md:text-base">
              ${artwork.price.toFixed(2)} USD
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
