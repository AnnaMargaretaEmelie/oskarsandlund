"use client";
import { useId, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  function toggle() {
    setIsOpen((v) => !v);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        className={styles.menuButton}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      {isOpen && (
        <nav
          id={panelId}
          className={styles.mobilePanel}
          aria-label="Mobile navigation"
        >
          <ul className={styles.navList}>
            <li>
              <Link href="/" onClick={close}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={close}>
                About
              </Link>
            </li>
            <li>
              <Link href="/credits" onClick={close}>
                Credits
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={close}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
