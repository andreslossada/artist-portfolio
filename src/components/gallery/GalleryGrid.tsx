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
            <h2 className="font-display text-2xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>{artwork.title}</h2>
            <p className="text-muted text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              {artwork.year} · {artwork.medium}
            </p>
            <p className="text-muted text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{artwork.dimensions}</p>
            <p className="text-muted pt-1 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{artwork.description}</p>
            <p className="text-accent pt-2 text-sm font-semibold" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
              ${artwork.price.toFixed(2)} USD
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
