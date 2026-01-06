import styles from "./Header.module.scss";
import {
  MobileNavButton,
  MobileNavPanel,
  MobileNavProvider,
} from "./MobileNav";
import { NavLink } from "./NavLink";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <MobileNavProvider>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.inner}>
            <div className={styles.brand}>
              <Link href="/" className={styles.siteTitle}>
                Oskar Sandlund
              </Link>

              <div className={styles.signalRow} aria-hidden="true">
                <span className={styles.signalLineLeft} />
                <span className={styles.tagline}>
                  PRODUCER, DRUMMER AND MIX ENGINEER
                </span>
                <span className={styles.signalLineRight} />
              </div>
            </div>
            <MobileNavButton />

            <nav className={styles.desktopNav} aria-label="Primary navigation">
              <ul className={styles.navList}>
                <li>
                  <NavLink href="/">Home</NavLink>
                </li>
                <li>
                  <NavLink href="/about">About</NavLink>
                </li>
                <li>
                  <NavLink href="/credits">Credits</NavLink>
                </li>
                <li>
                  <NavLink href="/contact">Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <MobileNavPanel />
      </MobileNavProvider>
    </header>
  );
}
