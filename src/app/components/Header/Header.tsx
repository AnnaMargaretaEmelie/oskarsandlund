import styles from "./Header.module.scss";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.siteTitle}>Oskar Sandlund</div>

            <div className={styles.signalRow} aria-hidden="true">
              <span className={styles.signalLineLeft} />
              <span className={styles.tagline}>
                PRODUCER, DRUMMER AND MIX ENGINEER
              </span>
              <span className={styles.signalLineRight} />
            </div>
          </div>
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
