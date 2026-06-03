"use client";

import { useEffect } from "react";

export default function GalleryError({
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
      <h1 className="font-display mt-3 text-3xl leading-tight md:text-4xl">
        Algo salió mal
      </h1>
      <p className="text-muted mt-3 max-w-md text-base leading-relaxed">
        Ocurrió un error al cargar esta sección.
      </p>
      <button
        onClick={reset}
        className="bg-accent mt-6 cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Reintentar
      </button>
    </main>
  );
}
