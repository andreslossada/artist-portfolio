import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { artworks, getArtworkBySlug } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

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
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { slug } = await params;
  const { vt } = await searchParams;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const transitionName = `artwork-image-${vt ?? artwork.slug}`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-10 md:py-6">
      <article className="border-ink/10 shadow-card grid gap-6 border bg-white/65 p-4 md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-7 md:p-5">
        <ViewTransition name={transitionName} share="artwork-morph">
          <div className="relative mx-auto aspect-2/3 w-[min(92vw,22rem)] overflow-hidden bg-canvas-soft md:mx-0 md:w-88">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 92vw, 22rem"
            />
          </div>
        </ViewTransition>

        <div className="flex h-full flex-col">
          <Link
            href="/gallery"
            className="text-muted hover:text-ink mb-5 inline-flex text-xs tracking-[0.2em] uppercase transition"
          >
            {dict.artworkPage.backToGallery}
          </Link>
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            {dict.artworkPage.detailEyebrow}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-6xl">
            {artwork.title}
          </h1>
          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
            {artwork.description}
          </p>

          <p className="text-accent mt-7 text-3xl font-semibold">
            ${artwork.price.toFixed(2)} USD
          </p>

          <dl className="border-ink/10 mt-8 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 border-t pt-6 text-sm">
            <div className="contents">
              <dt className="text-muted tracking-[0.12em] uppercase">
                {dict.artworkPage.technique}
              </dt>
              <dd className="text-ink">{artwork.medium}</dd>
            </div>
            <div className="contents">
              <dt className="text-muted tracking-[0.12em] uppercase">
                {dict.artworkPage.dimension}
              </dt>
              <dd className="text-ink">{artwork.dimensions}</dd>
            </div>
            <div className="contents">
              <dt className="text-muted tracking-[0.12em] uppercase">
                {dict.artworkPage.year}
              </dt>
              <dd className="text-ink">{artwork.year}</dd>
            </div>
          </dl>

          <div className="border-ink/10 mt-10 border-t pt-8 md:mt-auto">
            <Link
              href={`/contact?fromArtwork=${artwork.slug}`}
              className="bg-accent inline-flex h-11 items-center justify-center border border-accent px-5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              {dict.artworkPage.shopCta}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
