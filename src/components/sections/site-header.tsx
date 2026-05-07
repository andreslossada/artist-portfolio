import { SiteHeaderShell } from "@/components/sections/site-header-shell";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { isDevelopmentContentMode } from "@/lib/runtime-mode";
import { getTheme } from "@/lib/theme";

export async function SiteHeader() {
  const locale = await getLocale();
  const theme = await getTheme();
  const dict = getDictionary(locale);

  return (
    <SiteHeaderShell
      locale={locale}
      theme={theme}
      languageLabels={dict.languageSwitcher}
      themeLabels={dict.themeSwitcher}
      navLabels={{
        about: dict.landing.about,
        cart: dict.landing.cart,
        contact: dict.landing.contact,
      }}
      showCart={!isDevelopmentContentMode()}
    />
  );
}
