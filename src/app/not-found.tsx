import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-muted text-xs tracking-[0.3em] uppercase">
        404
      </p>
      <h1 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
        Página no encontrada
      </h1>
      <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
        La página que buscas no existe o fue movida.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Volver al inicio
        </Link>
        <Link
          href="/gallery"
          className="border-accent/35 text-accent hover:bg-accent-soft/55 border px-5 py-2.5 text-sm font-semibold transition"
        >
          Ver galería
        </Link>
      </div>
    </main>
  );
}
