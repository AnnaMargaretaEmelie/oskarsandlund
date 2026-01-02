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
    <section aria-labelledby="about-contact-heading" className={styles.section}>
      <h2 id="about-contact-heading">Contact me</h2>
      {contactEmail && <p>{contactEmail}</p>}
      {contactPhone && <p>{contactPhone}</p>}
      {contactLocation && <p>{contactLocation}</p>}
      <p>Link to contactform</p>
    </section>
  );
}
