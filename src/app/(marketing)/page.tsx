import { CreativePortfolioLanding } from "@/components/sections/creative-portfolio-landing";
import { getLandingGalleryItems } from "@/lib/content/landing-gallery";

export default async function MarketingHomePage() {
  const artworks = await getLandingGalleryItems();

  return (
    <CreativePortfolioLanding
      artworks={artworks}
    />
  );
}
