import { CreativePortfolioLanding } from "@/components/sections/creative-portfolio-landing";
import { getLandingGalleryItems } from "@/lib/content/landing-gallery";

export default async function MarketingHomePage({
  searchParams,
}: {
  searchParams: Promise<{ hour?: string }>;
}) {
  const artworks = await getLandingGalleryItems();
  const params = await searchParams;
  const hourOverride = params.hour ? parseFloat(params.hour) : undefined;

  return (
    <CreativePortfolioLanding
      artworks={artworks}
      hourOverride={hourOverride}
    />
  );
}
