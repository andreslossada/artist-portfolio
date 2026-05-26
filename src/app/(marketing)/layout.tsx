import { PageTransition } from "@/components/ui/page-transition";
import { SiteHeaderShell } from "@/components/sections/site-header-shell";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            'document.documentElement.setAttribute("data-splash","active")',
        }}
      />
      <div className="fixed inset-x-0 top-0 z-30">
        <SiteHeaderShell
          locale={locale}
          languageLabels={dict.languageSwitcher}
          navLabels={{
            shop: dict.landing.shop,
            about: dict.landing.about,
            cart: dict.landing.cart,
            contact: dict.landing.contact,
          }}
          headerClassName="border-b border-accent/15 bg-transparent"
        />
      </div>
      <PageTransition>
        {children}
      </PageTransition>
    </>
  );
}
