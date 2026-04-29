import { FeaturedArtworks } from "@/components/sections/featured-artworks";
import { LandingHero } from "@/components/sections/landing-hero";

export default function MarketingHomePage() {
    return (
        <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col px-4 py-5 md:px-8 md:py-8">
            <LandingHero />
            <FeaturedArtworks />
        </main>
    );
}
