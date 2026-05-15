import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArtworkCartCta } from "@/components/ui/artwork-cart-cta";
import { getArtworkBySlug, getArtworks } from "@/lib/artworks";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { isCommerceEnabled } from "@/lib/runtime-mode";

type ArtworkDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ vt?: string }>;
};

export async function generateStaticParams() {
  const artworks = await getArtworks();
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
  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const transitionName = `artwork-image-${vt ?? artwork.slug}`;
  const commerceEnabled = isCommerceEnabled();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-10 md:py-6">
      <article className="border-ink/10 shadow-card grid gap-6 border bg-surface p-4 md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-7 md:p-5">
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
            href={`/gallery?vt=${artwork.slug}`}
            transitionTypes={["artwork-open"]}
            className="text-muted hover:text-accent mb-5 inline-flex text-xs tracking-[0.2em] uppercase transition"
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
            <div className="flex flex-wrap gap-3">
              {commerceEnabled ? (
                <ArtworkCartCta
                  artwork={artwork}
                  labels={{
                    addToCart: dict.artworkPage.addToCart,
                    viewCart: dict.artworkPage.viewCart,
                  }}
                />
              ) : null}
              <Link
                href={`/contact?fromArtwork=${artwork.slug}`}
                className="border-accent/35 text-accent hover:bg-accent-soft/55 inline-flex h-11 items-center justify-center border px-5 text-sm font-semibold transition"
              >
                {dict.artworkPage.shopCta}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
