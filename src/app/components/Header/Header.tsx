import Link from "next/link";
import styles from "./Header.module.scss";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.inner}>
          <div className={styles.siteTitle}>Oskar Sandlund</div>
          <MobileNav />

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <ul className={styles.navList}>
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
