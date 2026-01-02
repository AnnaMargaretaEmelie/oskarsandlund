import { ContactForm } from "../components/Contact/ContactForm/ContactForm";
import styles from "./contactPage.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.stack}>
      <div className={styles.page}>
        <h1>Contact</h1>
        <p>Give me a ring! Or slide into my contact form below.</p>
        <ContactForm />
      </div>
    </div>
  );
}
