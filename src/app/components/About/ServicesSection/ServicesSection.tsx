import styles from "./ServicesSection.module.scss";
import { SERVICES_QUERYResult } from "@/lib/sanity/sanity.types";

type ServicesSectionProps = {
  services: SERVICES_QUERYResult;
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <div className="u-stack-sm">
      <h2 id="about-services-heading">Services</h2>

      {services.length === 0 && <p>No services yet.</p>}
      {services.length > 0 && (
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service._id} className="u-label u-label--narrow">
              {service.title && (
                <h3 className={styles.labelTitle}>{service.title}</h3>
              )}
              {service.description && (
                <p className={styles.labelText}>{service.description}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
