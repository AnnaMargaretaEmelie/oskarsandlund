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
import { getSpotifyCoverUrl } from "@/lib/spotify/spotify";
import { urlFor } from "@/lib/sanity/sanity.image";
import { HeroSection } from "./components/Home/HeroSection/HeroSection";
import { BioSection } from "./components/Home/BioSection/BioSection";
import { FeaturedCreditsSection } from "./components/Home/FeaturedCreditsSection/FeaturedCreditsSection";
import styles from "./homePage.module.scss";
import Image from "next/image";

export default async function Home() {
  const [siteSettings, bio, featuredCredits] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<BIO_QUERYResult>(BIO_QUERY),
    sanityClient.fetch<FEATURED_CREDITS_QUERYResult>(FEATURED_CREDITS_QUERY),
  ]);
  const featuredCreditsWithCover = await Promise.all(
    featuredCredits.map(async (credit) => {
      const spotifyCover = credit.spotifyUrl
        ? await getSpotifyCoverUrl(credit.spotifyUrl)
        : null;

      const sanityCover = credit.coverImage
        ? urlFor(credit.coverImage).width(600).height(600).url()
        : null;

      return {
        ...credit,
        resolvedCoverSrc: spotifyCover ?? sanityCover ?? null,
      };
    })
  );

  return (
    <>
      <section className="section bg-grid bg-grain" aria-label="Hero">
        <div className="container">
          <div className={styles.heroStage}>
            <Image
              src="/images/studio-pics/fisheye-studio.jpeg"
              alt="The studio, packed with gears."
              fill
              className={styles.heroImg}
              sizes="100vw"
              priority
            />

            <div className={styles.heroContent}>
              <HeroSection
                siteTitle={siteSettings?.siteTitle ?? "Oskar Sandlund"}
                tagline={siteSettings?.tagline ?? undefined}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="home-bio-heading">
        <div className="container">
          <div className="u-label u-label--tilt-left u-label--narrow">
            <BioSection
              name={bio?.name ?? undefined}
              profession={bio?.profession ?? undefined}
              shortBio={bio?.shortBio ?? undefined}
            />
          </div>
        </div>
      </section>

      <section
        className="section"
        aria-labelledby="home-featured-credits-heading"
      >
        <div className="container">
          <div className={`${styles.featuredBox} bg-grid`}>
            <FeaturedCreditsSection credits={featuredCreditsWithCover ?? []} />
            <div className={styles.featuredCta}>
              <a href="/credits" className={styles.featuredCtaButton}>
                All credits →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
