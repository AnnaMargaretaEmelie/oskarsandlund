import Link from "next/link";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.siteTitle}>Oskar Sandlund</div>
          <button aria-label="Open menu">KNAPP</button>
          <nav aria-label="Primary navigation">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/credits">Credits</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
