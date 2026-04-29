import Image from "next/image";
import { notFound } from "next/navigation";
import { artworks, getArtworkBySlug } from "@/lib/content/catalog";

type ArtworkDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
            <article className="grid gap-8 rounded-4xl border border-ink/10 bg-white/70 p-5 shadow-card md:grid-cols-2 md:p-8">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl">
                    <Image src={artwork.imageUrl} alt={artwork.title} fill className="object-cover" />
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Detalle de obra</p>
                    <h1 className="mt-3 font-display text-5xl leading-tight">{artwork.title}</h1>
                    <p className="mt-4 text-muted">{artwork.excerpt}</p>

                    <dl className="mt-8 space-y-2 text-sm text-muted">
                        <div>
                            <dt className="inline text-ink">Tecnica:</dt> <dd className="inline">{artwork.medium}</dd>
                        </div>
                        <div>
                            <dt className="inline text-ink">Dimension:</dt> <dd className="inline">{artwork.dimensions}</dd>
                        </div>
                        <div>
                            <dt className="inline text-ink">Ano:</dt> <dd className="inline">{artwork.year}</dd>
                        </div>
                    </dl>
                </div>
            </article>
        </main>
    );
}
