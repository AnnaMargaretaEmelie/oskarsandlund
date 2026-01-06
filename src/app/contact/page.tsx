import { ContactForm } from "../components/Contact/ContactForm/ContactForm";
import styles from "./contactPage.module.scss";

export default function ContactPage() {
  return (
    <section className="section bg-grid bg-grain">
      <div className="container">
        <div className="u-stack-md">
          <h1>Contact</h1>
          <p>Give me a ring! Or slide into my contact form below.</p>
          <div className={styles.formWrap}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
