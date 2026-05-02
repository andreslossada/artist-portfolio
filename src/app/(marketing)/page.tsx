import { CreativePortfolioLanding } from "@/components/sections/creative-portfolio-landing";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export default async function MarketingHomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <CreativePortfolioLanding
      locale={locale}
      labels={dict.landing}
      languageLabels={dict.languageSwitcher}
    />
  );
}
