import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Artwork } from "@/types/content";

type GalleryGridProps = {
  artworks: Artwork[];
};

export function GalleryGrid({ artworks }: GalleryGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <Link
          key={artwork.id}
          href={`/artwork/${artwork.slug}?vt=${artwork.slug}`}
          transitionTypes={["artwork-open"]}
          className="group border-ink/10 hover:border-accent/35 relative overflow-hidden border bg-surface shadow-card transition-colors opacity-100"
        >
          <ViewTransition
            name={`artwork-image-${artwork.slug}`}
            share="artwork-morph"
          >
            <div className="relative aspect-5/6 overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </ViewTransition>
          <div className="space-y-1 p-4">
            <h2 className="font-display text-shadow text-2xl">{artwork.title}</h2>
            <p className="text-muted text-shadow-sm text-sm">
              {artwork.year} · {artwork.medium}
            </p>
            <p className="text-muted text-shadow-sm text-sm">{artwork.dimensions}</p>
            <p className="text-muted text-shadow-sm pt-1 text-sm">{artwork.description}</p>
            <p className="text-accent text-shadow-md pt-2 text-sm font-semibold">
              ${artwork.price.toFixed(2)} USD
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
