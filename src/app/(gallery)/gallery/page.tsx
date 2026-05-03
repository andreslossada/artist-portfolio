import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { artworks } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export default async function GalleryPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.galleryPage.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-5xl leading-tight">
          {dict.galleryPage.title}
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/artwork/${artwork.slug}?vt=${artwork.slug}`}
            className="group border-ink/10 hover:border-accent/35 overflow-hidden border bg-white transition-colors"
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
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </ViewTransition>
            <div className="space-y-1 p-4">
              <h2 className="font-display text-2xl">{artwork.title}</h2>
              <p className="text-muted text-sm">
                {artwork.year} · {artwork.medium}
              </p>
              <p className="text-muted text-sm">{artwork.dimensions}</p>
              <p className="text-muted pt-1 text-sm">{artwork.description}</p>
              <p className="text-accent pt-2 text-sm font-semibold">
                ${artwork.price.toFixed(2)} USD
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
