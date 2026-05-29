import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <footer className="border-ink/10 bg-surface mt-16 border-t">
      <div className="text-muted mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-8 text-xs md:px-10">
        <p>{dict.footer.copyright}</p>
        <a
          href="https://github.com/andreslossada"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 transition-opacity hover:opacity-100"
        >
          by Andres Lossada
        </a>
      </div>
    </footer>
  );
}
