import Image from "next/image";
import Link from "next/link";
import { artworks } from "@/lib/content/catalog";

export default function GalleryPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">Galeria</p>
        <h1 className="font-display mt-2 text-5xl leading-tight">
          Archivo de obra
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/artwork/${artwork.slug}`}
            className="group rounded-card border-ink/10 overflow-hidden border bg-white/70"
          >
            <div className="relative aspect-5/6 overflow-hidden">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="space-y-1 p-4">
              <h2 className="font-display text-2xl">{artwork.title}</h2>
              <p className="text-muted text-sm">
                {artwork.year} · {artwork.medium}
              </p>
              <p className="text-muted text-sm">{artwork.dimensions}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
