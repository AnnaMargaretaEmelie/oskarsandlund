import { sanityClient } from "@/lib/sanity/sanity.client";
import { SITE_SETTINGS_QUERY, SERVICES_QUERY } from "@/lib/sanity/queries";
import {
  SERVICES_QUERYResult,
  SITE_SETTINGS_QUERYResult,
} from "@/lib/sanity/sanity.types";
import { ServicesSection } from "../components/About/ServicesSection/ServicesSection";
import { ContactSection } from "../components/About/ContactSection/ContactSection";
import styles from "./aboutPage.module.scss";

export default async function AboutPage() {
  const [siteSettings, services] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<SERVICES_QUERYResult>(SERVICES_QUERY),
  ]);
  return (
    <div className={styles.stack}>
      <div className={styles.page}>
        <ServicesSection services={services ?? []} />
        <ContactSection
          contactEmail={siteSettings?.contactEmail ?? undefined}
          contactPhone={siteSettings?.contactPhone ?? undefined}
          contactLocation={siteSettings?.contactLocation ?? undefined}
        />
      </div>
    </div>
  );
}
