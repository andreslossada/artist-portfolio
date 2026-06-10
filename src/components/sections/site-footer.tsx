import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <footer className="border-ink/10 bg-surface/70 backdrop-blur-xs mt-12 border-t">
      <div className="text-muted/70 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 text-[11px] md:px-10">
        <p>© {new Date().getFullYear()} {dict.footer.copyright}</p>
        <a
          href="https://github.com/andreslossada"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-50 transition-opacity hover:opacity-80"
        >
          by Andres Lossada
        </a>
      </div>
    </footer>
  );
}
