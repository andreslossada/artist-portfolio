import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { artworks, getArtworkBySlug } from "@/lib/content/catalog";

type ArtworkDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ vt?: string }>;
};

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export default async function ArtworkDetailPage({
  params,
  searchParams,
}: ArtworkDetailPageProps) {
  const { slug } = await params;
  const { vt } = await searchParams;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const transitionName = `artwork-image-${vt ?? artwork.slug}`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-10 md:py-8">
      <article className="border-ink/10 shadow-card grid gap-8 rounded-4xl border bg-white/70 p-5 md:grid-cols-2 md:items-start md:gap-10 md:p-8">
        <ViewTransition name={transitionName} share="artwork-morph">
          <div className="relative mx-auto aspect-2/3 w-full max-w-sm overflow-hidden rounded-xl md:mx-0 md:max-w-md">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 88vw, 30rem"
            />
          </div>
        </ViewTransition>

        <div>
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            Detalle de obra
          </p>
          <h1 className="font-display mt-3 text-5xl leading-tight">
            {artwork.title}
          </h1>
          <p className="text-muted mt-4">{artwork.description}</p>

          <p className="text-accent mt-4 text-2xl font-semibold">
            ${artwork.price.toFixed(2)} USD
          </p>

          <dl className="text-muted mt-8 space-y-2 text-sm">
            <div>
              <dt className="text-ink inline">Tecnica:</dt>{" "}
              <dd className="inline">{artwork.medium}</dd>
            </div>
            <div>
              <dt className="text-ink inline">Dimension:</dt>{" "}
              <dd className="inline">{artwork.dimensions}</dd>
            </div>
            <div>
              <dt className="text-ink inline">Ano:</dt>{" "}
              <dd className="inline">{artwork.year}</dd>
            </div>
          </dl>

          <div className="mt-10 border-t border-ink/10 pt-8">
            <Link
              href={`/shop?fromArtwork=${artwork.slug}`}
              className="bg-accent inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Adquirir prints o catalogo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
