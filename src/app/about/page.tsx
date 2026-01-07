import { sanityClient } from "@/lib/sanity/sanity.client";
import { SITE_SETTINGS_QUERY, SERVICES_QUERY } from "@/lib/sanity/queries";
import {
  SERVICES_QUERYResult,
  SITE_SETTINGS_QUERYResult,
} from "@/lib/sanity/sanity.types";

import Image from "next/image";
import styles from "./aboutPage.module.scss";

import { ServicesSection } from "../components/About/ServicesSection/ServicesSection";
import { ContactSection } from "../components/About/ContactSection/ContactSection";

export default async function AboutPage() {
  const [siteSettings, services] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<SERVICES_QUERYResult>(SERVICES_QUERY),
  ]);

  const instagramUrl =
    siteSettings?.socialLinks?.find(
      (l) => typeof l?.url === "string" && l.url.includes("instagram.com")
    )?.url ?? undefined;

  return (
    <>
      <div className="section container bg-grain">
        <h1>Services</h1>
      </div>

      <div className={`${styles.stage} bg-grid`}>
        <div className={styles.stageImage} aria-hidden="true">
          <Image
            src="/images/studio-pics/drums.jpeg"
            alt=""
            fill
            sizes="(max-width: 768px) 0px, (max-width: 1200px) 360px, 420px"
            priority={false}
          />
        </div>

        <section className={`section ${styles.services}`} aria-label="Services">
          <div className="container">
            <ServicesSection services={services ?? []} />
          </div>
        </section>

        <section
          aria-labelledby="about-contact-heading"
          className={`section ${styles.contact}`}
        >
          <div className="container">
            <ContactSection
              contactEmail={siteSettings?.contactEmail ?? undefined}
              contactPhone={siteSettings?.contactPhone ?? undefined}
              contactLocation={siteSettings?.contactLocation ?? undefined}
              instagramUrl={instagramUrl}
            />
          </div>
        </section>
      </div>
    </>
  );
}
