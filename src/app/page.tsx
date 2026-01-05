import { sanityClient } from "@/lib/sanity/sanity.client";
import {
  FEATURED_CREDITS_QUERY,
  SITE_SETTINGS_QUERY,
  BIO_QUERY,
} from "@/lib/sanity/queries";
import {
  FEATURED_CREDITS_QUERYResult,
  SITE_SETTINGS_QUERYResult,
  BIO_QUERYResult,
} from "@/lib/sanity/sanity.types";
import { HeroSection } from "./components/Home/HeroSection/HeroSection";
import { BioSection } from "./components/Home/BioSection/BioSection";
import { FeaturedCreditsSection } from "./components/Home/FeaturedCreditsSection/FeaturedCreditsSection";

export default async function Home() {
  const [siteSettings, bio, featuredCredits] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<BIO_QUERYResult>(BIO_QUERY),
    sanityClient.fetch<FEATURED_CREDITS_QUERYResult>(FEATURED_CREDITS_QUERY),
  ]);
  return (
    <div>
      <section className="section" aria-labelledby="home-hero-heading">
        <div className="container">
          <HeroSection
            siteTitle={siteSettings?.siteTitle ?? "Oskar Sandlund"}
            tagline={siteSettings?.tagline ?? undefined}
          />
        </div>
      </section>
      <section className="section" aria-labelledby="home-bio-heading">
        <div className="container">
          <BioSection
            name={bio?.name ?? undefined}
            profession={bio?.profession ?? undefined}
            shortBio={bio?.shortBio ?? undefined}
          />
        </div>
      </section>

      <section
        className="section"
        aria-labelledby="home-featured-credits-heading"
      >
        <div className="container">
          <FeaturedCreditsSection credits={featuredCredits ?? []} />
        </div>
      </section>
    </div>
  );
}
