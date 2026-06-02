import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCartCta } from "@/components/ui/product-cart-cta";
import { UnavailableBadge } from "@/components/ui/unavailable-badge";
import { getProducts, getProductBySlug } from "@/lib/artworks";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

const categoryLabels: Record<string, string> = {
  shirt: "Camiseta",
  sticker: "Sticker",
  print: "Edición",
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-10 md:py-8">
      <article className="border-ink/10 shadow-card grid gap-5 border bg-surface p-4 md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-7 md:p-5">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-canvas-soft md:mx-0 md:aspect-4/5 md:w-88 md:max-w-none">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className={`object-cover ${product.available ? "" : "opacity-60"}`}
            sizes="(max-width: 768px) 100vw, 22rem"
          />
          {!product.available && (
            <UnavailableBadge label={dict.shopPage.unavailable} />
          )}
        </div>

        <div className="flex h-full flex-col">
          <Link
            href="/shop"
            className="text-muted hover:text-accent mb-4 inline-flex text-xs tracking-[0.2em] uppercase transition md:mb-5"
          >
            {dict.shopPage.backToShop}
          </Link>
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            {categoryLabels[product.category] ?? product.category}
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[0.95] md:mt-4 md:text-5xl">
            {product.name}
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed md:mt-6 md:text-lg">
            {product.description}
          </p>

          <p className="text-accent mt-6 text-2xl font-semibold md:mt-7 md:text-3xl">
            ${product.price.toFixed(2)} USD
          </p>

          <div className="border-ink/10 mt-8 border-t pt-6 md:mt-auto md:pt-8">
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <ProductCartCta
                labels={{
                  addToCart: dict.shopPage.addToCart,
                  unavailable: dict.shopPage.unavailable,
                }}
                available={product.available}
              />
              <Link
                href="/contact"
                className="border-accent/35 text-accent hover:bg-accent-soft/55 flex h-12 items-center justify-center border px-5 text-sm font-semibold transition md:inline-flex md:h-11"
              >
                {dict.contactPage.channels.email}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
