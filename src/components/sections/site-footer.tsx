import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <footer className="border-ink/10 bg-white mt-16 border-t">
      <div className="text-muted mx-auto w-full max-w-6xl px-5 py-8 text-sm md:px-10">
        <p>{dict.footer.copyright}</p>
      </div>
    </footer>
  );
}
