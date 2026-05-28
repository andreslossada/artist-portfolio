import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/sections/product-grid";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import type { ProductCategory } from "@/types/content";

type ShopPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.shopTitle,
    description: dict.metadata.shopDescription,
  };
}

function isValidCategory(
  value: string | undefined,
): value is ProductCategory {
  return value === "shirt" || value === "sticker" || value === "print";
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { category } = await searchParams;

  const activeCategory = isValidCategory(category) ? category : undefined;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="mb-8 md:mb-10">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.shopPage.eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl leading-tight md:text-5xl">
          {dict.shopPage.title}
        </h1>
      </header>

      <nav className="border-ink/10 mb-8 flex flex-wrap gap-2 border-b pb-4 md:mb-10">
        <Link
          href="/shop"
          className={`inline-flex h-9 items-center border px-4 text-sm font-semibold transition ${
            !activeCategory
              ? "bg-accent border-accent !text-white"
              : "border-accent/35 text-accent hover:bg-accent-soft/55"
          }`}
        >
          {dict.shopPage.categoryAll}
        </Link>
        <Link
          href="/shop?category=shirt"
          className={`inline-flex h-9 items-center border px-4 text-sm font-semibold transition ${
            activeCategory === "shirt"
              ? "bg-accent border-accent !text-white"
              : "border-accent/35 text-accent hover:bg-accent-soft/55"
          }`}
        >
          {dict.shopPage.categoryShirts}
        </Link>
        <Link
          href="/shop?category=sticker"
          className={`inline-flex h-9 items-center border px-4 text-sm font-semibold transition ${
            activeCategory === "sticker"
              ? "bg-accent border-accent !text-white"
              : "border-accent/35 text-accent hover:bg-accent-soft/55"
          }`}
        >
          {dict.shopPage.categoryStickers}
        </Link>
        <Link
          href="/shop?category=print"
          className={`inline-flex h-9 items-center border px-4 text-sm font-semibold transition ${
            activeCategory === "print"
              ? "bg-accent border-accent !text-white"
              : "border-accent/35 text-accent hover:bg-accent-soft/55"
          }`}
        >
          {dict.shopPage.categoryPrints}
        </Link>
      </nav>

      <ProductGrid
        category={activeCategory}
        labels={{
          addToCart: dict.shopPage.addToCart,
          viewCart: dict.shopPage.viewCart,
          unavailable: dict.shopPage.unavailable,
        }}
      />
    </main>
  );
}
