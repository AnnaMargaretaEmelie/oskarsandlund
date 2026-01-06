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
import styles from "./homePage.module.scss";
import Image from "next/image";

export default async function Home() {
  const [siteSettings, bio, featuredCredits] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<BIO_QUERYResult>(BIO_QUERY),
    sanityClient.fetch<FEATURED_CREDITS_QUERYResult>(FEATURED_CREDITS_QUERY),
  ]);
  return (
    <>
      <section
        className="section bg-grid bg-grain"
        aria-labelledby="home-hero-heading"
      >
        <div className="container">
          <div className={styles.hero}>
            <HeroSection
              siteTitle={siteSettings?.siteTitle ?? "Oskar Sandlund"}
              tagline={siteSettings?.tagline ?? undefined}
            />
            <div className={styles.heroImage}>
              <Image
                src="/images/studio-pics/fisheye-studio.jpeg"
                alt="The studio, packed with gears."
                fill
                className={styles.heroImg}
                sizes="(min-width: 900px) 40vw, 100vw"
                priority
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
          <FeaturedCreditsSection credits={featuredCredits ?? []} />
        </div>
      </section>
    </>
  );
}
