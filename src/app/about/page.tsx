import { sanityClient } from "@/lib/sanity/sanity.client";
import { SITE_SETTINGS_QUERY, SERVICES_QUERY } from "@/lib/sanity/queries";
import {
  SERVICES_QUERYResult,
  SITE_SETTINGS_QUERYResult,
} from "@/lib/sanity/sanity.types";
import { ServicesSection } from "../components/About/ServicesSection/ServicesSection";
import { ContactSection } from "../components/About/ContactSection/ContactSection";

export default async function AboutPage() {
  const [siteSettings, services] = await Promise.all([
    sanityClient.fetch<SITE_SETTINGS_QUERYResult>(SITE_SETTINGS_QUERY),
    sanityClient.fetch<SERVICES_QUERYResult>(SERVICES_QUERY),
  ]);
  return (
    <>
      <div className="section container">
        <h1>Services</h1>
      </div>
      <section className="section" aria-label="Services">
        <div className="container">
          <ServicesSection services={services ?? []} />
        </div>
      </section>
      <section aria-labelledby="about-contact-heading" className="section">
        <div className="container">
          <ContactSection
            contactEmail={siteSettings?.contactEmail ?? undefined}
            contactPhone={siteSettings?.contactPhone ?? undefined}
            contactLocation={siteSettings?.contactLocation ?? undefined}
          />
        </div>
      </section>
    </>
  );
}
