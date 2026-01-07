import styles from "./ContactSection.module.scss";
type ContactSectionProps = {
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
  instagramUrl?: string;
};

export function ContactSection({
  contactEmail,
  contactPhone,
  contactLocation,
  instagramUrl,
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
            {instagramUrl && (
              <p>
                <strong>Instagram: </strong>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  instagram.com/freskobaldi
                </a>
              </p>
            )}
          </div>
          <p className={styles.contactLink}>Link to contactform</p>
        </div>
      </div>
    </div>
  );
}
