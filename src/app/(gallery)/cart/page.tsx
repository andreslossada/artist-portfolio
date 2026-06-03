import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export default async function CartPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="mb-10">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.contactPage.cart.title}
        </p>
        <h1 className="font-display mt-2 text-5xl leading-tight">
          {dict.contactPage.cart.title}
        </h1>
      </header>

      <div className="border-ink/10 bg-surface p-8 text-center md:p-12">
        <p className="text-muted text-lg leading-relaxed">
          {dict.contactPage.cart.empty}
        </p>
        <p className="text-muted mt-2 mb-8 text-base">
          Pronto podrás agregar obras y productos al carrito.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/gallery"
            className="bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {dict.aboutPage.viewGallery}
          </Link>
          <Link
            href="/shop"
            className="border-accent/35 text-accent hover:bg-accent-soft/55 border px-5 py-2.5 text-sm font-semibold transition"
          >
            {dict.landing.shop}
          </Link>
        </div>
      </div>
    </main>
  );
}
