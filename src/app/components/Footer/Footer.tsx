import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={`section ${styles.footer}`}>
      <div className="container">
        <div className={styles.footerSignal}>
          <span
            className={`${styles.footerLine} ${styles.footerLineLong}`}
          ></span>
          <p className={styles.footerCopy}>© 2025 OSKAR SANDLUND</p>
          <span
            className={`${styles.footerLine} ${styles.footerLineShort}`}
          ></span>
        </div>
      </div>
    </footer>
  );
}
