import Link from "next/link";
import styles from "./Header.module.scss";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

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
    </header>
  );
}
