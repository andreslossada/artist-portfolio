import Link from "next/link";

const links = [
    { href: "/", label: "Inicio" },
    { href: "/gallery", label: "Galeria" },
    { href: "/shop", label: "Tienda" },
];

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-20 border-b border-ink/10 bg-canvas/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 md:px-10">
                <Link href="/" className="font-display text-2xl tracking-wide">
                    Estudio Irina
                </Link>

                <nav className="flex items-center gap-5 text-sm font-semibold text-muted">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="transition hover:text-ink">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
