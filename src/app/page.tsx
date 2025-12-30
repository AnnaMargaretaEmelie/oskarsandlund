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
import styles from "./page.module.scss";

export default async function Home() {
  const [siteSettings, bio, featuredCredits] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<BIO_QUERYResult>(BIO_QUERY),
    sanityClient.fetch<FEATURED_CREDITS_QUERYResult>(FEATURED_CREDITS_QUERY),
  ]);
  return (
    <div className={styles.stack}>
      <div className={styles.page}>
        <HeroSection
          siteTitle={siteSettings?.siteTitle ?? "Oskar Sandlund"}
          tagline={siteSettings?.tagline ?? undefined}
        />
        <BioSection
          name={bio?.name ?? undefined}
          profession={bio?.profession ?? undefined}
          shortBio={bio?.shortBio ?? undefined}
        />
        <FeaturedCreditsSection credits={featuredCredits ?? []} />
      </div>
    </div>
  );
}
