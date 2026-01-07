import styles from "./ContactSection.module.scss";
type ContactSectionProps = {
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
};

export function ContactSection({
  contactEmail,
  contactPhone,
  contactLocation,
}: ContactSectionProps) {
  return (
    <div className={`u-stack-md bg-grain ${styles.contactBox}`}>
      <div className={`u-stack-md ${styles.inner}`}>
        <h2 id="about-contact-heading">Contact me</h2>
        <div className={styles.layoutRow}>
          <div className={`u-stack-sm ${styles.address}`}>
            {contactEmail && (
              <p>
                <strong>E-mail:</strong> {contactEmail}
              </p>
            )}
            {contactPhone && (
              <p>
                <strong>Phone: </strong>
                {contactPhone}
              </p>
            )}
            {contactLocation && (
              <p>
                <strong>Located at: </strong>
                {contactLocation}
              </p>
            )}
          </div>
          <p className={styles.contactLink}>Link to contactform</p>
        </div>
      </div>
    </div>
  );
}
