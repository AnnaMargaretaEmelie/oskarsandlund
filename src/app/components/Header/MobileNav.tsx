"use client";
import { useId, useState } from "react";
import { NavLink } from "./NavLink";
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
              <NavLink href="/" onClick={close}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href="/about" onClick={close}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink href="/credits" onClick={close}>
                Credits
              </NavLink>
            </li>
            <li>
              <NavLink href="/contact" onClick={close}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
