import { SiteHeaderShell } from "@/components/sections/site-header-shell";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { isCommerceEnabled, isMockContentSource } from "@/lib/runtime-mode";

export async function SiteHeader() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <SiteHeaderShell
      locale={locale}
      languageLabels={dict.languageSwitcher}
      navLabels={{
        shop: dict.header.shop,
        about: dict.landing.about,
        cart: dict.landing.cart,
        contact: dict.landing.contact,
      }}
      showCart={isCommerceEnabled() || isMockContentSource()}
    />
  );
}
