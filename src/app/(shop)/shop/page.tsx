import { products } from "@/lib/content/catalog";

export default function ShopPage() {
    return (
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
            <header className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Tienda</p>
                <h1 className="mt-2 font-display text-5xl leading-tight">Ediciones y publicaciones</h1>
            </header>

            <div className="grid gap-5 md:grid-cols-2">
                {products.map((product) => (
                    <article
                        key={product.id}
                        className="rounded-card border border-ink/10 bg-white/70 p-6 shadow-card"
                    >
                        <h2 className="font-display text-3xl leading-tight">{product.name}</h2>
                        <p className="mt-2 text-sm text-muted">{product.description}</p>
                        <p className="mt-6 text-2xl font-semibold">${product.price.toFixed(2)} USD</p>

                        <form className="mt-6" action="/api/checkout" method="post">
                            <input type="hidden" name="priceId" value={product.stripePriceId} />
                            <input type="hidden" name="quantity" value="1" />
                            <button
                                type="submit"
                                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                            >
                                Comprar con Stripe
                            </button>
                        </form>
                    </article>
                ))}
            </div>
        </main>
    );
}
