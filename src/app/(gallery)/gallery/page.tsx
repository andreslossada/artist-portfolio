import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryList } from "@/components/gallery/GalleryList";
import { getArtworks } from "@/lib/artworks";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const artworks = await getArtworks();
  const { view } = await searchParams;
  const isList = view === "list";

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {isList ? dict.galleryPage.listEyebrow : dict.galleryPage.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-5xl leading-tight">
          {isList ? dict.galleryPage.listTitle : dict.galleryPage.title}
        </h1>
      </header>

      {isList ? (
        <GalleryList artworks={artworks} />
      ) : (
        <GalleryGrid artworks={artworks} />
      )}
    </main>
  );
}
