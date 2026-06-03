"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-muted text-xs tracking-[0.3em] uppercase">
        Error
      </p>
      <h1 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
        Algo salió mal
      </h1>
      <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={reset}
          className="bg-accent cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="border-accent/35 text-accent hover:bg-accent-soft/55 border px-5 py-2.5 text-sm font-semibold transition"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
