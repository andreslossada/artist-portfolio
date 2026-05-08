import type { Metadata } from "next";
import Link from "next/link";
import { CartPanel } from "@/components/sections/cart-panel";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { isCommerceEnabled } from "@/lib/runtime-mode";

type CartPageProps = {
  searchParams: Promise<{ checkout?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.cartTitle,
    description: dict.metadata.cartDescription,
  };
}

export default async function CartPage({ searchParams }: CartPageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { checkout } = await searchParams;
  const commerceEnabled = isCommerceEnabled();

  if (!commerceEnabled) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
        <header className="max-w-3xl">
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            {dict.landing.cart}
          </p>
          <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
            {dict.contactPage.cart.title}
          </h1>
          <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
            Carrito y checkout pausados temporalmente.
          </p>
        </header>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="max-w-3xl">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.landing.cart}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
          {dict.contactPage.cart.title}
        </h1>
        <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
          {dict.metadata.cartDescription}
        </p>
      </header>

      <CartPanel labels={dict.contactPage.cart} checkoutStatus={checkout} />

      <section className="border-ink/10 mt-10 border bg-surface p-6 md:p-8">
        <h2 className="font-display text-4xl leading-tight">
          {dict.contactPage.acquisitionsTitle}
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
          {dict.contactPage.acquisitionsDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="mailto:irinagaray17@gmail.com"
            className="bg-accent px-5 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white transition hover:brightness-110"
          >
            {dict.contactPage.channels.email}
          </Link>
          <Link
            href="/gallery"
            className="border-accent/35 text-accent hover:bg-accent-soft/55 border px-5 py-2 text-sm font-semibold transition"
          >
            {dict.contactPage.viewArtwork}
          </Link>
        </div>
      </section>
    </main>
  );
}
