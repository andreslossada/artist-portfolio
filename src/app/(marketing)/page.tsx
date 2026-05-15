import { CreativePortfolioLanding } from "@/components/sections/creative-portfolio-landing";
import { getLandingGalleryItems } from "@/lib/content/landing-gallery";
import { getTheme } from "@/lib/theme";

export default async function MarketingHomePage() {
  const theme = await getTheme();
  const artworks = await getLandingGalleryItems();

  return (
    <CreativePortfolioLanding
      theme={theme}
      artworks={artworks}
    />
  );
}
