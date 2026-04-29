import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/lib/content/catalog";

export function FeaturedArtworks() {
  return (
    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            Serie destacada
          </p>
          <h2 className="font-display mt-2 text-4xl leading-tight">
            Obras recientes
          </h2>
        </div>
        <Link href="/gallery" className="text-accent text-sm font-semibold">
          Explorar archivo completo
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/artwork/${artwork.slug}`}
            className="group rounded-card border-ink/10 bg-canvas-soft overflow-hidden border"
          >
            <div className="relative aspect-4/5">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-2xl leading-tight">
                {artwork.title}
              </h3>
              <p className="text-muted mt-1 text-sm">
                {artwork.year} · {artwork.medium}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
